## API Endpoints

#### Products

- Index route `/products` [GET]
- Show route `/products/:id` [GET]
- Create route [token required] `/products` [POST]

#### Users

- Index route [token required] `/users` [GET]
- Show [token required] `/users/:id` [GET]
- Create N[token required] `/users` [POST]
- Create (First time registeration) `/users/register` [POST]

#### Orders and Order Products

- Current Order by user (args: user id)[token required] `/orders/users/:id` [GET]
- Create Order (args: Object containing productId, orderId, quantity, userId, status) `/orders` [POST]
  Note: The way the order is created works by checking if an order has already been created with the same id, if not a new order is created and all the products information can be found in the order_products table

## Data Shapes

#### Product

- id: SERIAL PRIMARY KEY
- name: VARCHAR(255)
- price: INTEGER
- category: VARCHAR(255)

#### User

- id: SERIAL PRIMARY KEY
- first_name: VARCHAR(255)
- last_name: VARCHAR(255)
- password_digest: VARCHAR(255)
  Note: The password_digest field holds the password after it's been hashed using `bcrypt`

#### Orders

- id: SERIAL PRIMARY KEY
- status: VARCHAR(255)

#### Order Products

- product_id: INTEGER, Primary key of Products table
- quantity: INTEGER
- user_id: INTEGER, Primary key of Users table
- order_id: INTEGER, Primary key of Orders table

---

## Environment Variables

- Database connection related variables

```
POSTGRES_HOST="localhost"
POSTGRES_DB="storefront_backend"
POSTGRES_DB_TEST="storefront_backend_test"
POSTGRES_USER="admin"
POSTGRES_PASSWORD="tiger"
ENV="dev"
```

- Password hashing using bcrypt related variables

```
PEPPER="will-the-dream-be-told-or-not"
SALT_ROUNDS=10
```

- jwt related variables

```
TOKEN_SECRET="not-or-told-be-dream-the-will"
```
