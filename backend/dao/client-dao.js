const path = require("path");
const { readJson, writeJson } = require("../utils/file-storage");

const CLIENTS_FILE = path.join(__dirname, "../data/clients.json");

async function create(client) {
  const clients = await readJson(CLIENTS_FILE);
  clients.push(client);
  await writeJson(CLIENTS_FILE, clients);
  return client;
}

async function list() {
  return readJson(CLIENTS_FILE);
}

async function getById(id) {
  const clients = await readJson(CLIENTS_FILE);
  return clients.find((client) => client.id === id) || null;
}

async function update(id, client) {
  const clients = await readJson(CLIENTS_FILE);
  const index = clients.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const updatedClient = {
    ...clients[index],
    ...client,
    id,
    createdAt: clients[index].createdAt,
  };

  clients[index] = updatedClient;
  await writeJson(CLIENTS_FILE, clients);

  return updatedClient;
}

async function remove(id) {
  const clients = await readJson(CLIENTS_FILE);
  const exists = clients.some((client) => client.id === id);

  if (!exists) {
    return false;
  }

  const filteredClients = clients.filter((client) => client.id !== id);
  await writeJson(CLIENTS_FILE, filteredClients);

  return true;
}

module.exports = {
  create,
  list,
  getById,
  update,
  delete: remove,
};
