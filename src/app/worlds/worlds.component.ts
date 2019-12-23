import { Component, OnInit } from '@angular/core';

import { World } from './models/world';

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
    const world = new World(event.target.files[0]);
  }

}
