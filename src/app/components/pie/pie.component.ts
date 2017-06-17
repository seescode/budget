import { Subscription } from 'rxjs/Subscription';
import { PieData } from './pie.interface';
import { Component, OnInit, Input, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'yb-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit, OnDestroy {

  @Input() update: EventEmitter<any>;
  @Input() width: number;
  @Input() height: number;
  @Input() ringWidth: number;
  @Input() legendRectSize: any;
  @Input() legendSpacing: any;
  @Input() title: string;

  updateSubscription: Subscription;

  svg: any;
  g: any;
  color: any;
  pie: any;
  arc: any;
  rectSize: number;
  spacing: number;
  labelArc: any;

  isSetup = false;

  constructor() { }


  ngOnInit() {
    if (this.update != null) {
      this.updateSubscription = this.update.subscribe((data: any) => {

        if (!this.isSetup) {
          this.setup();
        }

        this.render(data);
      });
    }
  }

  setup() {
    this.isSetup = true;
    this.rectSize = parseInt(this.legendRectSize);
    this.spacing = parseInt(this.legendSpacing);

    this.svg = d3.select('.pie-' + this.title)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height + 20);

    this.svg
      .append('g')
      .attr('transform', (d: any, i: any) => {
        // const height = this.rectSize + this.spacing;
        // const offset = height * this.color.domain().length / 2;
        const horz = this.width / 2;
        // const vert = i * height - offset;
        return 'translate(' + horz + ',0)';
      })
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('y', 15)
      .text(this.title);

    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + (this.width / 2) +
      ',' + (this.height / 2 + 20) + ')');


    const radius = Math.min(this.width, this.height) / 2;

    this.color = d3.scaleOrdinal(d3.schemeCategory20b);


    this.arc = d3.arc()
      .innerRadius(radius - this.ringWidth)
      .outerRadius(radius);

    this.labelArc = d3.arc()
      .outerRadius(radius - 25)
      .innerRadius(radius - 25);

    this.pie = d3.pie()
      .value(function (d: any) { return d.amount; })
      .sort(null);

  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  renderPieSlices(data: any) {

    console.log(this.title, data);

    // Render the pie slices
    const path = this.g.selectAll('path')
      .data(this.pie(data));

    path.enter()
      .append('path')
      .attr('d', this.arc)
      .attr('fill', (d: any) => {
        return this.color(d.data.label);
      });

    path.exit()
      .remove();

    path.attr('d', this.arc)
      .attr('fill', (d: any) => {
        return this.color(d.data.label);
      });

    // Render the text on the pie slices
    const g = this.g.selectAll('text')
      .data(this.pie(data));

    g.enter()
      .append('text')
      .attr('transform', (d: any) => { return 'translate(' + this.labelArc.centroid(d) + ')'; })
      .attr('dy', '.35em')
      .text((d: any) => { return d.data.amount; });

    g.exit().remove();

    g.attr('transform', (d: any) => { return 'translate(' + this.labelArc.centroid(d) + ')'; })
      .attr('dy', '.35em')
      .text((d: any) => { return d.data.amount; });
  }

  renderLegend(data: any) {
    const legend = this.g.selectAll('.legend')
      .data(this.color.domain());

      /**
       * <g class="legend">
       *   <rect>
       *   <text>
       * </g>
       */
    const g = legend.enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d: any, i: any) => {
        const height = this.rectSize + this.spacing;
        const offset = height * this.color.domain().length / 2;
        const horz = -2 * this.rectSize;
        const vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });

    g.enter()
      .append('rect')
      .attr('width', this.rectSize)
      .attr('height', this.rectSize)
      .style('fill', this.color)
      .style('stroke', this.color);

    g.append('rect')
      .attr('width', this.rectSize)
      .attr('height', this.rectSize)
      .style('fill', this.color)
      .style('stroke', this.color);

    g.enter()
      .append('text')
      .attr('x', this.rectSize + this.spacing)
      .attr('y', this.rectSize - this.spacing)
      .text(function (d: any) { return d; });

    g.append('text')
      .attr('x', this.rectSize + this.spacing)
      .attr('y', this.rectSize - this.spacing)
      .text(function (d: any) { return d; });

    g.exit().remove();
    legend.exit().remove();
  }

  render(data: any) {
    this.renderPieSlices(data);
    this.renderLegend(data);
  }
}
