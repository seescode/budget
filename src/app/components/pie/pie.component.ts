import { Subscription } from 'rxjs/Subscription';
import { PieData } from './pie.interface';
import { Component, OnInit, Input, EventEmitter, OnDestroy } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'yb-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit, OnDestroy {

  @Input() dataset: any[];
  @Input() update: EventEmitter<any>;
  @Input() width: number;
  @Input() height: number;
  @Input() ringWidth: number;
  @Input() legendRectSize: any;
  @Input() legendSpacing: any;

  updateSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.render();

    if (this.update != null) {
      this.updateSubscription = this.update.subscribe(() => {
        this.render();
      });
    }
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  render() {

    const legendRectSize: number = parseInt(this.legendRectSize);
    const legendSpacing: number = parseInt(this.legendSpacing);

    let radius = Math.min(this.width, this.height) / 2;

    let color = d3.scaleOrdinal(d3.schemeCategory20b);

    let svg = d3.select('.chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + (this.width / 2) +
      ',' + (this.height / 2) + ')');

    let arc: any = d3.arc()
      .innerRadius(radius - this.ringWidth)
      .outerRadius(radius);

    var labelArc = d3.arc()
      .outerRadius(radius - 25)
      .innerRadius(radius - 25);

    let pie = d3.pie()
      .value(function (d: any) { return d.amount; })
      .sort(null);

    let path = svg.selectAll('path')
      .data(pie(this.dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d: any) {
        return color(d.data.label);
      });

    var legend = svg.selectAll('.legend')
      .data(color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => {
        var height = legendRectSize + legendSpacing;
        var offset = height * color.domain().length / 2;
        var horz = -2 * legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', color)
      .style('stroke', color);

    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function (d) { return d; });

    var g = svg.selectAll(".arc")
      .data(pie(this.dataset))
      .enter().append("g")
      .attr("class", "arc");

    g.append("text")
      .attr("transform", function (d: any) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function (d: any) { return d.data.amount; });
  }

}
