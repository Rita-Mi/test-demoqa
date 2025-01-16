import { expect, Locator, Page } from "@playwright/test";

export class BaseElements { 
    page: Page;
    menuList: Locator;
    title: Locator;
    tabs: Locator;
    activeTab: Locator;
    dropHereBox: Locator;
    dragMeBox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuList = page.locator('.menu-list > li');
        this.title = page.locator('.text-center');
        this.tabs = page.getByRole('tab');
        this.activeTab = page.locator('.tab-pane.active');
        this.dropHereBox = this.activeTab.locator('#droppable');
        this.dragMeBox = this.activeTab.getByText(new RegExp('^Drag Me$', 'i'));
    }

    async tabByName(name: string){
        return this.tabs.filter({ hasText: new RegExp('^' + name + '$')});
    }
}