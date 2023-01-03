import { Routes, RouterModule } from '@angular/router';
import { GridPlanInformationComponent } from './gridplaninformation.component';

const routes: Routes = [
	{
		path: '',
    component: GridPlanInformationComponent    
	}
];

export const GridPlanInformationRouter = RouterModule.forChild(routes);
