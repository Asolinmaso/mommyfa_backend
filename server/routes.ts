import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import paymentRoutes from "./routes/payment.routes";
import categoryRoutes from "./routes/category.routes";
import sellerRoutes from "./routes/seller.routes";
import productRoutes from "./routes/product.routes";
import { isAuthenticated, isAdmin, isSeller, isBuyer, isAdminOrSeller } from "./middleware/auth";

// Setup all routes
export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes (/api/register, /api/login, /api/logout, /api/user)
  await setupAuth(app);
  
  // Register payment routes
  app.use('/api/payments', paymentRoutes);
  
  // Register category routes
  app.use('/api/categories', categoryRoutes);
  
  // Register seller routes
  app.use('/api/seller', sellerRoutes);
  
  // Register product routes
  app.use('/api/products', productRoutes);
  
  // User routes
  app.get("/api/users", isAdmin, async (req, res, next) => {
    try {
      const users = await storage.getAllUsers();
      // Remove password from each user
      const sanitizedUsers = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      res.json(sanitizedUsers);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/users/role/:role", isAdmin, async (req, res, next) => {
    try {
      const { role } = req.params;
      const users = await storage.getUsersByRole(role);
      // Remove password from each user
      const sanitizedUsers = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      res.json(sanitizedUsers);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/users/:id", isAuthenticated, async (req, res, next) => {
    try {
      const id = req.params.id;
      
      // Only allow users to view their own profile unless they're an admin
      if (
        (req.user as any).role !== "admin" && 
        (req.user as any).id !== id
      ) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  });

  app.put("/api/users/:id", isAuthenticated, async (req, res, next) => {
    try {
      const id = req.params.id;
      
      // Only allow users to update their own profile unless they're an admin
      if (
        (req.user as any).role !== "admin" && 
        (req.user as any).id !== id
      ) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Don't allow role changes unless by admin
      if (req.body.role && (req.user as any).role !== "admin") {
        delete req.body.role;
      }
      
      // Don't update password directly
      delete req.body.password;
      
      const updatedUser = await storage.updateUser(id, req.body);
      
      // Remove password from response
      if (updatedUser) {
        const { password, ...userWithoutPassword } = updatedUser;
        res.json(userWithoutPassword);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/users/:id", isAdmin, async (req, res, next) => {
    try {
      const id = req.params.id;
      
      // Don't allow deleting the admin user
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      if (user.role === "admin") {
        return res.status(403).json({ error: "Cannot delete admin user" });
      }
      
      const deleted = await storage.deleteUser(id);
      
      if (deleted) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}