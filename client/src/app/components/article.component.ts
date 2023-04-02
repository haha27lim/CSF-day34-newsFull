import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../models';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  // A Promise that stores the articles to be displayed
  articles$!: Promise<Article[]>

  // A list of Article objects received as an Input
  @Input()
  articles: Article[] = []

  // A boolean value indicating whether the user can share the news article or not
  canShare = false

  // The constructor of the ArticleComponent class
  constructor(private newsSvc: NewsService) { }

  // Called after the component is initialized
  ngOnInit(): void {
    // Check if the user can share the news article
    this.canShare = this.newsSvc.canShare()
    // Subscribe to the onNewArticles event of the NewsService
    this.newsSvc.onNewArticles.subscribe(
      p => {
        this.articles$ = p // Set the articles$ Promise to the newly received articles
      }
    )
  }

  // Share the specified text on the user's device
  share(text: string) {
    // Check the capability of the user's device to share the specified text
    if (this.newsSvc.canShare())
      // Share the specified text and show an alert on successful sharing
      this.newsSvc.share(text)
        .then(() => { alert('shared' )})
        .catch(error => { alert(`ERROR: ${JSON.stringify(error)}`)})
  }

}
