import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizRoutingModule } from './quiz-routing.module';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AngularMaterialModule } from '../module/AngularMaterialModule';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './admin/question/menu/menu.component';
import { ListQuestionComponent } from './admin/question/list-question/list-question.component';
import { AddQuestionComponent } from './admin/question/add-question/add-question.component';
import { UpdateQuestionComponent } from './admin/question/update-question/update-question.component';
import { NavBarComponent } from './admin/nav-bar/nav-bar.component';
import { SublevelMenuComponent } from './admin/nav-bar/sublevel-menu.component';




@NgModule({
  declarations: [
    AdminHomeComponent,
    MenuComponent,
    ListQuestionComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    NavBarComponent,
    SublevelMenuComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class QuizModule { }
