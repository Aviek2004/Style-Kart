USE stylekart;

INSERT INTO products
(name, description, brand, category, price, rating, image_url)
VALUES
(
    'Classic Black T-Shirt',
    'Premium cotton black t-shirt with a regular fit.',
    'UrbanFit',
    'T-Shirts',
    999.00,
    4.5,
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
),
(
    'Premium White Shirt',
    'Clean and minimal white shirt for everyday wear.',
    'UrbanFit',
    'Shirts',
    1499.00,
    4.6,
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf'
),
(
    'Slim Fit Shirt',
    'Modern slim-fit shirt designed for a sharp look.',
    'StreetStyle',
    'Shirts',
    1799.00,
    4.4,
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c'
),
(
    'Oversized Graphic Tee',
    'Relaxed oversized t-shirt with a modern graphic.',
    'StreetStyle',
    'T-Shirts',
    1199.00,
    4.3,
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c'
),
(
    'Relaxed Denim Jeans',
    'Comfortable relaxed-fit denim jeans.',
    'DenimCo',
    'Jeans',
    1999.00,
    4.7,
    'https://images.unsplash.com/photo-1542272604-787c3835535d'
),
(
    'Classic Blue Jeans',
    'Classic blue denim jeans with a regular fit.',
    'DenimCo',
    'Jeans',
    1699.00,
    4.5,
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246'
);

INSERT INTO product_variants
(product_id, sku, size, color, stock)
VALUES

(1, 'UFT-BLK-S', 'S', 'Black', 10),
(1, 'UFT-BLK-M', 'M', 'Black', 20),
(1, 'UFT-BLK-L', 'L', 'Black', 15),

(2, 'UFT-WHT-S', 'S', 'White', 10),
(2, 'UFT-WHT-M', 'M', 'White', 20),
(2, 'UFT-WHT-L', 'L', 'White', 15),

(3, 'STS-WHT-S', 'S', 'White', 8),
(3, 'STS-WHT-M', 'M', 'White', 15),
(3, 'STS-WHT-L', 'L', 'White', 10),

(4, 'STG-BLK-M', 'M', 'Black', 10),
(4, 'STG-BLK-L', 'L', 'Black', 15),

(5, 'DNC-BLU-M', 'M', 'Blue', 12),
(5, 'DNC-BLU-L', 'L', 'Blue', 15),

(6, 'DNC-CLB-M', 'M', 'Blue', 10),
(6, 'DNC-CLB-L', 'L', 'Blue', 12);