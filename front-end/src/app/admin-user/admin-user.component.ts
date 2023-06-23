import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MatDialog} from '@angular/material/dialog';
import { ConfirmDialogDeleteComponent } from '../confirm-dialog-delete/confirm-dialog-delete.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})

export class AdminUserComponent {
    
  constructor(private apiService: ApiService, private router: Router, private dialog: MatDialog) { }

  typeCompte : any = ""

  afficherFormulaireAddUserBool : boolean = false;
  Utilisateurs : any = "";
  affichageModifUser : boolean = false
  utilisateurModif : string = ""


  ngOnInit() {
    
    //récupération du type de compte dans la localStorage
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)

    this.typeCompte = TokenDecode.type;
    this.typeCompte = this.typeCompte.toLowerCase()

    //appel de la route : GET http://localhost:3000/admin
    this.apiService.GetUser().subscribe({
      next: (data) => {
        this.Utilisateurs = data

      },
    });
  }

    // Affiche conditionel du formulaire
    //lors du click sur le boutton le formulaire apparait.
    affichageFormAddUser()
    {
        this.afficherFormulaireAddUserBool = true; 
    } 

    //envois du formulaire
    onSubmitFormAddUser (event: boolean)
    {
      this.afficherFormulaireAddUserBool = event;

      this.apiService.GetUser().subscribe({
        next: (data) => {
          this.Utilisateurs = data
        },
      });
    }

    //ouverture de la pop-up de confirmation
    openConfirmationDialog(idUtilisateur : string): void {
    
    const dialogRef = this.dialog.open(ConfirmDialogDeleteComponent);

    //Effacer l'élément ici
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
     
        //appel de la route : DELETE http://localhost:3000/admin/deleteUser/:id
        this.apiService.SupressionUserAdmin(idUtilisateur).subscribe({
          next: (data) => {
            
          },
          error: (error) => {
            Swal.fire("Erreur lors de la suppression de l'utilisateur!");
          },
          complete: () => {
            //appel de la route : GET http://localhost:3000/admin
            this.apiService.GetUser().subscribe({
              next: (data) => {
                this.Utilisateurs = data
                
              },
            });
            Swal.fire('Utilisateur supprimé!');
          }
        });
      }
    });
  }
     
   
  /*
  * modification d'un utilisateur
  */
  modif(idUser : string)
  {
    this.affichageModifUser = true; 
    this.afficherFormulaireAddUserBool = true
    this.utilisateurModif = idUser
  }

}
