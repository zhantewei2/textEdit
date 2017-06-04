import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
@Injectable()
export class TotalService {

  selected:Subject<any>=new Subject();
  store:any={
    fontSize:3
  };
  preRange:any;

  constructor() { }
  cache:any={};
}
export class parent{
  modal:any;
  show:any;
  getResult:any;
  textarea:any;
  findParent:any;
  addStyle:any;
  resetFocus:any;
}
