import { Component, forwardRef, input, signal } from '@angular/core';
import { DropdownValue } from '../../model/dropdown.value';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-chip-dropdown',
  imports: [],
  templateUrl: './chip-dropdown.html',
  styleUrl: './chip-dropdown.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipDropdown),
      multi: true,
    },
  ],
})
export class ChipDropdown implements ControlValueAccessor {
  options = input.required<DropdownValue[]>();
  label = input.required<string>();
  protected selectedPerks: DropdownValue[] = [];
  protected expandDd: boolean = false;

  // Called by Angular when the parent form value changes
  private onChange: (value: DropdownValue[]) => void = () => {};
  // Called by Angular when the control is touched
  private onTouched: () => void = () => {};
  // Tracks disabled state
  protected isDisabled = false;

  selectPerk(perk: DropdownValue) {
    if (!this.selectedPerks.includes(perk)) {
      this.selectedPerks.push(perk);
      this.onChange(this.selectedPerks); // notify the form
    }
    this.expandDd = false;
    this.onTouched(); // mark as touched when interacted with
  }

  removePerk(perk: DropdownValue) {
    this.selectedPerks = this.selectedPerks.filter((p) => p !== perk);
    this.onChange(this.selectedPerks); // notify the form
    this.onTouched();
  }

  // Angular calls this to write a value into the component (e.g. patchValue)
  writeValue(value: DropdownValue[]): void {
    this.selectedPerks = value ?? [];
  }

  // Angular calls this to register your onChange callback
  registerOnChange(fn: (value: DropdownValue[]) => void): void {
    this.onChange = fn;
  }

  // Angular calls this to register your onTouched callback
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  protected hasProperty(obj: any, property: string) {
    return Object.hasOwn(obj, property);
  }

  protected prop(perk: DropdownValue, property: string) {
    return (perk as any)[property];
  }
}
