<p align="center">
  <img width=200px height=200px src="assets/logo.png" alt="Payroll Lens logo">
</p>

<h3 align="center">Payroll Lens</h3>

<div align="center">

[![Deploy](https://github.com/gabriel-rusu/payroll-lens/actions/workflows/deploy-cloudflare.yml/badge.svg?branch=main)](https://github.com/gabriel-rusu/payroll-lens/actions/workflows/deploy-cloudflare.yml)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/gabriel-rusu/payroll-lens.svg)](https://github.com/gabriel-rusu/payroll-lens/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/gabriel-rusu/payroll-lens.svg)](https://github.com/gabriel-rusu/payroll-lens/pulls)

</div>

---

<p align="center">
  Understand your pay: convert gross to net under Romanian tax rules, compare job offers side by side,
  and plan your time off around public holidays.
  <br>
</p>

## 📝 Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting_started)
- [Running the Tests](#tests)
- [Deployment](#deployment)
- [Project Structure](#structure)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

Payroll Lens is an installable web app (PWA) for employees in Romania who want to know what a salary is really
worth. It turns a gross salary into take-home pay (and back), shows every deduction, compares two job offers even
when they are in different currencies, and helps you plan vacations around the year's public holidays.

Everything runs in the browser: there is no backend and no account, and saved comparisons stay in your browser's
local storage.

## ✨ Features <a name = "features"></a>

### Salary Calculator

- Convert **gross → net** or **net → gross**, monthly or annual.
- Line-by-line breakdown of employee deductions (social insurance CAS, health insurance CASS, income tax) and
  the employer's total cost (including CAM).
- Switch between RON, EUR and USD using live exchange rates.

### Offer Comparison

- Enter two offers: salary (gross or net, monthly or annual, any currency), bonus, equity and vesting period,
  vacation days, work policy (remote, hybrid with on-site days, or on-site), health benefits and perks.
- Both offers are converted to one currency and compared per month:
  - **Base compensation**: monthly gross.
  - **Take home pay**: monthly net.
  - Both include the bonus. A bonus of X% is X% of one monthly salary paid once a year, so 100% adds
    salary / 12 to each month.
- The better offer is marked per category and overall. The overall winner takes the most categories; a tie
  goes to the higher take home pay.
- **Saved comparisons**: save, reopen, update and delete comparisons from a table on the page.

### Vacation Planner

- This year's public holidays for Romania.
- Floating days: the days off you get back for holidays that fall on a weekend.
- A countdown to your next day off, and out-of-office slots to plan leave.

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

- [Bun](https://bun.sh/) 1.3 or newer (the project's package manager)
- or [Docker](https://www.docker.com/) with Compose, if you'd rather not install anything else

### Run locally

```bash
bun install
bun run start
```

Open http://localhost:4200. The app reloads when you change a source file.

### Run with Docker

```bash
docker compose up --watch
```

Open http://localhost:4200. Changes in `src/` and `public/` are synced into the container and reload the app;
changing `package.json` rebuilds the image. The Dockerfile lives in `assets/docker/Dockerfile`.

### Build

```bash
bun run build
```

The production build, including the service worker, is written to `dist/payroll-lens/browser/`.

## 🔧 Running the Tests <a name = "tests"></a>

```bash
bun run test
```

Unit tests run with [Vitest](https://vitest.dev/) through the Angular CLI. The offer calculations and comparison
rules (`src/app/util/offer.comparison.spec.ts`) and the saved-comparisons store
(`src/app/service/comparison-history.service.spec.ts`) are covered.

## 🚀 Deployment <a name = "deployment"></a>

The app is deployed to **Cloudflare Pages**. Every push to `main` runs the GitHub Actions workflow in
`.github/workflows/deploy-cloudflare.yml`, which builds the app with Bun and publishes it.

To deploy by hand:

```bash
bun run deploy
```

The `_redirects` file copied into the build sends every route to `index.html`, so refreshing a page like `/offer-comparison` works.
The workflow needs one repository secret, `CLOUDFLARE_API_TOKEN`: a Cloudflare API token with the
**Account → Cloudflare Pages → Edit** permission, added under **Settings → Secrets and variables → Actions**.

## 🗂️ Project Structure <a name = "structure"></a>

```
src/app/
├── pages/        one folder per feature: salary-calculator, offer-comparison, vacation-planner
├── component/    reusable UI: offer form, offer card, comparison table, navigation, calendar
├── service/      taxes, exchange rates, public holidays, local storage, saved comparisons
├── strategy/     gross → net and net → gross tax calculators
├── util/         pure, framework-free logic: offer calculations and comparison rules
├── pipe/         money formatting
└── model/        TypeScript interfaces
public/taxes.json Romanian tax rates used by the calculators
```

The visual language is described in [DESIGN.md](DESIGN.md).

## ⛏️ Built Using <a name = "built_using"></a>

- [Angular 21](https://angular.dev/): signals, standalone components, reactive forms, service worker
- [TypeScript](https://www.typescriptlang.org/) and [RxJS](https://rxjs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/): styling
- [date-fns](https://date-fns.org/): date handling
- [Vitest](https://vitest.dev/): unit tests
- [Bun](https://bun.sh/): package manager and scripts
- [Frankfurter API](https://frankfurter.dev/): currency exchange rates
- [Nager.Date API](https://date.nager.at/): public holidays
- [Cloudflare Pages](https://pages.cloudflare.com/): hosting

## ✍️ Authors <a name = "authors"></a>

- [@gabriel-rusu](https://github.com/gabriel-rusu): idea and development
