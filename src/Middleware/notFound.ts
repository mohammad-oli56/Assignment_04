import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Route ${req.originalUrl} not found`,
    error: {
      path: req.originalUrl,
      method: req.method,
    },
    timestamp: new Date().toISOString(),
  });
};