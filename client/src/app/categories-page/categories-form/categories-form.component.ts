import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MaterialService} from '../../shared/classes/material.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  public form: FormGroup;
  public isNew = true;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
  ) {
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.form.disable();

    this.route.params.pipe(
      switchMap((params: Params) => {
        if (params.id) {
          this.isNew = false;

          return this.categoriesService.getCategoryById(params.id);
        }

        return of(null);
      })
    )
      .subscribe({
        next: category => {
          if (category) {
            this.form.patchValue({
              name: category.name
            });
            MaterialService.updateTextInputs();
          }

          this.form.enable();
        },
        error: error => MaterialService.toast(error.error.message)
      });
  }

  public onSubmit(): void {
    console.log(123);
  }

}
