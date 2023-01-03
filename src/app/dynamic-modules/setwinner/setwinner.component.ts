import { Component, OnDestroy, OnInit, Inject, ViewChild, ViewContainerRef, Input } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { MessageService, MyApolloService } from "../../shared";
import { MatButton, MatInput, MatDialog, MatIconRegistry, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AttachmentDialogDynamicComponent } from "../attachment-dialog-dynamic";
import { DynamicComponentLoader } from "../../dynamic-component-loader/dynamic-component-loader.service";
import { MessageBox, MessageBoxButton, MessageBoxStyle } from "../../libs/messagebox";
import { ICellRendererParams } from "ag-grid";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-setwinner-cell',
  templateUrl: './setwinner.component.html'  
})
export class SetWinnerComponent implements ICellRendererAngularComp, OnInit , OnDestroy {
  params: ICellRendererParams;
  Information;

  constructor(        
    private dialog: MatDialog,
    private dynamicComponentLoader: DynamicComponentLoader,
    private myApolloService: MyApolloService) {

    
  }

  ngOnInit() { }
 
  agInit(params:ICellRendererParams): void {
    this.params = params;
  }
  ngOnDestroy() {
  }

  refresh(params): boolean {    
    if (params.value !== this.params.value) {
      this.params = params;
    }
    return false;
  }

  loadComponent(): void {    
   
    //console.log(this.params['budProjectId']);
    //console.log(this.params['nationalCode']);
    //console.log(this.params['accFinancialYearID']);
    //console.log(this.params['query']);
      //console.log(this.params.data.pMS_PppID);
    var isData: boolean = false;
      var msg = this.myApolloService.callWithoutSubscribeQurey({
          pmsPppId: this.params.data.pMS_PppID,
          budProjectId: this.params['budProjectId'],
          nationoanlCode: this.params['nationalCode'],
          trackingCode: '',
          budPepRegisterDate: '',
          aCCFinancialYearId: this.params['accFinancialYearID'],
          tblUserId: '1'
      },
          this.params['query']
      ).timeout(5000).subscribe(x => {
          if (x.data.projectManagementSystemProjectReportSetWinnerByParams["0"] != undefined) {
              isData = true;
              MessageBox.show(this.dialog, x.data.projectManagementSystemProjectReportSetWinnerByParams["0"].outputMessage.toString().trim(), this.params['information'], '', -1, true, MessageBoxStyle.Full, "460px");
          }
          else 
              MessageBox.show(this.dialog, 'لطفا عملیات را مجدد و یا در زمان دیگری انجام دهید', this.params['information'], '', -1, true, MessageBoxStyle.Full, "460px");              
      },
          err => {
              //بدلیل زمان بر بودن پروسیجر در زمانی که شبیه همین پیغام را دیر به کاربر نشان می داد، تایم اوت گذاشته شد تا کاربر بیشتر از 5 ثانیه منتظر پیغم زیر از سوی سرور نباشد بنابراین ارور تایم اوت را خودم تولید کردم
              if (isData == false) {
              MessageBox.show(this.dialog, 'عملیات انجام نشد لطفا با پشتیبانی تماس حاصل فرمائید', this.params['information'], '', -1, true, MessageBoxStyle.Full, "460px");
              console.log(err);
          }
        }
    );

  }
}

