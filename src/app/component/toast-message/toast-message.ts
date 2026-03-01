import {Component, ElementRef, input} from '@angular/core';
import {ToastService} from '../../shared/service/toast.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-toast-message',
  imports: [
    NgClass
  ],
  templateUrl: './toast-message.html',
  styleUrl: './toast-message.css',
})
export class ToastMessage {
  key = input.required<string>();

  constructor(protected toastService: ToastService) {
  }

}
