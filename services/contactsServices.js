import fs from "fs/promises";
import { nanoid } from "nanoid";
import { PATH_DB } from "../constants/contacts.js";

const getAll = async () => {
  const data = await fs.readFile(PATH_DB);
  return JSON.parse(data);
};

const getById = async (id) => {
  const allContacts = await getAll();
  const result = allContacts.find((contact) => id === contact.id);
  return result || null;
};

const add = async (data) => {
  const constacts = await getAll();
  const newContact = { id: nanoid(), ...data };
  constacts.push(newContact);
  await fs.writeFile(PATH_DB, JSON.stringify(constacts, null, 2));
  return newContact;
};

const updateById = async (id, data) => {
  const contacts = await getAll();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  contacts[index] = { id, ...data };
  await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const deleteById = async (id) => {
  const contacts = await getAll();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  const [deletedContact] = contacts.splice(index, 1);
  await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2));
  return deletedContact;
};

export default { getAll, getById, add, updateById, deleteById };
