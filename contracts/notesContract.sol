// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract NotesContract {

    constructor() {
        createNote('test title', 'test note');
    }

    uint public notesCounter = 0;

    event NoteCreated (
        uint id,
        string title,
        string note,
        bool completed,
        uint256 createdAt
    );

    event noteToggle (
        uint id,
        bool completed
    );

    struct Notes {
        uint id;
        string title;
        string note;
        bool completed;
        uint256 createdAt;
    }

    mapping (uint => Notes) public notes;

    function createNote(string memory _title, string memory _note) public {
        notesCounter++;
        notes[notesCounter] = Notes(notesCounter, _title, _note, false, block.timestamp);
        emit NoteCreated(notesCounter, _title, _note, false, block.timestamp);
    }

    function toggleNote(uint _id) public {
        Notes memory _note = notes[_id];
        _note.completed = !_note.completed;
        notes[_id] = _note;
        emit noteToggle(_id, _note.completed);
    }
}