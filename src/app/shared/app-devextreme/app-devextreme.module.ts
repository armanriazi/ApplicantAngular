import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DevExtremeModule } from 'devextreme-angular';
import { DxServerTransferStateModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    DevExtremeModule,

    DxServerTransferStateModule
  ],
  exports: [
    FlexLayoutModule,
    CommonModule,
    DevExtremeModule,
    DxServerTransferStateModule
  ]
})
export class AppDevextremeModule { }
