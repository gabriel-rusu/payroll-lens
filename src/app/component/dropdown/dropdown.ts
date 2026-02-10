import {Component, effect, forwardRef, input, OnInit, output, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DictionaryValue} from '../../shared/model/dictionary.value';
import {JsonPipe} from '@angular/common';

@Component({
  standalone: true,
  imports: [
    FormsModule
  ],
  selector: 'app-dropdown',
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Dropdown),
      multi: true
    }
  ]
})
export class Dropdown implements ControlValueAccessor {
  onChange: any;
  onTouched: any;

  protected value = signal<DictionaryValue | null>(null);
  protected isDisabled: boolean = false;
  selected = output<DictionaryValue>();

  label = input.required<string>();
  options = input.required<DictionaryValue[]>();

  writeValue(obj: any): void {
    this.value.set(obj);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  protected handleChange(value: any) {
    this.value.set(value);
    this.selected.emit(value);
    this.onChange(value);
    this.onTouched();
  }

  optionsCompare(option1: any, option2: any): boolean {
    // Check if both exist and compare their unique property (e.g., 'value' or 'id')
    return option1 && option2 ? option1.value === option2.value : option1 === option2;
  }
}
