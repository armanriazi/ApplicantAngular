import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PLATFORM } from 'aurelia-pal';


const routes: Routes = [
     {
        path: 'error',
        loadChildren: './error/error.module#ErrorModule'
      },
      {
        path: '',
        pathMatch: 'full',
        //canLoad: [CanLoadTeamSection],
        redirectTo: 'login'

      }
      , {
        path: 'dashboard',
        loadChildren: './layout/layout.module#LayoutModule'
      }
      ,
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
      },
      {
        path: 'foo/home',
        loadChildren: './home/home.module#HomeModule'
      }
      ,
      {
        path: 'foo/igraph',

        loadChildren: './igraph/igraph.module#IgraphModule'
      }
      ,
      {
        path: '**',
        redirectTo: 'error'
      }      
];

export const AppRouter = RouterModule.forRoot(routes);
