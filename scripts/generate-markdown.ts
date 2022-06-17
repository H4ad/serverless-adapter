import { readFileSync, writeFileSync } from 'fs';
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

  const filename = join(outputFolder, 'Introduction.md');
  const introductionMarkdownContent = readFileSync(filename);

  const introductionContent = `---\ntitle: Introduction\nsidebar_position: -1\n---${introductionMarkdownContent}`;

  writeFileSync(filename, introductionContent);
}

build();
