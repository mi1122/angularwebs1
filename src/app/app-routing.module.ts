import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [

  {path:'',redirectTo:'/user/registration',pathMatch:'full'},
  
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent}
    ]
  },

  {
    path:'home' , component:HomeComponent  , canActivate:[AuthGuard]
  },

  {
    path:'order' , component:OrderComponent ,canActivate:[AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
