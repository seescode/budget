import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'yb-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements OnInit, OnDestroy {

  @Input() update: EventEmitter<any>;
  @Input() width: number;
  @Input() height: number;
  @Input() title: string;

  updateSubscription: Subscription;

  svg: any;
  g: any;
  above: any;

  isSetup = false;

  constructor() { }


  ngOnInit() {
    if (this.update != null) {
      this.updateSubscription = this.update.subscribe((data: any) => {

        if (!this.isSetup) {
          this.setup(data);
        } else {
          this.renderBars(data);
          this.renderMoneyOnBars(data);
        }

      });
    }
  }

  setup(data: any) {
    this.isSetup = true;

    this.svg = d3.select('.bar-graph-' + this.title)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    // this.data = [
    //   { label: 'Remaining', amount: 250 },
    //   { label: 'Spent', amount: 30 },
    //   { label: 'Surplus', amount: 30 },
    // ];

    this.above = this.svg
      .append('g')
      .attr('transform', 'translate(0, -90)');

    this.renderBars(data);
    this.renderMoneyOnBars(data);
    this.renderAxis(data);
  }

  renderAxis(data: any) {
    const barPadding = 10;
    const w = this.width;

    const axis = this.svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0, 210)');

    const tick = axis.selectAll('g')
      .data(data);

    const tickEnter = tick.enter()
      .append('g')
      .attr('class', 'tick')
      .attr('transform', (d: any, i: number) => {
        const section = w / data.length / 2;
        const x = section * (1 + (i * 2));
        return 'translate(' + x + ', 0)';
      })
      .attr('style', 'opacity: 1;');

    tickEnter.append('line')
      .attr('y2', 6)
      .attr('x2', 0);

    tickEnter.append('text')
      .attr('dy', '-.55em')
      .attr('y', 9)
      .attr('x', 0)
      .attr('dx', '-.8em')
      .attr('transform', 'rotate(-90)')
      .attr('style', 'text-anchor: end;')
      .text((d: any) => d.label);

    axis.append('rect')
      .attr('x', 0)
      .attr('width', this.width - barPadding)
      .attr('height', 5);
  }

  renderBars(data: any) {

    const barPadding = 10;
    const w = this.width;
    const h = this.height;
    const maxRectSize = 120;

    const total = data.map((d: any) => d.amount).reduce((prev: number, next: number) => prev + next);

    const rect = this.above.selectAll("rect")
      .data(data);

    rect.enter()
      .append("rect")
      .attr("x", function (d: any, i: number) {
        return i * (w / data.length);
      })
      .attr("y", function (d: any) {
        const percent = d.amount / total;
        return h - (maxRectSize * percent);
      })
      .attr("width", w / data.length - barPadding)
      .attr("height", function (d: any) {
        const percent = d.amount / total;
        return maxRectSize * percent;
      })
      .attr("style", 'fill: steelblue;');

    rect
      .attr("y", function (d: any) {
        const percent = d.amount / total;
        return h - (maxRectSize * percent);
      })
      .attr("height", function (d: any) {
        const percent = d.amount / total;
        return maxRectSize * percent;
      });

  }

  renderMoneyOnBars(data: any) {
    const barPadding = 10;
    const w = this.width;
    const h = this.height;
    const maxRectSize = 120;

    const total = data.map((d: any) => d.amount).reduce((prev: number, next: number) => prev + next);

    const text = this.above.selectAll("text")
      .data(data);

    text.enter()
      .append("text")
      .text(function (d: any) {
        return '$' + d.amount;
      })
      .attr("text-anchor", "middle")
      .attr("x", function (d: any, i: number) {
        return i * (w / data.length) + (w / data.length - barPadding) / 2;
      })
      .attr("y", function (d: any) {
        const percent = d.amount / total;
        return h - (maxRectSize * percent) - 5;
      })
      .attr("fill", "black");

    text.text(function (d: any) {
      return '$' + d.amount;
    }).attr("y", function (d: any) {
        const percent = d.amount / total;
        return h - (maxRectSize * percent) - 5;
    });
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

}
