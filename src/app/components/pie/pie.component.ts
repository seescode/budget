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

  updateSubscription: Subscription;

  svg: any;
  color: any;
  pie: any;
  arc: any;
  rectSize: number;
  spacing: number;
  labelArc: any;

  constructor() { }


  ngOnInit() {

    this.setup();

    if (this.update != null) {
      this.updateSubscription = this.update.subscribe((data: any) => {
        this.render(data);
      });
    }
  }

  setup() {
    this.svg = d3.select('.chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + (this.width / 2) +
      ',' + (this.height / 2) + ')');

    this.rectSize = parseInt(this.legendRectSize);
    this.spacing = parseInt(this.legendSpacing);

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
    // Render the pie slices
    const path = this.svg.selectAll('path')
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
    const g = this.svg.selectAll('text')
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
    const legend = this.svg.selectAll('.legend')
      .data(this.color.domain());

    legend.enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d: any, i: any) => {
        const height = this.rectSize + this.spacing;
        const offset = height * this.color.domain().length / 2;
        const horz = -2 * this.rectSize;
        const vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      })
      .append('rect')
      .attr('width', this.rectSize)
      .attr('height', this.rectSize)
      .style('fill', this.color)
      .style('stroke', this.color);

    legend.append('text')
      .attr('x', this.rectSize + this.spacing)
      .attr('y', this.rectSize - this.spacing)
      .text(function (d: any) { return d; });

    legend.exit().remove();
  }

  render(data: any) {
    console.log('render fired', data);
    this.renderPieSlices(data);
    this.renderLegend(data);
  }
}
