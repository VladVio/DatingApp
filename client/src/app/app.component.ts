import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'API';
  users: any;
  constructor(private http: HttpClient,private accountService: AccountService){

  }
  ngOnInit(){
    this.getUsers();
    this.setCurrentUser();
  }
  getUsers(){
    this.http.get('http://localhost:5001/api/users').subscribe({
      next: response =>this.users=response,
      error: error=>console.log(error),
      complete:()=>console.log("Request has completed")
    })
  }
  setCurrentUser(){
    const userString =localStorage.getItem('user');
    if(!userString) return;
    const user:User=JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
