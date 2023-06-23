import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  constructor(private apiService: ApiService, private router: Router, public auth: AuthService) { }
 
  
  email : string = ''
  motDePasse : string = ''
  token : any = ""

  onSubmitLogin(formulaire : any)
  {     
   
      // Récupération des éléments depuis le formulaire.
      const Compte = {
        email:formulaire.value.email ,
        motDePasse:formulaire.value.password
      }

      console.log(Compte);
      //envois des éléments à l'api
      //appel du service d'ajout d'utilisateur
      this.apiService.Login(Compte).subscribe((data) => {
          
          this.token = data
    
          localStorage.setItem("token", this.token)
          
          this.auth.isAuthenticated() ? this.router.navigate(['home']) : null;
        },
      );
  }

}
