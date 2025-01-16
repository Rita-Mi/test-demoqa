import { test, expect } from "@playwright/test";
import { Navigation } from "../helpers/Navigation";
import { BaseElements } from "../pageObject/BaseElements";
import { DragAndDropTestBase } from "../helpers/DragAndDropTestBase";

test.describe ('Droppable. Simple tab @readonly', () => {
    
    test('Dropping simple element', async ({ page }) => {
        const baseElements = new BaseElements(page);
        const navigation = new Navigation(page);
        const dragAndDropTestBase = new DragAndDropTestBase(page);
        
        await page.goto('');
        await navigation.openCardByNameAndSelectSubMenu('Interactions', 'Droppable');
        await expect(await baseElements.tabByName('Simple')).toBeVisible();
        await (await baseElements.tabByName('Simple')).click();
        await expect(await baseElements.tabByName('Simple')).toHaveClass(/active/);

        //check that the element is not in the box and the box has no color
        await dragAndDropTestBase.checkDraggableNotInDroppableBox(baseElements.dragMeBox, baseElements.dropHereBox);
        
        await (baseElements.dragMeBox).dragTo(baseElements.dropHereBox);
        
        //check that the box has changed color and text
        await dragAndDropTestBase.checkDroppedBox(baseElements.dropHereBox);
    })
})