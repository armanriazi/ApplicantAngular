import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SplashScreenService, CustomIconService } from "../shared";
import { ThemeService } from "../libs";
import { Observable } from "rxjs/Observable";
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { UserIdleService } from 'angular-user-idle';
import { AuthService } from '../libs';
import { MessageBox, MessageBoxButton, MessageBoxStyle } from "../libs/messagebox";
import { delay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  currentCaptionRouter;

  @ViewChild(MatMenuTrigger) notificationMenuPlanInformation: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) notificationMenuContextPrice: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) notificationMenuPlanSuperVisionHistory: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) notificationMenuGridPlanInformation : MatMenuTrigger;




  openMyMenuPlanInformation() {
    this.notificationMenuPlanInformation.openMenu();
    this.notificationMenuContextPrice.closeMenu();
    this.notificationMenuPlanSuperVisionHistory.closeMenu();

  }
  openMyMenuContextPrice() {
    this.notificationMenuContextPrice.openMenu();
    this.notificationMenuPlanInformation.closeMenu();
    this.notificationMenuPlanSuperVisionHistory.closeMenu();
  }

  openMyMenuPlanSuperVisionHistory() {
    this.notificationMenuPlanSuperVisionHistory.openMenu();
    this.notificationMenuPlanInformation.closeMenu();
    this.notificationMenuContextPrice.closeMenu();
  }

  openMyMenuGridPlanInformation() {
    this.notificationMenuGridPlanInformation.openMenu();
    this.notificationMenuContextPrice.closeMenu();
    this.notificationMenuPlanSuperVisionHistory.closeMenu();

  }
  //
  closeMyMenuPlanInformation(): void {
    this.notificationMenuPlanInformation.closeMenu();
  }
  closeMyMenuContextPrice(): void {
    this.notificationMenuContextPrice.closeMenu();
  }
  closeMyMenuPlanSuperVisionHistory(): void {
    this.notificationMenuPlanSuperVisionHistory.closeMenu();
  }  
  closeMyMenuGridPlanInformation(): void {
    this.notificationMenuGridPlanInformation.closeMenu();
  }
 


  isThemeDark: Observable<boolean>;
  //TimeIsUp;
  //TimeIsUpPleaseEnterRepeat;
  showFilterAll: boolean=true;

  constructor(
    private customIconService: CustomIconService,
    private translate: TranslateService,
    private splash: SplashScreenService,
    private themeService: ThemeService,
    private dialog: MatDialog,
    private userIdle: UserIdleService,
    private authService: AuthService) {

    customIconService.SetIcon("eject");
    customIconService.SetIcon("tag");
    customIconService.SetIcon("attachment");
    customIconService.SetIcon("close");
    customIconService.SetIcon("planinformation");
    customIconService.SetIcon("plansupervisionhistory");
    customIconService.SetIcon("contextprice");
    customIconService.SetIcon("logout");
    customIconService.SetIcon("menu");
    customIconService.SetIcon("tree");
    customIconService.SetIcon("table");
    customIconService.SetIcon("close0");
    customIconService.SetIcon("recoverysettings");
    customIconService.SetIcon("save");
    customIconService.SetIcon("recovery");

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {     
      new Promise((resolve, reject) => {
        setTimeout(() => resolve(Observable.of(this.authService.logout())), 5000);
      });
    }, () => console.log('Error UserIdle'));
  }

	ngOnInit() {
      this.splash.hide();
      this.isThemeDark = this.themeService.isThemeDark;      
  }
  ngOnDestroy() {
    
  }
  onActivate(e) {
    this.currentCaptionRouter=e['captionRouter'];
  }
}
