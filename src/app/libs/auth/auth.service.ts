import { Injectable,Compiler } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './user';
import { StorageService } from '../storage';
import { UserIdleService } from 'angular-user-idle';
import { delay } from 'rxjs/operators';
import { LayoutComponent } from '../../layout';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); 

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  TimeIsUpPleaseEnterRepeat;
  TimeIsUp;

  constructor(
    private userIdle: UserIdleService,
    private router: Router,
    private serviceStorage: StorageService,
    private compiler: Compiler) {
  }

  login(user: User) {
    if (user.userName !== '' && user.password !== '') {
      //if (user.userName.length == 10 && user.password.length == 10) { //#codemeli
      this.loggedIn.next(true);
      // Start watching when user idle is starting.      
      this.router.navigate(['/dashboard']);
      //}
    }
  }

  logout() {                                       
    try {           
      this.serviceStorage.clear('Current:BudgetByCodeMeli', { session: false });
      this.serviceStorage.clear('Current:User', { session: true });
      this.userIdle.stopWatching();
      this.loggedIn.next(false);
      this.loggedIn.isStopped = true;
      this.compiler.clearCache();
      //this.userIdle.resetTimer();
    }
    catch{ }

    this.router.navigate(['/']);
  }

  
}
