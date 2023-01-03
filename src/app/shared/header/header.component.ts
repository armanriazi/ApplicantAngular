import { Component,OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceModel } from '../model/resource-model';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService, ThemeService } from '../../libs';
import { TimerComponent } from '../timer/timer.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  entryComponents: [TimerComponent],
})
export class HeaderComponent implements OnInit {
  @Input() currentRouter: Observable<object>;
  isThemeDark: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;            
  siteMap;

  constructor(    
    private themeService: ThemeService,    
	  private authService: AuthService,
	  private iconRegistry: MatIconRegistry,
	  private sanitizer: DomSanitizer
   ) { 
	  iconRegistry.addSvgIcon(
		  'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/img/icons/hand.svg'));
  }

  ngOnInit() {

    this.isThemeDark = this.themeService.isThemeDark;

    //this.siteMap = this.router.url;
    //this.clockService.getClock().subscribe(time => this.time = time.getTime().toString());
   // this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();                      
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
