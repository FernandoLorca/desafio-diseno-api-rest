import { pool } from '../database/connections.js';
import format from 'pg-format';

const findAll = async (limit = 10, sort, page = 1, filters) => {
  let query = 'SELECT * FROM inventario';
  const values = [];

  if (filters) {
    const propertys = Object.keys(filters);

    const operatorsQueryObject = {
      $eq: '=',
      $gt: '>',
      $gte: '>=',
      $lt: '<',
      $lte: '<=',
      $ne: '!=',
    };

    query += ' WHERE ';

    for (const key in filters) {
      const name = key;
      const object = filters[name];
      const operator = Object.keys(object)[0];
      const value = object[operator];
      query += ' %s %s %s';
      values.push(name, operatorsQueryObject[operator], value);
      if (key !== propertys[propertys.length - 1]) {
        query += ' AND ';
      }
    }
  }

  if (sort) {
    const [property] = Object.keys(sort);
    values.push(property, sort[property]);
    query += ' ORDER BY %s %s';
  }

  if (limit) {
    values.push(limit);
    query += ' LIMIT %s';
  }

  if (limit && page) {
    values.push((page - 1) * limit);
    query += ' OFFSET %s';
  }

  try {
    const formattedQuery = format(query, ...values);
    const { rows } = await pool.query(formattedQuery);
    return rows;
  } catch (error) {
    throw error;
  }
};

const findById = async id => {
  let query = 'SELECT * FROM inventario WHERE id = %s';
  const values = [];
  values.push(id);

  try {
    const formattedQuery = format(query, ...values);
    const { rows } = await pool.query(formattedQuery);
    return rows;
  } catch (error) {
    throw error;
  }
};

const create = async (nombre, categoria, metal, precio, stock) => {
  const query =
    'INSERT INTO inventario (nombre, categoria, metal, precio, stock) VALUES (%L, %L, %L, %L, %L)';
  const values = [nombre, categoria, metal, precio, stock];

  if (!nombre || !categoria || !metal || !precio || !stock)
    throw { ok: false, error: 404 };

  try {
    const formattedQuery = format(query, ...values);
    const { rowCount } = await pool.query(formattedQuery);
    return rowCount;
  } catch (error) {
    throw error;
  }
};

const update = async (id, nombre, categoria, metal, precio, stock) => {
  const query =
    'UPDATE inventario SET nombre = %L, categoria = %L, metal = %L, precio = %L, stock = %L WHERE id = %L';
  const values = [nombre, categoria, metal, precio, stock, id];

  if (!id || !nombre || !categoria || !metal || !precio || !stock)
    throw { ok: false, error: 404 };

  try {
    const formattedQuery = format(query, ...values);
    const { rowCount } = await pool.query(formattedQuery);
    return rowCount;
  } catch (error) {
    throw error;
  }
};

const remove = async id => {
  const searchQuery = 'SELECT FROM inventario WHERE id = %s';
  const query = 'DELETE FROM inventario WHERE id = %s';
  const value = [id];

  if (!id) throw { ok: false, error: 404 };

  try {
    const formattedSearchQuery = format(searchQuery, ...value);
    const searchResponse = await pool.query(formattedSearchQuery);

    if (searchResponse.rowCount === 0) throw { ok: false, error: 404 };

    const formattedRemoveQuery = format(query, ...value);
    await pool.query(formattedRemoveQuery);

    return searchResponse.rowCount;
  } catch (error) {
    throw error;
  }
};

export const jewelsModels = { findAll, findById, create, update, remove };
