import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminContactComponent } from './user-admin-contact.component';

describe('UserAdminContactComponent', () => {
  let component: UserAdminContactComponent;
  let fixture: ComponentFixture<UserAdminContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAdminContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
