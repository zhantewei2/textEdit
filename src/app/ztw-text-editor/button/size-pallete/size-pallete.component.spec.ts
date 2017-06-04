import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizePalleteComponent } from './size-pallete.component';

describe('SizePalleteComponent', () => {
  let component: SizePalleteComponent;
  let fixture: ComponentFixture<SizePalleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizePalleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizePalleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
