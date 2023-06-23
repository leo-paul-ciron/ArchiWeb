import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogDeleteComponent } from '../confirm-dialog-delete/confirm-dialog-delete.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creation-cours',
  templateUrl: './creation-cours.component.html',
  styleUrls: ['./creation-cours.component.scss']
})
export class CreationCoursComponent {
  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog) { }

  typeCompte : any = ""
  afficherFormulaireAddCoursBool = false;
  Cours : any = "";
  idUtilisateur : string = ""

  ngOnInit() {
    //récupération du type de compte dans la localStorage
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)
    this.typeCompte = TokenDecode.type;
    this.typeCompte = this.typeCompte.toLowerCase();
    this.idUtilisateur = TokenDecode.utilisateur

    this.apiService.GetCoursEnseignant().subscribe({
      next: (data) => {
        this.Cours = data
        console.log(this.Cours);
      },
    });

  }
  
  affichageFormAddCours()
  {
    this.afficherFormulaireAddCoursBool = true;
  }

  onSubmitFormAddCours(event: boolean)
  {
    this.afficherFormulaireAddCoursBool = event;
    this.apiService.GetCoursEnseignant().subscribe({
      next: (data) => {
        this.Cours = data
        console.log(this.Cours);
      },
    });
  }

  openConfirmationDialog(idUtilisateur : string): void {
    
    const dialogRef = this.dialog.open(ConfirmDialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Effectuez l'action de suppression ici
        this.apiService.DeleteCour(idUtilisateur).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            Swal.fire("Erreur lors de la suppression du cour!");
          },
          complete: () => {
            this.apiService.GetCoursEnseignant().subscribe({
              next: (data) => {
                this.Cours = data
                console.log(this.Cours);
              },
            });
            Swal.fire('Cour supprimé!');
          }
        });
      }
    });
  }

  logout()
  {
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }
}
