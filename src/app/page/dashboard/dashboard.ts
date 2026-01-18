import {Component} from '@angular/core';
import {Tile} from '../../shared/model/tile.model';
import {DashboardTile} from '../../component/dashboard-tile/dashboard-tile';
import {TileImage} from '../../shared/model/tile.image.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardTile
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  dashboardTiles: Tile[] = [
    new Tile('Salary Calculator', new TileImage('purse.png', 144, 144), 'salary'),
    new Tile('Vacation Tracker', new TileImage('beach-chair.png', 144, 144), 'vacation'),
    new Tile('Offer Comparison', new TileImage('compare.png', 144, 144), 'compare'),
  ]
}
