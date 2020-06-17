import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { EditPersonComponent } from './edit-person.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PersonListService } from '../PersonList.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

describe('EditPersonComponent', () => {
  let component: EditPersonComponent;
  let fixture: ComponentFixture<EditPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonComponent ],
      imports:[ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientModule],
      providers:[PersonListService,DatePipe,{provide: ActivatedRoute,useValue:{
        snapshot:{
          params:{
            id:1
          }
        }
      }}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonComponent);
    component = fixture.debugElement.componentInstance;
    fixture.debugElement.injector.get(PersonListService);
    component.ngOnInit();
    fixture.detectChanges();
  });
  afterEach(() => {
    component.ngOnDestroy();
  });

  it('form invalid when empty', () => {
    expect(component.editform.valid).toBeFalsy();
  });
  it('name field invalid when empty',() => {
    expect(component.editform.controls['name'].valid).toBeFalsy();
  });
  it('dob field invalid when empty',() => {
    expect(component.editform.controls['dob'].valid).toBeFalsy();
  });
  it('email field invalid when empty',() => {
    expect(component.editform.controls['email'].valid).toBeFalsy();
  });
  it('avatar field invalid when empty',() => {
    expect(component.editform.controls['avatar'].valid).toBeFalsy();
  });
  it('country field invalid when empty',() => {
    expect(component.editform.controls['country'].valid).toBeFalsy();
  });

  // it('editing the form with new value return the new user',fakeAsync(() => {
  //   expect(component.editform.valid).toBeFalsy();
  //   component.editform.controls['name'].setValue('ABCD EFGH');
  //   component.editform.controls['dob'].setValue(new Date());
  //   component.editform.controls['email'].setValue('abc@xyz.com');
  //   component.editform.controls['avatar'].setValue('qwertyuio');
  //   component.editform.controls['country'].setValue('IN');
  //   component.id = 1;
  //   // const router = {navigate: jasmine.createSpy('navigate')};
  //   expect(component.onSubmit()).toEqual(undefined);
  // }));

  it('OnSubmit method of the form calls editList method of the PersonListService',() => {
    expect(component.editform.valid).toBeFalsy();
    component.editform.controls['name'].setValue('ABCD EFGH');
    component.editform.controls['dob'].setValue(new Date());
    component.editform.controls['email'].setValue('abc@xyz.com');
    component.editform.controls['avatar'].setValue('qwertyuio');
    component.editform.controls['country'].setValue('IN');
    component.id = 1;
    const personlistserviceSpy = spyOn(component.getPersonListService(),'editList').and.callThrough();
    expect(personlistserviceSpy).not.toHaveBeenCalled();
    component.onSubmit();
    expect(personlistserviceSpy).toHaveBeenCalledTimes(1);
  });
});
