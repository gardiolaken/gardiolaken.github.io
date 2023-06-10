import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BstVisualizationComponent } from './bst-visualization.component';

describe('BstVisualizationComponent', () => {
  let component: BstVisualizationComponent;
  let fixture: ComponentFixture<BstVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BstVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BstVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
