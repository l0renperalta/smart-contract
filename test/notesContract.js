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
      const counter = await this.notesContract.notesCounter;
      //   1:12:00
   });
});
