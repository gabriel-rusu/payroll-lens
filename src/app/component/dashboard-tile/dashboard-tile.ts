import {Component, input, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {TileImage} from '../../shared/model/tile.image.model';

@Component({
  selector: 'app-dashboard-tile',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './dashboard-tile.html',
  styleUrl: './dashboard-tile.css'
})
export class DashboardTile {
  name = input.required<string>();
  image =  input.required<TileImage>();
  redirect = input.required<string>();


}
