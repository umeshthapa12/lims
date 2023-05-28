import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationComponent } from './notification/notification.component';
import { SharedService } from '../services/shared/shared.service';
import { LayoutService } from './layout.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found';
import { RoleGuard } from '../services/role.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden';
import { LayoutRoutingModule } from './layout.routing';

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    NotificationComponent,
    PageNotFoundComponent,
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    MatMenuModule,
    LayoutRoutingModule
  ],
  exports: [],
  providers: [SharedService, LayoutService],
})
export class LayoutModule { }
