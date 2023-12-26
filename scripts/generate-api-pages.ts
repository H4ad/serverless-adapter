import { writeFileSync } from 'fs';
import { resolve } from 'path';
import {
  ApiDocumentedItem,
  ApiItem,
  ApiModel,
} from '@microsoft/api-extractor-model';
import { DocNode, DocNodeKind, DocPlainText } from '@microsoft/tsdoc';

const apiModelPath = resolve('.', 'temp', 'serverless-adapter.api.json');
const outputFile = resolve('.', 'www', 'sidebar-api-generated.js');

type BreadcrumbItem = {
  breadcrumbs: string[];
  apiMember: ApiItem;
};

function isPlainTextNode(block: DocNode): block is DocPlainText {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  return block.kind === DocNodeKind.PlainText;
}

function getBreadcrumbsWithApiItem(apiModel: ApiModel): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];

  for (const apiPackage of apiModel.members) {
    for (const apiEntrypoint of apiPackage.members) {
      for (const apiMember of apiEntrypoint.members) {
        const apiDocumentedItem = apiMember as ApiDocumentedItem;

        if (!apiDocumentedItem.tsdocComment) continue;

        const breadcrumb = apiDocumentedItem.tsdocComment.customBlocks.find(
          block => block.blockTag.tagName === '@breadcrumb',
        );

        if (!breadcrumb) continue;

        const breadcrumbContent = breadcrumb.content
          .getChildNodes()
          // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
          .filter(block => block.kind === DocNodeKind.Paragraph)
          // @ts-ignore
          .reduce((acc, block) => [...acc, ...block.getChildNodes()], [])
          // @ts-ignore
          .filter(isPlainTextNode)
          .map((plainText: DocPlainText) => plainText.text)
          .join('');

        breadcrumbs.push({
          breadcrumbs: breadcrumbContent
            .split('/')
            .map(section => section.trimLeft().trimRight()),
          apiMember,
        });
      }
    }
  }

  return breadcrumbs;
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

  const breadcrumbsWithApiItems = getBreadcrumbsWithApiItem(apiModel);

  const pages: Sidebar[] = [];

  for (const breadcrumbWithApiItem of breadcrumbsWithApiItems) {
    let lastPage: SidebarItem | undefined;

    for (const breadcrumb of breadcrumbWithApiItem.breadcrumbs) {
      const newPage: SidebarItem = {
        type: 'category',
        label: breadcrumb,
        items: [],
        link: {
          id: `./api/${breadcrumb}`,
          type: 'doc',
        },
      };

      if (lastPage) {
        let subpage = lastPage.items.find(page => page.label === breadcrumb);

        if (!subpage) {
          subpage = newPage;

          lastPage.items.push(subpage);
        }

        lastPage = subpage;
      } else {
        const oldPage = pages.find(page => page.label === breadcrumb);

        if (oldPage) lastPage = oldPage;
        else {
          lastPage = newPage;

          pages.push(lastPage);
        }
      }
    }

    if (!lastPage) {
      throw new Error(
        `Breadcrumb was configured incorrectly. Error found in ${breadcrumbWithApiItem.apiMember.displayName}.`,
      );
    }

    lastPage.items.push({
      type: 'category',
      label: breadcrumbWithApiItem.apiMember.displayName,
      items: [],
    });
  }

  writeFileSync(outputFile, `export default ${JSON.stringify(pages)}`);
}

build();
