import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamHorizontalListComponent } from './jam-horizontal-list.component';

describe('JamHorizontalListComponent', () => {
  let component: JamHorizontalListComponent;
  let fixture: ComponentFixture<JamHorizontalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamHorizontalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamHorizontalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
