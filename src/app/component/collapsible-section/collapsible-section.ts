import {Component, input} from '@angular/core';

@Component({
  selector: 'app-collapsible-section',
  imports: [],
  templateUrl: './collapsible-section.html',
  standalone: true,
  styleUrl: './collapsible-section.css'
})
export class CollapsibleSection {
   title = input.required<string>();


}
