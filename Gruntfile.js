module.exports = function(grunt) {

	// Some NPM tasks that we're gonna use...
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// And let's configure those tasks
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compass: {
			production: {
				options: {
					sassDir: 'assets/styles',
					imagesDir: 'assets/img',
					fontsDir: 'assets/fonts',
					cssDir: 'assets/styles',
					noLineComments: true,
					outputStyle: 'compact'
				}
			}
		},
		uglify: {
			production: {
				options: {
					preserveComments: 'some'
				},
				files: [
					{
						expand: true,
						cwd: 'assets/',
						src: ['js/**/*.js'],
						dest: 'js/',
						ext: '.min.js'
					}
				]
			}
		},
		copy: {
			production: {
				files: [
					{ expand: true, cwd: 'assets/', src: ['fonts/**/*'], dest: '_production/assets/' },
				]
			}
		}
	});	


	// And then group our tasks together
	grunt.registerTask('default', ['compass', 'uglify', 'copy']);

};