import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [SidebarComponent, BreadcrumbsComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SidebarComponent,
    BreadcrumbsComponent
  ]
})
export class SidebarModule { }
