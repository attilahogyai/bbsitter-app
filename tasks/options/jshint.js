module.exports = {
  app: {
    src: [
      'app/**/*.js'
    ],
    options: { jshintrc: '.jshintrc' }
  },

  tooling: {
    src: [
      'Gruntfile.js',
      'tasks/**/*.js'
    ],
    options: { 
jshintrc: 'tasks/.jshintrc',
"--W013":true 
}
  },

  tests: {
    src: [
      'tests/**/*.js',
    ],
    options: { jshintrc: 'tests/.jshintrc' }
  },

  options: {
    force: true
  }
};
