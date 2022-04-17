import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
  {
    path: 'userHome',
    component: UserHomeComponent,
  },
  {
    path: 'loginPage',
    component: LoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
