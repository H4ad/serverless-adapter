# Benchmark

In this folder, we have benchmarks to compare the speed of this library with others.

## How to Run

```bash
git clone git@github.com:H4ad/serverless-adapter.git
cd serverless-adapter
npm ci
npm run build
npm pack
cd benchmark
npm ci
npm i ../h4ad-serverless-adapter-0.0.0-development.tgz
npm run bench
```

## Latest Run

- CPU: Ryzen 2200g
- Memory: 32GB 3200Hz

```md
@h4ad/serverless-adapter x 46,463 ops/sec ±10.75% (65 runs sampled)
@vendia/serverless-express x 8,726 ops/sec ±18.64% (82 runs sampled)
serverless-http x 48,246 ops/sec ±8.00% (70 runs sampled)
Fastest is serverless-http,@h4ad/serverless-adapter
```
