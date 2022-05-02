import { Component, Input } from '@angular/core';
import { CategoryEntity } from 'entities/Category.entity';

@Component({
	selector: 'app-category-item',
	templateUrl: './category-item.component.html',
	styleUrls: ['./category-item.component.css'],
})
export class CategoryItemComponent {
	@Input() category!: CategoryEntity;

	constructor() {}
}