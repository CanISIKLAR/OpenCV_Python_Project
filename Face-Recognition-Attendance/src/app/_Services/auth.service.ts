import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
// import { JwtHelperService } from '@auth0/angular-jwt/lib/jwthelper.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { DataSourceService } from './DataSource.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser;

  constructor(private http: HttpClient
              ,private dataSerivc: DataSourceService) {}


    login(model: any){
      return this.http.post(this.baseUrl + 'login', model).pipe(
          map((response: any) =>{
            const user = response;
            if (user){
              localStorage.setItem('token', user.token);
              localStorage.setItem('user', JSON.stringify(user.user));
              // this.dataSerivc.httpOptions.headers = new HttpHeaders({
              //   Authorization: 'Bearer ' + localStorage.getItem('token'),
              // }),
              this.decodedToken = this.jwtHelper.decodeToken(user.token);
              this.currentUser = user.user;            
              return true;
            }
              else{
                return false;
              }
          } )
        );
    }

    register(user){
      const header = new HttpHeaders().set(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
      
      return this.http.post(this.baseUrl + 'register', user , {
        headers: header,
      });
    }

    loggedIn(){
      const token = localStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    }

    setDecodedToken(){
      const token = localStorage.getItem('token') ;
      this.decodedToken = this.jwtHelper.decodeToken(token);
    }
}
