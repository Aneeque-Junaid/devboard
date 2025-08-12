// src/app.ts

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import apiRouter from './api';
import errorHandler from './middleware/errorHandler';

const app: Application = express();

// Core Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP' });
});

// API Routes
app.use('/api/v1', apiRouter); // All API routes will be prefixed with /api/v1

// Not Found Handler (for any request that doesn't match a route)
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// Global Error Handler (must be the last piece of middleware)
app.use(errorHandler);

export default app;
