import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //get current date
  ldate = new Date()



  depositform = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  withdrawform = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  user: any
  acno: any

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    this.user = JSON.parse(localStorage.getItem("currentUsername") || '')
  }

  ngOnInit(): void {
    if (!localStorage.getItem("token")) {
      alert("Please login")
      this.router.navigateByUrl("")
    }
  }

  deposit() {
    var acno = this.depositform.value.acno
    var pswd = this.depositform.value.pswd
    var amount = this.depositform.value.amount
    if (this.depositform.valid) {
      var result = this.ds.deposit(acno, pswd, amount)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
          }
        },
          (result) => {
            alert(result.error.message)
          }
        )

    }
    else {
      alert("Invalid Form")
    }
  }


  withdraw() {
    var acno = this.withdrawform.value.acno
    var pswd = this.withdrawform.value.pswd
    var amount = this.withdrawform.value.amount
    if (this.withdrawform.valid) {
      var result = this.ds.withdraw(acno, pswd, amount)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
          }
        },
          (result) => {
            alert(result.error.message)
          }
        )


    }
    else {
      alert("Invalid Form")
    }
  }
  deleteFromParent() {
    this.acno = JSON.parse(localStorage.getItem("currentAcno") || '')

  }
  onDelete(event: any) {

    this.ds.deleteAcc(event)
      .subscribe((result: any) => {
        if (result) {
          alert(result.message)
          this.router.navigateByUrl("")
        }
      },
        (result) => {
          alert(result.error.message);

        })
  }
  onCancel() {
    this.acno = ""
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("currentAcno")
    var router = this.router
    setTimeout(function () {
      router.navigateByUrl("")
    }, 5000)
  }
}
