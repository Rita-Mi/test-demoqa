import { test, expect } from "@playwright/test";
import { Navigation } from "../helpers/Navigation";
import { BaseElements } from "../pageObject/BaseElements";

test.describe ('Draggable. Simple tab @readonly', () => {
    
    test('Simple Draggable element', async ({ page }) => {
        const baseElements = new BaseElements(page);
        const navigation = new Navigation(page);
        
        await page.goto('');
        await navigation.openCardByNameAndSelectSubMenu('Interactions', 'Dragabble');
        await expect(await baseElements.tabByName('Simple')).toBeVisible();
        await (await baseElements.tabByName('Simple')).click();
        await expect(await baseElements.tabByName('Simple')).toHaveClass(/active/);

        await expect(baseElements.dragMeBox).toBeVisible();
        const dragMeBoundingBox: any = await baseElements.dragMeBox.boundingBox();
        
        //drag element to title
        await (baseElements.dragMeBox).dragTo(baseElements.title);
        await expect(baseElements.dragMeBox).toBeVisible();
        await expect(baseElements.dragMeBox).not.toHaveClass(/ui-draggable-dragging/);
        
        //check that the element was moved
        const dragMeBoundingBoxAfterMoving: any = await baseElements.dragMeBox.boundingBox();
        expect(dragMeBoundingBoxAfterMoving.x).toBeGreaterThan(dragMeBoundingBox.x);
        expect(dragMeBoundingBoxAfterMoving.y).toBeLessThan(dragMeBoundingBox.y);
    })
})