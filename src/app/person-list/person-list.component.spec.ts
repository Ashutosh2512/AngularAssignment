import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { PersonListComponent } from './person-list.component';
import { Subject, Observable, of } from 'rxjs';
import { PersonListService } from '../PersonList.service';
import { HttpClientModule } from '@angular/common/http';


class MockService{
  getPersons(){
    console.log('%%%%%%%%%%%%%%%%%%');
    return of([{
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
    }]);
  }
}

describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonListComponent ],
      providers: [{provide: PersonListService, useClass: MockService}],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.debugElement.componentInstance;
  });
  it('component created successfully', fakeAsync(() => {
    TestBed.get(PersonListService);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
});
