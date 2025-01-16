import { test, expect } from "@playwright/test";
import { Navigation } from "../helpers/Navigation";
import { BaseElements } from "../pageObject/BaseElements";
import { DragAndDropTestBase } from "../helpers/DragAndDropTestBase";

test.describe ('Droppable. Revert Draggable tab @readonly', () => {
    
    test.beforeEach('Login', async ({ page }) => {
        const navigation = new Navigation(page);

        await page.goto('');
        await navigation.openCardByNameAndSelectSubMenu('Interactions', 'Droppable');
        await navigation.goToTab('Revert Draggable');
    })

    test('Dropping revertable element', async ({ page }) => {
        const baseElements = new BaseElements(page);
        const dragAndDropTestBase = new DragAndDropTestBase(page);
        const revertableElement = baseElements.activeTab.locator('#revertable');

        //check that the element is not in the box and the box has no color
        await dragAndDropTestBase.checkDraggableNotInDroppableBox(revertableElement, baseElements.dropHereBox);
        await expect(revertableElement).toHaveText('Will Revert');
        await expect(baseElements.dropHereBox).toHaveText('Drop here');
        const revertableBoundingBox: any = await revertableElement.boundingBox();
        
        await (revertableElement).dragTo(baseElements.dropHereBox);
        await expect(revertableElement).not.toHaveClass(/ui-draggable-dragging/);
        
        //check that the box has changed color and text
        await dragAndDropTestBase.checkDroppedBox(baseElements.dropHereBox);
        
        //check that the element has returned to its place
        const revertableBoundingBoxAfterDropping: any = await revertableElement.boundingBox();
        expect(revertableBoundingBoxAfterDropping).toEqual(revertableBoundingBox);
    })

    test('Dropping non revertable element', async ({ page }) => {
        const baseElements = new BaseElements(page);
        const dragAndDropTestBase = new DragAndDropTestBase(page);
        const notRevertableElement = baseElements.activeTab.locator('#notRevertable');

        //check that the element is not in the box and the box has no color
        await dragAndDropTestBase.checkDraggableNotInDroppableBox(notRevertableElement, baseElements.dropHereBox);
        await expect(notRevertableElement).toHaveText('Not Revert');
        await expect(baseElements.dropHereBox).toHaveText('Drop here');
        
        const notRevertableBoundingBox: any = await notRevertableElement.boundingBox();
        await (notRevertableElement).dragTo(baseElements.dropHereBox);
        await expect(notRevertableElement).not.toHaveClass(/ui-draggable-dragging/);

        //check that the box has changed color and text
        await dragAndDropTestBase.checkDroppedBox(baseElements.dropHereBox);
        
        //check that the element has not returned to its place
        const notRevertableBoundingBoxAfterDropping: any = await notRevertableElement.boundingBox();
        expect(notRevertableBoundingBoxAfterDropping).not.toEqual(notRevertableBoundingBox);
    })
})