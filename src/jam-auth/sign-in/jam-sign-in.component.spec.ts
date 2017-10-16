import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamSignInComponent } from './jam-sign-in.component';

describe('JamSignInComponent', () => {
  let component: JamSignInComponent;
  let fixture: ComponentFixture<JamSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
