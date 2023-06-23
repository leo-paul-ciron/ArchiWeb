import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enseignant-etudiant-inscrit',
  templateUrl: './enseignant-etudiant-inscrit.component.html',
  styleUrls: ['./enseignant-etudiant-inscrit.component.scss']
})

export class EnseignantEtudiantInscritComponent {
  constructor(private router: Router, private apiService: ApiService) { }

  typeCompte : any = ""
  idUtilisateur : string = ""
  afficherFormulaireAddCoursBool = false;
  Cours : any = "";
  Projets : any = "";
  Inscript : any = null;
  affichageCompetence = false;
  ProjetId : string = "";
  Result : any = ""

  affichageNote : boolean = false

  AffichageEtudiant : boolean = false

  valeurMaitrisse : number[] = []

  ngOnInit() {
    //récupération du type de compte dans la localStorage
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)
    this.typeCompte = TokenDecode.type;
    this.typeCompte = this.typeCompte.toLowerCase();
    this.idUtilisateur = TokenDecode.utilisateur;

    this.apiService.GetCoursEnseignant().subscribe({
      next: (data) => {
        this.Projets = data
        
      },
    });

  }

  ClickProjet(idProjet : any)
  {
    
    //on dois récupérer toutes les compétences lié au projet
    //ensuite il faut avec le idProjet et le tableau des compétences récupérer précédement récupérer les résultats
    this.AffichageEtudiant = true

    this.ProjetId = idProjet
    this.apiService.GetEtudiantInscritProjet({idProjet : idProjet}).subscribe({
      next: (data) => {
        this.Inscript = data
      },
    });
    
  }

  visualisationNote(EtudiantId : any)
  {
   
    this.affichageNote = true
    console.log("Etudiant : " +EtudiantId)
    console.log("projet : " + this.ProjetId)
    this.apiService.GetEtudiantInscritProjetResultat(this.ProjetId, EtudiantId).subscribe({
      next: (data) => {
        this.Result = data

        Object.keys(this.Result).forEach((key) => {
          var value = this.Result[key];
          this.valeurMaitrisse.push(value.niveauCompetence)
        });
      },
    });
  }

  retourArriere()
  {
    if (this.affichageNote) {
      this.affichageNote = false
    }
    else{
      this.AffichageEtudiant = false
    }
  }
 
  logout()
  {
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }
}
