import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICategory} from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  constructor(
    private httpService: HttpClient
  ) {
  }

  getAllCategories(): Observable<ICategory[]> {
    return this.httpService.get<ICategory[]>('/api/category');
  }
}
