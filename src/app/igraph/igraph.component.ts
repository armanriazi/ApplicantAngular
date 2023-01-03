import { Component, OnInit } from '@angular/core';
import { SplashScreenService } from '../shared';

@Component({
  selector: 'app-igraph',
  templateUrl: './igraph.component.html',
  styleUrls: ['./igraph.component.scss']
})
export class IgraphComponent implements OnInit {

  constructor(private splash: SplashScreenService) { }

  ngOnInit() {
    this.splash.hide();
  }

}
