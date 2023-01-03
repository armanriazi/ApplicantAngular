import { NgModule } from '@angular/core';
import { IgraphComponent } from './igraph.component';
import { IGraphRouter } from './igraph.router';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    IgraphComponent
  ],
  imports: [
    CommonModule,
    IGraphRouter,    
    SharedModule
  ],
  providers: [

  ]
})
export class IgraphModule { }
