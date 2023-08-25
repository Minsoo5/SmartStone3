import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IStone } from '../stone.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../stone.test-samples';

import { StoneService } from './stone.service';

const requireRestSample: IStone = {
  ...sampleWithRequiredData,
};

describe('Stone Service', () => {
  let service: StoneService;
  let httpMock: HttpTestingController;
  let expectedResult: IStone | IStone[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StoneService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Stone', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const stone = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(stone).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Stone', () => {
      const stone = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(stone).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Stone', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Stone', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Stone', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addStoneToCollectionIfMissing', () => {
      it('should add a Stone to an empty array', () => {
        const stone: IStone = sampleWithRequiredData;
        expectedResult = service.addStoneToCollectionIfMissing([], stone);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(stone);
      });

      it('should not add a Stone to an array that contains it', () => {
        const stone: IStone = sampleWithRequiredData;
        const stoneCollection: IStone[] = [
          {
            ...stone,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addStoneToCollectionIfMissing(stoneCollection, stone);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Stone to an array that doesn't contain it", () => {
        const stone: IStone = sampleWithRequiredData;
        const stoneCollection: IStone[] = [sampleWithPartialData];
        expectedResult = service.addStoneToCollectionIfMissing(stoneCollection, stone);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(stone);
      });

      it('should add only unique Stone to an array', () => {
        const stoneArray: IStone[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const stoneCollection: IStone[] = [sampleWithRequiredData];
        expectedResult = service.addStoneToCollectionIfMissing(stoneCollection, ...stoneArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const stone: IStone = sampleWithRequiredData;
        const stone2: IStone = sampleWithPartialData;
        expectedResult = service.addStoneToCollectionIfMissing([], stone, stone2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(stone);
        expect(expectedResult).toContain(stone2);
      });

      it('should accept null and undefined values', () => {
        const stone: IStone = sampleWithRequiredData;
        expectedResult = service.addStoneToCollectionIfMissing([], null, stone, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(stone);
      });

      it('should return initial array if no Stone is added', () => {
        const stoneCollection: IStone[] = [sampleWithRequiredData];
        expectedResult = service.addStoneToCollectionIfMissing(stoneCollection, undefined, null);
        expect(expectedResult).toEqual(stoneCollection);
      });
    });

    describe('compareStone', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareStone(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareStone(entity1, entity2);
        const compareResult2 = service.compareStone(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareStone(entity1, entity2);
        const compareResult2 = service.compareStone(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareStone(entity1, entity2);
        const compareResult2 = service.compareStone(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
