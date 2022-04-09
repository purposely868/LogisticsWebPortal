import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDbsComponent } from './child-dbs.component';

describe('ChildDbsComponent', () => {
  let component: ChildDbsComponent;
  let fixture: ComponentFixture<ChildDbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildDbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
