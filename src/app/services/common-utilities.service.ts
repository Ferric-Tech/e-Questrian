import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonUtilitiesService {
  isEqualObjects(object1: any, object2: any) {
    return JSON.stringify(object1) == JSON.stringify(object2);
  }
}
