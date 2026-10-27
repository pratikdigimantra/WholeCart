# WholeCart QA Assessment — Focused Playwright Tests

A focused Playwright suite of **13 tests** covering WholeCart's authentication, role-based access control and basic UI rendering.

## Deliverables


Screen recording : https://go.screenpal.com/watch/cO6tI3nykIm 

Bug report : https://digimantra-my.sharepoint.com/:x:/p/pratik_kumar/IQA5MsDrQiMDRKmtsyWlL14VAQqu-5rG2rpm99MlO_dVLJk?e=yNHNqw 

Test plan : https://digimantra-my.sharepoint.com/:w:/p/pratik_kumar/IQAF75hU3iv5SpGi-aNtdetZAUvr_z4QSaT2sPwPlQMDTco?e=h2ALkU

Load test : https://resplendent-centaur-ea6d15.netlify.app/


## Setup

### 1. Install dependencies

```powershell
npm install
npx playwright install chromium
```

### 2. Create the `.env` file

Create a file named `.env` in the project root with these values:

```env
API_BASE_URL=http://13.200.185.1/c/pratik-911613
APP_URL=http://13.200.185.1/c/pratik-911613
BUYER_USERNAME=buyer1
BUYER2_USERNAME=buyer2
SELLER_USERNAME=seller1
OPERATOR_USERNAME=operator
TEST_PASSWORD=Test@123
```

| Variable | Purpose |
|---|---|
| `API_BASE_URL` | Base URL for the API tests |
| `APP_URL` | Base URL for the UI tests |
| `BUYER_USERNAME` | Primary buyer account |
| `BUYER2_USERNAME` | Second buyer account |
| `SELLER_USERNAME` | Seller account |
| `OPERATOR_USERNAME` | Operator account |
| `TEST_PASSWORD` | Shared password for all test accounts |

## Running the tests

| Command | What it runs |
|---|---|
| `npm test` | All 13 tests |
| `npm run test:api` | API tests only |
| `npm run test:ui` | UI tests only |
| `npm run report` | Opens the HTML report from the last run |

You can also run Playwright directly:

```powershell
npx playwright test
```

## What the suite checks

**Authentication**
- Login and use of the returned token
- Login with an incorrect password is rejected
- Anonymous (unauthenticated) requests are rejected

**Role-based access**
- Buyer is forbidden from operator and seller endpoints
- Operator can access settings
- Buyer can read the catalogue, slots, cart and orders
- Seller can access orders

**UI**
- Homepage renders
- Login works
