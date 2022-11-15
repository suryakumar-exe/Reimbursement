import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from '../localstorage.service';

import { Location } from '@angular/common';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const newMetadata = {
  contentType: 'application/pdf',
};
// import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { threadId } from 'worker_threads';
@Component({
  selector: 'app-employeemodule',
  templateUrl: './employeemodule.component.html',
  styleUrls: ['./employeemodule.component.scss'],
})
export class EmployeemoduleComponent implements OnInit {
  selected: any = [];
  approvedlevel1: any;
  Rejected: any;
  pending: any;
  total: any;
  id_session: any;
  email_session: any;
  empid_session: any;
  role_session: any;
  update_id: any;
  update_empid: any;
  update_emailid: any;
  update_type: any;
  update_attachment: any;
  my_reimbursements = [] as any;
  update_remarks: any;
  update_status: any;
  update_datetime: any;
  logindatas = [] as any;
  new_updated_remark: any;
  status: any = 'Pending';
  reimbursementdatas: any = [];
  selectedFile: any;
  today: object = new Date();
  files: any = [];
  public downloadURL: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private localstorage: LocalstorageService,
    private storage: AngularFireStorage,
    private location: Location
  ) {
    this.reimbursementdata();
  }

  ngOnInit(): void {
    this.email_session = window.sessionStorage.getItem('storage_email');
    this.empid_session = window.sessionStorage.getItem('storage_empid');
    this.role_session = window.sessionStorage.getItem('storage_role');
    this.id_session = window.sessionStorage.getItem('storage_id');
  }
  isModalOpen_remarkupdate = false;
  openModal_remarkupdate() {
    this.isModalOpen_remarkupdate = true;
  }
  isModalOpen_create = false;
  openModal_create() {
    this.isModalOpen_create = true;
  }
  isModalOpen_password = false;
  passordchange() {
    this.isModalOpen_password = true;
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

    this.http
      .get(
        'https://reimbursementbackend.azurewebsites.net/api/LoginDetails/FetchAllLogins'
      )
      .subscribe((res) => {
        this.logindatas = res;
        console.log(this.logindatas);
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
  createpassword(data: any) {
    console.log(this.empid_session);
    var ans = this.logindatas.filter(
      (e: any) => e.empID === this.empid_session
    );
    var id = Number(ans.map((e: any) => e.id));
    var empId = String(ans.map((e: any) => e.empID));
    var emailid = String(ans.map((e: any) => e.emailId));
    var password = String(ans.map((e: any) => e.password));
    var role = String(ans.map((e: any) => e.role));
    console.log(password);
    if (password === data.newpassword) {
      alert('Please Enter New Password');
    } else if (password === data.oldpassword) {
      this.http
        .put(
          'https://reimbursementbackend.azurewebsites.net/api/LoginDetails/UpdateLogin/' +
            id,
          {
            id: id,
            empId: empId,
            emailId: emailid,
            password: data.newpassword,
            role: role,
            currentDateTime: this.today,
          }
        )
        .subscribe((res) => {
          console.log(res);
          alert('Password Updated');
          // window.location.reload();
        });
    } else {
      alert('Old Password is Wrong!Contact Admin');
    }

    console.log(ans);
    console.log(data);
    console.log(data.oldpassword);
  }
  create(data: any) {
    // const myTest = this.afs.collection('test').ref.doc();
    // console.log(myTest.id);
    var attachmentFile;
    const file = this.selectedFile;
    const filePath = `Demo/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // this.uploadPercent = task.percentageChanges();

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef
            .getDownloadURL()
            .toPromise()
            .then((url: any) => {
              this.downloadURL = url.toString();
              attachmentFile = url;
              // myTest.set({
              //   categoria: this.forma.value.categoria,
              //   imagenes : this.downloadURL,
              //   myId : myTest.id
              // })

              console.log(this.downloadURL);
              this.createReim(data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
      )
      .subscribe();
  }

  createReim(data: any) {
    this.http
      .post(
        'https://reimbursementbackend.azurewebsites.net/api/Reimbursement/CreateReimbursement',
        {
          id: 0,
          empId: this.empid_session,
          emailId: this.email_session,
          type: data.type,
          attachment: this.downloadURL,
          remarks: data.remarks,
          status: this.status,
          currentDateTime: this.today,
        }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
  selectionChanged(pass: any[]) {
    console.log(pass);
    this.update_id = Number(pass.map((e) => e.id));
    this.update_empid = String(pass.map((e) => e.empId));
    this.update_emailid = String(pass.map((e) => e.emailId));
    this.update_type = String(pass.map((e) => e.type));
    this.update_attachment = String(pass.map((e) => e.attachment));
    this.update_remarks = String(pass.map((e) => e.remarks));
    this.update_status = String(pass.map((e) => e.status));
    this.update_datetime = String(pass.map((e) => e.currentDateTime));
    console.log(this.update_id);
  }
  logout() {
    window.sessionStorage.removeItem('storage_email');
    window.sessionStorage.removeItem('storage_empid');
    window.sessionStorage.removeItem('storage_role');
    window.sessionStorage.removeItem('storage_id');
    console.log('cleared');
    this.router.navigate(['']);
  }
  url: any;
  upload(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
