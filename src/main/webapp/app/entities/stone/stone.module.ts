import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StoneComponent } from './list/stone.component';
import { StoneDetailComponent } from './detail/stone-detail.component';
import { StoneUpdateComponent } from './update/stone-update.component';
import { StoneDeleteDialogComponent } from './delete/stone-delete-dialog.component';
import { StoneRoutingModule } from './route/stone-routing.module';

@NgModule({
  imports: [SharedModule, StoneRoutingModule],
  declarations: [StoneComponent, StoneDetailComponent, StoneUpdateComponent, StoneDeleteDialogComponent],
})
export class StoneModule {}
