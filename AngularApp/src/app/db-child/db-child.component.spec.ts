import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbChildComponent } from './db-child.component';

describe('DbChildComponent', () => {
  let component: DbChildComponent;
  let fixture: ComponentFixture<DbChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
