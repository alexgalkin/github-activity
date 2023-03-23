"use strict";

const os = require("os");
const path = require("path");

const PrinterSvc = require("./service/command-printer");

const tempDir: string = os.tmpdir(); // /tmp
const DEFAULT_OUTPUT_FILE = path.join(tempDir, "github-commits.sh");

class GithubActivity {
    
    private static instance: GithubActivity | null = null;


    public static getInstance(
        mask: [],
        startDate: Date,
        outputFile = DEFAULT_OUTPUT_FILE
    ) {
        if (GithubActivity.instance === null) {
            GithubActivity.instance = new GithubActivity(
                mask,
                startDate,
                outputFile
            );
            return GithubActivity.instance;
        } else {
            return GithubActivity.instance;
        }
    }

    private outputFile: string = DEFAULT_OUTPUT_FILE;
    private mask: object[] = [];
    private startDate: Date | null = null;
    private fileNames: string[] = []
    private messages: string[] = []

    public printerService: any;

    private constructor(
        mask: [],
        startDate: Date,
        outputFile = DEFAULT_OUTPUT_FILE
    ) {
        this.outputFile = outputFile;
        this.mask = mask;
        this.startDate = startDate;

        if (!startDate) {
            throw Error("Start date should be defined.");
        }

        if (!mask || mask.length < 1) {
            throw Error("Mask should be defined.");
        }
        this.printerService = new PrinterSvc();
    }

    setMessages(messages: string[]) {
        this.printerService.messages = messages
    }

    setFileNames(files: string[]) {
        this.printerService.fileNames = files
    }

    printToFile() {
        this.printerService.printCommands(this.mask, this.startDate, this.outputFile)
    }

}

module.exports = GithubActivity.getInstance;
