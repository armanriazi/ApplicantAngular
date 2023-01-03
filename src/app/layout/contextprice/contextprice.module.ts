import { NgModule  } from '@angular/core';
import { ContextPriceComponent } from './contextprice.component';
import { ContextPriceRouter } from './contextprice.router';
import { SharedModule } from '../../shared';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'angular-tree-component';
import { AgGridModule } from 'ag-grid-angular';
import { DynamicComponentLoaderModule, DynamicComponentManifest } from '../../dynamic-component-loader/dynamic-component-loader.module';
import { GridDynamicComponent,GridDynamicModule } from '../../dynamic-modules/grid-dynamic';

//import { EllipsisModule } from 'ngx-ellipsis';

//This array defines which "componentId" maps to which lazy-loaded module.
const manifests: DynamicComponentManifest[] = [
  {
    componentId: 'app-grid-dynamic',
    path: 'dynamic-grid-dynamic', // some globally-unique identifier, used internally by the router
    loadChildren: '../../dynamic-modules/grid-dynamic/grid-dynamic.module#GridDynamicModule',
  },
]

@NgModule({
  declarations: [
    ContextPriceComponent       
  ],
  imports: [
    CommonModule,
    ContextPriceRouter,    
    SharedModule,
    TreeModule,
    AgGridModule.withComponents([]),
    GridDynamicModule,
    DynamicComponentLoaderModule.forRoot(manifests)
  ],
  providers: [
  ]
})
export class ContextPriceModule { }
