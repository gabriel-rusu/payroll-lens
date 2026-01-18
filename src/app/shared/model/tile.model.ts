import {TileImage} from './tile.image.model';

export class Tile {
  constructor(public name: string, public image: TileImage, public redirect: string) {
  }
}
