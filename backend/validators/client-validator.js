const SUPPORTED_KEYS = ["name", "industry", "web", "note"];

function getUnsupportedKeys(dtoIn) {
  return Object.keys(dtoIn).filter((key) => !SUPPORTED_KEYS.includes(key));
}

function isBlank(value) {
  return typeof value !== "string" || value.trim().length === 0;
}

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function validateClient(dtoIn) {
  const unsupportedKeyList = getUnsupportedKeys(dtoIn);

  if (unsupportedKeyList.length > 0) {
    return {
      error: "unsupportedKeys",
      unsupportedKeyList,
    };
  }

  const details = [];

  if (isBlank(dtoIn.name)) {
    details.push("name is required and must not be empty");
  }

  if (dtoIn.web !== undefined && dtoIn.web !== "" && !isValidUrl(dtoIn.web)) {
    details.push("web must be a valid URL");
  }

  if (dtoIn.industry !== undefined && typeof dtoIn.industry !== "string") {
    details.push("industry must be a string");
  }

  if (dtoIn.note !== undefined && typeof dtoIn.note !== "string") {
    details.push("note must be a string");
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
  validateClient,
};
