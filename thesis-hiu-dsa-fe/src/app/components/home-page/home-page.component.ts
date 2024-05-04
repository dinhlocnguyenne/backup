  import { Component, Input, Output, EventEmitter, OnInit, HostListener  } from '@angular/core';
  import { FormBuilder } from '@angular/forms';
  import { HomePageService } from '../../services/home-page/home-page.service';
  import { NestedTreeControl } from '@angular/cdk/tree';
  import { MatTreeNestedDataSource } from '@angular/material/tree';
  import { fadeInOut } from './helper';
  import { animate, keyframes, style, transition, trigger } from '@angular/animations';
  interface ContentIndex {
    id: number;
    title: string;
    parentId: number | null; // parent_id có thể là null nếu không có parent
    children?: ContentIndex[]; // Trường này sẽ được tạo tự động sau khi xử lý dữ liệu thành cây
    level?: number;
  }

  interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
  }
  
  @Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
    animations: [
      fadeInOut,
      trigger('rotate', [
        transition(':enter', [
          animate('1000ms', 
            keyframes([
              style({transform: 'rotate(0deg)', offset: '0'}),
              style({transform: 'rotate(2turn)', offset: '1'})
            ])
          )
        ])
      ])
    ]
  })



  export class HomePageComponent {

    treeControl = new NestedTreeControl<ContentIndex>(node => node.children);
    dataSource = new MatTreeNestedDataSource<ContentIndex>()
    constructor(
      private homePageService: HomePageService,
      private fb: FormBuilder,
      
    ) {}
    contentIndexId : any
    content : any
    ngOnInit(): void {
      this.homePageService.getAllContentIndex().subscribe(data => {
        // Xử lý dữ liệu để chuyển đổi thành dạng cây
        const treeData = this.convertToTree(data);
        this.dataSource.data = treeData;
      });
      this.screenWidth = window.innerWidth;
    }
    hasChild = (_: number, node: ContentIndex) => !!node.children && node.children.length > 0;
    // Hàm chuyển đổi dữ liệu thành dạng cây
    private convertToTree(data: ContentIndex[]): ContentIndex[] {
      const map = new Map<number, ContentIndex>();
      const roots: ContentIndex[] = [];
  
      const dataCopy = [...data];
  
      dataCopy.forEach(item => {
        map.set(item.id, { ...item, children: [] });
      });
  
      dataCopy.forEach(item => {
        if (item.parentId !== null) {
          const parent = map.get(item.parentId);
          if (parent) {
            item.level = this.calculateLevel(item, map); // Tính level của node dựa trên parent
            parent.children.push(map.get(item.id)!);
          }
        } else {
          item.level = 0; // Node gốc có level là 0
          roots.push(map.get(item.id)!);
        }
      });
  
      return roots;
    }
  
    private calculateLevel(node: ContentIndex, map: Map<number, ContentIndex>): number {
      let level = 0;
      let parentId = node.parentId;
      while (parentId !== null) {
        const parent = map.get(parentId);
        if (parent) {
          level++;
          parentId = parent.parentId;
        } else {
          break;
        }
      }
      return level;
    }
    
    getContentByContentIndexId(id:any) {
      this.homePageService
        .getContentByContentIndexId(id)
        .subscribe((res) => {
          this.content = res.content;
          console.log(this.content);    
        });
    }
    // getContentByContentIndexId(id: any) {
    //   const selectedNode = this.dataSource.data.find(node => node.id === id);
    //   if (selectedNode && selectedNode.level === 2) {
    //     if (selectedNode.children && selectedNode.children.length > 0) {
    //       // Nếu node level 2 có children, hiển thị tất cả các con của nó
    //       const childrenIds = selectedNode.children.map(child => child.id);
    //       this.content = this.getContentForNodes(childrenIds);
    //       this.scrollToNode(id);
    //       console.log(this.content);  
    //     } else {
    //       // Nếu node level 2 không có children, hiển thị nội dung của chính node đó
    //       this.homePageService
    //         .getContentByContentIndexId(id)
    //         .subscribe((res) => {
    //           this.content = res.content;
    //           console.log(this.content);    
    //         });
    //     }
    //   } else if (selectedNode && selectedNode.level >= 3) {
    //     // Nếu node có level 3 trở lên, hiển thị nội dung của node level 2 và scroll đến node đó
    //     const parentLevel2Id = this.getParentLevel2Id(selectedNode);
    //     if (parentLevel2Id) {
    //       this.content = this.getContentForNodes([parentLevel2Id]);
    //       this.scrollToNode(parentLevel2Id);
    //       console.log(this.content);  
    //     }
    //   }
    // }
    
    // private getParentLevel2Id(node: ContentIndex): number | null {
    //   let parentId = node.parentId;
    //   while (parentId !== null) {
    //     const parent = this.dataSource.data.find(item => item.id === parentId);
    //     if (parent && parent.level === 2) {
    //       return parent.id;
    //     }
    //     parentId = parent ? parent.parentId : null;
    //   }
    //   return null;
    // }
    
    // private getContentForNodes(nodeIds: number[]): string {
    //   let content = '';
    //   nodeIds.forEach(id => {
    //     this.homePageService
    //       .getContentByContentIndexId(id)
    //       .subscribe((res) => {
    //         content += res.content;
    //       });
    //   });
    //   return content;
    // }
    
    // private scrollToNode(id: number): void {
    //   const element = document.getElementById(`node-${id}`);
    //   if (element) {
    //     element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //   }
    // }
    @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
    collapsed = false;
    screenWidth = 0;
    navData = this.dataSource;
    multiple: boolean = false;
  
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.screenWidth = window.innerWidth;
      if(this.screenWidth <= 768 ) {
        this.collapsed = false;
        this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
      }
    }
  
  
    toggleCollapse(): void {
      this.collapsed = !this.collapsed;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  
    closeSidenav(): void {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
    
  }
    
  