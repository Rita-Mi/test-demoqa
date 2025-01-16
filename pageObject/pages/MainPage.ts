import { Locator, Page } from "@playwright/test";
import config from "../../playwright.config";

export class MainPage {
    page: Page;
    cards: Locator;


    constructor(page: Page) {
        this.page = page;
        this.cards = page.locator(".card");

    }

    async cardByName(name: any){
        return this.cards.filter({ hasText: new RegExp('^' + name + '$')});
    }
}