import {Component, forwardRef, input, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-switch',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './switch.html',
  styleUrl: './switch.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Switch),
      multi: true
    }
  ]
})
export class Switch implements ControlValueAccessor {

  onChange: any;
  onTouched: any;
  isDisabled: boolean = false;

  label = input.required<string>();
  value = signal(false);

  writeValue(obj: any): void {
    this.value.set(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  protected flipValue() {
    this.value.update((value) => !value);
  }

  protected handleChange(value: any) {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }
}
