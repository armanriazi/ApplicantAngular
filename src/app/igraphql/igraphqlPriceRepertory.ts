import gql from 'graphql-tag';

export class IgraphPriceRepertoryQueries {

  constructor() { }

  static financialYearsSelectListActionByAccFinancialYearId: any = gql`       
query priceRepertoryFinancialYearsSelectListActionByAccFinancialYearId($qparam:String!){
  priceRepertoryFinancialYearsSelectListActionByAccFinancialYearId(qparam:$qparam)
  {
    aCC_FinancialYearID
    aCC_FinancialYearIsDefault
    aCC_FinancialYearName
  }
}

`

  static basePriceRepertorySelectListActionByQuery: any = gql`
query baseSelectListActionByQuery($qparam: String!) {
  basePriceRepertorySelectListActionByQuery(qparam: $qparam) {
    aCC_FinancialYearID
    tBL_PrcID
    tBL_PrcName
    tBL_PrcParentID_fk
  }
}

`
  //text
  //tBL_BprHasChildren
  //value
  //tBL_BprParentID_fk
  //icon
  //checked
  //leaf
  //children
  //collapsed

  static treeGridActionByParams: any = gql`
query priceRepertoryGridActionByParams($accFinancialYearID:String!,$tblPrcID:String!,$tblPrcIDParent:String!,$tblBprParentId:String!,$sortExpression:String!){
  priceRepertoryGridActionByParams(accFinancialYearID:$accFinancialYearID,tblPrcID:$tblPrcID,tblPrcIDParent:$tblPrcIDParent,tblBprParentId:$tblBprParentId,sortExpression:$sortExpression)
  {
    id    
    name    
    hasChildren  
  }
}

`


  static textActionByParams: any = gql`
 query basePriceRepertoryPriceTextFieldActionByQuery($tblBprId: String!) {
   basePriceRepertoryPriceTextFieldActionByQuery(tblBprId: $tblBprId) {
   tBL_BprID
   tBL_BprParentID_fk     
   tBL_PrcID_fk              
   cNT_CbID_fk        
   tBL_BprCode               
   tBL_BprOldCode            
   tBL_BprDescription        
   tBL_BprWarehouseCoding    
   tBL_BprTransportCoefficient
   tBL_BprMaterialPrice      
   tBL_BprPayPrice           
   tBL_BprMachineryPrice     
   tBL_BprDeparePrice1       
   tBL_BprDeparePrice2       
   tBL_BprDeparePrice3        
   tBL_BprMachineryDeparePrice
   tBL_BprPayDeparePrice      
   tBL_BprDisposePrice        
   tBL_BprMachineryMovePrice  
   tBL_BprPayMovePrice                  
   tBL_BprQuantity            
   tBL_BprNote                
   tBL_BprType                
   tBL_BprActive              
   tBL_BprStatus            
   tBL_BprPrice
   tBL_BprRegisterDate      
   tBL_BprDeleteDate        
   aCC_FinancialYearID      
   tBL_UserID                 
  }
}

`

  static gridActionByParams: any = gql`
query projectManagementSystemProjectReportGridActionByParams($accFinancialYearID: String!, $tblBprID: String!, $sortExpression: String!, $orderBy: String!) {
  projectManagementSystemProjectReportGridActionByParams(accFinancialYearID: $accFinancialYearID, tblBprID: $tblBprID, sortExpression: $sortExpression, orderBy: $orderBy) {
    tBL_BprhID
    tBL_BprID_fk
    tBL_BprhExecuteDate
    tBL_BprhExpireDate
    tBL_BprhMaterialPrice
    tBL_BprhPayPrice
    tBL_BprhMachineryPrice
    tBL_BprhDeparePrice1
    tBL_BprhDeparePrice2
    tBL_BprhDeparePrice3
    tBL_BprhMachineryDeparePrice
    tBL_BprhPayDeparePrice
    tBL_BprhDisposePrice
    tBL_BprhMachineyMovePrice
    tBL_BprhPayMovePrice
    tBL_BprhNote
    tBL_BprhType
    tBL_BprhActive
    tBL_BprhStatus
    tBL_BprhRegisterDate
    tBL_BprhDeleteDate
  }
}

`


}

