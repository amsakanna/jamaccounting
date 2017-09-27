import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamAccordionItemComponent } from './jam-accordion-item.component';

describe('JamAccordionItemComponent', () => {
  let component: JamAccordionItemComponent;
  let fixture: ComponentFixture<JamAccordionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamAccordionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
