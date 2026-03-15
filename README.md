# Purchasing Power Parity

A web application that helps you understand and apply Purchasing Power Parity (PPP) to make your products affordable worldwide.

Features an interactive price calculator, a searchable country table with PPP conversion factors, and API documentation.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Built for deployment on [Coolify](https://coolify.io/) via the included Dockerfile:

```bash
docker build -t ppp .
docker run -p 3000:3000 ppp
```

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [PPP API](https://ppp-api.fly.dev/)

## License

MIT
