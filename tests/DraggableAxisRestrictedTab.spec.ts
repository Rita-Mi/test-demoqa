import { test, expect } from "@playwright/test";
import { Navigation } from "../helpers/Navigation";
import { BaseElements } from "../pageObject/BaseElements";
import { DragAndDropTestBase } from "../helpers/DragAndDropTestBase";

test.describe ('Draggable. Axis Restricted tab @readonly', () => {
    
    test.beforeEach('Login', async ({ page }) => {
        const navigation = new Navigation(page);

        await page.goto('');
        await navigation.openCardByNameAndSelectSubMenu('Interactions', 'Dragabble');
        await navigation.goToTab('Axis Restricted');
        await page.waitForTimeout(2000);
    })

    test('Only X draggable element', async ({ page }) => {
        const baseElements = new BaseElements(page);
        const dragAndDropTestBase = new DragAndDropTestBase(page);
        const onlyXDraggableElement = baseElements.activeTab.locator('#restrictedX');

        await expect(onlyXDraggableElement).toBeVisible();
        const onlyXBoundingBox: any = await onlyXDraggableElement.boundingBox();
        
        //drag to element right and up
        await dragAndDropTestBase.dragToRightAndUp(onlyXDraggableElement, onlyXBoundingBox);
        
        //check that the element was moved only to the right along the X-axis
        const donlyXBoundingBoxAfterMoving: any = await onlyXDraggableElement.boundingBox();
        expect(donlyXBoundingBoxAfterMoving.x).toBeGreaterThan(onlyXBoundingBox.x);
        expect(donlyXBoundingBoxAfterMoving.y).toEqual(onlyXBoundingBox.y);

        //drag element to left and down
        await dragAndDropTestBase.dragToLeftAndDown(onlyXDraggableElement, onlyXBoundingBox);
        const donlyXBoundingBoxAfterMovingToRight: any = await onlyXDraggableElement.boundingBox();

        //check that the element was moved only to the left along the X-axis
        expect(donlyXBoundingBoxAfterMovingToRight.x).toBeLessThan(onlyXBoundingBox.x);
        expect(donlyXBoundingBoxAfterMovingToRight.y).toEqual(onlyXBoundingBox.y);
    })

    test('Only Y draggable element', async ({ page }) => {
        const baseElements = new BaseElements(page);
        const dragAndDropTestBase = new DragAndDropTestBase(page);
        const onlyYDraggableElement = baseElements.activeTab.locator('#restrictedY');

        await expect(onlyYDraggableElement).toBeVisible();
        const onlyYBoundingBox: any = await onlyYDraggableElement.boundingBox();
        
        //drag element to right and up
        await dragAndDropTestBase.dragToRightAndUp(onlyYDraggableElement, onlyYBoundingBox);
        
        //check that the element was moved only up along the X-axis
        const donlyXBoundingBoxAfterMoving: any = await onlyYDraggableElement.boundingBox();
        expect(donlyXBoundingBoxAfterMoving.x).toEqual(onlyYBoundingBox.x);
        expect(donlyXBoundingBoxAfterMoving.y).toBeLessThan(onlyYBoundingBox.y);

        //drag element to left and down
        await dragAndDropTestBase.dragToLeftAndDown(onlyYDraggableElement, onlyYBoundingBox);
        const donlyYBoundingBoxAfterMovingToRight: any = await onlyYDraggableElement.boundingBox();

        //check that the element was moved only down along the X-axis
        expect(donlyYBoundingBoxAfterMovingToRight.x).toEqual(onlyYBoundingBox.x);
        expect(donlyYBoundingBoxAfterMovingToRight.y).toBeGreaterThan(onlyYBoundingBox.y);
    })
})