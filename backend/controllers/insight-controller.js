const crypto = require("crypto");
const clientDao = require("../dao/client-dao");
const insightDao = require("../dao/insight-dao");
const { validateInsight } = require("../validators/insight-validator");

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

function mapInsightDto(dtoIn) {
  return {
    title: dtoIn.title.trim(),
    description: dtoIn.description.trim(),
    category: dtoIn.category.trim(),
  };
}

async function createInsight(req, res, next) {
  try {
    const client = await clientDao.getById(req.params.clientId);

    if (!client) {
      return sendNotFound(res);
    }

    const validationError = validateInsight(req.body);

    if (validationError) {
      return sendValidationError(res, validationError);
    }

    const insight = {
      id: crypto.randomUUID(),
      clientId: req.params.clientId,
      ...mapInsightDto(req.body),
      createdAt: new Date().toISOString(),
    };

    const createdInsight = await insightDao.create(insight);
    return res.status(201).json(createdInsight);
  } catch (error) {
    return next(error);
  }
}

async function listClientInsights(req, res, next) {
  try {
    const client = await clientDao.getById(req.params.clientId);

    if (!client) {
      return sendNotFound(res);
    }

    const insights = await insightDao.listByClientId(req.params.clientId, {
      category: req.query.category,
      search: req.query.search,
    });

    return res.status(200).json(insights);
  } catch (error) {
    return next(error);
  }
}

async function getInsight(req, res, next) {
  try {
    const insight = await insightDao.getById(req.params.id);

    if (!insight) {
      return sendNotFound(res);
    }

    return res.status(200).json(insight);
  } catch (error) {
    return next(error);
  }
}

async function updateInsight(req, res, next) {
  try {
    const validationError = validateInsight(req.body);

    if (validationError) {
      return sendValidationError(res, validationError);
    }

    const updatedInsight = await insightDao.update(req.params.id, mapInsightDto(req.body));

    if (!updatedInsight) {
      return sendNotFound(res);
    }

    return res.status(200).json(updatedInsight);
  } catch (error) {
    return next(error);
  }
}

async function deleteInsight(req, res, next) {
  try {
    const deleted = await insightDao.delete(req.params.id);

    if (!deleted) {
      return sendNotFound(res);
    }

    return res.status(200).json({ message: "Deleted successfully." });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createInsight,
  listClientInsights,
  getInsight,
  updateInsight,
  deleteInsight,
};
