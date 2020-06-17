import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPersonComponent } from './register-person.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PersonListService } from '../PersonList.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';


class MockService{

}

describe('RegisterPersonComponent', () => {
  let component: RegisterPersonComponent;
  let fixture: ComponentFixture<RegisterPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPersonComponent ],
      imports:[ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientModule],
      providers:[PersonListService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPersonComponent);
    component = fixture.debugElement.componentInstance;
    fixture.debugElement.injector.get(PersonListService);
    component.ngOnInit();
    fixture.detectChanges();
  });
  afterEach(() => {
    component.ngOnDestroy();
  });
  it('component created successfully.', () => {
    expect(component).toBeTruthy();
  });

  it('component register form is not valid when empty.', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });
  it('name field is not valid when empty.', () => {
    expect(component.registerForm.controls['name'].valid).toBeFalsy();
  });
  it('dob field is not valid when empty.', () => {
    expect(component.registerForm.controls['dob'].valid).toBeFalsy();
  });
  it('email field is not valid when empty.', () => {
    expect(component.registerForm.controls['email'].valid).toBeFalsy();
  });
  it('avatar field is not valid when empty.', () => {
    expect(component.registerForm.controls['avatar'].valid).toBeFalsy();
  });
  it('country field is not valid when empty.', () => {
    expect(component.registerForm.controls['country'].valid).toBeFalsy();
  });
  it('onSubmit() should call AddPerson() method of PersonListService', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['name'].setValue('ABCD EFGH');
    component.registerForm.controls['dob'].setValue(new Date());
    component.registerForm.controls['email'].setValue('abc@xyz.com');
    component.registerForm.controls['avatar'].setValue('qwertyuio');
    component.registerForm.controls['country'].setValue('IN');
    const personlistserviceSpy = spyOn(component.getPersonListService(),'AddPerson').and.callThrough();
    expect(personlistserviceSpy).not.toHaveBeenCalled();
    component.onSubmit();
    expect(personlistserviceSpy).toHaveBeenCalledTimes(1);
  });
});
