import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginSingupComponent } from './Pages/login-signup/login-signup.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';

export const routes: Routes = [

    {
    path:'',
    redirectTo: 'loginsignup',
    pathMatch: 'full'
    },
    {
        path: 'loginsignup',
        component: LoginSingupComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        
    },
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }