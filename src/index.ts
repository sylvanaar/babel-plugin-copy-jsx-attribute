import * as types from "@babel/types";
import { Visitor } from "@babel/traverse";

const SOURCE_ATTRIBUTE = "testID";
const DEST_ATTRIBUTE = "accessibilityLabel";

export interface PluginOptions {
  opts?: {};
  file: {};
}

export default function ({
  types: t,
}: {
  types: typeof types;
}): { visitor: Visitor<PluginOptions> } {
  return {
    visitor: {
      JSXAttribute(path) {
        if (path.container instanceof Array) {
          const container = path.container;
          if (
            container.some((a: Record<string, any>) => {
              return a.name?.name === DEST_ATTRIBUTE;
            })
          )
            return;

          container.forEach((a: Record<string, any>) => {
            if (a.name?.name !== SOURCE_ATTRIBUTE) return;
            const identifier = t.jsxIdentifier(DEST_ATTRIBUTE);
            const attr = t.jsxAttribute(identifier, a.value);
            container.push(attr);
            return;
          });
        }
      },
    },
  };
}
