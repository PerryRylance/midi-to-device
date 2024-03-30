import { File } from "@perry-rylance/midi";
import OutputStream from "./OutputStream";
import { TimeResolver } from "@perry-rylance/midi-to-milliseconds";

export default class FilePlayer
{
	private stream: OutputStream;

	constructor(private output: any)
	{
		this.stream = new OutputStream(output);
	}

	play(file: File): void
	{
		const resolver = new TimeResolver(file, {stable: true});

		let start = new Date().getTime();
		let cursors = {
			start: 0,
			end: 0
		};

		const trackLengthsMilliseconds = resolver.tracks.map(track => track.events[track.events.length - 1].absolute.milliseconds) as number[];
		const totalLengthMilliseconds = Math.max(...trackLengthsMilliseconds);
		
		while(cursors.start < totalLengthMilliseconds)
		{
			cursors.end = new Date().getTime() - start;

			if(cursors.end === cursors.start)
				continue;

			resolver
				.tracks
				.map(track => track.getEventsBetweenMilliseconds(cursors.start, cursors.end))
				.flat()
				.map(resolved => resolved.original)
				.map(event => this.stream.send(event));

			cursors.start = cursors.end;
		}
	}
}