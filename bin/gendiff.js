#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();

program
  .version("1.0.0")
  .description("Compares two configuration files and shows a difference.")
  .helpOption("-h, --HELP", "output usage information")
  .option("-f, --format <type>", "output format")
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2) => {
    console.log(filepath1);
    console.log(filepath2);
  })
  .parse();
