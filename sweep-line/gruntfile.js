module.exports = function(grunt) {
	grunt
			.initConfig({

				pkg : grunt.file.readJSON('package.json'),
				
				browserify : {
					main : {
						src : 'lib/<%= pkg.name %>.js',
						dest : 'dest/<%= pkg.name %>.js',
					}
				},
				
				uglify : {
					options : {
						banner : '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
					},
					my_target: {
						files : {
							'dest/<%= pkg.name %>.min.js' : [ 'dest/<%= pkg.name %>.js' ]
						}
					}
				},
				
				watch : {
					files : [ 'lib/*' ],
					tasks : [ 'default' ]
				}
			});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// grunt.registerTask('test', ['jshint', 'qunit']);
	grunt.registerTask('default', [ 'browserify', 'uglify', 'watch' ]);
//	grunt.registerTask('default', [ 'browserify', 'uglify' ]);
};