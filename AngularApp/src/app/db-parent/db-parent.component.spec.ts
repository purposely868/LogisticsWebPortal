import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbParentComponent } from './db-parent.component';

describe('DbParentComponent', () => {
  let component: DbParentComponent;
  let fixture: ComponentFixture<DbParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
