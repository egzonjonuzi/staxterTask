import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryChartRatesComponent } from './history-chart-rates.component';

describe('HistoryChartRatesComponent', () => {
  let component: HistoryChartRatesComponent;
  let fixture: ComponentFixture<HistoryChartRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryChartRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryChartRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
