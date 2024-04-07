import { Event, WriteStream } from "@perry-rylance/midi";

const midi = require('midi');

export default class OutputStream extends WriteStream
{
	constructor(private output: any)
	{
		if(!(output instanceof midi.Output))
			throw new Error("Expected output to be an instance of midi.Output");

		super();
	}

	send(event: Event)
	{
		this.seekTo(0);

		event.writeBytes(this);

		const length = this.getPosition();
		const buffer = this.toArrayBuffer();
		const typed = new Uint8Array(buffer);
		const arr = Array.from(typed.slice(0, length));

		this.output.sendMessage(arr);
	}
}