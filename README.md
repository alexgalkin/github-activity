# GitHub Activity section adjustment script

## Description

This module helps you "draw" your own activity section at Github profile.

## How it works

It generates the script that has commit messages which you can use in your repo (NOTE: it is recommended to use separate repository in Github to avoid any data loses in your existing repo(s))

## How to run

```
const githubActivity = require("./dist");

let startDate = "2022-01-09 11:15:30";
let mask = [{c:8,l:2}, {s:2}, {c:1,l:3}];

let gh = githubActivity(mask, startDate);

gh.printToFile();
```

## Requirements

At least two required parameters should be provided to generate the script:

1. Start date - the date of the first filled in activity square - e.g. `let startDate = "2022-01-09 11:15:30";`
2. The mask. Mask defines how many commits should be made for specific date or a range of dates.


## Mask example

`let mask = [{c:8,l:2}, {s:2}, {c:1,l:3}]`

Explanation: Each items of the array is specific instruction. 

`{c:8,l:2}` - c is for Commit's count; l is for Length (amount of days). It means that script should prepare 8 commits for 2 subsequent days.

`{s:2}` - s is for Skip. It means that we skip 2 days (no commits)

`{c:1,l:3}` - similar to the previous commit instruction it means that we expect 1 commit for 3 subsequent days.

## Summary

If we have `let startDate = "2022-01-09 11:15:30";` and `let mask = [{c:8,l:2}, {s:2}, {c:1,l:3}]` then script will generate commits for the following days:

- `2022-01-09` - `8` commits
- `2022-01-10` - `8` commits
- `2022-01-11` - `0` commits (skip)
- `2022-01-12` - `0` commits (skip)
- `2022-01-13` - `1` commit
- `2022-01-14` - `1` commit
- `2022-01-15` - `1` commit

## Output

Once you run printToFile() method you will see the reference to the output file in the Console, e.g.:

`Output file:  /var/******/github-commits.sh`

Alternatively you may specify the desired output file location:

```
const githubActivity = require("./dist");

let startDate = "2022-01-09 11:15:30";
let mask = [{c:8,l:2}, {s:2}, {c:1,l:3}];

let gh = githubActivity(mask, startDate, '/tmp/commits.sh');

gh.printToFile();
```
