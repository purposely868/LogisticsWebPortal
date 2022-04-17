import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'user_front_nomal';

  display: boolean[] = [true, false];

  loginHandle(result: boolean) {
    if (result) this.display = [false, true];
  }
}
