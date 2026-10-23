import { moduleContentsRule } from '../module-contents/module-contents.rule.mjs';
import { moduleStructureRule } from '../module-structure/module-structure.rule.mjs';

/** Project lint rules, registered in eslint.config.mjs as the "portfolio" plugin. */
const plugin = {
  meta: { name: '@portfolio/eslint-plugin' },
  rules: {
    'module-structure': moduleStructureRule,
    'module-contents': moduleContentsRule,
  },
};

export default plugin;
