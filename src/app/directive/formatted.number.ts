import { Directive, ElementRef, forwardRef, HostListener, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[formattedNumber]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormattedNumberDirective),
      multi: true,
    },
  ],
})
export class FormattedNumberDirective implements ControlValueAccessor {
  private el = inject(ElementRef<HTMLInputElement>);

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const cursor = input.selectionStart ?? 0;
    const rawBefore = input.value.slice(0, cursor).replace(/,/g, '');

    // Strip all commas and non-numeric chars
    const numeric = input.value.replace(/[^0-9]/g, '');

    if (numeric === '') {
      input.value = '';
      this.onChange(0);
      return;
    }

    // Format with commas
    const formatted = new Intl.NumberFormat('en-US').format(Number(numeric));
    input.value = formatted;

    // Restore cursor: count how many commas are before the old cursor position
    const commasAfter =
      formatted.slice(0, rawBefore.length + (formatted.length - numeric.length)).split(',').length -
      1;
    const newCursor = rawBefore.length + commasAfter;
    input.setSelectionRange(newCursor, newCursor);

    this.onChange(Number(numeric));
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched();
  }

  writeValue(value: number): void {
    this.el.nativeElement.value = value ? new Intl.NumberFormat('en-US').format(value) : '';
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  private format(value: number): string {
    return new Intl.NumberFormat('en-US').format(value); // "120,000"
  }
}
