import {AsyncSubject} from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService{
  latestError:AsyncSubject<string> = new AsyncSubject();

  error() {    
    this.latestError.next('form errored');
    this.latestError.complete();
  }
  save() {
    this.latestError.next('form submitted');
    this.latestError.complete();
  }
  update() {
    this.latestError.next('form updated');
    this.latestError.complete();
  }

}
