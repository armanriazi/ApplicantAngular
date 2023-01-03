import { Component, OnInit, ViewChild, ViewContainerRef, Inject } from '@angular/core';
import { StorageService, MyApolloService } from "../../shared";
import { MatFormField, MatSelect, MatOption, MatTableDataSource, MatPaginator, MatSort, MatColumnDef, MatRowDef } from '@angular/material';
import { Observable, BehaviorSubject, Observer } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { IgraphProjectManagementSystemQueries } from '../../igraphql/igraphqlProjectManagementSystem';
import { IgraphBudgetQueries } from '../../igraphql/igraphqlBudget';
import { DynamicComponentLoaderModule, DynamicComponentManifest } from '../../dynamic-component-loader/dynamic-component-loader.module';
import {  DynamicComponentLoader } from '../../dynamic-component-loader/dynamic-component-loader.service';
import { GridDynamicComponent } from '../../dynamic-modules/grid-dynamic';



@Component({
  selector: 'app-plansupervisionhistory',
  templateUrl: './plansupervisionhistory.component.html',
  styleUrls: ['./plansupervisionhistory.component.scss']  
})
export class PlanSupervisionHistoryComponent implements OnInit {
  captionRouter;

  variablesDynamicTechnicalProperty: Observable<object> = new Observable<object>((observer) => {
    setInterval(() => {      
      observer.next((this.variablesTechnicalProperty));    
    }, 1500);
  });

  variablesDynamicOptions: Observable<object> = new Observable<object>((observer) => {
    setInterval(() => {      
      observer.next((this.variablesOptions));      
    }, 1500);
  });

  variablesDynamicApprovedBudget: Observable<object> = new Observable<object>((observer) => {
    setInterval(() => {      
      observer.next((this.variablesApprovedBudget));      
    }, 1500);
  });

  variablesDynamicContract: Observable<object> = new Observable<object>((observer) => {
    setInterval(() => {
      observer.next((this.variablesContract));      
    }, 1500);
  });

  variablesDynamicAgenda: Observable<object> = new Observable<object>((observer) => {
    setInterval(() => {      
      observer.next((this.variablesAgenda));      
    }, 1500);
  });

  variablesDynamicExecutionAgents: Observable<object> = new Observable<object>((observer) => {
    setInterval(() => {      
      observer.next((this.variablesExecutionAgents));      
    }, 1500);
  });

  variablesDynamicSupervistoryHistory: Observable<object> = new Observable<object>((observer) => {
    setInterval(() => {      
      observer.next((this.variablesSupervistoryHistory));      
    }, 1500);
  });

  variablesDynamicPhysicalExtend: Observable<object> = new Observable<object>((observer) => {
    setInterval(() => {    
      observer.next((this.variablesPhysicalExtend));
    }, 1500);
  });


  myProjectPlanTextFieldsData: any;

  budgetByCodeMeli;

  variablesBudgetProject;
  selectedIndexTab;
  selectedOfList=0;

  variablesTechnicalProperty;
  queryTechnicalProperty;

  variablesOptions;
  queryOptions;

  variablesApprovedBudget;
  queryApprovedBudget;

  variablesContract;
  queryContract;

  variablesAgenda;
  queryAgenda;

  variablesExecutionAgents;
  queryExecutionAgents;

  variablesSupervistoryHistory;
  querySupervistoryHistory;

  variablesPhysicalExtend;
  queryPhysicalExtend;

  colIndexId;
  currentTab;
  selectedDefault;

  expresions;
  inputBUD_ProjectCode;
  inputBUD_ProjectApproveDate;
  inputBUD_ProjectName;
  inputBUD_ProjectAddress;



  constructor(
    private serviceStorage: StorageService,
    private translate: TranslateService,
    private myApollo: MyApolloService) {

    translate.get('SupervisoryHistory').subscribe(s => this.captionRouter = s);
  }

  ngOnInit() {
    this.budgetByCodeMeli = this.serviceStorage.get("Current:BudgetByCodeMeli", { session: false });
    var e = { value: this.budgetByCodeMeli[0].bUD_ProjectID };
    this.selectedDefault = e.value;
    this.onSelectionChange(e);
  }


  onSelectionChange(e) {
    
    this.variablesBudgetProject = { qparam: e.value};
    var budgetProjectPlan='budgetProjectPlanTextFieldsActionBybudgetProjectId';
    //console.log(this.variablesBudgetProject["qparam"]);

    this.myApollo.callWithoutSubscribeQurey(this.variablesBudgetProject, IgraphBudgetQueries.get(budgetProjectPlan)).subscribe(
      st => {
        if (st.data[budgetProjectPlan].length >= 1) {
          var ary = st.data[budgetProjectPlan];
          this.myProjectPlanTextFieldsData = ary[0];
          this.expresions = this.myProjectPlanTextFieldsData;
          this.inputBUD_ProjectCode = this.expresions["bUD_ProjectCode"];
          this.inputBUD_ProjectApproveDate = this.expresions["bUD_ProjectApproveDate"];
          this.inputBUD_ProjectName = this.expresions["bUD_ProjectName"];
          this.inputBUD_ProjectAddress = this.expresions["bUD_ProjectAddress"];
        }
        }, err => console.log(err));

    if (this.variablesTechnicalProperty == undefined || this.variablesTechnicalProperty == null)
      this.onSelectedTab(0);
    else
      this.onSelectedTab(this.currentTab);
  }

  onSelectedTab(e) {
    this.currentTab = e;
    var variables = { budgetProjectId: this.variablesBudgetProject["qparam"], orderBy: '', userId: '', accFinancialYearId: '', desc: '' };
    this.colIndexId = "budgetProjectId";

    switch (this.currentTab) {
      case 0:        
        this.variablesTechnicalProperty = variables;
        this.queryTechnicalProperty = "projectManagementSystemProjectReportTechnicalPropertyItemsByParams";
        break;
      case 1:
        this.variablesOptions = variables;
        this.queryOptions = "projectManagementSystemProjectReportOptionsItemsByParams";
        break;
      //case 2:
      //  this.variablesApprovedBudget = { budgetProjectId: '', orderBy: '', userId: '1660', accFinancialYearId: '', desc: '' };
      //  this.queryApprovedBudget = "projectManagementSystemProjectReportApprovedBudgetItemsByParams";
      //  break;
      //case 3:
      //  this.variablesContract = variables;
      //  this.queryContract = "projectManagementSystemProjectReportContractItemsByParams";
      //  break;
      //case 4:
      //  this.variablesAgenda = variables;
      //  this.queryAgenda = "projectManagementSystemProjectReportAgendaByParams";
      //  break;
      //case 5:
      //  this.variablesExecutionAgents = variables;
      //  this.queryExecutionAgents = "projectManagementSystemProjectExecutionAgentsByParams";
      //  break;
      //case 6:
      //  this.variablesSupervistoryHistory = variables;
      //  this.querySupervistoryHistory = "projectManagementSystemProjectSupervistoryHistoryByParams";
      //  break;
      //case 7:
      //  this.variablesPhysicalExtend = variables;
      //  this.queryPhysicalExtend = "projectManagementSystemProjectPhysicalExtendByParams";
      //  break;
    }
  }
}

