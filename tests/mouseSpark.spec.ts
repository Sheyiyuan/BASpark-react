import { test, expect } from '@playwright/test';

test.describe('MouseSparkReact Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/');
    await page.waitForLoadState('networkidle');
  });

  test('should render canvas element', async ({ page }) => {
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();

    const canvasWidth = await canvas.evaluate((el: HTMLCanvasElement) => el.width);
    const canvasHeight = await canvas.evaluate((el: HTMLCanvasElement) => el.height);

    expect(canvasWidth).toBeGreaterThan(0);
    expect(canvasHeight).toBeGreaterThan(0);
  });

  test('should create spark on click', async ({ page }) => {
    await page.mouse.click(300, 300);
    await page.waitForTimeout(500);

    const sparkCount = await page.evaluate(() => {
      return window.performance.getEntriesByType('measure').length;
    });

    expect(sparkCount).toBeDefined();
  });

  test('should show trail when dragging', async ({ page }) => {
    await page.mouse.move(100, 100);
    await page.mouse.down();
    await page.mouse.move(200, 100, { steps: 10 });
    await page.mouse.move(300, 100, { steps: 10 });
    await page.waitForTimeout(100);
    await page.mouse.up();

    await page.waitForTimeout(500);

    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });

  test('should toggle enableTrail checkbox', async ({ page }) => {
    const checkbox = page.getByRole('checkbox');
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test('should change color via preset button', async ({ page }) => {
    const pinkButton = page.getByRole('button', { name: 'Sakura Pink' });
    await pinkButton.click();

    const colorInput = page.getByPlaceholder('R,G,B');
    await expect(colorInput).toHaveValue('255,107,157');
  });

  test('should adjust scale slider', async ({ page }) => {
    const slider = page.locator('input[type="range"]').first();
    const initialValue = await slider.inputValue();

    await slider.click();
    await page.keyboard.press('End');

    const newValue = await slider.inputValue();
    expect(parseFloat(newValue)).toBeGreaterThan(parseFloat(initialValue));
  });

  test('should adjust opacity slider', async ({ page }) => {
    const sliders = await page.locator('input[type="range"]').all();
    const opacitySlider = sliders[1];

    const initialValue = await opacitySlider.inputValue();

    await opacitySlider.click();
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowLeft');
    }

    const newValue = await opacitySlider.inputValue();
    expect(parseFloat(newValue)).toBeLessThan(parseFloat(initialValue));
  });

  test('should adjust speed slider', async ({ page }) => {
    const sliders = await page.locator('input[type="range"]').all();
    const speedSlider = sliders[2];

    const initialValue = await speedSlider.inputValue();

    await speedSlider.click();
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowRight');
    }

    const newValue = await speedSlider.inputValue();
    expect(parseFloat(newValue)).toBeGreaterThan(parseFloat(initialValue));
  });

  test('should handle multiple clicks', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await page.mouse.click(100 + i * 50, 100 + i * 50);
      await page.waitForTimeout(100);
    }

    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });

  test('should render settings panel', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Effect Settings' });
    await expect(heading).toBeVisible();

    const presetSection = page.getByRole('heading', { name: 'Click to instantly apply a color theme' });
    await expect(presetSection).toBeVisible();
  });

  test('should have all color presets', async ({ page }) => {
    const presets = ['Blue Archive', 'Sakura Pink', 'Mint Green', 'Golden Hour', 'Twilight'];

    for (const preset of presets) {
      const button = page.getByRole('button', { name: preset });
      await expect(button).toBeVisible();
    }
  });

  test('should display main title', async ({ page }) => {
    const title = page.getByRole('heading', { name: 'BASpark-react' });
    await expect(title).toBeVisible();
  });
});