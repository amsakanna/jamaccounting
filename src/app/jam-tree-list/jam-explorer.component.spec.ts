import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamTreeListComponent } from './jam-tree-list.component';

describe('JamTreeListComponent', () => {
  let component: JamTreeListComponent;
  let fixture: ComponentFixture<JamTreeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamTreeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamTreeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
