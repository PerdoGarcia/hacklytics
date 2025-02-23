// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

// export default function OddsMatrix({ chartData: chartData, dashboardData: dashboardData }) {
//     // unpack the data props
//     const mainStats = chartData[chartData.length - 1]
//     const mainAskPrice = mainStats.askPrice,
//         mainBidPrice = mainStats.bidPrice

//     const curStats = dashboardData.odds[0].odds1.Market1
//     const curAskPrice = curStats.market_yes,
//         curBidPrice = curStats.market_no

//     const data = [mainAskPrice, mainBidPrice, curAskPrice, curBidPrice]
 
//     return (
//         <>
//             <Card>
//                 <CardHeader />
//                 <CardDescription>
//                     Stats
//                 </CardDescription>  
//                 {
//                     const svg = d3.select(DOM.svg(width, height))
//                     .style("width", "100%")
//                     .style("height", "auto")
//                     .style("font", "1rem verdana");
                  
//                   const make_class = (item) => item.toLowerCase().split(' ').join('_').split('-').join('')
//                   const make_id = d => `coords_${Math.floor(x(d.xval))}_${Math.floor(y(d.yval))}`
                  
//                   const rects = svg.append("g")
//                     .selectAll("g")
//                     .data(data)
//                     .enter().append("g")
//                     .attr("class", (d, i) => `${i} bar`)
//                     .selectAll("g")
//                     .data(d => categories.map(e => {return {'xval' : d.index, 'yval' : e, 'count': d[e]}}))
//                     .enter().append("g")
//                     .attr("class", (d, i) => `${i} tile`)
//                     .on("mouseover", d => d3.select(`#${make_id(d)}`).transition().duration(0.25).style("opacity", 1))
//                     .on("mouseout", d => d3.select(`#${make_id(d)}`).transition().style("opacity", 0))
                  
//                     rects.append("rect")
//                       .attr("x", d => x(d.xval))
//                       .attr("y", d => y(d.yval))
//                       .attr("width", x.bandwidth())
//                       .attr("height", y.bandwidth())
//                       .style("fill", d => color(d.count))
//                       .append("title")
//                       .text(d => d.count)
                  
//                     rects.append("text")
//                       .attr("id", d => make_id(d))
//                       .attr("dy", ".35em")
//                       .attr("x", d => x(d.xval) + x.bandwidth() / 2)
//                       .attr("y", d => y(d.yval) + y.bandwidth() / 2)
//                       .text(d => d.count)
//                       .style("font-size", "1rem")
//                       .style("opacity", "0")
//                       .style("text-anchor", "middle")
                  
//                   svg.append("g")
//                     .call(xAxis);
                  
//                   svg.append("g")
//                     .call(yAxis);
//                 }

//             </Card> 
//         </>
//     )
// }

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

