import { Component } from '@angular/core';
import { ApiService } from './shared/services/api.service';
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'heatmap';
  constructor(private testapi:ApiService,private _localStorageService:LocalStorageService){
   /* console.log(this._localStorageService.setUser());
        this.testapi.getUniverse().subscribe(data=>{
      console.log(data);
    })*/
  }

}
