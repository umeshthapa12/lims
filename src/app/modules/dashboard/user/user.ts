import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { ChartComponent } from "ng-apexcharts";

import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart
} from "ng-apexcharts";
import { DashboarService } from "src/app/services/dashboard/dashboard.service";
import { TOAST_STATE, ToastService } from "src/app/shared/toastr/toastr.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  ApexPlotOptions:any;
  labels: any;
  legend:any;
  plotOptions: any;
};

@Component({
    selector: 'user-dashboard',
    templateUrl: './user.html',
    styleUrls: ['./user.scss']
})

export class UserDashboard implements OnInit {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    latestSamples:any[] = [];
    completedSamples:any[] = [];
    userDetails:any;

    loadingLatestSample = true;
    loadingCompletedSample = true;
    isLoadingDownloadBtn = false;

    dashboardStatus:any;
    isDashboardStatus = false;

    pieSeries:any[] = []

    constructor(
        private service: DashboarService,
        private router: Router,
        private toast: ToastService
        ) {
    }

    getDashboardStatus() {
        this.isDashboardStatus = true;
        this.service.getDashboardStatus().subscribe(a => {
            // a.rejected = 0;
            this.dashboardStatus = a;

            let chaartSeries = [this.calculatePercentage(a.completed, a.total_request), this.calculatePercentage(a.pending, a.total_request), this.calculatePercentage(a.processing, a.total_request), this.calculatePercentage(a.recheck, a.total_request)];
            this.pieSeries = chaartSeries;
            this.initializeGraph();
            console.log(chaartSeries, 'ser')
            this.isDashboardStatus = false;
        },(error)=> {
            this.isDashboardStatus = false;
        })
    }

    calculatePercentage(value, total) {
        let percentage =( value/total)*100;
        return percentage;
    }

    gotoMySample() {
        this.router.navigate(['/dashboard/my-sample'])
    }

    gotoSampleReport() {
        this.router.navigate(['/dashboard/report-view']);
    }

    downloadReport(id) {
        this.isLoadingDownloadBtn = true;
        let payload = {
          id: id,
          report_type: 'pdf',
          report_name: 'final-report',
          report_lang: 'en'
        }
        this.service.downloadReport(payload).subscribe(res => {
          this.toast.showToast(TOAST_STATE.success, 'Report Download Successfully!');
          this.dissmissMessage();
          this.isLoadingDownloadBtn = false;
        },(error) => {
          this.isLoadingDownloadBtn = false;
        })
    }

    dissmissMessage() {
        setTimeout(() => {
            this.toast.dismissToast();
        },3000)
    }

    ngOnInit(): void {
        this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
        this.getDashboardStatus();
        this.getMySamples();
        this.getCompletedSamples();
        setTimeout(() => {
            
        }, 2000); 
    }

    getMySamples() {
        this.loadingLatestSample = true;
        let payload = {
            search: '',
            to: '',
            from: '',
            page: '',
            size: '',
            user: this.userDetails.email,
        }

        this.service.getMySamples(payload).subscribe(res => {
            this.latestSamples = res.results.slice(0,10);
            this.loadingLatestSample = false
        },(error) => {
            this.loadingLatestSample = false;
        })
    }

    getCompletedSamples() {
        this.loadingCompletedSample = true
        let payload = {
            search: '',
            to: '',
            from: '',
            page: '',
            size: '',
        }
        this.service.getCompletedSample(payload).subscribe(res => {
            this.completedSamples = res.slice(0,10);
            this.loadingCompletedSample = false;
        },(error) => {
            this.loadingCompletedSample = false;
        })
    }

    initializeGraph() {
        this.chartOptions = {
            series: this.pieSeries,
            chart: {
                width: 350,
                type: "pie",
                fontFamily: 'Poppins',
            },
            labels: ["Completed", "Pending", "Processing", "Recheck"],
            responsive: [
                {
                  breakpoint: 2000,
                  
                  options: {
                    colors: ['#00c853', '#ffc107', '#3f51b5', '#ffc0cb'],
                    dataLabels:{enabled: false},
                    chart: {
                      width: 450
                    },
                    legend: {
                      fontFamily: 'Poppins',
                      position: "bottom"
                    },
                      
                  }
                }
              ]
        };
    }

}