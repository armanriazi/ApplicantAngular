import gql from 'graphql-tag';

export class IgraphBudgetQueries {

  constructor() { }


  static get(query: string) {
    var result: any;

    switch (query) {
      case "budgetBycodemeli":
        result = this.budgetBycodemeli;
        break;
      case "budgetProjectPlanTextFieldsActionBybudgetProjectId":
        result = this.budgetProjectPlanTextFieldsActionBybudgetProjectId;
        break;
    }
    return result;
  }

  private static budgetBycodemeli: any = gql`       
query budgetBycodemeli($codemeli: String!) {
    budgetBycodemeli(codemeli: $codemeli) {
      bUD_ProjectID
      projectName
    }
  }
`


  private static budgetProjectPlanTextFieldsActionBybudgetProjectId: any = gql`

  query budgetProjectPlanTextFieldsActionBybudgetProjectId($qparam: String!) {
  budgetProjectPlanTextFieldsActionBybudgetProjectId(qparam: $qparam) {
    bUD_ProjectCode
    bUD_ProjectApproveDate
    bUD_ProjectName
    bUD_ProjectAddress
  }
}`

}

