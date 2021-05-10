# Ring

Demo: https://ring-store.vercel.app/

## Stack

- React with Next.js
- Styling with Styled Components & Material UI
- Prismic: Products, config and translations handle by a CMS (more integrations are possible)
- Payments: Bank account (Free) and by credit card with Stripe (Low fees)
- Transactional Emails with Sendinblue
- Deployment: Vercel

## Getting Started

1. Clone the repo

```
git clone git@github.com:lorenzogm/ecommerce.git
cd ecommerce
```

2. Install packages

```
yarn install
```

3. Setup environment variables

```
cp .env.local.example .env.local
```

4. Create a Primic account and get `PRISMIC_API_ENDPOINT`, add it to `.env.local`. More info at [https://prismic.io](https://prismic.io)

5. Create a Stripe account and get `NEXT_PUBLIC_STRIPE_API_PUBLIC` and `STRIPE_API_SECRET`, add them to `.env.local`. More info at [https://stripe.com/](https://stripe.com/)

## Prismic

The content defined in prismic needs a specific format to work with the existing code of this repository. That structure is easy to import/export with the `JSON Editor` feature from Prismic.

Those are the JSON Fields needed for this repo:

- [category.json](https://github.com/lorenzogm/ring/blob/main/src/services/prismic/customTypes/category/category.json) Repeatable Type
- [config.json](https://github.com/lorenzogm/ring/blob/main/src/services/prismic/customTypes/config/config.json) Single Type
- [product.json](https://github.com/lorenzogm/ring/blob/main/src/services/prismic/customTypes/product/product.json) Repetable Type

Create the custom types in Prismic:

1. Go to prismic and create a new Custom Type
2. Select `Single Type` to use the `config.json` or `Repeatable Type` to use `category.json` or `product.json`
3. Write the name (Category, Config or Product), select JSON Editor on the right panel and paste the content of the JSON file.
4. With the custom types created, now it's possible to create one `Config` document and several `Category`and `Product` documents.
