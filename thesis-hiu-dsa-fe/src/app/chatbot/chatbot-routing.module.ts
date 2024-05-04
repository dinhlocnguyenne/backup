import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatboxComponent } from './components/chatroom/chatbox/chatbox.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chatbot', component: ChatboxComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatbotRoutingModule {}
