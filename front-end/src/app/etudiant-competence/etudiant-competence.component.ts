import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-etudiant-competence',
  templateUrl: './etudiant-competence.component.html',
  styleUrls: ['./etudiant-competence.component.scss']
})
export class EtudiantCompetenceComponent {

  constructor(private router: Router, private apiService: ApiService) { }

  typeCompte : any = ""
  idUtilisateur : string = ""
  afficherFormulaireAddCoursBool = false;
  Cours : any = "";
  Resultat : any = "";
  affichageCompetence = false;
  ProjetId : string = "";

  valeurMaitrisse : number[] = []

  ngOnInit() {
    //récupération du type de compte dans la localStorage
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)
    this.typeCompte = TokenDecode.type;
    this.typeCompte = this.typeCompte.toLowerCase();
    this.idUtilisateur = TokenDecode.utilisateur;
    console.log(this.idUtilisateur)

    this.apiService.CompetenceEtudiant({idEtudiant : this.idUtilisateur}).subscribe({
      next: (data) => {
        console.log("resultat : " + this.idUtilisateur )
        this.Resultat = data
        console.log(this.Resultat)
        
        Object.keys(this.Resultat).forEach((key) => {
          var value = this.Resultat[key];
          this.valeurMaitrisse.push(value.niveauCompetence)
        });
      },
    });

  }
 
  logout()
  {
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }
}
