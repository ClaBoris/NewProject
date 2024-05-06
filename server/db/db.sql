CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY ,
    product_id BIGINT NOT NULL REFERENCES products(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating>=1 and rating<=5) 
);