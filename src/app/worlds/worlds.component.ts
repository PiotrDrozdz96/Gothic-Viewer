import { Component, OnInit } from '@angular/core';

import _split from 'lodash/split';

@Component({
  selector: 'app-worlds',
  templateUrl: './worlds.component.html',
  styleUrls: ['./worlds.component.css']
})
export class WorldsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openFile(event) {
    const input = event.target;
    const reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {
      // const data = (reader.result as string).split('childs');
      const data = _split(reader.result, 'childs');
      console.log(data[1]);
      console.log(data[2]);
      console.log(data[3]);
    };
  }

}
