import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamAccordionComponent } from './jam-accordion.component';

describe('JamAccordionComponent', () => {
  let component: JamAccordionComponent;
  let fixture: ComponentFixture<JamAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
