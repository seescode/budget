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
  @Input() barPadding: number;
  @Input() maxRectSize: number;

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
          const total = this.calculateTotal(data);
          this.renderBars(data, total);
          this.renderMoneyOnBars(data, total);
        }
      });
    }
  }

  calculateTotal(data: any) {
    return data.map((d: any) => d.amount)
              .reduce((prev: number, next: number) => prev + next);
  }

  setup(data: any) {
    this.isSetup = true;

    this.svg = d3.select('.bar-graph-' + this.title)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.above = this.svg
      .append('g')
      .attr('transform', 'translate(0, -90)');

    const total = this.calculateTotal(data);
    this.renderBars(data, total);
    this.renderMoneyOnBars(data, total);
    this.renderAxis(data);
  }

  renderAxis(data: any) {
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
        const section = this.width / data.length / 2;
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
      .attr('width', this.width - this.barPadding)
      .attr('height', 5);
  }

  renderBars(data: any, total: number) {
    const rect = this.above.selectAll("rect")
      .data(data);

    rect.enter()
      .append("rect")
      .attr("x", (d: any, i: number) => {
        return i * (this.width / data.length);
      })
      .attr("y", (d: any) => {
        const percent = d.amount / total;
        return this.height - (this.maxRectSize * percent);
      })
      .attr("width", this.width / data.length - this.barPadding)
      .attr("height", (d: any) => {
        const percent = d.amount / total;
        return this.maxRectSize * percent;
      })
      .attr("style", 'fill: steelblue;');

    rect.transition()
      .attr("y", (d: any) => {
        const percent = d.amount / total;
        return this.height - (this.maxRectSize * percent);
      })
      .attr("height", (d: any) => {
        const percent = d.amount / total;
        return this.maxRectSize * percent;
      });

  }

  renderMoneyOnBars(data: any, total: number) {
    const text = this.above.selectAll("text")
      .data(data);

    text.enter()
      .append("text")
      .text((d: any) => {
        return '$' + d.amount.toFixed(2);
      })
      .attr('id', (d: any) => this.title + '-' + d.label)
      .attr("text-anchor", "middle")
      .attr("x", (d: any, i: number) => {
        return i * (this.width / data.length) + (this.width / data.length - this.barPadding) / 2;
      })
      .attr("y", (d: any) => {
        const percent = d.amount / total;
        return this.height - (this.maxRectSize * percent) - 5;
      })
      .attr("fill", "black");

    text.transition().text((d: any) => {
        return '$' + d.amount.toFixed(2);
    }).attr("y", (d: any) => {
        const percent = d.amount / total;
        return this.height - (this.maxRectSize * percent) - 5;
    });
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

}
