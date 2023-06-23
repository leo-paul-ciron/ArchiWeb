import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import {LoginComponent} from "./login/login.component"
import { AccueilComponent } from "./accueil/accueil.component"
import {AdminUserComponent} from "./admin-user/admin-user.component"
import {SettingComponent} from "./setting/setting.component"
import { CreationCompetenceComponent } from "./creation-competence/creation-competence.component"
import { 
  AuthGuardService as AuthGuard 
} from './auth-guard.service';

const routes: Routes = [
  {path: '', component: LoginComponent,},
  {path: 'login', component: LoginComponent,},
  {path: 'home', component: AccueilComponent, canActivate: [AuthGuard] },
  {path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard] },
  {path: 'admin', component: AdminUserComponent, canActivate: [AuthGuard] },
  {path: 'setting', component: SettingComponent, canActivate: [AuthGuard] },
  {path: 'parametre', component: SettingComponent, canActivate: [AuthGuard] },
  {path: 'createCompetence', component: CreationCompetenceComponent, canActivate: [AuthGuard]},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
