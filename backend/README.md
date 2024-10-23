# E-Commerce Backend API

This is the backend API for our e-commerce platform. It provides endpoints for user authentication, product management, order processing, and admin functionalities.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables in a `.env` file
4. Start the server: `npm start`

## API Endpoints

### Authentication

#### Register a new user
- **POST** `/api/auth/register`
- Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Login
- **POST** `/api/auth/login`
- Body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Forgot Password
- **POST** `/api/auth/forgotpassword`
- Body:
  ```json
  {
    "email": "john@example.com"
  }
  ```

#### Reset Password
- **PUT** `/api/auth/resetpassword/:resettoken`
- Body:
  ```json
  {
    "password": "newpassword123"
  }
  ```

### User Profile

#### Get User Profile
- **GET** `/api/users/profile`
- Headers: 
  - Authorization: Bearer {token}

#### Update User Profile
- **PUT** `/api/users/profile`
- Headers: 
  - Authorization: Bearer {token}
- Body:
  ```json
  {
    "name": "John Updated",
    "email": "johnupdated@example.com"
  }
  ```

### Products

#### Get All Products
- **GET** `/api/products`

#### Get Single Product
- **GET** `/api/products/:id`

#### Create Product (Admin only)
- **POST** `/api/products`
- Headers: 
  - Authorization: Bearer {admin_token}
- Body:
  ```json
  {
    "name": "New Product",
    "description": "Product description",
    "price": 19.99,
    "category": "Electronics",
    "stock": 100
  }
  ```

#### Update Product (Admin only)
- **PUT** `/api/products/:id`
- Headers: 
  - Authorization: Bearer {admin_token}
- Body:
  ```json
  {
    "name": "Updated Product",
    "price": 24.99
  }
  ```

#### Delete Product (Admin only)
- **DELETE** `/api/products/:id`
- Headers: 
  - Authorization: Bearer {admin_token}

#### Search Products
- **GET** `/api/products/search?keyword=phone`

#### Get Products by Category
- **GET** `/api/products/category/:category`

#### Add Product Review
- **POST** `/api/products/:id/reviews`
- Headers: 
  - Authorization: Bearer {token}
- Body:
  ```json
  {
    "rating": 5,
    "comment": "Great product!"
  }
  ```

#### Get Product Reviews
- **GET** `/api/products/:id/reviews`

### Cart

#### Add to Cart
- **POST** `/api/cart`
- Headers: 
  - Authorization: Bearer {token}
- Body:
  ```json
  {
    "productId": "product_id_here",
    "quantity": 2
  }
  ```

#### Get Cart
- **GET** `/api/cart`
- Headers: 
  - Authorization: Bearer {token}

#### Update Cart Item
- **PUT** `/api/cart/:itemId`
- Headers: 
  - Authorization: Bearer {token}
- Body:
  ```json
  {
    "quantity": 3
  }
  ```

#### Remove from Cart
- **DELETE** `/api/cart/:itemId`
- Headers: 
  - Authorization: Bearer {token}

### Wishlist

#### Add to Wishlist
- **POST** `/api/wishlist`
- Headers: 
  - Authorization: Bearer {token}
- Body:
  ```json
  {
    "productId": "product_id_here"
  }
  ```

#### Get Wishlist
- **GET** `/api/wishlist`
- Headers: 
  - Authorization: Bearer {token}

#### Remove from Wishlist
- **DELETE** `/api/wishlist/:productId`
- Headers: 
  - Authorization: Bearer {token}

### Orders

#### Create Order
- **POST** `/api/orders`
- Headers: 
  - Authorization: Bearer {token}
- Body:
  ```json
  {
    "shippingAddress": "123 Main St, City, Country"
  }
  ```

#### Get User Orders
- **GET** `/api/orders`
- Headers: 
  - Authorization: Bearer {token}

### Admin

#### Get Dashboard Stats
- **GET** `/api/admin/dashboard`
- Headers: 
  - Authorization: Bearer {admin_token}

#### Get Pending Orders
- **GET** `/api/admin/orders/pending`
- Headers: 
  - Authorization: Bearer {admin_token}

#### Accept Order
- **PUT** `/api/admin/orders/:orderId/accept`
- Headers: 
  - Authorization: Bearer {admin_token}

#### Get All Orders
- **GET** `/api/admin/orders`
- Headers: 
  - Authorization: Bearer {admin_token}

#### Update Order Status
- **PUT** `/api/admin/orders/:orderId/status`
- Headers: 
  - Authorization: Bearer {admin_token}
- Body:
  ```json
  {
    "status": "Shipped"
  }
  ```

#### Get Product Inventory
- **GET** `/api/admin/inventory`
- Headers: 
  - Authorization: Bearer {admin_token}

#### Update Product Stock
- **PUT** `/api/admin/inventory/:productId`
- Headers: 
  - Authorization: Bearer {admin_token}
- Body:
  ```json
  {
    "stock": 150
  }
  ```

## Error Handling

The API uses conventional HTTP response codes to indicate the success or failure of an API request. In general:

- 2xx: Success
- 4xx: Error that originated from the client
- 5xx: Error that originated from the server

## Authentication

Most endpoints require authentication. To authenticate requests, include an `Authorization` header with the value `Bearer {your_token}`.

## Rate Limiting

To protect the API from abuse, rate limiting is applied. Please consult the API documentation for current rate limits.

## Questions and Support

If you have any questions or need support, please contact our development team.