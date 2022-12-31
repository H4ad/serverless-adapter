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
npm run bench
```

## Latest Run

- CPU: Ryzen 2200g
- Memory: 32GB 3200Hz

```md
╔════════════════════════════╤═════════╤════════════════╤═══════════╗
║ Slower tests               │ Samples │         Result │ Tolerance ║
╟────────────────────────────┼─────────┼────────────────┼───────────╢
║ @h4ad/serverless-adapter   │    5500 │ 4424.96 op/sec │  ± 0.98 % ║
║ @vendia/serverless-express │    6500 │ 4454.06 op/sec │  ± 0.97 % ║
╟────────────────────────────┼─────────┼────────────────┼───────────╢
║ Fastest test               │ Samples │         Result │ Tolerance ║
╟────────────────────────────┼─────────┼────────────────┼───────────╢
║ serverless-http            │   10000 │ 8046.93 op/sec │  ± 1.48 % ║
╚════════════════════════════╧═════════╧════════════════╧═══════════╝
```
