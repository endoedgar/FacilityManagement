import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInspectionsComponent } from './view-inspections.component';

describe('ViewInspectionsComponent', () => {
  let component: ViewInspectionsComponent;
  let fixture: ComponentFixture<ViewInspectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInspectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
