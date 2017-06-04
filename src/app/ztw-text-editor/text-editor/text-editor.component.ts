import { Component, OnInit ,ViewChild,forwardRef,Output,EventEmitter} from '@angular/core';
import {TotalService,parent} from '../total.service';
import {tabKey} from '../shortcut-key/tab'
import {FilterHTML} from '../ts/filterHTML';
interface btn{
  name:string,
  fn:any
}
@Component({
  selector: 'ztw-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
  providers:[{provide:parent,useExisting:forwardRef(()=>TextEditorComponent)}]
})
export class TextEditorComponent implements OnInit {
  constructor(
    private _ts:TotalService
  ) { };
  @ViewChild('modal')modal;
  @ViewChild('textarea')textarea;
  textNode:any;
  exec:any=(data)=>{
    return ()=> {
      document.execCommand(data);
    }
  };
  findParent(node){
    if(node==this.textarea.nativeElement)return true;
    if(node.nodeName=='BODY')return false;
    return this.findParent(node.parentNode);
  }
  buttonArr:Array<btn>=[
    {name:'undo',fn:this.exec('undo')},
    {name:'bold',fn:this.exec('bold')},
    {name:'italic',fn:this.exec('italic')},
    {name:'align-left',fn:this.exec('justifyLeft')},
    {name:'align-center',fn:this.exec('justifyCenter')},
    {name:'align-right',fn:this.exec('justifyRight')}
  ];
  ngOnInit() {
    this.textNode=this.textarea.nativeElement;
    tabKey(this.textNode);
    this.managePaste();
  }
  resetFocus(node){
    setTimeout(()=>{
      let range=document.createRange(),sel=window.getSelection();
      range.setStartAfter(node);
      sel.removeAllRanges();
      sel.addRange(range);
    },1)
  }
  addStyle(node,style){
    for(let i in style){
      node.style[i]=style[i];
    }
  }
  getHTML(e){
    let node2=e.target;
    let node1=document.getElementById('ztw_textEditor');
    node2.innerText=node1.innerHTML;
  }
  buttonFn:any={
    unlink:()=>{
      document.execCommand('unlink');
    }
  };
  @Output('uploadImg')uploadImg:EventEmitter<any>=new EventEmitter();
  managePaste(){
    this.textNode.addEventListener('paste',(e)=>{
      e.preventDefault();
      let filterHTML=new FilterHTML(),
        html=e.clipboardData.getData('text/html'),
        result=filterHTML.filter(html);
      let div=document.createElement('div'),sel=window.getSelection();
      div.innerHTML=result;
      sel.getRangeAt(0).insertNode(div);
      this.resetFocus(div);
      //document.execCommand('insertHTML',false,result);
    })
  }
}
