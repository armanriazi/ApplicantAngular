import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout.router.module';
import { LayoutComponent } from './layout.component';
import {  SharedModule } from '../shared';
import { SimpleDialogDynamicComponent, SimpleDialogDynamicModule } from '../dynamic-modules/simple-dialog-dynamic';

@NgModule({
   declarations: [
    LayoutComponent
  
  ],imports: [
    CommonModule,
    SharedModule,
    LayoutRoutingModule,
    SimpleDialogDynamicModule
  ]
  

})
export class LayoutModule { }
