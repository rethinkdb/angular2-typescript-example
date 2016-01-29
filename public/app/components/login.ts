
import {Component, View, EventEmitter} from "angular2/core";

@Component({
  selector: "chat-login",
  events: ["doLogin: login"]
})
@View({
  template: `
  <div class="login">
    <input #username (keyup)="keyPress($event, username.value)" placeholder="Type your username here" />
    <button (click)="login(username.value)">Login</button>
  </div>
  `
})
export class ChatLogin {
  doLogin = new EventEmitter();

  login(username: string) {
    this.doLogin.next(username);
  }

  keyPress(event: KeyboardEvent, username: string) {
    if (event.keyCode === 13)
      this.login(username);
  }
}
