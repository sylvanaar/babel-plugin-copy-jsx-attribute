const SOURCE_ATTRIBUTE = "testID"
const DEST_ATTRIBUTE = "accessibilityLabel"


export default function ({types: t}) {
  return {
    name: "copy-jsx-attribute",
    visitor: {
      JSXAttribute(path) {
        if (path.container.some((a) => a.name.name === DEST_ATTRIBUTE)) return;
        path.container.forEach((a) => {
          console.log(a);
          if (a.name.name !== SOURCE_ATTRIBUTE) return;

          const identifier = t.jSXIdentifier(DEST_ATTRIBUTE);
          const attr = t.jSXAttribute(identifier, a.value);
          console.log("new", attr);
          path.container.push(attr);
          return;
        });
      }
    }
  };
}