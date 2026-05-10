const SUPPORTED_KEYS = ["title", "description", "category"];

function getUnsupportedKeys(dtoIn) {
  return Object.keys(dtoIn).filter((key) => !SUPPORTED_KEYS.includes(key));
}

function isBlank(value) {
  return typeof value !== "string" || value.trim().length === 0;
}

function validateInsight(dtoIn) {
  const unsupportedKeyList = getUnsupportedKeys(dtoIn);

  if (unsupportedKeyList.length > 0) {
    return {
      error: "unsupportedKeys",
      unsupportedKeyList,
    };
  }

  const details = [];

  if (isBlank(dtoIn.title)) {
    details.push("title is required and must not be empty");
  }

  if (isBlank(dtoIn.description)) {
    details.push("description is required and must not be empty");
  }

  if (isBlank(dtoIn.category)) {
    details.push("category is required and must not be empty");
  }

  if (details.length > 0) {
    return {
      error: "invalidDtoIn",
      details,
    };
  }

  return null;
}

module.exports = {
  validateInsight,
};
