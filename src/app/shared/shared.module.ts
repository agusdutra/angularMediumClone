import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ArticleMetaComponent } from './article-helpers';
import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    ArticleMetaComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    ListErrorsComponent,
    ShowAuthedDirective
  ],
  exports: [
    ArticleMetaComponent,
    CommonModule,
    FollowButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FavoriteButtonComponent,
    ListErrorsComponent,
    RouterModule,
    ShowAuthedDirective
  ]
})
export class SharedModule { }
