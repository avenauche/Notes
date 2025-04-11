const { Command } = require('commander');
const sdk = require('notes-sdk');
const program = new Command();


sdk.initialize({
    apiBaseUrl: "http://localhost:3000"
});

program
  .name('NOTES CLI')
  .description('CLI to interact with your Notes')
  .version('1.0.0');

program
    .command('list')
    .option('--tag <tag>', 'Filter by tag')
    .action(async ({ tag }) => {
        const notes = await sdk.getNotes(tag);
        notes.forEach(n => console.log(`[${n.id}] ${n.title} - ${n.content} (${n.created_at})`));
    });


program
    .command('create')
    .option('--title <title>', 'Title of the note')
    .option('--content <content>', 'Content of the note')   
    .option('--tags <tags>', 'Tags for the note')
    .action(async ({ title, content, tags }) => {
        const note = await sdk.createNote({ title, content, tags });
        console.log(`Note created with ID: ${note.id}`);
    });


program
    .command('get')
    .option('--id <id>', 'ID of the note to retrieve')
    .action(async ({ id }) => {
        const note = await sdk.getNote(id);
        console.log(`Note retrieved: ${note[0].title} - ${note[0].content} (${note[0].created_at})`);
    });

program.parse();


