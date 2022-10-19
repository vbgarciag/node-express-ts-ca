import 'reflect-metadata';
import { container } from 'tsyringe';
import { Server } from "./server";
import fs from 'fs';
import path from 'path';
import './di';

const server = new Server(
  3000,
  loadControllers()
);

function loadControllers(): any[] {
  const controllers = [];
  for (const file of walkSync2(path.join(__dirname, 'controllers'))) {
    if (file !== __filename && file.endsWith('.ts')) {
      const controller = container.resolve(require(file).default);
      controllers.push(controller);
    }
  }
  return controllers;
}

function *walkSync2(dir: string): any {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync2(path.join(dir, file.name));
    } else {
      yield `./controllers${dir.split('controllers')[1]}/${file.name}`;
    }
  }
}

server.start();