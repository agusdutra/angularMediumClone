import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {ApiService} from './api.service';
import {Article, ArticleListConfig} from '../models';
import {HttpParams} from '@angular/common/http';
import {hasOwnProperty} from 'tslint/lib/utils';

@Injectable()
export class ArticlesService {
  constructor(
    private apiService: ApiService
  ) {
  }

  query(config: ArticleListConfig): Observable<{ articles: Article[], articlesCount: number }> {
    // Convert any filters over to Angular's URLSearchParams
    let params: HttpParams = new HttpParams();

    for (let key in config.filters) {
      if (hasOwnProperty(config.filters, key)) {
        params.set(key, config.filters[key]);
      }
    }
    return this.apiService
      .get('/articles' + ((config.type === 'feed') ? '/feed' : ''), params)
      .map(data => data);
  }

  get(slug): Observable<Article> {
    return this.apiService.get('/articles/' + slug)
      .map(data => data.article);
  }

  save(article): Observable<Article> {
    // If we're updating an existing article
    if (article.slug) {
      return this.apiService.put('/articles/' + article.slug, {article: article})
        .map(data => data.article);

      // Otherwise, create a new article
    } else {
      return this.apiService.post('/articles/', {article: article})
        .map(data => data.article);
    }
  }

  destroy(slug) {
    return this.apiService.delete('/articles/' + slug);
  }

  favorite(slug): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }

}
