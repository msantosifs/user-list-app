import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(private userService: UserService, private router: Router) { }

  fetchUserList() {
    this.userService.fetchUsers();
    this.router.navigate(['user-list'])
  }

}
