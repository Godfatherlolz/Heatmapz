import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setUser(){
    localStorage.setItem("CurrentUser" , JSON.stringify({assetId:533}))
    let user = JSON.parse(localStorage.getItem('CurrentUser'));
    return user;
  }
  getFeatures(){
    
  }
}
