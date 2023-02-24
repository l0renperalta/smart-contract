const NotesContract = artifacts.require('NotesContract');

contract('NotesContract', () => {
   before(async () => {
      this.notesContract = await NotesContract.deployed();
   });

   it('migrate contract successfully', () => {
      const address = this.notesContract.address;
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, '0x0');
      assert.notEqual(address, '');
   });

   it('get notes list', async () => {
      const counter = await this.notesContract.notesCounter();
      const note = await this.notesContract.notes(counter);

      assert.equal(note.id.toNumber(), counter);
      assert.equal(note.title, 'test title');
      assert.equal(note.note, 'test note');
      assert.equal(note.completed, false);
      assert.equal(counter, 1);
   });

   // it('note created successfully', async () => {

   // })
});
