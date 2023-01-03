import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { ForbiddenComponent } from './forbidden.component';
import { ForbiddenRouter } from './forbidden.router';

@NgModule({
  declarations: [
    ForbiddenComponent
  ],
  imports: [
    ForbiddenRouter,
    SharedModule
  ]
})
export class ForbiddenModule { }