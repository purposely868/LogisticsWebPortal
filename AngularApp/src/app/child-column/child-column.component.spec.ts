import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildColumnComponent } from './child-column.component';

describe('ChildColumnComponent', () => {
  let component: ChildColumnComponent;
  let fixture: ComponentFixture<ChildColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
