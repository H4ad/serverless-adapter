# Benchmark

In this folder, we have benchmarks to compare the speed of this library with others.

The suites run on [bench-node](https://github.com/RafaelGSS/bench-node), which
marks the benchmarked function with `%NeverOptimizeFunction` and consumes its
return value. That needs `--allow-natives-syntax`, which the npm scripts already
pass, so results are not comparable with numbers produced by the old
[benchmark](https://www.npmjs.com/package/benchmark) setup.

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

`npm run bench` compares this library against `@vendia/serverless-express` and
`serverless-http` through an API Gateway v1 event. `npm run bench:clone-headers`
and `npm run bench:format-headers` measure the header helpers on their own.

## Latest Run

- CPU: Ryzen 9 5950X
- Memory: 62GB
- Node: 22.22.0

```md
@h4ad/serverless-adapter   x 49,596 ops/sec (11 runs sampled) min..max=(15.38us...33.17us)
@vendia/serverless-express x 35,594 ops/sec (10 runs sampled) min..max=(23.34us...37.61us)
serverless-http            x 34,328 ops/sec (11 runs sampled) min..max=(17.61us...38.05us)
```

Clone headers:

```md
{...}                       x 20,391,154 ops/sec min..max=(40.92ns...56.40ns)
structuredClone             x    332,801 ops/sec min..max=(2.47us...3.30us)
JSON.parse + JSON.stringify x    327,421 ops/sec min..max=(2.55us...3.32us)
for loop + object.keys      x    915,767 ops/sec min..max=(888.51ns...1.20us)
```
