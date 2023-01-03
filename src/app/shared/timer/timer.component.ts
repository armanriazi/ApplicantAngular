import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})

export class TimerComponent {

  
  timer$ = Observable    
    .interval(1000)
    .map(val => new Date()).catch(this.handleError).delay(1000);

  private handleError(error: Response | any) {
    console.log(error);
    return Observable.throw(error);
  }
}
