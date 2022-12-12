CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password_digest VARCHAR(255) NOT NULL
);

INSERT INTO users (first_name, last_name, password_digest) VALUES ('the', 'admin', '$2a$10$evKubSPYWIYFfl4fRmyyzuSbMQKaNLFIE1zw0cQPrTt2/Yj0ZDLsi');
