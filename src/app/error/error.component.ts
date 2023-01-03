import { Component, OnInit } from '@angular/core';

import { SplashScreenService } from '../shared';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit{

    constructor(
      private splash: SplashScreenService
    ) { }

    ngOnInit() {

      this.splash.hide();
    }
}
