import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-own-reimbursement',
  templateUrl: './own-reimbursement.component.html',
  styleUrls: ['./own-reimbursement.component.scss'],
})
export class OwnReimbursementComponent implements OnInit {
  my_reimbursements: any = [];
  selected: any = [];
  approvedlevel1: any;
  Rejected: any;
  pending: any;
  total: any;
  id_session: any;
  email_session: any;
  empid_session: any;
  role_session: any;
  constructor(private http: HttpClient, private router: Router) {
    this.reimbursementdata();
  }

  ngOnInit(): void {
    this.email_session = window.sessionStorage.getItem('storage_email');
    this.empid_session = window.sessionStorage.getItem('storage_empid');
    this.role_session = window.sessionStorage.getItem('storage_role');
    this.id_session = window.sessionStorage.getItem('storage_id');
  }
  reimbursementdata() {
    this.http
      .get(
        'https://reimbursementbackend.azurewebsites.net/api/Reimbursement/FetchAllReimbursement'
      )
      .subscribe((res) => {
        this.my_reimbursements = res;
        this.my_reimbursements = this.my_reimbursements.filter(
          (e: { emailId: any }) => e.emailId === this.email_session
        );
        console.log(this.my_reimbursements);
        this.filters();
      });
  }
  filters() {
    this.total = this.my_reimbursements.length;
    this.approvedlevel1 = this.my_reimbursements.filter(
      (e: any) => e.status === 'Aproved by level 1'
    ).length;

    this.Rejected = this.my_reimbursements.filter(
      (e: any) => e.status === 'Rejected'
    ).length;
    this.pending = this.my_reimbursements.filter(
      (e: any) => e.status === 'Pending'
    ).length;
  }
  selectionChanged(event: any) {}
  logout() {
    window.sessionStorage.removeItem('storage_email');
    window.sessionStorage.removeItem('storage_empid');
    window.sessionStorage.removeItem('storage_role');
    window.sessionStorage.removeItem('storage_id');
    this.router.navigate(['']);
  }
}
