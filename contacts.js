import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
// console.log("шлях:", contactsPath);

export const listContacts = async () => {
  try {
    // const path = "./db/contacts.json";
    const dataListContacts = await fs.readFile(contactsPath);
    // console.log(JSON.parse(dataListContacts));

    return JSON.parse(dataListContacts);
  } catch (error) {
    console.log(error.message);
  }
};
// listContacts();

// fs.readFile(contactsPath, "utf-8")
// .then(data => {
//     console.log(data);
// })
// .catch(error => {
//     console.error(error);
// });

export const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    // console.log(allContacts)
    const contactById = allContacts.find((contact) => contact.id === contactId);
    // console.log(contactById)
    return contactById || null;
  } catch (error) {
    console.log(error.message);
  }

  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
};

export const removeContact = async (contactId) => {
    try {
        const allContacts = await listContacts();
        const indexContactForRemove = allContacts.findIndex(contact => contact.id === contactId);
        if (indexContactForRemove === -1) {
            return null
        }
        const [resultOfRemove] = allContacts.splice(indexContactForRemove, 1);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
        return resultOfRemove


    } catch (error) {
        console.log(error.message);
    }
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

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
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return oneNewContact
  } catch (error) {
    console.log(error.message);
  }
  // ...твій код. Повертає об'єкт доданого контакту.
};

export default {
  listContacts,
  getContactById,
  addContact,
  removeContact
};
