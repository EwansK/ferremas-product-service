# Ferremas Product Service

Product management microservice for the Ferremas e-commerce platform.

## Development

```bash
npm install
npm start
```

## Docker

```bash
docker build -t ferremas-product-service .
docker run -p 4001:4001 ferremas-product-service
```

## Environment Variables

- `PGHOST` - PostgreSQL host
- `PGUSER` - PostgreSQL username
- `PGPASSWORD` - PostgreSQL password
- `PGDATABASE` - PostgreSQL database name
- `PGPORT` - PostgreSQL port
- `PORT` - Service port (default: 4001)

## API Endpoints

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /health` - Health check