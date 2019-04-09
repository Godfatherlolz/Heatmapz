import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-featureselector',
  templateUrl: './featureselector.component.html',
  styleUrls: ['./featureselector.component.css']
})
export class FeatureselectorComponent implements OnInit {


  constructor(private _api: ApiService ,private fb: FormBuilder) {}
  myControl = new FormControl();
  options: any[] = [
    {key: "er_1", name: 'feature1'},
    {key: "er_2", name: 'feature2'}

  ];
  filteredOptions: Observable<any[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(feature?: any): string | undefined {
    console.log(feature ? feature.key : undefined);
    return feature ? feature.name : undefined;
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}

