import { TestBed, inject } from "@angular/core/testing";
import {
    HttpClientTestingModule,
    HttpTestingController
  } from '@angular/common/http/testing';
import { PersonListService } from './PersonList.service';


describe('PersonListService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[PersonListService]
        });
    });
    it('should get persons on calling getPersons()', inject([HttpTestingController, PersonListService],
        (httpMock: HttpTestingController, personslistservice:PersonListService) => {
            const mockPersons= [{
                name: 'name1',
              dob: new Date(),
              country: 'INDIA',
              avatar: 'qwerty',
              email: 'abc@xyz.com',
              id:1
              },{
                name: 'name2',
              dob: new Date(),
              country: 'INDIA',
              avatar: 'qwerty',
              email: 'abc@xyz.com',
              id:2
              }];
              personslistservice.getPersons().subscribe(data => {
                expect(data).toEqual(mockPersons);
              });
              const req = httpMock.match('https://tekdi-challenges.appspot.com/api/People');
              expect(req[1].cancelled).toBeFalsy();
              expect(req[1].request.responseType).toEqual('json');
              req[1].flush(mockPersons);
              httpMock.verify();
        }));

        it('should get a particular person if called getParticularPerson()', inject(
            [HttpTestingController, PersonListService],
            (httpMock: HttpTestingController, personslistservice: PersonListService) => {
                const mockPerson= {
                    name: 'name1',
                  dob: new Date(),
                  country: 'INDIA',
                  avatar: 'qwerty',
                  email: 'abc@xyz.com',
                  id:1
                  };
                  personslistservice.getParticularPerson(1).subscribe(data => {
                      expect(data).toEqual(mockPerson);
                  });
                  const req = httpMock.expectOne('https://tekdi-challenges.appspot.com/api/People/1')
                  httpMock.expectOne('https://tekdi-challenges.appspot.com/api/People');
                  expect(req.cancelled).toBeFalsy();
                  expect(req.request.responseType).toEqual('json');
                  req.flush(mockPerson);
                  httpMock.verify();
            }
        ));

        it('should edit an existing person to the list if called editList()', inject(
            [HttpTestingController, PersonListService],
            (httpMock: HttpTestingController, personslistservice: PersonListService) => {
                const mockPerson= {
                    name: 'name1',
                  dob: new Date(),
                  country: 'INDIA',
                  avatar: 'qwerty',
                  email: 'abc@xyz.com',
                  id:1
                  };
                  personslistservice.editList(mockPerson).subscribe(data => {
                      expect(data).toEqual(mockPerson);
                  });
                  const req = httpMock.expectOne('https://tekdi-challenges.appspot.com/api/People/1')
                  httpMock.expectOne('https://tekdi-challenges.appspot.com/api/People');
                  expect(req.cancelled).toBeFalsy();
                  expect(req.request.responseType).toEqual('json');
                  req.flush(mockPerson);
                  httpMock.verify();
            }
        ));

        it('should add a new person to the list if called AddPerson()', inject(
            [HttpTestingController, PersonListService],
            (httpMock: HttpTestingController, personslistservice: PersonListService) => {
                const mockPerson= {
                    name: 'name1',
                  dob: new Date(),
                  country: 'INDIA',
                  avatar: 'qwerty',
                  emailId: 'abc@xyz.com'
                  };
                  personslistservice.AddPerson(mockPerson).subscribe(data => {
                      expect(data).toEqual(mockPerson);
                  });
                  const req = httpMock.match('https://tekdi-challenges.appspot.com/api/People');
                  expect(req[1].cancelled).toBeFalsy();
                  expect(req[1].request.responseType).toEqual('json');
                  req[1].flush(mockPerson);
                  httpMock.verify();
            }
        ));

});