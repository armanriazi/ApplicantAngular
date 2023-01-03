import { Component, OnInit, ViewChild, ViewContainerRef, Inject, OnDestroy, ComponentRef, ElementRef } from '@angular/core';
import { SplashScreenService, StorageService, MessageService, MyApolloService, AuthService, ErrorService, GridSettings, ColumnSettings, KendoStatePersistingService } from "../../shared";
import { MatFormField, MatSelect, MatOption, MatTableDataSource, MatPaginator, MatSort, MatColumnDef, MatRowDef, MatDialog, MatIcon, MatButton } from '@angular/material';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { QueryRef } from 'apollo-angular';
import { Observable, BehaviorSubject, Observer, Subscription, Subject, AsyncSubject } from 'rxjs/Rx';
import { GridOptions, TabbedLayout } from 'ag-grid';
import { TranslateService } from '@ngx-translate/core';
import { IgraphProjectManagementSystemQueries } from '../../igraphql/igraphqlProjectManagementSystem';
import { AttachmentComponent } from '../../dynamic-modules/attachment/attachment.component';
import { SetWinnerComponent } from '../../dynamic-modules/setwinner/setwinner.component';
import { MessageBox, MessageBoxButton, MessageBoxStyle } from "../../libs/messagebox";
import { products, sampleProducts } from './griddata';
import { SortDescriptor, State, FilterDescriptor, process, GroupDescriptor, CompositeFilterDescriptor, DataResult } from '@progress/kendo-data-query';
import { DataStateChangeEvent, GridDataResult, PageChangeEvent, RowArgs, GridComponent, ColumnBase } from '@progress/kendo-angular-grid';
import { encodeBase64 } from '@progress/kendo-file-saver';
import { IgraphPluralComponentProjectManagementSystemQueries } from '../../igraphql/igraphqlPluralComponentProjectManagementSystem';
import { isEqual, differenceWith } from 'lodash';

const SubSystemId_GridPlanInformaion: string = "95802";
const UserProfileHistory_GridPlanInformaion: string = "gridPlanInformationDocumentSettings";

@Component({
  selector: 'app-gridplaninformation',
  templateUrl: './gridplaninformation.component.html',
  styleUrls: ['./gridplaninformation.component.scss']
})


export class GridPlanInformationComponent implements OnInit, OnDestroy {
  @ViewChild('grid') myKendoGridDocumentRef: GridComponent;
  loadLastDataReturn?: number;
  ref: AttachmentComponent;
  myDocumentKendoRowData?: DataResult;
  //myDocumentKendoRowData: Observable<any[]>;
  myDocumentKendoDialogRowData: Observable<any[]>;
  myDocumentDevExtremeRowData: Observable<any[]>;
  nationalCode;
  currentTab;
  multiple = false;
  allowUnsort = true;
  isDefaultGridDocument: boolean = true;
  //filters: CompositeFilterDescriptor;
  filters: FilterDescriptor[] = [];
  sorts: SortDescriptor[] = [];
  groups: GroupDescriptor[] = [];
  gridData: GridDataResult;
  gridKendoResultView: GridDataResult;
  pageSize = 1;  
  rowIndex = 0;
  pageSizes:number[] =[1,2,4,6];
  sfoId?: string=null;
  state?: State;
  columnsConfig?: ColumnSettings[];

  reorderable: boolean = true;
  filterable: boolean = true;
  groupable: boolean = true;
  resizable: boolean = true;
  selectable: boolean = true;
  sortable: boolean=true;
  take: number = 1;
  skip: number = 1;

  stateInitialize?: State;
  columnsConfigInitialize?: ColumnSettings[];


  gridPlanInformationDocumentSettingsInView: GridSettings;
  gridDefaultSettings: GridSettings;
  gridInitilizeSettings: GridSettings;
  gridLocalSettings: GridSettings;
  gridServerSettings: GridSettings;
  captionRouter;
  outSubscribeReady: Subscription;
  outSubscribeKendoRowsDocument: Subscription;
  outSubscribeKendoSavePersist: Subscription;  
  outSubscribeKendoInitialLoadPersist: Subscription;
  outSubscribeKendoServerLoadPersist: Subscription;
  outSubscribeKendoDialogRowsDocument: Subscription;
  outSubscribeDevExtremeRowsDocument: Subscription;
  errorResult: any;

  id;
  colIndexId;
  variablesPlanItemsProperty;
  queryPlanItemsProperty;
  selectedDefault;
  selectedIndexTab;

  title;
  message;
  doSuccess;
  doError;
  information;
  button;
  style;
  selectedBudget;
  budgetByCodeMeli;
  documentGridOptions;
  priceGridOptions;



  devExtremeLoading: boolean = true;
  kendoLoading: boolean = true;
  opened: boolean = false;

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

  documentID;
  documentCode;
  documentName;
  documentFileType;
  documentNote;
  fileTypeId;
  date;

  tokenStateName;

  constructor(
    public dialog: MatDialog,
    private messageService: MessageService,
    private serviceStorage: StorageService,
    private translate: TranslateService,
    private apollo: Apollo,
    private myApollo: MyApolloService,
    private authService: AuthService,
    private errorService: ErrorService,
    private persistingService:KendoStatePersistingService) {

    this.errorService.latestError.subscribe(
      err => {
        console.log('result = ' + err);
        this.errorResult = err;
      },
      err => {
        console.log('err');
      },
      () => {
        console.log('complete');
      });
    
    this.planDocumentsByBudgetProjectId = IgraphProjectManagementSystemQueries.get('projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId').query;

    this.nationalCode = this.serviceStorage.get("Current:User", { session: true });
    this.budgetByCodeMeli = this.serviceStorage.get("Current:BudgetByCodeMeli", { session: false });
    if (this.nationalCode == null || this.budgetByCodeMeli == null) {
      this.authService.logout();
      return;
    }
    this.id = { value: this.budgetByCodeMeli[0].bUD_ProjectID };
    this.tokenStateName = UserProfileHistory_GridPlanInformaion + "|" + this.nationalCode;

    translate.get('PlanInformation').subscribe(s => this.captionRouter = s);

    translate.get('Information').subscribe(s => this.Information = s);
    translate.get('row').subscribe(s => this.row = s);
    translate.get('doSuccess').subscribe(s => this.doSuccess = s);
    translate.get('doError').subscribe(s => this.doError = s);
    
    translate.get('pMS_PdtName').subscribe(s => this.pMS_PdtName = s);
    translate.get('pMS_PaDate').subscribe(s => this.pMS_PaDate = s);
    translate.get('pMS_PaDescription').subscribe(s => this.pMS_PaDescription = s);
    translate.get('commands').subscribe(s => this.commands = s);

    translate.get('documentID').subscribe(s => this.documentID = s);
    translate.get('documentCode').subscribe(s => this.documentCode = s);
    translate.get('documentName').subscribe(s => this.documentName = s);
    translate.get('documentFileType').subscribe(s => this.documentFileType = s);
    translate.get('documentNote').subscribe(s => this.documentNote = s);
    translate.get('fileTypeId').subscribe(s => this.fileTypeId = s);

    
    this.state = {
      skip: this.skip,
      take: this.pageSize,
      filter: {
        logic: 'and',
        filters: [{ field: 'pMS_PaID', operator: 'contains', value: '' }]
      },
      group: this.groups,
      sort: this.sorts
    };
    this.columnsConfig = [{
      field: 'pMS_PaID',
      title: 'pMS_PaID',
      filterable: false,
      hidden: true,
      _width: 40
    },      
      {
      field: 'pMS_PdtName',
      title: this.pMS_PdtName,
      resizable: true,
      filterable: true,
      selectable: true,
      sortable: true,
      reorderable:true,
      groupable:true,
      hidden: false,
        _width: 150
      },
      {
      field: 'pMS_PaDescription',
      title: this.pMS_PaDescription,
      resizable: true,
      filterable: true,
      reorderable: true,
      selectable: true,
      sortable: true,
      groupable: true,
      hidden: false,
        _width: 150

      },
      {
      field: 'pMS_PaDate',
      title: this.pMS_PaDate,
      resizable:true,
      filterable: true,
      reorderable: true,
      selectable: true,
      sortable: true,
      groupable: true,
      hidden: false,
        _width: 180
        
      }];
  }

  ngOnInit() {
  

    if (this.nationalCode == null || this.budgetByCodeMeli == null)
      return;
    this.selectedDefault = this.id.value;
    this.onSelectionChange(this.id);

  }

  get savedStateExists(): boolean {
    return !!this.persistingService.get(this.tokenStateName);
  }


  checkStateSource() {
    this.loadGridSettingsFromServer();
  }

  loadGridSettingsFromDefault(): boolean {
    this.kendoLoading = true;
    this.gridDefaultSettings = {
      columnsConfig: this.columnsConfig,
      state: this.state
    };

    //this.loadGridSettingsFromInitialize();

    this.gridPlanInformationDocumentSettingsInView = this.mapGridSettings(this.gridDefaultSettings);
    if (this.gridPlanInformationDocumentSettingsInView != undefined && this.gridPlanInformationDocumentSettingsInView!=null) {
      console.log("Default - gridPlanInformationDocumentSettings");
      this.loadKendoDocumentDataItemsAsync(null);
      return true;
    }
  
  return false;
  }
  loadGridSettingsFromInitialize(): boolean {
    this.clear();

    this.kendoLoading = true;
    var commentsQuery: QueryRef<any>;
    var rs = null;

    commentsQuery = this.apollo.watchQuery({
      query: IgraphPluralComponentProjectManagementSystemQueries.get('gridInitializeProjectManagementSystemProjectReport').query,
      variables: {
        sfodFieldName: "pMS_PdtName,pMS_PaDate,pMS_PaDescription,attachmentComponent",
        sfoName: "projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"
      }
    });
    rs = commentsQuery.valueChanges;

    this.stateInitialize = this.state;
    this.columnsConfigInitialize = new Array<ColumnSettings>(); //this.columnsConfig;
    
    this.outSubscribeKendoInitialLoadPersist = rs.subscribe(st => {
      
      if (st.data["gridInitializeProjectManagementSystemProjectReport"].length > 0) {
        var gridSettingInitialize: object[];
        var row = 0;
        this.sfoId = null;
        gridSettingInitialize = st.data["gridInitializeProjectManagementSystemProjectReport"];
        var stateFilterDescriptor: FilterDescriptor[] = [];
        var stateSortDescriptor: SortDescriptor[] = [];
        var stateGroupDescriptor: GroupDescriptor[] = [];
        var stateColumnSettings: ColumnSettings[] = [];
  
        while (row < gridSettingInitialize.length) {
         
          var col = gridSettingInitialize[row];
          if (row == 0) {

            if (this.sfoId == null)
              this.sfoId = col['nIK_SfoID_fk'];

            if (col['nIK_SfoCustomStyle'] != undefined && col['nIK_SfoCustomStyle'] != null) {
              var sdata: String = col['nIK_SfoCustomStyle'].toString().trim().toLocaleLowerCase();
              var scount = 0;
              for (let s in sdata) {
                if (sdata[s].indexOf(':') == 0)
                  scount++
              }
            
              var splited = sdata.split(",", scount);

              for (let i in splited) {
                var sobject = splited[i].split(":", 2)[0];
                var sval = splited[i].split(":", 2)[1];

                if (sobject == "filterable")
                  this.filterable = sval == "false" ? false : true;
                else if (sobject == "groupable")
                  this.groupable = sval == "false" ? false : true;
                else if (sobject == "resizable")
                  this.resizable = sval == "false" ? false : true;
                else if (sobject == "selectable")
                  this.selectable = sval == "false" ? false : true;
                else if (sobject == "sortable")
                  this.sortable = sval == "false" ? false : true;
                else if (sobject == "reorderable")
                  this.reorderable = sval == "false" ? false : true;
                else if (sval == "take")
                  this.take = Number(sval);
                else if (sobject == "skip")
                  this.skip = Number(sval);
                }                                   
            }                                                  
            
          }
            stateColumnSettings.push({
            field: col['nIK_SfodFieldName'] != undefined ? col['nIK_SfodFieldName'] : null,
            title: col['nIK_SfodFarsiName'] != undefined ? col['nIK_SfodFarsiName'] : null,           
            hidden: col['nIk_SfodIsHide'] != undefined ? (col['nIk_SfodIsHide'] == "false" ? false : true) : null,
            _width: col['nIk_SfodWidth'] != undefined ? Number(col['nIk_SfodWidth']) : null,
            filterable: this.filterable,
            groupable: this.groupable,
            resizable: this.resizable,
            selectable: this.selectable,
            sortable: this.sortable
          });
          
          if (col['nIk_SfodGroupState'] != undefined && col['nIk_SfodGroupState'] != null) {
            stateGroupDescriptor.push({ field: col['nIK_SfodFieldName'] })            
          }
          if (col['nIk_SfodSortState'] != undefined && col['nIk_SfodSortState'] != null) {
            stateSortDescriptor.push({ dir: col['nIk_SfodSortState'], field: col['nIK_SfodFieldName'] });
          }
          if (col['nIk_SfodFilterState'] != undefined && col['nIk_SfodFilterState'] != null) {            
            var splitedFilter = col['nIk_SfodFilterState'].toString().trim().split(",", 2);
            var operatored = splitedFilter[0].split(":", 2)[1];
            var valued = splitedFilter[1].split(":", 2)[1];              
              stateFilterDescriptor.push({ operator: operatored, value: valued, field: col['nIK_SfodFieldName'] });       
          }          
          row++;
        }
        this.pageSize = this.take;
        this.pageSizes[0] = this.take;
        this.pageSizes[1] = this.take*2;
        this.pageSizes[2] = this.take*4;
        this.pageSizes[3] = this.take*6;    
        this.stateInitialize.take = this.take;
        this.stateInitialize.skip = this.skip;
        this.stateInitialize.group = stateGroupDescriptor;
        this.stateInitialize.sort = stateSortDescriptor;
        this.stateInitialize.filter.filters = stateFilterDescriptor;
        this.columnsConfigInitialize = stateColumnSettings;       
       
        this.gridInitilizeSettings = {
          columnsConfig: this.columnsConfigInitialize,
          state: this.stateInitialize,
          gridData: null
        };
        //*console.log(this.gridInitilizeSettings);

        this.gridPlanInformationDocumentSettingsInView = this.mapGridSettings(this.gridInitilizeSettings);

        this.persistingService.set(this.tokenStateName, this.gridInitilizeSettings);       
        
        if (this.gridPlanInformationDocumentSettingsInView != undefined && this.gridPlanInformationDocumentSettingsInView != null) {
          console.log("Initialize - gridPlanInformationDocumentSettings");
          this.loadKendoDocumentDataItemsAsync(0);
          return true;
        }

       
      }      
        else {
          this.loadGridSettingsFromDefault();        
      }     
    }), err => {
      console.log('errorResult = ' + err);
      this.errorService.error();
      }
    return false;
  }  
  loadGridSettingsFromLocal(): boolean {
    
    this.kendoLoading = true;
    this.gridLocalSettings = this.mapGridSettings(this.persistingService.get(this.tokenStateName));
    this.gridPlanInformationDocumentSettingsInView = this.gridLocalSettings;
    
    if (this.gridPlanInformationDocumentSettingsInView != undefined && this.gridPlanInformationDocumentSettingsInView != null) {
      console.log("Local - gridPlanInformationDocumentSettings");
      this.loadKendoDocumentDataItemsAsync(1);
      return true;
    }
    else {
      this.loadGridSettingsFromInitialize(); 
    }
      
    return false;
  }
  loadGridSettingsFromServer(): boolean {
    this.clear();
    this.kendoLoading = true;    
    var commentsQuery: QueryRef<any>;
    var rs = null;

    commentsQuery = this.apollo.watchQuery({
      query: IgraphPluralComponentProjectManagementSystemQueries.get('gridGetStateUserProfileHistory').query,
      variables: {
        subSystemId: SubSystemId_GridPlanInformaion,
        uphGridName: this.tokenStateName,
        uphDeleteDate: this.nationalCode,
        userId:"1"
      }
    });
    rs = commentsQuery.valueChanges;
    
    this.outSubscribeKendoServerLoadPersist = rs.subscribe(st => {
      
      if (st.data["gridGetStateUserProfileHistory"][0] != undefined && st.data["gridGetStateUserProfileHistory"][0].tBL_UphBody != null) {
      
        const saveconfig = this.SPFileBinaryToJSONObject(st.data["gridGetStateUserProfileHistory"][0].tBL_UphBody);
      
        this.gridServerSettings = this.mapGridSettings(saveconfig);
        this.gridPlanInformationDocumentSettingsInView = this.gridServerSettings;


        this.persistingService.set(this.tokenStateName, saveconfig);
        
        if (this.gridPlanInformationDocumentSettingsInView != undefined && this.gridPlanInformationDocumentSettingsInView != null) {
          console.log("Server - gridPlanInformationDocumentSettings");
          this.loadKendoDocumentDataItemsAsync(2);
          return true;
        }
       
      }
      else {
        this.loadGridSettingsFromLocal();
      }
    }, err => {
      console.log('errorResult = ' + err);
      this.errorService.error();
      });

    return false;
  }
  loadKendoDocumentDataItemsAsync(whichStateSource?: number) {
    var commentsQuery: QueryRef<any>;
    var rs = null;
    commentsQuery = this.apollo.watchQuery({
      query: this.planDocumentsByBudgetProjectId,
      variables: {
        budgetProjectId: this.id,
      }
    });
    rs = commentsQuery.valueChanges;

    this.outSubscribeKendoRowsDocument = rs.subscribe(st => {
      if (st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"].length >= 1) {
        
        this.loadLastDataReturn = whichStateSource;     
        if (whichStateSource == null)
          this.gridPlanInformationDocumentSettingsInView.gridData = process(st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"], this.gridDefaultSettings != undefined ? this.gridDefaultSettings.state : this.gridInitilizeSettings.state);
        else if (whichStateSource == 0) {
          this.gridInitilizeSettings.state.skip = this.gridPlanInformationDocumentSettingsInView.state.skip;
          this.gridInitilizeSettings.state.take = this.gridPlanInformationDocumentSettingsInView.state.take;
          this.gridPlanInformationDocumentSettingsInView.gridData = process(st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"], this.gridInitilizeSettings != undefined ? this.gridPlanInformationDocumentSettingsInView.state : this.gridLocalSettings.state);
        }
          else if (whichStateSource == 1)
            this.gridPlanInformationDocumentSettingsInView.gridData = process(st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"], this.gridLocalSettings != undefined ? this.gridLocalSettings.state : this.gridServerSettings.state);
          else if (whichStateSource == 2)
            this.gridPlanInformationDocumentSettingsInView.gridData = process(st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"], this.gridServerSettings != undefined ? this.gridServerSettings.state : this.gridLocalSettings.state);
        this.kendoLoading = false;
      }           
    }, err => {
      console.log('errorResult = ' + err);
      this.errorService.error();
    });
  }
  saveGridSettingsStateWithServer(): void {
    this.saveGridSettingsState();
    this.saveGridSettingsToServer();
  }
  saveGridSettingsState(): void {   
    const columns = this.myKendoGridDocumentRef.columns.toArray();
    columns.splice(0, 1);
    for (let i in columns) {
      //columns[i].hidden == true ||
      if (columns[i].hidden == undefined || columns[i].title == this.commands || columns[i].title == this.row) {
        var index = columns.indexOf(columns[i], 0);
        if (index > -1) {
          columns.splice(index, 1);
        }
      }
    }
    const gridConfig = {
      state: this.gridPlanInformationDocumentSettingsInView.state,
      columnsConfig: columns.map(item => {
        return Object.keys(item)
          .filter(propName => !propName.toLowerCase()
            .includes('template'))
          .reduce((acc, curr) => ({ ...acc, ...{ [curr]: item[curr] } }), <ColumnSettings>{});
      })
    };
    
    this.persistingService.set(this.tokenStateName, gridConfig); 
  }
  saveGridSettingsToServer() {  
    this.clear();

    var commentsQuery: QueryRef<any>;
    var rs = null;

    commentsQuery = this.apollo.watchQuery({
      query: IgraphPluralComponentProjectManagementSystemQueries.get('gridAffectStateUserProfileHistory').query,
      variables: {
        ssID_fk: SubSystemId_GridPlanInformaion,
        sfoID_fk: this.sfoId == null || this.sfoId == undefined ? "100000001" : this.sfoId,
        uphGridName: this.tokenStateName,
        uphBody: this.JSONObjectToSPFileBinary(this.persistingService.get(this.tokenStateName)),
        uphNote: this.captionRouter,
        uphRegisterDate: "",
        uphType: "0",
        uphActive: "1",
        uphStatus: "1",
        uphDeleteDate: this.nationalCode,
        financialYearID: "1397",
        userID: "1",
        uphID: ""
      }
    });
    rs = commentsQuery.valueChanges;
   
    this.outSubscribeKendoSavePersist = rs.subscribe(st => {
      if (st.data["gridAffectStateUserProfileHistory"].length >= 1) {        
        if (Number(st.data["gridAffectStateUserProfileHistory"][0].affectedRowCount) == 1) {
          MessageBox.show(this.dialog, this.doSuccess, this.Information, '', MessageBoxButton.Close, true, MessageBoxStyle.Full, "400px");          
        }
        else
          MessageBox.show(this.dialog, this.doError, this.Information, '', MessageBoxButton.Close, true, MessageBoxStyle.Full, "400px");
      }
      else
        MessageBox.show(this.dialog, this.doError, this.Information, '', MessageBoxButton.Close, true, MessageBoxStyle.Full, "400px");

    }, err => {
      console.log('errorResult = ' + err);
      this.errorService.error();
    });
  }

  mapGridSettings(gridPlanInformationDocumentSettings: GridSettings): GridSettings {
   
    if (gridPlanInformationDocumentSettings == undefined || gridPlanInformationDocumentSettings == null) return null;
    const state = gridPlanInformationDocumentSettings.state;
    this.mapDateFilter(state.filter);

    return {
      state,
      columnsConfig: gridPlanInformationDocumentSettings.columnsConfig.sort((a, b) => a.orderIndex - b.orderIndex),
      gridData: null//process(sampleProducts, state)
    };
  }
  mapDateFilter = (descriptor: any) => {
    const filters = descriptor.filters || [];

    filters.forEach(filter => {
      if (filter.filters) {
        this.mapDateFilter(filter);
      } else if (filter.field === 'FirstOrderedOn' && filter.value) {
        filter.value = new Date(filter.value);
      }
    });
  }

  dataStateChange(state: State): void {
    this.gridPlanInformationDocumentSettingsInView.state = state;
    this.saveGridSettingsState();
    //this.loadKendoDocumentDataItemsAsync(this.loadLastDataReturn);
  }

  sliderChange(pageIndex: number): void {
    this.skip = (pageIndex - 1) * this.pageSize;    
    this.gridPlanInformationDocumentSettingsInView.state.skip = this.skip;
  }

  pageKednoDocumentChange(state: any): void {

    this.pageSize = state.take;
    this.take = state.take;
    this.skip = state.skip;   
    //this.gridPlanInformationDocumentSettings.state.take = state.take;
    this.gridPlanInformationDocumentSettingsInView.state.skip = state.skip;
    this.gridPlanInformationDocumentSettingsInView.state.take = state.take;
    //this.gridPlanInformationDocumentSettings.state.take = this.pageSize;
    console.log(this.loadLastDataReturn);
    
    this.loadKendoDocumentDataItemsAsync(this.loadLastDataReturn);
  }
  onReorder(e: any): void {
    const reorderedColumn = this.gridPlanInformationDocumentSettingsInView.columnsConfig.splice(e.oldIndex, 1);
    this.gridPlanInformationDocumentSettingsInView.columnsConfig.splice(e.newIndex, 0, ...reorderedColumn);
    this.saveGridSettingsState();
  }
  onResize(e: any): void {

    e.forEach(item => {
      //console.log(item.newWidth);
      this.gridPlanInformationDocumentSettingsInView.columnsConfig.find(col => col.field === item.column.field)._width = item.newWidth;
    });
    this.saveGridSettingsState();
  }
  onVisibilityChange(e: any): void {
    e.columns.forEach(column => {
      this.gridPlanInformationDocumentSettingsInView.columnsConfig.find(col => col.field === column.field).hidden = column.hidden;
    });
    this.saveGridSettingsState();
  }

  filterChange(filters: any): void {
    this.gridPlanInformationDocumentSettingsInView.state.filter = filters;
    console.log(this.loadLastDataReturn);
    
    this.loadKendoDocumentDataItemsAsync(this.loadLastDataReturn);
  }
  sortChange(sorts: SortDescriptor[]): void {
    this.gridPlanInformationDocumentSettingsInView.state.sort = sorts;
    console.log(this.loadLastDataReturn);
    
    this.loadKendoDocumentDataItemsAsync(this.loadLastDataReturn);
  }
  groupChange(groups: GroupDescriptor[]): void {
    this.gridPlanInformationDocumentSettingsInView.state.group = groups;
    console.log(this.loadLastDataReturn);
    
    this.loadKendoDocumentDataItemsAsync(this.loadLastDataReturn);
  }

  b64DecodeUnicode(str: string): string {
    if (window
      && "atob" in window
      && "decodeURIComponent" in window) {
      return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(""));
    } else {
      console.warn("b64DecodeUnicode requirements: window.atob and window.decodeURIComponent functions");
      return null;
    }
  }
  b64EncodeUnicode(str: string): string {
    if (window
      && "btoa" in window
      && "encodeURIComponent" in window) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(("0x" + p1) as any);
      }));
    } else {
      console.warn("b64EncodeUnicode requirements: window.btoa and window.encodeURIComponent functions");
      return null;
    }
  }

  JSONObjectToSPFileBinary(jsonObject: any) {
    const jsonString = JSON.stringify(jsonObject, null, 0);
    return this.b64EncodeUnicode(jsonString);
  }
  SPFileBinaryToJSONObject(binary: any) {
    const binaryString = this.b64DecodeUnicode(binary);
    return JSON.parse(binaryString);
  }
  getChangesJsonStates(orginalCollection: any, changedCollection: any): any {
    return differenceWith(changedCollection, orginalCollection, isEqual);
  }

  dialogKendoClose(status) {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
    try {
      this.outSubscribeKendoDialogRowsDocument.unsubscribe();
    }
    catch{
      this.errorService.error();
    }
  }
  dialogKendoOpen(e) {

    if (e == undefined) return;
    var code = e;
    var commentsQuery: QueryRef<any>;
    var rs = null;
    this.opened = true;

    commentsQuery = this.apollo.watchQuery({
      query: IgraphProjectManagementSystemQueries.get('projectManagementSystemProjectReportAttachmentsDialogByDocumentCode').query,
      variables: {
        documentCode: code
      }
    });
    rs = commentsQuery.valueChanges;

    this.outSubscribeKendoDialogRowsDocument = rs.subscribe(st => {
      if (st.data["projectManagementSystemProjectReportAttachmentsDialogByDocumentCode"].length >= 1) {
        this.myDocumentKendoDialogRowData = new Observable<any>((observer: Observer<any>) => {
          setInterval(() => observer.next(st.data["projectManagementSystemProjectReportAttachmentsDialogByDocumentCode"]), 1000);
        });
      }
      else
        this.myDocumentKendoDialogRowData = null;
    }, err => {
      console.log('errorResult = ' + err);
      this.errorService.error();
    });
  }

  loadKendoDevExtremeItems() {
    var commentsQuery: QueryRef<any>;
    var rs = null;
    commentsQuery = this.apollo.watchQuery({
      query: this.planDocumentsByBudgetProjectId,
      variables: {
        budgetProjectId: this.id,
      }
    });

    rs = commentsQuery.valueChanges;
    this.outSubscribeDevExtremeRowsDocument = rs.subscribe(st => {
      if (st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"].length >= 1) {
        this.devExtremeLoading = false;
        this.myDocumentDevExtremeRowData = new Observable<any>((observer: Observer<any>) => {
          var subject = new AsyncSubject<any>();
          var i = 0;
          var handle = setInterval(
            function () {
              observer.next(st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"]);
              subject.next(i);
              if (++i > 3) {
                subject.complete();
                observer.complete();
                clearInterval(handle);
              }
            }, 1000);
        });
      }
      else
        this.myDocumentDevExtremeRowData = null;
    }, err => {
      console.log('errorResult = ' + err);
      this.errorService.error();
    });
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

    switch (this.currentTab) {
      case 0:
        this.checkStateSource();      
        break;
      case 1:
        this.loadKendoDevExtremeItems();
        break;
    }
  }

  clear() {
    try {
      

      if (this.outSubscribeDevExtremeRowsDocument != undefined)
        this.outSubscribeDevExtremeRowsDocument.unsubscribe();
      if (this.outSubscribeKendoRowsDocument != undefined)
        this.outSubscribeKendoRowsDocument.unsubscribe();
      if (this.outSubscribeKendoDialogRowsDocument != undefined)
        this.outSubscribeKendoDialogRowsDocument.unsubscribe();
      if (this.outSubscribeKendoSavePersist != undefined)
        this.outSubscribeKendoSavePersist.unsubscribe();
      if (this.outSubscribeKendoServerLoadPersist != undefined)
        this.outSubscribeKendoServerLoadPersist.unsubscribe();
      if (this.outSubscribeKendoInitialLoadPersist != undefined)
        this.outSubscribeKendoInitialLoadPersist.unsubscribe();
    }
    catch{
      err => {
        console.log('errorResult = ' + err);
        this.errorService.error();
      };
    }
    //console.clear();
    try {
      if (this.apollo.getClient() != undefined) {
        var client = this.apollo.getClient();
        client.cache.reset();
      }
      if (this.myApollo != undefined)
        this.myApollo.clearCache();
    }
    catch{
      err => {
        console.log('errorResult = ' + err);
        this.errorService.error();
      }
    };
  }

  ngOnDestroy() {
   this.clear();   
  }
}
    //var gridPlanInformationDocumentSettingsFromService: GridSettings = this.persistingService.get('gridPlanInformationDocumentSettings');    

   //if (this.gridLocalSettings != undefined && this.gridLocalSettings != null) {
        //  
        //  if (this.gridLocalSettings != undefined && this.gridServerSettings == undefined) {
        //    this.gridPlanInformationDocumentSettingsInView = this.gridLocalSettings;
        //  }
        //  if (this.gridLocalSettings == undefined && this.gridServerSettings != undefined) {
        //    this.gridPlanInformationDocumentSettingsInView = this.gridServerSettings;
        //  }
        //  if (this.gridLocalSettings != undefined && this.gridServerSettings != undefined) {
        //    this.gridPlanInformationDocumentSettingsInView = this.gridLocalSettings;
        //  }
        //}
        // this.loadKendoDocumentDataItemsAsync(0);      
  //if (this.gridLocalSettings != undefined && this.gridLocalSettings != null) {
    //  console.log("Local - gridPlanInformationDocumentSettings");
    //  if (this.gridLocalSettings != undefined && this.gridServerSettings == undefined) {
    //    this.gridPlanInformationDocumentSettingsInView = this.gridLocalSettings;
    //  }
    //  if (this.gridLocalSettings == undefined && this.gridServerSettings != undefined) {
    //    this.gridPlanInformationDocumentSettingsInView = this.gridServerSettings;
    //  }
    //  if (this.gridLocalSettings != undefined && this.gridServerSettings != undefined) {
    //    this.gridPlanInformationDocumentSettingsInView = this.gridLocalSettings;
    //  }
    //}

    //this.loadKendoDocumentDataItemsAsync(null);


 //if (this.gridServerSettings != undefined || this.gridServerSettings != null) {
        //  console.log("server - gridPlanInformationDocumentSettings");
        //  if (this.gridLocalSettings != undefined && this.gridServerSettings == undefined) {
        //    this.gridPlanInformationDocumentSettingsInView = this.gridLocalSettings;
        //  }
        //  if (this.gridLocalSettings == undefined && this.gridServerSettings != undefined) {
        //    this.gridPlanInformationDocumentSettingsInView = this.gridServerSettings;
        //  }
        //  if (this.gridLocalSettings != undefined && this.gridServerSettings != undefined) {
        //    this.gridPlanInformationDocumentSettingsInView = this.gridServerSettings;
        //  }
          //this.loadKendoDocumentDataItemsAsync(2);
        //}

//if (this.gridLocalSettings != undefined && this.gridLocalSettings != null) {
      //  console.log("Local - gridPlanInformationDocumentSettings");
      //  if (this.gridLocalSettings != undefined && this.gridServerSettings == undefined) {
      //    this.gridPlanInformationDocumentSettingsInView = this.gridLocalSettings;
      //  }
      //  if (this.gridLocalSettings == undefined && this.gridServerSettings != undefined) {
      //    this.gridPlanInformationDocumentSettingsInView = this.gridServerSettings;
      //  }
      //  if (this.gridLocalSettings != undefined && this.gridServerSettings != undefined) { 
      //    this.gridPlanInformationDocumentSettingsInView = this.gridLocalSettings;
      //  }
      //}
    //  else {

    //   console.log("Default - gridPlanInformationDocumentSettings");
    //        //this.gridLocalSettings = {
    //        //  columnsConfig: this.columnsConfig,
    //        //  state: this.state
    //    //};
    //    this.loadGridSettingsFromInitialize();        
    //    this.gridPlanInformationDocumentSettingsInView = this.gridLocalSettings;
    //}

   // this.loadKendoDocumentDataItemsAsync(1);


  //
    //if (this.loadGridSettingsFromServer() || this.loadLastDataReturn == 2)//*\\
    //{
    //  return 2;
    //}
    //
    //if (this.loadGridSettingsFromLocal() || this.loadLastDataReturn ==1)//*\\
    //{
    //  return 1;
    //}
    //
    //if (this.loadGridSettingsFromInitialize() || this.loadLastDataReturn == 0)//*\\
    //{
    //  return 0;
    //}
    //
    //if (this.loadGridSettingsFromDefault() || this.loadLastDataReturn ==null)//*\\
    //{
    //  return null;
    //}


    //if (this.gridServerSettings == undefined || this.gridServerSettings == null)
    //  this.loadGridSettingsFromLocal();//*\\
    //else
    //  this.loadKendoDocumentDataItemsAsync(2);

    //if (this.gridLocalSettings == undefined || this.gridLocalSettings == null)
    //  this.loadGridSettingsFromInitialize();//*\\
    //else      
    //  this.loadKendoDocumentDataItemsAsync(1);

    //if (this.gridInitilizeSettings == undefined || this.gridInitilizeSettings == null)
    //  this.loadGridSettingsFromDefault();//*\\
    //else
    //  this.loadKendoDocumentDataItemsAsync(0);

    //if (this.gridDefaultSettings == undefined || this.gridDefaultSettings == null)
    //  this.loadKendoDocumentDataItemsAsync(null);

    //var ep = Math.round(new Date().getTime() / 1000.0);
    //var myDate = new Date(ep * 1000);
    //var outDateTime = myDate.toLocaleString().trim().replace(',', ' ').substring(0,18);

    //const columns = grid.columns;
    //const gridConfig = {
    //  state: this.gridPlanInformationDocumentSettingsInView.state,
    //  columnsConfig: 
    //    columns.toArray().map(item => {        
    //    return Object.keys(item)
    //      .filter(propName => !propName.toLowerCase())
    //        .reduce((acc, curr) => ({ ...acc, ...{ [curr]: item[curr] } }), <ColumnSettings>{});
    //  })
    //};
    //this.gridPlanInformationDocumentSettingsInView.columnsConfig = gridConfig.columnsConfig;
    ////this.gridPlanInformationDocumentSettingsInView.state = gridConfig.state;    
    //this.persistingService.set('gridPlanInformationDocumentSettings', gridConfig);




 //pageKednoDocumentChange(event: PageChangeEvent): void {
  //  this.gridPlanInformationDocumentSettings.state.skip = event.skip;
  //  this.gridPlanInformationDocumentSettings.state.take = event.take;

  //  this.loadKendoDocumentDataItemsAsync();
  //  // Optionally, clear the selection when paging
  //  // this.mySelection = [];
  //}

  //dataKendoStateChange(state: DataStateChangeEvent): void {
  //  // Save the current state of the Grid component
  //  //this.skip = state.skip;
  //  //this.skip = state.skip;
  //  //this.take = state.take;
  //  //this.sort = state.sort;
  //  this.gridPlanInformationDocumentSettings.state = state;
  //  console.log(this.gridPlanInformationDocumentSettings.state);
  //  //this.gridData = process(sampleProducts, this.gridPlanInformationDocumentSettings.state);

  //  var commentsQuery: QueryRef<any>;
  //  var rs = null;
  //  commentsQuery = this.apollo.watchQuery({
  //    query: this.planDocumentsByBudgetProjectId,
  //    variables: {
  //      budgetProjectId: this.id,
  //    }
  //  });
  //  rs = commentsQuery.valueChanges;

  //  this.outSubscribeKendoRowsDocument = rs.subscribe(st => {

  //    if (st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"].length >= 1) {
  //      this.kendoLoading = false;
  //      this.gridKendoResultView = process(st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"], state);
  //      this.myDocumentKendoRowData = this.gridKendoResultView;        
  //      //console.log(this.gridKendoResultView);
  //      //console.log(this.myDocumentKendoRowData);
  //    }
  //    else
  //      this.myDocumentKendoRowData = null;
  //  }, err => {
  //    console.log('errorResult = ' + err);
  //    this.errorService.error();
  //  });
  //  //this.myDocumentKendoRowData.subscribe(x => {
  //  //  console.log(x);
  //  //  this.gridKendoResultView = process(x, state);
  //  //  console.log("skip:" + this.gridPlanInformationDocumentSettings.state.skip + " pageSize:" + this.pageSize + " take:" + this.gridPlanInformationDocumentSettings.state.take);
  //  //});        
  //}

  
  //   this.myDocumentKendoRowData = new Observable<any>((observer: Observer<any>) => {
  //  setInterval(() => observer.next(
  //    this.gridKendoResultView = {
  //      data: st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"].slice(this.gridPlanInformationDocumentSettings.state.skip, this.gridPlanInformationDocumentSettings.state.skip + this.pageSize),
  //      total: st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"].length,
  //    }
  //  ), 1000);
  //});



  //    this.myDocumentKendoRowData = new Observable<any>((observer: Observer<any>) => {
  //  var subject = new AsyncSubject<any>();
  //  var i = 0;
  //  var handle = setInterval(
  //    function () {
  //      observer.next(this.gridKendoResultView = {
  //        data: st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"].slice(this.gridPlanInformationDocumentSettings.state.skip, this.gridPlanInformationDocumentSettings.state.skip + this.pageSize),
  //        total: st.data["projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId"].length,
  //      }
  //      )
  //      subject.next(i);
  //      if (++i > 3) {
  //        subject.complete();
  //        observer.complete();
  //        clearInterval(handle);
  //      }
  //    }, 1000);
  //});

