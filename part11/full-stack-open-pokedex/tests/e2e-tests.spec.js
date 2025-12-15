import { test, describe, expect } from "@playwright/test"

describe("Pokedex", () => {
	test("front page can be opened", async ({ page }) => {
		await page.goto("")
		await expect(page.getByText("ivysaur")).toBeVisible()
		await expect(page.getByText("Pokémon and Pokémon character names are trademarks of Nintendo.")).toBeVisible()
	})

	test("pokemon page can be navigated to", async ({ page }) => {
		await page.goto("/pokemon/bulbasaur")

		const abilitiesBulbasaur = page.locator(".pokemon-abilities")
		console.log(abilitiesBulbasaur)
		await expect(abilitiesBulbasaur.getByText("chlorophyll", { exact: true })).toBeVisible()

		await page.goto("/pokemon/charizard")
		const abilitiesCharizard = page.locator(".pokemon-abilities")
		console.log(abilitiesCharizard)
		await expect(abilitiesCharizard.getByText("solar power", { exact: true })).toBeVisible()
	})
})