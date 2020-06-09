import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonListService } from '../PersonList.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit,OnDestroy {
  persons: {name: string,emailId: string, age: number, avatar: string, country: string, id: number}[] = [];
  getSubscription: Subscription;
  loading: boolean = false;

  constructor(private personListService: PersonListService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getSubscription = this.personListService.getPersons().subscribe(data => {
      let person: {name: string,emailId: string, age: number, avatar: string, country: string,id: number} ;
      let a: number; 
      for(var index in data){
         a = this.calculateAge(new Date(data[index].dob));
         person = {name: data[index].name,
           emailId: data[index].email,
          avatar: data[index].avatar,
          country: data[index].country,
          age: a,
          id: data[index].id
         };
         this.persons.push(person);
      }
      this.loading = false;
    });  
  }

  ngOnDestroy(){
    if(this.getSubscription){
      this.getSubscription.unsubscribe();
    }
  }

  calculateAge(birthdate: Date){
    const timeDiff = Math.abs(new Date().getTime() - birthdate.getTime());
    const age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }

}
