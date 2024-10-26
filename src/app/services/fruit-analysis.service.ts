import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { IFruit } from '../interfaces/fruit.interface';

@Injectable({
  providedIn: 'root',
})
export class FruitAnalysisService {
  private svg: any;
  private margin = { top: 20, right: 20, bottom: 50, left: 40 };
  private width: number = 0;
  private height: number = 0;

  analyzeFruits(fruits: IFruit[]) {
    // Clear any existing chart
    d3.select('figure#fruit-chart').selectAll('*').remove();

    const fruitCounts = this.countFruits(fruits);
    this.createSvg();
    this.drawBars(fruitCounts);
    return fruitCounts;
  }

  private countFruits(fruits: IFruit[]): { name: string; count: number }[] {
    const counts: { [key: string]: number } = {};
    fruits.forEach((fruit) => {
      counts[fruit.name] = (counts[fruit.name] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }

  private createSvg(): void {
    const chartContainer = d3
      .select('figure#fruit-chart')
      .node() as HTMLElement;
    this.width =
      chartContainer.getBoundingClientRect().width -
      this.margin.left -
      this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;

    this.svg = d3
      .select('figure#fruit-chart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr(
        'viewBox',
        `0 0 ${this.width + this.margin.left + this.margin.right} ${
          this.height + this.margin.top + this.margin.bottom
        }`
      )
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  private drawBars(data: { name: string; count: number }[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.name))
      .padding(0.2);

    // Draw the X-axis
    this.svg
      .append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) || 0])
      .range([this.height, 0]);

    // Draw the Y-axis
    this.svg.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.name))
      .attr('y', (d: any) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.count))
      .attr('fill', '#d04a35');
  }
}
