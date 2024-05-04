import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
interface ContentIndex {
  id: number;
  title: string;
  parentId: number | null; // parent_id có thể là null nếu không có parent
  children?: ContentIndex[]; // Trường này sẽ được tạo tự động sau khi xử lý dữ liệu thành cây
  level?: number;
}
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {}
  contentIndexId = this.activatedRoute.snapshot.params['contentIndexId'];
  questionForm: FormGroup;
  selectedFile: File ;
  listContentIndex: any = [];
  imagePreview: string | ArrayBuffer | null;
  rootContent: any = [];
  
  onFileSelectd(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: [null, [Validators.required]],
      answerA: [null, [Validators.required]],
      answerB: [null, [Validators.required]],
      answerC: [null, [Validators.required]],
      answerD: [null, [Validators.required]],
      correctAnswer: [null, [Validators.required]],
      DF: [null, [Validators.required]],
      DI: [null, [Validators.required]],
      bloomTaxonomy: [null, [Validators.required]],
      contentIndexId: [null, [Validators.required]],
    });
    this.getAllContentIndex();
  }
  getAllContentIndex() {
    this.adminService.getAllContentIndex().subscribe(data => {
      // Xử lý dữ liệu trả về từ backend để tính toán level
      this.listContentIndex = this.calculateLevel(data);
      // Lọc ra các phần tử có level = 1
      this.rootContent = this.listContentIndex.filter(item => item.level === 1);
    });
  }
  calculateLevel(data: any[]): any[] {
    // Tạo một bản sao của mảng dữ liệu để không thay đổi dữ liệu gốc
    const clonedData = JSON.parse(JSON.stringify(data));
    // Tạo một map để lưu trữ các phần tử theo id
    const idMap = new Map<number, any>();
    clonedData.forEach(item => {
      idMap.set(item.id, item);
    });
    // Tính toán level cho từng phần tử
    clonedData.forEach(item => {
      if (item.parentId !== null) {
        const parent = idMap.get(item.parentId);
        if (parent) {
          item.level = parent.level + 1;
        }
      } else {
        item.level = 0; // Các phần tử không có parentId sẽ có level = 0 (root)
      }
    });
    return clonedData;
  }

  getRootContent(contentItems: ContentIndex[]): ContentIndex[] {
    return contentItems.filter(item => item.level === 0);
  }
  addQuestion() {
    if (this.questionForm.valid) {
      const formData: FormData = new FormData();
      // formData.append('img', this.selectedFile);
      formData.append('question', this.questionForm.get('question').value);
      formData.append('answerA', this.questionForm.get('answerA').value);
      formData.append('answerB', this.questionForm.get('answerB').value);
      formData.append('answerC', this.questionForm.get('answerC').value);
      formData.append('answerD', this.questionForm.get('answerD').value);
      formData.append('correctAnswer', this.questionForm.get('correctAnswer').value);
      formData.append('DF', this.questionForm.get('DF').value);
      formData.append('DI', this.questionForm.get('DI').value);
      formData.append('bloomTaxonomy', this.questionForm.get('bloomTaxonomy').value);
      formData.append('contentIndexId', this.questionForm.get('contentIndexId').value);
 
 

      this.adminService.addQuestion(formData).subscribe((res) => {
        if (res.id != null) {
          this.snackbar.open('Thêm câu hỏi thành công', 'Close', {
            duration: 5000,
          });
          this.router.navigateByUrl('/quiz/question/contentIndex/' + this.contentIndexId);
        } else {
          this.snackbar.open('Thêm câu hỏi thất bại', 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar',
          });
          this.router.navigateByUrl('/quiz/question/contentIndex/' + this.contentIndexId);
        }
      });
    } else {
      for (const i in this.questionForm.controls) {
        this.questionForm.controls[i].markAsDirty();
        this.questionForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
