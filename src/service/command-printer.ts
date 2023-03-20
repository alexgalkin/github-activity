"use strict";

const fs = require("fs");

function getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
}

function getTextFileName() {
    const fileNames = [
        "README.md",
        "CHANGELOG.md",
        "DESCRIPTION.txt",
        "LICENSE.md",
        "app-notes.txt",
    ];
    const randId = getRandomNumber(fileNames.length);
    return fileNames[randId];
}

function getCommitMessage(date: Date) {
    return `git commit --date='${date.toLocaleString(
        "en-US"
    )}' -m '${getNextMessage()}'`;
}

function print(outputFile: string, input: string) {
    fs.appendFileSync(outputFile, input + "\r\n");
    console.log(input);
}

function printStartMessage(outputFile: string) {
    console.log('print start message')
    fs.writeFileSync(
        outputFile,
        "# :::::: Commands to update Github activity update ::::::::\r\n"
    );

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
    const messages = [
        "Added README.md",
        "Fixed typo",
        "Made minor updates",
        "Fixed critical issue",
        "Added description",
        "Updated title",
    ];

    const randId = getRandomNumber(messages.length);
    return messages[randId];
}

function getEchoCommand() {
    return `echo "${getNextMessage()}" >> ${getTextFileName()}`;
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

    for (let i = 0; i < mask.length; i++) {
        if (mask[i].s) {
            currentDate = currentDate.addDays(mask[i].s);
        } else {
            for (let j = 0; j < mask[i].l; j++) {
                for (let k = 0; k < mask[i].c; k++) {
                    print(outputFile, getEchoCommand());
                    print(outputFile, getGitAddCommand());
                    print(outputFile, getCommitMessage(currentDate));
                }
                currentDate = currentDate.addDays(1);
            }
        }
    }

    printFinalMessage(outputFile);
}

module.exports = printCommands;
