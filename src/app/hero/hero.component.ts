import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls:  ['./hero.component.css']
})
export class HeroComponent {
  @Input() hero: Hero;
  @Output() deleteFromChild = new EventEmitter();

  onDeleteClick($event): void {
    $event.stopPropagation();
    this.deleteFromChild.next();
  }
}
