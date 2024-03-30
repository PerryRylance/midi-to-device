# MIDI to device
This repository shows how to use [`@perry-rylance/midi`](https://www.npmjs.com/package/@perry-rylance/midi) in conjuntion with [`node-midi`](https://www.npmjs.com/package/midi) to send MIDI to a device on the system in real time.

The intended use case if for people writing MIDI programatically to be able to hear their programs MIDI output through a synth or device of their choice, rather than having to save the MIDI as a file and then import that to a DAW.

## Installation
- Clone this repository
- Run `npm install`

## Running
To run the example run `npm run example`.

You will be prompted to select a MIDI device on the CLI, when selected the device will play the major scale.

Windows users can use [loopMIDI](https://www.tobias-erichsen.de/software/loopmidi.html) to create a virtual device if needed. Linux users can create a virtual port with ASLA.

![2024-03-30 12_50_22-](https://github.com/PerryRylance/midi-to-device/assets/14136738/b9562340-e1c4-42c3-9e1e-7957926b5c1b)

## Notes
Because `node-midi` has no concept of delta time in control messages, this project uses [@perry-rylance/midi-to-milliseconds](https://www.npmjs.com/package/@perry-rylance/midi-to-milliseconds) inside a tight loop to fetch events based on the system clock.

This appears to work well, but I have not stress tested this. My intention is for this to serve as an example of how you would run a live "preview" of generated MIDI. For production audio projects in which timing is critical, I would recommend exporting your MIDI as a file on disc then importing that into your DAW.
