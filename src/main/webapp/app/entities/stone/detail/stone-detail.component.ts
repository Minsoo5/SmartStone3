import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStone } from '../stone.model';

@Component({
  selector: 'jhi-stone-detail',
  templateUrl: './stone-detail.component.html',
})
export class StoneDetailComponent implements OnInit {
  stone: IStone | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stone }) => {
      this.stone = stone;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
