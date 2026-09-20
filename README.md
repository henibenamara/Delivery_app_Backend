# Delivery App - Backend

REST API for a delivery management platform that connects clients, couriers and administrators. Built with Node.js, Express and MongoDB. It powers the [Flutter mobile app](https://github.com/henibenamara/delivery-app-frontend-).

Built as a team project during my end-of-study internship (2022).

## Features

- Registration and login per role (client, courier, admin) with JWT authentication and bcrypt password hashing
- Delivery requests: create, update, verify and delete, with per-client and per-courier listings
- Courier offers on delivery requests
- Invoices: create, read, update and delete
- Image uploads (profile photos, delivery photos, driving licence and vehicle registration documents) with Multer
- Count and total endpoints for the admin dashboard

## Tech stack

Node.js, Express 4, MongoDB with Mongoose 6, JSON Web Tokens, bcrypt, Multer, CORS

## Project structure

```text
Config/        database and handler configuration
controllers/   request handlers (auth, client, courier, admin, delivery, offer, invoice)
middlewares/   JWT verification and file upload
models/        Mongoose schemas
routes/        route definitions
server.js      entry point
```

## API overview

| Resource | Endpoints |
| --- | --- |
| Auth | `POST /api/auth/login`, `POST /api/auth/register/:role` |
| Clients | `GET /client`, `GET/PUT/DELETE /client/:clientId`, `PUT /client/image/:clientId` |
| Couriers (livreurs) | `GET /livreur`, `GET/PUT/DELETE /livreur/:livreurId`, document upload and verification routes |
| Admins (responsables) | `GET /responsable`, `GET/PUT/DELETE /responsable/:resId`, `GET /stat` |
| Deliveries | `POST /livraison`, `GET /livraison`, `GET/PUT/DELETE /livraison/:livraisonId`, `PUT /livraison/verification/:livraisonId` |
| Offers | `POST /offer`, `GET /offer`, `GET /offer/livreur/:livreur`, `GET /offer/livraison/:livraison` |
| Invoices | `POST /facture`, `GET /facture`, `GET/PUT/DELETE /facture/:facId` |

## Getting started

```bash
git clone https://github.com/henibenamara/Delivery_app_Backend.git
cd Delivery_app_Backend
npm install
```

Create a `.env` file (never commit it):

```text
DATABASE=<your MongoDB connection string>
PORT=5000
SECRET=<a long random string used to sign JWTs>
ACCESS_TOKEN_SECRET=<another long random string>
```

Then start the server:

```bash
node server.js
```

## Status

Built in 2022 and no longer maintained.
