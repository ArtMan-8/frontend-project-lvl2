# Get difference app

[![Actions Status](https://github.com/ArtMan-8/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/ArtMan-8/frontend-project-lvl2/actions) [![lint check](https://github.com/ArtMan-8/frontend-project-lvl2/actions/workflows/lint-check.yml/badge.svg)](https://github.com/ArtMan-8/frontend-project-lvl2/actions/workflows/lint-check.yml) [![run tests](https://github.com/ArtMan-8/frontend-project-lvl2/actions/workflows/run-tests.yml/badge.svg)](https://github.com/ArtMan-8/frontend-project-lvl2/actions/workflows/run-tests.yml)<br />
[![Maintainability](https://api.codeclimate.com/v1/badges/6c0ca5e71cbfc16c7182/maintainability)](https://codeclimate.com/github/ArtMan-8/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/6c0ca5e71cbfc16c7182/test_coverage)](https://codeclimate.com/github/ArtMan-8/frontend-project-lvl2/test_coverage)

## Hexlet project 
### CLI App - Compares two configuration files and shows a difference.

<details>
<summary>Setup App</summary>

## Setup
### Installing dependencies 

```bash
$ make install
```

### Run eslint 

```bash
$ make lint
```

### Run tests

```bash
$ make test 
```
</details>

<details>
<summary>Install App</summary>

## Installing gendiff app
### in Linux

```bash
$ make gendiff-linux
```

### in Windows

```bash
$ make gendiff-windows
```

### UnInstalling gendiff app 

```bash
$ make gendiff-uninstall
```
</details>

---

## About
This app compares two files with extensions - `json` and `yml/yaml`.<br />
Show result one of the three formats - `stylish`, `plain`, `json`.

### Use
```
Usage: gendiff [options] <filepath1> <filepath2>
Options:
  -V, --version        output the version number
  -f, --format [type]  output format [stylish, plain, json] (default: "stylish")
  -h, --help           display help for command
```
<br />

## Example

### gendiff-install
[![asciicast](https://asciinema.org/a/ZBrRle26mzSWRGyqSkpRQtucO.svg)](https://asciinema.org/a/ZBrRle26mzSWRGyqSkpRQtucO)

### gendiff-stylish
[![asciicast](https://asciinema.org/a/jca1XhAUHAzXNHZZAGGYI190a.svg)](https://asciinema.org/a/jca1XhAUHAzXNHZZAGGYI190a)

### gendiff-plain
[![asciicast](https://asciinema.org/a/rBQUR3d1cfd3FeQBYxhVXa3pj.svg)](https://asciinema.org/a/rBQUR3d1cfd3FeQBYxhVXa3pj)

### gendiff-json
[![asciicast](https://asciinema.org/a/ntygjwSBzjDG7I60SzGn08ezs.svg)](https://asciinema.org/a/ntygjwSBzjDG7I60SzGn08ezs)