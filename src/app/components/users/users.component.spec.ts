import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserService} from "../../services/user.service";
import {SortDirection, User, UserColumnEnum} from "../../models/user.model";
import {of} from "rxjs";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";

const mockedUsers: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', gender: 'male', status: 'active' },
  { id: 2, name: 'Bob', email: 'bob@example.com', gender: 'female', status: 'inactive' },
];

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [HttpClientTestingModule, FontAwesomeTestingModule],
      providers: [{ provide: UserService, useValue: {
          getUsers$: () => of(mockedUsers)
        } }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct sortDirection when a column is sorted', () => {
    component.sortField = UserColumnEnum.Name;
    component.sortDirection = SortDirection.Asc;

    component.onSort(UserColumnEnum.Name);
    expect(component.sortDirection).toBe(SortDirection.Desc);

    component.onSort(UserColumnEnum.Name);
    expect(component.sortDirection).toBe(SortDirection.Asc);
  });

  it('should sort the users when a column is sorted', () => {
    component.users = [...mockedUsers]; // create a copy

    component.onSort(UserColumnEnum.Name);

    expect(component.users[0].name).toBe('Alice');
    expect(component.users[1].name).toBe('Bob');

    // sort descending
    component.onSort(UserColumnEnum.Name);

    expect(component.users[0].name).toBe('Bob');
    expect(component.users[1].name).toBe('Alice');
  });
});
