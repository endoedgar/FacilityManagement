import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dummyComponent',
  template: '<h1>404 - Not Found, My Dears</h1>'
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
