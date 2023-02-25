document.addEventListener('DOMContentLoaded', () => {
   App.init();
});

const form = document.querySelector('#notesForm');
form.addEventListener('submit', (e) => {
   e.preventDefault();
   App.createNote(form['title'].value, form['note'].value);
});

// class App {
//    constructor() {
//       this.checkWallet();
//       this.web3Provider = null;
//       this.NotesContract = null;
//    }

//    checkWallet() {
//       if (!window.ethereum) return console.log('Metamask not installed');
//       this.web3Provider = window.ethereum;
//       console.log('Metamask installed!');
//    }

//    async getContracts() {
//       const response = await fetch('NotesContract.json');
//       const data = await response.json();
//       const noteContract = TruffleContract(data);
//       noteContract.setProvider(this.web3Provider);
//       this.NotesContract = await noteContract.deployed();
//    }
// }
