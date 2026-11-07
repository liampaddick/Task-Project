# Task Project

Automated end-to-end tests for [Sauce Demo](https://www.saucedemo.com/), written with [Playwright](https://playwright.dev/) and TypeScript using the Page Object Model.

## Project structure

```
pages/        Page objects (login, inventory, cart, checkout steps)
test-data/    Test data and error messages
tests/        Spec files (login, inventory, checkout complete)
.env          Sauce Demo URL and login details (see note below)
playwright.config.ts
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (developed on v24)
- npm (included with Node.js)
- Internet access (the tests run against the live Sauce Demo site)

## Setup

```bash
git clone <repo-url>
cd <repo-folder>
npm install
```

`npm install` also downloads the Playwright browsers (Chromium, Firefox and WebKit) automatically, so no extra step is needed. If the browser download fails (for example on a restricted network), run it manually:

```bash
npx playwright install
```

### Environment variables

The tests read the site URL and logins from the `.env` file in the project root. It is committed to the repo on purpose, so the tests run with no extra configuration. It contains only Sauce Demo's publicly documented demo logins, so nothing in it is secret. Normally a `.env` file would not be committed.

## Running the tests

Run everything (all three browsers, headless):

```bash
npm test
```

Other useful commands:

| Command | What it does |
| --- | --- |
| `npm run test:chromium` | Run on Chromium only (fastest) |
| `npx playwright test tests/login.spec.ts` | Run a single spec file |
| `npx playwright test --grep @regression` | Run tests by tag |
| `npx playwright test --headed` | Watch the browser while tests run |
| `npx playwright test --ui` | Open Playwright's interactive UI mode |
| `npm run report` | Open the HTML report from the last run |
| `npm run clean` | Delete old `test-results` and `playwright-report` folders |

`npm test` clears the previous report and results before each run, so you never see stale output.

After a run, the HTML report is generated in `playwright-report/`. Open it with `npm run report`.

## Troubleshooting

- **Browser not found / executable doesn't exist:** run `npx playwright install`.
- **`Missing env variable ...` error:** make sure the `.env` file is present in the project root and wasn't dropped when copying or unzipping the project (it is a hidden file).
- **Timeouts or failures with no code changes:** Sauce Demo is a public site, so check you can reach https://www.saucedemo.com/ and re-run.

## To Do, improvements and reasoning
This to does not include AI recommendations as those are included in the AI variant of this task. They are recommendations to how I've approached this.
- Deeper assertions, due to time constraints I did not want to go too deep on the assertions. I was purely showing I am able to create functioning tests in a structured manner, more time and AI usage would of course mean more and deeper levels of assertions
- More coverage, I chose Logging in, cart behaviour, a full checkout flow and producing the PDF receipt as those are critical to the user completing a purchase. Sorting the inventory page, the content of the PDF and checking all the different log in states did not seem as important and in a risk based approach, these are the likely candidates I would choose. I did not include mobile specific testing, accessibilty or performance or mass coverage of unhappy paths but these would also be a consideration for increased scope given more time. I also skimmed through the checkout pages as confirming the full flow was the goal. More coverage would be given to these, especially unhappy path with more time.
- I chose to use nested describes for speed and because the flow of the website is relatively linear as well as method chaining the pages. Some of the nested describes only include one test, in the real world each describe would be used to group multiple. Given more time and complexity, I would likely opt for fixtures instead for maintainability and speed.
- An env file that's included in the repo is by no means the most secure way to store these details but as the information is public anyway, there's no harm. For local stack development this would also be fine but the variables needed would be injected via CI/CD pipelines in the real world or stored in something like AWS secrets manager as it moved off local.
- Guard assertions were used in my cart behaviour tests so there are some expects in the page file. This was a deliberate choice so that if the test was trying to add more items, say 10/15 and it failed at the first, the action captures that failure and does not waste time trying to add more. I also used guard asssertions on the log in page loading so if there's an issue it captures it at the start of the test. The timeout would capture it anyway but it's belt and braces.
- I seperated the project out into pages, test-data and tests. The locators and actions are all inside the page files, extra test data such as field inputs and error messages are in data files for that specific page and the tests just use both of these to build the blocks of the test before asserting. One change to an action or data attribute in one file applies it everywhere for maintainability.
- There isn't any API coverage so that would likely be needed as well but that extends past the coverage of this task completely.
- improved or more tailored reporting. I used Playwright's defualt HTML report so an improved and tailored version of the reporting could be implemented.
- Tagging has been included to show how it can be used although I've only implemented the one tag. In the real world mutliple tags or combinations of them would be used and then CI/CD rules would pick up the needed tests dependant on the work and agreed scope.


## AI Usage
As this was the hand written version of the task, my AI usage was limited aside from some issues with stale editor windows, creating this readme file and some small questions.

Please see the AI version of this task for more detailed AI usage and recommendations.