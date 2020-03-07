import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MainRoutingModule, routes, routing} from './main-routing.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainRoutingModule,
    RouterModule.forChild(routes),
    routing
  ]
})
export class MainModule { }
