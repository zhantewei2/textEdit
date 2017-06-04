import { Component ,ViewChild,Renderer2,ViewContainerRef,ElementRef} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title ='app works!';
  @ViewChild('loading1')loading1;
  uploadImg(e){
    e((a,next)=>{
      console.log(a);
      next('aaa');
    })
  }
  aa:boolean=false;
  index:number=0;
  @ViewChild('div1')div1;
  constructor(
    private renderer2:Renderer2,
    private _vcr:ViewContainerRef,
    private _el:ElementRef
  ){}
  next(){
      console.log(this.div1.nativeElement)
    let div=this.renderer2.createElement('div');
      console.log(div);
  }
}

