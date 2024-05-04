import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private adminService: AdminService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  questions: any;
  searchQuestionForm: FormGroup;
  listCategories: any;
  searchProductFormByCategory: FormGroup;
  contentIndexId = this.activatedRoute.snapshot.params['contentIndexId'];;
  ngOnInit(): void {
    this.getAllQuestionsByContentIndexId(this.contentIndexId);
    this.searchQuestionForm = this.fb.group({
      title: [null, [Validators.required]],
    });
    this.searchProductFormByCategory = this.fb.group({
      categoryId: [null, [Validators.required]],
    });
  }



  getAllQuestionsByContentIndexId(contentIndexId: any) {
    this.adminService.getAllQuestionsByContentIndexId(contentIndexId).subscribe((res) => {
        this.questions = res;
    });
  }

  submitForm() {
    this.questions = [];
    const title = this.searchQuestionForm.get('title')!.value;
    this.adminService.getAllQuestionsByName(title).pipe(
      map((res: any[]) => res.filter(element => element.contentIndexId === this.contentIndexId))
    ).subscribe((filteredRes) => {
      filteredRes.forEach((element) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.questions.push(element);
        console.log(this.questions);
      });
    });
  }

  deleteQuestion(id: any) {
    this.adminService.deleteQuestion(id).subscribe(
      (res) => {
        this.snackbar.open('Xóa câu hỏi thành công', 'Close', {
          duration: 5000,
        });
        this.questions = [];
      },
      (eror) => {
        this.snackbar.open('Xóa câu hỏi không thành công', 'Close', {
          duration: 5000,
        });
      }
    );
  }


}
