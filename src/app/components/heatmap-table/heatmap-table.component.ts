import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
import { ApiService } from 'src/app/shared/services/api.service';
import { tap, mergeMap, switchMap, flatMap, map, filter } from 'rxjs/operators';
import { from, forkJoin, Subscription } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';
import { DataSource } from '@angular/cdk/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { element } from '@angular/core/src/render3';
import * as moment from 'moment'

export interface FeatureInfo {
  key: string,
  name: string,
  previouspercentile: Number,
  todayspercentile: Number,
  asset: Number
}
@Component({
  selector: 'app-heatmap-table',
  templateUrl: './heatmap-table.component.html',
  styleUrls: ['./heatmap-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class HeatmapTableComponent implements OnInit {
  low: Number = 0.33333333333333333;
  high: Number = 0.66666666666666666;
  dateNow = moment(new Date()).format('YYYY-MM-DD');
  datebefore = moment(new Date()).subtract(1,'months').format('YYYY-MM-DD')
  unit_time: any = "months";
  factor: any = 1;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  percentiles: any[] = [];
  tempItems: any[] = [];
  legenda: any;
  fieldsx: any[] = [];
  _oi : any;
  features: any[]= [];
  displayedColumns: string[] = [
    'field.Name',
    'field.Description',
    'Previous Percentile',
    'Current Percentile'];
  dataSource: MatTableDataSource<any>;
  ItemList: FeatureInfo[] = []
  subs : Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _apiService: ApiService) {
  }
  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    //this.events.push(`${type}: ${event.value}`);
    this.datebefore = moment(event.target.value).format('YYYY-MM-DD');
    
  }
  myFilter = (d: Date): boolean => {
    // Filter Logic Here
    return d.getDay() < Date.now();
  }
  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }
  sortingDataAccessor =
    (data: object, sortHeaderId: string): string | number => {
      const propPath = sortHeaderId.split('.');
      const value: any = propPath
        .reduce((curObj, property) => curObj[property], data);
      return !isNaN(value) ? Number(value) : value;
    };
    newnew(id){
      //
    }
  ngOnInit() {
    forkJoin(
      this._apiService.getUniverse(), this._apiService.getFeatures(),
    ).pipe(
      map(([res1, res2]) => {
        return { universe: res1, legenda: res2 }
      })
    ).subscribe(data => {
     // let tempItems: any[] = [];
      this._oi = data.legenda;
      this._oi.forEach(element => {
        this.tempItems.push((Object.values(element))[0]);
      });
      let body = {
        "assetids": [533],
        "fields": this.tempItems,
        "dates": [this.dateNow,this.datebefore] 
      };
      this.subs = this._apiService.getPercentilebyDate(body).subscribe(d => {
        //d+
        let array: any;
        array = d;
        let filtered_array = array.find(e => e.assetid == 533);
        // Should be a Loop
        let fields1 = filtered_array.assetPercentiles[0].fields;
        let fields2 = filtered_array.assetPercentiles[1].fields;
        // Should be a Loop
        this._oi.forEach(element => {
          this.fieldsx.push({ field: element,showLine:false, percentiles: [Object.values(fields1.find(e => { return e[element.Key] }))[0], Object.values(fields2.find(e => { return e[element.Key] }))[0]] })
        });
        this.dataSource = new MatTableDataSource(this.fieldsx);
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'field' ? currentTerm + data.field.Description + data.field.Key + data.field.Name : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = this.sortingDataAccessor;    
        this.dataSource.sort = this.sort;

      });
    })
  }
  applyData(d:any){
    
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getToolTipData(desc: string): string {
    return desc;
  }
  onChange(event,item) { 
    //console.log(this.features)

     item.checked = !item.checked ;   
     if (!(item.checked) && this.features.includes(item.field)){
        this.features.splice(this.features.indexOf(item.field),1)

     }
     if ((item.checked) && !(this.features.includes(item.field))){
        this.features.push(item.field);

       
     }
   


 }
 ngOnDestroy(): void {
   this.subs.unsubscribe();
   
 }
}


