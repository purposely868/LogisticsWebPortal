import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenusorComponent } from './menusor/menusor.component';
import { FooldalComponent } from './fooldal/fooldal.component';
import { OwlModule } from 'ngx-owl-carousel';
import { FooldallabComponent } from './fooldallab/fooldallab.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CooperationComponent } from './cooperation/cooperation.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    MenusorComponent,
    FooldalComponent,
    FooldallabComponent,
    LoginComponent,
    AdminComponent,
    CooperationComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    //OwlModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
