import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AppSelectorComponent } from './user-home/user-landing/app-selector/app-selector.component';
import { HeaderNavComponent } from './user-home/header-nav/header-nav.component';
import { FooterNavComponent } from './user-home/footer-nav/footer-nav.component';
import { FormsModule } from '@angular/forms';
import { UserLandingComponent } from './user-home/user-landing/user-landing.component';
import { UserInfoComponent } from './user-home/user-landing/user-info/user-info.component';
import { UserNewsComponent } from './user-home/user-landing/user-news/user-news.component';
import { UserAdminContactComponent } from './user-home/user-landing/user-admin-contact/user-admin-contact.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
