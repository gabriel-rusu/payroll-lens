import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messages: Map<string, string[]> = new Map<string, string[]>();

  add(key: string, message: string): void {
    const messages = this.messages.get(key) ?? [];
    this.messages.set(key, [...messages, message]);
    setTimeout(() => {
      this.messages.get(key)?.pop();
    }, 3000);
  }


  get(key: string) {
    return this.messages.get(key) ?? [];
  }
}
