import { TestBed, inject } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';

import { DataService } from './data.service';

describe('DataService', () => {
  let MockFireDatabase: any,
    MockFirebaseObject: any;

  beforeEach(() => {
    MockFirebaseObject = {
      update: jasmine.createSpy('update')
    }
    MockFireDatabase = {
      object: jasmine.createSpy('object')
    };
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {
          provide: AngularFireDatabase,
          useValue: MockFireDatabase
        }
      ]
    });
  });

  it('should create', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  describe('createUserEntry', () => {
    it('should correctly update the firebase database and return the response',
      inject([DataService], (service: DataService) => {
        // Arrange
        const user = {
          uid: 'some-uid',
          username: 'JimmyTee'
        };
        MockFirebaseObject.update.and.returnValue('promise');
        MockFireDatabase.object.and.returnValue(MockFirebaseObject);

        // Act
        const result = service.createUserEntry(user);

        // Assert
        expect(MockFireDatabase.object).toHaveBeenCalledWith('/user');
        expect(MockFirebaseObject.update).toHaveBeenCalledWith({
          "some-uid": {
            username: 'JimmyTee'
          }
        });
        expect(result).toEqual('promise');
      }));
  });
});
