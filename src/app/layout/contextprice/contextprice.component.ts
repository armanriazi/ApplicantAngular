import { Component, OnInit, Injectable, AfterContentInit, Directive , OnDestroy, ViewEncapsulation} from '@angular/core';
import { SplashScreenService, StorageService, MyApolloService } from "../../shared";
import { MatFormField, MatSelect, MatOption, MatTableDataSource, MatPaginator, MatSort, MatColumnDef, MatRowDef } from '@angular/material';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { QueryRef } from 'apollo-angular';
import { GridOptions } from 'ag-grid';
import { TranslateService } from '@ngx-translate/core';
import { IgraphPriceRepertoryQueries } from '../../igraphql/igraphqlPriceRepertory';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of as observableOf, Observer } from 'rxjs';
import { forEach } from 'async';
import { TreeNode, ITreeOptions, TreeModel, ITreeState } from 'angular-tree-component';
import { FormBuilder } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-contextprice',
  templateUrl: './contextprice.component.html',
  
  styleUrls: ['./contextprice.component.scss']  
})
export class ContextPriceComponent implements OnInit {

  captionRouter;

  variablesDynamic: Observable<object> = new Observable<object>((observer) => {
    
      setInterval(() => {                
        observer.next((this.variablesPriceContextTableView));
        
    }, 1500);
  });

  financialYearId;
  basePriceRepertoryId;
  
  financialYearIdTable;
  basePriceRepertoryIdTable;
  
  myFinancialYearsSelectListData: any[];
  myBasePriceRepertorySelectListData: any[];
  myFinancialYearsSelectListDataTable: any[];
  myBasePriceRepertorySelectListDataTable: any[];
  
  myPriceRepertoryPriceTextFieldData: any;
  myPriceRepertoryGrid: any[];

  variablesPriceContextTableView;
  queryPriceContextTableView;
  colIndexId;  
  priceRepertoryFinancial;

  Depared;
  Moved;
  Reduced;
  row;
  expresions;

  mtree;
  mshow;
  aCC_FinancialYearID;
  tBL_PrcName;
  tBL_PrcParentID_fk;
  aCC_FinancialYearName;

  tBL_BprMachineryMovePrice;
  tBL_BprID;
  tBL_BprCode;
  tBL_BprParentID_fk;
  tBL_BprMaterialPrice;
  tBL_BprPayPrice;
  tBL_BprDeparePrice1;
  tBL_BprDeparePrice2;
  tBL_BprDeparePrice3;
  tBL_BprMachineryPrice;
  tBL_BprTransportCoefficient;
  tBL_BprWarehouseCoding;
  tBL_BprMachineryDeparePrice;
  tBL_BprDisposePrice;
  tBL_BprQuantity;
  tBL_BprPayDeparePrice;
  tBL_BprPrice;
  tBL_BprNote;
  tBL_BprActive;

  tBL_BprhPayMovePrice;
  tBL_BprhExecuteDate;
  tBL_BprhExpireDate;
  tBL_BprhMaterialPrice;

  inputTBL_BprID;
  inputTBL_BprCode;
  inputTBL_BprParentID_fk;
  inputTBL_BprMaterialPrice;
  inputTBL_BprPayPrice;
  inputTBL_BprDeparePrice1;
  inputTBL_BprDeparePrice2;
  inputTBL_BprDeparePrice3;
  inputTBL_BprMachineryPrice;
  inputTBL_BprTransportCoefficient;
  inputTBL_BprWarehouseCoding;
  inputTBL_BprMachineryDeparePrice;
  inputTBL_BprDisposePrice;
  inputTBL_BprQuantity;
  inputTBL_BprPayDeparePrice;
  inputTBL_BprPrice;
  inputTBL_BprNote;
  inputTBL_BprActive;
  inputTBL_BprDescription;
  inputTBL_BprMachineryMovePrice;
  inputTBL_BprOldCode;
  inputTBL_BprRegisterDate;
  inputTBL_BprType;
  inputTBL_BprStatus;

  myBasePriceProjectReportItemsColumnDefs;
  myBasePriceProjectReportItemsRowData: any[]=null;
  defaultColDef;
  paginationPageSize;
  paginationNumberFormatter;

  newNodes;
  tempData;
  nodes: any[] = [];
  selectedValueOfYear;
  selectedValueOfBasePrice;

  selectedValueOfYearTable;
  selectedValueOfBasePriceTable;


  options: ITreeOptions = {
    rtl: true,
    useVirtualScroll: true,   
    animateExpand: false,
    scrollContainer: <HTMLElement>document.body.parentElement,
    getChildren: this.getChildren.bind(this)
  };


  constructor(
    private serviceStorage: StorageService,
    private translate: TranslateService,
    private apollo: Apollo,
    private storageService: StorageService,
    private myApollo: MyApolloService) {

    translate.get('ContextPrice').subscribe(s => this.captionRouter = s);

    translate.get('row').subscribe(s => this.row = s);
    
    translate.get('Reduced').subscribe(s => this.Reduced = s);
    translate.get('Moved').subscribe(s => this.Moved = s);
    translate.get('Depared').subscribe(s => this.Depared = s);

    translate.get('aCC_FinancialYearID').subscribe(s => this.aCC_FinancialYearID = s);
    translate.get('tBL_PrcName').subscribe(s => this.tBL_PrcName = s);
    translate.get('tBL_PrcParentID_fk').subscribe(s => this.tBL_PrcParentID_fk = s);
    translate.get('aCC_FinancialYearName').subscribe(s => this.aCC_FinancialYearName = s);
    translate.get('Tree').subscribe(s => this.mtree = s);
    translate.get('Show').subscribe(s => this.mshow = s);
    translate.get('tBL_BprID').subscribe(s => this.tBL_BprID = s);
    translate.get('tBL_BprCode').subscribe(s => this.tBL_BprCode = s);
    translate.get('tBL_BprParentID_fk').subscribe(s => this.tBL_BprParentID_fk = s);
    translate.get('tBL_BprPayPrice').subscribe(s => this.tBL_BprPayPrice = s);
    translate.get('tBL_BprDeparePrice1').subscribe(s => this.tBL_BprDeparePrice1 = s);
    translate.get('tBL_BprDeparePrice2').subscribe(s => this.tBL_BprDeparePrice2 = s);
    translate.get('tBL_BprDeparePrice3').subscribe(s => this.tBL_BprDeparePrice3 = s);
    translate.get('tBL_BprMachineryPrice').subscribe(s => this.tBL_BprMachineryPrice = s);
    translate.get('tBL_BprTransportCoefficient').subscribe(s => this.tBL_BprTransportCoefficient = s);
    translate.get('tBL_BprWarehouseCoding').subscribe(s => this.tBL_BprWarehouseCoding = s);
    translate.get('tBL_BprMachineryDeparePrice').subscribe(s => this.tBL_BprMachineryDeparePrice = s);
    translate.get('tBL_BprMachineryMovePrice').subscribe(s => this.tBL_BprMachineryMovePrice = s);    
    translate.get('tBL_BprDisposePrice').subscribe(s => this.tBL_BprDisposePrice = s);
    translate.get('tBL_BprQuantity').subscribe(s => this.tBL_BprQuantity = s);
    translate.get('tBL_BprPayDeparePrice').subscribe(s => this.tBL_BprPayDeparePrice = s);
    translate.get('tBL_BprPrice').subscribe(s => this.tBL_BprPrice = s);
    translate.get('tBL_BprNote').subscribe(s => this.tBL_BprNote = s);
    translate.get('tBL_BprActive').subscribe(s => this.tBL_BprActive = s);
    translate.get('tBL_BprMaterialPrice').subscribe(s => this.tBL_BprMaterialPrice = s);
    translate.get('tBL_BprhExecuteDate').subscribe(s => this.tBL_BprhExecuteDate = s);
    translate.get('tBL_BprhExpireDate').subscribe(s => this.tBL_BprhExpireDate = s);
    translate.get('tBL_BprMaterialPrice').subscribe(s => this.tBL_BprhMaterialPrice = s);
    translate.get('tBL_BprhPayMovePrice').subscribe(s => this.tBL_BprhPayMovePrice = s);


    this.defaultColDef = {
      editable: false,
      enableValue: true
    };

    this.paginationPageSize = 4;

    this.myBasePriceProjectReportItemsColumnDefs = [
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
        width: 65,
        cellClass: 'mycell-Row',
        cellRenderer: function (params) {
          return parseInt(params.node.id) + 1;
        }

      },
      {
        headerName: this.tBL_BprID, field: 'tBL_BprhID', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      }
      ,
      {
        headerName: this.tBL_BprhExecuteDate, field: 'tBL_BprhExecuteDate', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: this.tBL_BprhExpireDate, field: 'tBL_BprhExpireDate', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: this.Reduced,
        children: [
          {
            headerName: this.tBL_BprhMaterialPrice, field: 'tBL_BprhMaterialPrice', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
          },
          {
            headerName: this.tBL_BprPayPrice, field: 'tBL_BprhPayPrice', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
          },
          {
            headerName: this.tBL_BprMachineryPrice, field: 'tBL_BprhMachineryPrice', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
          }
        ]
      }
      ,
      {
        headerName: this.Moved,
        children: [
          {
            headerName: this.tBL_BprhPayMovePrice, field: 'tBL_BprhPayMovePrice', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
          }     
          ,
          {
            headerName: this.tBL_BprMachineryMovePrice, field: 'tBL_BprMachineryMovePrice', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
          }
       
       ]
      }       
      ,      
      {
        headerName: this.Depared,
        children: [
          {
            headerName: this.tBL_BprDeparePrice1, field: 'tBL_BprhDeparePrice1', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
          },
          {
            headerName: this.tBL_BprDeparePrice2, field: 'tBL_BprhDeparePrice2', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
          }
          ,
          {
            headerName: this.tBL_BprDeparePrice3, field: 'tBL_BprhDeparePrice3', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
          },
          {
            headerName: this.tBL_BprPayDeparePrice, field: 'tBL_BprhPayDeparePrice', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
          }
          ,
          {
            headerName: this.tBL_BprMachineryDeparePrice, field: 'tBL_BprhMachineryDeparePrice', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
          }
        ]
      }           
      ,
      {
        headerName: this.tBL_BprDisposePrice, field: 'tBL_BprhDisposePrice', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      }
      ,
      {
        headerName: this.tBL_BprNote, field: 'tBL_BprhNote', filter: "agTextColumnFilter", filterParams: { newRowsAction: "keep" }
      }
    ];

    this.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };

    
    this.priceRepertoryFinancial = "priceRepertoryFinancialYearsSelectListActionByAccFinancialYearId";
  }

  ngOnInit() {    
    this.onSelectedTab(0);
  }

  getChildren(node: any) {

    var parentId = node.data.id;
    var commentsQuery: QueryRef<any>;
    commentsQuery = this.apollo.watchQuery({
      query: IgraphPriceRepertoryQueries.treeGridActionByParams,
      variables: {
        accFinancialYearID: this.financialYearId,
        tblPrcID: this.basePriceRepertoryId,
        tblPrcIDParent: this.basePriceRepertoryId,
        tblBprParentId: parentId,
        sortExpression: '',
      }
    });
    var rs = commentsQuery.valueChanges;
    rs.subscribe(st => {
      if (st.data["priceRepertoryGridActionByParams"].length >= 1) {
        this.newNodes = st.data["priceRepertoryGridActionByParams"].map((c) => Object.assign({}, c));
      }
    },err => console.log(err));
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.newNodes), 5000);
    });
  }

  onEventActivate(e) {

    var commentsQuery: QueryRef<any>;
    commentsQuery = this.apollo.watchQuery({
      query: IgraphPriceRepertoryQueries.gridActionByParams,
      variables: {
        accFinancialYearID: this.financialYearId,
        tblBprID: e.node.id,
        sortExpression: '',
        orderBy: ''
      }
    });
    var rs = commentsQuery.valueChanges;
    rs.subscribe(st => {
      if (st.data["projectManagementSystemProjectReportGridActionByParams"].length >= 1) 
        this.myBasePriceProjectReportItemsRowData = st.data["projectManagementSystemProjectReportGridActionByParams"];      
      else
        this.myBasePriceProjectReportItemsRowData = null;
    }, err => console.log(err));


    var commentsQuery: QueryRef<any>;
    commentsQuery = this.apollo.watchQuery({
      query: IgraphPriceRepertoryQueries.textActionByParams,
      variables: {
        tblBprId: e.node.id
      }
    });
    var rs = commentsQuery.valueChanges;
    rs.subscribe(st => {
      if (st.data["basePriceRepertoryPriceTextFieldActionByQuery"].length >= 1) {
        var ary = st.data["basePriceRepertoryPriceTextFieldActionByQuery"];
        this.myPriceRepertoryPriceTextFieldData = ary[0];
        this.expresions = this.myPriceRepertoryPriceTextFieldData;

        this.inputTBL_BprCode = this.expresions["tBL_BprCode"];
        this.inputTBL_BprActive = this.expresions["tBL_BprActive"];
        this.inputTBL_BprDeparePrice1 = this.expresions["tBL_BprDeparePrice1"];
        this.inputTBL_BprDeparePrice1 = this.expresions["tBL_BprDeparePrice1"];
        this.inputTBL_BprDeparePrice2 = this.expresions["tBL_BprDeparePrice2"];
        this.inputTBL_BprDeparePrice3 = this.expresions["tBL_BprDeparePrice3"];
        this.inputTBL_BprDescription = this.expresions["tBL_BprDescription"];
        this.inputTBL_BprDisposePrice = this.expresions["tBL_BprDisposePrice"];
        this.inputTBL_BprID = this.expresions["tBL_BprID"];
        this.inputTBL_BprMachineryDeparePrice = this.expresions["tBL_BprMachineryDeparePrice"];
        this.inputTBL_BprMachineryMovePrice = this.expresions["tBL_BprMachineryMovePrice"];
        this.inputTBL_BprMachineryPrice = this.expresions["tBL_BprMachineryPrice"];
        this.inputTBL_BprMaterialPrice = this.expresions["tBL_BprMaterialPrice"];
        this.inputTBL_BprNote = this.expresions["tBL_BprNote"];
        this.inputTBL_BprOldCode = this.expresions["tBL_BprOldCode"];
        this.inputTBL_BprParentID_fk = this.expresions["tBL_BprParentID_fk"];
        this.inputTBL_BprPayDeparePrice = this.expresions["tBL_BprPayDeparePrice"];
        this.inputTBL_BprPayPrice = this.expresions["tBL_BprPayPrice"];
        this.inputTBL_BprPrice = this.expresions["tBL_BprPrice"];
        this.inputTBL_BprQuantity = this.expresions["tBL_BprQuantity"];
        this.inputTBL_BprRegisterDate = this.expresions["tBL_BprRegisterDate"];
        this.inputTBL_BprStatus = this.expresions["tBL_BprStatus"];
        this.inputTBL_BprTransportCoefficient = this.expresions["tBL_BprTransportCoefficient"];
        this.inputTBL_BprType = this.expresions["tBL_BprType"];
        this.inputTBL_BprWarehouseCoding = this.expresions["tBL_BprWarehouseCoding"];
      }
      else {
        this.clearTextBoxes();
      }
    }, err => console.log(err));


  }


  onSelectionFinancialYearsChange(e) {
    this.financialYearId = e.value;
    var commentsQuery: QueryRef<any>;
    commentsQuery = this.apollo.watchQuery({
      query: IgraphPriceRepertoryQueries.basePriceRepertorySelectListActionByQuery,
      variables: {
        qparam: this.financialYearId
      }
    });
    var rs = commentsQuery.valueChanges;
    rs.subscribe(st => {
      if (st.data["basePriceRepertorySelectListActionByQuery"].length >= 1) {
        this.myBasePriceRepertorySelectListData = st.data["basePriceRepertorySelectListActionByQuery"];        
        this.selectedValueOfBasePrice = this.myBasePriceRepertorySelectListData[0].tBL_PrcID;
        //*console.log(this.selectedValueOfBasePrice);
        var e = { value: this.selectedValueOfBasePrice };
        this.onSelectionBasePriceRepertoryChange(e);
      }
    }, err => console.log(err));
  }


  onSelectionBasePriceRepertoryChange(e) {
    this.clearTextBoxes();
    this.basePriceRepertoryId = e.value;
    var commentsQuery: QueryRef<any>;
    commentsQuery = this.apollo.watchQuery({
      query: IgraphPriceRepertoryQueries.treeGridActionByParams,
      variables: {
        accFinancialYearID: this.financialYearId,
        tblPrcID: this.basePriceRepertoryId,
        tblPrcIDParent: this.basePriceRepertoryId,
        tblBprParentId: '',
        sortExpression: '',
      }
    });
    var rs = commentsQuery.valueChanges;
    rs.subscribe(st => {
      if (st.data["priceRepertoryGridActionByParams"].length >= 1) {

        this.myPriceRepertoryGrid = st.data["priceRepertoryGridActionByParams"];
        this.nodes = new Array(1).fill(null).map((item, i) => ({
          id: `0`,
          name: this.mshow + ' ' + this.mtree,
          hasChildren: true,
          children: new Array(this.myPriceRepertoryGrid.length).fill(this.myPriceRepertoryGrid).map((item, j) => (
            {
              id: item[j].id,
              name: item[j].name,
              hasChildren: true,
            }
          ))
        }));
      }
    }, err => console.log(err));
  }



  onBasePriceProjectReportItemsGridReady(params) {
    //this.myPlanItemsGridColumnApi = params.columnApi;
      params.api.setRowData(null);
  }



  onSelectedTab(e) {
    var commentsQuery: QueryRef<any>;
    

    commentsQuery = this.apollo.watchQuery({
          query: IgraphPriceRepertoryQueries.financialYearsSelectListActionByAccFinancialYearId,
          variables: {
            qparam: ''
          }
        });

    var rs = commentsQuery.valueChanges;   

    switch (e) {
     
      case 0:
        if (this.myFinancialYearsSelectListData == undefined)
        rs.subscribe(st => {
          if (st.data[this.priceRepertoryFinancial].length >= 1) {
            this.myFinancialYearsSelectListData = st.data[this.priceRepertoryFinancial];            
            for (let k in this.myFinancialYearsSelectListData)
              if (this.myFinancialYearsSelectListData[k].aCC_FinancialYearIsDefault == 1) {
                this.selectedValueOfYear = this.myFinancialYearsSelectListData[k].aCC_FinancialYearID;
                var e = { value: this.selectedValueOfYear };
                this.onSelectionFinancialYearsChange(e);
              }
          }
        }, err => console.log(err));

        break;

      case 1:
        if (this.myFinancialYearsSelectListDataTable == undefined)
        rs.subscribe(st => {        
          if (st.data[this.priceRepertoryFinancial].length >= 1) {            
            this.myFinancialYearsSelectListDataTable = st.data[this.priceRepertoryFinancial];            
            for (let k in this.myFinancialYearsSelectListDataTable)
              if (this.myFinancialYearsSelectListDataTable[k].aCC_FinancialYearIsDefault == 1) {
                this.selectedValueOfYearTable = this.myFinancialYearsSelectListDataTable[k].aCC_FinancialYearID;
                var e = { value: this.selectedValueOfYearTable };
                this.onSelectionFinancialYearsChangeTable(e);
              }
          }
        }, err => console.log(err));
    }
  }

  onSelectionFinancialYearsChangeTable(e) {
   
    this.financialYearIdTable = e.value;
    var commentsQuery: QueryRef<any>;
    commentsQuery = this.apollo.watchQuery({
      query: IgraphPriceRepertoryQueries.basePriceRepertorySelectListActionByQuery,
      variables: {
        qparam: this.financialYearIdTable
      }
    });
    var rs = commentsQuery.valueChanges;
    rs.subscribe(st => {
      if (st.data["basePriceRepertorySelectListActionByQuery"].length >= 1) {
        this.myBasePriceRepertorySelectListDataTable = st.data["basePriceRepertorySelectListActionByQuery"];
        this.selectedValueOfBasePriceTable = this.myBasePriceRepertorySelectListDataTable[0].tBL_PrcID;
        var e = { value: this.selectedValueOfBasePriceTable };
        this.onSelectionBasePriceRepertoryChangeTable(e);
      }
    }, err => console.log(err));
  }

  onSelectionBasePriceRepertoryChangeTable(e) {

    this.basePriceRepertoryIdTable = e.value;
    var variables = { tblPrcId: this.basePriceRepertoryIdTable, orderBy: '', userId: '', accFinancialYearId: this.financialYearIdTable, desc: '' };

    this.colIndexId = "tblPrcId";
    this.variablesPriceContextTableView = variables;
    this.queryPriceContextTableView = "projectManagementSystemReportPriceContextTableViewByParams";
    
  }

  clearTextBoxes() {
    this.inputTBL_BprCode = null;
    this.inputTBL_BprActive = null;
    this.inputTBL_BprDeparePrice1 = null;
    this.inputTBL_BprDeparePrice1 = null;
    this.inputTBL_BprDeparePrice2 = null;
    this.inputTBL_BprDeparePrice3 = null;
    this.inputTBL_BprDescription = null;
    this.inputTBL_BprDisposePrice = null;
    this.inputTBL_BprID = null;
    this.inputTBL_BprMachineryDeparePrice = null;
    this.inputTBL_BprMachineryMovePrice = null;
    this.inputTBL_BprMachineryPrice = null;
    this.inputTBL_BprMaterialPrice = null;
    this.inputTBL_BprNote = null;
    this.inputTBL_BprOldCode = null;
    this.inputTBL_BprParentID_fk = null;
    this.inputTBL_BprPayDeparePrice = null;
    this.inputTBL_BprPayPrice = null;
    this.inputTBL_BprPrice = null;
    this.inputTBL_BprQuantity = null;
    this.inputTBL_BprRegisterDate = null;
    this.inputTBL_BprStatus = null;
    this.inputTBL_BprTransportCoefficient = null;
    this.inputTBL_BprType = null;
    this.inputTBL_BprWarehouseCoding = null;
  }
}
