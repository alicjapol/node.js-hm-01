const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const contactsOperations = require('./db/contacts');

yargs(hideBin(process.argv))
  .command({
    command: 'list',
    describe: 'List all contacts',
    handler: async () => {
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      console.log("Contacts table, enjoy!"); // Dodano dla poprawy czytelności

    },
  })
  .command({
    command: 'get',
    describe: 'Get a contact by id',
    builder: (yargs) => yargs.option('id', {
      describe: 'Contact ID',
      demandOption: true,
      type: 'string',
    }),
    handler: async (argv) => {
      const contact = await contactsOperations.getContactById(argv.id);
      console.log(contact);
    },
  })
  .command({
    command: 'add',
    describe: 'Add a new contact',
    builder: (yargs) => yargs
      .option('name', { describe: 'Contact name', demandOption: true, type: 'string' })
      .option('email', { describe: 'Contact email', demandOption: true, type: 'string' })
      .option('phone', { describe: 'Contact phone', demandOption: true, type: 'string' }),
    handler: async (argv) => {
      await contactsOperations.addContact(argv.name, argv.email, argv.phone);
      console.log(`Added contact: ${argv.name}`);
    },
  })
  .command({
    command: 'remove',
    describe: 'Remove a contact',
    builder: (yargs) => yargs.option('id', {
      describe: 'Contact ID',
      demandOption: true,
      type: 'string',
    }),
    handler: async (argv) => {
      await contactsOperations.removeContact(argv.id);
      console.log(`Removed contact with ID: ${argv.id}`);
    },
  })
  .demandCommand(1, 'You must use one of the supported commands.')
  .help()
  .parse();
