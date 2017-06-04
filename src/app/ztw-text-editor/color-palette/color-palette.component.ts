import { Component, OnInit,ViewChild} from '@angular/core';
import {TotalService} from '../total.service';
@Component({
  selector: 'ztw-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.css']
})
export class ColorPaletteComponent implements OnInit {
  @ViewChild('palette')palette;
  shadow:string='0 0 4px white';
  shadow2:string='0 0 4px gray';
  appendStyle(node,obj){
    for(let i in obj){
      node.style[i]=obj[i];
    }
  }
  constructor(
    private _ts:TotalService
  ) { }
  ngOnInit() {
    let size=3,rowC=7,total=0,arr=[],per=255/(size-1),node,container;
    if(this._ts.cache.fragment){
      container=this._ts.cache.fragment;
    }else {
      let fragment = document.createDocumentFragment();
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          for (let z = 0; z < size; z++) {
            node = document.createElement('span');
            this.appendStyle(node, {
              width: '1.5rem',
              height: '1.5rem',
              background: `rgb(${Math.ceil(per * x)},${Math.ceil(per * y)},${Math.ceil(per * z)})`,
              display: 'inline-block',
              borderRadius: '5px',
              margin: '2px',
              boxShadow: this.shadow,
              boxSizing: 'border-box'
            });
            fragment.appendChild(node);
            total++;
            if (total != 1 && total % rowC == 0) fragment.appendChild(document.createElement('br'));
          }
        }
      }
      container=document.createElement('div');
      container.appendChild(fragment);
      this._ts.cache.fragment=container;
    }
    this.palette.nativeElement.appendChild(container);
  }
  over(e){
    let node=e.target;
    if(node.nodeName=='SPAN'){
      this.appendStyle(node,{
        border:'1px solid white',
        cursor:'pointer',
        boxShadow:this.shadow2
      });
    }
    let outNode=e.relatedTarget;
    if(outNode.nodeName=='SPAN'){
      this.appendStyle(outNode,{
        border:'none',
        boxShadow:this.shadow
      })
    }
  }
  click(e){
    let node=e.target,color;
    if(node.nodeName!='SPAN')return;
    this._ts.selected.next(node.style.background);
  }

}
