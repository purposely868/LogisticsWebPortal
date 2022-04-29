import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppSelectorComponent } from './user-home/app-selector/app-selector.component';
import { AuthGuard } from './auth/auth.guard';
import { UserLandingComponent } from './user-home/user-landing/user-landing.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AppMainComponent } from './user-home/app-selector/app-main/app-main.component';

import { UserManagementComponent } from './user-home/app-selector/appViews/user-management/user-management.component';

import { UserRegistrationComponent } from './user-home/app-selector/appViews/user-management/user-registration/user-registration.component';

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
          {
            path: 'userManagement',
            component: UserManagementComponent,
            children: [
              {
                path: 'userRegistration',
                component: UserRegistrationComponent,
              },
            ],
          },
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
