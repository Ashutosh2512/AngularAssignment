import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { Router } from '@angular/router';

class MockRouter{
  navigate(url: [string]){
    return url;
  }
}


describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonComponent ],
      providers: [{provide: Router, useClass: MockRouter}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
  });

  it('should create PersonComponent', () => {
    component.person = {
      name: 'ABC',
      age: 17,
      emailId: 'abc@xyz.com',
      avatar: 'qwerty',
      country: 'INDIA',
      id: 1
    };
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should navigste to url: editperson/id on clicking onClick()', inject([Router],(router: Router) => {
    component.person = {
      name: 'ABC',
      age: 17,
      emailId: 'abc@xyz.com',
      avatar: 'qwerty',
      country: 'INDIA',
      id: 1
    };
    component.ngOnInit();
    fixture.detectChanges();
    const spy = spyOn(router,'navigate');
    component.onClick(null);
    const url = spy.calls.first().args[0];
    expect(url).toEqual(['editperson','1']);
  }));
});
