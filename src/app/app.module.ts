import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { APP_ID, Inject, NgModule, PLATFORM_ID, Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule, Route, CanLoad, Router} from '@angular/router';
import { CoreModule } from './core';
import { AppRouter } from './app.router';
import { environment, SharedModule, StorageService} from './shared';
//import { isPlatformBrowser } from '@angular/common/src/platform_id';
//import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { UserIdleModule } from 'angular-user-idle';
import { BrowserAnimationsModule as AnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './libs';
import { IgraphComponent } from './igraph/igraph.component';
import { ApolloModule } from 'apollo-angular';
import { TransferHttpCacheModule } from '@nguniversal/common';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    AppRouter,
    BrowserModule.withServerTransition({
      appId: 'Universal'
    }),
    //LoggerModule.forRoot({ serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR }),
    CoreModule,
    UserIdleModule.forRoot({ idle: 600, timeout: 5, ping: 120 }),
    HttpClientModule,
    SharedModule.forRoot(),
    AnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    , TransferHttpCacheModule
  ]
  //,
  //providers: [import { TranslateUniversalLoaderService } from './libs';]
})


export class AppModule {
  constructor(
    @Inject(APP_ID) private appId: string,
    @Inject(PLATFORM_ID) private platformId: Object,  
  ) {

    let platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId = ${appId}\nWith environment : `, environment);    
  }
}




//export class UserToken { }
//export class Permissions {
//  canLoadChildren( id: any): boolean {
//    console.log(id);
//    return true;
//  }
//}

//@Injectable()
//export class CanLoadTeamSection implements CanLoad {
//  previousUrl: string;

//  constructor(private permissions: Permissions, private storageService: StorageService, private authService: AuthService, private router: Router) {

//    //apollo.create({
//    //  link: httpLink.create({ uri: 'http://localhost:5243/' }),
//    //  cache: new InMemoryCache(),
//    //});

//    let storage = this.storageService.get('Current:User', { session: false }) || {};
//    let value = Object.values(storage).length <= 0 ? null : Object.values(storage);
//    if (value == null)
//      this.router.navigate(['/login']);
//    else
//      this.authService.logout();
//  }

//  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {

//    return this.permissions.canLoadChildren(route);
//  }
//}

//export function createApollo(httpLink: HttpLink) {
//  return {
//    link: httpLink.create({ uri: 'http://localhost:5243' }),
//    cache: new InMemoryCache(),
//  };
//}


