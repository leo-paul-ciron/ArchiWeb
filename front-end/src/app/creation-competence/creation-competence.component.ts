import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogDeleteComponent } from '../confirm-dialog-delete/confirm-dialog-delete.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creation-competence',
  templateUrl: './creation-competence.component.html',
  styleUrls: ['./creation-competence.component.scss']
})
export class CreationCompetenceComponent {
  
  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog) { }

  typeCompte : any = ""
  afficherFormulaireAddCompetenceBool = false;
  Competences : any = "";
  Lie : any = null;
  idUtilisateur : string = ""
  tableauId : any = []

  tableauLie : any = []

  affichageModifCompetence : boolean = false
  competenceModif : string = ""

  ngOnInit() {
    //récupération du type de compte dans la localStorage
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)
    this.typeCompte = TokenDecode.type;
    this.typeCompte = this.typeCompte.toLowerCase();
    this.idUtilisateur = TokenDecode.utilisateur

    this.apiService.GetCompetence().subscribe({
      next: (data) => {
        this.Competences = data   
      },
    });
  }
  
  affichageFormAddCompetence()
  {
    this.afficherFormulaireAddCompetenceBool = true;
  }

  onSubmitFormAddCompetence(event: boolean)
  {
    this.afficherFormulaireAddCompetenceBool = event;
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)
    this.idUtilisateur = TokenDecode.utilisateur
    
    this.apiService.GetCompetence().subscribe({
      next: (data) => {
        this.Competences = data
        console.log(this.Competences);
      },
    });
  }

  openConfirmationDialog(idCompetence : string): void {
    
    const dialogRef = this.dialog.open(ConfirmDialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Action de suppression
        this.apiService.SuppressionCompetence(idCompetence).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            Swal.fire("Erreur lors de la suppression de la compétence!");
          },
          complete: () => {
            this.apiService.GetCompetence().subscribe({
              next: (data) => {
                this.Competences = data   
              },
            });
            Swal.fire('Compétence supprimé!');
          }
        });
      }
    });
  }

  modifCompetence(idCompetence : string)
  {
      this.affichageModifCompetence = true; 
      this.afficherFormulaireAddCompetenceBool = true
      this.competenceModif = idCompetence
  }

  logout()
  {
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }
}
