// Sample data
const data = [
    { field: 'Physics', interest: 4 },
    { field: 'Chemistry', interest: 3 },
    { field: 'Economy', interest: 2 },
    { field: 'Psychology', interest: 5 }
];

// Set up the SVG container
const width = 400;
const height = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

let svg;

// Create scales
const xScale = d3.scaleBand()
    .domain(data.map(d => d.field))
    .range([0, width])
    .padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.interest)])
    .range([height, 0]);

// Draw bars
function drawBarChart() {
    svg.selectAll('*').remove();

    svg.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', d => xScale(d.field))
        .attr('y', d => yScale(d.interest))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d.interest))
        .attr('fill', 'steelblue');

    // Add x-axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g')
        .call(d3.axisLeft(yScale));

    // Add chart title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', -margin.top / 2)
        .attr('text-anchor', 'middle')
        .text('Student Interests in Different Fields');
}

// Draw pie chart
function drawPieChart() {
    svg.selectAll('*').remove();

    const pie = d3.pie().value(d => d.interest);
    const arc = d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 2);

    const arcs = svg.selectAll('arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

    arcs.append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => d3.schemeCategory10[i]);

    // Add chart title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', -margin.top / 2)
        .attr('text-anchor', 'middle')
        .text('Student Interests Distribution');
}

// Draw line chart
function drawLineChart() {
    svg.selectAll('*').remove();

    const line = d3.line()
        .x(d => xScale(d.field) + xScale.bandwidth() / 2)
        .y(d => yScale(d.interest));

    svg.append('path')
        .data([data])
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2);

    // Add x-axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g')
        .call(d3.axisLeft(yScale));

    // Add chart title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', -margin.top / 2)
        .attr('text-anchor', 'middle')
        .text('Student Interests Over Fields');
}

// Initial draw
drawBarChart();

// Function to switch between chart types
function drawChart(chartType) {
    if (chartType === 'bar') {
        drawBarChart();
    } else if (chartType === 'pie') {
        drawPieChart();
    } else if (chartType === 'line') {
        drawLineChart();
    }
}

// ... (previous code)

// Function to switch between chart types
function drawChart(chartType) {
    // Remove existing SVG content
    d3.select('svg').remove();

    // Set up the SVG container
    svg = d3.select('body')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    if (chartType === 'bar') {
        drawBarChart();
    } else if (chartType === 'pie') {
        drawPieChart();
    } else if (chartType === 'line') {
        drawLineChart();
    }
}

// Initial draw
drawChart('bar');
