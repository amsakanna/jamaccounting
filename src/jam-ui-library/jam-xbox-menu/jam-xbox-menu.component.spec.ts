import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamXboxMenuComponent } from './jam-xbox-menu.component';

describe('JamXboxMenuComponent', () => {
  let component: JamXboxMenuComponent;
  let fixture: ComponentFixture<JamXboxMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamXboxMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamXboxMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
