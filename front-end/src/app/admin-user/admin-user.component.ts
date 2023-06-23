import { Component } from '@angular/core';
import { AdminUserAddUserComponent } from '../admin-user-add-user/admin-user-add-user.component'
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  logout()
  {
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }

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

    openConfirmationDialog(idUtilisateur : string): void {
    
    const dialogRef = this.dialog.open(ConfirmDialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Effectuez l'action de suppression ici
        this.apiService.SupressionUserAdmin(idUtilisateur).subscribe({
          next: (data) => {
            
          },
          error: (error) => {
            Swal.fire("Erreur lors de la suppression de l'utilisateur!");
          },
          complete: () => {
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
     
   

    modif(recupUser : string)
    {
      this.affichageModifUser = true; 
      this.afficherFormulaireAddUserBool = true
      this.utilisateurModif = recupUser
    }

}
