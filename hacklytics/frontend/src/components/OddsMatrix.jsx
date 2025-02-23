'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { api } from '../app/utils/helpers';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function OddsMatrix({ title0, dashboardData, yes0 }) {
  const uniqueId = dashboardData.unique_id;
  const eventPart = uniqueId.split("_")[1];
  const series = eventPart.split("-")[0];
  const ticker = eventPart;
  const url = `https://kalshi.com/markets/${series.toLowerCase()}/${ticker.toLowerCase()}`;

  // Prepare a mapping for the odds.
  const oddsMapping = [
    { outcome: 'Yes', type: 'Bid', label: 'Yes Bid', value: dashboardData.yes_bid },
    { outcome: 'Yes', type: 'Ask', label: 'Yes Ask', value: dashboardData.yes_ask },
    { outcome: 'No',  type: 'Bid', label: 'No Bid',  value: dashboardData.no_bid },
    { outcome: 'No',  type: 'Ask', label: 'No Ask',  value: dashboardData.no_ask }
  ];

  // Define header labels for rows and columns.
  const colHeaders = [
    { key: 'Yes', text: "Yes" },
    { key: 'No',  text: "No" }
  ];
  const rowHeaders = [
    { key: 'Bid', text: "Bid" },
    { key: 'Ask', text: "Ask" }
  ];

  // Create a ref for the SVG container.
  const svgContainerRef = useRef();

  useEffect(() => {
    // Clear previous SVG content.
    d3.select(svgContainerRef.current).selectAll('*').remove();

    // Smaller overall dimensions.
    const totalWidth = 300;
    const totalHeight = 180;
    // Adjust margins to reserve space for headers.
    const margin = { top: 30, right: 10, bottom: 0, left: 60 };

    // Compute the matrix area.
    const matrixWidth = totalWidth - margin.left - margin.right;
    const matrixHeight = totalHeight - margin.top - margin.bottom;

    // Create the SVG element.
    const svg = d3
      .select(svgContainerRef.current)
      .append('svg')
      .attr('width', totalWidth)
      .attr('height', totalHeight)
      .style('width', '100%')
      .style('height', 'auto')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales for columns (outcomes) and rows (types).
    const x = d3.scaleBand()
      .domain(colHeaders.map(d => d.key))
      .range([0, matrixWidth])
      .padding(0.1);

    const y = d3.scaleBand()
      .domain(rowHeaders.map(d => d.key))
      .range([0, matrixHeight])
      .padding(0.1);

    // Color scale based on the odds values.
    const valueExtent = d3.extent(oddsMapping, d => d.value);
    const color = d3.scaleSequential()
      .domain(valueExtent)
      .interpolator(d3.interpolateBlues);

    // Draw cells for each oddsMapping entry.
    svg.selectAll('rect.cell')
      .data(oddsMapping)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('x', d => x(d.outcome))
      .attr('y', d => y(d.type))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => color(d.value))
      .append('title')
      .text(d => `${d.label}: ${d.value}`);

    // Add text labels for each cell.
    svg.selectAll('text.cellLabel')
      .data(oddsMapping)
      .enter()
      .append('text')
      .attr('class', 'cellLabel')
      .attr('x', d => x(d.outcome) + x.bandwidth() / 2)
      .attr('y', d => y(d.type) + y.bandwidth() / 2)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .text(d => d.value)
      .style('fill', 'orange')
      .style('font-size', '1.2rem');

    // Append column headers above the grid.
    const svgContainer = d3.select(svgContainerRef.current).select('svg');
    svgContainer.append('g')
      .selectAll('text.colHeader')
      .data(colHeaders)
      .enter()
      .append('text')
      .attr('class', 'colHeader')
      .attr('x', d => margin.left + x(d.key) + x.bandwidth() / 2 - margin.left + 80)
      .attr('y', (margin.top / 2))
      .attr('text-anchor', 'middle')
      .text(d => d.text)
      .style('font-weight', 'bold')
      .style('font-size', '0.75rem');

    // Append row headers to the left of the grid.
    svgContainer.append('g')
      .selectAll('text.rowHeader')
      .data(rowHeaders)
      .enter()
      .append('text')
      .attr('class', 'rowHeader')
      .attr('x', margin.left / 2)
      .attr('y', d => margin.top + y(d.key) + y.bandwidth() / 2 - margin.top)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .text(d => d.text)
      .style('font-weight', 'bold')
      .style('font-size', '0.75rem');

  }, [dashboardData, oddsMapping, colHeaders, rowHeaders]);

  // Calculate odds from payout matrix values.
  const yes_bid = dashboardData.yes_bid;
  const yes_ask = dashboardData.yes_ask;
  const no_bid = dashboardData.no_bid;
  const no_ask = dashboardData.no_ask;

  const yes_mid = (yes_bid + yes_ask) / 2;
  const no_mid = (no_ask + no_bid) / 2;

  const p_yes = yes_mid / (yes_mid + no_mid);
  const p_no = no_mid / (yes_mid + no_mid);
  const odds_yes = 1 / p_yes;
  const odds_no = 1 / p_no;

  const T = 100;
  const stake_yes = T * ((1 / odds_yes) / ((1 / odds_yes) + (1 / odds_no)));
  const stake_no = T * ((1 / odds_no) / ((1 / odds_yes) + (1 / odds_no)));
  const projected_revenue = T - (stake_yes + stake_no);

  // Create state for arbitrage data and a loading flag.
  const [arbitrageData, setArbitrageData] = useState({
    stake_decimal: 0,
    stake_marketX: 0,
    revenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch arbitrage data from the API.
  const getArbitrageData = async (title0, yes0, titleX, oddsX, oddsX_complement) => {
    try {
      const response = await api.get(
        `/api/openai?title0=${encodeURIComponent(title0)}&yes0=${encodeURIComponent(yes0)}&titleX=${encodeURIComponent(dashboardData.title)}&oddsX=${encodeURIComponent(odds_yes)}&oddsX_complement=${encodeURIComponent(odds_no)}`
      );
      console.log('Arbitrage data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching arbitrage data:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchArbitrageData = async () => {
      const data = await getArbitrageData(
        title0,
        yes0,
        dashboardData.title,
        odds_yes,
        odds_no
      );

      if (data) {
        // Set the values from the response
        console.log('Setting arbitrage data:', data);
        setArbitrageData({
          stake_decimal: data.stake_decimal,
          stake_marketX: data.stake_marketX,
          revenue: data.revenue,
        });
      }
      setIsLoading(false);
    };

    fetchArbitrageData();
  }, [title0, yes0, dashboardData.title, odds_yes, odds_no]);

  return (
    <div className="w-full pt-3">
      <Card onClick={() => window.open(url, "_blank")} className="w-full">
        <CardHeader className="flex flex-col justify-center h-full">
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="min-w-0">
              <CardTitle onClick={() => window.open(url, "_blank")} className="break-words">
                {dashboardData.title}
              </CardTitle>
              <CardDescription>
                Projected Revenue:{" "}
                <span
                  className={
                    projected_revenue < 0
                      ? "text-red-500"
                      : projected_revenue === 0
                      ? "text-gray-500"
                      : "text-green-500"
                  }
                >
                  {projected_revenue}
                </span>
              </CardDescription>
              <CardDescription>
                Stakes: {stake_yes} Yes, {stake_no} No
              </CardDescription>
              {/* Display arbitrage data or a loading message */}
              <CardDescription>
                Arbitrage Data:
                <br />
                {isLoading ? (
                  <span>Loading arbitrage data...</span>
                ) : (
                  <>
                    Stake Decimal: {arbitrageData.stake_decimal}
                    <br />
                    Stake MarketX: {arbitrageData.stake_marketX}
                    <br />
                    Revenue: {arbitrageData.revenue}
                  </>
                )}
              </CardDescription>
              <CardDescription className="pt-2">
                From {dashboardData.database}
              </CardDescription>
              Similarity score placeholder
            </div>
            <div className="flex justify-end">
              <div ref={svgContainerRef}></div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
