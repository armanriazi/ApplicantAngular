import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-server-error',
    styleUrls: ['./server-error.component.css'],
    templateUrl: './server-error.component.html'
})
export class ServerErrorComponent implements OnInit {

    public model: any;

    public params: any;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
    ) {

        this.params = Object.assign({}, this.route.snapshot.params, this.route.snapshot.queryParams);

        this.model = Object.assign({}, this.params);

        this.model.showDetails = !!Object.keys(this.model).length;

        this.model.showDetails && this.location.replaceState(window.location.pathname);
    }

    public ngOnInit() {

    }
}
