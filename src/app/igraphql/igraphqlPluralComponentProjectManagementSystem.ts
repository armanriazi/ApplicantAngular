import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';



export class MyGraphQlResult {
  constructor() { }
  query: any;
  parameters: any;
  arguments: any;
  select = new Array();
}

export class IgraphPluralComponentProjectManagementSystemQueries {

  constructor() { }

  static get(query: string) {
    var _query: DocumentNode;
    var result = new MyGraphQlResult();
    var _parameters;
    var _arguments;

    _parameters = '$sfodFieldName: String! , $sfoName: String!';
    _arguments = "sfodFieldName:$sfodFieldName,sfoName:$sfoName";

    switch (query) {
      case "gridInitializeProjectManagementSystemProjectReport":       
        _query = this.gridInitializeProjectManagementSystemProjectReport({ parameters: _parameters, arguments: _arguments });
        break;
      case "projectManagementSystemProjectReportPlanItemsByProjectId":        
        _query = this.projectManagementSystemProjectReportPlanItemsByProjectId({ parameters: _parameters, arguments: _arguments });
        break;
      case "projectManagementSystemProjectReportTechnicalPropertyItemsByParams":
        _query = this.projectManagementSystemProjectReportTechnicalPropertyItemsByParams({ parameters: _parameters, arguments: _arguments });
        break;
      case "projectManagementSystemProjectReportOptionsItemsByParams":
        _query = this.projectManagementSystemProjectReportOptionsItemsByParams({ parameters: _parameters, arguments: _arguments });
        break;
      case "gridGetStateUserProfileHistory":
        _parameters = '$subSystemId:String!,$uphGridName:String!,$uphDeleteDate:String!,$userId:String!';
        _arguments = "subSystemId:$subSystemId,uphGridName:$uphGridName,uphDeleteDate:$uphDeleteDate,userId:$userId";
        _query = this.gridGetStateUserProfileHistory({ parameters: _parameters, arguments: _arguments });
        break;
      case "gridAffectStateUserProfileHistory":
        _parameters = '$ssID_fk:String!,$sfoID_fk:String!,$uphGridName:String!,$uphBody:String!,$uphNote:String!,$uphRegisterDate:String!,$uphType:String!,$uphActive:String!,$uphStatus:String!,$uphDeleteDate:String!,$financialYearID:String!,$userID:String!,$uphID:String!';
        _arguments = "ssID_fk:$ssID_fk,sfoID_fk:$sfoID_fk,uphGridName:$uphGridName,uphBody:$uphBody,uphNote:$uphNote,uphRegisterDate:$uphRegisterDate,uphType:$uphType,uphActive:$uphActive,uphStatus:$uphStatus,uphDeleteDate:$uphDeleteDate,financialYearID:$financialYearID,userID:$userID,uphID:$uphID";
        _query = this.gridAffectStateUserProfileHistory({ parameters: _parameters, arguments: _arguments });
        break;     
    }

    result.query = _query;
    result.arguments = _arguments;
    result.parameters = _parameters;
    for (let i of _query.definitions["0"].selectionSet.selections["0"].selectionSet.selections)
      result.select.push(i.name.value as object);
    return result;
  }

  private static gridInitializeProjectManagementSystemProjectReport(param) {
    return gql`
     query gridInitializeProjectManagementSystemProjectReportDocument(${param.parameters}) {
     gridInitializeProjectManagementSystemProjectReport(${param.arguments}) {
      nIK_SdtID_fk     
      nIK_SfodCustomStyle
      nIK_SfodFarsiName
      nIK_SfodFieldName
      nIk_SfodFilterState     
      nIk_SfodGroupState     
      nIK_SfodID     
      nIk_SfodIsHide
      nIK_SfodNote
      nIK_SfodRegisterDate
      nIk_SfodSortState
      nIK_SfodType      
      nIk_SfodWidth
      nIK_SfoID_fk
      tBL_UserID
      nIK_SfoCustomStyle
  }
}
`


  }

  private static projectManagementSystemProjectReportPlanItemsByProjectId(param) {
    return gql`
     query projectManagementSystemProjectReportPlanItemsByProjectId(${param.parameters}) {
     gridInitializeProjectManagementSystemProjectReport(${param.arguments}) {
      nIK_SdtID_fk     
      nIK_SfodCustomStyle
      nIK_SfodFarsiName
      nIK_SfodFieldName
      nIk_SfodFilterState     
      nIk_SfodGroupState     
      nIK_SfodID     
      nIk_SfodIsHide
      nIK_SfodNote
      nIK_SfodRegisterDate
      nIk_SfodSortState
      nIK_SfodType      
      nIk_SfodWidth
      nIK_SfoID_fk
      tBL_UserID
      nIK_SfoCustomStyle
  }
}
`


  }

  private static projectManagementSystemProjectReportTechnicalPropertyItemsByParams(param) {
    return gql`
     query projectManagementSystemProjectReportTechnicalPropertyItemsByParams(${param.parameters}) {
     gridColumnProjectManagementSystemProjectReport(${param.arguments}) {   
      nIK_SdtID_fk     
      nIK_SfodCustomStyle
      nIK_SfodFarsiName
      nIK_SfodFieldName
      nIk_SfodFilterState     
      nIk_SfodGroupState     
      nIK_SfodID     
      nIk_SfodIsHide
      nIK_SfodNote
      nIK_SfodRegisterDate
      nIk_SfodSortState
      nIK_SfodType      
      nIk_SfodWidth
      nIK_SfoID_fk
      tBL_UserID
      nIK_SfoCustomStyle
  }
}
`
  }

  /*
      aCC_FinancialYearID
      nIk_SfodHorizontalMerge
      nIk_SfodHorizontalMergeCondition
      nIK_SfodActive
      nIk_SfodAggrigateState
		  nIk_SfodBackColor
      nIK_SfodCheckValidity
      nIk_SfodForeColor
      nIk_SfodIsEditable
      nIk_SfodVerticalMerge
      nIk_SfodVerticalMerge
      nIk_SfodVerticalMergeCondition
   */

  private static projectManagementSystemProjectReportOptionsItemsByParams(param) {
    return gql`
     query projectManagementSystemProjectReportOptionsItemsByParams(${param.parameters}) {
     gridColumnProjectManagementSystemProjectReport(${param.arguments}) {
      nIK_SdtID_fk     
      nIK_SfodCustomStyle
      nIK_SfodFarsiName
      nIK_SfodFieldName
      nIk_SfodFilterState     
      nIk_SfodGroupState     
      nIK_SfodID     
      nIk_SfodIsHide
      nIK_SfodNote
      nIK_SfodRegisterDate
      nIk_SfodSortState
      nIK_SfodType      
      nIk_SfodWidth
      nIK_SfoID_fk
      tBL_UserID
      nIK_SfoCustomStyle
  }
}
`
  }

     private static gridGetStateUserProfileHistory(param) {
      return gql`     
        query gridGetStateUserProfileHistory(${param.parameters}){
          gridGetStateUserProfileHistory(${param.arguments})
          {
            aCC_FinancialYearID
            tBL_SsID_fk
            nIK_SfoID_fk
            tBL_UphActive
            tBL_UphBody
            tBL_UphDeleteDate
            tBL_UphGridName
            tBL_UphID
            tBL_UphNote
            tBL_UphRegisterDate
            tBL_UphStatus
            tBL_UphType
            tBL_UserID
          }
        }
        `
  }
  private static gridAffectStateUserProfileHistory(param) {
    return gql`     
   query gridAffectStateUserProfileHistory(${param.parameters}) {
    gridAffectStateUserProfileHistory(${param.arguments})
    {
      affectedRowCount
    }
  }
  `
}
}
