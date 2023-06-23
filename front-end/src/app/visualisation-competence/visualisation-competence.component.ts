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
  resultatFormat : any = []
  ngOnInit() {
    //récupération du type de compte dans la localStorage
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)
    this.typeCompte = TokenDecode.type;
    this.typeCompte = this.typeCompte.toLowerCase();
    this.idUtilisateur = TokenDecode.utilisateur;
  
    this.apiService.VisualisationCompetence({idProjet : this.ProjetId,idEtudiant : this.idUtilisateur}).subscribe({
      next: (data) => {
  
        this.Resultat = data
        console.log("je suis la");
        console.log(this.Resultat)



        Object.keys(this.Resultat).forEach((key) => {

          

          this.resultatFormat.push(this.Resultat[key][0])
          var value = this.Resultat[key][0];

          this.valeurMaitrisse.push(value.niveauCompetence)
        });
        
      },
    });

  }

  changementMaitrisseCompetence(index : number, resultatId : string)
  {
   
    
    this.apiService.ModifCompetence({idResultat: resultatId, niveauCompetence:this.valeurMaitrisse[index]}).subscribe({
      next: (data) => {
        
      },
    });
  }
 
}
