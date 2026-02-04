import { test, expect } from "@playwright/test";

// --- HELPER FUNCTIONS ---
// Checks if element position/scale changed beyond threshold
const hasMoved = (before: number, after: number, threshold = 1) =>
  Math.abs(after - before) > threshold;

/* --------------------------------------------------
   PROJECTS GALLERY ANIMATION TESTS
   Verifies scroll-triggered animations and stage pin behavior
   across mobile, tablet, and desktop viewports.
-------------------------------------------------- */
test.describe("ProjectsGallery animation behavior by viewport", () => {
  test("mobile: cards do NOT animate, stage not pinned", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    const stage = page.locator(".projects-gallery__stage");
    const firstCard = page.locator(".project-card").first();

    await expect(stage).toBeVisible();
    await expect(firstCard).toBeVisible();

    const transformBefore = await firstCard.evaluate(
      (el) => getComputedStyle(el).transform,
    );

    // Scroll slightly to simulate user interaction
    await stage.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, 200));
    await page.waitForTimeout(100);

    const transformAfter = await firstCard.evaluate(
      (el) => getComputedStyle(el).transform,
    );

    // Mobile: no transformation should occur
    expect(transformAfter).toBe(transformBefore);

    // Stage should remain static
    const position = await stage.evaluate(
      (el) => getComputedStyle(el).position,
    );
    expect(position).toBe("static");
  });

  test("tablet: cards animate and stage pins correctly", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.goto("/");

    const stage = page.locator(".projects-gallery__stage");
    const firstCard = page.locator(".project-card").first();
    const lastCard = page.locator(".project-card").last();

    await stage.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);

    // Capture initial positions and scales
    const firstYBefore = await firstCard.evaluate(
      (el) => el.getBoundingClientRect().top,
    );
    const lastYBefore = await lastCard.evaluate(
      (el) => el.getBoundingClientRect().top,
    );
    const firstScaleBefore = await firstCard.evaluate((el) =>
      parseFloat(getComputedStyle(el).transform.split(",")[0].slice(7)),
    );
    const lastScaleBefore = await lastCard.evaluate((el) =>
      parseFloat(getComputedStyle(el).transform.split(",")[0].slice(7)),
    );

    // Scroll to trigger animations
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Capture post-scroll positions and scales
    const firstYAfter = await firstCard.evaluate(
      (el) => el.getBoundingClientRect().top,
    );
    const lastYAfter = await lastCard.evaluate(
      (el) => el.getBoundingClientRect().top,
    );
    const firstScaleAfter = await firstCard.evaluate((el) =>
      parseFloat(getComputedStyle(el).transform.split(",")[0].slice(7)),
    );
    const lastScaleAfter = await lastCard.evaluate((el) =>
      parseFloat(getComputedStyle(el).transform.split(",")[0].slice(7)),
    );

    // Check that cards moved and scaled correctly
    expect(hasMoved(firstYBefore, firstYAfter)).toBeTruthy();
    expect(hasMoved(lastYBefore, lastYAfter)).toBeTruthy();
    expect(hasMoved(firstScaleBefore, firstScaleAfter, 0.01)).toBeTruthy();
    expect(hasMoved(lastScaleBefore, lastScaleAfter, 0.01)).toBeTruthy();

    // Stage should be pinned
    const position = await stage.evaluate(
      (el) => getComputedStyle(el).position,
    );
    expect(["relative", "sticky", "fixed"]).toContain(position);
  });

  test("desktop: cards animate and stage pins correctly", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const stage = page.locator(".projects-gallery__stage");
    const firstCard = page.locator(".project-card").first();
    const lastCard = page.locator(".project-card").last();

    await stage.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);

    // Capture initial positions and scales
    const firstYBefore = await firstCard.evaluate(
      (el) => el.getBoundingClientRect().top,
    );
    const lastYBefore = await lastCard.evaluate(
      (el) => el.getBoundingClientRect().top,
    );
    const firstScaleBefore = await firstCard.evaluate((el) =>
      parseFloat(getComputedStyle(el).transform.split(",")[0].slice(7)),
    );
    const lastScaleBefore = await lastCard.evaluate((el) =>
      parseFloat(getComputedStyle(el).transform.split(",")[0].slice(7)),
    );

    // Scroll to trigger animations
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Capture post-scroll positions and scales
    const firstYAfter = await firstCard.evaluate(
      (el) => el.getBoundingClientRect().top,
    );
    const lastYAfter = await lastCard.evaluate(
      (el) => el.getBoundingClientRect().top,
    );
    const firstScaleAfter = await firstCard.evaluate((el) =>
      parseFloat(getComputedStyle(el).transform.split(",")[0].slice(7)),
    );
    const lastScaleAfter = await lastCard.evaluate((el) =>
      parseFloat(getComputedStyle(el).transform.split(",")[0].slice(7)),
    );

    // Check that cards moved and scaled correctly
    expect(hasMoved(firstYBefore, firstYAfter)).toBeTruthy();
    expect(hasMoved(lastYBefore, lastYAfter)).toBeTruthy();
    expect(hasMoved(firstScaleBefore, firstScaleAfter, 0.01)).toBeTruthy();
    expect(hasMoved(lastScaleBefore, lastScaleAfter, 0.01)).toBeTruthy();

    // Stage should be pinned
    const position = await stage.evaluate(
      (el) => getComputedStyle(el).position,
    );
    expect(["relative", "sticky", "fixed"]).toContain(position);
  });
});
