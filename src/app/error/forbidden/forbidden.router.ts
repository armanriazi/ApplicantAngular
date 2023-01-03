import { Routes, RouterModule } from '@angular/router';

import { ForbiddenComponent } from './forbidden.component';

const routes: Routes = [
    {
        path: '',
        component: ForbiddenComponent
    }
];

export const ForbiddenRouter = RouterModule.forChild(routes);