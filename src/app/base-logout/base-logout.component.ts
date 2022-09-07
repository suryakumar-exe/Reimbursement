import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-base-logout',
  templateUrl: './base-logout.component.html',
  styleUrls: ['./base-logout.component.css'],
})
export class BaseLogoutComponent implements OnInit {
  jResponse: any;
  jArray = [] as any;
  response: any;
  ngOnInit(): void {}
  selected: any = [];
  constructor(private api: ApiService, private http: HttpClient) {
    this.getJobsList();
  }
  selectionChanged(evevnt: any) {}
  getData() {
    let url =
      'http://ldms.nordex-ag.com/JobManagerAPI/api/v1/WebApp/SearchLayout';
    return this.http.get(url);
  }
  getJobsList(): void {
    this.getData().subscribe((data) => {
      this.response = data;
      if (this.response) {
      }
      //console.log(this.response.Results, 'thisdata here');
      for (const [key, value] of Object.entries(this.response.Results)) {
        this.jResponse = value;
        this.jResponse = {
          ...this.jResponse,
          text: 'Copy directory path to clipboard',
        };
        this.jArray.sort(function (a: any, b: any) {
          return b.id - a.id;
        });
        this.jArray.push(this.jResponse);
        console.log(this.jArray);
      }
    });
  }
  // refresh(state: ClrDatagridStateInterface) {
  //   if (Object.entries(state).length === 0 && state.constructor === Object) {
  //     return;
  //   }
  //   // this.loading=true
  //   console.log(state);
  //   console.log(`event => ${JSON.stringify(state)}`);
  //   this.from = state?.page?.from;
  //   this.pageSize = state?.page?.size;
  //   this.page1 = this?.from / this?.pageSize + 1;

  //   console.log(state?.page?.from, 'this.from.');
  //   console.log(state?.page?.current, 'this.from.current');
  //   console.log(state?.page?.size, 'this.pageSize');
  //   console.log(state?.page?.to, 'this.page');

  //   let JobIdFragment = '';
  //   let UserFragment = '';
  //   let TypeFragment = '';
  //   let TopicFragment = '';
  //   let CockpitIdFragment = '';
  //   let RunnoFragment = '';
  //   let StatusFragment = '';
  //   let priorityFragment = '';
  //   let NumberOfTasksrFragment = '';

  //   if (state.filters) {
  //     for (const filter of state.filters) {
  //       const { property, value } = <{ property: string; value: string }>filter;
  //       console.log(property, 'properties');
  //       if (property === 'id') {
  //         JobIdFragment = value;
  //         console.log(JobIdFragment, 'JobIdFragment');
  //       } else if (filter.filterParamName === 'CockpitUserName') {
  //         UserFragment = filter.selectedItems.map((e: any) => e.value);
  //         console.log(UserFragment, 'UserFragment');
  //       } else if (filter.filterParamName === 'Type') {
  //         TypeFragment = filter.selectedItems.map((e: any) => e.value);
  //         console.log(TypeFragment, 'TypeFragment');
  //       } else if (property === 'RunTopic') {
  //         TopicFragment = value;
  //         console.log(TopicFragment, 'TopicFragment');
  //       } else if (property === 'CockpitId') {
  //         CockpitIdFragment = value;
  //         console.log(CockpitIdFragment, 'CockpitIdFragment');
  //       } else if (property === 'RunNumber') {
  //         RunnoFragment = value;
  //         console.log(RunnoFragment, 'RunnoFragment');
  //       } else if (filter.filterParamName === 'State') {
  //         StatusFragment = filter.selectedItems.map((e: any) => e.value);
  //         console.log(StatusFragment, 'StatusFragment');
  //       } else if (property === 'Priority') {
  //         priorityFragment = value;
  //         console.log(priorityFragment, 'priorityFragment');
  //       } else if (property === 'NumberOfTasks') {
  //         NumberOfTasksrFragment = value;
  //         console.log(NumberOfTasksrFragment, 'NumberOfTasksrFragment');
  //       }
  //     }
  //   }

  //   let orderBy = '';
  //   let orderDescending = false;
  //   if (state.sort) {
  //     if (typeof state.sort.by === 'string') {
  //       orderBy = state.sort.by;
  //       orderDescending = state.sort.reverse;
  //     }
  //   }
  //   let FilterStr = '';
  //   if (JobIdFragment != '') {
  //     if (FilterStr != null) {
  //       // FilterStr += '&';
  //     }
  //     FilterStr += 'JobIdFragment=' + JobIdFragment;
  //   }
  //   if (UserFragment != '') {
  //     if (FilterStr != null && FilterStr != '') {
  //       FilterStr += '&';
  //     }
  //     FilterStr += 'UserFragment=' + UserFragment;
  //   }
  //   if (TypeFragment != '') {
  //     if (FilterStr != null && FilterStr != '') {
  //       FilterStr += '&';
  //     }
  //     FilterStr += 'TypeFragment=' + TypeFragment;
  //   }
  //   if (TopicFragment != '') {
  //     if (FilterStr != null && FilterStr != '') {
  //       FilterStr += '&';
  //     }
  //     FilterStr += 'TopicFragment=' + TopicFragment;
  //   }
  //   if (CockpitIdFragment != '') {
  //     if (FilterStr != null && FilterStr != '') {
  //       FilterStr += '&';
  //     }
  //     FilterStr += 'CockpitIdFragment=' + CockpitIdFragment;
  //   }
  //   if (RunnoFragment != '') {
  //     if (FilterStr != null && FilterStr != '') {
  //       FilterStr += '&';
  //     }
  //     FilterStr += 'RunnoFragment=' + RunnoFragment;
  //   }
  //   if (StatusFragment != '') {
  //     if (FilterStr != null && FilterStr != '') {
  //       FilterStr += '&';
  //     }
  //     FilterStr += 'StatusFragment=' + StatusFragment;
  //   }
  //   if (priorityFragment != '') {
  //     if (FilterStr != null && FilterStr != '') {
  //       FilterStr += '&';
  //     }
  //     FilterStr += 'priorityFragment=' + priorityFragment;
  //   }
  //   if (NumberOfTasksrFragment != '') {
  //     if (FilterStr != '') {
  //       FilterStr += '&';
  //     }
  //     FilterStr += 'NumberOfTasksrFragment=' + NumberOfTasksrFragment;
  //   }

  //   if (orderDescending == false) {
  //     if (FilterStr != '') {
  //       FilterStr += '&';
  //     }

  //     FilterStr += 'orderDescending=' + orderDescending.toString();
  //   }

  //   if (this.page1 != 0) {
  //     if (FilterStr != null && FilterStr != '') {
  //       FilterStr += '&';
  //     }

  //     FilterStr += 'page=' + this.page1.toFixed(0);
  //   }

  //   if (this.pageSize != 0) {
  //     if (FilterStr != null && FilterStr != '') {
  //       FilterStr += '&';
  //     }

  //     FilterStr += 'pageSize=' + this.pageSize.toFixed(0);
  //   }
  //   var url = `http://ldms.nordex-ag.com/JobManagerAPI/api/v1/WebApp/SearchLayout?${FilterStr}`;
  //   console.log(url);
  //   // console.log(url);
  //   this.http.get(url).subscribe((data: any) => {
  //     this.total = data.TotalResults;
  //     console.log(this.total);
  //     this.page1 = data.Page;
  //     console.log(this.page1);
  //     for (let i = 0; i < data.Results.length; i++) {
  //       this.fresponse = [...this.fresponse, data.Results[i]];
  //     }
  //     //this.fresponse = data.Results;

  //     this.jArray = this.fresponse;
  //     console.log(this.jArray);
  //   });
  //   console.log(data);
  //   console.log(data.TotalResults);
  //   console.log(data.Results);
  // for (let i = 0; i < data.Results.length; i++) {
  //   this.fresponse = [...this.fresponse, data.Results[i]];
  // }
  //console.log(data.map((e: { TotalResults: any }) => e.TotalResults));
  // this.total = data.TotalResults;
  // console.log(this.total);
  // this.page1 = data.Page;
  // this.jArray = data.Results;
  // console.log(this.jArray);
  // this.jArray = this.fresponse;
  // console.log(this.jArray, 'jarray');
  // console.log(this.fresponse);
  // // console.log(data.Results);
  // // this.fres = data.map((e: { Results: any }) => e.Results);
  // // fd.push(this.fres);
  // // console.log(fd);
  // // console.log(this.fresponse);
  // console.log(data);

  // console.log(this.total);
  // //this.jArray = [];
  // this.jArray = this.fresponse;
  // console.log(this.jArray);
  // console.log(this.jArray);
  // console.log(this.jArray[this.jArray.length - 1]);
  // });
}
