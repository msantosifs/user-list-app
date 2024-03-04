import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WelcomeComponent} from './welcome.component';
import {RouterTestingModule} from "@angular/router/testing";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {Component} from "@angular/core";

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  let router: Router;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      imports: [RouterTestingModule.withRoutes([{ path: 'user-list', component: EmptyRouteComponent }])],
      providers: [
        { provide: UserService, useValue: {
            fetchUsers: jest.fn(() => of([]))
          } }
      ]
    })
      .compileComponents();

    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService);

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchUsers function from UserService and navigate to user-list', () => {
    const spyFetchUsers = jest.spyOn(userService, 'fetchUsers');
    const spyRouterNavigate = jest.spyOn(router, 'navigate');

    component.fetchUserList();

    expect(spyFetchUsers).toHaveBeenCalled();
    expect(spyRouterNavigate).toHaveBeenCalledWith(['user-list']);
  });
});

@Component({template: ''})
class EmptyRouteComponent {}
