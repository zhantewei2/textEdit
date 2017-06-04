import { Component, OnInit ,ViewChild} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @ViewChild('tp1')tp1;
  constructor() { }

  ngOnInit() {
  }

}
