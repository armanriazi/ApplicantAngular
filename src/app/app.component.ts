import { Component, OnInit, isDevMode, Inject } from '@angular/core';
//import { NGXLogger } from 'ngx-logger';
import { AuthService, WINDOW } from './shared';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {  
  constructor(
    private translate: TranslateService)
  {
    translate.addLangs(['fa']);
    translate.setDefaultLang('fa');
    const browserLang = translate.getDefaultLang();

    translate.use(browserLang.match(/fa/) ? browserLang : 'en');
    
    //console.log(environment.production); // Logs false for default environment
  }

  ngOnInit() {
    if (isDevMode()) {
      console.log('👋 Development!');
    } else {
      console.log('💪 Production!');
    }

  }
}
