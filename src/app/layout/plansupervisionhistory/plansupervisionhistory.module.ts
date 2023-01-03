import { NgModule } from '@angular/core';
import { PlanSupervisionHistoryComponent } from './plansupervisionhistory.component';
import { PlanSupervisionHistoryRouter } from './plansupervisionhistory.router';
import { SharedModule } from '../../shared';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { DynamicComponentLoaderModule, DynamicComponentManifest } from '../../dynamic-component-loader/dynamic-component-loader.module';
import { GridDynamicComponent, GridDynamicModule } from '../../dynamic-modules/grid-dynamic';

//This array defines which "componentId" maps to which lazy-loaded module.
const manifests: DynamicComponentManifest[] = [
  {
    componentId: 'grid-dynamic',
    path: 'dynamic-grid-dynamic', // some globally-unique identifier, used internally by the router
    loadChildren: '../../dynamic-modules/grid-dynamic/grid-dynamic.module#GridDynamicModule',
  },
]

@NgModule({
  declarations: [
    PlanSupervisionHistoryComponent 
  ],
  imports: [
    CommonModule,
    PlanSupervisionHistoryRouter,
    SharedModule,    
    DynamicComponentLoaderModule.forRoot(manifests),
    GridDynamicModule,
    AgGridModule.withComponents([])
  ]
})
export class PlanSupervisionHistoryModule { }
