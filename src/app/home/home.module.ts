import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { HomeComponent } from './home.component';
import { HomeRouter } from './home.router';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRouter,
    SharedModule
  ],
  providers: [

  ]
})
export class HomeModule { }
