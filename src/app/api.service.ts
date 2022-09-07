import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  getData() {
    let url =
      'http://ldms.nordex-ag.com/JobManagerAPI/api/v1/WebApp/SearchLayout';
    return this.http.get(url);
  }

  getPageLatest(
    JobIdFragment: any = null,
    UserFragment: any = null,
    TypeFragment: any = null,
    TopicFragment: any = null,
    CockpitIdFragment: any = null,
    RunnoFragment: any = null,
    StatusFragment: any = null,
    priorityFragment: any = null,
    NumberOfTasksrFragment: any = null,
    orderBy: any = null,
    orderDescending: boolean = false,
    page: number = 1,
    pageSize: number = 0
  ) {
    let FilterStr = '';
    if (JobIdFragment != null && JobIdFragment != '') {
      if (FilterStr != null) {
        // FilterStr += '&';
      }
      FilterStr += 'JobIdFragment=' + JobIdFragment;
    }
    if (UserFragment != null && UserFragment != '') {
      if (FilterStr != null && FilterStr != '') {
        FilterStr += '&';
      }
      FilterStr += 'UserFragment=' + UserFragment;
    }
    if (TypeFragment != null && TypeFragment != '') {
      if (FilterStr != null && FilterStr != '') {
        FilterStr += '&';
      }
      FilterStr += 'TypeFragment=' + TypeFragment;
    }
    if (TopicFragment != null && TopicFragment != '') {
      if (FilterStr != null && FilterStr != '') {
        FilterStr += '&';
      }
      FilterStr += 'TopicFragment=' + TopicFragment;
    }
    if (CockpitIdFragment != null && CockpitIdFragment != '') {
      if (FilterStr != null && FilterStr != '') {
        FilterStr += '&';
      }
      FilterStr += 'CockpitIdFragment=' + CockpitIdFragment;
    }
    if (RunnoFragment != null && RunnoFragment != '') {
      if (FilterStr != null && FilterStr != '') {
        FilterStr += '&';
      }
      FilterStr += 'RunnoFragment=' + RunnoFragment;
    }
    if (StatusFragment != null && StatusFragment != '') {
      if (FilterStr != null && FilterStr != '') {
        FilterStr += '&';
      }
      FilterStr += 'StatusFragment=' + StatusFragment;
    }
    if (priorityFragment != null && priorityFragment != '') {
      if (FilterStr != null && FilterStr != '') {
        FilterStr += '&';
      }
      FilterStr += 'priorityFragment=' + priorityFragment;
    }
    if (NumberOfTasksrFragment != null && NumberOfTasksrFragment != '') {
      if (FilterStr != null && FilterStr != '') {
        FilterStr += '&';
      }
      FilterStr += 'NumberOfTasksrFragment=' + NumberOfTasksrFragment;
    }

    if (orderDescending == false) {
      if (FilterStr != null && FilterStr != '') {
        FilterStr += '&';
      }

      FilterStr += 'orderDescending=' + orderDescending.toString();
    }

    if (page != 0) {
      if (FilterStr != null && FilterStr != '') {
        FilterStr += '&';
      }

      FilterStr += 'page=' + page.toFixed(0);
    }

    if (pageSize != 0) {
      if (FilterStr != null && FilterStr != '') {
        FilterStr += '&';
      }

      FilterStr += 'pageSize=' + pageSize.toFixed(0);
    }

    let url = `http://ldms.nordex-ag.com//JobManagerAPI/api/v1/WebApp/SearchLayout?${FilterStr}`;
    console.log(url, 'URL PASSED');

    return this.http.get(url);
  }

  getPage(page: any, pageSize: any, waitForChange: boolean) {
    let url = `http://ldms.nordex-ag.com/JobManagerAPI/api/v1/WebApp/SearchLayout?page=${page}&pageSize=${pageSize}&waitForChange=${waitForChange}`;
    console.log(url);
    this.http.get(url);
  }

  getTasksData(jobid: any) {
    console.log(jobid);
    let temp = 'JobsID=';
    temp = temp + jobid.join('&JobsID=');
    console.log(temp);
    let url = `http://ldms.nordex-ag.com/JobManagerAPI/api/v1/JobManager/Node/HPCPackJobInfo?${temp}`;
    console.log(url);
    return this.http.get(url);
  }

  getNavigations() {
    let url = 'http://ldms/navigations.json';
    return this.http.get(url);
  }

  getFilePath(filepath: any) {
    let url = `http://ldms.nordex-ag.com/JobManagerAPI/api/v1/JobManager/Node/GetTextFileContents?FilePath=${filepath}`;
    console.log(url);
    return this.http.get(url);
  }

  getDataForDetailPane(id: any) {
    let url = `http://ldms.nordex-ag.com/JobManagerAPI/api/v1/JobManager/Node/HPCRestAPIJobTaskInfo?JobsID=${id}`;

    console.log(url);
    return this.http.get(url);
  }

  getNodeGroupDetails(nodegroup: string) {
    let url = `http://ldms.nordex-ag.com/JobManagerAPI/api/v1/WebApp/SearchLayout?NodeGroupFragment=${nodegroup}`;
    console.log(url);
    return this.http.get(url);
  }

  cancelJob(id: any) {
    let temp = 'JobsID=';
    temp = temp + id.join('&JobsID=');
    console.log('tempdata', temp);
    let url = `http://ldms.nordex-ag.com/JobManagerAPI/api/v1/JobManager/Node/HPCPackJob?${temp}`;
    console.log(url);
    return this.http.delete(url);
  }
}
