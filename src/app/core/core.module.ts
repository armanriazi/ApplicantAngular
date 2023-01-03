import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { TranslateUniversalLoaderService } from './libs';
import { WINDOW_PROVIDERS } from '../libs';
@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [

  ],
  providers: [
    WINDOW_PROVIDERS
  ]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {

    if (parentModule) {

      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [TranslateUniversalLoaderService]
    }
  }
}


