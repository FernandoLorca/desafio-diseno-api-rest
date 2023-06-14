import { jewelsModels } from '../models/jewels.models.js';
import { handleErrors } from '../database/errors.js';

const getAllJewels = async (req, res) => {
  const { limit, sort, page } = req.query;

  try {
    const response = await jewelsModels.findAll(limit, sort, page);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const { status, msg } = handleErrors(error.code);
    return res.status(status).json({
      ok: false,
      msg,
    });
  }
};

const getWithFilters = async (req, res) => {
  const { limit, sort, page, filters } = req.query;

  try {
    const response = await jewelsModels.findAll(limit, sort, page, filters);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const { status, msg } = handleErrors(error.code);
    return res.status(status).json({
      ok: false,
      msg,
    });
  }
};

const getJewel = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await jewelsModels.findById(id);
    res.status(500).json({
      ok: true,
      response,
    });
  } catch (error) {
    console.error(error);
    const { status, msg } = handleErrors(error.code);
    return res.status(status).json({
      ok: false,
      msg,
    });
  }
};

const createJewel = async (req, res) => {
  const { nombre, categoria, metal, precio, stock } = req.body;
  try {
    const response = await jewelsModels.create(
      nombre,
      categoria,
      metal,
      precio,
      stock
    );
    res.status(200).json({
      ok: true,
      rowCount: response,
    });
  } catch (error) {
    console.error(error);
    const { status, msg } = handleErrors(error.code);
    return res.status(status).json({
      ok: false,
      msg,
    });
  }
};

const updateJewel = async (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, metal, precio, stock } = req.body;

  try {
    const response = await jewelsModels.update(
      id,
      nombre,
      categoria,
      metal,
      precio,
      stock
    );
    res.status(200).json({
      ok: true,
      rowCount: response,
    });
  } catch (error) {
    console.error(error);
    const { status, msg } = handleErrors(error.code);
    return res.status(status).json({
      ok: false,
      msg,
    });
  }
};

const deleteJewel = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await jewelsModels.remove(id);
    res.status(200).json({
      ok: true,
      rowCount: response,
    });
  } catch (error) {
    console.error(error);
    const { status, msg } = handleErrors(error.code);
    return res.status(status).json({
      ok: false,
      msg,
    });
  }
};

export const jewelsController = {
  getAllJewels,
  getWithFilters,
  getJewel,
  createJewel,
  updateJewel,
  deleteJewel,
};
