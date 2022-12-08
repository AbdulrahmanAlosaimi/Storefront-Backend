CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER,
    category VARCHAR(255)
);

INSERT INTO products (name, price, category) VALUES ('Table', '150', 'Home Decorations');
INSERT INTO products (name, price, category) VALUES ('Chair', '75', 'Home Decorations');
INSERT INTO products (name, price, category) VALUES ('Curtains', '175', 'Home Decorations');

INSERT INTO products (name, price, category) VALUES ('Tony Hawk Pro Skater 2', '15', 'Video Games');
INSERT INTO products (name, price, category) VALUES ('The Warriors', '10', 'Video Games');
INSERT INTO products (name, price, category) VALUES ('Super Mario Bros', '20', 'Video Games');

INSERT INTO products (name, price, category) VALUES ('Playstation Gift Card', '20', 'Gift Cards');
INSERT INTO products (name, price, category) VALUES ('Amazon Gift Card', '50', 'Gift Cards');
INSERT INTO products (name, price, category) VALUES ('Spotify 1M Gift Card', '10', 'Gift Cards');