import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import {AvatarModule} from 'ngx-avatar';
import { HttpClientModule } from '@angular/common/http';
import { PersonComponent } from './person/person.component';
import { PersonListComponent } from './person-list/person-list.component';
import { RegisterPersonComponent } from './register-person/register-person.component';
import { ReactiveFormsModule } from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { DatePipe } from '@angular/common';


const appRoutes: Routes = [
  {path:'',redirectTo:'personsList',pathMatch: 'full'},
  {path: 'register', component: RegisterPersonComponent},
  {path: 'personsList', component: PersonListComponent},
  {path:'editperson/:id',component: EditPersonComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PersonListComponent,
    RegisterPersonComponent,
    HeaderComponent,
    EditPersonComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule,
    HttpClientModule,
    AvatarModule,
    ReactiveFormsModule, 
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
