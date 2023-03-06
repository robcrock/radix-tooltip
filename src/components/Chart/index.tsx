import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import * as Tooltip from "@radix-ui/react-tooltip";
import "./styles.css";
import { Category } from "../../App";

type ChartProps = {
  data: Category[];
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

const MyChart: React.FC<ChartProps> = ({
  data = [],
  width,
  height,
  margin,
}) => {
  // Create the ref to bind the chart to
  const svgRef = useRef(null);
  const plotRef = useRef(null);

  // Calculate chart dimensions and size
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Create scales
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.category))
    .range([0, chartWidth])
    .padding(0.1);

  const yMax = d3.max(data, (d) => d.value);
  const yScale = d3
    .scaleLinear()
    .domain([0, yMax as number])
    .range([chartHeight, 0]);

  // Render Axes
  useEffect(() => {
    // Create a ref to bind the axes to
    const chart = d3.select(plotRef.current).append("g");

    // Render axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    chart
      .append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(xAxis);

    chart.append("g").call(yAxis);
  }, [data]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <Tooltip.Provider delayDuration={0}>
        <g ref={plotRef} transform={`translate(${margin.left}, ${margin.top})`}>
          {data.map((d) => {
            return (
              <React.Fragment key={d.category}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <rect
                      key={d.category}
                      x={xScale(d.category)}
                      y={yScale(d.value)}
                      width={xScale.bandwidth()}
                      height={chartHeight - yScale(d.value)}
                      fill="steelblue"
                    />
                  </Tooltip.Trigger>
                  <Tooltip.Portal key={d.category}>
                    <Tooltip.Content className="TooltipContent" sideOffset={5}>
                      Radix Tooltip 🎉
                      <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </React.Fragment>
            );
          })}
        </g>
      </Tooltip.Provider>
    </svg>
  );
};

export default MyChart;
