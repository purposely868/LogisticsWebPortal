import { Directive, OnDestroy, OnInit } from '@angular/core';
import { FormValidationServiceService } from 'src/app/form-validation-service.service';

@Directive({
  selector: '[appFormValidationSpy]',
})
export class FormValidationSpyDirective implements OnInit, OnDestroy {
  constructor(private serv: FormValidationServiceService) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {}
}
