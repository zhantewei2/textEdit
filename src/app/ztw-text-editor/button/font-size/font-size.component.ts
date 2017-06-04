import { Component, OnInit,HostBinding} from '@angular/core';
import {parent,TotalService} from '../../total.service';
import {SizePalleteComponent} from '../size-pallete/size-pallete.component';
@Component({
  selector: 'ztw-font-size',
  templateUrl: './font-size.component.html',
  styleUrls: ['./font-size.component.css']
})
export class FontSizeComponent implements OnInit {
  size:number=3;
  @HostBinding('className')hostClass='dbBtn between';
  getSize(){
    this.parent.modal.getResult(SizePalleteComponent,'fontSize',false,true).then((v:any)=>{
      if(!v)return;
      this.size=v;
      this.setSize();
    });
  }
  setSize(){
    document.execCommand('fontSize',false,this.size);
  }
  constructor(
    private parent:parent,
    private _ts:TotalService
  ) { }
  ngOnInit() {
  }

}

