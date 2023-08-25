import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { StoneFormService, StoneFormGroup } from './stone-form.service';
import { IStone } from '../stone.model';
import { StoneService } from '../service/stone.service';

@Component({
  selector: 'jhi-stone-update',
  templateUrl: './stone-update.component.html',
})
export class StoneUpdateComponent implements OnInit {
  isSaving = false;
  stone: IStone | null = null;

  editForm: StoneFormGroup = this.stoneFormService.createStoneFormGroup();

  constructor(
    protected stoneService: StoneService,
    protected stoneFormService: StoneFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stone }) => {
      this.stone = stone;
      if (stone) {
        this.updateForm(stone);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stone = this.stoneFormService.getStone(this.editForm);
    if (stone.id !== null) {
      this.subscribeToSaveResponse(this.stoneService.update(stone));
    } else {
      this.subscribeToSaveResponse(this.stoneService.create(stone));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStone>>): void {
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

  protected updateForm(stone: IStone): void {
    this.stone = stone;
    this.stoneFormService.resetForm(this.editForm, stone);
  }
}
