import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonListService } from '../PersonList.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit, OnDestroy {
  id: number;
  editform: FormGroup;
  getSubscription: Subscription;
  editSubscription: Subscription;

  constructor(private personListService: PersonListService, private route: ActivatedRoute,private datepipe: DatePipe,private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    let person: {name: string, dob: Date, email: string, avatar: string, id: number,country: string};
    this.editform = new FormGroup({
      name: new FormControl(null, Validators.required),
      dob: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required,Validators.email]),
      avatar: new FormControl(null,Validators.required),
      country: new FormControl(null, Validators.required)
    });
    
    this.getSubscription = this.personListService.getParticularPerson(this.id).subscribe(data => {
      person = data;
      this.editform.patchValue({
        name: data.name,
        dob: this.datepipe.transform(data.dob, 'yyyy-MM-dd'),
        email: data.email,
        avatar: data.avatar,
        country: data.country
      });
    });   
  }

  ngOnDestroy(): void {
    if(this.editSubscription){
      this.editSubscription.unsubscribe();
    }
    if(this.getSubscription){
      this.getSubscription.unsubscribe();
    }
  }
  getPersonListService(){
    return this.personListService;
  }

  onSubmit() {
    const person = {
      name: this.editform.get('name').value,
      email: this.editform.get('email').value,
      dob: this.editform.get('dob').value,
      country: this.editform.get('country').value,
      id: this.id,
      avatar: this.editform.get('avatar').value
    }
    this.editSubscription = this.personListService.editList(person).subscribe(data => {
      this.router.navigate(['personsList']);
    }, error => {
      return;
    });
  }

}
