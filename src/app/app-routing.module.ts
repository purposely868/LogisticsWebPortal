import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppSelectorComponent } from './user-home/app-selector/app-selector.component';
import { UserRegistrationComponent } from './user-home/app-selector/appViews/user-registration/user-registration.component';
import { AuthGuard } from './auth/auth.guard';
import { UserLandingComponent } from './user-home/user-landing/user-landing.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AppMainComponent } from './user-home/app-selector/app-main/app-main.component';

const routes: Routes = [
  { path: '', redirectTo: '/userHome/main', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'userHome',
    component: UserHomeComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'main',
        component: UserLandingComponent,
      },
      {
        path: 'appSelector',
        component: AppSelectorComponent,
        children: [
          { path: 'main', component: AppMainComponent },
          { path: 'userReg', component: UserRegistrationComponent },
        ],
      },
    ],
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
