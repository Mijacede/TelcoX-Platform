import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageDisplay } from './usage-display';

describe('UsageDisplay', () => {
  let component: UsageDisplay;
  let fixture: ComponentFixture<UsageDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsageDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsageDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
