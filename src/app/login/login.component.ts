import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

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
    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd

    if (this.loginForm.valid) {
      //asynchronous event
      this.ds.login(acno, pswd)
     
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
            localStorage.setItem("currentUsername", JSON.stringify(result.currentUsername))
            localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))
            localStorage.setItem("token",JSON.stringify(result.token))

            this.router.navigateByUrl('dashboard')
          }

        },
          (result: any) => {
            alert(result.error.message);
          }

      // if (result) {
      //   alert("Login successfull")
      //   this.router.navigateByUrl('dashboard')
        )

        }
    else {
      alert("Invalid password")
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
