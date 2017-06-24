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
  data: any;

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

  // <svg width="280" height="350">
  //   <g transform="translate(40,20)">
  //     <g class="x axis" transform="translate(0,210)">
  //       <g class="tick" transform="translate(33,0)" style="opacity: 1;">
  //         <line y2="6" x2="0"></line>
  //         <text dy="-.55em" y="9" x="0" dx="-.8em" transform="rotate(-90)" style="text-anchor: end;">Remaining</text>
  //       </g>
  //       <g class="tick" transform="translate(86,0)" style="opacity: 1;">
  //         <line y2="6" x2="0"></line>
  //         <text dy="-.55em" y="9" x="0" dx="-.8em" transform="rotate(-90)" style="text-anchor: end;">Spent</text>
  //       </g>
  //       <g class="tick" transform="translate(140,0)" style="opacity: 1;">
  //         <line y2="6" x2="0"></line>
  //         <text dy="-.55em" y="9" x="0" dx="-.8em" transform="rotate(-90)" style="text-anchor: end;">Surplus</text>
  //       </g>
  //       <path class="domain" d="M0,6V0H165V6"></path>
  //     </g>
  //     <rect x="5" width="50" y="186.7154811715481" height="23.284518828451894" style="fill: steelblue;"></rect>
  //     <rect x="57" width="50" y="137.51046025104603" height="72.48953974895397" style="fill: steelblue;"></rect>
  //     <rect x="109" width="50" y="91.82008368200837" height="118.17991631799163" style="fill: steelblue;"></rect>

  //     <text x="29" y="180" style="text-anchor: middle;">$1</text>
  //     <text x="81" y="131.5" style="text-anchor: middle;">$2</text>
  //     <text x="134" y="86.8" style="text-anchor: middle;">$2</text>
  //   </g>
  // </svg>

  setup() {
    this.isSetup = true;
    // this.rectSize = parseInt(this.legendRectSize);
    // this.spacing = parseInt(this.legendSpacing);

    this.svg = d3.select('.bar-graph-' + this.title)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.g = this.svg
      .append('g')
      .attr("transform", "translate(40, 20)");

    this.data = [
      {
        rect: {
          x: 5,
          y: 186.7154811715481,
          height: 23.284518828451894
        },
        text: {
          x: 29,
          y: 180,
          amount: '$1'
        }
      },
      {
        rect: {
          x: 57,
          y: 137.51046025104603,
          height: 72.48953974895397
        },
        text: {
          x: 81,
          y: 131.5,
          amount: '$2'
        }
      },
      {
        rect: {
          x: 109,
          y: 91.82008368200837,
          height: 118.17991631799163
        },
        text: {
          x: 134,
          y: 86.8,
          amount: '$3'
        }
      }
    ];

    this.renderMoneyOnBars();
    this.renderBars();
  }

  /**
   * <rect x="5" width="50" y="186.7154811715481" height="23.284518828451894" style="fill: steelblue;"></rect>
   * <rect x="57" width="50" y="137.51046025104603" height="72.48953974895397" style="fill: steelblue;"></rect>
   * <rect x="109" width="50" y="91.82008368200837" height="118.17991631799163" style="fill: steelblue;"></rect>
   *
   * @memberof BarGraphComponent
   */
  renderBars() {
    const path = this.g.selectAll('rect')
      .data(this.data);

    path.enter()
      .append('rect')
      .attr('x', (d: any) => {
        return d.rect.x;
      })
      .attr('width', 50)
      .attr('y', (d: any) => {
        return d.rect.y;
      })
      .attr('height', (d: any) => {
        return d.rect.height;
      })
      .attr('style', 'fill: steelblue;');
  }

  /**
   * <text x="29" y="180" style="text-anchor: middle;">$1</text>
   * <text x="81" y="131.5" style="text-anchor: middle;">$2</text>
   * <text x="134" y="86.8" style="text-anchor: middle;">$2</text>
   *
   * @memberof BarGraphComponent
   */
  renderMoneyOnBars() {
    const path = this.g.selectAll('text')
      .data(this.data);

    path.enter()
      .append('text')
      .attr('x', (d: any) => {
        return d.text.x;
      })
      .attr('y', (d: any) => {
        return d.text.y;
      })
      .attr('style', 'text-anchor: middle;')
      .text((d: any) => d.text.amount);
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  renderPieSlices(data: any) {

    // Render the pie slices
    // const path = this.g.selectAll('path')
    //   .data(this.pie(data));

    // path.enter()
    //   .append('path')
    //   .attr('d', this.arc)
    //   .attr('fill', (d: any) => {
    //     return this.color(d.data.label);
    //   });

    // path.exit()
    //   .remove();

    // path.attr('d', this.arc)
    //   .attr('fill', (d: any) => {
    //     return this.color(d.data.label);
    //   });

    // // Render the text on the pie slices
    // const g = this.g.selectAll('text')
    //   .data(this.pie(data));

    // g.enter()
    //   .append('text')
    //   .attr('transform', (d: any) => { return 'translate(' + this.labelArc.centroid(d) + ')'; })
    //   .attr('dy', '.35em')
    //   .text((d: any) => { return d.data.amount; });

    // g.exit().remove();

    // g.attr('transform', (d: any) => { return 'translate(' + this.labelArc.centroid(d) + ')'; })
    //   .attr('dy', '.35em')
    //   .text((d: any) => { return d.data.amount; });
  }

  renderLegend(data: any) {

    // function renderLegendSquare(selection: any, that: any) {
    //   selection.append('rect')
    //     .attr('width', that.rectSize)
    //     .attr('height', that.rectSize)
    //     .style('fill', that.color)
    //     .style('stroke', that.color);
    // }

    // function renderLegendText(selection: any, that: any) {
    //   selection.append('text')
    //     .attr('x', that.rectSize + that.spacing)
    //     .attr('y', that.rectSize - that.spacing)
    //     .text(function (d: any) { return d; });
    // }

    // /**
    //  * <g class="legend">
    //  *   <rect>
    //  *   <text>
    //  * </g>
    //  */
    // const legend = this.g.selectAll('g')
    //   .data(this.color.domain())

    // legend.enter()
    //   .append('g')
    //   .attr('class', 'legend')
    //   .attr('transform', (d: any, i: any) => {
    //     const height = this.rectSize + this.spacing;
    //     const offset = height * this.color.domain().length / 2;
    //     const horz = -2 * this.rectSize;
    //     const vert = i * height - offset;
    //     return 'translate(' + horz + ',' + vert + ')';
    //   })
    //   .call(renderLegendSquare, this)
    //   .call(renderLegendText, this);

    // legend.exit().remove();

    // legend.attr('class', 'legend')
    //   .attr('transform', (d: any, i: any) => {
    //     const height = this.rectSize + this.spacing;
    //     const offset = height * this.color.domain().length / 2;
    //     const horz = -2 * this.rectSize;
    //     const vert = i * height - offset;
    //     return 'translate(' + horz + ',' + vert + ')';
    //   })
    //   .call(renderLegendText, this);

    // const text2 = legend
    //   .attr('class', 'legend')
    //   .attr('transform', (d: any, i: any) => {
    //     const height = this.rectSize + this.spacing;
    //     const offset = height * this.color.domain().length / 2;
    //     const horz = -2 * this.rectSize;
    //     const vert = i * height - offset;
    //     return 'translate(' + horz + ',' + vert + ')';
    //   })
    //   .call(renderLegendSquare)
    //   .call(renderLegendText)


    // let rect2 = text2.append('rect')
    //   .attr('width', this.rectSize)
    //   .attr('height', this.rectSize)
    //   .style('fill', this.color)
    //   .style('stroke', this.color);

    // rect2.exit().remove();



    //text1.exit().remove();
    //text2.exit().remove();


    // let rect1 = text1.enter().append('rect')
    // .attr('width', this.rectSize)
    // .attr('height', this.rectSize)
    // .style('fill', this.color)
    // .style('stroke', this.color);

    // text1.enter()
    //    .append('text')
    //    .attr('x', this.rectSize + this.spacing)
    //    .attr('y', this.rectSize - this.spacing)
    //    .text(function (d: any) { return d; });

    // rect1.exit().remove();
  }

  render(data: any) {
    this.renderPieSlices(data);
    this.renderLegend(data);
  }
}
