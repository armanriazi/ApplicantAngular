import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


//   { path: '', loadChildren: './planinformation/planinformation.module#PlanInformationModule' },
const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
       
          { path: 'contextprice', loadChildren: './contextprice/contextprice.module#ContextPriceModule' },
          { path: 'planhistory', loadChildren: './plansupervisionhistory/plansupervisionhistory.module#PlanSupervisionHistoryModule' },
          { path: 'gridplaninformation', loadChildren: './gridplaninformation/gridplaninformation.module#GridPlanInformationModule' },
          { path: '', loadChildren: './gridplaninformation/gridplaninformation.module#GridPlanInformationModule' }

		],
	}]
;

export const LayoutRoutingModule = RouterModule.forChild(routes);
