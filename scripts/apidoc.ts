import { Extractor, ExtractorConfig } from '@microsoft/api-extractor';
import { resolve } from 'path';

const outputFile = resolve('.', 'docs', '.vitepress', 'api-pages.ts');
const apiExtractConfig = resolve('./api-extractor.json');

async function build(): Promise<void> {
  const config = ExtractorConfig.loadFileAndPrepare(apiExtractConfig);

  const extractorResult = Extractor.invoke(config, {
    localBuild: true,
  });

  if (extractorResult.succeeded) {
    console.log(`API Extractor completed successfully`);
    process.exitCode = 0;
  } else {
    console.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`,
    );
    process.exitCode = 1;
  }

  // const members: APIDoc['members'] = serverlessAdapterApi.members[0]
  //   .members as unknown as APIDoc['members'];
  //
  // const adapters = members.filter(
  //   member => member.name.includes('Adapter') && member.kind === 'Class',
  // );
  // const adapterGroup: SideBarGroup = {
  //   text: 'Adapters',
  //   link: './adapters',
  //   children: adapters.map(adapter => ({
  //     text: adapter.name,
  //     link: `./api/serverless-adapter.${adapter.name.toLowerCase()}`,
  //   })),
  // };
  //
  // const pages: SideBarGroup[] = [adapterGroup];
  //
  // writeFileSync(outputFile, `export const apiPages = ${JSON.stringify(pages)}`);
}

build().catch(console.error);
