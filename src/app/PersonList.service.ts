import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface responseData{
    name: string;
    dob: Date;
    country: string;
    avatar: string;
    email: string;
    id: number;
}


@Injectable({
    providedIn: 'root'
})
export class PersonListService {
    constructor(private httpclient: HttpClient){
        this.getPersons().subscribe(data => {
            let person: {name: string,emailId: string, dob: Date, avatar: string, country: string,id: number} ;
            let a: number; 
            for(var index in data){
               person = {name: data[index].name,
                 emailId: data[index].email,
                avatar: data[index].avatar,
                country: data[index].country,
                dob: new Date(data[index].dob),
                id: data[index].id
               };
               this.personList.push(person);
            }
          });
          this.ListChanged.next(true);

        // this.personList.push({name: 'Ashutosh Bhardwaj',age:20, emailId:'ashutoshbhardwaj2512@gmail.com',avatar:'205e460b479e2e5b48aec07710c08d50',country: 'INDIA'});
        // this.personList.push({name: 'Saurabh Bhardwaj',age:30, emailId:'bhasau0906@gmail.com',avatar:'205e460b479e2e5b48aec07710c08d50', country: 'USA'});
        // this.personList.push({name: 'Saurabh Bhardwaj',age:30, emailId:'bhasau0906@gmail.com',avatar:'205e460b479e2e5b48aec07710c08d50', country: 'UK'});
        // this.ListChanged.next(true);
        // console.log("from SERVICE");
    }

    ListChanged = new Subject<boolean>();

    personList: {name: string,emailId: string, dob: Date, avatar: string,country: string,id: number}[] = [];

    

    AddPerson(person:{name: string, emailId: string, dob: Date, avatar: string,country: string}){
    //    this.personList.push(person);
    //    this.ListChanged.next(true);
        return this.httpclient.post('https://tekdi-challenges.appspot.com/api/People',{
            name: person.name,
            email: person.emailId,
            dob: person.dob,
            avatar: person.avatar,
            country: person.country
        },{headers: new HttpHeaders().append('User-Agent', 'googlebot').append('Content-Type','application/json')});
    }
    getPersons(){
        return this.httpclient.get<responseData[]>('https://tekdi-challenges.appspot.com/api/People');
    }
    getParticularPerson(id: number){
        return this.httpclient.get<responseData>('https://tekdi-challenges.appspot.com/api/People/'+id);
    }

    getList(){
        return this.personList.slice();
    }

    editList(person: {name: string,email: string, dob: Date, avatar: string,country: string,id: number}){
        return this.httpclient.patch('https://tekdi-challenges.appspot.com/api/People/'+person.id,{
            name: person.name,
            dob: person.dob,
            avatar: person.avatar,
            country: person.country,
            email: person.email
        },{
            headers: new HttpHeaders().append('User-Agent','googlebot').append('Content-Type','application/json')
        });
    }
}