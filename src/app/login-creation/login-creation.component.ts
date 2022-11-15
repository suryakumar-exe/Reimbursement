import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-creation',
  templateUrl: './login-creation.component.html',
  styleUrls: ['./login-creation.component.css'],
})
export class LoginCreationComponent implements OnInit {
  selected: any = [];
  logindata: any = [];
  uid: any;
  id_session: any;
  email_session: any;
  empid_session: any;
  role_session: any;
  uempid: any;
  uemailid: any;
  urole: any;
  today: object = new Date();
  constructor(private http: HttpClient, private router: Router) {
    this.fetchlogin();
  }
  isModalOpen_create = false;
  openModal_create() {
    this.isModalOpen_create = true;
  }
  isModalOpen_remarkupdate = false;
  openModal_remarkupdate() {
    this.isModalOpen_remarkupdate = true;
  }
  ngOnInit(): void {
    this.email_session = window.sessionStorage.getItem('storage_email');
    this.empid_session = window.sessionStorage.getItem('storage_empid');
    this.role_session = window.sessionStorage.getItem('storage_role');
    this.id_session = window.sessionStorage.getItem('storage_id');
  }
  selectionChanged(event: any) {
    console.log(event);
    this.uid = Number(event.map((e: { id: any }) => e.id));
    this.uempid = String(event.map((e: { empID: any }) => e.empID));
    this.uemailid = String(event.map((e: { emailId: any }) => e.emailId));
    this.urole = String(event.map((e: { role: any }) => e.role));
    console.log(this.urole);
  }
  logout() {
    window.sessionStorage.removeItem('storage_email');
    window.sessionStorage.removeItem('storage_empid');
    window.sessionStorage.removeItem('storage_role');
    window.sessionStorage.removeItem('storage_id');
    this.router.navigate(['']);
  }
  create(event: any) {
    console.log(event);
    this.http
      .post(
        'https://reimbursementbackend.azurewebsites.net/api/LoginDetails/CreateLogin',
        {
          id: 0,
          empID: event.empID,
          emailId: event.emailId,
          password: event.password,
          role: event.role,
          currentDateTime: this.today,
        }
      )
      .subscribe((data) => {
        console.log(data);
        window.location.reload();
      });
  }
  fetchlogin() {
    this.http
      .get(
        'https://reimbursementbackend.azurewebsites.net/api/LoginDetails/FetchAllLogins'
      )
      .subscribe((res) => {
        this.logindata = res;
        console.log(this.logindata);
      });
  }
  editpassword(event: any) {
    this.http
      .put(
        'https://reimbursementbackend.azurewebsites.net/api/LoginDetails/UpdateLogin/' +
          this.uid,
        {
          id: this.uid,
          empID: this.uempid,
          emailId: this.uemailid,
          password: event.value.password,
          role: this.urole,
          currentDateTime: this.today,
        }
      )
      .subscribe((data) => {
        console.log(data);
        window.location.reload();
      });
  }
}
