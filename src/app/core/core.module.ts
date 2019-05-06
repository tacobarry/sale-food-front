import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  declarations: [
    FooterComponent,
    NavComponent
  ],
  exports: [
    CommonModule,
    FooterComponent,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    NavComponent
  ]
})
export class CoreModule { }
