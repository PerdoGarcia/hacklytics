'use client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function OddsMatrix({ chartData, dashboardData }) {
  // Unpack the data props:
  const mainStats = chartData[chartData.length - 1];
  const mainAskPrice = mainStats.askPrice,
    mainBidPrice = mainStats.bidPrice;

  const curStats = dashboardData.odds[0].odds1.Market1;
  const curAskPrice = curStats.market_yes,
    curBidPrice = curStats.market_no;

  // Build a matrix data structure.
  // We'll show two rows ("Main" and "Current") and two columns ("Ask" and "Bid").
  const matrixData = [
    { type: 'Main', metric: 'Ask', value: mainAskPrice },
    { type: 'Main', metric: 'Bid', value: mainBidPrice },
    { type: 'Current', metric: 'Ask', value: curAskPrice },
    { type: 'Current', metric: 'Bid', value: curBidPrice }
  ];

  // Create a ref to attach our D3-generated SVG.
  const svgContainerRef = useRef();

  useEffect(() => {
    d3.select(svgContainerRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3
      .select(svgContainerRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('width', '100%')
      .style('height', 'auto')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const metrics = ['Ask', 'Bid'];
    const types = ['Main', 'Current'];

    const x = d3.scaleBand().domain(metrics).range([0, width]).padding(0.1);
    const y = d3.scaleBand().domain(types).range([0, height]).padding(0.1);

    const valueExtent = d3.extent(matrixData, (d) => d.value);
    const color = d3.scaleSequential().domain(valueExtent).interpolator(d3.interpolateBlues);

    svg
      .selectAll('rect')
      .data(matrixData)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.metric))
      .attr('y', (d) => y(d.type))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', (d) => color(d.value))
      .append('title')
      .text((d) => d.value);

    svg
      .selectAll('text')
      .data(matrixData)
      .enter()
      .append('text')
      .attr('x', (d) => x(d.metric) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.type) + y.bandwidth() / 2)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .text((d) => d.value)
      .style('fill', 'orange')
      .style('font-size', '1.2rem');
  }, [matrixData]);

  return (
    <div className="flex w-[400px]">
      <Card>
          <CardHeader className="text-center">
            <CardTitle>Odds Matrix</CardTitle>
            <CardDescription>Odds from betting sites.</CardDescription>
          </CardHeader>
        <div className="flex justify-center">
            <CardContent>
            <div ref={svgContainerRef}></div>
            </CardContent>
        </div>
      </Card>
    </div>
  );
}
