import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { ErrorComponent } from './error.component';
import { ErrorRouter } from './error.router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorRouter,
    SharedModule    
  ]
})
export class ErrorModule { }
