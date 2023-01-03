import { NgModule } from '@angular/core';
import { DynamicComponentLoaderModule, DynamicComponentManifest } from '../../dynamic-component-loader/dynamic-component-loader.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { SetWinnerComponent } from './setwinner.component';

@NgModule({
  declarations: [
    SetWinnerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,        
    DynamicComponentLoaderModule.forChild(SetWinnerComponent),
  ],  
  exports: [SetWinnerComponent] 
})
export class SetWinnerModule { }
