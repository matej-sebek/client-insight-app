const crypto = require("crypto");
const clientDao = require("../dao/client-dao");
const insightDao = require("../dao/insight-dao");
const { validateClient } = require("../validators/client-validator");

function sendValidationError(res, validationError) {
  if (validationError.error === "unsupportedKeys") {
    return res.status(400).json({
      error: "unsupportedKeys",
      message: "DtoIn contains unsupported keys.",
      unsupportedKeyList: validationError.unsupportedKeyList,
    });
  }

  return res.status(400).json({
    error: "invalidDtoIn",
    message: "DtoIn is not valid.",
    details: validationError.details,
  });
}

function sendNotFound(res) {
  return res.status(404).json({
    error: "notFound",
    message: "Requested object was not found.",
  });
}

function mapClientDto(dtoIn) {
  return {
    name: dtoIn.name.trim(),
    industry: dtoIn.industry?.trim() || "",
    web: dtoIn.web?.trim() || "",
    note: dtoIn.note?.trim() || "",
  };
}

async function createClient(req, res, next) {
  try {
    const validationError = validateClient(req.body);

    if (validationError) {
      return sendValidationError(res, validationError);
    }

    const client = {
      id: crypto.randomUUID(),
      ...mapClientDto(req.body),
      createdAt: new Date().toISOString(),
    };

    const createdClient = await clientDao.create(client);
    return res.status(201).json(createdClient);
  } catch (error) {
    return next(error);
  }
}

async function listClients(req, res, next) {
  try {
    const clients = await clientDao.list();
    return res.status(200).json(clients);
  } catch (error) {
    return next(error);
  }
}

async function getClient(req, res, next) {
  try {
    const client = await clientDao.getById(req.params.id);

    if (!client) {
      return sendNotFound(res);
    }

    return res.status(200).json(client);
  } catch (error) {
    return next(error);
  }
}

async function updateClient(req, res, next) {
  try {
    const validationError = validateClient(req.body);

    if (validationError) {
      return sendValidationError(res, validationError);
    }

    const updatedClient = await clientDao.update(req.params.id, mapClientDto(req.body));

    if (!updatedClient) {
      return sendNotFound(res);
    }

    return res.status(200).json(updatedClient);
  } catch (error) {
    return next(error);
  }
}

async function deleteClient(req, res, next) {
  try {
    const deleted = await clientDao.delete(req.params.id);

    if (!deleted) {
      return sendNotFound(res);
    }

    await insightDao.deleteByClientId(req.params.id);
    return res.status(200).json({ message: "Deleted successfully." });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createClient,
  listClients,
  getClient,
  updateClient,
  deleteClient,
};
