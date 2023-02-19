// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract NotesContract {

    constructor() {
        createNote('test title', 'test note');
    }

    uint public notesCounter = 0;

    struct Notes {
        uint id;
        string title;
        string note;
        bool completed;
        uint256 createdAt;
    }

    mapping (uint => Notes) public notes;

    function createNote(string memory _title, string memory _note) public {
        notes[notesCounter] = Notes(notesCounter, _title, _note, false, block.timestamp);
        notesCounter++;
    }

    function toggleNote(uint _id) public {
        Notes memory _note = notes[_id];
        _note.completed = !_note.completed;
        notes[_id] = _note;
    }
}