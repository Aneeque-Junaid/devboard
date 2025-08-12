# Project Requirement Document: DevBoard

## 1. Introduction

This document outlines the project requirements for DevBoard, a developer-focused API marketplace. DevBoard aims to provide a robust platform for API providers to publish and manage their APIs, and for API consumers to discover, subscribe to, and utilize these APIs efficiently. The platform will handle critical functionalities such as authentication, API key management, rate limiting, analytics, and subscription payments, ensuring a seamless experience for all users.




## 2. Project Overview

**Project Name:** DevBoard

**Description:**
DevBoard is envisioned as a comprehensive API marketplace designed specifically for developers. It will serve as a central hub where API providers can seamlessly publish their APIs, making them available to a wide audience of consumers. Conversely, API consumers will be able to easily discover, subscribe to, and integrate these APIs into their applications. The platform's core infrastructure will manage essential services including secure authentication, efficient API key management, flexible rate limiting, insightful analytics, and streamlined subscription payment processing. This integrated approach ensures a robust, scalable, and user-friendly environment for both API producers and consumers.

## 3. Objectives & Goals

The primary objectives and goals for the DevBoard platform are as follows:

*   **API Provider Empowerment:** To enable API providers with intuitive tools and functionalities to register, publish, and effectively manage their APIs on the platform.
*   **API Consumer Accessibility:** To facilitate API consumers in effortlessly discovering and subscribing to a diverse range of APIs that meet their development needs.
*   **Robust Authentication System:** To implement a secure and versatile authentication mechanism, supporting both OAuth and traditional email/password registration and login methods.
*   **Efficient API Key and Rate Limiting Management:** To establish a system for generating and managing unique API keys for consumers, coupled with a robust rate-limiting framework based on their respective subscription plans.
*   **Comprehensive Analytics:** To provide detailed analytics on API usage, offering valuable insights to both API providers (for their own APIs) and consumers (for their usage statistics).
*   **Seamless Payment Integration:** To integrate a reliable payment gateway, specifically Stripe, to handle payments for premium API subscriptions, ensuring secure and automated transactions.
*   **Administrative Control and Moderation:** To equip administrators with the necessary controls for API approval, user management, and platform moderation, maintaining the quality and integrity of the marketplace.




## 4. System Roles

The DevBoard platform defines three primary system roles, each with distinct responsibilities and access levels:

*   **Admin:** Administrators possess overarching control and oversight of the platform. Their responsibilities include, but are not limited to, approving new API listings, managing user accounts, and monitoring for and addressing any abuse or policy violations.
*   **Provider:** API Providers are individuals or entities who publish and manage their own APIs on the DevBoard marketplace. They are responsible for the lifecycle of their APIs, from initial registration to ongoing maintenance and updates.
*   **Consumer:** API Consumers are developers or applications that subscribe to and utilize APIs available on the DevBoard platform. They interact with the APIs via unique API keys issued upon subscription.




## 5. Core Features

DevBoard will incorporate a suite of core features designed to support its objectives and cater to the needs of its diverse user base:

### 5.1. Authentication & Authorization

This module will provide secure and flexible user authentication and authorization capabilities:

*   **Email/Password Registration + Login:** Standard user registration and login functionality using email and password combinations.
*   **OAuth Login (Google, GitHub):** Integration with popular OAuth providers like Google and GitHub for convenient and secure sign-in options.
*   **Email Verification & Password Reset:** Mechanisms for verifying user email addresses upon registration and for securely resetting forgotten passwords.
*   **Role-Based Access Control (RBAC):** Implementation of RBAC to ensure that users can only access functionalities and data relevant to their assigned roles (Admin, Provider, Consumer).

### 5.2. API Management

This feature set will enable API providers to effectively manage their API offerings:

*   **API Registration:** Providers will be able to register new APIs, providing essential details such as:
    *   Name, description, and base URL.
    *   Documentation URL or inline documentation.
    *   Categorization and tagging for improved discoverability.
    *   Definition of subscription plans (Free / Paid) associated with the API.
*   **Admin Approval Workflow:** All new API listings will undergo an administrative approval process before becoming publicly available on the marketplace.

### 5.3. Subscription & Payments

This module will facilitate API subscriptions and handle payment processing:

*   **Consumer Subscription:** Consumers will have the ability to subscribe to available APIs.
*   **Tiered Subscription Plans:** Support for different subscription tiers, including:
    *   **Free Plan:** Offering limited requests per month to allow for API evaluation.
    *   **Paid Plans:** Integration with Stripe for secure payment processing for premium API access.
*   **Automated Billing:** Features for automatic plan renewal and cancellation to streamline the subscription lifecycle.

### 5.4. API Key & Rate Limiting

To ensure controlled and secure API access, the platform will include:

*   **Unique API Key Generation:** Generation of a unique API key for each consumer per API subscription.
*   **API Key Validation Middleware:** Implementation of middleware to validate API keys on every request, ensuring only authorized access.
*   **Rate Limiting Enforcement:** Enforcement of rate limits based on the consumer's active subscription plan, preventing abuse and ensuring fair usage.

### 5.5. Analytics

Comprehensive analytics will be provided to offer insights into API usage:

*   **API Usage Tracking:** Tracking of key metrics such as API call count, error rates, and latency.
*   **Provider Analytics Dashboard:** API providers will have access to dashboards displaying usage statistics for their own APIs.
*   **Consumer Usage Statistics:** Consumers will be able to view their personal API usage statistics.

### 5.6. Search & Discovery

To enhance the discoverability of APIs, the platform will offer:

*   **Advanced Search Functionality:** Ability to search for APIs by name, category, or provider.
*   **Filtering Options:** Options to filter API listings by free or paid subscription plans.




## 6. Detailed Functional Requirements

This section details the specific functional requirements for each major component of the DevBoard platform, outlining the methods, endpoints, descriptions, authentication requirements, and associated user roles.

### 6.1. Authentication (Auth) Endpoints

| Method | Endpoint             | Description                 | Auth Required | Role       |
|--------|----------------------|-----------------------------|---------------|------------|
| POST   | `/auth/register`     | Register with email/password| No            | -          |
| POST   | `/auth/login`        | Login with email/password   | No            | -          |
| POST   | `/auth/oauth/google` | OAuth login with Google     | No            | -          |
| POST   | `/auth/oauth/github` | OAuth login with GitHub     | No            | -          |
| POST   | `/auth/forgot-password`| Request password reset email| No            | -          |
| POST   | `/auth/reset-password`| Reset password via token    | No            | -          |
| GET    | `/auth/me`           | Get current user profile    | Yes           | All        |




### 6.2. User Management Endpoints

| Method | Endpoint         | Description             | Auth Required | Role         |
|--------|------------------|-------------------------|---------------|--------------|
| GET    | `/users/:id`     | Get user profile by ID  | Yes           | Admin / Self |
| PATCH  | `/users/:id`     | Update user profile     | Yes           | Admin / Self |
| DELETE | `/users/:id`     | Delete user             | Yes           | Admin / Self |




### 6.3. API Management Endpoints

| Method | Endpoint             | Description                     | Auth Required | Role           |
|--------|----------------------|---------------------------------|---------------|----------------|
| POST   | `/apis`              | Create a new API listing        | Yes           | Provider       |
| GET    | `/apis`              | List all approved APIs (search, filter)| No            | -              |
| GET    | `/apis/:id`          | Get API details by ID           | No            | -              |
| PATCH  | `/apis/:id`          | Update API details              | Yes           | Provider (owner)|
| DELETE | `/apis/:id`        | Delete API listing              | Yes           | Provider (owner)|
| PATCH  | `/apis/:id/approve`  | Approve API (admin only)        | Yes           | Admin          |




### 6.4. Subscription & API Keys Endpoints

| Method | Endpoint             | Description                     | Auth Required | Role           |
|--------|----------------------|---------------------------------|---------------|----------------|
| POST   | `/subscriptions`     | Subscribe to an API             | Yes           | Consumer       |
| GET    | `/subscriptions`     | List user subscriptions         | Yes           | Consumer       |
| GET    | `/subscriptions/:id` | Get subscription details        | Yes           | Consumer       |
| DELETE | `/subscriptions/:id` | Cancel subscription             | Yes           | Consumer       |
| GET    | `/apikeys`           | List API keys for user          | Yes           | Consumer       |
| POST   | `/apikeys`           | Generate new API key            | Yes           | Consumer       |
| DELETE | `/apikeys/:id`       | Revoke API key                  | Yes           | Consumer       |




### 6.5. Analytics Endpoints

| Method | Endpoint             | Description                     | Auth Required | Role           |
|--------|----------------------|---------------------------------|---------------|----------------|
| GET    | `/analytics/api/:id` | Get usage stats for API         | Yes           | Provider (owner)|
| GET    | `/analytics/user/:id`| Get user’s usage stats          | Yes           | Consumer       |




## 7. Database Schema (Prisma)

The DevBoard platform will utilize a PostgreSQL database, managed through Prisma ORM. The following outlines the key entities and their relationships within the database schema:

### 7.1. User Model

```prisma
model User {
  id            String   @id @default(cuid())
  name          String
  email         String   @unique
  password      String?
  provider      String?  // OAuth provider name
  providerId    String?  // OAuth user ID
  role          Role     @default(CONSUMER)
  apis          API[]    @relation("APIProvider")
  subscriptions Subscription[]
  apiKeys       APIKey[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum Role {
  ADMIN
  PROVIDER
  CONSUMER
}
```

### 7.2. API Model

```prisma
model API {
  id            String   @id @default(cuid())
  name          String
  description   String
  baseUrl       String
  docsUrl       String?
  category      String
  status        APIStatus @default(PENDING)
  owner         User     @relation("APIProvider", fields: [ownerId], references: [id])
  ownerId       String
  subscriptions Subscription[]
  plans         Plan[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum APIStatus {
  PENDING
  APPROVED
  REJECTED
}
```

### 7.3. Plan Model

```prisma
model Plan {
  id        String  @id @default(cuid())
  name      String
  price     Float   // 0 for free plan
  requestsPerMonth Int
  api       API     @relation(fields: [apiId], references: [id])
  apiId     String
}
```

### 7.4. Subscription Model

```prisma
model Subscription {
  id        String  @id @default(cuid())
  user      User    @relation(fields: [userId], references: [id])
  userId    String
  api       API     @relation(fields: [apiId], references: [id])
  apiId     String
  plan      Plan    @relation(fields: [planId], references: [id])
  planId    String
  apiKey    APIKey?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 7.5. APIKey Model

```prisma
model APIKey {
  id             String   @id @default(cuid())
  key            String   @unique
  subscription   Subscription @relation(fields: [subscriptionId], references: [id])
  subscriptionId String
  createdAt      DateTime @default(now())
}
```

### 7.6. UsageLog Model

```prisma
model UsageLog {
  id          String   @id @default(cuid())
  apiKey      APIKey   @relation(fields: [apiKeyId], references: [id])
  apiKeyId    String
  endpoint    String
  statusCode  Int
  latencyMs   Int
  createdAt   DateTime @default(now())
}
```




## 8. Non-Functional Requirements

Beyond the core functionalities, the DevBoard platform will adhere to the following non-functional requirements to ensure a robust, secure, and performant system:

*   **Security:**
    *   **Password Hashing:** User passwords will be securely stored using `bcrypt` for robust hashing.
    *   **Session Management:** JSON Web Tokens (JWT) will be employed for secure session management.
    *   **Data in Transit:** All communication will be secured using HTTPS.
    *   **Rate Limiting:** Comprehensive rate limiting will be implemented to prevent abuse and denial-of-service attacks.
*   **Scalability:** The system will be designed for horizontal scalability, primarily through a stateless API architecture, allowing for easy expansion to handle increased load.
*   **Documentation:** API documentation will be generated and maintained using industry standards like Swagger/OpenAPI, ensuring clear and accessible information for API consumers.
*   **Logging:** A centralized logging system, utilizing libraries such as Winston or Pino, will be implemented for effective monitoring, debugging, and auditing.
*   **Testing:** The development process will incorporate a comprehensive testing strategy, including both unit and integration tests, primarily using Jest, to ensure code quality and system reliability.




## 9. Tech Stack

The DevBoard platform will be built using the following technologies and frameworks:

*   **Backend:** Node.js with Express.js for the API server, and Prisma as the ORM for database interaction.
*   **Database:** PostgreSQL will serve as the primary relational database.
*   **Authentication:** Passport.js will be used for authentication strategies, complemented by JWT for token-based authentication.
*   **Payments:** Stripe will be integrated for handling all payment processing related to API subscriptions.
*   **API Documentation:** Swagger/OpenAPI will be utilized for generating and serving interactive API documentation.
*   **Rate Limiting:** `express-rate-limit` or a custom Redis-based limiter will be implemented for managing API request rates.



