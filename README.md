# Sharding

This project aims to implement a PoC for some of the sharding proposals, including:

- [Double-batched Merkle log accumulator](https://ethresear.ch/t/double-batched-merkle-log-accumulator/571)
- [The stateless client concept](https://ethresear.ch/t/the-stateless-client-concept/172)

## API

[./docs](./docs/README.md)

## Test

Before running the tests, the assemblyscript module needs to be built by running:

```sh
npm run asbuild
```

Then, to run the tests:

```sh
npm t
```
