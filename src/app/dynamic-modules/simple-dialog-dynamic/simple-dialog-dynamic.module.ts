import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { SimpleDialogDynamicComponent } from './simple-dialog-dynamic.component';
import { AgGridModule } from 'ag-grid-angular';
import { DynamicComponentLoaderModule } from '../../dynamic-component-loader/dynamic-component-loader.module';


@NgModule({
  declarations: [
    SimpleDialogDynamicComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([]),
    DynamicComponentLoaderModule.forChild(SimpleDialogDynamicComponent),
  ],
  exports: [SimpleDialogDynamicComponent]  
})
export class SimpleDialogDynamicModule { }
