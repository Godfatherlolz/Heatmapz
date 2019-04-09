import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FeatureselectorComponent } from './featureselector/featureselector.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { HeatmapTableComponent } from './heatmap-table/heatmap-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule, MatTooltip} from '@angular/material/tooltip';
import { HeatmapChartComponent } from './heatmap-chart/heatmap-chart.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDatepickerModule,
  MatNativeDateModule} from '@angular/material';
  import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
  import {MatCheckboxModule} from '@angular/material/checkbox';
  import { MatIconModule } from '@angular/material/icon';
  import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, FeatureselectorComponent, HeatmapTableComponent, HeatmapChartComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    FormsModule, ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonToggleModule
  ],
  exports: [FeatureselectorComponent,MatFormField,HeatmapTableComponent,HeatmapChartComponent]
})
export class ComponentsModule { }
