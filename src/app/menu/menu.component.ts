import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut } from '../app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut()
    ]
})
export class MenuComponent implements OnInit {

  constructor(private dishService: DishService) { }

  dishes: Dish[];

  selectedDish = null;
  
  errMess: string;
  ngOnInit() {

    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
