import { test, expect } from "@playwright/test";
import { Navigation } from "../helpers/Navigation";
import { BaseElements } from "../pageObject/BaseElements";
import { DragAndDropTestBase } from "../helpers/DragAndDropTestBase";

test.describe ('Droppable. Prevent Propogation tab @readonly', () => {

    test.beforeEach('Login', async ({ page }) => {
        const navigation = new Navigation(page);

        await page.goto('');
        await navigation.openCardByNameAndSelectSubMenu('Interactions', 'Droppable');
        await navigation.goToTab('Prevent Propogation');
    })

    test('Dropping element into inner droppable box (not greedy)', async ({ page }) => {
        const baseElements = new BaseElements(page);
        const dragAndDropTestBase = new DragAndDropTestBase(page);

        const innerDroppableBox = baseElements.activeTab.locator('#notGreedyInnerDropBox');
        const outerDroppableBox = baseElements.activeTab.locator('#notGreedyDropBox');

        //check that the element is not in the box and the box has no color
        await dragAndDropTestBase.checkDraggableNotInDroppableBox(baseElements.dragMeBox, innerDroppableBox);
        await expect(innerDroppableBox).toHaveText('Inner droppable (not greedy)');
        await dragAndDropTestBase.checkDraggableNotInDroppableBox(baseElements.dragMeBox, outerDroppableBox);
        await expect(outerDroppableBox.locator('p').first()).toHaveText('Outer droppable');
        
        await (baseElements.dragMeBox).dragTo(innerDroppableBox);

        //check that the boxes have changed color and text
        await dragAndDropTestBase.checkDroppedBox(innerDroppableBox);
        await dragAndDropTestBase.checkDroppedBox(outerDroppableBox);
    })

    test('Dropping element into outer droppable box (not greedy)', async ({ page }) => {
        const baseElements = new BaseElements(page);
        const dragAndDropTestBase = new DragAndDropTestBase(page);

        const innerDroppableBox = baseElements.activeTab.locator('#notGreedyInnerDropBox');
        const outerDroppableBox = baseElements.activeTab.locator('#notGreedyDropBox');

        //check that the element is not in the box and the box has no color
        await dragAndDropTestBase.checkDraggableNotInDroppableBox(baseElements.dragMeBox, innerDroppableBox);
        await expect(innerDroppableBox).toHaveText('Inner droppable (not greedy)');
        await dragAndDropTestBase.checkDraggableNotInDroppableBox(baseElements.dragMeBox, outerDroppableBox);
        await expect(outerDroppableBox.locator('p').first()).toHaveText('Outer droppable');

        await (baseElements.dragMeBox).dragTo(outerDroppableBox.locator('p').first());

        //check that the only outer box has changed color and text
        await dragAndDropTestBase.checkDroppedBox(outerDroppableBox);
        await dragAndDropTestBase.checkNotDroppedBox(innerDroppableBox);
    })

    test('Dropping element into inner droppable box (greedy)', async ({ page }) => {
        const baseElements = new BaseElements(page);
        const dragAndDropTestBase = new DragAndDropTestBase(page);
        
        const innerDroppableBox = baseElements.activeTab.locator('#greedyDropBoxInner');
        const outerDroppableBox = baseElements.activeTab.locator('#greedyDropBox');

        //check that the element is not in the box and the box has no color
        await dragAndDropTestBase.checkDraggableNotInDroppableBox(baseElements.dragMeBox, innerDroppableBox);
        await expect(innerDroppableBox).toHaveText('Inner droppable (greedy)');
        await dragAndDropTestBase.checkDraggableNotInDroppableBox(baseElements.dragMeBox, outerDroppableBox);
        await expect(outerDroppableBox.locator('p').first()).toHaveText('Outer droppable');
        
        await (baseElements.dragMeBox).dragTo(innerDroppableBox);

        //check that the only inner box has changed color and text
        await dragAndDropTestBase.checkDroppedBox(innerDroppableBox);
        await dragAndDropTestBase.checkNotDroppedBox(outerDroppableBox);
    })

    test('Dropping element into outer droppable box (greedy)', async ({ page }) => {
        const baseElements = new BaseElements(page);
        const dragAndDropTestBase = new DragAndDropTestBase(page);

        const innerDroppableBox = baseElements.activeTab.locator('#greedyDropBoxInner');
        const outerDroppableBox = baseElements.activeTab.locator('#greedyDropBox');

        //check that the element is not in the box and the box has no color
        await dragAndDropTestBase.checkDraggableNotInDroppableBox(baseElements.dragMeBox, innerDroppableBox);
        await expect(innerDroppableBox).toHaveText('Inner droppable (greedy)');
        await dragAndDropTestBase.checkDraggableNotInDroppableBox(baseElements.dragMeBox, outerDroppableBox);
        await expect(outerDroppableBox.locator('p').first()).toHaveText('Outer droppable');

        await (baseElements.dragMeBox).dragTo(outerDroppableBox.locator('p').first());

        //check that the only outer box has changed color and text
        await dragAndDropTestBase.checkDroppedBox(outerDroppableBox);
        await dragAndDropTestBase.checkNotDroppedBox(innerDroppableBox);
    })
})