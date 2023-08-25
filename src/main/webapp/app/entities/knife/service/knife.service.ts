import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IKnife, NewKnife } from '../knife.model';

export type PartialUpdateKnife = Partial<IKnife> & Pick<IKnife, 'id'>;

export type EntityResponseType = HttpResponse<IKnife>;
export type EntityArrayResponseType = HttpResponse<IKnife[]>;

@Injectable({ providedIn: 'root' })
export class KnifeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/knives');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(knife: NewKnife): Observable<EntityResponseType> {
    return this.http.post<IKnife>(this.resourceUrl, knife, { observe: 'response' });
  }

  update(knife: IKnife): Observable<EntityResponseType> {
    return this.http.put<IKnife>(`${this.resourceUrl}/${this.getKnifeIdentifier(knife)}`, knife, { observe: 'response' });
  }

  partialUpdate(knife: PartialUpdateKnife): Observable<EntityResponseType> {
    return this.http.patch<IKnife>(`${this.resourceUrl}/${this.getKnifeIdentifier(knife)}`, knife, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IKnife>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKnife[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getKnifeIdentifier(knife: Pick<IKnife, 'id'>): number {
    return knife.id;
  }

  compareKnife(o1: Pick<IKnife, 'id'> | null, o2: Pick<IKnife, 'id'> | null): boolean {
    return o1 && o2 ? this.getKnifeIdentifier(o1) === this.getKnifeIdentifier(o2) : o1 === o2;
  }

  addKnifeToCollectionIfMissing<Type extends Pick<IKnife, 'id'>>(
    knifeCollection: Type[],
    ...knivesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const knives: Type[] = knivesToCheck.filter(isPresent);
    if (knives.length > 0) {
      const knifeCollectionIdentifiers = knifeCollection.map(knifeItem => this.getKnifeIdentifier(knifeItem)!);
      const knivesToAdd = knives.filter(knifeItem => {
        const knifeIdentifier = this.getKnifeIdentifier(knifeItem);
        if (knifeCollectionIdentifiers.includes(knifeIdentifier)) {
          return false;
        }
        knifeCollectionIdentifiers.push(knifeIdentifier);
        return true;
      });
      return [...knivesToAdd, ...knifeCollection];
    }
    return knifeCollection;
  }
}
