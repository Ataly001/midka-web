# Testing

## Home

- Submit without selections: error shown, first missing select focused, no navigation.
- Sparkling + personal: BLUE recommendation linking to Products.
- Still + personal: SILVER recommendation linking to Products.
- Compare both + personal: compare-both recommendation.
- Any valid preference + business: relevant recommendation linking to Business.
- Change either selection after a result: stale result disappears. Reset clears selections/result/errors.

## About

- Five questions appear from the array; answers initially collapsed.
- Search ` sparkling `: one BLUE question. Search matches answers too.
- Search `zzz`: no matching questions, old results removed.
- Clear search: five questions restored and their buttons work.
- Open one answer then another: only the latest remains open. Click again: it closes.
- Rapid clicks and search edits do not leave queued/stuck animations.
- Tab then Enter/Space activates FAQ buttons. aria-expanded matches open/closed state.

## Products

- Two cards appear with original images, names, descriptions, SPARKLING/STILL badges and Learn more links.
- Search ` BLUE `: BLUE only. Search `still`: SILVER only.
- Select Still while BLUE search remains: no-results message.
- Reset: empty search, All water, both cards restored.

## Water

- Original image and table remain.
- Choose SILVER: corresponding table row highlighted; SILVER image, heading, description and accessible image text shown.
- Choose BLUE: only BLUE highlighted, details update.
- Choose full comparison: highlight cleared and detail card hidden.
- View products opens Products.

## Business

- SILVER × 10 = 5,000 KZT; BLUE × 10 = 6,000 KZT.
- 1 and 1000 accepted; blank, 0, negative values, 1.5 and 1001 rejected.
- Editing quantity or type clears stale results and error state.
- Calculation creates no order and uses the displayed reference amounts.

## Contact

- Empty submit: errors beside all four fields; summary, no navigation, first invalid field focused.
- Whitespace-only values fail. Name must contain 2–60 trimmed characters.
- `wrong`, `a@b`, `a@@b.com` fail basic email format; a normal address passes.
- Topic required and restricted to listed values.
- Message must contain 10–1000 trimmed characters. The counter reports raw typed length, including spaces.
- Correcting a field with an error updates its feedback as the user types.
- Valid data shows `Your details are valid.`, resets the form/counter and never claims delivery.
- Clear form resets values, messages and invalid attributes, including after successful validation.

## All pages

- Header links navigate to all six pages. Verify the company details and telephone link in the footer. Run over HTTP at one origin. Switch to dark mode, navigate through all six pages, reload and use Back. Open a second tab and check that switching back to light mode updates it. Original Discover, See products, Become a partner and Learn more links still work.
- At 375 px, 768 px and desktop width, check navigation, footer, controls, images and long feedback text for overlap or horizontal overflow.
- Tab through controls; focus remains visible and labels identify fields.
- Check Console after reload and interaction. No application errors, missing local assets or failed Bootstrap stylesheet in a normal connected browser.
- Repeat on the actual published URL after deployment.

## Preparation verification

Local browser checks exercised Home validation/recommendations/reset, FAQ search/empty results and accordion behavior after re-rendering, combined product filters/reset, BLUE/SILVER detail changes and highlight reset, calculator rejection/totals, and invalid/valid contact feedback/reset. Widths of 375 and 768 px were checked in browser frames: no horizontal document overflow, one footer per page, no broken images. No application warnings/errors were observed in the captured console; browser-extension diagnostics were excluded.

The final package is also checked for JavaScript syntax, local references, unique IDs, control labels and ordered commit replay. Publication and real-device verification remain release checks.

Verify that the navy header stays visible while scrolling and highlights the current page. When opening HTML directly, click the site links to carry the theme between pages.
