import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { SettingComponent } from './setting/setting.component';
import { AdminUserAddUserComponent } from './admin-user-add-user/admin-user-add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { InscriptionComponent } from './inscription/inscription.component';
import { CreationCompetenceComponent } from './creation-competence/creation-competence.component';
import { CreationCompetenceAddCompetenceComponent } from './creation-competence-add-competence/creation-competence-add-competence.component';
import { CreationCoursComponent } from './creation-cours/creation-cours.component';
import { CreationCoursAddCourComponent } from './creation-cours-add-cour/creation-cours-add-cour.component';
import { VisualisationCourInscriptComponent } from './visualisation-cour-inscript/visualisation-cour-inscript.component';
import { VisualisationCompetenceComponent } from './visualisation-competence/visualisation-competence.component';
import { EtudiantCompetenceComponent } from './etudiant-competence/etudiant-competence.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogDeleteComponent } from './confirm-dialog-delete/confirm-dialog-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminModifUserComponent } from './admin-modif-user/admin-modif-user.component';
import { UserGestionCompteComponent } from './user-gestion-compte/user-gestion-compte.component';
import { EnseignantEtudiantInscritComponent } from './enseignant-etudiant-inscrit/enseignant-etudiant-inscrit.component';
import { CompetenceModificationComponent } from './competence-modification/competence-modification.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    AdminUserComponent,
    SettingComponent,
    AdminUserAddUserComponent,
    InscriptionComponent,
    CreationCompetenceComponent,
    CreationCompetenceAddCompetenceComponent,
    CreationCoursComponent,
    CreationCoursAddCourComponent,
    VisualisationCourInscriptComponent,
    VisualisationCompetenceComponent,
    EtudiantCompetenceComponent,
    ConfirmDialogDeleteComponent,
    AdminModifUserComponent,
    UserGestionCompteComponent,
    EnseignantEtudiantInscritComponent,
    CompetenceModificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
