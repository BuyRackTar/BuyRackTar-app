import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryViewComponent } from './components/category-view/category-view.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoryRoutingModule } from './category.routing';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { StoreModule } from '@ngrx/store';
import { CategoryFeature, CategoryEffects } from './+state';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
	declarations: [
		CategoryViewComponent,
		CategoryItemComponent,
		CategoriesTableComponent,
	],
	imports: [
		CommonModule,
		StoreModule.forFeature(CategoryFeature),
		EffectsModule.forFeature([CategoryEffects]),
		CategoryRoutingModule,
		TuiIslandModule,
		TuiButtonModule,
	],
})
export class CategoryModule {}