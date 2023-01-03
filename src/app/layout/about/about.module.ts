import { NgModule } from '@angular/core';
//import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about.component';
import { AboutRouter } from './about.router';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    AboutRouter
   
  ],
  providers: [

  ]
})
export class AboutModule { }
