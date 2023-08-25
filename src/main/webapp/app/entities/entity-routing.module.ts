import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'knife',
        data: { pageTitle: 'smartStone3App.knife.home.title' },
        loadChildren: () => import('./knife/knife.module').then(m => m.KnifeModule),
      },
      {
        path: 'stone',
        data: { pageTitle: 'smartStone3App.stone.home.title' },
        loadChildren: () => import('./stone/stone.module').then(m => m.StoneModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
