import {bootstrap} from "angular2/platform/browser";
import {Component, View} from "angular2/core";
import {NgFor, NgSwitch, NgSwitchWhen} from "angular2/common";

import {ChatMessage} from "./components/message";
import {ChatLogin} from "./components/login";
import {ChatInput} from "./components/input";

import {ChatMessageRecord} from "./interfaces";

@Component({selector: "chat-app"})
@View({
  template: `
  <div class="inner" [ngSwitch]="username == undefined">
    <template [ngSwitchWhen]="true">
      <chat-login (login)="onLogin($event)"></chat-login>
    </template>
    <template [ngSwitchWhen]="false">
      <div class="messages">
        <chat-message *ngFor="#m of messages" [message]="m"></chat-message>
      </div>
      <chat-input (message)="onMessage($event)"></chat-input>
    </template>
  </div>
  `,
  directives: [
    NgSwitch, NgSwitchWhen, NgFor,
    ChatMessage, ChatInput, ChatLogin]
})
export class ChatApp {
  username: string
  messages: Array<ChatMessageRecord>

  onMessage(message: string) {
    fetch("/api/messages/create", {method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({user: this.username, text: message})
    });
  }

  async onLogin(username: string) {
    this.username = username;
    this.messages = await (await fetch("/api/messages")).json();
    io.connect().on("message", message => {
      this.messages.push(message)
      console.log("New message:", message);
    });
  }
}
