import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { AttachmentDialogDynamicComponent } from './attachment-dialog-dynamic.component';
import { DynamicComponentLoaderModule } from '../../dynamic-component-loader/dynamic-component-loader.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [    
    AttachmentDialogDynamicComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule,
    DynamicComponentLoaderModule.forChild(AttachmentDialogDynamicComponent)
  ]
  , exports: [AttachmentDialogDynamicComponent]  
})
export class AttachmentDialogDynamicModule { }
