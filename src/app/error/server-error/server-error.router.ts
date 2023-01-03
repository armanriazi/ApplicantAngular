import { Routes, RouterModule } from '@angular/router';

import { ServerErrorComponent } from './server-error.component';

const routes: Routes = [
    {
        path: '',
        component: ServerErrorComponent
    }
];

export const ServerErrorRouter = RouterModule.forChild(routes);