import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  currentUsername = ""
  currentAcno = ""

  data: any = {
    1000: { acno: 1000, uname: "Neer", password: "1000", balance: 5000, transaction: [] },
    1001: { acno: 1001, uname: "Raja", password: "1001", balance: 5000, transaction: [] },
    1002: { acno: 1002, uname: "Ammu", password: "1002", balance: 5000, transaction: [] }

  }
  constructor(private http: HttpClient) {
    this.getDetails()
  }

  getTransaction(acno: any) {
    // return this.data[acno]["transaction"]
    const data = {
      acno
    }

    //server call - transactionAPI
    return this.http.post('http://localhost:3000/transaction', data, this.getOptions())
  }

  saveDetails() {
    if (this.data) {
      localStorage.setItem("data", JSON.stringify(this.data))
    }
    if (this.currentUsername) {
      localStorage.setItem("currentUsername", JSON.stringify(this.currentUsername))
    }
    if (this.currentAcno) {
      localStorage.setItem("currentAcno", JSON.stringify(this.currentAcno))
    }
  }

  getDetails() {
    if (localStorage.getItem("data")) {
      this.data = JSON.parse(localStorage.getItem("data") || '')
    }
    if (localStorage.getItem("currentUsername")) {
      this.currentUsername = JSON.parse(localStorage.getItem("currentUsername") || '')
    }

    if (localStorage.getItem("currentAcno")) {
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
    }
  }

  register(acno: any, uname: any, password: any) {
    //request body
    const data = {
      acno,
      uname,
      password
    }
    //server call - registerAPI
    return this.http.post('http://localhost:3000/register', data)

    // let database = this.data
    // if (acno in database) {
    //   return false

    // }
    // else {
    //   database[acno] = {
    //     acno,
    //     uname,
    //     password,
    //     balance: 0
    //   }
    //   console.log(database);
    //   this.saveDetails()
    //   return true
    // }
  }

  login(acno: any, pswd: any) {

    //request body
    const data = {
      acno,
      pswd
    }
    //server call - loginAPI
    return this.http.post('http://localhost:3000/login', data)


    // let database = this.data
    // if (acno in database) {
    //   if (pswd == database[acno]["password"]) {
    //     this.currentUsername = database[acno]["uname"]
    //     this.currentAcno=acno
    //     this.saveDetails()

    //     return true

    //   }
    //   else {
    //     alert("Invalid password")
    //     return false
    //   }
    // }
    // else {
    //   alert("User does not exist")
    //   return false
    // }

  }

  //to add token in headers
  getOptions() {
    const token = JSON.parse(localStorage.getItem("token") || '')
    console.log(token);

    //request header creation
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append('x-access-token', token)
      options.headers = headers
    }
    console.log(options);

    return options
  }


  deposit(acno: any, pswd: any, amt: any) {
    const data = {
      acno,
      pswd,
      amt
    }

    //server call - depositAPI
    return this.http.post('http://localhost:3000/deposit', data, this.getOptions())

    // var amount = parseInt(amt)
    // let database = this.data
    // if (acno in database) {
    //   if (acno in database) {
    //     if (pswd == database[acno]["password"]) {
    //       database[acno]["balance"] = database[acno]["balance"] + amount
    //       database[acno]["transaction"].push({
    //         amount: amount,
    //         type: "CREDIT"
    //       })
    //       console.log(database[acno]["transaction"]);

    //       this.saveDetails()
    //       return database[acno]["balance"]


    //     }
    //     else {
    //       alert("Invalid password")
    //       return false
    //     }
    //   }
    // }
    // else {
    //   alert("User Not Found")
    //   return false
    // }
  }

  withdraw(acno: any, pswd: any, amt: any) {
    const data = {
      acno,
      pswd,
      amt
    }

    //server call - withdrawAPI
    return this.http.post('http://localhost:3000/withdraw', data, this.getOptions())


    //   var amount = parseInt(amt)
    //   let database = this.data
    //   if (acno in database) {
    //     if (acno in database) {
    //       if (pswd == database[acno]["password"]) {
    //         if (database[acno]["balance"] > amount) {
    //           database[acno]["balance"] = database[acno]["balance"] - amount
    //           database[acno]["transaction"].push({
    //             amount: amount,
    //             type: "DEBIT"

    //           })
    //           console.log(database[acno]["transaction"]);

    //           this.saveDetails()
    //           return database[acno]["balance"]
    //         }
    //         else {
    //           alert("Insufficient balance")
    //           return false
    //         }


    //       }
    //       else {
    //         alert("Invalid password")
    //         return false
    //       }
    //     }
    //   }
    //   else {
    //     alert("User Not Found")
    //     return false
    //   }

  }


  deleteAcc(acno: any) {
    //server call - DELETEApi
    return this.http.delete('http://localhost:3000/deleteAcc/' + acno, this.getOptions())
      
  }
}
