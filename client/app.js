const App = {
   init: async () => {
      App.checkWallet();
      await App.getContracts();
      await App.getAccount();
      await App.renderNotes();
   },

   account: '',
   contracts: {},

   checkWallet: () => {
      if (!window.ethereum) return console.log('Browser do not have a wallet installed');
      App.web3Provider = window.ethereum;
      App.web3Provider.request({ method: 'eth_requestAccounts' });
      console.log('Wallet find!');
   },

   getContracts: async () => {
      const response = await fetch('NotesContract.json');
      const data = await response.json();
      App.contracts.notesContract = TruffleContract(data);
      App.contracts.notesContract.setProvider(App.web3Provider);
      App.NotesContract = await App.contracts.notesContract.deployed();
   },

   getAccount: async () => {
      const accounts = await App.web3Provider.request({ method: 'eth_requestAccounts' });
      App.account = accounts[0];
   },

   createNote: async (title, note) => {
      const result = await App.NotesContract.createNote(title, note, { from: App.account });
      console.log(result.logs[0].args);
   },

   renderNotes: async () => {
      document.getElementById('account').innerText = App.account;
      const counter = await App.NotesContract.notesCounter();
      const counterNumber = counter.toNumber();

      let html = '';

      for (let i = 1; i <= counterNumber; i++) {
         const note = await App.NotesContract.notes(i);
         const noteId = note[0];
         const title = note[1];
         const noteDescription = note[2];
         const completed = note[3];
         const createdAt = note[4];

         let noteElement = `
         <div class="card bg-dark m-2">
            <div class="card-header d-flex justify-content-between align-items-center">
               <h5 class="card-title">${title}</h5>
               <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" data-id="${noteId}" ${completed && 'checked'} onChange="App.toggleCompleted(this)"/>
               </div>
            </div>
            <div class="card-body">
               <p class="card-text">${noteDescription}</p>
               <p class="text-muted">created at: ${new Date(createdAt * 1000).toLocaleString()}</p>
            </div>
         </div>`;

         html += noteElement;
      }

      document.getElementById('taskList').innerHTML = html;
   },

   toggleCompleted: async (note) => {
      const id = note.dataset.id;
      await App.NotesContract.toggleNote(id, { from: App.account });
      window.location.reload();
   },
};
