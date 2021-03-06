import { Component } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
	selector: 'app-default-layout',
	templateUrl: './default-layout.component.html',
	styleUrls: ['./default-layout.component.css'],
})
export class DefaultLayoutComponent {
	toggled$ = this.menuService.toggled$;

	constructor(private menuService: MenuService) {}
}
