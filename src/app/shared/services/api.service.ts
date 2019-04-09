import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url : string = 'http://heatmapapispec-env-1.psegzcake3.eu-west-2.elasticbeanstalk.com/';

  constructor(private http:HttpClient) {

   }
   getUniverse(){
     return this.http.get(this.url+'/universe');
   }
   
   getFeatures(){
    return this.http.get(this.url+'/legenda');
  }
  assetInfo(obj : any){
    let res;
    this.http.post(this.url+'/assetinfo',obj).subscribe(data=>{
      res = data;
    })
    return res;
  }
  getPercentile(data : any){
      return this.http.post(this.url+'/percentile',data);
  }
  getPercentilebyDate(data:any){
    return this.http.post(this.url+'percentile',data);
  }
}
