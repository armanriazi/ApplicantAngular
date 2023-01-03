import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { PlanInformationComponent } from './planinformation.component';
import { PlanInformationRouter } from './planinformation.router';
import { SharedModule } from '../../shared';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { AttachmentModule, AttachmentComponent } from '../../dynamic-modules/attachment';
import { SetWinnerModule, SetWinnerComponent } from '../../dynamic-modules/setwinner';
import { MatButton } from '@angular/material';
import { DynamicComponentLoaderModule, DynamicComponentManifest } from '../../dynamic-component-loader/dynamic-component-loader.module';
import { GridDynamicComponent, GridDynamicModule } from '../../dynamic-modules/grid-dynamic';
import { Column, FieldType, GridOption } from 'aurelia-slickgrid';

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
    PlanInformationComponent 
  ],
  imports: [
    CommonModule,
    PlanInformationRouter,    
    SharedModule,
    AttachmentModule,
    SetWinnerModule,
    DynamicComponentLoaderModule.forRoot(manifests),
    GridDynamicModule,
    AgGridModule.withComponents([AttachmentComponent, SetWinnerComponent])
  ]
})
export class PlanInformationModule { }
//,
//schemas: [
//  CUSTOM_ELEMENTS_SCHEMA,
//  NO_ERRORS_SCHEMA
//]
