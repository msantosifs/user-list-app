import {Component, OnInit} from '@angular/core';
import {SortDirection, User, UserColumn, UserColumnEnum} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Observable, take} from "rxjs";
import {faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users!: User[];
  sortDirection = SortDirection.Asc;
  sortField!: UserColumnEnum;

  faSortUp = faSortUp;
  faSortDown = faSortDown;

  userColumns!: UserColumn[];

  errorMessage$!: Observable<string | null>;

  readonly SortDirection = SortDirection;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.errorMessage$ = this.userService.lastError$;
    this.userService.getUsers$().pipe(take(1))
      .subscribe(users => {
        this.users = users;
        this.columnsConfig();
      });
  }

  onSort(field: UserColumnEnum) {
    // switch to new field or flip direction
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
    } else {
      this.sortField = field;
      this.sortDirection = SortDirection.Asc;
    }

    // sort users array
    this.users.sort((a: User, b: User) => {
      if (a[field] > b[field]) return this.sortDirection === SortDirection.Asc ? 1 : -1;
      if (a[field] < b[field]) return this.sortDirection === SortDirection.Asc ? -1 : 1;
      return 0;
    });
  }

  private columnsConfig() {
    this.userColumns = Object.values(UserColumnEnum).map(columnName => {
      return {
        name: columnName,
        icon: faSortUp
      }
    });
  }
}
