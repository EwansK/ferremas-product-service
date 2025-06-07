import express from 'express';
const router = express.Router();

export default (pool) => {
  // Get all products
  router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM products ORDER BY id');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get product by ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Create product
  router.post('/', async (req, res) => {
    const { product_code, brand, code, name, category, on_sale, price_history } = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO products (product_code, brand, code, name, category, on_sale, price_history)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [product_code, brand, code, name, category, on_sale, price_history]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update product
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { product_code, brand, code, name, category, on_sale, price_history } = req.body;
    try {
      const result = await pool.query(
        `UPDATE products SET product_code = $1, brand = $2, code = $3, name = $4,
         category = $5, on_sale = $6, price_history = $7 WHERE id = $8 RETURNING *`,
        [product_code, brand, code, name, category, on_sale, price_history, id]
      );
      if (result.rowCount === 0) return res.status(404).json({ error: 'Product not found' });
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete product
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) return res.status(404).json({ error: 'Product not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};
