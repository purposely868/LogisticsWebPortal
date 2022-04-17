import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavmenuComponent } from './app-navmenu.component';

describe('AppNavmenuComponent', () => {
  let component: AppNavmenuComponent;
  let fixture: ComponentFixture<AppNavmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppNavmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
