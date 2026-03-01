import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {ToastMessage} from './component/toast-message/toast-message';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    RouterLink,
    ToastMessage
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
