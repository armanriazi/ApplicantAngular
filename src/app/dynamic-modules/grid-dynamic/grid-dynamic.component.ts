import { Component, Output, Input, EventEmitter, OnInit, OnDestroy, ViewChild, Inject} from '@angular/core';
import { MyApolloService, StorageService, MessageService, WINDOW } from "../../shared";
import { IgraphProjectManagementSystemQueries, MyGraphQlResult } from '../../igraphql/igraphqlProjectManagementSystem';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid';
import gql from 'graphql-tag';
import { BehaviorSubject, Observable, of as observableOf, Observer, Subscription } from 'rxjs';
import { AgGridNg2 } from 'ag-grid-angular';
import { MessageBox, MessageBoxButton, MessageBoxStyle } from "../../libs/messagebox";
import { MatButton, MatInput, MatDialog, MatIconRegistry, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IgraphPluralComponentProjectManagementSystemQueries } from '../../igraphql/igraphqlPluralComponentProjectManagementSystem';


@Component({
  selector: 'app-grid-dynamic',
  templateUrl: `./grid-dynamic.component.html`,
  styleUrls: ['./grid-dynamic.component.scss']
})
export class GridDynamicComponent implements OnInit, OnDestroy {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  @Input() widths?: string[];
  @Input() colIndexId?: string;
  @Input() variables: Observable<object>;
  @Input() pageSize?: number;
  @Input() graphquery?: string;
  @Input() height?: string;
  @Input() sizeColumnsToFit?: boolean;

  unsubVariables: object = {};
  columnDefs = [];

  gridApi;
  rowData: any;
  myGridColumnApi: any;
  myGraphQlResult: MyGraphQlResult;
  paginationPageSize;
  dynamicBodyBeforeLength = 0;
  gridColumns;

  paginationNumberFormatter;
  defaultColDef;

  row;
  Information;
  doSuccess;
  doError;
  id;
  Height;

  ugrid;
  gridParams;
  gridSelect;
  myColumnDataSource: any[] = [{}];
  variablesColumns:object;
  ulist: any = {
    states: { colState: [], groupState: null, sortState: [], filterState: {} }
  };
  outSubscribe: Subscription;
  outSubscribeReady: Subscription;

  constructor(
    @Inject(WINDOW) public window: Window,
    private dialog: MatDialog,
    private myApollo: MyApolloService,
    private translate: TranslateService,
    private storageService: StorageService) {

    console.log('constructor');

    translate.get('Information').subscribe(s => this.Information = s);

    this.ugrid=this.storageService.get("Current:User",{ session: true });    
    this.translate.get('row').subscribe(s => this.row = s);
    this.translate.get('doSuccess').subscribe(s => this.doSuccess = s);
    this.translate.get('doError').subscribe(s => this.doError = s);    


    this.defaultColDef = {
      suppressCellSelection: true,
      suppressRowSelection: false,
      editable: false,
      enableValue: true,
      suppressNavigable: true,
      cellClass: 'no-border',
      getRowHeight: function (params) {
        // assuming 50 characters per line, working how how many lines we need
        console.log(params.data);
        return 18 * (Math.floor(params.data[0].length / 45) + 1);
      }
    };

    

    
  }  

  ngOnInit() {
    console.log('ngOnInit');
    if (this.graphquery != undefined && this.graphquery.toString().includes('projectManagement')) {
      this.myGraphQlResult = IgraphProjectManagementSystemQueries.get(this.graphquery);
      this.gridColumns = IgraphPluralComponentProjectManagementSystemQueries.get(this.graphquery).query;
      this.gridSelect = IgraphProjectManagementSystemQueries.get(this.graphquery).select;
      this.gridParams = IgraphProjectManagementSystemQueries.get(this.graphquery).selectConsequence;    
    }
    else
      return;

    this.Height = this.height != undefined && this.height != null ? this.height + 'px' : '499px';
    this.paginationPageSize = this.pageSize != undefined && this.pageSize != null ? this.pageSize : 4;
    this.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };

    this.id = this.graphquery;  

    this.variablesColumns = { sfodFieldName: this.gridParams, sfoName: this.id };
    console.log(this.variablesColumns);

   
    //for (let i of this.myGraphQlResult.select) {
    //  var headers = {
    //    headerName: null, field: null, filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }, minWidth: 75, width: 110, cellClass: "cell-wrap-text", autoHeight: true,        
    //  };
    //  headers.field = i;
    //  this.translate.get(i).subscribe(s => headers.headerName = s);
    //  this.columnDefs.push(headers);
    //}

    
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');

   
  }

  restoreState() {
    //var ukey = "Current:Grid|" + this.ugrid + "|" + this.id;
    //if (this.storageService.get(ukey, { session: false }) == null) {
    //  console.log("not found saved data");
    //  return;
    //}
    //else {
    //  this.ulist = this.storageService.get(ukey, { session: false });

    //  this.myGridColumnApi.setColumnState(this.ulist.states.colState);
    //  this.gridApi.setSortModel(this.ulist.states.sortState);
    //  this.gridApi.setFilterModel(this.ulist.states.filterState);

    //  console.log("column state restored");
    //}


    //console.log(this.variablesColumns);
    //console.log(this.gridColumns);
    //console.log(this.gridParams);

    var tmp = this.myColumnDataSource;

    //this.ulist.states.colState = this.myGridColumnApi.getColumnState();
    var i = 0;
    while (i < tmp.length) {
      //for (let z in this.ulist.states.colState) {
        if (this.ulist.states.colState[i + 1].colId == tmp[i]['nIK_SfodFieldName']) {
          this.ulist.states.colState[i + 1].width = Number(tmp[i]['nIk_SfodWidth']);
          this.ulist.states.colState[i + 1].hide = tmp[i]['nIk_SfodIsHide'] == "true" ||
            tmp[i]['nIk_SfodIsHide'] == "1" ? true : false;
        }
      //}
      for (let k in this.ulist.states.sortState) {
        if (this.ulist.states.sortState[k].colId == tmp[i]['nIK_SfodFieldName'])
          this.ulist.states.sortState[k].sort = tmp[i]['nIk_SfodSortState'];
      }
      for (let j in this.ulist.states.filterState) {
        if (j == tmp[i]['nIK_SfodFieldName'])
          this.ulist.states.filterState[j].filter = tmp[i]['nIk_SfodFilterState'];
      }

      this.myGridColumnApi.setColumnState(this.ulist.states.colState);
      this.gridApi.setSortModel(this.ulist.states.sortState);
      this.gridApi.setFilterModel(this.ulist.states.filterState);
      i++;
    }
   
  }

  saveState() {
   //console.log(window[this.myGrid].colState);
  //console.log(this.myGridColumnApi.getColumnState());
  //console.log(this.gridApi.getSortModel());
  //console.log(this.gridApi.getFilterModel());

    //var ukey = "Current:Grid|" + this.ugrid + "|" + this.id;

    //this.ulist.states.colState = this.myGridColumnApi.getColumnState();
    //this.ulist.states.sortState = this.gridApi.getSortModel();
    //this.ulist.states.filterState = this.gridApi.getFilterModel();
    //this.storageService.set(ukey, this.ulist, { session: false });
    //MessageBox.show(this.dialog, this.doSuccess, this.Information, '', MessageBoxButton.Close, true, MessageBoxStyle.Full, "400px");   
 }  

  resetState() {
    this.myGridColumnApi.resetColumnState();
    this.gridApi.setSortModel(null);
    this.gridApi.setFilterModel(null);
    console.log("column state reset");
  }

  dragStopped(params) {

    var dynamicBodyCurrent = '';

    for (let item of this.myGridColumnApi.columnController.primaryColumns) {
      if (item.visible == true && item.colId != 'colrow') {
        let ls = item.colId + '\n';
        dynamicBodyCurrent = dynamicBodyCurrent + ls;
      }
    }
    
    if (dynamicBodyCurrent == '') {    
      let baseQuery: any = IgraphProjectManagementSystemQueries.get(this.graphquery).query;
      this.myGraphQlResult.query = baseQuery;
      console.log(baseQuery.loc.source.body);
      for (let item of this.myGridColumnApi.columnController.primaryColumns) {
        this.myGridColumnApi.setColumnVisible(item.colId, true);
      }
    }
    //*console.log(this.dynamicBodyBeforeLength);
  
    if (this.dynamicBodyBeforeLength == dynamicBodyCurrent.toString().length) {
      return;
    }
    else {
      if (dynamicBodyCurrent != '') {
        var query = gql`       
        query ${this.graphquery}(${this.myGraphQlResult.parameters}) {
        ${this.graphquery}(${this.myGraphQlResult.arguments}) {            
        ${dynamicBodyCurrent}  
        }
      }
        `
        //*console.log(query.loc.source.body);

        this.myApollo.callWithoutSubscribeQurey(this.unsubVariables, query).subscribe(
          st => {
            this.dynamicBodyBeforeLength = dynamicBodyCurrent.toString().length;
            this.rowData = st.data[this.graphquery];

          });        
      }
     
    }
  }

  onColumnResized(event) {
    if (event.finished) {
      this.gridApi.resetRowHeights();
    }
  }

  gridReady(params) {
    console.log('gridReady');
    this.gridApi = params.api;
    this.myGridColumnApi = params.columnApi;

    if (this.sizeColumnsToFit)
      params.api.sizeColumnsToFit();

    try {
      this.outSubscribeReady.unsubscribe();
    } catch{ }
   

    this.columnDefs = [];
    this.ulist = {
      states: { colState: [], groupState: null, sortState: [], filterState: {} }
    };
    this.columnDefs.push(
      {
        headerName: this.row,
        colId: "colrow",
        suppressSorting: true,
        suppressFilter: true,
        suppressResize: true,
        suppressPaste: true,
        suppressSizeToFit: true,
        suppressMenu: true,
        suppressMovable: true,
        suppressNavigable: true,
        width: 61,
        cellClass: 'mycell-Row',
        cellRenderer: function (params) {
          return parseInt(params.node.id) + 1;
        }
      }
    );
    this.ulist.states.colState.push({ aggFunc: null, colId: 'colrow', hide: false, pinned: null, pivotIndex: null, rowGroupIndex: null, width: 61 });

    for (let p in this.gridSelect) {      // && this.gridSelect[p].search("_fk") == -1
      //if (this.gridSelect[p].search("ID") == -1 && this.gridSelect[p].search("Id") == -1) {
      var headers = { headerName: null, field: null, filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }, minWidth: 75, width: 110, cellClass: "cell-wrap-text", autoHeight: true };
      headers.field = this.gridSelect[p];
      this.translate.get(this.gridSelect[p]).subscribe(s => headers.headerName = s);
      this.columnDefs.push(headers);

      this.ulist.states.colState.push({ aggFunc: null, colId: this.gridSelect[p], hide: false, pinned: null, pivotIndex: null, rowGroupIndex: null, width: 110 });
      this.ulist.states.sortState.push({ colId: this.gridSelect[p], sort: null });
      this.ulist.states.filterState[this.gridSelect[p]] = { filter: null, filterType: 'text', type: 'contains' };
      //}
    }




    this.variables.subscribe(x => {
      if (x[this.colIndexId] === this.unsubVariables[this.colIndexId])
        return;
      else
        this.myApollo.callWithoutSubscribeQurey(x,
          this.myGraphQlResult.query).subscribe(
            st => {
              Object.assign(this.unsubVariables, x);
              //*console.log(st.data[this.graphquery]);
              this.rowData = st.data[this.graphquery];
            });
    });


    this.outSubscribeReady = this.myApollo.callWithoutSubscribeQurey(this.variablesColumns, this.gridColumns)
      .subscribe(
        x => {
          Object.assign(this.myColumnDataSource, x.data.gridColumnProjectManagementSystemProjectReport);
          this.restoreState();
      });
    //*console.log(this.myColumnDataSource);    

    setTimeout(function () {
      params.api.resetRowHeights();
    }, 500);
   
  }
 
  ngOnDestroy() {
    try {
      console.log('ngOnDestroy');    
      if (this.outSubscribeReady != undefined)
      this.outSubscribeReady.unsubscribe();
      this.myColumnDataSource = [{}];
      this.myApollo.clearCache();
    }
    catch{}
  }

}

 //printState() {
  //  var colState = this.myGridColumnApi.getColumnState();
  //  var sortState = this.gridApi.getSortModel();
  //  var filterState = this.gridApi.getFilterModel();
  //  console.log("***********************");
  //  console.log("colState: ", colState);
  //  console.log("sortState: ", sortState);
  //  console.log("filterState: ", filterState);
  //  console.log("***********************");

  //}
 //clear() {
  //  try {
  //    console.clear();
  //    //this.ulist.states.colState = null;
  //    this.myColumnDataSource = [{}];
  //    this.outSubscribe.unsubscribe();
  //    if (this.outSubscribeReady != undefined)
  //      this.outSubscribeReady.unsubscribe();
  //    if (this.myApollo._todos != undefined) {
  //        this.myApollo._todos.unsubscribe();     
  //    }
  //    if (this.myApollo != undefined)
  //      this.myApollo.clearCache();
  //  }
  //  catch{ }
  //}
