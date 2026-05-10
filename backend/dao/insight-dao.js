const path = require("path");
const { readJson, writeJson } = require("../utils/file-storage");

const INSIGHTS_FILE = path.join(__dirname, "../data/insights.json");

async function create(insight) {
  const insights = await readJson(INSIGHTS_FILE);
  insights.push(insight);
  await writeJson(INSIGHTS_FILE, insights);
  return insight;
}

async function listByClientId(clientId, filter = {}) {
  const insights = await readJson(INSIGHTS_FILE);
  let clientInsights = insights.filter((insight) => insight.clientId === clientId);

  if (filter.category) {
    const category = filter.category.toLowerCase();
    clientInsights = clientInsights.filter(
      (insight) => insight.category.toLowerCase() === category
    );
  }

  if (filter.search) {
    const search = filter.search.toLowerCase();
    clientInsights = clientInsights.filter(
      (insight) =>
        insight.title.toLowerCase().includes(search) ||
        insight.description.toLowerCase().includes(search) ||
        insight.category.toLowerCase().includes(search)
    );
  }

  return clientInsights;
}

async function getById(id) {
  const insights = await readJson(INSIGHTS_FILE);
  return insights.find((insight) => insight.id === id) || null;
}

async function update(id, insight) {
  const insights = await readJson(INSIGHTS_FILE);
  const index = insights.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const updatedInsight = {
    ...insights[index],
    ...insight,
    id,
    clientId: insights[index].clientId,
    createdAt: insights[index].createdAt,
  };

  insights[index] = updatedInsight;
  await writeJson(INSIGHTS_FILE, insights);

  return updatedInsight;
}

async function remove(id) {
  const insights = await readJson(INSIGHTS_FILE);
  const exists = insights.some((insight) => insight.id === id);

  if (!exists) {
    return false;
  }

  const filteredInsights = insights.filter((insight) => insight.id !== id);
  await writeJson(INSIGHTS_FILE, filteredInsights);

  return true;
}

async function deleteByClientId(clientId) {
  const insights = await readJson(INSIGHTS_FILE);
  const filteredInsights = insights.filter((insight) => insight.clientId !== clientId);
  await writeJson(INSIGHTS_FILE, filteredInsights);
}

module.exports = {
  create,
  listByClientId,
  getById,
  update,
  delete: remove,
  deleteByClientId,
};
