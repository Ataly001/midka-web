# NEOS Water

A responsive six-page website for NEOS artesian water. Visitors can explore BLUE and SILVER, find a water recommendation, search questions and products, compare water types and calculate a cost estimate.

## Team and page ownership

| Team member | Pages | Features |
| --- | --- | --- |
| Ataly | Home, About | Water recommendation, searchable FAQ, jQuery accordion |
| Abylai | Water, Products | Array-based catalogue, search and type filtering, interactive comparison |
| Aisu | Business, Contact | Cost calculator, custom form validation, live feedback and reset |

Each member maintains the footer on their two pages. Actual contributions are recorded in Git history.

## Run

Run the website folder with VS Code Live Server. Use the same server address for all pages so they share the theme preference. No installation or build is needed. Bootstrap 5.3.3 CSS loads from its CDN, so an internet connection is required. jQuery 3.7.1 loads from its CDN. An internet connection is required.

## Pages and features

- `index.html`: original hero and recommendation form based on water preference and purpose, with validation, result and reset.
- `about.html`: original brand content plus FAQ rendered from an array, search across questions and answers, empty-result feedback and one-answer-at-a-time jQuery accordion.
- `quality.html`: original image and comparison table plus selection of BLUE/SILVER, updated product details and table highlighting.
- `products.html`: original products, images, badges, descriptions and links rendered from an array; case-insensitive search combined with a water-type filter and reset.
- `business.html`: original business content plus a validated quantity and price calculator.
- `contact.html`: custom required-field checks, name/email/topic/message rules, field-specific errors, focus on the first invalid field, character counter and reset.
- All six pages: responsive navigation, company contact footer and persistent light/dark theme.

## Source organization

- `css/style.css`: original responsive midterm styles, preserved unchanged.
- `css/ataly.css`, `js/home.js`, `js/about.js`: Home and About.
- `css/abylai.css`, `js/products.js`, `js/water.js`: Water and Products.
- `css/aisu.css`, `js/business.js`, `js/contact.js`: Business and Contact.
- `images/`: original images.

Each page loads its own feature scripts and the shared theme files css/theme.css and js/theme.js. Page-owner CSS repeats a small navigation/focus rule so contributors can maintain their pages without editing someone else's files.

## Behavior and limits

The contact form checks data locally; online sending is unavailable. It does not send or store messages. Success means validation passed, not delivery. The displayed calculator prices (500/600 KZT) are reference values for estimation, not confirmed commercial quotations. Changing calculator inputs clears the previous result. Form data and selections reset on reload. The theme preference persists. No API key, account system or backend is required.

## Testing

1. Open index.html using VS Code Live Server.
2. Check navigation between all six pages.
3. Test the Home recommendation form and Reset button.
4. Search FAQ questions and open their answers.
5. Search products, select a water type and reset the filters.
6. Select BLUE and SILVER on the Water page.
7. Test the calculator with valid and invalid quantities.
8. Test the Contact form with empty, invalid and valid values.
9. Switch the theme, navigate between pages and reload.
10. Check the layout on mobile and desktop.

## Publication

- Website: https://ataly001.github.io/midka-web/
- Repository: https://github.com/Ataly001/midka-web

## Final features

| Member | Final contribution |
| --- | --- |
| Ataly | Three-day forecast on Home and this README |
| Abylai | Bottle pack comparison on Water and persistent favorites on Products |
| Aisu | Delivery plans and the delivery overview on Business |

1. **API:** Choose Astana, Almaty or Shymkent on Home and request a three-day forecast. The page shows loading, success, empty or error feedback and builds the forecast cards from JSON.
2. **OOP:** The Water page creates two `BottlePack` objects. Their methods calculate bottle counts and water volumes from the number of packs entered.
3. **Persistent favorites:** Products saves favorites as JSON in `localStorage` under `neos-favorites`. Users can save, remove or clear favorites.
4. **CRUD:** Business supports creating, viewing, editing and deleting delivery plans. Plans are saved as JSON under `neos-delivery-plans`.
5. **Dashboard:** The delivery overview updates the total number of plans, bottles and estimated cost. Two bars show the share of BLUE and SILVER bottles.

## Forecast API

- Provider: [Open-Meteo](https://open-meteo.com/en/docs).
- Endpoint: `GET https://api.open-meteo.com/v1/forecast`.
- Request: city coordinates, `forecast_days=3`, `timezone=auto`, and daily minimum and maximum temperatures.
- Response: `daily.time`, `daily.temperature_2m_min` and `daily.temperature_2m_max`. Each date and pair of temperatures share the same array index.
- This course project uses the public forecast endpoint with no secret key. An internet connection is required.

## Testing the final features

1. Run the project with Live Server. On Home request a forecast, change the city and try again. Use the browser offline mode to check the error message.
2. On Water enter 2 packs. Expect 12 bottles and 6 L for Small, and 24 bottles and 12 L for Large. Try 0 and 1.5 to check validation.
3. On Products save BLUE and reload. Turn on Show only favorites and verify that the catalog also respects the search and type filters. Remove BLUE or save both and use Clear favorites. The old product search and filters still work.
4. On Business create a 20-bottle BLUE plan, reload, edit it to 5 SILVER bottles, then delete it. Verify the totals and bars update each time.
5. For storage recovery, put invalid JSON in either final storage key in a test profile and reload. The feature should open with an empty list and allow new entries.
6. Check all six pages at mobile, tablet and desktop widths, and repeat the earlier checks for theme, FAQ, recommendations and validation.

Delivery plans and favorites belong to the browser and site address where they were saved. Delivery plans are estimates stored on the device.

## Mobile navigation

At 768 px or narrower, tap Menu to open or close the six page links.
Escape closes an open menu and returns focus to the button.
The existing theme button stays accessible in the header.
Ataly's archive includes the two shared files for this feature.

The delivery form shows an estimate as soon as the water type and quantity are valid. Try a plan name of `123` or `@@@`, an empty water type, and quantities such as `abc`, `1.5`, `0` and `1001`. Each invalid field should show its own message. Names such as `Office 2` and `Офис 2` are accepted. The overview shows the share bars once a plan exists.
