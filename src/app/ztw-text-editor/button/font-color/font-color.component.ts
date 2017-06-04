import { Component, OnInit,HostListener,HostBinding,ElementRef} from '@angular/core';
import {ColorPaletteComponent} from '../../color-palette/color-palette.component';
import {parent} from '../../total.service';
import {fontColor} from '../../animate/animate';
@Component({
  selector: 'ztw-font-color',
  templateUrl: './font-color.component.html',
  styleUrls: ['./font-color.component.css'],
  animations:[fontColor('0.5s ease-in-out')]
})
export class FontColorComponent implements OnInit {
  color:string='black';
  colorAn:string='normal';
  constructor(
    private parent:parent,
    private _el:ElementRef
  ) { }
  @HostBinding('className')hostClass='between dbBtn';
  selectColor(){
    this.parent.modal.getResult(ColorPaletteComponent,'palette',false,true).then((v:any)=>{
      if(!v)return;
      this.color=v;
      this.colorAn='change';
      this.setColor();
    })
  }
  setColor(){
    document.execCommand('foreColor',true,this.color);
  }
  ngOnInit() {
  }

}
