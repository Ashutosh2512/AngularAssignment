import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input() person: {name: string, age: number, emailId: string, avatar: string,country: string, id: number};

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(event: Event){
    console.log(this.person.id);
    this.router.navigate(['editperson', this.person.id + '']);
  }

}
