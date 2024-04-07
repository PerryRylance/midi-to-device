import { readFileSync } from "fs";
import { File, ReadStream } from "@perry-rylance/midi";

import CliPlayer from "./src/CliPlayer";

const buffer = readFileSync("./circusgalop.mid");
const stream = new ReadStream(buffer.buffer);

const file = new File();
file.readBytes(stream);

const player = new CliPlayer();

player.play(file);