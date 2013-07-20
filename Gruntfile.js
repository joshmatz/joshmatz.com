module.exports = function(grunt) {

	grunt.initConfig({
	    // Metadata.
	    pkg: grunt.file.readJSON('package.json'),
	    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
	    // Task configuration.
	    concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: ['assets/js/<%= pkg.name %>.js'],
				dest: '_site/assets/js/<%= pkg.name %>.js'
			}
	    },
	    uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: '_site/assets/js/<%= pkg.name %>.min.js'
			}
	    },
	    jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				smarttabs: true,
				globals: {jQuery: true, console: true, module: true }
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib_test: {
				src: ['assets/js/**/*.js', 'test/**/*.js']
			}
	    },
	    compass: {
	        dist: {                   // Target
	        options: {              // Target options
	          sassDir: 'assets/scss',
	          cssDir: 'assets/css',
	          environment: 'development'
	        }
	      },
	    },
	    jekyll: {
			server : {
				
			}
		},
	    watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			lib_test: {
				files: '<%= jshint.lib_test.src %>',
				tasks: ['jshint:lib_test', 'qunit']
			},
			styles: {
				files: 'assets/scss/**',
				tasks: ['compass', 'copy'],
				options: {
					livereload: true
				}
			},
			jekyll: {
				files: ['_includes/**', '_layouts/**', '_posts/**', 'assets/img'],
				tasks: ['jekyll'],
				options: {
					livereload: true
				}
			}
		},
		copy: {
			assets: {
				files: [
					{
						expand: true, 
						cwd: 'assets/css/', 
						src: ['**'], 
						dest: '_site/assets/css/'}, // makes all src relative to cwd
				]
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-jekyll');

	// Default task.
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compass', 'jekyll', 'copy']);

};