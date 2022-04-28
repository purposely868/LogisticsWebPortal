import { Component, OnInit } from '@angular/core';
import { SessionStorageContentService } from 'src/app/services/session-storage-content.service';

@Component({
  selector: 'app-user-news',
  templateUrl: './user-news.component.html',
  styleUrls: ['./user-news.component.scss'],
})
export class UserNewsComponent implements OnInit {
  constructor(private contentSession: SessionStorageContentService) {}

  contentNews: string[][] = [];
  contentUpdate: string[][] = [];

  ngOnInit(): void {
    this.contentSession.myContetData$.subscribe((x) => {

      if (x) {

        for (let i = 0; i < 3; i++) {
          this.contentNews.push([
            x.newsImage[i],
            x.newsTitle[i],
            x.newsParagraph[i],
          ]);

          this.contentUpdate.push([
            x.changesImage[i],
            x.changesParagraph[i],
            x.changesTitle[i],
          ]);
        }
      }
    });
  }
}
