const { getJestProjects } = require('@nrwl/jest')

module.exports = {
  projects: [...getJestProjects(), '<rootDir>/apps/ring-with-contentful/ui'],
}
