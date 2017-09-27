import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamExplorerComponent } from './jam-explorer.component';

describe('JamExplorerComponent', () => {
  let component: JamExplorerComponent;
  let fixture: ComponentFixture<JamExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
