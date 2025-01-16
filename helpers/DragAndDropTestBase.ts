import { Page, Locator } from "@playwright/test";
import { MainPage } from "../pageObject/pages/mainPage";
import { BaseElements } from "../pageObject/BaseElements";
import { Sidebar } from "../pageObject/Sidebar";
const { expect } = require("@playwright/test");

export class DragAndDropTestBase {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async checkDroppedBox(dropBox: Locator) {
        await expect(dropBox).toBeVisible();
        await expect(dropBox.locator('p').first()).toHaveText('Dropped!');
        await expect(dropBox).toHaveClass(/ui-state-highlight/);
        await expect(dropBox).not.toHaveClass(/ui-active/); 
    }

    async checkNotDroppedBox(dropBox: Locator) {
        await expect(dropBox).toBeVisible();
        await expect(dropBox.locator('p').first()).not.toHaveText('Dropped!');
        await expect(dropBox).not.toHaveClass(/ui-state-highlight/);
        await expect(dropBox).not.toHaveClass(/ui-active/);
    }

    async checkDraggableNotInDroppableBox(draggableElement: Locator, dropBox: Locator) {
        await expect(draggableElement).toBeVisible();
        await expect(dropBox).toBeVisible();
        await expect(dropBox).not.toHaveClass(/ui-state-highlight/);
        await expect(dropBox).not.toHaveClass(/ui-active/);
        const dragBoundingBox: any = await draggableElement.boundingBox();
        const dropBoundingBox: any = await dropBox.boundingBox();
        expect(dragBoundingBox.x).toBeLessThan(dropBoundingBox.x);
    }

    async dragToRightAndUp(draggableElement: Locator, elementBoundingBox: any) {
        await draggableElement.hover();
        await this.page.mouse.down();
        await this.page.mouse.move(elementBoundingBox.x + elementBoundingBox.width * 2, 
            elementBoundingBox.y - elementBoundingBox.height * 2, { steps: 5 });
        await this.page.mouse.up();
        await expect(draggableElement).toBeVisible();
        await expect(draggableElement).not.toHaveClass(/ui-draggable-dragging/);
    }

    async dragToLeftAndDown(draggableElement: Locator, elementBoundingBox: any) {
        await draggableElement.hover();
        await this.page.mouse.down();
        await this.page.mouse.move(elementBoundingBox.x - elementBoundingBox.width * 2, 
            elementBoundingBox.y + elementBoundingBox.height * 2, { steps: 5 });
        await this.page.mouse.up();
        await expect(draggableElement).toBeVisible();
        await expect(draggableElement).not.toHaveClass(/ui-draggable-dragging/);
    }
} 