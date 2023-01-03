import { Routes, RouterModule } from '@angular/router';
import { PlanInformationComponent } from './planinformation.component';

const routes: Routes = [
	{
		path: '',
    component: PlanInformationComponent    
	}
];

export const PlanInformationRouter = RouterModule.forChild(routes);
