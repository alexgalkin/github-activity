"use strict";

const fs = require("fs");
const msg = require("./../assets/messages");
const files = require("./../assets/files");

function getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
}

function getTextFileName() {
    const fileNames = files;
    const randId = getRandomNumber(fileNames.length);
    return fileNames[randId];
}

function getCommitMessage(date: Date, message: string) {
    return `git commit --date='${date.toLocaleString(
        "en-US"
    )}' -m '${message}'`;
}

function print(outputFile: string, input: string) {
    fs.appendFileSync(outputFile, input + "\r\n");
}

function printStartMessage(outputFile: string) {
    console.log("Output file: ", outputFile);

    fs.writeFileSync(outputFile, "#!/bin/bash \r\n");

    print(outputFile, "# :::::::::::::::::::::::::::::::::::::::::::: #");
}

class GithubDate extends Date {
    constructor(date: Date | string | number) {
        super(date);
    }

    addDays(days: number): GithubDate {
        let date = new GithubDate(this.valueOf());
        date.setDate(date.getDate() + days);
        return <GithubDate>date;
    }
}

function getGitAddCommand(): string {
    return "git add .";
}

function getNextMessage() {
    const messages = msg;
    const randId = getRandomNumber(messages.length);
    return messages[randId];
}

function getEchoCommand(message: string, fileName: string) {
    return `echo "${message}" >> ${getTextFileName()}`;
}

function printFinalMessage(outputFile: string) {
    print(outputFile, "# :::::::::::::::::::::::::::::::::::::::::::: #");
    print(outputFile, "# :::::::::::::::::: END ::::::::::::::::::::: #");
    print(outputFile, "# :::::::::::::::::::::::::::::::::::::::::::: #");
}

interface Skippable {
    s: number;
}

interface Filled {
    c: number;
    l: number;
}

function printCommands(
    mask: (Skippable & Filled)[],
    startDate: Date,
    outputFile: string
) {
    printStartMessage(outputFile);

    let currentDate: GithubDate = new GithubDate(startDate);
    let fileName: string = "";
    let message: string = "";

    for (let i = 0; i < mask.length; i++) {
        if (mask[i].s) {
            currentDate = currentDate.addDays(mask[i].s);
        } else {
            for (let j = 0; j < mask[i].l; j++) {
                for (let k = 0; k < mask[i].c; k++) {
                    message = getNextMessage();
                    fileName = getTextFileName();
                    print(outputFile, getEchoCommand(message, fileName));
                    print(outputFile, getGitAddCommand());
                    print(outputFile, getCommitMessage(currentDate, message));
                }
                currentDate = currentDate.addDays(1);
            }
        }
    }

    printFinalMessage(outputFile);
}

module.exports = printCommands;
