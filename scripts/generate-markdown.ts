import { resolve } from 'path';
import { ApiModel } from '@microsoft/api-extractor-model';
import { CustomMarkdownDocumenter } from './libs/CustomMarkdownDocumenter';

const apiModelPath = resolve('.', 'temp', 'serverless-adapter.api.json');
const outputFolder = resolve('.', 'docs', 'api');

function build(): void {
  const apiModel = new ApiModel();

  apiModel.loadPackage(apiModelPath);

  const markdown = new CustomMarkdownDocumenter({
    apiModel,
    outputFolder,
    documenterConfig: undefined,
  });

  markdown.generateFiles();
}

build();
