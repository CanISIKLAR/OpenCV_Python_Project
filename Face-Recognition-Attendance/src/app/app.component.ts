import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './_Services/auth.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router
             ,private authService:AuthService) { }

  ngOnInit() {


    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    // const token = localStorage.getItem('token');
    // if (token) {
    //   this.authService.setDecodedToken();
    // } else {
    //    this.router.navigate(['/login']);
    // }
  }
}
