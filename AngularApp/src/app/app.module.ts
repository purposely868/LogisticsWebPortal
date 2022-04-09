import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DbParentComponent } from './db-parent/db-parent.component';
import { DbChildComponent } from './db-child/db-child.component';
import { DbServerRequestsService } from './db-server-requests.service';
import { ChildDbsComponent } from './child-dbs/child-dbs.component';
import { ChildTblComponent } from './child-tbl/child-tbl.component';
import { ChildDataComponent } from './child-data/child-data.component';
import { LoginAppComponent } from './login-app/login-app.component';
import { ChildColumnComponent } from './child-column/child-column.component';
import { FormValidationSpyDirective } from './form-validation-spy.directive';
import { FormValidationServiceService } from './form-validation-service.service';

@NgModule({
  declarations: [
    AppComponent,
    DbParentComponent,
    DbChildComponent,
    ChildDbsComponent,
    ChildTblComponent,
    ChildDataComponent,
    LoginAppComponent,
    ChildColumnComponent,
    FormValidationSpyDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [DbServerRequestsService, FormValidationServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
