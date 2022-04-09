import { writeFileSync } from 'fs';
import { resolve } from 'path';
import {
  ApiDocumentedItem,
  ApiItem,
  ApiModel,
} from '@microsoft/api-extractor-model';
import { DocNodeKind, DocPlainText } from '@microsoft/tsdoc';
import { DefaultTheme } from 'vitepress';
import SideBarGroup = DefaultTheme.SideBarGroup;

const apiModelPath = resolve('.', 'temp', 'serverless-adapter.api.json');
const outputFile = resolve('.', 'docs', '.vitepress', 'api-pages.ts');

type BreadcumbItem = {
  breadcumbs: string[];
  apiMember: ApiItem;
};

function getBreadcumbsWithApiItem(apiModel: ApiModel): BreadcumbItem[] {
  const breadcumbs: BreadcumbItem[] = [];

  for (const apiPackage of apiModel.members) {
    for (const apiEntrypoint of apiPackage.members) {
      for (const apiMember of apiEntrypoint.members) {
        const apiDocumentedItem = apiMember as ApiDocumentedItem;

        if (!apiDocumentedItem.tsdocComment) continue;

        const breadcumb = apiDocumentedItem.tsdocComment.customBlocks.find(
          block => block.blockTag.tagName === '@breadcumb',
        );

        if (!breadcumb) continue;

        const breadcumbContent = breadcumb.content
          .getChildNodes()
          .filter(block => block.kind === DocNodeKind.Paragraph)
          .reduce((acc, block) => [...acc, ...block.getChildNodes()], [])
          .filter(block => block.kind === DocNodeKind.PlainText)
          .map((plainText: DocPlainText) => plainText.text)
          .join('');

        breadcumbs.push({
          breadcumbs: breadcumbContent
            .split('/')
            .map(section => section.trimLeft().trimRight()),
          apiMember,
        });
      }
    }
  }

  return breadcumbs;
}

function build(): void {
  const apiModel = new ApiModel();

  apiModel.loadPackage(apiModelPath);

  const breadcumbsWithApiItems = getBreadcumbsWithApiItem(apiModel);

  const pages: SideBarGroup[] = [];

  let level: number = 0;

  for (const breadcumbWithApiItem of breadcumbsWithApiItems) {
    let lastPage: SideBarGroup | undefined;

    for (const breadcumb of breadcumbWithApiItem.breadcumbs) {
      level++;

      const newPage: SideBarGroup = {
        text: breadcumb,
        collapsable: level > 1,
        children: [],
      };

      if (lastPage) {
        let subpage = lastPage.children.find(
          page => page.text === breadcumb,
        ) as SideBarGroup;

        if (!subpage) {
          subpage = newPage;

          lastPage.children.push(subpage);
        }

        lastPage = subpage;
      } else {
        const oldPage = pages.find(page => page.text === breadcumb);

        if (oldPage) lastPage = oldPage;
        else {
          lastPage = newPage;

          pages.push(lastPage);
        }
      }
    }

    if (!lastPage) {
      throw new Error(
        `Breadcumb was configured incorrectly. Error found in ${breadcumbWithApiItem.apiMember.displayName}.`,
      );
    }

    lastPage.children.push({
      text: breadcumbWithApiItem.apiMember.displayName,
      link: `./api/${breadcumbWithApiItem.apiMember.displayName}`,
      collapsable: false,
      children: [],
    });
  }

  writeFileSync(outputFile, `export const apiPages = ${JSON.stringify(pages)}`);
}

build();
