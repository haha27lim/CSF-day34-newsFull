import { Component, OnInit } from '@angular/core';
import { Article } from './models';
import { NewsService } from './news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // An array of Article objects representing the news articles obtained from the NewsService
  articles: Article[] = []

  // The constructor of the AppComponent class
  constructor(private newsSvc: NewsService) { }

  // Called after the component is initialized
  ngOnInit(): void {
    // Subscribe to new articles obtained from the NewsService
    this.newsSvc.onNewArticles.subscribe(
      p => {
        // Wait for the promise to resolve, then assign data to the articles array
        p.then(data => this.articles = data)
      }
    )

  }
}
