import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';



export class MyGraphQlResult {
  constructor() { }
  query: any;
  parameters: any;
  arguments: any;
  select = new Array();
  selectConsequence: string;

}

export class IgraphProjectManagementSystemQueries {

  constructor() { }

  static get(query: string) {
    var _query: DocumentNode;
    var result = new MyGraphQlResult();
    var _parameters;
    var _arguments;

    _parameters = '$budgetProjectId: String! , $orderBy: String! , $userId: String! , $accFinancialYearId: String! , $desc: String!';
    _arguments = 'budgetProjectId: $budgetProjectId, orderBy: $orderBy, userId: $userId, accFinancialYearId: $accFinancialYearId, desc: $desc';

    switch (query) {
      case "projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId":
        _query = this.projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId;
        break;
      case "projectManagementSystemProjectReportPlanItemsByProjectId":
        _query = this.projectManagementSystemProjectReportPlanItemsByProjectId;
        break;
      case "projectManagementSystemProjectReportPlanContractorsPriceByBudgetProjectId":
        _query = this.projectManagementSystemProjectReportPlanContractorsPriceByBudgetProjectId;
        break;
      case "projectManagementSystemProjectReportAttachmentsDialogByDocumentCode":
        _query = this.projectManagementSystemProjectReportAttachmentsDialogByDocumentCode;
        break;
      case "projectManagementSystemProjectReportFileDownload":
        _parameters = '$fileTypeId: String!, $tblIdID: String!';
        _arguments = 'fileTypeId: $fileTypeId, tblIdID: $tblIdID';
        _query = this.projectManagementSystemProjectReportFileDownload({ parameters: _parameters, arguments: _arguments });
        break;
      case "projectManagementSystemProjectReportSendToCartableByParams":
        _query = this.projectManagementSystemProjectReportSendToCartableByParams;
        break;        
      case "projectManagementSystemProjectReportSetWinnerByParams":
        _query = this.projectManagementSystemProjectReportSetWinnerByParams;
        break;
      case "projectManagementSystemProjectReportTechnicalPropertyItemsByParams":
        _query = this.projectManagementSystemProjectReportTechnicalPropertyItemsByParams({ parameters: _parameters, arguments: _arguments });
        break;
      case "projectManagementSystemProjectReportOptionsItemsByParams":
        _query = this.projectManagementSystemProjectReportOptionsItemsByParams({ parameters: _parameters, arguments: _arguments });
        break;
      case "projectManagementSystemProjectReportApprovedBudgetItemsByParams":        
        _query = this.projectManagementSystemProjectReportApprovedBudgetItemsByParams({ parameters: _parameters, arguments: _arguments });
        break;
      case "projectManagementSystemProjectReportContractItemsByParams":
        _query = this.projectManagementSystemProjectReportContractItemsByParams({ parameters: _parameters, arguments: _arguments });
        break;
      case "projectManagementSystemProjectReportAgendaByParams":
        _query = this.projectManagementSystemProjectReportAgendaByParams({ parameters: _parameters, arguments: _arguments });
        break;
      case "projectManagementSystemProjectExecutionAgentsByParams":
        _query = this.projectManagementSystemProjectExecutionAgentsByParams({ parameters: _parameters, arguments: _arguments });
        break;
      case "projectManagementSystemProjectSupervistoryHistoryByParams":
        _query = this.projectManagementSystemProjectSupervistoryHistoryByParams({ parameters: _parameters, arguments: _arguments });
        break;
      case "projectManagementSystemProjectPhysicalExtendByParams":
        _query = this.projectManagementSystemProjectPhysicalExtendByParams({ parameters: _parameters, arguments: _arguments });
        break;
      case "projectManagementSystemReportPriceContextTableViewByParams":
        _parameters = '$tblPrcId: String! , $orderBy: String! , $userId: String! , $accFinancialYearId: String! , $desc: String!';
        _arguments = 'tblPrcId: $tblPrcId, orderBy: $orderBy, userId: $userId, accFinancialYearId: $accFinancialYearId, desc: $desc';
        _query = this.projectManagementSystemReportPriceContextTableViewByParams({ parameters: _parameters, arguments: _arguments });
        break;
    }

    result.query = _query;
    result.arguments = _arguments;
    result.parameters = _parameters;
    result.selectConsequence = "";
    for (let i of _query.definitions["0"].selectionSet.selections["0"].selectionSet.selections) {
      result.select.push(i.name.value as object);
      result.selectConsequence = result.selectConsequence + (i.name.value as string) + ',';
    }
    result.selectConsequence=result.selectConsequence.substring(0, result.selectConsequence.length - 1);
    return result;
  }

  private static projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId: any = gql`       
    query projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId($budgetProjectId: String!) {
    projectManagementSystemProjectReportPlanDocumentsByBudgetProjectId(budgetProjectId: $budgetProjectId) {
      pMS_PaID
      pMS_PdtID_fk
      pMS_PdtName
      pMS_PaDescription
      pMS_PaDate
    }
  }

    `


  //bUD_ProjectID_fk
  //pMS_PdID
  //tBL_BprID_fk
  private static projectManagementSystemProjectReportPlanItemsByProjectId: any = gql`       
       query projectManagementSystemProjectReportPlanItemsByProjectId($budgetProjectId: String!, $orderBy: String!, $userId: String!, $accFinancialYearId: String!, $desc: String!) {
        projectManagementSystemProjectReportPlanItemsByProjectId(budgetProjectId: $budgetProjectId, orderBy: $orderBy, userId: $userId, accFinancialYearId: $accFinancialYearId, desc: $desc) {
          pMS_PdMachineryPrice
          pMS_PdPayPrice
          pMS_PdProvideWayId_fk
          pMS_PdFirstQuantity
          pMS_PdMaterialPrice
          tBL_BprCode
          tBL_BprDescription          
          wOS_WonName
          wOS_WotNote
          status
        }
      }
    `

  private static projectManagementSystemProjectReportPlanContractorsPriceByBudgetProjectId: any = gql` 
 query projectManagementSystemProjectReportPlanContractorsPriceByBudgetProjectId($budgetProjectId: String!, $orderBy: String!, $userId: String!, $accFinancialYearId: String!, $desc: String!) {
      projectManagementSystemProjectReportPlanContractorsPriceByBudgetProjectId(budgetProjectId: $budgetProjectId, orderBy: $orderBy, userId: $userId, accFinancialYearId: $accFinancialYearId, desc: $desc) {
        pMS_PppID
        pMS_PppOtherCondition
        pMS_PppPayCondition
        pMS_PppPrice
        tBL_CustomerCapacity
        tBL_CustomerCredit
        tBL_CustomerID_fk
        tBL_CustomerMobile
        tBL_CustomerTitle
      }
    }

   `

  private static projectManagementSystemProjectReportAttachmentsDialogByDocumentCode: any = gql` 
        query projectManagementSystemProjectReportAttachmentsDialogByDocumentCode($documentCode: String!) {
        projectManagementSystemProjectReportAttachmentsDialogByDocumentCode(documentCode: $documentCode) {
        documentID
        documentCode
        documentFileType
        documentName
        documentNote
        fileTypeId
    }
  }

   `


  private static projectManagementSystemProjectReportSendToCartableByParams: any = gql`
        query projectManagementSystemProjectReportSendToCartableByParams($budProjectId: String!, $nationalCode: String!, $trackingCode: String!, $accFinancialYearID: String!) {
        projectManagementSystemProjectReportSendToCartableByParams(budProjectId: $budProjectId, nationalCode: $nationalCode, trackingCode: $trackingCode, accFinancialYearID: $accFinancialYearID)
        {
        outputMessage
      }
    }

    `

  private static projectManagementSystemProjectReportSetWinnerByParams: any = gql`
  query projectManagementSystemProjectReportSetWinnerByParams($pmsPppId: String!, $budProjectId: String!, $nationoanlCode: String!, $trackingCode: String!, $budPepRegisterDate: String!, $aCCFinancialYearId: String!, $tblUserId: String!) {
  projectManagementSystemProjectReportSetWinnerByParams(pmsPppId: $pmsPppId, budProjectId: $budProjectId, nationoanlCode: $nationoanlCode, trackingCode: $trackingCode, budPepRegisterDate: $budPepRegisterDate, aCCFinancialYearId: $aCCFinancialYearId, tblUserId: $tblUserId) {
    outputMessage
  }
 }
`


  private static projectManagementSystemProjectReportTechnicalPropertyItemsByParams(param) {

    return gql`
            query projectManagementSystemProjectReportTechnicalPropertyItemsByParams(${ param.parameters}) {
            projectManagementSystemProjectReportTechnicalPropertyItemsByParams(${param.arguments}) {        
            pMS_PtValue
            pMS_PtpNote
              }
            }
            `
  }
  //bUD_BaID
  private static projectManagementSystemProjectReportApprovedBudgetItemsByParams(param) {
    return gql`
          query projectManagementSystemProjectReportApprovedBudgetItemsByParams(${ param.parameters}) {
          projectManagementSystemProjectReportApprovedBudgetItemsByParams(${ param.arguments}) {
            tBL_ResourceID
            tBL_ResourceName
            tBL_PlaceName
            bUD_RcID
            bUD_RcName            
            bUD_BaDebit
            bUD_BaCredit
            bUD_BaOfferPrice
          }
        }
      `
  }
  private static projectManagementSystemProjectReportOptionsItemsByParams(param) {
    return gql`
        query projectManagementSystemProjectReportOptionsItemsByParams(${ param.parameters}) {
        projectManagementSystemProjectReportOptionsItemsByParams(${ param.arguments}) {
          wOS_WonName
          wOS_WotNote
          tBL_BprCode
          tBL_BprDescription
          pMS_PdProvideWayId_fk
          pMS_PdFirstQuantity
        }
     }
   `
  }
  private static projectManagementSystemProjectReportContractItemsByParams(param) {
    return gql`
      query projectManagementSystemProjectReportContractItemsByParams(${ param.parameters}) {
      projectManagementSystemProjectReportContractItemsByParams(${ param.arguments}) {
        cNT_ContractCode
        cNT_ContractTitle
        cNT_ContractPrice
        customerTitle
        crtName
      }
    }
    `
  }
  private static projectManagementSystemProjectReportAgendaByParams(param) {
    return gql`
      query projectManagementSystemProjectReportAgendaByParams(${ param.parameters}) {
      projectManagementSystemProjectReportAgendaByParams(${ param.arguments}) {
        wOS_WosName
        pMS_PcName
        wOS_WoEstimatedPrice
        financialYearWos
        wOS_AtName
        pcName
        wOS_WoID
      }
    }
    `
  }
  private static projectManagementSystemProjectExecutionAgentsByParams(param) {
    return gql`
      query projectManagementSystemProjectExecutionAgentsByParams(${ param.parameters}) {
      projectManagementSystemProjectExecutionAgentsByParams(${ param.arguments}) {
        bUD_PepDescription
        cNT_CetNote
        tBL_CustomerID_fk
        bUD_PepJob
        bUD_PepMobail
        bUD_PepStartDate
        bUD_PepEndDate
      }
    }
    `
  }
  private static projectManagementSystemProjectSupervistoryHistoryByParams(param) {
    return gql`
      query projectManagementSystemProjectSupervistoryHistoryByParams(${ param.parameters}) {
      projectManagementSystemProjectSupervistoryHistoryByParams(${ param.arguments}) {
        pMS_PshDate
        pMS_PshDescription
        tBL_FormFarsiName
      }
    }
    `
  }

  private static projectManagementSystemProjectPhysicalExtendByParams(param) {
    return gql`
      query projectManagementSystemProjectPhysicalExtendByParams(${ param.parameters}) {
      projectManagementSystemProjectPhysicalExtendByParams(${ param.arguments}) {
        wOS_WoID_fk
        wOS_WotName
        pMS_WbsprDate
        pMS_WbsprTitle
        physicalExtend_Name
        pMS_WbsprPhysicalAdvancementPercent
        pMS_WbsprLetterNo
        pMS_WbsprLetterDate
        pMS_WbsprNote
      }
    }
`
  }


  //tBL_PrcID_fk,tBL_PrcType,tBL_PrcNote,tBL_BprType,tBL_BprStatus,tBL_BprOldCode,aCC_FinancialYearID,cNT_CbID_fk,wHS_GuID_fk,wHS_GuNote
  private static projectManagementSystemReportPriceContextTableViewByParams(param) {
    return gql`
    query projectManagementSystemReportPriceContextTableViewByParams(${ param.parameters}) {
    projectManagementSystemReportPriceContextTableViewByParams(${param.arguments}) {
      tBL_PrcName
      tBL_BprParentID_fk
      tBL_BprID
      tBL_BprNote
      tBL_BprCode
      tBL_BprMachineryPrice
      tBL_BprMaterialPrice
      tBL_BprDeparePrice1
      tBL_BprDeparePrice2
      tBL_BprDeparePrice3
      tBL_BprDisposePrice
      tBL_BprPayPrice
      tBL_BprWarehouseCoding    
      wHS_GuName     
      tBL_BprMachineryDeparePrice
      tBL_BprPayDeparePrice
      tBL_BprTransportCoefficient    
      tBL_BprMachineryMovePrice
      tBL_BprPayMovePrice
      tBL_BprPrice
      tBL_BprQuantity
      tBL_BprActive
    }
  }
`
  }

  private static projectManagementSystemProjectReportFileDownload(param) {
    return gql`
    query projectManagementSystemProjectReportFileDownload(${ param.parameters}) {
      projectManagementSystemProjectReportFileDownload(${param.arguments}) {
        tBL_IdBody
        tBL_OdBody
        tBL_ApdBody
      }
    }
`

  }

}

