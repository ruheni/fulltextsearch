This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup locally

Clone this repository:

```bash
git clone git@github.com:ruheni/fulltextsearch-w-prisma.git
```

Modify the existing `env.example` to a `.env` file:

```bash
mv .env.example .env
```

Update your database connection string in `.env`. This example requires a PostgreSQL database.

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

Create and seed the database:

```bash
npx prisma migrate
npx prisma db seed
```

If the seeding was successful, you'll see the titles logged on the terminal.

View the data on Prisma Studio:

```bash
npx prisma studio
```

_Prisma studio may take a while to load because the `content` field of the `Book` contains the contents of the entire book in plain text format which is really BIG_

Start the application:

```
npm run dev
```
