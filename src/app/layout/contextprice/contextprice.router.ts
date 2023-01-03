import { Routes, RouterModule } from '@angular/router';
import { ContextPriceComponent } from './contextprice.component';

const routes: Routes = [
	{
		path: '',
    component: ContextPriceComponent    
	}
];

export const ContextPriceRouter = RouterModule.forChild(routes);
