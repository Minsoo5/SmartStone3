import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { KnifeFormService, KnifeFormGroup } from './knife-form.service';
import { IKnife } from '../knife.model';
import { KnifeService } from '../service/knife.service';
import { IStone } from 'app/entities/stone/stone.model';
import { StoneService } from 'app/entities/stone/service/stone.service';
import { KnifeStyle } from 'app/entities/enumerations/knife-style.model';
import { KnifeSize } from 'app/entities/enumerations/knife-size.model';
import { MetalType } from 'app/entities/enumerations/metal-type.model';
import { BevelSides } from 'app/entities/enumerations/bevel-sides.model';
import { CurrentSharpness } from 'app/entities/enumerations/current-sharpness.model';
import { DesiredOutCome } from 'app/entities/enumerations/desired-out-come.model';

@Component({
  selector: 'jhi-knife-update',
  templateUrl: './knife-update.component.html',
})
export class KnifeUpdateComponent implements OnInit {
  isSaving = false;
  knife: IKnife | null = null;
  knifeStyleValues = Object.keys(KnifeStyle);
  knifeSizeValues = Object.keys(KnifeSize);
  metalTypeValues = Object.keys(MetalType);
  bevelSidesValues = Object.keys(BevelSides);
  currentSharpnessValues = Object.keys(CurrentSharpness);
  desiredOutComeValues = Object.keys(DesiredOutCome);

  stonesSharedCollection: IStone[] = [];

  editForm: KnifeFormGroup = this.knifeFormService.createKnifeFormGroup();

  constructor(
    protected knifeService: KnifeService,
    protected knifeFormService: KnifeFormService,
    protected stoneService: StoneService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareStone = (o1: IStone | null, o2: IStone | null): boolean => this.stoneService.compareStone(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ knife }) => {
      this.knife = knife;
      if (knife) {
        this.updateForm(knife);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const knife = this.knifeFormService.getKnife(this.editForm);
    if (knife.id !== null) {
      this.subscribeToSaveResponse(this.knifeService.update(knife));
    } else {
      this.subscribeToSaveResponse(this.knifeService.create(knife));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKnife>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(knife: IKnife): void {
    this.knife = knife;
    this.knifeFormService.resetForm(this.editForm, knife);

    this.stonesSharedCollection = this.stoneService.addStoneToCollectionIfMissing<IStone>(
      this.stonesSharedCollection,
      ...(knife.stones ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.stoneService
      .query()
      .pipe(map((res: HttpResponse<IStone[]>) => res.body ?? []))
      .pipe(map((stones: IStone[]) => this.stoneService.addStoneToCollectionIfMissing<IStone>(stones, ...(this.knife?.stones ?? []))))
      .subscribe((stones: IStone[]) => (this.stonesSharedCollection = stones));
  }
}
