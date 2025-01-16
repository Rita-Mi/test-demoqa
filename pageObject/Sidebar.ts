import { Locator, Page } from "@playwright/test";

export class Sidebar {
    page: Page;
    menuBar: Locator;
    activeMenu: Locator;
    subMenu: Locator;

    constructor(page: Page) {
        this.menuBar = page.locator('.left-pannel');
        this.activeMenu = this.menuBar.locator('.element-group > .show');
        this.subMenu = this.activeMenu.locator('li');
    }

    async subMenuByName(name: string){
        return this.subMenu.filter({ hasText: new RegExp('^' + name + '$')});
    }
}