import { ApiModel } from '@microsoft/api-extractor-model';
import { resolve } from 'path';
import { CustomMarkdownDocumenter } from './libs/CustomMarkdownDocumenter';

async function build(): Promise<void> {
  const apiModel = new ApiModel();
  const apiModelPath = resolve('.', 'temp', 'serverless-adapter.api.json');
  const outputFolder = resolve('.', 'docs', 'api');

  apiModel.loadPackage(apiModelPath);

  const markdown = new CustomMarkdownDocumenter({
    apiModel,
    outputFolder,
    documenterConfig: undefined,
  });

  markdown.generateFiles();
}

build().catch(console.error);
