"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { sankey, sankeyLinkHorizontal } from "d3-sankey"

export function SankeyChart() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    // Set up dimensions
    const margin = { top: 10, right: 10, bottom: 10, left: 10 }
    const width = svgRef.current.clientWidth - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    // Define the data - using objects with name property for nodes
    const nodes = [
      { name: "3DS Payment Request\n100%" },
      { name: "Exemption Requested\n34%" },
      { name: "Exemption not Requested\n66%" },
      { name: "Exemption Accepted\n29%" },
      { name: "Exemption not Accepted\n5%" },
      { name: "3DS completed\n62%" },
      { name: "3DS not completed\n9%" },
      { name: "Authentication Success\n88%" },
      { name: "Authentication Failure\n12%" },
      { name: "Authorization Success\n80%" },
      { name: "Authorization Failed\n8%" },
      { name: "Chargeback\n3%" },
    ]

    // Define links with source and target as indices in the nodes array
    const links = [
      { source: 0, target: 1, value: 340 },
      { source: 0, target: 2, value: 660 },
      { source: 1, target: 3, value: 290 },
      { source: 1, target: 4, value: 50 },
      { source: 2, target: 5, value: 620 },
      { source: 2, target: 6, value: 40 },
      { source: 3, target: 7, value: 260 },
      { source: 3, target: 8, value: 30 },
      { source: 4, target: 7, value: 40 },
      { source: 4, target: 8, value: 10 },
      { source: 5, target: 7, value: 580 },
      { source: 5, target: 8, value: 40 },
      { source: 7, target: 9, value: 800 },
      { source: 7, target: 10, value: 80 },
      { source: 9, target: 11, value: 30 },
    ]

    // Create the SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Set up the sankey generator
    const sankeyGenerator = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([
        [0, 0],
        [width, height],
      ])

    // Format the data for the sankey diagram
    const sankeyData = sankeyGenerator({
      nodes: nodes.map((d, i) => ({ ...d, id: i })),
      links: links.map((d) => ({ ...d })),
    })

    // Define color scale for nodes based on their position in the flow
    const colorScale = d3.scaleOrdinal().domain(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]).range([
      "#4f46e5", // Payment Request
      "#8b5cf6", // Exemption Requested
      "#f59e0b", // Exemption not Requested
      "#60a5fa", // Exemption Accepted
      "#f87171", // Exemption not Accepted
      "#10b981", // 3DS completed
      "#f43f5e", // 3DS not completed
      "#8b5cf6", // Authentication Success
      "#3b82f6", // Authentication Failure
      "#60a5fa", // Authorization Success
      "#f87171", // Authorization Failed
      "#f43f5e", // Chargeback
    ])

    // Add the links with gradient colors
    const links_g = svg
      .append("g")
      .selectAll("path")
      .data(sankeyData.links)
      .join("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("fill", "none")
      .attr("stroke-width", (d) => Math.max(1, d.width))
      .attr("stroke-opacity", 0.3)
      .style("mix-blend-mode", "multiply")

    // Create gradients for links
    const defs = svg.append("defs")

    links_g.each(function (d, i) {
      const gradient = defs
        .append("linearGradient")
        .attr("id", `gradient-${i}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", d.source.x1)
        .attr("x2", d.target.x0)

      gradient.append("stop").attr("offset", "0%").attr("stop-color", colorScale(d.source.id.toString()))

      gradient.append("stop").attr("offset", "100%").attr("stop-color", colorScale(d.target.id.toString()))

      d3.select(this).attr("stroke", `url(#gradient-${i})`)
    })

    // Add the nodes
    const node = svg
      .append("g")
      .selectAll("rect")
      .data(sankeyData.nodes)
      .join("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("fill", (d) => colorScale(d.id.toString()))
      .attr("opacity", 0.8)
      .attr("rx", 2)
      .attr("ry", 2)

    // Add node labels
    svg
      .append("g")
      .selectAll("text")
      .data(sankeyData.nodes)
      .join("text")
      .attr("x", (d) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr("y", (d) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) => (d.x0 < width / 2 ? "start" : "end"))
      .text((d) => d.name)
      .attr("font-size", "11px")
      .attr("font-family", "system-ui, sans-serif")
      .attr("fill", "#4b5563")
      .call(wrap, 100) // Wrap text if needed

    // Function to wrap text
    function wrap(text, width) {
      text.each(function () {
        const text = d3.select(this)
        const words = text.text().split(/\n/)
        const lineHeight = 1.1
        const line = []
        let lineNumber = 0
        const y = text.attr("y")
        const dy = Number.parseFloat(text.attr("dy"))
        let tspan = text
          .text(null)
          .append("tspan")
          .attr("x", text.attr("x"))
          .attr("y", y)
          .attr("dy", dy + "em")

        words.forEach((word, i) => {
          if (i > 0) {
            tspan = text
              .append("tspan")
              .attr("x", text.attr("x"))
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word)
          } else {
            tspan.text(word)
          }
        })
      })
    }

    // Add hover interactions
    node
      .on("mouseover", function (event, d) {
        // Highlight the node
        d3.select(this).attr("opacity", 1).attr("stroke", "#000").attr("stroke-width", 1)

        // Highlight connected links
        links_g
          .attr("stroke-opacity", (l) => (l.source.id === d.id || l.target.id === d.id ? 0.7 : 0.1))
          .attr("stroke-width", (l) => (l.source.id === d.id || l.target.id === d.id ? l.width + 1 : l.width))
      })
      .on("mouseout", function () {
        // Reset node
        d3.select(this).attr("opacity", 0.8).attr("stroke", null)

        // Reset links
        links_g.attr("stroke-opacity", 0.3).attr("stroke-width", (d) => Math.max(1, d.width))
      })

    // Add tooltips
    node.append("title").text((d) => d.name)
  }, [])

  return (
    <div className="w-full overflow-x-auto bg-white p-4 rounded-lg">
      <svg ref={svgRef} className="w-full" style={{ minHeight: "500px" }}></svg>
    </div>
  )
}
