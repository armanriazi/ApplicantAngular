import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridModule, PagerModule } from '@progress/kendo-angular-grid';
import { ButtonsModule, ButtonGroupModule, ButtonModule } from '@progress/kendo-angular-buttons';
import { DialogModule, WindowModule } from '@progress/kendo-angular-dialog';
import { InputsModule, SliderModule } from '@progress/kendo-angular-inputs';

@NgModule({
  imports: [        
    CommonModule,
    GridModule,
    ButtonsModule,
    DialogModule,
    InputsModule,
    WindowModule,
    SliderModule,
    PagerModule,
    ButtonGroupModule,
    ButtonsModule,
    ButtonModule
  ],
  exports: [
    FlexLayoutModule,   
    CommonModule,
    GridModule,
    ButtonsModule,
    DialogModule,
    InputsModule,
    WindowModule,
    SliderModule,
    PagerModule,
    ButtonGroupModule,
    ButtonsModule,
    ButtonModule
  ]
})
export class AppKendoModule { }
