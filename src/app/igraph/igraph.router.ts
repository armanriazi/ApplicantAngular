import { Routes, RouterModule } from '@angular/router';
import { IgraphComponent } from './igraph.component';

const routes: Routes = [
  {
    path: '',
    component: IgraphComponent
  }
];

export const IGraphRouter = RouterModule.forChild(routes);
