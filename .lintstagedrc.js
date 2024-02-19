// const { ESLint } = require('eslint');

// const removeIgnoredFiles = async files => {
//   const eslint = new ESLint();
//   const ignoredFiles = await Promise.all(files.map(file => eslint.isPathIgnored(file)));
//   const filteredFiles = files.filter((_, i) => !ignoredFiles[i]);
//   return filteredFiles.join(' ');
// };

// module.exports = {
//   '*': async files => {
//     const filesToLint = await removeIgnoredFiles(files);
//     return [`eslint ${filesToLint} --max-warnings=0`];
//   }
// };
/**
 * lint-staged 校验暂存区的文件
 */
module.exports = {
  'src/**/*.{js,ts,tsx,jsx,vue}': ['pnpm lint:fix', 'prettier --write'],
  'src/**/*.{css,less,scss}': ['prettier --write'],
  'src/**/*.{md,json}': ['prettier --write']
};
