import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HeaderModule } from './header';
import { AppMaterialModule } from './app-material/app-material.module';
import { AppKendoModule } from './app-kendo/app-kendo.module';
import { AppDevextremeModule } from './app-devextreme/app-devextreme.module';
import { TranslateModule } from '@ngx-translate/core';
import { SplashScreenService } from './splash-screen';
import { IgraphqlModule } from '../igraphql/igraphql.module';
//import { AppAngularModule } from './app-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/Forms';
import { StorageService, AuthService, CustomIconService, ThemeService, TreeViewService, MyApolloService, MessageService, ErrorService, WINDOW_PROVIDERS, KendoStatePersistingService } from '../libs';

//import { NgPipesModule } from 'ngx-pipes';

const MODULES = [
  CommonModule,
  HeaderModule,  
  AppMaterialModule,
  AppKendoModule,
  IgraphqlModule,
  TranslateModule,
  AppDevextremeModule,
  HttpModule
];

@NgModule({
  exports: MODULES,
  imports: MODULES,
})
export class SharedModule {
	static forRoot(): ModuleWithProviders{
		return {
          ngModule: SharedModule,
          providers: [AuthService, StorageService, SplashScreenService, CustomIconService, ThemeService, TreeViewService, MyApolloService, MessageService, ErrorService,KendoStatePersistingService,WINDOW_PROVIDERS]
		}
	}
}
