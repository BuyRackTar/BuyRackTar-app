import { CategoryFeature } from './category.reducer';
import { createSelector, Store } from '@ngrx/store';
import { CurrencySelectors } from '+state/currency.store';
import { CategoryInterface } from './interfaces';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryEntity } from '../../entities/Category.entity';

const selectCategories = createSelector(
	CategoryFeature.selectCategories,
	CurrencySelectors.selectCurrencies,
	(categories, currencies): CategoryInterface[] => {
		return categories.map(category => {
			return {
				id: category.id,
				name: category.name,
				accountId: category.accountId,
				description: category.description,
				active: category.active,
				limit: category.limit,
				currency: currencies.find(
					curr => curr.id === category.currencyId
				),
			};
		});
	}
);

const selectCategory = (
	store: Store,
	categoryId$: Observable<number>
): Observable<CategoryInterface | null> => {
	return combineLatest([store.select(selectCategories), categoryId$]).pipe(
		map(([categories, categoryId]) => {
			return categories.find(
				cat => cat.id === categoryId
			) as CategoryInterface;
		})
	);
};

const selectSimpleCategory = (
	store: Store,
	categoryId$: Observable<number>
): Observable<CategoryEntity | null> => {
	return combineLatest([
		store.select(CategoryFeature.selectCategories),
		categoryId$,
	]).pipe(
		map(
			([categories, categoryId]) =>
				categories.find(cat => cat.id === categoryId) || null
		)
	);
};

export const CategorySelectors = {
	selectSimpleCategory: selectSimpleCategory,
	selectCategory: selectCategory,
	selectCategories: selectCategories,
	selectLoading: CategoryFeature.selectLoading,
	selectCategoriesSpendings: CategoryFeature.selectSpendings,
};
