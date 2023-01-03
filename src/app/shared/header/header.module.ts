import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { TimerComponent } from '../timer/timer.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
      HeaderComponent,
      TimerComponent,
    ],
    exports: [
      HeaderComponent,
      TimerComponent
    ],
    imports: [
      CommonModule,
      AppMaterialModule,
      RouterModule,
      TranslateModule,
    ],
  providers: [

    ]
})
export class HeaderModule { }
