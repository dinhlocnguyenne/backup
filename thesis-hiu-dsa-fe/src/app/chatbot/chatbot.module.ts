import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatbotRoutingModule } from './chatbot-routing.module';
import { ChatboxComponent } from './components/chatroom/chatbox/chatbox.component';
import { MessageComponent } from './components/chatroom/message/message.component';
import { ResponseComponent } from './components/chatroom/response/response.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../module/AngularMaterialModule';

@NgModule({
  declarations: [
    ChatboxComponent,
    MessageComponent,
    ResponseComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ChatbotRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
})
export class ChatbotModule {}
