import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { GridDynamicComponent } from './grid-dynamic.component';
import { AgGridModule } from 'ag-grid-angular';
import { DynamicComponentLoaderModule } from '../../dynamic-component-loader/dynamic-component-loader.module';


@NgModule({
  declarations: [
  GridDynamicComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([]),
    DynamicComponentLoaderModule.forChild(GridDynamicComponent),
  ],
  exports: [GridDynamicComponent]  
})
export class GridDynamicModule { }
