import { writeFileSync } from 'fs';
import { resolve } from 'path';
import {
  ApiDocumentedItem,
  ApiItem,
  ApiModel,
} from '@microsoft/api-extractor-model';
import { DocNode, DocNodeKind, DocPlainText } from '@microsoft/tsdoc';

const apiModelPath = resolve('.', 'temp', 'serverless-adapter.api.json');
const outputFile = resolve('.', 'docs', 'sidebar-api-generated.js');

type BreadcumbItem = {
  breadcumbs: string[];
  apiMember: ApiItem;
};

function isPlainTextNode(block: DocNode): block is DocPlainText {
  return block.kind === DocNodeKind.PlainText;
}

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
          .filter(isPlainTextNode)
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

type SidebarItem = {
  type: string;
  label: string;
  link?: {
    type: string;
    id: string;
  };
  items: Sidebar[];
};

type Sidebar = SidebarItem;

function build(): void {
  const apiModel = new ApiModel();

  apiModel.loadPackage(apiModelPath);

  const breadcumbsWithApiItems = getBreadcumbsWithApiItem(apiModel);

  const pages: Sidebar[] = [];

  let level: number = 0;

  for (const breadcumbWithApiItem of breadcumbsWithApiItems) {
    let lastPage: SidebarItem | undefined;

    for (const breadcumb of breadcumbWithApiItem.breadcumbs) {
      level++;

      const newPage: SidebarItem = {
        type: 'category',
        label: breadcumb,
        items: [],
        link: {
          id: `./api/${breadcumb}`,
          type: 'doc',
        },
      };

      if (lastPage) {
        let subpage = lastPage.items.find(page => page.label === breadcumb);

        if (!subpage) {
          subpage = newPage;

          lastPage.items.push(subpage);
        }

        lastPage = subpage;
      } else {
        const oldPage = pages.find(page => page.label === breadcumb);

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

    lastPage.items.push({
      type: 'category',
      label: breadcumbWithApiItem.apiMember.displayName,
      items: [],
    });
  }

  writeFileSync(outputFile, `export default ${JSON.stringify(pages)}`);
}

build();
