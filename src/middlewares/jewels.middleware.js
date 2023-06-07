import { pool } from '../database/connections.js';

const validateInfo = async (req, res, next) => {
  const query = 'SELECT * FROM inventario';
  const response = await pool.query(query);

  if (!response) res.status(404).json({ ok: true, msg: "Data doesn't exist" });

  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id)
    res.status(400).json({
      ok: false,
      msg: 'The server cannot process the request due to the id is not valid',
    });

  next();
};

const validateBody = (req, res, next) => {
  const { nombre, categoria, metal, precio, stock } = req.body;

  if (!nombre && !categoria && !metal && !precio && !stock)
    res.status(400).json({
      ok: false,
      msg: 'The server cannot process the request due to the body params are not valid',
    });

  next();
};

const validateAllData = (req, res, next) => {
  const { id } = req.params;
  const { nombre, categoria, metal, precio, stock } = req.body;

  if (!id && !nombre && !categoria && !metal && !precio && !stock)
    res.status(400).json({
      ok: false,
      msg: 'The server cannot process the request due to the params or query are not valid',
    });

  next();
};

export const jewelsMiddlewares = {
  validateInfo,
  validateId,
  validateBody,
  validateAllData,
};
