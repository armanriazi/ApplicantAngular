import { Component, OnDestroy, OnInit, Inject, ViewChild, ViewContainerRef } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { MatButton, MatInput, MatDialog, MatIconRegistry, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AttachmentDialogDynamicComponent } from "../attachment-dialog-dynamic";
import { DynamicComponentLoader } from "../../dynamic-component-loader/dynamic-component-loader.service";
//import { ViewContainerRef, ViewChild} from "@angular/core";

@Component({
  selector: 'app-attachment-cell',
  templateUrl: './attachment.component.html'  
})
export class AttachmentComponent implements ICellRendererAngularComp, OnInit , OnDestroy {
  params: any;

  @ViewChild('testOutlet', { read: ViewContainerRef }) testOutlet: ViewContainerRef;

  constructor(
    private dialog: MatDialog,
    private dynamicComponentLoader: DynamicComponentLoader) {
  }

  ngOnInit() { }
 
  agInit(params: any): void {
    this.params = params;
    //this.params.data.pMS_PaID
  }
  ngOnDestroy() {
    //console.log('Destroying AttachmentComponent');
  }
  refresh(params): boolean {
    if (params.value !== this.params.value) {
      this.params = params;
    }
    return false;
  }

  loadComponent(e): void {
    if (e == 18) {     
    const dialogRef = this.dialog.open(AttachmentDialogDynamicComponent, {
      width: '650px',
      height: '350px',
      data: { documentCode: this.params.data.pMS_PaID }
    });
    //console.log(dialogRef.componentInstance.data);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }    
 }
}


  //loadComponent() {
  //  this.dynamicComponentLoader
  //    .getComponentFactory<AttachmentDialogDynamicComponent>('attachment-dialog-dynamic')
  //    .subscribe(componentFactory => {        
  //      //const ref = this.testOutlet.createComponent(componentFactory);        
  //      //ref.changeDetectorRef.detectChanges();               
             
  //    }, error => {
  //      console.warn(error);
  //    });
  //}
