import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { KnifeComponent } from '../list/knife.component';
import { KnifeDetailComponent } from '../detail/knife-detail.component';
import { KnifeUpdateComponent } from '../update/knife-update.component';
import { KnifeRoutingResolveService } from './knife-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const knifeRoute: Routes = [
  {
    path: '',
    component: KnifeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: KnifeDetailComponent,
    resolve: {
      knife: KnifeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: KnifeUpdateComponent,
    resolve: {
      knife: KnifeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: KnifeUpdateComponent,
    resolve: {
      knife: KnifeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(knifeRoute)],
  exports: [RouterModule],
})
export class KnifeRoutingModule {}
