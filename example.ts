import { File, NoteOffEvent, Track, ControllerType, ControllerEvent, WriteStream, EndOfTrackEvent } from "@perry-rylance/midi"
import CliPlayer from "./src/CliPlayer";
import MicrotonalNoteOnEvent from "./src/MicrotonalNoteOnEvent";

// NB: First, build the MIDI file
const file = new File();
const track = new Track();

file.tracks.push(track);

const timeDivision = file.resolution.ticksPerQuarterNote;
let ticks = 0;

while(ticks < timeDivision * 60 * 60)
{
	const tone = Math.random();
	const cutoff = Math.random();
	const brightness = Math.random();
	const damping = Math.random();

	const map: Array<{controller: number, value: number}> = [
		{
			controller: ControllerType.SOUND_CONTROLLER_1,
			value: tone
		},
		{
			controller: ControllerType.SOUND_CONTROLLER_2,
			value: cutoff
		},
		{
			controller: ControllerType.SOUND_CONTROLLER_3,
			value: brightness
		},
		{
			controller: ControllerType.SOUND_CONTROLLER_4,
			value: damping
		}
	];

	for(const definition of map)
	{
		const message = new ControllerEvent();

		message.controller = definition.controller;
		message.value = Math.floor(127 * definition.value);

		track.events.push(message);
	}

	const on = new MicrotonalNoteOnEvent(Math.floor(Math.random() * timeDivision * 10));

	on.key = 48 + Math.random() * 24;
	on.velocity = 127;

	track.events.push(...on);

	const off = new NoteOffEvent(timeDivision + Math.floor(Math.random() * timeDivision * 60 * (1 - Math.pow(damping, 1.5))));

	off.key = Math.floor(on.key);

	track.events.push(off);

	ticks += off.delta;
}

track.events.push(new EndOfTrackEvent());

const stream = new WriteStream();
file.writeBytes(stream);

const fs = require("fs");
const fh = fs.openSync("output.mid", "w");
fs.writeSync(fh, Buffer.from(stream.toArrayBuffer()));
fs.closeSync(fh);

const player = new CliPlayer();

player.play(file);