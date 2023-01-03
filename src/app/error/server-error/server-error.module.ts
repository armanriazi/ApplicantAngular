import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { ServerErrorComponent } from './server-error.component';
import { ServerErrorRouter } from './server-error.router';

@NgModule({
  declarations: [
    ServerErrorComponent
  ],
  imports: [
    ServerErrorRouter,
    SharedModule
  ]
})
export class ServerErrorModule { }