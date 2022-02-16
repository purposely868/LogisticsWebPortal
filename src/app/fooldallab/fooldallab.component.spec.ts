import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooldallabComponent } from './fooldallab.component';

describe('FooldallabComponent', () => {
  let component: FooldallabComponent;
  let fixture: ComponentFixture<FooldallabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooldallabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooldallabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
