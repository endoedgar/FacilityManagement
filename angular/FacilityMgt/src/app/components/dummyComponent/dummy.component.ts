import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dummyComponent',
  template: '<h1>This is the goddamned index page we didn\'t have',
})
export class DummyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
