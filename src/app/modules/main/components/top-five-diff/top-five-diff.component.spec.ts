import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFiveDiffComponent } from './top-five-diff.component';

describe('TopFiveDiffComponent', () => {
  let component: TopFiveDiffComponent;
  let fixture: ComponentFixture<TopFiveDiffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopFiveDiffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFiveDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
