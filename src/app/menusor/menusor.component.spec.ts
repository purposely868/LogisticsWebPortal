import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusorComponent } from './menusor.component';

describe('MenusorComponent', () => {
  let component: MenusorComponent;
  let fixture: ComponentFixture<MenusorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
