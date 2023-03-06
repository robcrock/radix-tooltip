import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const MyChart = ({ data, width, height, margin }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    console.log({ width });
    console.log({ height });
    console.log(margin);
    // Calculate chart dimensions and size
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    console.log({ chartWidth });

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, chartWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([chartHeight, 0]);

    console.log("domain", yScale.domain());
    console.log("range", yScale.range());

    // Create SVG element
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Create group element for chart area
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Render bars
    chart
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.category))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => chartHeight - yScale(d.value))
      .attr("fill", "steelblue");

    // Render axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    chart
      .append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(xAxis);
    chart.append("g").call(yAxis);
  }, [data, width, height, margin]);

  return <svg ref={svgRef}></svg>;
};

export default MyChart;
