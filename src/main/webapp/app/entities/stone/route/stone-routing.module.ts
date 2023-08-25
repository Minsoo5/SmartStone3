import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StoneComponent } from '../list/stone.component';
import { StoneDetailComponent } from '../detail/stone-detail.component';
import { StoneUpdateComponent } from '../update/stone-update.component';
import { StoneRoutingResolveService } from './stone-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const stoneRoute: Routes = [
  {
    path: '',
    component: StoneComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StoneDetailComponent,
    resolve: {
      stone: StoneRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StoneUpdateComponent,
    resolve: {
      stone: StoneRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StoneUpdateComponent,
    resolve: {
      stone: StoneRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(stoneRoute)],
  exports: [RouterModule],
})
export class StoneRoutingModule {}
