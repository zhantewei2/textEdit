import { Component, OnInit } from '@angular/core';
import {TotalService} from '../../total.service';
@Component({
  selector: 'app-size-pallete',
  templateUrl: './size-pallete.component.html',
  styleUrls: ['./size-pallete.component.css']
})
export class SizePalleteComponent implements OnInit {

  constructor(public _ts:TotalService) { }
  sizeArr=[1,2,3,4,5,6,7];
  ngOnInit() {
  }
  select(i){
    this._ts.store.fontSize=i;
    this._ts.selected.next(i);
  }
}
