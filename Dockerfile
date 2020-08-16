FROM rust:1.44.1 AS wasm

RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
WORKDIR /usr/src/sudoku-wasm
COPY sudoku-wasm .
RUN wasm-pack build --release

FROM node:10-slim

WORKDIR /sudoku/sudoku-react

COPY --from=wasm /usr/src/sudoku-wasm ../sudoku-wasm
COPY ./sudoku-react/package.json .
RUN npm install
COPY ./sudoku-react .
RUN npm run build
CMD ["npm", "start"]