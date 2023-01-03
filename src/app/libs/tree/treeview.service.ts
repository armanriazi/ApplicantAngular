import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { QueryRef } from 'apollo-angular';
import { Apollo } from 'apollo-angular/Apollo';
import { IgraphPriceRepertoryQueries } from '../../igraphql/igraphqlPriceRepertory';


@Injectable()
export class TreeViewService {
    parentRef: any;
    responseData: any;

  constructor(private _http: Http, private apollo: Apollo) {}

  //fetchData(parentRef: any, serviceUrl: string, methodType: string) {
  //  debugger;
  //      this.parentRef = parentRef;
  //      let requestJson = {};
  //      let headers = new Headers({
  //          'Content-Type': 'application/json;charset=UTF-8',
  //      });
  //      let options = new RequestOptions({
  //          headers: headers,
  //          method: methodType,
  //      });
  //      if (methodType == 'post') {
  //          this._http.post(serviceUrl, requestJson, options).subscribe(
  //              response => {
  //                this.responseData = response.json();
  //                //console.log(this.responseData );
  //              },
  //              error => {},
  //              () => {
  //                  this.setData();
  //              }
  //          );
  //      } else if (methodType == 'get') {
  //          this._http.get(serviceUrl, options).subscribe(
  //              response => {
  //                this.responseData = response.json();
  //                //console.log(this.responseData);
  //              },
  //              error => {},
  //              () => {
  //                  this.setData();
  //              }
  //          );
  //      }
  //  }





  //fetchData(parentRef: any) {

  //  this.parentRef = parentRef;

  //  var basePriceRepertoryId = "139501";
  //  var commentsQuery: QueryRef<any>;
  //  commentsQuery = this.apollo.watchQuery({
  //    query: IgraphPriceRepertoryQueries.gridActionByParams,
  //    variables: {
  //      accFinancialYearID: "1395",
  //      tblPrcID: basePriceRepertoryId,
  //      tblPrcIDParent: basePriceRepertoryId,
  //      tblBprParentId: '',
  //      sortExpression: '',
  //    }
  //  });
  //  var rs = commentsQuery.valueChanges;
  //  rs.subscribe(st => {
  //    if (JSON.stringify(st.data["priceRepertoryGridActionByParams"]).length > 1) {
  //      //console.log("priceRepertoryGridActionByParams:");
  //      this.responseData = st.data["priceRepertoryGridActionByParams"];        
  //      this.setParentData(this.responseData);
  //    }
  //  });
  //}


  //setParentData(data) {    
  //  this.parentRef.setTreeViewData(data);
  //}

  ////setLazyData() {
  ////  this.parentRef.setLazyData(this.responseData);
  ////}
  //setLazyParentData(data) {
  //  this.parentRef.setLazyTreeViewData(data);
  //}

  //fetchLazyData(parentRef: any) {
    
  //  var basePriceRepertoryId = "139501";
  //  var commentsQuery: QueryRef<any>;
  //  commentsQuery = this.apollo.watchQuery({
  //    query: IgraphPriceRepertoryQueries.gridActionByParams,
  //    variables: {
  //      accFinancialYearID: "1395",
  //      tblPrcID: basePriceRepertoryId,
  //      tblPrcIDParent: basePriceRepertoryId,
  //      tblBprParentId: parentRef.lazyNode.tBL_BprID,
  //      sortExpression: '',
  //    }
  //  });
  //  var rs = commentsQuery.valueChanges;
  //  rs.subscribe(st => {
  //    if (JSON.stringify(st.data["priceRepertoryGridActionByParams"]).length > 1) {
  //      console.log("priceRepertoryGridActionByParams:");
  //      this.responseData = st.data["priceRepertoryGridActionByParams"];        
  //      this.setLazyParentData(this.responseData);
  //    }
  //  });

  //  //this.parentRef = parentRef;
  //      //this.responseData = response.json();
  
  //      //this.setLazyData();

  //  }

    
}
