CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products (id),
    quantity INTEGER,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(255) NOT NULL
);