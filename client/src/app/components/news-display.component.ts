import { Component } from '@angular/core';
import { NewsService } from '../news.service';
import { Article } from '../models';

@Component({
  selector: 'app-news-display',
  templateUrl: './news-display.component.html',
  styleUrls: ['./news-display.component.css']
})
export class NewsDisplayComponent {

  news: Article[] = []

  constructor(private newsSvc: NewsService) { }
}
