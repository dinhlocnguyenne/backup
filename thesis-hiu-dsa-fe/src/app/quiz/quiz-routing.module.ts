import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { MenuComponent } from './admin/question/menu/menu.component';
import { ListQuestionComponent } from './admin/question/list-question/list-question.component';
import { AddQuestionComponent } from './admin/question/add-question/add-question.component';
import { UpdateQuestionComponent } from './admin/question/update-question/update-question.component';
const routes: Routes = [
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'question/menu', component: MenuComponent }, 
  { path: 'question/add-question', component: AddQuestionComponent },
  { path: 'question/contentIndex/:contentIndexId', component: ListQuestionComponent },            
  { path: 'question/update-question/:questionId', component: UpdateQuestionComponent },   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
