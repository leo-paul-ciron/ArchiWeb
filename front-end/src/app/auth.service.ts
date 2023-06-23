import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated(): boolean {

    const token : any = localStorage.getItem('token');

    if (token !== null) {
      const decodedToken : any = jwt_decode(token);

      return decodedToken.connexion
    }
    else {
      return false;
    }
  }
}
