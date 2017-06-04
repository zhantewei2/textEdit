import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ModalComponent } from './modal/modal.component';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import {TotalService} from './total.service';
import { FontColorComponent } from './button/font-color/font-color.component';
import { FontSizeComponent} from './button/font-size/font-size.component';
import { SizePalleteComponent } from './button/size-pallete/size-pallete.component';
import { HrefComponent } from './button/href/href.component';
import { DivideComponent } from './button/divide/divide.component';
import { ImageComponent } from './button/image/image.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [TextEditorComponent, ModalComponent, ColorPaletteComponent, FontColorComponent, FontSizeComponent, SizePalleteComponent, HrefComponent, DivideComponent, ImageComponent],
  entryComponents:[ColorPaletteComponent,SizePalleteComponent],
  providers:[TotalService],
  exports:[TextEditorComponent]
})
export class ZtwTextEditorModule { }
