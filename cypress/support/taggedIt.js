// cypress/support/taggedIt.js

/**
 * Tagged test wrapper
 * @param {string} title - test name
 * @param {string[]} tags - list of tags
 * @param {Function} fn - test function
 */
export function taggedIt(title, tags, fn) {
  const runTag = Cypress.env('TAGS'); // e.g. TAGS=smoke
  if (runTag && !tags.includes(runTag)) {
    return it.skip(title, fn);
  }
  return it(title, fn);
}
