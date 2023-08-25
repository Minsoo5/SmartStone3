import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStone, NewStone } from '../stone.model';

export type PartialUpdateStone = Partial<IStone> & Pick<IStone, 'id'>;

export type EntityResponseType = HttpResponse<IStone>;
export type EntityArrayResponseType = HttpResponse<IStone[]>;

@Injectable({ providedIn: 'root' })
export class StoneService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/stones');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(stone: NewStone): Observable<EntityResponseType> {
    return this.http.post<IStone>(this.resourceUrl, stone, { observe: 'response' });
  }

  update(stone: IStone): Observable<EntityResponseType> {
    return this.http.put<IStone>(`${this.resourceUrl}/${this.getStoneIdentifier(stone)}`, stone, { observe: 'response' });
  }

  partialUpdate(stone: PartialUpdateStone): Observable<EntityResponseType> {
    return this.http.patch<IStone>(`${this.resourceUrl}/${this.getStoneIdentifier(stone)}`, stone, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStone>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStone[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getStoneIdentifier(stone: Pick<IStone, 'id'>): number {
    return stone.id;
  }

  compareStone(o1: Pick<IStone, 'id'> | null, o2: Pick<IStone, 'id'> | null): boolean {
    return o1 && o2 ? this.getStoneIdentifier(o1) === this.getStoneIdentifier(o2) : o1 === o2;
  }

  addStoneToCollectionIfMissing<Type extends Pick<IStone, 'id'>>(
    stoneCollection: Type[],
    ...stonesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const stones: Type[] = stonesToCheck.filter(isPresent);
    if (stones.length > 0) {
      const stoneCollectionIdentifiers = stoneCollection.map(stoneItem => this.getStoneIdentifier(stoneItem)!);
      const stonesToAdd = stones.filter(stoneItem => {
        const stoneIdentifier = this.getStoneIdentifier(stoneItem);
        if (stoneCollectionIdentifiers.includes(stoneIdentifier)) {
          return false;
        }
        stoneCollectionIdentifiers.push(stoneIdentifier);
        return true;
      });
      return [...stonesToAdd, ...stoneCollection];
    }
    return stoneCollection;
  }
}
