import { Component,ViewContainerRef,ComponentFactoryResolver,ViewChild,HostBinding,HostListener} from '@angular/core';
import {fadeToggle,pop} from '../animate/animate';
import {TotalService,parent} from '../total.service';
import {Subject} from 'rxjs/Subject';
@Component({
  selector: 'ztw-text-editor-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations:[
    fadeToggle(),
    pop()
  ]
})
export class ModalComponent{
  constructor(
    private _cfr:ComponentFactoryResolver,
    public _ts:TotalService,
    public parent:parent
  ) { }
  containerTitle:string;
  @HostBinding('@FadeToggle')show:string='hidden';
  @HostListener('click')hostClick(){
    this.close();
  }
  @ViewChild('container',{read:ViewContainerRef})container;
  sub:any;
  preRange:any;
  closeSubject:Subject<number>=new Subject();
  focus(){
    if(!this.preRange)return;
    let sel=window.getSelection();
    sel.removeAllRanges();
    sel.addRange(this.preRange);
    this.preRange=null;
  }
  appendComponent(component,title,embedded){
    if(!component)return;
    this.container.clear();
    if(embedded){
      this.container.createEmbeddedView(component);
    }else {
      this.container.createComponent(this._cfr.resolveComponentFactory(component));
    }
    this.containerTitle=title;
    setTimeout(()=>{
      this.show='show';
    },1)
  }
  getResult(component,title,embedded=false,useFocus=false){
    return new Promise(resolve=>{
      if(this.show=='show'){
        this.close();
        return resolve(false);
      }
      this.appendComponent(component,title,embedded);
        ((fn)=>{
          if (useFocus) {
            let range;
            try {
              range = window.getSelection().getRangeAt(0);
            } catch (e) {}
            if (!range)return fn(false);
            if (!this.parent.findParent(range.startContainer))return fn(false);
            this.preRange = range;
            return fn(range);
          }
          return fn(false);
        })((result)=>{
          if(embedded)return resolve(result);
          this.sub=this._ts.selected.subscribe((v:any)=>{
            this.sub.unsubscribe();
            this.sub=null;
            this.close();
            resolve(v);
          });
        });
    });
  }
  close(){
    if(this.sub){
      this.sub.unsubscribe();
      this.sub=null;
    }
    if(this.preRange)this.focus();
    this.show='hidden';
    this.closeSubject.next(1);
  }
}
