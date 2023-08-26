import contactsServices from "./contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsServices.listContacts();
      return console.log(allContacts);
    case "getById":
      const contctById = await contactsServices.getContactById(id);
      return console.log(contctById);
    case "addContact":
      const addContact = await contactsServices.addContact({
        name,
        email,
        phone,
      });
      return console.log(addContact);
    case "deleteById":
      const deleteContact = await contactsServices.removeContact(id);
      return console.log(deleteContact);

    default:
      console.log("Unknown action");
  }
};

// invokeAction({action: "list"})
// invokeAction({action: "getById", id: "Z5sbDlS7pCzNsnAHLtDJd"})
// invokeAction({action: "addContact", name: "Natalia", email: "natalia@gmail.com", phone: "0966002560"})
invokeAction({ action: "deleteById", id: "p0gM8ixmgLvI5QhIuDkx1" });
