import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildTblComponent } from './child-tbl.component';

describe('ChildTblComponent', () => {
  let component: ChildTblComponent;
  let fixture: ComponentFixture<ChildTblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildTblComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildTblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
