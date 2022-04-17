import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AppSelectorComponent } from './app-selector/app-selector.component';
import { AppNavmenuComponent } from './app-navmenu/app-navmenu.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { FooterNavComponent } from './footer-nav/footer-nav.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserHomeComponent,
    AppSelectorComponent,
    AppNavmenuComponent,
    HeaderNavComponent,
    FooterNavComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
