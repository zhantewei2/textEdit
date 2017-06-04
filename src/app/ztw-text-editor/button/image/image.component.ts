import { Component, OnInit,HostListener,Output,Input,HostBinding,ViewChild,EventEmitter} from '@angular/core';
import {parent} from '../../total.service';
import {Http,RequestOptions,Headers} from '@angular/http';
import {fadeToggle} from '../../animate/animate';
@Component({
  selector: 'ztw-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  animations:[fadeToggle()]
})
export class ImageComponent implements OnInit {
  @HostBinding('class')hostClass='btn btn-icon';
  @ViewChild('tp')tp;
  @ViewChild('tp2')tp2;
  @Input('disUpload')disUpload;
  constructor(
    public parent:parent,
    private http:Http
  ) { }
  inputHref:string;
  httpOption:any=new RequestOptions({
    headers:new Headers({'Content-Type':'text/event-stream'}),
    withCredentials:true
  });
  width:number;
  fr:any=new FileReader();
  fr2:any=new FileReader();
  @Output()imgBuffer:EventEmitter<any>=new EventEmitter();
  @HostListener('mousedown',['$event'])hostDown(e){e.preventDefault()};
  @HostListener('click')hostClick(){
    this.parent.modal.getResult(this.tp,'insertImage',true,true).then(result=>this.preRange=result);
  }
  modal:string='url';
  buffer:any;
  imgData:any;
  parentNode:any;
  preRange:any;
  ngOnInit() {
    this.fr.onload=(e)=>{
      this.buffer=e.target.result;
    };
    this.fr2.onload=(e)=>{
      this.imgData=e.target.result;
    }
  }
  ngAfterViewInit(){
    this.parentNode=this.parent.textarea.nativeElement.parentNode;
    this.width=this.parentNode.offsetWidth/2;
  }
  upload(){
    let next=(url)=>{
      this.addPicture(url);
    };
    let fn=(callback)=>{
      callback(this.buffer,next);
    };
    this.imgBuffer.emit(fn);
  }
  fileChange(e){
    let node =e.target;
    let oFile=node.files[0];
    this.fr.readAsArrayBuffer(oFile);
    this.fr2.readAsDataURL(oFile);

  }

  reEl:any;
  clearRe(){
    let parent=this.reEl.parentNode;
    parent.removeChild(this.reEl);
    parent.style.boxShadow='none';
    this.reEl=null;
  }
  addPicture(address){
    this.parent.modal.close();
    console.log(this.preRange);
    if(!this.preRange)return;
    let img=document.createElement('img'),
      a=document.createElement('a');
    a.appendChild(img);
    a.contentEditable='false';
    this.parent.addStyle(a,{
      position:'relative',
      display:'inline-block'
    });
    img.src=address;
    img.addEventListener('dblclick',()=>{
      if(this.reEl)return this.clearRe();
      a.style.boxShadow='0 0 5px 5px gainsboro';
      this.reEl=document.createElement('button');
      let res=this.reEl,body=document.querySelector('body');
      this.parent.addStyle(res,{
        position:'absolute',
        right:0,
        bottom:0
      });
      res.className='fa fa-arrows-alt btn btn-default';
      res.draggable=true;
      res.addEventListener('dragstart',(e)=>{
         let h=img.offsetHeight-e.clientY,nowH,
         mouseover=(e)=>{
            nowH=h+e.clientY;
            if(nowH<20)return;
            img.style.height=nowH+'px';
          },
          mouseup=()=>{
            res.removeEventListener('dragend',mouseup);
            res.removeEventListener('drag',mouseover);
        };
        res.addEventListener('drag',mouseover);
        res.addEventListener('dragend',mouseup);
      });
      a.appendChild(res);
      let outClick=()=>{
        if(this.reEl)this.clearRe();
        body.removeEventListener('click',outClick);
      };
      body.addEventListener('click',outClick);
    });
    this.preRange.insertNode(a);
    this.parent.resetFocus(a);
    this.inputHref=null;
  }
}
