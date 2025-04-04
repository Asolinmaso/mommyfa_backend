import { Request, Response } from 'express';
import { storage } from '../storage';

// Controller for handling category operations
export const categoryController = {
  // Get all categories
  getAllCategories: async (req: Request, res: Response) => {
    try {
      const categories = await storage.getAllCategories();
      return res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
  },
  
  // Get category by ID
  getCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await storage.getCategory(parseInt(id));
      
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      return res.status(200).json(category);
    } catch (error) {
      console.error('Error fetching category:', error);
      return res.status(500).json({ error: 'Failed to fetch category details' });
    }
  },
  
  // Create a new category
  createCategory: async (req: Request, res: Response) => {
    try {
      const { name, image } = req.body;
      
      if (!name || !image) {
        return res.status(400).json({ error: 'Missing required category information' });
      }
      
      // Check if category with the same name already exists
      const existingCategory = await storage.getCategoryByName(name);
      if (existingCategory) {
        return res.status(400).json({ error: 'Category with this name already exists' });
      }
      
      // Create the category
      const category = await storage.createCategory({
        name,
        image,
        createdBy: (req.user as any).id
      });
      
      return res.status(201).json(category);
    } catch (error) {
      console.error('Error creating category:', error);
      return res.status(500).json({ error: 'Failed to create category' });
    }
  },
  
  // Update a category
  updateCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, image } = req.body;
      
      // Check if category exists
      const category = await storage.getCategory(parseInt(id));
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      // If name is being updated, check if it conflicts with an existing category
      if (name && name !== category.name) {
        const existingCategory = await storage.getCategoryByName(name);
        if (existingCategory && existingCategory.id !== parseInt(id)) {
          return res.status(400).json({ error: 'Category with this name already exists' });
        }
      }
      
      // Update the category
      const updatedCategory = await storage.updateCategory(parseInt(id), {
        name,
        image
      });
      
      return res.status(200).json(updatedCategory);
    } catch (error) {
      console.error('Error updating category:', error);
      return res.status(500).json({ error: 'Failed to update category' });
    }
  },
  
  // Delete a category
  deleteCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      // Check if category exists
      const category = await storage.getCategory(parseInt(id));
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      // Delete the category
      const deleted = await storage.deleteCategory(parseInt(id));
      
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(500).json({ error: 'Failed to delete category' });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      return res.status(500).json({ error: 'Failed to delete category' });
    }
  },
  
  // Get products by category
  getProductsByCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      // Check if category exists
      const category = await storage.getCategory(parseInt(id));
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      // Get products for the category
      const products = await storage.getProductsByCategory(parseInt(id));
      
      return res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching category products:', error);
      return res.status(500).json({ error: 'Failed to fetch category products' });
    }
  }
};