import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {

  constructor(private router: Router, private apiService: ApiService) { }

  typeCompte : any = ""
  idUtilisateur : string = ""
  afficherFormulaireAddCoursBool = false;
  Cours : any = "";
  

  ngOnInit() {
    //récupération du type de compte dans la localStorage
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)
    this.typeCompte = TokenDecode.type;
    this.typeCompte = this.typeCompte.toLowerCase();
    this.idUtilisateur = TokenDecode.utilisateur

    this.apiService.GetCoursEtudiant().subscribe({
      next: (data) => {
        this.Cours = data
       
      },
    });

  }

  Suivre(idProjet : string)
  {
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)
    
    this.idUtilisateur = TokenDecode.utilisateur;
    this.idUtilisateur = this.idUtilisateur.toLowerCase();

    const suivre = {
      idEtudiant: this.idUtilisateur,
      idProjet: idProjet
    };

    //appel du service d'ajout d'utilisateur
    this.apiService.InscriptionCour(suivre).subscribe({
      next: (data) => {
        
      },
      error: (error) => {
        Swal.fire("Erreur lors de l'inscription");
       
      },
      complete: () => {
        Swal.fire('Inscription réussi !');
      }
    });
  }

  logout()
  {
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }

}
