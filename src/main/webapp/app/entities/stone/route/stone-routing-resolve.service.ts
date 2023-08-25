import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStone } from '../stone.model';
import { StoneService } from '../service/stone.service';

@Injectable({ providedIn: 'root' })
export class StoneRoutingResolveService implements Resolve<IStone | null> {
  constructor(protected service: StoneService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStone | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((stone: HttpResponse<IStone>) => {
          if (stone.body) {
            return of(stone.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
