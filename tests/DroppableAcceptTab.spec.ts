import { test, expect } from "@playwright/test";
import { Navigation } from "../helpers/Navigation";
import { BaseElements } from "../pageObject/BaseElements";
import { DragAndDropTestBase } from "../helpers/DragAndDropTestBase";

test.describe ('Droppable. Accept tab @readonly', () => {
    
    test.beforeEach('Login', async ({ page }) => {
        const navigation = new Navigation(page);

        await page.goto('');
        await navigation.openCardByNameAndSelectSubMenu('Interactions', 'Droppable');
        await navigation.goToTab('Accept');
    })

    test('Dropping Acceptable element', async ({ page }) => {
        const baseElements = new BaseElements(page);
        const dragAndDropTestBase = new DragAndDropTestBase(page);
        const acceptableElement = baseElements.activeTab.locator('#acceptable');

        //check that the element is not in the box and the box has no color
        await dragAndDropTestBase.checkDraggableNotInDroppableBox(acceptableElement, baseElements.dropHereBox);
        await expect(acceptableElement).toHaveText('Acceptable');
        await expect(baseElements.dropHereBox).toHaveText('Drop here');
        
        const dropHereBoundingBox: any = await baseElements.dropHereBox.boundingBox();
        await acceptableElement.hover();
        await page.mouse.down();
        await page.mouse.move(dropHereBoundingBox.x + dropHereBoundingBox.width / 2, 
            dropHereBoundingBox.y + dropHereBoundingBox.height / 2, { steps: 5 });
        //check that when the element is hovered over the box, the box changes color to green
        await expect(baseElements.dropHereBox).toBeVisible();
        await expect(baseElements.dropHereBox).toHaveText('Drop here');
        await expect(baseElements.dropHereBox).not.toHaveClass(/ui-state-highlight/);
        await expect(baseElements.dropHereBox).toHaveClass(/ui-active/);
        await page.mouse.up();
        
        //check that the box has changed color and text
        await dragAndDropTestBase.checkDroppedBox(baseElements.dropHereBox);
    })

    test('Dropping Not Acceptable element', async ({ page }) => {
        const baseElements = new BaseElements(page);
        const dragAndDropTestBase = new DragAndDropTestBase(page);
        const notAcceptableElement = baseElements.activeTab.locator('#notAcceptable');

        //check that the element is not in the box and the box has no color
        await dragAndDropTestBase.checkDraggableNotInDroppableBox(notAcceptableElement, baseElements.dropHereBox)
        await expect(notAcceptableElement).toHaveText('Not Acceptable');
        await expect(baseElements.dropHereBox).toHaveText('Drop here');
        const dropHereBoundingBox: any = await baseElements.dropHereBox.boundingBox();

        await notAcceptableElement.hover();
        await page.mouse.down();
        await page.mouse.move(dropHereBoundingBox.x + dropHereBoundingBox.width / 2, 
            dropHereBoundingBox.y + dropHereBoundingBox.height / 2, { steps: 5 });
        //check that when the element is hovered over the box, the box don't changes color to green
        await expect(baseElements.dropHereBox).toBeVisible();
        await expect(baseElements.dropHereBox).toHaveText('Drop here');
        await expect(baseElements.dropHereBox).not.toHaveClass(/ui-state-highlight/);
        await expect(baseElements.dropHereBox).not.toHaveClass(/ui-active/);
        await page.mouse.up();
        
        //check that the box hasn't changed color and text
        await dragAndDropTestBase.checkNotDroppedBox(baseElements.dropHereBox);
    })
})