import { relative, sep } from 'node:path';

import { CLASSNAME_LITERAL, HOOK_NAME, OWNERS } from './module-contents.constants.mjs';
import { fileRole } from '../module-structure/module-structure.helpers.mjs';

/**
 * Keeps each kind of code in its own file: types in .types.ts, hooks in .hooks.ts, Zod in .schema.ts,
 * cva in .styles.ts, and no class-name strings written directly in JSX.
 */
export const moduleContentsRule = {
  meta: {
    type: 'problem',
    docs: { description: 'Each kind of code lives in its own role file (docs/code-structure.md).' },
    schema: [],
  },
  create(context) {
    const path = relative(context.cwd, context.filename).split(sep).join('/');
    const info = fileRole(path);
    const isRouteFile = /^apps\/web\/src\/app\//.test(path);
    const isTsx = path.endsWith('.tsx');

    const owned = (kind, node) => {
      if (!info || info.test) return;
      const owner = OWNERS[kind];
      if (info.role !== owner.role) context.report({ node, message: owner.message });
    };
    // Route files (page.tsx, layout.tsx) only compose: they may not own types, hooks, schemas or styles.
    const ownedOrRoute = (kind, node) => {
      if (isRouteFile) context.report({ node, message: OWNERS[kind].message });
      else owned(kind, node);
    };

    let zodName = null;
    let cvaName = null;

    return {
      ImportDeclaration(node) {
        if (node.importKind === 'type') return;
        for (const spec of node.specifiers) {
          if (spec.importKind === 'type') continue;
          const imported = spec.imported?.name ?? spec.local.name;
          if (node.source.value === 'zod' && imported === 'z') zodName = spec.local.name;
          if (node.source.value === 'class-variance-authority' && imported === 'cva') {
            cvaName = spec.local.name;
          }
        }
      },
      'TSTypeAliasDeclaration, TSInterfaceDeclaration, TSEnumDeclaration'(node) {
        ownedOrRoute('typeDeclaration', node);
      },
      FunctionDeclaration(node) {
        if (node.id && HOOK_NAME.test(node.id.name)) ownedOrRoute('hook', node);
      },
      VariableDeclarator(node) {
        if (node.id.type === 'Identifier' && HOOK_NAME.test(node.id.name))
          ownedOrRoute('hook', node);
      },
      MemberExpression(node) {
        if (zodName && node.object.type === 'Identifier' && node.object.name === zodName) {
          ownedOrRoute('zod', node);
        }
      },
      CallExpression(node) {
        if (cvaName && node.callee.type === 'Identifier' && node.callee.name === cvaName) {
          ownedOrRoute('cva', node);
        }
      },
      JSXAttribute(node) {
        if (!isTsx || node.name.name !== 'className' || !node.value) return;
        const value = node.value;
        const literal =
          value.type === 'Literal' ||
          (value.type === 'JSXExpressionContainer' &&
            (value.expression.type === 'Literal' || value.expression.type === 'TemplateLiteral'));
        if (literal) context.report({ node, message: CLASSNAME_LITERAL });
      },
    };
  },
};
