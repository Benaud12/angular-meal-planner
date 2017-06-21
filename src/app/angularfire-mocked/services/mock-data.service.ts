import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ScenarioService } from './scenario.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MockDataService {

  constructor(private http: Http, private scenario: ScenarioService) {}

  public getAuthData(): Promise<any> {
    return this.getServiceData('auth');
  }

  private getServiceData(serviceName: string): Promise<any> {
    if (this.scenario.name) {
      return this.getServiceSenarioData(serviceName)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
          return this.getServiceDefaultData(serviceName);
        });
    }
    return this.getServiceDefaultData(serviceName);
  }

  private getServiceSenarioData(serviceName: string): Promise<any> {
    return this.getData(serviceName, this.scenario.name);
  }

  private getServiceDefaultData(serviceName: string): Promise<any> {
    return this.getData(serviceName, this.scenario.default)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('No auth mock data found');
      });
  }

  private getData(serviceName: string, scenarioName: string): Promise<any> {
    return this.http.get(`/mocks/${scenarioName}/${serviceName}.json`)
      .toPromise();
  }
}
