import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { NotFoundComponent } from './not-found.component';
import { NotFoundRouter } from './not-found.router';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    NotFoundRouter,
    SharedModule
  ]
})
export class NotFoundModule { }