import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

const users_response = [{ id: 1, name: 'Test', email: 'test@mail.com', gender: 'Male', status: 'Active' }];

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users successfully', (done) => {
    service.fetchUsers();

    service.getUsers$().subscribe((users) => {
      expect(users).toEqual(users_response);
      done();
    });

    const req = httpTestingController.expectOne(UserService.API_ENDPOINT);
    expect(req.request.method).toEqual('GET');

    req.flush(users_response);
  });

  it('should handle the error correctly when fetching users fails', (done) => {
    service.fetchUsers();

    service.getUsers$().subscribe((_) => {
      done();
    });

    service.lastError$.subscribe(errorMessage => {
      expect(errorMessage).toBe('Unable to fetch users');
      done(); // notify Jest that the async operation is done
    });

    const mockReq = httpTestingController.expectOne(UserService.API_ENDPOINT);

    // Simulate an HTTP error response
    mockReq.error(new ErrorEvent('Network error'));
  });
});
