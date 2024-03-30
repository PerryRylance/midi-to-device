import { File } from "@perry-rylance/midi";
import FilePlayer from "./FilePlayer";

const prompt = require('prompt-sync')();

export default class CliPlayer
{
	play(file: File)
	{
		// NB: Now initialise the output
		const midi = require('midi');
		const output = new midi.Output();

		if(output.getPortCount() === 0)
		{
			process.stderr.write("No MIDI output devices detected\r\n");
			process.exit(1);
		}

		const deviceNames: string[] = [];

		for(let i = 0; i < output.getPortCount(); i++)
			deviceNames.push(`${i}. ${output.getPortName(i)}`);

		process.stdout.write(`\r\nMIDI output devices:\r\n\r\n` + deviceNames.join("\r\n") + "\r\n\r\n");

		const selectedDeviceIndex = prompt("Enter device number: ");

		if(!/^\d+$/.test(selectedDeviceIndex) || selectedDeviceIndex >= output.getPortCount())
		{
			process.stderr.write("Invalid selection\r\n");
			process.exit(1);
		}

		output.openPort(parseInt(selectedDeviceIndex));

		// NB: Now do the playback
		const player = new FilePlayer(output);
		player.play(file);

		// NB: Lastly, clean up
		output.closePort();
	}
}