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