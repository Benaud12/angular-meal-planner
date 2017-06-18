import { TestBed, inject, async } from '@angular/core/testing';
import {
  AngularFireDatabaseMocked } from './angularfire-database-mocked.service';

describe('AngularFireDatabaseMocked service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularFireDatabaseMocked
      ]
    });
  });

  it('should create', async(inject([AngularFireDatabaseMocked],
    (service: AngularFireDatabaseMocked) => {
      // Assert
      expect(service).toBeTruthy();
    })));
});
