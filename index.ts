'use strict'

const fs    = require("fs");
const masks = require("./assets/masks");

const DEFAULT_OUTPUT_FILE = "github-commits.sh";

class GithubActivity  {
  
  static  getPredefinedMasks() {
    return masks;
  }

  private static instance: (GithubActivity | null) = null;

  public static getInstance(mask: [], startDate: Date, output = DEFAULT_OUTPUT_FILE) {
    if (this.instance == null) {
      this.instance = new GithubActivity(mask, startDate, output)
    } else {
      return this.instance
    }
  }

  private constructor (mask: [], startDate: Date, output = DEFAULT_OUTPUT_FILE) {
    if (!startDate) {
      throw Error("Start date should be defined.")
    }
  
    if (!mask || mask.length < 1) {
      throw Error("Mask should be defined.")
    }
  }


}

function ss(){}

module.exports = GithubActivity.getInstance;