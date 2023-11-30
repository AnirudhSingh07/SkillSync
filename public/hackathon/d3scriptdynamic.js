// public/d3dynamicscript.js
document.addEventListener('DOMContentLoaded', function () {
    // Fetch the demographics data for D3.js visualization
    fetch('/demographics')
        .then(response => response.json())
        .then(data => {
            // Log the demographics data for D3.js visualization
            console.log('Demographics Data:', data);

            // Call the function to draw the D3.js chart
            drawDemographicsChart(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function drawDemographicsChart(data) {
    // Remove existing SVG content
    d3.select('#demographics-container').selectAll('*').remove();

    // Set up the SVG container for D3.js chart
    const width = 600;
    const height = 400;

    const svg = d3.select('#demographics-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create an array of fields and corresponding interests
    const fields = ['Physics', 'Chemistry', 'Economy', 'Psychology', 'Maths', 'Business', 'Politics', 'Sports', 'Other'];
    const interests = fields.map(field => data.reduce((sum, user) => sum + (user[field] || 0), 0));

    // Create scales
    const xScale = d3.scaleBand()
        .domain(fields)
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(interests)])
        .range([height, 0]);

    // Draw bars
    svg.selectAll('rect')
        .data(interests)
        .enter().append('rect')
        .attr('x', (d, i) => xScale(fields[i]))
        .attr('y', d => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d))
        .attr('fill', 'steelblue');

    // Add x-axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

    // Add y-axis
    svg.append('g')
        .call(d3.axisLeft(yScale));

    // Add chart title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .text('User Demographics - Interests in Fields');
}
