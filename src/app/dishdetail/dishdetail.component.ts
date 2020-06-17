import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { visibility } from '../app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    visibility()
  ]
})
export class DishdetailComponent implements OnInit {
    dish: Dish;
    dishIds: string[];
    prev: string;
    next: string;
    visibility = 'shown';

    constructor(private dishService: DishService,
      private route: ActivatedRoute,
      private location: Location) { }  
    ngOnInit() {
      this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

      this.route.params.pipe(switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishService.getDish(params['id'])}))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id);this.visibility = 'shown'; });
      /*
      Animation  
      this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess); 
      */
    }

    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }
    

  goBack(): void {
    this.location.back();
  }

}
