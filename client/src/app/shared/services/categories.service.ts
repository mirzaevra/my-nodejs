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

  public getAllCategories(): Observable<ICategory[]> {
    return this.httpService.get<ICategory[]>('/api/category');
  }

  public getCategoryById(id: string): Observable<ICategory> {
    return this.httpService.get<ICategory>(`/api/category/${id}`);
  }
}
