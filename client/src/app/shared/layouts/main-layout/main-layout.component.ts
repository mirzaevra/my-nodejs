import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MaterialService} from '../../classes/material.service';

interface ILinks {
  url: string;
  name: string;
}

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements AfterViewInit {

  @ViewChild('floatingButton') private floatingButtonRef: ElementRef;

  public links: ILinks[] = [
    {url: '/overview', name: 'Обзор'},
    {url: '/analytics', name: 'Аналитика'},
    {url: '/history', name: 'История'},
    {url: '/order', name: 'Добавить заказ'},
    {url: '/categories', name: 'Ассортимент'},
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngAfterViewInit(): void {
    MaterialService.initFloatingButton(this.floatingButtonRef);
  }

  public logout(event: Event): void {
    event.stopPropagation();

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
