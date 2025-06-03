import { test, expect } from '@playwright/test';
import { login } from './common-utils';

// Creates a test adventure for Mt. Everest
test('Create Adventure', async ({ page }) => {
  // Login
  await login(page);
  // Set basic details
  await page.getByRole('button', { name: 'Adventures' }).click();
  await page.locator('.flex > .dropdown > div').click();
  await page.getByRole('button', { name: 'Adventure', exact: true }).click();
  await page.getByRole('textbox', { name: 'Name*' }).click();
  await page.getByRole('textbox', { name: 'Name*' }).fill('Mount Everest');
  // Create category
  await page.getByRole('button', { name: 'Select Category' }).click();
  await page.getByRole('textbox', { name: 'Category Name' }).click();
  await page.getByRole('textbox', { name: 'Category Name' }).fill('Mountain');
  await page.getByRole('textbox', { name: 'Category Name' }).press('Tab');
  await page.getByRole('button', { name: 'Show Emoji Picker' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('moun');
  await page.getByRole('option', { name: '🏔️, snow-capped mountain,' }).click();
  await page.getByRole('button', { name: 'Hide Emoji Picker' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  // Generate description from Wikipedia
  await page.getByRole('button', { name: 'Generate Description' }).click();
  // Add map location
  await page.locator('#my_modal_1').getByRole('checkbox').nth(2).check();
  await page.getByRole('textbox', { name: 'Search for a location' }).click();
  await page.getByRole('textbox', { name: 'Search for a location' }).fill('mount everest');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByRole('button', { name: 'Mount Everest, Khumbupasanglahmu, Solukhumbu, Koshi Province, Nepal' })).toContainText('Mount Everest, Khumbupasanglahmu, Solukhumbu, Koshi Province, Nepal');
  await page.getByRole('button', { name: 'Mount Everest, Khumbupasanglahmu, Solukhumbu, Koshi Province, Nepal' }).click();
  // Add adventure date
  await page.locator('#my_modal_1').getByRole('checkbox').nth(4).check();
  await page.locator('#all_day').check();
  await page.getByRole('textbox', { name: 'Start Date' }).fill('2028-10-11');
  await page.getByRole('textbox', { name: 'End Date' }).fill('2028-10-16');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Save & Next' }).click();
  await expect(page.getByText('Adventure created')).toBeVisible();
  // Make sure next page loaded correctly
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - text: Images (0) − Image
    - button "Image"
    - text: URL
    - textbox "URL"
    - button "Fetch Image"
    - text: Wikipedia
    - textbox "Wikipedia": Mount Everest
    - button "Fetch Image"
    - heading "No Images" [level=1]
    - button "Close"
    `);
  // Fetch image from Wikipedia
  await page.getByRole('button', { name: 'Fetch Image' }).nth(1).click();
  await expect(page.getByText('Image uploaded successfully!')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  // Make sure adventure created successfully
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - figure:
      - img "Mount Everest"
    - button "Mount Everest"
    - text: Mountain 🏔️ Planned Private
    - img
    - paragraph: सोलुखुम्बु, Koshi, NP
    - img
    - paragraph: 1 Visit
    - button:
      - img
    `);
  await page.getByRole('button', { name: 'Mount Everest' }).click();
  // Make sure adventure page renders as expected
  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - main:
      - img "Mount Everest"
      - button "1"
      - heading "Mount Everest" [level=1]
      - text: a admin
      - img
      - text: Private
      - img
      - text: सोलुखुम्बु, Koshi, NP
      - paragraph
      - article:
        - paragraph: /Mount Everest \\(\\), known locally as Sagarmatha in Nepal and Qomolangma in Tibet, is Earth's highest mountain above sea level\\. It lies in the Mahalangur Himal sub-range of the Himalayas and marks part of the China–Nepal border at its summit\\. Its height was most recently measured in \\d+ by Chinese and Nepali authorities as \\d+,\\d+\\.\\d+ m \\(\\d+,\\d+ ft 8\\+1⁄2 in\\)\\. Mount Everest attracts many climbers, including highly experienced mountaineers\\. There are two main climbing routes, one approaching the summit from the southeast in Nepal \\(known as the standard route\\) and the other from the north in Tibet\\. While not posing substantial technical climbing challenges on the standard route, Everest presents dangers such as altitude sickness, weather, and wind, as well as hazards from avalanches and the Khumbu Icefall\\. As of May \\d+, \\d+ people have died on Everest\\. Over \\d+ bodies remain on the mountain and have not been removed due to the dangerous conditions\\. Climbers typically ascend only part of Mount Everest's elevation, as the mountain's full elevation is measured from the geoid, which approximates sea level\\. The closest sea to Mount Everest's summit is the Bay of Bengal, almost \\d+ km \\(\\d+ mi\\) away\\. To approximate a climb of the entire height of Mount Everest, one would need to start from this coastline, a feat accomplished by Tim Macartney-Snape's team in \\d+\\. Climbers usually begin their ascent from base camps above \\d+,\\d+ m \\(\\d+,\\d+ ft\\)\\. The amount of elevation climbed from below these camps varies\\. On the Tibetan side, most climbers drive directly to the North Base Camp\\. On the Nepalese side, climbers generally fly into Kathmandu, then Lukla, and trek to the South Base Camp, making the climb from Lukla to the summit about \\d+,\\d+ m \\(\\d+,\\d+ ft\\) in elevation gain\\. The first recorded efforts to reach Everest's summit were made by British mountaineers\\. As Nepal did not allow foreigners to enter the country at the time, the British made several attempts on the North Ridge route from the Tibetan side\\. After the first reconnaissance expedition by the British in \\d+ reached \\d+,\\d+ m \\(\\d+,\\d+ ft\\) on the North Col, the \\d+ expedition on its first summit attempt marked the first time a human had climbed above \\d+,\\d+ m \\(\\d+,\\d+ ft\\) and it also pushed the North Ridge route up to \\d+,\\d+ m \\(\\d+,\\d+ ft\\)\\. On the \\d+ expedition George Mallory and Andrew Irvine made a final summit attempt on 8 June but never returned, sparking debate as to whether they were the first to reach the top\\. Tenzing Norgay and Edmund Hillary made the first documented ascent of Everest in \\d+, using the Southeast Ridge route\\. Norgay had reached \\d+,\\d+ m \\(\\d+,\\d+ ft\\) the previous year as a member of the \\d+ Swiss expedition\\. The Chinese mountaineering team of Wang Fuzhou, Gonpo, and Qu Yinhua made the first reported ascent of the peak from the North Ridge on \\d+ May \\d+\\./
      - heading "Adventure Details" [level=2]
      - paragraph: Adventure Type
      - paragraph: Mountain 🏔️
      - paragraph: Visits
      - paragraph: "1 Visit:"
      - paragraph: /All Day \\d+-\\d+-\\d+ – \\d+-\\d+-\\d+/
      - paragraph: Latitude
      - paragraph: /\\d+\\.\\d+° N/
      - paragraph: Longitude
      - paragraph: /\\d+\\.\\d+° W/
      - paragraph: "Open in Maps:"
      - link "Apple":
        - /url: https://maps.apple.com/?q=27.988061,86.925210
      - link "Google":
        - /url: https://maps.google.com/?q=27.988061,86.925210
      - link "OSM":
        - /url: https://www.openstreetmap.org/?mlat=27.988061&mlon=86.925210
      - region "Map"
      - img
      - button "Zoom in"
      - button "Zoom out"
      - button "Reset bearing to north"
      - button "Find my location"
      - button "Enter fullscreen"
      - text: 1 km
      - group:
        - link "MapLibre":
          - /url: https://maplibre.org/
        - text: "| ©"
        - link "CARTO":
          - /url: https://carto.com/about-carto/
        - text: ", ©"
        - link "OpenStreetMap":
          - /url: http://www.openstreetmap.org/about/
        - text: contributors
      - heading "Additional Information" [level=2]
      - checkbox
      - text: Sunrise & Sunset
      - img
      - text: +
      - heading "Images" [level=2]
    `);
  // Delete adventure
  // await page.getByRole('button', { name: 'Adventures' }).click();
  // await page.locator('.card-actions > .dropdown > div').click();
  // await page.getByRole('button', { name: 'Delete' }).click();
  // await page.getByRole('button', { name: 'Delete' }).click()
});