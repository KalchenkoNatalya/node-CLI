import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateMovies = (allContacts) =>
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

export const listContacts = async () => {
  try {
    const dataListContacts = await fs.readFile(contactsPath);

    return JSON.parse(dataListContacts);
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contactById = allContacts.find((contact) => contact.id === contactId);
    return contactById || null;
  } catch (error) {
    console.log(error.message);
  }
};

export const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const indexContactForRemove = allContacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (indexContactForRemove === -1) {
      return null;
    }
    const [resultOfRemove] = allContacts.splice(indexContactForRemove, 1);
    await updateMovies(allContacts);
    return resultOfRemove;
  } catch (error) {
    console.log(error.message);
  }
};

export const addContact = async ({ name, email, phone }) => {
  try {
    const allContacts = await listContacts();
    const oneNewContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    allContacts.push(oneNewContact);
    await updateMovies(allContacts);
    return oneNewContact;
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
