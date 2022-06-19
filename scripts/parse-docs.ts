import { resolve } from 'path';
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor';

const apiExtractConfig = resolve('./api-extractor.json');

function build(): void {
  const config = ExtractorConfig.loadFileAndPrepare(apiExtractConfig);

  const extractorResult = Extractor.invoke(config, {
    localBuild: true,
  });

  if (!extractorResult.succeeded) {
    console.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`,
    );
    process.exitCode = 1;
  }

  console.log('API Extractor completed successfully');
}

build();
