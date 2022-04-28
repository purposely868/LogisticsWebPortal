import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AppSelectorComponent } from './user-home/app-selector/app-selector.component';
import { HeaderNavComponent } from './user-home/generalComps/header-nav/header-nav.component';
import { FooterNavComponent } from './user-home/generalComps/footer-nav/footer-nav.component';
import { FormsModule } from '@angular/forms';
import { UserLandingComponent } from './user-home/user-landing/user-landing.component';
import { UserInfoComponent } from './user-home/user-landing/user-info/user-info.component';
import { UserNewsComponent } from './user-home/user-landing/user-news/user-news.component';
import { UserAdminContactComponent } from './user-home/user-landing/user-admin-contact/user-admin-contact.component';
import { AppMenuComponent } from './user-home/generalComps/app-menu/app-menu.component';
import { AppSpecMenuComponent } from './user-home/app-selector/app-spec-menu/app-spec-menu.component';
import { UserRegistrationComponent } from './user-home/app-selector/appViews/user-registration/user-registration.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppMainComponent } from './user-home/app-selector/app-main/app-main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserHomeComponent,
    AppSelectorComponent,
    HeaderNavComponent,
    FooterNavComponent,
    UserLandingComponent,
    UserInfoComponent,
    UserNewsComponent,
    UserAdminContactComponent,
    AppMenuComponent,
    AppSpecMenuComponent,
    UserRegistrationComponent,
    PagenotfoundComponent,
    AppMainComponent,
  ],
  imports: [NgbModule, BrowserModule, AppRoutingModule, FormsModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
