## Minimal Sudoku [![Build Status](https://travis-ci.com/hemanditwiz/minimal-sudoku.svg?branch=master)](https://travis-ci.com/hemanditwiz/minimal-sudoku)

A minimal sudoku PWA built using React, Redux Typescript and Rust.  

The sudoku generator logic is written in Rust and invoked through WebAssembly.  

This is a perfect example on how we can create fast, responsive and mobile first applications using React, Web Workers, WebAssembly.
This project has been developed step by step, so that you'll be to understand how WebWorkers and WebAssembly vastly improves interactivity and performance.  

Checkout to a previous commit to see how the app is working without WebWorkers.  
 The potentially expensive calculation in this app is the logic for finding a unique solution and creating a challenge grid by removing `k` numbers from the grid.  
 There are two implementations for this:
One written in typescript ( `createNewGame` ) and one written in rust as imported into react app using wasm loader ( `createNewGameFromWasm` ).  
By default the app uses the webAssembly module since it performs slightly faster. But you can always switch back to the typescript implementation.

Play now:
https://hemanditwiz.github.io/minimal-sudoku

## Performance
These are measured by taking an average of 100 calls on creating a solved board and removing k number of elements from both of them.
### Before optimizing algorithm

| Difficulty    | Execution Time (JS) | Execution Time (Rust) |
| ------------- | --------------------|-----------------------|
| Easy          | 236.1152 ms         | 70.6922 ms            |
| Medium        | 783.5667 ms         | 172.3765 ms           |
| Hard          | 1091.7110 ms        | 321.4880 ms           |
| Expert        | 3645.0086 ms        | 1290.4354 ms          |

### After optimizing algorithm

| Difficulty    | Execution Time (JS) | Execution Time (Rust) |
| ------------- | --------------------|-----------------------|
| Easy          | 27.2882 ms          | 21.2581 ms            |
| Medium        | 52.6912 ms          | 41.5495 ms            |
| Hard          | 76.6867 ms          | 53.2871 ms            |
| Expert        | 431.3945 ms         | 227.5414 ms           |


## Setting up locally
Since the react app depends on webassembly module from rust, you need to compile and generate wasm binaries using `wasm-pack`. Inorder to simply the build process, there is a `Dockerfile` and `docker-compose.yml` provided. You can start the app by running the below commands after cloning the repo.

```bash
$ docker build .
$ docker-compose up
```

## Deployment
The app is deployed into `gh-pages` using Travis CI.
You can get the production build files by running

```bash
$ docker build -t hemanditwiz/minimal-sudoku .
$ containerId=$(docker create hemanditwiz/minimal-sudoku)
$ docker cp "$containerId":/sudoku/sudoku-react/build ./build
$ docker rm "$containerId"
```

This will generate the final production build folder in your current directory

## Tests
Tests are written for rust as well as the react app.

On rust
```bash
$ cd sudoku-wasm
$ wasm-pack test --chrome --headless
```

On react
```bash
$ cd sudoku-react
$ npm run test
```

## Licence
MIT


