import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKnife } from '../knife.model';

@Component({
  selector: 'jhi-knife-detail',
  templateUrl: './knife-detail.component.html',
})
export class KnifeDetailComponent implements OnInit {
  knife: IKnife | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ knife }) => {
      this.knife = knife;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
