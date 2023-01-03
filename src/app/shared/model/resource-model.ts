import { State, DataResult } from "@progress/kendo-data-query";
import { ColumnSettings } from "../interface/settings.interface";

export class ResourceModel {
  key: string;
  value: string;
}
export interface GridSettings {
  columnsConfig?: ColumnSettings[];
  state?: State;
  gridData?: DataResult;
}


//export class BasePriceRepertoryPriceTextFieldActionModel {
//  tBL_BprID: string;
//  tBL_BprParentID_fk: string;
//  tBL_PrcID_fk: string;
//  cNT_CbID_fk: string;
//  tBL_BprCode: string;
//  tBL_BprOldCode: string;
//  tBL_BprDescription: string;
//  tBL_BprWarehouseCoding: string;
//  tBL_BprTransportCoefficient: string;
//  tBL_BprMaterialPrice: string;
//  tBL_BprPayPrice: string;
//  tBL_BprMachineryPrice: string;
//  tBL_BprDeparePrice1: string;
//  tBL_BprDeparePrice2: string;
//  tBL_BprDeparePrice3: string;
//  tBL_BprMachineryDeparePrice: string;
//  tBL_BprPayDeparePrice: string;
//  tBL_BprDisposePrice: string;
//  tBL_BprMachineryMovePrice: string;
//  tBL_BprPayMovePrice: string;
//  tBL_BprPrice: string;
//  tBL_BprQuantity: string;
//  tBL_BprNote: string;
//  tBL_BprType: string;
//  tBL_BprActive: string;
//  tBL_BprStatus: string;  
//  tBL_BprRegisterDate: string;
//  tBL_BprDeleteDate: string;
//  aCC_FinancialYearID: string;
//  tBL_UserID: string;
//}
