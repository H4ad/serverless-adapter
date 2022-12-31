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
╔════════════════════════════╤═════════╤════════════════╤═══════════╗
║ Slower tests               │ Samples │         Result │ Tolerance ║
╟────────────────────────────┼─────────┼────────────────┼───────────╢
║ @vendia/serverless-express │    5500 │ 4518.75 op/sec │  ± 0.99 % ║
║ @h4ad/serverless-adapter   │   10000 │ 7590.44 op/sec │  ± 1.29 % ║
╟────────────────────────────┼─────────┼────────────────┼───────────╢
║ Fastest test               │ Samples │         Result │ Tolerance ║
╟────────────────────────────┼─────────┼────────────────┼───────────╢
║ serverless-http            │   10000 │ 8298.48 op/sec │  ± 1.53 % ║
╚════════════════════════════╧═════════╧════════════════╧═══════════╝
```
