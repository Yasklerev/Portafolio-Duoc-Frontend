import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modulos
import { AuthModule } from './modules/auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { SidebarModule } from './sidebar/sidebar.module';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,

    // Modulos
    AuthModule, 
    PagesModule,
    ComponentsModule,
    SidebarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
