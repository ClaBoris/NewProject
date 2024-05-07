CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY ,
    product_id BIGINT NOT NULL REFERENCES products(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating>=1 and rating<=5) 
);


CREATE TABLE tracked_events (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    product_id INT REFERENCES products(id) ON DELETE CASCADE
);
