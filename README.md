# WholeCart QA Assessment — Focused Playwright Tests


## Quick start in VS Code (Windows PowerShell)


   ```

1. Install dependencies:

   
   npm install
   npx playwright install chromium
   

2. Run API tests:

   npm run test:api
  

3. Run UI test:

  npm run test:ui
   

4. Run all 13 tests:

   npm test
  

5. View the report:

   npm run report


## What the suite checks

- Login and token use, incorrect password and anonymous requests
- Buyer forbidden from operator and seller endpoints
- Operator access to settings
- Buyer catalogue, slots, cart and orders read access
- Seller order access
- Basic homepage render
- Basic Login 



Run in VS Code:


npm install
npx playwright install chromium
npx playwright test



Use these values in .env File 

API_BASE_URL=http://13.200.185.1/c/pratik-911613
APP_URL=http://13.200.185.1/c/pratik-911613
BUYER_USERNAME=buyer1
BUYER2_USERNAME=buyer2
SELLER_USERNAME=seller1
OPERATOR_USERNAME=operator
TEST_PASSWORD=Test@123

