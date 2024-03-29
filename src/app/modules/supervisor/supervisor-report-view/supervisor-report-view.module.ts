import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { SupervisorReportViewComponent } from "./supervisor-report-view";
import { SupervisorReportViewService } from "src/app/services/supervisor/supervisor-report-view/service";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AvatarModule } from "ngx-avatar";
import { MatDialogModule } from "@angular/material/dialog";
import { SupervisorReportViewRemarksComponent } from "./remarks/remakrs";
import { MatIconModule } from "@angular/material/icon";
import { SupervisorReportViewRawDataComponent } from "./raw-data/supervisor-report-raw-data";
import { MicroSupervisorRawDataComponent } from "./micro-supervisor-raw-data/micro-supervisor-raw-data";
import { MatTabsModule } from "@angular/material/tabs";
import { SuperscriptPipe } from "src/app/shared/s-transform";



@NgModule({
    declarations:[SupervisorReportViewComponent, SupervisorReportViewRemarksComponent, SupervisorReportViewRawDataComponent, MicroSupervisorRawDataComponent
        // , 
        // SuperscriptPipe
    ],
    imports: [
        CommonModule,

        RouterModule.forChild([
            {path: '', component:SupervisorReportViewComponent},
        ]),

        MatDialogModule,
        MatIconModule,
        AvatarModule,
        MatTabsModule,
        SharedModule
    ],
    exports:[],
    providers: [SupervisorReportViewService, DatePipe]
})

export class SupervisorSampleReportViewModule {

}