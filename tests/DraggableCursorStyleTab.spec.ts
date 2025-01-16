import { test, expect } from "@playwright/test";
import { Navigation } from "../helpers/Navigation";
import { BaseElements } from "../pageObject/BaseElements";

test.describe ('Draggable. Cursor Style tab @readonly', () => {
    
    test.beforeEach('Login', async ({ page }) => {
        const navigation = new Navigation(page);

        await page.goto('');
        await navigation.openCardByNameAndSelectSubMenu('Interactions', 'Dragabble');
        await navigation.goToTab('Cursor Style');
    })

    test('Draggable element with cursor in center', async ({ page }) => {
        const baseElements = new BaseElements(page);

        const cursorCenterElement = baseElements.activeTab.locator('#cursorCenter');
        const cursorStyle = baseElements.activeTab.locator('.cursor-style-container');
        
        await expect(cursorCenterElement).toBeVisible();
        await expect(cursorStyle).toHaveCSS('cursor', 'auto');
        const cursorCenterElementBox: any = await cursorCenterElement.boundingBox();
        
        //drag to element and check cursor style
        await cursorCenterElement.hover();
        await page.mouse.down();
        await page.mouse.move(cursorCenterElementBox.x + cursorCenterElementBox.width * 2, 
            cursorCenterElementBox.y - cursorCenterElementBox.height * 2, { steps: 5 });
        await expect(cursorStyle).toHaveCSS('cursor', 'move');
        await page.mouse.up();
        await expect(cursorCenterElement).toBeVisible();
        await expect(cursorCenterElement).not.toHaveClass(/ui-draggable-dragging/);
        
        //check that the element was moved
        const cursorCenterElementBoxAfterMoving: any = await cursorCenterElement.boundingBox();
        expect(cursorCenterElementBoxAfterMoving.x).toBeGreaterThan(cursorCenterElementBox.x);
        expect(cursorCenterElementBoxAfterMoving.y).toBeLessThan(cursorCenterElementBox.y);
    })

    test('Draggable element with cursor in at top left', async ({ page }) => {
        const baseElements = new BaseElements(page);

        const cursorTopLeftElement = baseElements.activeTab.locator('#cursorTopLeft');
        const cursorStyle = baseElements.activeTab.locator('.cursor-style-container');
        
        await expect(cursorTopLeftElement).toBeVisible();
        await expect(cursorStyle).toHaveCSS('cursor', 'auto');
        const cursorTopLeftElementBox: any = await cursorTopLeftElement.boundingBox();
        
        //drag to element and check cursor style
        await cursorTopLeftElement.hover();
        await page.mouse.down();
        await page.mouse.move(cursorTopLeftElementBox.x + cursorTopLeftElementBox.width * 2, 
            cursorTopLeftElementBox.y - cursorTopLeftElementBox.height * 2, { steps: 5 });
        await expect(cursorStyle).toHaveCSS('cursor', 'crosshair');
        await page.mouse.up();
        await expect(cursorTopLeftElement).toBeVisible();
        await expect(cursorTopLeftElement).not.toHaveClass(/ui-draggable-dragging/);
        
        //check that the element was moved
        const cursorTopLeftElementBoxAfterMoving: any = await cursorTopLeftElement.boundingBox();
        expect(cursorTopLeftElementBoxAfterMoving.x).toBeGreaterThan(cursorTopLeftElementBox.x);
        expect(cursorTopLeftElementBoxAfterMoving.y).toBeLessThan(cursorTopLeftElementBox.y);
    })

    test('Draggable element with cursor in at bottom', async ({ page }) => {
        const baseElements = new BaseElements(page);

        const cursorBottomElement = baseElements.activeTab.locator('#cursorBottom');
        const cursorStyle = baseElements.activeTab.locator('.cursor-style-container');
        
        await expect(cursorBottomElement).toBeVisible();
        await expect(cursorStyle).toHaveCSS('cursor', 'auto');
        const cursorBottomElementBox: any = await cursorBottomElement.boundingBox();
        
        //drag to element and check cursor style
        await cursorBottomElement.hover();
        await page.mouse.down();
        await page.mouse.move(cursorBottomElementBox.x + cursorBottomElementBox.width * 2, 
            cursorBottomElementBox.y - cursorBottomElementBox.height * 2, { steps: 5 });
        await expect(cursorStyle).toHaveCSS('cursor', 'auto');
        await page.mouse.up();
        await expect(cursorBottomElement).toBeVisible();
        await expect(cursorBottomElement).not.toHaveClass(/ui-draggable-dragging/);
        
        //check that the element was moved
        const cursorBottomElementBoxAfterMoving: any = await cursorBottomElement.boundingBox();
        expect(cursorBottomElementBoxAfterMoving.x).toBeGreaterThan(cursorBottomElementBox.x);
        expect(cursorBottomElementBoxAfterMoving.y).toBeLessThan(cursorBottomElementBox.y);
    })
})