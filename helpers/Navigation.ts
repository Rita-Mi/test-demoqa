import { Page, Locator } from "@playwright/test";
import { MainPage } from "../pageObject/pages/mainPage";
import { BaseElements } from "../pageObject/BaseElements";
import { Sidebar } from "../pageObject/Sidebar";
const { expect } = require("@playwright/test");

export class Navigation {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openCardByNameAndSelectSubMenu(cardName: string, subMenuName: string) {
        const mainPage = new MainPage(this.page);
        const sidebar = new Sidebar(this.page);
        const baseElements = new BaseElements(this.page);

        await (await mainPage.cardByName(cardName)).scrollIntoViewIfNeeded();
        await expect(await mainPage.cardByName(cardName)).toBeVisible();
        await (await mainPage.cardByName(cardName)).click();
        await expect(this.page).toHaveURL(new RegExp('/interaction$'));
        await (await sidebar.subMenuByName(subMenuName)).scrollIntoViewIfNeeded();
        await expect(await sidebar.subMenuByName(subMenuName)).toBeVisible();
        await (await sidebar.subMenuByName(subMenuName)).click();
        await expect(await sidebar.subMenuByName(subMenuName)).toHaveClass(/active/);
        await expect(baseElements.title).toHaveText(subMenuName);
    }

    async goToTab(name: string) {
        const baseElements = new BaseElements(this.page);

        await expect(await baseElements.tabByName(name)).toBeVisible();
        await(await baseElements.tabByName(name)).click();
        await expect(await baseElements.tabByName(name)).toHaveClass(/active/);
    }
} 