import yargs from "yargs";
import contactsServices from "./contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsServices.listContacts();
      return console.table(allContacts);
      break;
    case "get":
      const contctById = await contactsServices.getContactById(id);
      return console.log(contctById);
      break;
    case "add":
      const addContact = await contactsServices.addContact({
        name,
        email,
        phone,
      });
      return console.log(addContact);
      break;
    case "remove":
      const deleteContact = await contactsServices.removeContact(id);
      return console.log(deleteContact);
      break;

    default:
      console.log("\x1B[31m Unknown action type!");
  }
};
const { argv } = yargs(process.argv.slice(2));

invokeAction(argv);
