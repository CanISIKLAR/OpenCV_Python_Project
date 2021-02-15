import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  model = { username: "", password: "" };

  constructor(private _router: Router,
              private authService:AuthService) {
  }
  
  login(){

    
    this.authService.login(this.model).subscribe(res =>{

      if(res){
          this._router.navigate(['/studentsList'])
          .then(() => {
            window.location.reload();
          });
        }
        else{
          alert('Wrong Username or Password');
        }
    }, err =>{

    })

    // if(this.model.username === 'Admin' && this.model.password === 'Admin'){
    //   this.model.username='';
    //   this.model.password='';
    //   localStorage.setItem("token", '1');
    //   this._router.navigate(['/studentsList']);
    // }
    // else{
    //   alert('Wrong Username or Password');
    // }
  }
 }
