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
					sassDir: '_source/scss',
					imagesDir: '_source/img',
					fontsDir: '_source/fonts',
					cssDir: '_production/assets/css',
					noLineComments: true,
					outputStyle: 'compact'
				}
			}
			staging: {
				options: {
					sassDir: '_source/scss',
					imagesDir: '_source/img',
					fontsDir: '_source/fonts',
					cssDir: '_staging/assets/css',
					noLineComments: false,
					outputStyle: 'expanded'
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
						cwd: '_source/',
						src: ['js/**/*.js'],
						dest: '_production/assets/',
						ext: '.min.js'
					}
				]
			},
			staging: {
				options: {
					preserveComments: 'all',
					compress: false
				},
				files: [
					{
						expand: true,
						cwd: '_source/assets/',
						src: ['js/**/*.js'],
						dest: '_staging/assets/'
					}
				]
			}
		},
		copy: {
			production: {
				files: [
					{ expand: true, cwd: '_source/', src: ['fonts/**/*'], dest: '_production/assets/' },
				]
			},
			staging: {
				files: [
					{ expand: true, cwd: '_source/', src: ['fonts/**/*'], dest: '_staging/assets/' },
				]
			}
		},
	});	


	// And then group our tasks together
	grunt.registerTask('default', ['compass', 'uglify', 'copy']);

};