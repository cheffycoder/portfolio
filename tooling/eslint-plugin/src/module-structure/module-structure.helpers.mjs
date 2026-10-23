import {
  APP_DIR,
  DECLARATION_DIR,
  FILE_NAME,
  NEXT_ROUTE_FILES,
  ROLES,
  SCOPED,
} from './module-structure.constants.mjs';

const roleList = Object.keys(ROLES).join(', ');

/**
 * Reads the role from a file path: `queries.helpers.test.ts` → { role: 'helpers', test: true }.
 * Returns null for files outside the module layout (tool config, route files, declarations).
 */
export function fileRole(path) {
  if (!SCOPED.test(path) || APP_DIR.test(path) || path.endsWith('.d.ts')) return null;
  const match = FILE_NAME.exec(path.split('/').at(-1));
  if (!match) return null;
  const [, module, role, test, ext] = match;
  return { module, role, test: Boolean(test) || role === 'spec', ext };
}

/**
 * Checks one file path (repo-relative, forward slashes) against the module layout.
 * Returns a message explaining what is wrong, or null when the file is where it belongs.
 */
export function checkModulePath(path) {
  if (!SCOPED.test(path)) return null;

  const parts = path.split('/');
  const file = parts.at(-1);
  const folder = parts.at(-2);

  if (APP_DIR.test(path)) {
    return NEXT_ROUTE_FILES.has(file)
      ? null
      : `"${file}": only Next.js route files (page.tsx, layout.tsx, …) belong in src/app. Put this code in a module folder under components/, features/ or lib/.`;
  }

  if (file.endsWith('.d.ts')) {
    return DECLARATION_DIR.test(path)
      ? null
      : `"${file}": declaration files belong directly in src/types/.`;
  }

  if (folder === 'src' || folder === 'e2e') {
    return `"${file}": files never sit loose in ${folder}/. Put it in a module folder, e.g. ${folder}/<module>/<module>.<role>.ts.`;
  }

  const match = FILE_NAME.exec(file);
  if (!match) {
    return `"${file}": name files <module>.<role>.<ext>, e.g. ${folder}.helpers.ts (roles: ${roleList}).`;
  }
  const [, module, role, test, ext] = match;

  if (module !== folder) {
    return `"${file}": files in "${folder}/" must start with "${folder}." (found "${module}."). One folder = one module.`;
  }

  const spec = ROLES[role];
  if (!spec) return `"${file}": unknown role ".${role}". Use one of: ${roleList}.`;

  if (role === 'spec' && test) return `"${file}": e2e files are already tests; drop ".test".`;

  if (!spec.ext.includes(ext)) {
    return `"${file}": .${role} files are .${spec.ext.join(' or .')}${
      ext === 'tsx' ? ' (JSX belongs only in .view.tsx)' : ''
    }.`;
  }

  if (spec.where && !spec.where.test(path)) {
    return `"${file}": .${role} files (${spec.holds}) belong in ${spec.whereText}.`;
  }

  return null;
}
