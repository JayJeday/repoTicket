import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userList:User[];
  user:User;

  userChanged = new Subject();


  loggedUser = new User();
  userLoggedIn = new Subject();

  constructor(private http:Http) { }

  getU(){
    this.http.get('http://localhost:2175/api/user')
    .map(
      (data : Response) =>{  return data.json() as User[]; })
    .toPromise().then(x => {
      this.userList = x;
    }).catch((x)=>'error was called');
  }

  getUserById(id:number){
    this.http.get('http://localhost:2175/api/user/'+ id)
    .map(
      (data : Response) =>{  return data.json() as User[] })
    .toPromise().then(x => {
      this.user = x[0];
    }).catch((x)=>'error was called');
  }

  //Post method for user login
  //TODO add oauth
  getUserByCred(user:User){
    var body = JSON.stringify(user);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:2175/api/login',body,requestOptions).map(x => x.json());
  }

  updateUser(user:User){
    var body = JSON.stringify(user);
    console.log(body);
    var headerOptions = new Headers({ 'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put("http://localhost:2175/api/user",
      body,
      requestOptions).map(res => res.json());
  }

  createUser(){
    
  }
}
