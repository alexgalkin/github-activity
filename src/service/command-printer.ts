"use strict";

const fs = require("fs");

interface Skippable {
    s: number;
}

interface Filled {
    c: number;
    l: number;
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

class PrinterService {

    private msg = require("./../assets/messages");
    private files = require("./../assets/files");

    getRandomNumber = (max: number) => {
        return Math.floor(Math.random() * max);
    }

    set messages (messages: string[]) {
        this.msg = messages
    }

    set fileNames (filenames: string[]){
        this.files = filenames
    }

    getTextFileName = () => {
        const fileNames = this.files;
        const randId = this.getRandomNumber(fileNames.length);
        return fileNames[randId];
    }

    getCommitMessage = (date: Date, message: string) => {
        return `git commit --date='${date.toLocaleString(
            "en-US"
        )}' -m '${message}'`;
    }

    print = (outputFile: string, input: string) => {
        fs.appendFileSync(outputFile, input + "\r\n");
    }

    printStartMessage = (outputFile: string) => {
        console.log("Output file: ", outputFile);
        fs.writeFileSync(outputFile, "#!/bin/bash \r\n");
        this.print(outputFile, "# :::::::::::::::::::::::::::::::::::::::::::: #");
    }
    
    getGitAddCommand = (): string => {
        return "git add .";
    }
    
    getNextMessage = () => {
        const messages = this.msg;
        const randId = this.getRandomNumber(messages.length);
        return messages[randId];
    }
    
    getEchoCommand = (message: string, fileName: string) => {
        return `echo "${message}" >> ${this.getTextFileName()}`;
    }
    
    printFinalMessage = (outputFile: string) => {
        this.print(outputFile, "# :::::::::::::::::::::::::::::::::::::::::::: #");
        this.print(outputFile, "# :::::::::::::::::: END ::::::::::::::::::::: #");
        this.print(outputFile, "# :::::::::::::::::::::::::::::::::::::::::::: #");
    }
    
    printCommands = (
        mask: (Skippable & Filled)[],
        startDate: Date,
        outputFile: string
    ) => {
        this.printStartMessage(outputFile);
    
        let currentDate: GithubDate = new GithubDate(startDate);
        let fileName: string = "";
        let message: string = "";
    
        for (let i = 0; i < mask.length; i++) {
            if (mask[i].s) {
                currentDate = currentDate.addDays(mask[i].s);
            } else {
                for (let j = 0; j < mask[i].l; j++) {
                    for (let k = 0; k < mask[i].c; k++) {
                        message = this.getNextMessage();
                        fileName = this.getTextFileName();
                        this.print(outputFile, this.getEchoCommand(message, fileName));
                        this.print(outputFile, this.getGitAddCommand());
                        this.print(outputFile, this.getCommitMessage(currentDate, message));
                    }
                    currentDate = currentDate.addDays(1);
                }
            }
        }
    
        this.printFinalMessage(outputFile);
    }
}


module.exports = PrinterService;
