import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonListService } from '../PersonList.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-person',
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.scss']
})
export class RegisterPersonComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  addSubscription: Subscription;

  constructor(private personlistService: PersonListService,private router: Router) { }
  

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      dob: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required,Validators.email]),
      avatar: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required)
    });
  }

  ngOnDestroy(): void {
    if(this.addSubscription){
      this.addSubscription.unsubscribe();
    }
  }

  onSubmit(){
    
    const person = {name: this.registerForm.get('name').value,
                    emailId: this.registerForm.get('email').value,
                  dob: new Date(this.registerForm.get('dob').value),
                  avatar: this.registerForm.get('avatar').value,
                country: this.registerForm.get('country').value};

    this.addSubscription = this.personlistService.AddPerson(person).subscribe(data => {
      this.router.navigate(['personsList']);
    }, error => {
      console.log(error);
    });
  }
  getPersonListService(){
    return this.personlistService;
  }
  

}
