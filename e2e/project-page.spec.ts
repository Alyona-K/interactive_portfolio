import { test, expect } from "@playwright/test";

test.describe("ProjectPage E2E", () => {
  // --- BEFORE EACH TEST ---
  // Navigate to the main page before each test
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // --- HERO SECTION ---
  // Verify hero is immediately rendered and visible with correct content
  test("Hero is rendered immediately with correct startIntro", async ({
    page,
  }) => {
    const hero = page.locator('[data-testid="hero"]');
    await expect(hero).toBeAttached(); // ensure element exists in DOM
    await expect(hero).toBeVisible(); // ensure element is visible
    await expect(hero).toHaveText(/Frontend Developer/i); // content check
  });

  // --- ABOUT SECTION ---
  // Ensure About section becomes visible upon scrolling (lazy-loaded / animated)
  test("About section loads when scrolled into view", async ({ page }) => {
    const about = page.locator('[data-testid="about"]');
    await expect(about).toBeAttached();
    await expect(about).not.toBeVisible(); // initially hidden

    await about.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300); // wait for IntersectionObserver + GSAP animations
    await expect(about).toBeVisible();
  });

  // --- SKILLS SECTION ---
  // Check visibility of Skills section upon scroll
  test("Skills section loads when scrolled into view", async ({ page }) => {
    const skills = page.locator('[data-testid="skills"]');
    await expect(skills).toBeAttached();
    await expect(skills).not.toBeVisible();

    await skills.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300); // wait for animations
    await expect(skills).toBeVisible();
  });

  // --- PROJECTS GALLERY ---
  // Validate ProjectsGallery appears with scroll-triggered animation
  test("ProjectsGallery loads correctly on scroll", async ({ page }) => {
    const gallery = page.locator('[data-testid="projects-gallery"]');
    await expect(gallery).toBeAttached();
    await expect(gallery).not.toBeVisible();

    await gallery.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); // account for GSAP ~0.5s animation
    await expect(gallery).toBeVisible();
  });

  // --- FAQ & CONTACT SECTIONS ---
  // Ensure FAQ slider and contact section are lazy-loaded and visible after scrolling
  test("FaqSlider and ContactSection load on scroll", async ({ page }) => {
    const faq = page.locator('[data-testid="faq-slider"]');
    const contact = page.locator('[data-testid="contact-section"]');

    await expect(faq).toBeAttached();
    await expect(contact).toBeAttached();

    await expect(faq).not.toBeVisible();
    await expect(contact).not.toBeVisible();

    await faq.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(faq).toBeVisible();

    await contact.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(contact).toBeVisible();
  });

  // --- HERO CALLBACK SIMULATION ---
  // Validate hero's onAnimationComplete effect indirectly via visible state
  test("Hero triggers onAnimationComplete callback", async ({ page }) => {
    const hero = page.locator('[data-testid="hero"]');
    await expect(hero).toBeAttached();
    await hero.scrollIntoViewIfNeeded();

    await page.waitForTimeout(1200); // wait for ~1s hero animation to finish

    // Check DOM / content since callback cannot be directly tested in E2E
    await expect(hero).toBeVisible();
    await expect(hero).toHaveText(/Frontend Developer/i);
  });
});
