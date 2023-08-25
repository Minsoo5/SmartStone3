import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { KnifeComponent } from './list/knife.component';
import { KnifeDetailComponent } from './detail/knife-detail.component';
import { KnifeUpdateComponent } from './update/knife-update.component';
import { KnifeDeleteDialogComponent } from './delete/knife-delete-dialog.component';
import { KnifeRoutingModule } from './route/knife-routing.module';

@NgModule({
  imports: [SharedModule, KnifeRoutingModule],
  declarations: [KnifeComponent, KnifeDetailComponent, KnifeUpdateComponent, KnifeDeleteDialogComponent],
})
export class KnifeModule {}
