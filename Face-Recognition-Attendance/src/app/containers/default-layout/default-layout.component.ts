import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';
import { AuthService } from '../../_Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})

export class DefaultLayoutComponent implements OnInit {

  navItemsUpdated=[];

  constructor(private router: Router,
              private authService: AuthService) { }
  public sidebarMinimized = false;
  public navItems = navItems;
  
  ngOnInit() {
    // debugger;

    const token = localStorage.getItem('token');
    if (token) {
      this.authService.setDecodedToken();
    } else {
       this.router.navigate(['/login']);
       return
    }



    if(this.authService.decodedToken.role !== 'Admin'){

      navItems.forEach(menu =>{
        if(menu.name !== 'Courses' && menu.name !== 'Staff'  )
        this.navItemsUpdated.push(menu)
      })
    } 
    
    else
    {
      navItems.forEach(menu =>{
        this.navItemsUpdated.push(menu)
      })
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){

    localStorage.removeItem('token');
    // location.reload();
    this.router.navigate(['/login'])
    .then(() => {
      window.location.reload();
    });
  }
}
