module.exports = {
  compile: {
	options: {
		outputStyle: 'compressed',
		includePaths: ['vendor/foundation/scss','/var/lib/gems/1.9.1/gems/compass-0.12.2/frameworks/compass/stylesheets/'],
		sourcemap: true,
		sourceComments: 'map'
	},  
	files: [{
		expand: true,
		cwd: 'app/styles',
		src: ['**/*.{scss,sass}', '!**/_*.{scss,sass}'],
		dest: 'tmp/result/assets/',
		ext: '.css'
    }]
  }
};
