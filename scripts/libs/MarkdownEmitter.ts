import { CustomMarkdownEmitter } from '@microsoft/api-documenter/lib/markdown/CustomMarkdownEmitter';
import type { IMarkdownEmitterContext } from '@microsoft/api-documenter/lib/markdown/MarkdownEmitter';
import { IndentedWriter } from '@microsoft/api-documenter/lib/utils/IndentedWriter';

export class MarkdownEmitter extends CustomMarkdownEmitter {
  protected override writePlainText(
    text: string,
    context: IMarkdownEmitterContext,
  ): void {
    const writer: IndentedWriter = context.writer;

    // split out the [ leading whitespace, content, trailing whitespace ]
    const parts: string[] = text.match(/^(\s*)(.*?)(\s*)$/) || [];

    writer.write(parts[1]); // write leading whitespace

    const middle: string = parts[2];

    if (middle !== '') {
      switch (writer.peekLastCharacter()) {
        case '':
        case '\n':
        case ' ':
        case '[':
        case '>':
          // okay to put a symbol
          break;
        default:
          // This is no problem:        "**one** *two* **three**"
          // But this is trouble:       "**one***two***three**"
          // The most general solution: "**one**<!-- -->*two*<!-- -->**three**"
          // but the solution above breaks docusaurus, so, I changed to space
          writer.write(' ');
          break;
      }

      writer.write(this.getEscapedText(middle));
    }

    writer.write(parts[3]); // write trailing whitespace
  }
}
