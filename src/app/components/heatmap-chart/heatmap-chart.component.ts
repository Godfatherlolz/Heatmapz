import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChange, IterableDiffers, KeyValueChangeRecord, IterableChangeRecord } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from 'src/app/shared/services/api.service';
import { tap, mergeMap, switchMap, flatMap, map, filter } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-heatmap-chart',
  templateUrl: './heatmap-chart.component.html',
  styleUrls: ['./heatmap-chart.component.css']
})
export class HeatmapChartComponent implements OnInit {
  fieldsx: any[] = [];
  labels: any[] = [];
  _oi: any;
  showChart: Boolean = false;
  LineChart: any;
  featureCheck: any;
  checked = false;
  DataSetControl:any[]=[];
  DataSetControlLive: any[] = [{
    label: 'Bottom 33%',
    data: [33.33, 33.33, 33.33, 33.33, 33.33, 33.33, 33.33, 33.33, 33.33, 33.33, 33.33, 33.33],
    fill: true,
    lineTension: 0.2,
    borderColor: "red",
    backgroundColor	:'rgba(255, 204, 188,0.1)',
    borderWidth: 0,
    pointRadius:0
  },
  {
    label: 'mid 33%',
    data: [66.66, 66.66, 66.66, 66.66, 66.66, 66.66, 66.66, 66.66, 66.66, 66.66, 66.66, 66.66],
    backgroundColor	:'rgba(245, 245, 245,0.1)',
    lineTension: 0.2,
    fill: "-1",
    borderColor: "yellow",
    borderWidth: 0,
    pointRadius:0
  },
  {
    label: 'Top 33%',
    data: [100,100,100,100,100,100,100,100,100,100,100,100],
    fill: "-1",
    lineTension: 0.2,
    backgroundColor	:'rgba(187, 222, 251,0.1)',
    borderColor: "green",
    borderWidth: 0,
    pointRadius:0
  }
];
  tempItems: any[] = [];
  iterableDiffer : any;
  constructor(private _apiService: ApiService,private _iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
   }
  @ViewChild('lineChart') myCanvas: ElementRef;
  @Input() features: any[]= [];
  public context: CanvasRenderingContext2D;
  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.LineChart = new Chart(this.context, {
      type: 'line',
      data: {
        labels: ["2018-01-1", "2018-02-01", "2018-03-01", "2018-04-01", "2018-05-01", "2018-06-01", "2018-07-01", "2018-08-01", "2018-09-01", "2018-10-01", "2018-11-01", "2018-12-01"],
        datasets: this.DataSetControlLive
      },
      options: {
        legend: {
          position:"right",
          display: true
        },
        title: {
          text: "Chart View",
          display: true
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
                unit: 'month'
            }
        }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
    );
    
  }
    addData(record) {
    
        let temp:any = this.DataSetControl.find(ele =>{return ele.id===record.Key});
        temp.showLine = true;
        temp.pointRadius = 5;
        this.DataSetControlLive.push(temp);
      
     this.LineChart.update();
}
 removeData(record) {
  console.log(this.LineChart.data.datasets)    

    this.DataSetControlLive = this.DataSetControlLive.filter(e=>{return e.id !== record.Key});
  this.LineChart.data.datasets =this.DataSetControlLive;
  this.LineChart.update();

}
  ngOnChanges(changes: SimpleChange): void {
   
  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.featureCheck = this.features;
    let changes = this.iterableDiffer.diff(this.features);
    if (changes) {
      changes.forEachAddedItem((record: IterableChangeRecord<any>)=>{
        console.log("Adding")
        this.addData(record.item);
        console.log("Added")

      });
      changes.forEachRemovedItem((record: IterableChangeRecord<any>)=>{
        console.log("Removing")
        this.removeData(record.item); 
        console.log("Removed")

      })
     
  }
  }
  ngOnInit() {

    let array: any;
    forkJoin(
      this._apiService.getUniverse(), this._apiService.getFeatures(),
    ).pipe(
      map(([res1, res2]) => {
        return { universe: res1, legenda: res2 }
      })
    ).subscribe(data => {
      this._oi = data.legenda;
      this._oi.forEach(element => {
        this.tempItems.push((Object.values(element))[0]);
      });
      let body = {
        "assetids": [533],
        "fields": this.tempItems,
        "dates": ["2018-01-1", "2018-02-01", "2018-03-01", "2018-04-01", "2018-05-01", "2018-06-01", "2018-07-01", "2018-08-01", "2018-09-01", "2018-10-01", "2018-11-01", "2018-12-01"] /// LF moment.js
      };
      this._apiService.getPercentilebyDate(body).subscribe(d => {
        let array: any;
        array = d;
        let filtered_array = array.find(e => e.assetid == 533);
        this._oi.forEach(ele => {
          
          let dataTemp: any = [];
          let i = 0;
          let sq: any = ele.Key;

          filtered_array.assetPercentiles.forEach(element => {
            this.labels.push(element.date);
            i = (filtered_array.assetPercentiles).indexOf(element);
            let target: any = (Object.values(element.fields.find(e => { return e[sq] }))[0])
            dataTemp.push(target * 100)
          });
          
          let dataItem: any = {id:ele.Key, label: ele.Name, data: dataTemp, showLine:false, pointRadius:0,fill: false, lineTension: 0, borderColor: "#03A9F4", borderWidth: 1 }
          this.DataSetControl.push(dataItem);

        });
        this.showChart = true;
      });



    })

  }
 

}
