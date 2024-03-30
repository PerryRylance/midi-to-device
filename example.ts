import { File, NoteOffEvent, NoteOnEvent, Track } from "@perry-rylance/midi"
import CliPlayer from "./src/CliPlayer";

// NB: First, build the MIDI file
const file = new File();
const track = new Track();

file.tracks.push(track);

for(let semitone of [0, 2, 4, 5, 7, 9, 11, 12])
{
	const on = new NoteOnEvent();

	on.key = 60 + semitone;
	on.velocity = 127;

	track.events.push(on);

	const off = new NoteOffEvent(file.resolution.ticksPerQuarterNote);

	off.key = on.key;

	track.events.push(off);
}

const player = new CliPlayer();

player.play(file);