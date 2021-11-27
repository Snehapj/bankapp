import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim = "Your Perfect Banking Partner"
  accno = "Account Number Please"
  acno = ""
  pswd = ""
  

  constructor(private router:Router,private ds:DataService) { }

  ngOnInit(): void {
  }

  // acnoChange(event: any) {
  //   this.acno = event.target.value
  //   console.log(this.acno);

  // }

  // pswdChange(event: any) {
  //   this.pswd = event.target.value
  //   console.log(this.pswd);

  // }

  login() {
    var acno = this.acno
    var pswd = this.pswd
    let result = this.ds.login(acno,pswd)

    if (result) {
        alert("Login successfull")
        this.router.navigateByUrl('dashboard')
      }
      

  }

  
  // login(a:any,p:any) {
  //   console.log(a);
    
  //   var acno = a.value
  //   var pswd = p.value
  //   let db = this.data

  //   if (acno in db) {
  //     if(pswd==db[acno]["password"]){
  //       alert("Login successfull")
  //     }
  //     else{
  //       alert("Invalid password")
  //     }
  //   }
  //   else {
  //     alert("User does not exist")
  //   }

  // }

}
