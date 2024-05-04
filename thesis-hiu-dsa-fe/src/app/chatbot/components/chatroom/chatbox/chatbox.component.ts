import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { GptService } from 'src/app/chatbot/services/services/gpt.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
})
export class ChatboxComponent {
  constructor(private gptService: GptService, private renderer: Renderer2) {}

  messages: Array<String> = [];
  responses: Array<String> = [];

  message: string = '';
  typing = false;

  getInput(event: Event) {
    this.message = (event.target as HTMLInputElement).value;
    if (this.message == '') {
      this.typing = false;
    } else {
      this.typing = true;
    }
  }

  handleEnter() {
    if (this.message == '') {
      return;
    }
    this.typing = false;
    this.messages.push(this.message);
    var tempMessage = this.message;
    this.message = '';

    this.gptService.sendMessage(tempMessage).subscribe((response) => {
      this.responses.push(response.response);
    });
  }

  resetMessages() {
    this.messages = [];
    this.responses = [];
  }
}
