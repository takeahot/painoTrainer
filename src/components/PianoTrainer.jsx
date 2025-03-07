import { useState, useEffect } from "react";
import * as Tone from "tone";
import { Button } from "@/components/ui/button";

const notes = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

const generateNote = (selectedNotes) => {
  return selectedNotes[Math.floor(Math.random() * selectedNotes.length)];
};

export default function PianoTrainer() {
  const [selectedNotes, setSelectedNotes] = useState(notes);
  const [currentNote, setCurrentNote] = useState(null);
  const [activeNote, setActiveNote] = useState(null);

  const synth = new Tone.Synth().toDestination();

  const playNote = (note) => {
    synth.triggerAttackRelease(note, "0.5s");
  };

  const startTraining = () => {
    setCurrentNote(generateNote(selectedNotes));
  };

  const handleKeyPress = (event) => {
    const keyMap = {
      a: "C", w: "C#", s: "D", e: "D#", d: "E", f: "F", t: "F#", g: "G", 
      y: "G#", h: "A", u: "A#", j: "B"
    };
    const note = keyMap[event.key];
    if (note) {
      setActiveNote(note);
      playNote(note);
      if (note === currentNote) {
        setTimeout(() => setCurrentNote(generateNote(selectedNotes)), 1000);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentNote]);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4">
        <Button onClick={startTraining}>Start Training</Button>
      </div>
      <div className="grid grid-cols-12 gap-2">
        {notes.map((note, index) => (
          <div 
            key={index} 
            className={`p-4 border rounded text-center ${currentNote === note ? 'bg-green-400' : ''}`}
          >
            {note}
          </div>
        ))}
      </div>
      {currentNote && <div className="mt-4 text-lg">Find: {currentNote}</div>}
    </div>
  );
}
