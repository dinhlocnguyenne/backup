import { Component } from '@angular/core';
import { GcPdfViewer } from '@grapecity/gcpdfviewer';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-render-pdf',
  templateUrl: './render-pdf.component.html',
  styleUrls: ['./render-pdf.component.css']
})
export class RenderPdfComponent {
  link: string = ""
  constructor(
    activatedRoute: ActivatedRoute
  ){
    activatedRoute.queryParams.subscribe(params => {
      this.link = params['doc']
    })
  }

  

  ngAfterViewInit() {
    const viewer = new GcPdfViewer("#viewer", {
      workerSrc: "//node_modules/@grapecity/gcpdfviewer/gcpdfviewer.worker.js",
      restoreViewStateOnLoad: false
    });
    viewer.addDefaultPanels();
    viewer.open("assets/" + this.link + ".pdf")
  }
}
