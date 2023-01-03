import { NgModule } from '@angular/core';
import { DynamicComponentLoaderModule, DynamicComponentManifest } from '../../dynamic-component-loader/dynamic-component-loader.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { AttachmentComponent } from './attachment.component';
import { AttachmentDialogDynamicComponent, AttachmentDialogDynamicModule } from '../attachment-dialog-dynamic';

//This array defines which "componentId" maps to which lazy-loaded module.
const manifests: DynamicComponentManifest[] = [
  {
    componentId: 'attachment-dialog-dynamic',
    path: 'dynamic-attachment-dialog-dynamic', // some globally-unique identifier, used internally by the router
    loadChildren: '../attachment-dialog-dynamic/attachment-dialog-dynamic.module#AttachmentDialogDynamicModule',
  },
]

@NgModule({
  declarations: [
    AttachmentComponent    
  ],
  imports: [
    CommonModule,    
    SharedModule,
    AttachmentDialogDynamicModule,
    DynamicComponentLoaderModule.forRoot(manifests)
  ],
  exports: [AttachmentComponent]
})
export class AttachmentModule { }
