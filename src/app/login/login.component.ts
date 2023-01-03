import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, StorageService} from '../libs';
import { Observable } from 'rxjs/Observable';
import { SplashScreenService } from '../shared';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory/lib/inMemoryCache';
//import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription, observable } from 'rxjs';
import { map } from 'rxjs/Operator/map';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { Promise } from 'q';
import { delay } from 'rxjs/operators';
import 'rxjs/Rx';
import { ApolloQueryResult } from 'apollo-client';
import { QueryRef } from 'apollo-angular';
import { toPromise as toPromiseApollo, toPromise} from 'apollo-link/lib/linkUtils';
import { IgraphBudgetQueries } from '../igraphql/igraphqlBudget';
import { UserIdleService } from 'angular-user-idle';
import { MatDialog } from '@angular/material';
import { MessageBox, MessageBoxButton, MessageBoxStyle } from "../libs/messagebox";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})



export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean; 
  commentsQuery: QueryRef<any>;

  TimeIsUp;
  TimeIsUpPleaseEnterRepeat;

  constructor(
    private translate:TranslateService,
    private dialog: MatDialog,
    private fb: FormBuilder,    
    private storageService: StorageService,
    private splash: SplashScreenService,
    private apollo: Apollo,
    private httplink: HttpLink,
    private userIdle: UserIdleService,
    private authService: AuthService
  ) {

    translate.get('TimeIsUp').subscribe(s => this.TimeIsUp = s);
    translate.get('TimeIsUpPleaseEnterRepeat').subscribe(s => this.TimeIsUpPleaseEnterRepeat = s);

  }

  ngOnInit() {
    this.splash.hide();
    this.storageService.clear('Current:BudgetByCodeMeli', {session:false});
    this.storageService.clear('Current:User', { session: true });

    //Start watching for user inactivity.
    this.userIdle.startWatching();

    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  isFieldInvalid(field: string) {

    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    var st: string;

      if (this.form.valid && this.form.value['userName'] == this.form.value['password']) {

          this.commentsQuery = this.apollo.watchQuery({
              query: IgraphBudgetQueries.get('budgetBycodemeli'),
              variables: {
                  codemeli: this.form.value['userName']
              }
          });

          var rs = this.commentsQuery.valueChanges;

          rs.subscribe(st => {

            var uid = this.form.value['userName'].trim().toString();
            //var ukeyGrid = "Current:Grid|" + uid;

            if (st.data["budgetBycodemeli"].length >= 1) {
                  this.storageService.set("Current:BudgetByCodeMeli", st.data["budgetBycodemeli"], { session: false });
                  this.storageService.set("Current:User", uid, { session: true });

              //if (this.storageService.get(ukeyGrid, { session: true }) == null)
              //    this.storageService.set(ukeyGrid,null, { session: true });

                  let subscription = this.userIdle.onTimerStart().subscribe((count) => {
                      if (count == 5) {
                          MessageBox.show(this.dialog, this.TimeIsUpPleaseEnterRepeat, this.TimeIsUp, '', -1, true, MessageBoxStyle.Full, "400px");
                          subscription.unsubscribe();
                      }
                  });

                  this.authService.login(this.form.value);
              }        
          }, err => console.log(err));      
    }
    this.formSubmitAttempt = true;
  }
   
}

