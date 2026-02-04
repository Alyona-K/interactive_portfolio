import { test, expect } from "@playwright/test";

test.describe("Contact background behavior by viewport", () => {
  test("desktop: background reacts to scroll", async ({ page }) => {
    // --- FORCE DESKTOP VIEWPORT TO TRIGGER DESKTOP ANIMATION LOGIC ---
    await page.setViewportSize({ width: 1440, height: 900 });

    // --- OPEN APPLICATION ENTRY POINT ---
    await page.goto("/");

    const bg = page.locator(".contact-section__bg");
    const section = page.locator("#contact");

    // --- SANITY CHECK: BACKGROUND ELEMENT MUST EXIST ---
    await expect(bg).toBeVisible();

    // --- SCROLL CONTACT SECTION INTO VIEW TO INITIALIZE SCROLL-BASED EFFECTS ---
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);

    // --- CAPTURE INITIAL INLINE STYLES SET BY ANIMATION ---
    const widthBefore = await bg.evaluate((el) => el.style.width);
    const radiusBefore = await bg.evaluate((el) => el.style.borderRadius);

    // --- GUARD AGAINST FALSE POSITIVES (ANIMATION MUST SET STYLES) ---
    expect(widthBefore).not.toBe("");
    expect(radiusBefore).not.toBe("");

    // --- SCROLL FURTHER TO FORCE STYLE UPDATES ---
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(100);

    // --- VERIFY THAT INLINE STYLES WERE UPDATED BY SCROLL ---
    const widthAfter = await bg.evaluate((el) => el.style.width);
    const radiusAfter = await bg.evaluate((el) => el.style.borderRadius);

    expect(widthAfter).not.toBe(widthBefore);
    expect(radiusAfter).not.toBe(radiusBefore);
  });

  test("tablet: background responds to scroll within expected range", async ({
    page,
  }) => {
    // --- FORCE TABLET VIEWPORT ---
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.goto("/");

    const bg = page.locator(".contact-section__bg");
    const section = page.locator("#contact");

    // --- INITIALIZE SCROLL-BASED ANIMATION ---
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);

    // --- APPLY CONTROLLED SCROLL OFFSET ---
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(100);

    // --- READ NUMERIC STYLE VALUES FOR RANGE ASSERTIONS ---
    const width = await bg.evaluate((el) => parseFloat(el.style.width));
    const radius = await bg.evaluate((el) => parseFloat(el.style.borderRadius));

    // --- ASSERT STYLES STAY WITHIN EXPECTED TABLET RANGE ---
    expect(width).toBeGreaterThanOrEqual(90);
    expect(width).toBeLessThanOrEqual(100);

    expect(radius).toBeGreaterThanOrEqual(0);
    expect(radius).toBeLessThanOrEqual(30);
  });

  test("mobile: background does NOT react to scroll", async ({ page }) => {
    // --- FORCE MOBILE VIEWPORT WHERE SCROLL ANIMATION IS DISABLED ---
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    const bg = page.locator(".contact-section__bg");
    const section = page.locator("#contact");

    // --- SANITY CHECK: BACKGROUND ELEMENT MUST EXIST ---
    await expect(bg).toBeVisible();

    // --- INITIALIZE SECTION WITHOUT EXPECTED STYLE MUTATIONS ---
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);

    // --- CAPTURE INITIAL STYLES ---
    const widthBefore = await bg.evaluate((el) => el.style.width);
    const radiusBefore = await bg.evaluate((el) => el.style.borderRadius);

    // --- SCROLL SHOULD NOT AFFECT STYLES ON MOBILE ---
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(100);

    // --- VERIFY STYLES REMAIN UNCHANGED ---
    const widthAfter = await bg.evaluate((el) => el.style.width);
    const radiusAfter = await bg.evaluate((el) => el.style.borderRadius);

    expect(widthAfter).toBe(widthBefore);
    expect(radiusAfter).toBe(radiusBefore);
  });
});
