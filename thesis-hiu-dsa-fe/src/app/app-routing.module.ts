import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { DocumentComponent } from './components/documentation/document/document.component';
import { RenderPdfComponent } from './components/documentation/render-pdf/render-pdf.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '', pathMatch: 'full', component: HomePageComponent },

  { path: 'signup', component: SignupComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'books', component: DocumentComponent },
  {
    path: 'pdf',
    component: RenderPdfComponent,
  },

  {
    path: 'assistance',
    loadChildren: () =>
      import('./chatbot/chatbot.module').then((m) => m.ChatbotModule),
  },
  {
    path: 'quiz',
    loadChildren: () =>
      import('./quiz/quiz.module').then((m) => m.QuizModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
