import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  typeCompte : any = ""
  Page : string = ""
  Nom : string = ""
  Prenom : string = ""

  constructor(private router: Router) { }

  ngOnInit() {
    //on initialise la page sur home
    this.Page = "home";

    //récupération du type de compte dans la localStorage
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)
    this.typeCompte = TokenDecode.type;
    this.typeCompte = this.typeCompte.toLowerCase()
    this.Nom = TokenDecode.nom
    this.Prenom = TokenDecode.prenom
  }

  logout()
  {
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }
  
  ChangementPage(page : string)
  {
    this.Page = page;
  }

}
