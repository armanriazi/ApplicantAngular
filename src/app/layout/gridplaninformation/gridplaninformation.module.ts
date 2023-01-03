import { NgModule} from '@angular/core';
import { GridPlanInformationComponent } from './gridplaninformation.component';
import { GridPlanInformationRouter } from './gridplaninformation.router';
import { SharedModule } from '../../shared';
import { CommonModule } from '@angular/common';
import { RTL } from '@progress/kendo-angular-l10n';

@NgModule({
  providers: [{ provide: RTL, useValue: true }],
  declarations: [
    GridPlanInformationComponent 
  ],
  imports: [
    CommonModule,
    GridPlanInformationRouter,    
    SharedModule    
  ]
})
export class GridPlanInformationModule { }
