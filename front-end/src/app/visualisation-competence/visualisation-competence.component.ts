import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-visualisation-competence',
  templateUrl: './visualisation-competence.component.html',
  styleUrls: ['./visualisation-competence.component.scss']
})
export class VisualisationCompetenceComponent {

  constructor(private router: Router, private apiService: ApiService) { }

  //on récupère du parent
  @Input() ProjetId : string = "";

  typeCompte : any = ""
  idUtilisateur : string = ""
  Resultat : any = "";
  valeurMaitrisse : number[] = []
  
  ngOnInit() {
    //récupération du type de compte dans la localStorage
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)
    this.typeCompte = TokenDecode.type;
    this.typeCompte = this.typeCompte.toLowerCase();
    this.idUtilisateur = TokenDecode.utilisateur;
    console.log(this.idUtilisateur)

    this.apiService.VisualisationCompetence({idProjet : this.ProjetId,idEtudiant : this.idUtilisateur}).subscribe({
      next: (data) => {
        console.log("resultat : " + this.idUtilisateur + " " + this.ProjetId)
        this.Resultat = data
        console.log(this.Resultat)
        
        Object.keys(this.Resultat).forEach((key) => {
          var value = this.Resultat[key];
          console.log(value)
          console.log(value.niveauCompetence)
          this.valeurMaitrisse.push(value.niveauCompetence)
        });
        
      },
    });

  }

  changementMaitrisseCompetence(index : number, resultatId : string)
  {
    console.log(resultatId);
    console.log(this.valeurMaitrisse[index])
    
    this.apiService.ModifCompetence({idResultat: resultatId, niveauCompetence:this.valeurMaitrisse[index]}).subscribe({
      next: (data) => {
        console.log(data)
      },
    });
  }
 
}
