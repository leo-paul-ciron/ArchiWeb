import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogDeleteComponent } from '../confirm-dialog-delete/confirm-dialog-delete.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualisation-cour-inscript',
  templateUrl: './visualisation-cour-inscript.component.html',
  styleUrls: ['./visualisation-cour-inscript.component.scss']
})
export class VisualisationCourInscriptComponent {

  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog) { }

  typeCompte : any = ""
  idUtilisateur : string = ""
  afficherFormulaireAddCoursBool = false;
  Cours : any = "";
  Resultat : any = "";
  affichageCompetence = false;
  ProjetId : string = "";

  ngOnInit() {
    //récupération du type de compte dans la localStorage
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)
    this.typeCompte = TokenDecode.type;
    this.typeCompte = this.typeCompte.toLowerCase();
    this.idUtilisateur = TokenDecode.utilisateur;

    this.apiService.VisualisationCour().subscribe({
      next: (data) => {
        this.Cours = data
      },
    });

  }

  Etudier(idProjet : string)
  {

    this.ProjetId = idProjet;
    this.affichageCompetence = true
   
  }

  openConfirmationDialog(idProjet : string): void {
    
    const dialogRef = this.dialog.open(ConfirmDialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Effectuez l'action de suppression ici
        this.apiService.Desinscription(idProjet).subscribe({
          next: (data) => {
          },
          error: (error) => {
            Swal.fire("Erreur lors de la suppression de l'utilisateur!");
          },
          complete: () => {
            this.apiService.VisualisationCour().subscribe({
              next: (data) => {
                this.Cours = data
                console.log(this.Cours);
              },
            });
            Swal.fire('Désinscription réussi!');
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
