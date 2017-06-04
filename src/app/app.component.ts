import { Component ,ViewChild,Renderer2,ViewContainerRef,ElementRef} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title ='app works!';
  @ViewChild('textEdit')textEdit;
  uploadImg(e){
    e((imgBuffer,next)=>{
      console.log(imgBuffer);
      next('http://picture-address.jpg');
    })
  }
  ngOnInit(){

  }
  getResult(){
    let html=this.textEdit.getHTML();
    console.log(html);
  }
}

