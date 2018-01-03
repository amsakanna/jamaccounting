import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamTreeComponent } from './jam-tree.component';

describe('JamTreeComponent', () => {
  let component: JamTreeComponent;
  let fixture: ComponentFixture<JamTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
