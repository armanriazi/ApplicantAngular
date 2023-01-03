import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';

//import { AgGridModule } from 'ag-grid-angular';
import {  
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatTabsModule,
  MatIconModule,
  MatOptionModule,
  MatGridListModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSelectModule,
  MatCommonModule,
  MatListModule,
  MatFormFieldModule,  
  MatTableModule,  
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSidenavModule,  
  MatTooltipModule,
  MatExpansionModule, 
  MatAutocompleteModule,
  MatSlideToggleModule,    
  
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FlexLayoutModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatIconModule,
    MatOptionModule,
    MatGridListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCommonModule,
    MatListModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSidenavModule,
    PlatformModule,
    ObserversModule,    
    CdkTableModule,
    MatTooltipModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatSlideToggleModule,   
  ]
})
export class AppMaterialModule { }
