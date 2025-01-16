import { test, expect } from "@playwright/test";
import { Navigation } from "../helpers/Navigation";
import { BaseElements } from "../pageObject/BaseElements";
import { DragAndDropTestBase } from "../helpers/DragAndDropTestBase";

test.describe ('Draggable. Container Restricted tab @readonly', () => {
    
    test.beforeEach('Login', async ({ page }) => {
        const navigation = new Navigation(page);

        await page.goto('');
        await navigation.openCardByNameAndSelectSubMenu('Interactions', 'Dragabble');
        await navigation.goToTab('Container Restricted');
    })

    test('Draggable element is contained within the box', async ({ page }) => {
        const baseElements = new BaseElements(page);

        const containedElementWithBox = baseElements.activeTab.getByText('I\'m contained within the box');
        const boundingFrame = baseElements.activeTab.locator('#containmentWrapper');

        await expect(boundingFrame).toBeVisible();
        await expect(containedElementWithBox).toBeVisible();
        const containedElementBoundingBox: any = await containedElementWithBox.boundingBox();
        const boundingFrameBoundingBox: any = await boundingFrame.boundingBox();
        
        //drag element to right and down beyond the bounding frame
        await containedElementWithBox.hover();
        await page.mouse.down();
        await page.mouse.move(boundingFrameBoundingBox.x + boundingFrameBoundingBox.width * 2, 
            boundingFrameBoundingBox.y + boundingFrameBoundingBox.height * 2, { steps: 5 });  
        await page.mouse.up();
        await expect(containedElementWithBox).toBeVisible();
        await expect(containedElementWithBox).not.toHaveClass(/ui-draggable-dragging/);
        
        //check that the element was moved
        const containedElementBoundingBoxAfterMoving: any = await containedElementWithBox.boundingBox();
        expect(containedElementBoundingBoxAfterMoving.x).toBeGreaterThan(containedElementBoundingBox.x);
        expect(containedElementBoundingBoxAfterMoving.y).toBeGreaterThan(containedElementBoundingBox.y);

        //check that the dragged element is within the bounding frame
        expect(containedElementBoundingBoxAfterMoving.x).toBeGreaterThan(boundingFrameBoundingBox.x);
        expect(containedElementBoundingBoxAfterMoving.y).toBeGreaterThan(boundingFrameBoundingBox.y);
        expect(containedElementBoundingBoxAfterMoving.x).toBeLessThan(boundingFrameBoundingBox.x + boundingFrameBoundingBox.width);
        expect(containedElementBoundingBoxAfterMoving.y).toBeLessThan(boundingFrameBoundingBox.y + boundingFrameBoundingBox.height);
    })

    test('Draggable element is contained within the parent', async ({ page }) => {
        const baseElements = new BaseElements(page);

        const containedElementWithParent = baseElements.activeTab.getByText('I\'m contained within my parent');
        const boundingParent = containedElementWithParent.locator('..');

        await expect(boundingParent).toBeVisible();
        await expect(containedElementWithParent).toBeVisible();
        const containedElementBoundingBox: any = await containedElementWithParent.boundingBox();
        const boundingParentBoundingBox: any = await boundingParent.boundingBox();
        
        //drag element to right and down beyond the bounding frame
        await containedElementWithParent.hover();
        await page.mouse.down();
        await page.mouse.move(boundingParentBoundingBox.x + boundingParentBoundingBox.width * 2, 
            boundingParentBoundingBox.y + boundingParentBoundingBox.height * 2, { steps: 5 });    
        await page.mouse.up();
        
        //check that the element was moved
        const containedElementBoundingBoxAfterMoving: any = await containedElementWithParent.boundingBox();
        expect(containedElementBoundingBoxAfterMoving.x).toBeGreaterThan(containedElementBoundingBox.x);
        expect(containedElementBoundingBoxAfterMoving.y).toBeGreaterThan(containedElementBoundingBox.y);

        //check that the dragged element is within the bounding parent
        expect(containedElementBoundingBoxAfterMoving.x).toBeGreaterThan(boundingParentBoundingBox.x);
        expect(containedElementBoundingBoxAfterMoving.y).toBeGreaterThan(boundingParentBoundingBox.y);
        expect(containedElementBoundingBoxAfterMoving.x).toBeLessThan(boundingParentBoundingBox.x + boundingParentBoundingBox.width);
        expect(containedElementBoundingBoxAfterMoving.y).toBeLessThan(boundingParentBoundingBox.y + boundingParentBoundingBox.height);
    })
})