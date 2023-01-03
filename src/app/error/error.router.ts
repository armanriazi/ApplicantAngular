import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './error.component';

const routes: Routes = [
    {
        path: '',
        component: ErrorComponent,
        children: [
            {
                path: '403',
                loadChildren: './forbidden/forbidden.module#ForbiddenModule'
            },
            {
                path: '404',
                loadChildren: './not-found/not-found.module#NotFoundModule'
            },
            {
                path: '500',
                loadChildren: './server-error/server-error.module#ServerErrorModule'
            },
            {
                path: '**',
                redirectTo: '404'
            }
        ]
    }
];

export const ErrorRouter = RouterModule.forChild(routes);