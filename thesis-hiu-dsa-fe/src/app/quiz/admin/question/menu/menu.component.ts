
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
interface ContentIndex {
  id: number;
  title: string;
  parentId: number | null; // parent_id có thể là null nếu không có parent
  children?: ContentIndex[]; // Trường này sẽ được tạo tự động sau khi xử lý dữ liệu thành cây
  level?: number;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {}
  questions: any[] = [];
  contentindexs: any =[];
  searchQuestionForm: FormGroup;
  listContentIndex: any = [];
  searchQuestionFormByContentIndex: FormGroup;
  rootContent: any = [];

  ngOnInit(): void {
    this.getAllContentIndex();
    this.searchQuestionForm = this.fb.group({
      title: [null, [Validators.required]],
    });
    this.searchQuestionFormByContentIndex = this.fb.group({
      categoryId: [null, [Validators.required]],
    });
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


  getQuestionByContentIndexId(contentIndexId) {
    this.questions = [];
    this.adminService
      .getAllQuestionsByContentIndexId(contentIndexId)
      .subscribe((res) => {
        res.forEach((element) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.questions.push(element);
        });
      });
  }
}

