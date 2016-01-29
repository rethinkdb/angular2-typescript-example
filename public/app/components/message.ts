import {Component, View} from "angular2/core";
import {ChatMessageRecord} from "../interfaces";

@Component({
  selector: "chat-message",
  properties: ["message: message"]
})
@View({
  template: `
  <div class="message">
    <div class="sender">{{message.user}}</div>
    <div class="time">&nbsp;({{time | date:'jms'}})</div>
    <div class="text">{{message.text}}</div>
  </div>
  `,
})
export class ChatMessage {
  message: ChatMessageRecord;

  get time() {
    return new Date(this.message.time);
  }
}
