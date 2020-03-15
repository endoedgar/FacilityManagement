import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { ReloadToken } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) { }
  
  ngOnInit() {
    this.store.dispatch(new ReloadToken);
  }
}

