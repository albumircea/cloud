import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../model/user.model';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  currentUser?: User;
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
  }

  navigateHome(): void{
    this.router.navigateByUrl('/products');
  }

  navigateClothes(): void{
    this.router.navigateByUrl('/clothing');
  }
  navigateShoes(): void{
    this.router.navigateByUrl('/shoes');
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
