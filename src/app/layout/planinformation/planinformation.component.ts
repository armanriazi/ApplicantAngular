import { Component, OnInit, ViewChild, ViewContainerRef, Inject, OnDestroy, ComponentRef} from '@angular/core';
import { SplashScreenService, StorageService, MessageService, MyApolloService, AuthService} from "../../shared";
import { MatFormField, MatSelect, MatOption, MatTableDataSource, MatPaginator, MatSort, MatColumnDef, MatRowDef, MatDialog, MatIcon, MatButton } from '@angular/material';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { QueryRef } from 'apollo-angular';
import { Observable, BehaviorSubject, Observer, Subscription, Subject } from 'rxjs/Rx';
import { GridOptions, TabbedLayout } from 'ag-grid';
import { TranslateService } from '@ngx-translate/core';
import { IgraphProjectManagementSystemQueries } from '../../igraphql/igraphqlProjectManagementSystem';
import { IgraphPluralComponentProjectManagementSystemQueries } from '../../igraphql/igraphqlPluralComponentProjectManagementSystem';
import { AttachmentComponent } from '../../dynamic-modules/attachment/attachment.component';
import { SetWinnerComponent } from '../../dynamic-modules/setwinner/setwinner.component';
import { IgraphqlParams } from '../../igraphql/igraphqlParams';
import { AttachmentDialogDynamicComponent } from '../../dynamic-modules/attachment-dialog-dynamic';
import { IgraphPriceRepertoryQueries } from '../../igraphql/igraphqlPriceRepertory';
import { IgraphComponent } from '../../igraph/igraph.component';
import { MessageBox, MessageBoxButton, MessageBoxStyle } from "../../libs/messagebox";
import { delay } from 'rxjs-compat/operator/delay';
import { takeUntil } from 'rxjs/operators';
import { ApolloCache } from 'apollo-cache';


@Component({
  selector: 'app-planinformation',
  templateUrl: './planinformation.component.html',
  styleUrls: ['./planinformation.component.scss']
})

export class PlanInformationComponent implements OnInit {
  //Slick
  gridOptions;
  columnDefinitions;
  dataset = [];
  //Slick
  captionRouter;
  //unsubscribe: Subject<void> = new Subject();
  outSubscribeColumnsDocument: Subscription;
  outSubscribeReady: Subscription;
  outSubscribeRowsOptions: Subscription;
  outSubscribeRowsDocument: Subscription;
  outSubscribeRowsContextPrice: Subscription;

  variablesDynamicPlanItemsProperty: Observable<object> = new Observable<object>((observer) => {
    setInterval(() => {
      observer.next((this.variablesPlanItemsProperty));
    }, 2000);
  });

  variablesDocument: any;
  ulist: any = {
    states: { colState: [], groupState: null, sortState: [], filterState: {} } };
  myGridColumnDocumentApi: any;

  id;
  colIndexId;
  variablesPlanItemsProperty;
  queryPlanItemsProperty;
  selectedDefault;
  selectedIndexTab;  

  title;
  message;
  information;
  button;
  style;  
  subscriber: Subscription;
  selectedBudget;
  budgetByCodeMeli;
  documentGridOptions;
  priceGridOptions;

  ref: AttachmentComponent;
  
  myPlanDocumentsGridColumnApi;
  myPlanContractorsPricesGridColumnApi;
  
  myPlanContractorsPricesRowData: any[];
  
  myPlanContractorsPricesColumnDefs;
  myPlanDocumentsComponent;
  targetDocumentColumnDefs = [];
  myPriceRowData :any[];
  myDocumentRowData:any[];
  myDocumentColumnDataSource: any[] = [{}];
  columnDefs= [];
  paginationPageSize;
  paginationNumberFormatter;
  defaultColDef;

  nationalCode;
  currentTab; 

  Information;
  row;

  //Graph
  planDocumentsByBudgetProjectId;
  planContractorPricesByBudgetProjectId;
  gridColumnDocument;

  gridApiPlanContractorsPrice;
  gridApiPlanDocument;

  pMS_PdtName;
  pMS_PaDate;
  pMS_PaDescription;
  commands;
  
  pMS_PppID;
  pMS_PppOtherCondition;
  pMS_PppPayCondition;
  pMS_PppPrice;
  tBL_CustomerCapacity;
  tBL_CustomerCredit;
  tBL_CustomerID_fk;
  tBL_CustomerMobile;
  tBL_CustomerTitle;  

  cmpRef: ComponentRef<Component>;

  constructor(
    public dialog: MatDialog,
    private messageService: MessageService,
    private serviceStorage: StorageService,
    private translate: TranslateService,
    private apollo: Apollo,
    private myApollo: MyApolloService,
    private authService: AuthService) {

    this.clear();

    //Slick define the grid options & columns and then create the grid itself
    this.defineGrid();
    //Slick
    this.nationalCode = this.serviceStorage.get("Current:User", { session: true });
    this.budgetByCodeMeli = this.serviceStorage.get("Current:BudgetByCodeMeli", { session: false });
    if (this.nationalCode == null || this.budgetByCodeMeli == null) {
      this.authService.logout();      
      return;
    }
    this.id = { value: this.budgetByCodeMeli[0].bUD_ProjectID };

    translate.get('PlanInformation').subscribe(s => this.captionRouter = s);

    translate.get('Information').subscribe(s => this.Information = s);
    translate.get('row').subscribe(s => this.row = s);
    
    translate.get('pMS_PdtName').subscribe(s => this.pMS_PdtName = s);
    translate.get('pMS_PaDate').subscribe(s => this.pMS_PaDate = s);
    translate.get('pMS_PaDescription').subscribe(s => this.pMS_PaDescription = s);
    translate.get('commands').subscribe(s => this.commands = s);

    translate.get('pMS_PppOtherCondition').subscribe(s => this.pMS_PppOtherCondition = s);
    translate.get('pMS_PppPayCondition').subscribe(s => this.pMS_PppPayCondition = s);
    translate.get('pMS_PppPrice').subscribe(s => this.pMS_PppPrice = s);
    translate.get('tBL_CustomerCapacity').subscribe(s => this.tBL_CustomerCapacity = s);
    translate.get('tBL_CustomerCredit').subscribe(s => this.tBL_CustomerCredit = s);
    translate.get('tBL_CustomerID_fk').subscribe(s => this.tBL_CustomerID_fk = s);
    translate.get('tBL_CustomerMobile').subscribe(s => this.tBL_CustomerMobile = s);
    translate.get('tBL_CustomerTitle').subscribe(s => this.tBL_CustomerTitle = s);


    this.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };    
    this.defaultColDef = {
      editable: false,
      enableValue: true
    };
    this.paginationPageSize = 7;
    this.documentGridOptions = <GridOptions>{
      context: {
        componentParent: this
      }      
    };
    this.priceGridOptions = <GridOptions>{
      context: {
        componentParent: this        
      }
    };

    this.columnDefs = [
      {
        headerName: this.row,
        colId: "colrow2",
        suppressSorting: true,
        suppressFilter: true,
        suppressResize: true,
        suppressPaste: true,
        suppressSizeToFit: true,
        suppressMenu: true,
        suppressMovable: true,
        width: 88,
        cellClass: 'mycell-Row',
        cellRenderer: function (params) {
          return parseInt(params.node.id) + 1;
        }
      }];

    this.documentGridOptions.components = { "attachmentComponent": AttachmentComponent };

    this.priceGridOptions.components = { "setWinnerComponent": SetWinnerComponent };
    this.priceGridOptions.columnDefs =
      [
        {
        headerName: this.row,
        colId: "colrow3",
        suppressSorting: true,
        suppressFilter: true,
        suppressResize: true,
        suppressPaste: true,
        suppressSizeToFit: true,
        suppressMenu: true,
        suppressMovable: true,
        width: 88,
        cellClass: 'mycell-Row',
        cellRenderer: function (params) {
          return parseInt(params.node.id) + 1;
        }
      },
      {
        headerName: this.tBL_CustomerID_fk, field: 'tBL_CustomerID_fk', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      }
      ,
      {
        headerName: this.tBL_CustomerTitle, field: 'tBL_CustomerTitle', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      }
      ,
      {
        headerName: this.pMS_PppPayCondition, field: 'pMS_PppPayCondition', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      }
      ,
      {
        headerName: this.pMS_PppPrice, field: 'pMS_PppPrice', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      }
      ,
      {
        headerName: this.tBL_CustomerCapacity, field: 'tBL_CustomerCapacity', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      }
      ,
      {
        headerName: this.tBL_CustomerCredit, field: 'tBL_CustomerCredit', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      }
      ,
      {
        headerName: this.tBL_CustomerMobile, field: 'tBL_CustomerMobile', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: this.commands,
        colId: "SetWinnerComponent",
        width: 100,
        cellRendererFramework: SetWinnerComponent,
        cellRendererParams: {          
          budProjectId: this.id.value,
          nationalCode: this.nationalCode,
          accFinancialYearID: IgraphqlParams.accFinancialYearID,          
          query: IgraphProjectManagementSystemQueries.get('projectManagementSystemProjectReportSetWinnerByParams').query,
          information: this.Information
        }
      }
    ];
 
    this.planDocumentsByBudgetProjectId = IgraphProjectManagementSystemQueries.get('projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId').query;
    this.gridColumnDocument = IgraphPluralComponentProjectManagementSystemQueries.get('gridColumnProjectManagementSystemProjectReport').query;
    this.planContractorPricesByBudgetProjectId = IgraphProjectManagementSystemQueries.get('projectManagementSystemProjectReportPlanContractorsPriceByBudgetProjectId').query;
    
    var params = IgraphProjectManagementSystemQueries.get('projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId').select;



   
    //this.ulist.states.colState.push({
    //  headerName: this.row,
    //  suppressSorting: true,
    //  suppressFilter: true,
    //  suppressResize: true,
    //  suppressPaste: true,
    //  suppressSizeToFit: true,
    //  suppressMenu: true,
    //  suppressMovable: true,
    //  cellClass: 'mycell-Row',
    //  width: 88,
    //  hide:false,
    //  cellRenderer: function (params) {
    //    return parseInt(params.node.id) + 1;
    //  }
    //});
    ///*
    //for (let p in params) {
    //  //for (let i of this.gridColumnDocument.select) {
    //  //  var headers = {
    //  //    headerName: null, field: null, filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }, minWidth: 75, width: 110, cellClass: "cell-wrap-text", autoHeight: true,
    //  //  };
    //  //  headers.field = i;
    //  //  this.translate.get(i).subscribe(s => headers.headerName = s);
    //  //  this.documentGridOptions.columnDefs.push(headers);
    //  //}

    //  if (params[p].search("ID") == -1 && params[p].search("Id") == -1 && params[p].search("_fk") == -1) {
    //    this.ulist.states.colState.push({ aggFunc: null, colId: params[p], headerName: params[p], hide: false, pinned: null, pivotIndex: null, rowGroupIndex: null , width: 110});  
    //    this.ulist.states.sortState.push({ colId: params[p], sort: null });  
    //    this.ulist.states.filterState[params[p]] = { filter: null, filterType: 'text', type: 'contains' };           
    //   }
    //}
    ////*///
    //this.ulist.states.colState.push({
    //    headerName: this.commands,
    //    cellRendererFramework: AttachmentComponent,
    //    //valueGetter: function (params) {
    //    // // console.log(this.testOutlet);
    //    //  return '<div>'+params.data.pMS_PaID+'</div>';
    //    //},        
    //    colId: "attachmentComponent",
    //    width: 350,
    //    hide: false,
    //});
    //this.documentGridOptions.columnDefs = this.ulist.states.colState;

    //for (let i of this.gridColumnDocument.select) {

    //  var headers = {
    //    headerName: null, field: null, filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }, minWidth: 75, width: 110, cellClass: "cell-wrap-text", autoHeight: true,
    //  };
    //  headers.field = i;
    //  this.translate.get(i).subscribe(s => headers.headerName = s);
    //  this.documentGridOptions.columnDefs.push(headers);
    //}

  }
  
  ngOnInit() {

    if (this.nationalCode == null || this.budgetByCodeMeli == null)
      return;
    this.selectedDefault = this.id.value;
    this.onSelectionChange(this.id);

  }

  attached() {
    // populate the dataset once the grid is ready
    this.getData();
  }

  /* Define grid Options and Columns */
  defineGrid() {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', sortable: true, minWidth: 100 },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, minWidth: 100 },
      { id: '%', name: '% Complete', field: 'percentComplete', sortable: true, minWidth: 100 },
      { id: 'start', name: 'Start', field: 'start', minWidth: 100 },
      { id: 'finish', name: 'Finish', field: 'finish', minWidth: 100 },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', sortable: true, minWidth: 100 }
    ];
    this.gridOptions = {
      enableAutoResize: false,
      enableSorting: true
    };
  }

  getData() {
    // mock a dataset
    this.dataset = [];
    for (let i = 0; i < 1000; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);

      this.dataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        start: `${randomMonth}/${randomDay}/${randomYear}`,
        finish: `${randomMonth}/${randomDay}/${randomYear}`,
        effortDriven: (i % 5 === 0)
      };
    }
  }

  onSelectionChange(e) {
    
    this.id = e.value;

    if (this.variablesPlanItemsProperty == undefined || this.variablesPlanItemsProperty == null)
      this.onSelectedTab(0);
    else
      this.onSelectedTab(this.currentTab);
  }
  onSelectedTab(e) {
    
    this.currentTab = e;
    var variables = { budgetProjectId: this.id, orderBy: '', userId: '', accFinancialYearId: '', desc: '' };
    this.colIndexId = "budgetProjectId";  
    var commentsQuery: QueryRef<any>;
    var rs = null;


   
    switch (this.currentTab) {
      case 0:
            this.variablesPlanItemsProperty = variables;
            this.queryPlanItemsProperty = "projectManagementSystemProjectReportPlanItemsByProjectId";
        break;
      case 1:

        //this.ulist.states.colState = this.myPlanDocumentsGridColumnApi.getColumnState();
        //this.ulist.states.sortState = this.myGridColumnDocumentApi.getSortModel();
        //this.ulist.states.filterState = this.myGridColumnDocumentApi.getFilterModel();

        //console.log(this.ulist.states);
        //console.log(this.myDocumentColumnDataSource);

        //ColDataDocument
        this.variablesDocument = 'pMS_PdtName,pMS_PaDate,pMS_PaDescription,attachmentComponent';
        
        commentsQuery = this.apollo.watchQuery({
          query: this.gridColumnDocument,
          variables: {
            sfodFieldName: this.variablesDocument,
          }
        });
        rs = commentsQuery.valueChanges;

        //try {
        //  this.outSubscribeColumnsDocument.unsubscribe();
        //} catch{ }                

        this.outSubscribeColumnsDocument = rs.subscribe(x => {
          Object.assign(this.myDocumentColumnDataSource, x.data.gridColumnProjectManagementSystemProjectReport);
          console.log(this.myDocumentColumnDataSource);        
          let i = 0;
          
          while (i < this.myDocumentColumnDataSource.length) {
            //this.ulist.states.colState[i + 1].width = Number(this.myDocumentColumnDataSource[i]['nIk_SfodWidth']);
            //this.ulist.states.colState[i + 1].hide = this.myDocumentColumnDataSource[i]['nIk_SfodIsHide'] == "true" ||
            //  this.myDocumentColumnDataSource[i]['nIk_SfodIsHide'] == "1" ? true : false;
          
            for (let u in this.ulist.states.colState) {
              if (this.ulist.states.colState[u].colId == this.myDocumentColumnDataSource[i]['nIK_SfodFieldName']) {                
                this.ulist.states.colState[u].width = Number(this.myDocumentColumnDataSource[i]['nIk_SfodWidth']);
                this.ulist.states.colState[u].headerName = this.myDocumentColumnDataSource[i]['nIk_SfodFarsiName'];
                this.ulist.states.colState[u].hide = this.myDocumentColumnDataSource[i]['nIk_SfodIsHide'] == "true" ||
                  this.myDocumentColumnDataSource[i]['nIk_SfodIsHide'] == "1" ? true : false;
              }
            }
            for (let k in this.ulist.states.sortState) {
              if (this.ulist.states.sortState[k].colId == this.myDocumentColumnDataSource[i]['nIK_SfodFieldName'])
                this.ulist.states.sortState[k].sort = this.myDocumentColumnDataSource[i]['nIk_SfodSortState'];
            }

            for (let j in this.ulist.states.filterState) {
              if (j == this.myDocumentColumnDataSource[i]['nIK_SfodFieldName'])
                this.ulist.states.filterState[j].filter = this.myDocumentColumnDataSource[i]['nIk_SfodFilterState'];
            }
            i++;
          }
          console.log(this.ulist.states);
          
          this.myPlanDocumentsGridColumnApi.setColumnState(this.ulist.states.colState);
          this.myGridColumnDocumentApi.setSortModel(this.ulist.states.sortState);
          //this.myGridColumnDocumentApi.setFilterModel(this.ulist.states.filterState);
        }, err => {
          console.log(err);
          this.clear();
        });

        //try {
        //  this.outSubscribeRowsDocument.unsubscribe();
        //} catch{ }

        //RowData
        commentsQuery = this.apollo.watchQuery({
          query: this.planDocumentsByBudgetProjectId,
          variables: {
            budgetProjectId: this.id,
          }
        });
        rs = commentsQuery.valueChanges;
        this.outSubscribeRowsDocument = rs.subscribe(st => {
      
          if (st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"].length >= 1)
            this.myDocumentRowData = st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"];
          else
            this.myDocumentRowData = null;
        }, err => {
          console.log(err);
          this.clear();
        });

      break;      
      case 2:

        //try {
        //  this.outSubscribeRowsContextPrice.unsubscribe();
        //} catch{ }
        
        commentsQuery = this.apollo.watchQuery({
            query: this.planContractorPricesByBudgetProjectId,
            variables: variables
        });        
        rs = commentsQuery.valueChanges;
        this.outSubscribeRowsContextPrice = rs.subscribe(st => {
          if (st.data["projectManagementSystemProjectReportPlanContractorsPriceByBudgetProjectId"].length >= 1)
            this.myPriceRowData = st.data["projectManagementSystemProjectReportPlanContractorsPriceByBudgetProjectId"];
          else
            this.myPriceRowData = null;
        }, err => {
          console.log(err);
          this.clear();
        });
        break;
    }
  }
  onSendToCartable(e) {
        
    var commentsQuery: QueryRef<any>;
    commentsQuery = this.apollo.watchQuery({
      query: IgraphProjectManagementSystemQueries.get('projectManagementSystemProjectReportSendToCartableByParams').query,
      variables: {
        budProjectId: this.id,
        nationalCode: this.nationalCode,
        trackingCode: "",
        accFinancialYearID: IgraphqlParams.accFinancialYearID
      }
    });

    var rs = commentsQuery.valueChanges;
    rs.subscribe(st => {
      var msg: string = st.data.projectManagementSystemProjectReportSendToCartableByParams["0"].outputMessage;
      MessageBox.show(this.dialog, msg.trim(), this.Information, '', MessageBoxButton.Close, true, MessageBoxStyle.Full, "400px");
    }, err => console.log(err));   
  } 

  onPlanDocumentsGridReady(params) {   
    this.myGridColumnDocumentApi = params.api;
    this.myPlanDocumentsGridColumnApi = params.columnApi;
    

    //  .subscribe(
    //    x => {
    //      Object.assign(this.myDocumentColumnDataSource, x.data.gridColumnProjectManagementSystemProjectReport);
    //      console.log(this.myDocumentColumnDataSource);
    //    }
    //);
    
    //params.api.addGlobalListener(function (type, event) {
    //  if (type.indexOf("column") >= 0) {
    //    //console.log("Got column event: ", event);
    //  }
    //});
    //params.api.sizeColumnsToFit();

  }
  onPlanContractorPricesGridReady(params) {
    this.myPlanContractorsPricesGridColumnApi = params.columnApi;
    //params.api.sizeColumnsToFit();
  }

  restoreState(e) {
    
    //this.selectedIndexTab = 0;
    //this.currentTab = 0;


    //var commentsQuery = this.apollo.watchQuery({
    //  query: this.gridColumnDocument,
    //  variables: this.variablesDocument
    //});
    //try {
    //  this.outSubscribeColumnsDocument.unsubscribe();
    //} catch{ }
    //var rs = commentsQuery.valueChanges;
    //this.outSubscribeColumnsDocument=rs.subscribe(
    //   x => {
    //     Object.assign(this.myDocumentColumnDataSource, x.data['gridColumnProjectManagementSystemProjectReport']);        
    //     this.ulist.states.colState = this.myPlanDocumentsGridColumnApi.getColumnState();        
    //     var i = 0;                          
    //     while (i < this.myDocumentColumnDataSource.length) {           
    //       this.ulist.states.colState[i+1].width = Number(this.myDocumentColumnDataSource[i]['nIk_SfodWidth']);
    //       this.ulist.states.colState[i+1].hide = this.myDocumentColumnDataSource[i]['nIk_SfodIsHide'] == "true" ||
    //         this.myDocumentColumnDataSource[i - 1]['nIk_SfodIsHide'] == "1" ? true : false;;
    //       for (let k in this.ulist.states.sortState) {
    //         if (this.ulist.states.sortState[k].colId == this.myDocumentColumnDataSource[i]['nIK_SfodFieldName'])
    //           this.ulist.states.sortState[k].sort = this.myDocumentColumnDataSource[i]['nIk_SfodSortState'];
    //       }
    //       for (let j in this.ulist.states.filterState) {
    //         if (j == this.myDocumentColumnDataSource[i]['nIK_SfodFieldName'])
    //           this.ulist.states.filterState[j].filter = this.myDocumentColumnDataSource[i]['nIk_SfodFilterState'];
    //       }          
    //      i++;
    //    }       
    //     this.myPlanDocumentsGridColumnApi.setColumnState(this.ulist.states.colState);
    //     this.myGridColumnDocumentApi.setSortModel(this.ulist.states.sortState);
    //     this.myGridColumnDocumentApi.setFilterModel(this.ulist.states.filterState);      
    //   }, err => {
    //    console.log(err);
    //    this.clear();
    //  });
  }

  resetState() {
    this.myPlanDocumentsGridColumnApi.resetColumnState();
    this.myGridColumnDocumentApi.setSortModel(null);
    this.myGridColumnDocumentApi.setFilterModel(null);
    console.log("column state reset");
  }

  clear() {
    try {
      console.clear();
      //this.ulist.states.colState = null;
      this.myDocumentColumnDataSource = [{}];      
      if (this.outSubscribeReady != undefined)
        this.outSubscribeReady.unsubscribe();
      if (this.apollo.getClient() != undefined) {
        var client = this.apollo.getClient();
        client.cache.reset();
      }
      if (this.myApollo != undefined)
        this.myApollo.clearCache();

      this.outSubscribeColumnsDocument.unsubscribe();
      this.outSubscribeRowsOptions.unsubscribe();
      this.outSubscribeRowsContextPrice.unsubscribe();      
    }
    catch{
      return;
    }
  }

  onPlanDocumentsDragStopped(params) {
    var dynamicBody = '';

    for (let item of this.myPlanDocumentsGridColumnApi.columnController.primaryColumns) {
      if (item.visible == true && item.colId != 'colrow2') {
        let ls = item.colId + '\n';
        dynamicBody = dynamicBody + ls;
      }
    }
    if (dynamicBody != '') {
      this.planDocumentsByBudgetProjectId = gql`       
      query projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId($budgetProjectId: String!) {
          projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId(budgetProjectId: $budgetProjectId) {
        ${dynamicBody}  
        }
      }
        `
      //*console.log(this.planDocumentsByBudgetProjectId.loc.source.body);
    }
    else {
      this.planDocumentsByBudgetProjectId = IgraphProjectManagementSystemQueries.get('projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId').query;
      //* console.log(this.planDocumentsByBudgetProjectId.loc.source.body);
      for (let item of this.myPlanDocumentsGridColumnApi.columnController.primaryColumns) {
        this.myPlanDocumentsGridColumnApi.setColumnVisible(item.colId, true);
      }
    }
  }
  onPlanContractorPricesDragStopped(params) {
    var dynamicBody = '';

    for (let item of this.myPlanContractorsPricesGridColumnApi.columnController.primaryColumns) {
      if (item.visible == true && item.colId != 'colrow3') {
        let ls = item.colId + '\n';
        dynamicBody = dynamicBody + ls;
      }
    }
    if (dynamicBody != '') {
      this.planContractorPricesByBudgetProjectId = gql`       
      query projectManagementSystemProjectReportPlanContractorsPriceByBudgetProjectId($budgetProjectId: String!) {
          projectManagementSystemProjectReportPlanContractorsPriceByBudgetProjectId(budgetProjectId: $budgetProjectId) {
        ${dynamicBody}  
        }
      }
        `
      //* console.log(this.planContractorPricesByBudgetProjectId.loc.source.body);
    }
    else {
      this.planContractorPricesByBudgetProjectId = IgraphProjectManagementSystemQueries.get('projectManagementSystemProjectReportPlanContractorsPriceByBudgetProjectId').query;
      //* console.log(this.planContractorPricesByBudgetProjectId.loc.source.body);
      for (let item of this.myPlanContractorsPricesGridColumnApi.columnController.primaryColumns) {
        this.myPlanContractorsPricesGridColumnApi.setColumnVisible(item.colId, true);
      }
    }
  }
}

     
     //while (i < this.myDocumentColumnDataSource.length) {
        //  if(this.myDocumentColumnDataSource[i]['nIK_SfodFieldName'].toString().search('Component') == -1)
        //     this.columnDefs.push({ headerName: this.myDocumentColumnDataSource[i]['nIK_SfodFarsiName'], field: this.myDocumentColumnDataSource[i]['nIK_SfodFieldName'], filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }, width: Number(this.myDocumentColumnDataSource[i]['nIk_SfodWidth']) });
        //  else {
        //    this.columnDefs.push({
        //      headerName: this.myDocumentColumnDataSource[i]['nIK_SfodFarsiName'],
        //      cellRendererFramework: AttachmentComponent,
        //      //valueGetter: function (params) {
        //      // // console.log(this.testOutlet);
        //      //  return '<div>'+params.data.pMS_PaID+'</div>';
        //      //},        
        //      colId: "AttachmentComponent",
        //      width: Number(this.myDocumentColumnDataSource[i]['nIk_SfodWidth'])
        //    })
        //  }
        //  i++;
        //}

        //this.targetDocumentColumnDefs = this.columnDefs;
        //this.documentGridOptions.ColumnDefs = this.columnDefs;
        //this.outInitSubscribe.unsubscribe();
        //this.unsubscribe.next();
        //this.unsubscribe.complete();    


    //this.ulist.states.sortState = this.myGridColumnDocumentApi.getSortModel();
    //this.ulist.states.filterState = this.myGridColumnDocumentApi.getFilterModel();

    //console.log(this.ulist.states.colState);
    //console.log(this.myDocumentColumnDataSource);

    //var i = 1;
    //var j = 0;

    //while (i < this.ulist.states.colState.length) {
    //  this.ulist.states.colState[i].width = Number(this.myDocumentColumnDataSource[i - 1]['nIk_SfodWidth']);
    //  i++;
    //}
    //console.log(this.ulist.states.colState);


    //this.myPlanDocumentsGridColumnApi.setColumnState(this.ulist.states.colState);


    //this.columnDefs = [
    //  {
    //    headerName: this.row,
    //    suppressSorting: true,
    //    suppressFilter: true,
    //    suppressResize: true,
    //    suppressPaste: true,
    //    suppressSizeToFit: true,
    //    suppressMenu: true,
    //    suppressMovable: true,
    //    width: 88,
    //    cellClass: 'mycell-Row',
    //    cellRenderer: function (params) {
    //      return parseInt(params.node.id) + 1;
    //    }
    //  }];

    //var i = 0;
    //while (i < restoreDocument.length) {
 
    //  if (restoreDocument[i]['nIK_SfodFieldName'].toString().search('Component') == -1)
    //    this.columnDefs.push({ headerName: restoreDocument[i]['nIK_SfodFarsiName'], field: restoreDocument[i]['nIK_SfodFieldName'], filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }, width: Number(restoreDocument[i]['nIk_SfodWidth']) });
    //  else {
    //    this.columnDefs.push({
    //      headerName: restoreDocument[i]['nIK_SfodFarsiName'],
    //      cellRendererFramework: AttachmentComponent,
    //      //valueGetter: function (params) {
    //      // // console.log(this.testOutlet);
    //      //  return '<div>'+params.data.pMS_PaID+'</div>';
    //      //},        
    //      colId: "AttachmentComponent",
    //      width: Number(restoreDocument[i]['nIk_SfodWidth'])
    //    })
    //  }
    //  i++;
    //}

    //this.myGridColumnDocumentApi.setColumnState(this.columnDefs);

    //restoreSubscribe.unsubscribe();

  
    //this.outInitSubscribe = this.myApollo.callWithoutSubscribeQurey(this.variablesDocument, this.gridColumnDocument)
    //  .pipe(takeUntil(this.unsubscribe))
    //  .subscribe(x => console.log(x.data.gridColumnProjectManagementSystemProjectReport[1]['nIk_SfodWidth']));

//    this.outInitSubscribe.unsubscribe();
//           Object.assign(this.myDocumentColumnDataSource,x.data.gridColumnProjectManagementSystemProjectReport);

 
