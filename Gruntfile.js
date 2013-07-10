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
				dest: 'public/js/<%= pkg.name %>.js'
			}
	    },
	    uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'public/js/<%= pkg.name %>.min.js'
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
				globals: {}
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
	          sassDir: 'assets/styles',
	          cssDir: 'public/styles',
	          environment: 'development'
	        }
	      },
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
				files: 'assets/styles/**/*.scss',
				tasks: ['compass'],
				options: {
					livereload: true
				}
			},
			html: {
				files: 'views/**/*.ejs',
				options: {
					livereload: true
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');

	// Default task.
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compass']);

};