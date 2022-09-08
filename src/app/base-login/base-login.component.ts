import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from '../localstorage.service';
import { NavigationExtras } from '@angular/router';
import { Console } from 'console';
@Component({
  selector: 'app-base-login',
  templateUrl: './base-login.component.html',
  styleUrls: ['./base-login.component.css'],
})
export class BaseLoginComponent implements OnInit {
  user: any = {};
  constructor(
    private router: Router,
    private http: HttpClient,
    private localstorage: LocalstorageService
  ) {}
  logindatas: any = [];
  ngOnInit(): void {}

  onSubmit(form: any) {
    this.http
      .get('https://localhost:5001/api/LoginDetails/FetchAllLogins')
      .subscribe((res) => {
        this.logindatas = res;
        console.log(this.logindatas);
        var person = this.logindatas.filter(
          (e: { emailId: any }) => e.emailId === form.value.email
        );
        console.log(person);
        var check_email = person.map((e: { emailId: any }) => e.emailId);
        var check_password = person.map((e: { password: any }) => e.password);
        console.log(check_email, check_password);
        if (
          String(check_email) === form.value.email &&
          String(check_password) === form.value.password
        ) {
          var person = this.logindatas.filter(
            (e: { emailId: any }) => e.emailId == form.value.email
          );
          var check_id = person.map((e: { id: any }) => e.id);
          var check_role = person.map((e: { role: any }) => e.role);
          var check_empid = person.map((e: { empID: any }) => e.empID);

          window.sessionStorage.setItem('storage_id', check_id);
          window.sessionStorage.setItem('storage_email', check_email);
          window.sessionStorage.setItem('storage_role', check_role);
          window.sessionStorage.setItem('storage_empid', check_empid);
          if (check_role == 'HR') {
            console.log('Athuraziation Found in HR');
            this.router.navigate(['/app-hrmodulecomponent'], {
              state: { example: 'bar' },
            });
          } else if (check_role == 'Employee') {
            console.log('Athuraziation Found in Employee');
            this.router.navigate(['/app-employeemodule'], {
              state: { example: 'bar' },
            });
          } else if (check_role == 'IT') {
            console.log('Athuraziation Found in Employee');
            this.router.navigate(['/app-itmodule'], {
              state: { example: 'bar' },
            });
          } else if (check_role == 'Manager') {
            console.log('Athuraziation Found in Employee');
            this.router.navigate(['/app-managermodule'], {
              state: { example: 'bar' },
            });
          } else if (
            form.value.email == 'suryakumar2808@gmail.com' &&
            form.value.password == 'Surya'
          ) {
            this.router.navigate(['/app-hrmodulecomponent']);
            console.log('Found hardcode');
          } else {
            console.log('Not-Found');
          }
        }
      });
  }
}
