/**
 * What may appear only in one role's files. Each entry: the AST check and the role that owns it.
 * Tests (`*.test.*`, `*.spec.ts`) are exempt: they may declare local types and fixtures.
 */
export const OWNERS = {
  typeDeclaration: { role: 'types', message: "Declare types in the module's .types.ts file." },
  hook: { role: 'hooks', message: "React hooks (use…) belong in the module's .hooks.ts file." },
  zod: { role: 'schema', message: "Zod schemas belong in the module's .schema.ts file." },
  cva: { role: 'styles', message: "Class recipes (cva) belong in the module's .styles.ts file." },
};

export const CLASSNAME_LITERAL =
  "Put class names in the module's .styles.ts file and use them here (className={styles.part()}).";

export const HOOK_NAME = /^use[A-Z]/;
