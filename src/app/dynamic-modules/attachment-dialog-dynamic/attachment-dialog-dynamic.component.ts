import { Component, OnDestroy, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormField, MatButton, MatInput, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry, MatTableDataSource, MatPaginator, MatSort, MatColumnDef, MatRowDef  } from '@angular/material';
import {  MyApolloService } from '../../shared';
import { TranslateService } from "@ngx-translate/core";
import { AgRendererComponent } from 'ag-grid-angular';
import { GridOptions } from "ag-grid";
import { QueryRef, Apollo } from "apollo-angular";
import { IgraphProjectManagementSystemQueries } from '../../igraphql/igraphqlProjectManagementSystem';

@Component({
  selector: 'app-attachment-dialog-dynamic',
  templateUrl:'./attachment-dialog-dynamic.component.html',
})
export class AttachmentDialogDynamicComponent implements OnInit{
  myAttachmentsDialogGridColumnApi;
  myAttachmentsDialogRowData: any[];
  paginationPageSizAttachmentsDialog = 4;
  rowSelection = 'single';
  paginationNumberFormatterAttachmentsDialog;
  defaultColDefAttachmentsDialog;  
  rowDialog;
  attachmentsView;  
  myAttachmentsDialogColumnDefs;

  documentID;
  documentCode_Build;
  documentFileType;
  documentName;
  documentNote;
  fileTypeId;

  constructor(
    
    private translate: TranslateService,
    private apollo: Apollo,
    private myApolloService: MyApolloService,
    private dialogRef: MatDialogRef<AttachmentDialogDynamicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object) {

    translate.get('row').subscribe(s => this.rowDialog = s);
    translate.get('documentID').subscribe(s => this.documentID = s);
    translate.get('documentCode').subscribe(s => this.documentCode_Build = s);
    translate.get('documentFileType').subscribe(s => this.documentFileType = s);
    translate.get('documentName').subscribe(s => this.documentName = s);
    translate.get('documentNote').subscribe(s => this.documentNote = s);
    translate.get('fileTypeId').subscribe(s => this.fileTypeId = s);    



    this.defaultColDefAttachmentsDialog = {
      editable: false,
      enableValue: true
    };

    this.myAttachmentsDialogColumnDefs = [
      {
        headerName: this.rowDialog,
        colId: "colrow4",
        suppressSorting: true,
        suppressFilter: true,
        suppressResize: true,
        suppressPaste: true,
        suppressSizeToFit: true,
        suppressMenu: true,
        suppressMovable: true,
        width: 95,
        cellRenderer: function (params) {
          return parseInt(params.node.id) + 1;
        }

      },
      {
        headerName: this.documentID, field: 'documentID', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: this.documentCode_Build, field: 'documentCode', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: this.documentName, field: 'documentName', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: this.documentFileType, field: 'documentFileType', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: this.documentNote, field: 'documentNote', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      },
      ,
      {
        headerName: this.fileTypeId, field: 'fileTypeId', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }, hide: true
      }
    ];
  }

  ngOnInit() {

    this.paginationNumberFormatterAttachmentsDialog = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };

    var code = this.data["documentCode"];
    //console.log(code);
    var commentsQuery: QueryRef<any>;    
   
    commentsQuery = this.apollo.watchQuery({
      query: IgraphProjectManagementSystemQueries.get('projectManagementSystemProjectReportAttachmentsDialogByDocumentCode').query,
      variables: {
        documentCode: code,     
      }
    });
    var rs = commentsQuery.valueChanges;
    rs.subscribe(st => {    
      if (st.data["projectManagementSystemProjectReportAttachmentsDialogByDocumentCode"].length >= 1) {        
        this.myAttachmentsDialogRowData = st.data["projectManagementSystemProjectReportAttachmentsDialogByDocumentCode"];        
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  rowDoubleClicked(e) {
    
    var documentName: string = e.data.documentName;    
    var variables = { fileTypeId: e.data.fileTypeId, tblIdID: e.data.documentID };
    var typeFile = 'data:' + this.findPostFixFile(documentName) + ';base64,';

    this.myApolloService.callWithoutSubscribeQurey(variables, IgraphProjectManagementSystemQueries.get('projectManagementSystemProjectReportFileDownload').query).subscribe(
      x => {
        var tmpData = x.data.projectManagementSystemProjectReportFileDownload['0'];
        var element = document.createElement('a');

        if (tmpData.tBL_IdBody != undefined) 
          element.setAttribute('href', typeFile + tmpData.tBL_IdBody);                 
        else if (tmpData.tBL_OdBody != undefined)        
          element.setAttribute('href', typeFile + tmpData.tBL_OdBody);                  
        else if (tmpData.tBL_ApdBody != undefined)          
          element.setAttribute('href', typeFile + tmpData.tBL_ApdBody);          
        
        element.setAttribute('download', documentName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    );
  }

  findPostFixFile(docName) {

    if (docName.search('.png') > -1)
      return  'image/png';
    else if (docName.search('.jpg') > -1)
      return  'image/jpeg';
    else if (docName.search('.gif') > -1)
      return  'image/gif';

    else if (docName.search('.htm') > -1)
      return  'text/html';


    else if (docName.search('.xlsx') > -1)
      return  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    else if (docName.search('.xls') > -1)
      return  'application/vnd.ms-excel';


    else if (docName.search('.docx') > -1)
      return  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    else if (docName.search('.doc') > -1)
      return  'application/msword';



    else if (docName.search('.pptx') > -1)
      return  'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    else if (docName.search('.ppt') > -1)
      return  'application/vnd.ms-powerpoint';



    else if (docName.search('.zip') > -1)
      return  'application/zip';

    else if (docName.search('.rar') > -1)
      return  'application/x-rar-compressed';


    else if (docName.search('.pdf') > -1)
      return 'application/pdf';

    else
      return  'application/octet-stream';    
  }

  onAttachmentsDialogGridReady(params) {
    this.myAttachmentsDialogGridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();    
  }

}

    //var tBL_IdBody= new Object();
    //var tBL_OdBody= new Object();
    //var tBL_ApdBody = new Object();
    //Object.assign(tBL_ApdBody, tmpData.tBL_ApdBody);


          //console.log(x.data.projectManagementSystemProjectReportFileDownload['0'].tBL_IdBody);       
          //this.domSanitizer.bypassSecurityTrustUrl('111.png');
          //var blob=this.fileDownloadService.downloadFile('111.png', x.data.projectManagementSystemProjectReportFileDownload['0'].tBL_IdBody);

          //var blob = new Blob([x.data.projectManagementSystemProjectReportFileDownload['0'].tBL_IdBody], { type: 'image/png' });

           //saveAs(blob);
          
        
          //Object.assign(tBL_IdBody, x.data.projectManagementSystemProjectReportFileDownload['0'].tBL_IdBody);
