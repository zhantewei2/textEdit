
import {trigger,state,style,transition,animate,keyframes} from '@angular/animations';
let time='0.3s ease-out';
export function fadeToggle(t=time){
  return trigger('FadeToggle',[
    state('hidden',style({display:'none',opacity:0})),
    state('show',style({display:'flex'})),
    transition('hidden=>show',animate(t)),
    transition('show=>hidden',animate(t))
  ])
}
export function pop(t=time){
  return trigger('Pop',[
    state('hidden',style({visibility:'hidden',opacity:0})),
    state('show',style({visibility:'visible'})),
    transition('hidden=>show',[
      animate(t,keyframes([
        style({visibility:'visible',opacity:0,transform:'scale(0.5,0.5)',offset:0}),
        style({opacity:1,transform:'scale(1.2,1.2)',offset:0.7}),
        style({opacity:1,transform:'scale(1,1)',offset:1})
      ]))
    ]),
    transition('show=>hidden',[
      animate(t,style({opacity:0.5,transform:'scale(0.5,0.5)'}))
    ])
  ])
}
export function fontColor(t=time){
  return trigger('FontColor',[
    state('normal',style({})),
    state('change',style({})),
    transition('normal=>change',[
      animate(t,keyframes([
        style({'box-shadow':'0 0 6px 6px gainsboro',offset:0}),
        style({'box-shadow':'0 0 3px 3px gainsboro',transform:'scale(1.2,1.2)',offset:0.5}),
        style({'box-shadow':'none',offset:1})
      ]))
    ])
  ])
}


