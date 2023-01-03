import { Routes, RouterModule } from '@angular/router';
import { PlanSupervisionHistoryComponent } from './plansupervisionhistory.component';

const routes: Routes = [
  {
    path: '',
    component: PlanSupervisionHistoryComponent
  }
];

export const PlanSupervisionHistoryRouter = RouterModule.forChild(routes);
