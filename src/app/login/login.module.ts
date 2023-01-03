import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRouter } from './login.router';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicComponentLoaderModule, DynamicComponentManifest } from '../dynamic-component-loader/dynamic-component-loader.module';
import { SimpleDialogDynamicComponent, SimpleDialogDynamicModule } from '../dynamic-modules/simple-dialog-dynamic';


//This array defines which "componentId" maps to which lazy-loaded module.
const manifests: DynamicComponentManifest[] = [
  {
    componentId: 'simple-dialog-dynamic',
    path: 'dynamic-simple-dialog-dynamic', // some globally-unique identifier, used internally by the router
    loadChildren: '../dynamic-modules/simple-dialog-dynamic/simple-dialog-dynamic.module#SimpleDialogDynamicModule',
  },
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRouter,    
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicComponentLoaderModule.forRoot(manifests),
    SimpleDialogDynamicModule, 
  ],
  providers: [

  ]
})
export class LoginModule { }
