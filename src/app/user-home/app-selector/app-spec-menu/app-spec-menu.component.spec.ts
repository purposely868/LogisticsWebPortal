import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSpecMenuComponent } from './app-spec-menu.component';

describe('AppSpecMenuComponent', () => {
  let component: AppSpecMenuComponent;
  let fixture: ComponentFixture<AppSpecMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSpecMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSpecMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
