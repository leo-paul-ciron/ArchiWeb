import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AdminUserAddUserComponent } from '../admin-user-add-user/admin-user-add-user.component'
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogDeleteComponent } from '../confirm-dialog-delete/confirm-dialog-delete.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-modif-user',
  templateUrl: './admin-modif-user.component.html',
  styleUrls: ['./admin-modif-user.component.scss']
})
export class AdminModifUserComponent {

  @Input() utilisateurModif: string = "";
  @Input() affichageModifUser: boolean = true;

  @Output() AfficherPageAdminEventEmitter = new EventEmitter<boolean>();

  constructor(private apiService: ApiService, private router: Router, private dialog: MatDialog) { }

  typeCompte : any = ""

  afficherFormulaireAddUserBool : boolean = false;
  Utilisateurs : any = "";

  optn : string = "";

  ngOnInit() {
      
    //récupération du type de compte dans la localStorage
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)
    this.typeCompte = TokenDecode.type;
    this.typeCompte = this.typeCompte.toLowerCase()

    this.apiService.RecupUserId(this.utilisateurModif).subscribe({
      next: (data) => {
        this.Utilisateurs = data
        console.log(this.Utilisateurs);

        if (this.Utilisateurs.id_typeUtilisateur.nom === 'administrateur') {
          this.optn = "option1"
        }
        else{
          if (this.Utilisateurs.id_typeUtilisateur.nom === 'étudiant') {
            this.optn = "option2"
          }
          else{
            this.optn = "option3"
          }
        }

        console.log(this.optn)
      },
    });

  }
  

  nom : string = ''
  prenom : string = ''
  email : string = ''
  motDePasse : string = ''
  idTypeUtilisateur : string = ''

  onSubmitModifUser(formulaire : any)
  {   
      //création d'un nouvelle utilisateur
      const utilisateur = {
        nom: formulaire.value.nom,
        prenom: formulaire.value.prenom,
        email: formulaire.value.email,
        motDePasse: formulaire.value.motDePasse,
        idTypeUtilisateur: formulaire.value.idTypeUtilisateur,
        idUtilisateur : this.utilisateurModif,
      }; 

      console.log(utilisateur)

      this.apiService.UpdateUser(utilisateur).subscribe({
        next: (data) => {
          console.log("je suis data : " + data);
        },
        error: (error) => {
          Swal.fire("Erreur lors de l'ajout de l'utilisateur!");
        },
        complete: () => {
          this.afficherFormulaireAddUserBool = false; 

          //on envois l'event de changement de la variable
          this.AfficherPageAdminEventEmitter.emit(this.afficherFormulaireAddUserBool);
          Swal.fire('Utilisateur Modifié!');
        }
      });
  }
}
