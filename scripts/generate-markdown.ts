import { writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { ApiModel } from '@microsoft/api-extractor-model';
import { CustomMarkdownDocumenter } from './libs/CustomMarkdownDocumenter';

const apiModelPath = resolve('.', 'temp', 'serverless-adapter.api.json');
const outputFolder = resolve('.', 'docs', 'docs', 'api');

function build(): void {
  const apiModel = new ApiModel();

  apiModel.loadPackage(apiModelPath);

  const markdown = new CustomMarkdownDocumenter({
    apiModel,
    outputFolder,
    documenterConfig: undefined,
  });

  markdown.generateFiles();

  const categoryForApiFolder = {
    label: 'Introduction',
    position: -1,
  };

  const filename = join(outputFolder, 'Introduction', '_category_.json');

  writeFileSync(filename, JSON.stringify(categoryForApiFolder, null, 2));
}

build();
