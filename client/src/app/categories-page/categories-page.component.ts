import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {ICategory} from '../shared/interfaces';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  public categories$: Observable<ICategory[]> | any = [];

  constructor(
    private categoriesService: CategoriesService
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  protected getCategories(): void {
    this.categories$ = this.categoriesService.getAllCategories();
  }

}
