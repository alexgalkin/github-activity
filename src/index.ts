"use strict";

const os = require("os");
const path = require("path");

const commandPrinter = require("./service/command-printer");

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
    }

    printToFile() {
        commandPrinter(this.mask, this.startDate, this.outputFile);
    }
}

module.exports = GithubActivity.getInstance;
