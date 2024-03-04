import {Routes} from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {UsersComponent} from "./components/users/users.component";

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'users', component: UsersComponent },
];
