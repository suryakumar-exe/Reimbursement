import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const newMetadata = {
  contentType: 'application/pdf',
};
// import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
@Component({
  selector: 'app-hrmodule',
  templateUrl: './hrmodule.component.html',
  styleUrls: ['./hrmodule.component.scss'],
})
export class HRModuleComponent implements OnInit {
  selected: any = [];
  id_session: any;
  email_session: any;
  empid_session: any;
  approvedlevel1: any;
  Rejected: any;
  pending: any;
  total: any;
  role_session: any;
  update_id: any;
  update_empid: any;
  update_emailid: any;
  update_type: any;
  update_attachment: any;
  update_remarks: any;
  update_status: any;
  update_datetime: any;
  new_updated_remark: any;
  status: any = 'approved by level 1';
  reimbursementdatas: any = [];
  PendingStatus: any = [];
  selectedFile: any;
  today: object = new Date();
  files: any = [];
  public downloadURL: any;
  ngOnInit(): void {
    this.email_session = window.sessionStorage.getItem('storage_email');
    this.empid_session = window.sessionStorage.getItem('storage_empid');
    this.role_session = window.sessionStorage.getItem('storage_role');
    this.id_session = window.sessionStorage.getItem('storage_id');
  }
  constructor(
    private storage: AngularFireStorage,
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) {
    this.reimbursementdata();
    // const navigation = this.router.getCurrentNavigation();
    //console.log(this.router.getCurrentNavigation().extras.state['example']);
  }
  isModalOpen_remarkupdate = false;
  openModal_remarkupdate() {
    this.isModalOpen_remarkupdate = true;
  }
  isModalOpen_create = false;
  openModal_create() {
    this.isModalOpen_create = true;
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
      .post('https://localhost:5001/api/Reimbursement/CreateReimbursement', {
        id: 0,
        empId: this.empid_session,
        emailId: this.email_session,
        type: data.type,
        attachment: this.downloadURL,
        remarks: data.remarks,
        status: this.status,
        currentDateTime: this.today,
      })
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
  approve() {
    this.http
      .put(
        'https://localhost:5001/api/Reimbursement/UpdateReimbursementById/' +
          this.update_id,
        {
          id: this.update_id,
          empId: this.update_empid,
          emailId: this.update_emailid,
          type: this.update_type,
          attachment: this.update_attachment,
          remarks: this.update_remarks,
          status: 'Aproved by level 1',
          currentDateTime: this.today,
        }
      )
      .subscribe((res) => {
        console.log(res);
        window.location.reload();
      });
  }
  logout() {
    window.sessionStorage.removeItem('storage_email');
    window.sessionStorage.removeItem('storage_empid');
    window.sessionStorage.removeItem('storage_role');
    window.sessionStorage.removeItem('storage_id');
    console.log('cleared');
    this.router.navigate(['']);
  }
  reject(data: any) {
    console.log(data);
    this.isModalOpen_remarkupdate = false;
    // this.new_updated_remark = data.map((e: { remarks: any }) => e.remarks);
    this.new_updated_remark = data.value.remarks;
    this.http
      .put(
        'https://localhost:5001/api/Reimbursement/UpdateReimbursementById/' +
          this.update_id,
        {
          id: this.update_id,
          empId: this.update_empid,
          emailId: this.update_emailid,
          type: this.update_type,
          attachment: this.update_attachment,
          remarks: this.new_updated_remark,
          status: 'Rejected',
          currentDateTime: this.today,
        }
      )
      .subscribe((res) => {
        console.log(res);
        window.location.reload();
      });
  }
  reimbursementdata() {
    this.http
      .get('https://localhost:5001/api/Reimbursement/FetchAllReimbursement')
      .subscribe((res) => {
        this.reimbursementdatas = res;
        console.log(this.reimbursementdatas);
        this.filters();
        // this.pending();
      });
  }

  // pending() {
  //   var person = this.reimbursementdatas.filter(
  //     (e: any) => e.status === 'Pending'
  //   );
  //   this.PendingStatus = person;
  // }
  filters() {
    this.total = this.reimbursementdatas.length;
    this.approvedlevel1 = this.reimbursementdatas.filter(
      (e: any) => e.status === 'Aproved by level 1'
    ).length;

    this.Rejected = this.reimbursementdatas.filter(
      (e: any) => e.status === 'Rejected'
    ).length;
    this.pending = this.reimbursementdatas.filter(
      (e: any) => e.status === 'Pending'
    ).length;
  }
  url: any;
  upload(event: any) {
    this.selectedFile = event.target.files[0];
    // console.log(event.target.files[0].name, 'Called');
    // for (let index = 0; index < 1; index++) {
    //   const file = event[index];
    //   const filePath = `Demo/${new Date().getTime()}_${
    //     event.target.files[0].name
    //   }`;
    //   const fileRef = this.storage.ref(filePath);
    //   const task: AngularFireUploadTask = this.storage.upload(
    //     filePath,
    //     event[index]
    //   );
    //   task
    //     .snapshotChanges()
    //     .pipe(
    //       finalize(() => {
    //         this.downloadURL = fileRef.getDownloadURL();
    //         this.downloadURL.subscribe((url: any) => {
    //           if (url) {
    //             this.url = url;

    //             console.log(url, 'URL');
    //             this.files.push(file);
    //           }
    //         });
    //       })
    //     )
    //     .subscribe();

    // }
  }
}
