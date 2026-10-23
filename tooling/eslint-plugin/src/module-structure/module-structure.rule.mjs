import { relative, sep } from 'node:path';

import { checkModulePath } from './module-structure.helpers.mjs';

/** Every source file lives in a folder named after its module: <module>/<module>.<role>.<ext>. */
export const moduleStructureRule = {
  meta: {
    type: 'problem',
    docs: { description: 'Enforce the folder-per-module layout (docs/code-structure.md).' },
    schema: [],
  },
  create(context) {
    return {
      Program(node) {
        const path = relative(context.cwd, context.filename).split(sep).join('/');
        const message = checkModulePath(path);
        if (message) context.report({ node, message });
      },
    };
  },
};
