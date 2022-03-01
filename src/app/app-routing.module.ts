import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { addSyntheticLeadingComment } from 'typescript';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { CooperationComponent } from './cooperation/cooperation.component';
import { FooldalComponent } from './fooldal/fooldal.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'Cooperation',
    component: CooperationComponent,
  },
  {
    path:'reg',
    component:RegistrationComponent,
  },
  {
    path: '**',
    component: FooldalComponent,
  },
 



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
