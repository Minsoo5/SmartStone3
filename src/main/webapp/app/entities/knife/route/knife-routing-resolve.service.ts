import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IKnife } from '../knife.model';
import { KnifeService } from '../service/knife.service';

@Injectable({ providedIn: 'root' })
export class KnifeRoutingResolveService implements Resolve<IKnife | null> {
  constructor(protected service: KnifeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IKnife | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((knife: HttpResponse<IKnife>) => {
          if (knife.body) {
            return of(knife.body);
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
