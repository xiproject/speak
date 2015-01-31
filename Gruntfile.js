module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		copy: {
			main: {
				files: [
				{
					expand: true,
					src: ['index.js', 'src/**', 'node_modules/**'],
					dest: 'dist/'
				}
				]
			}
		}
	});

	grunt.registerTask('build', ['newer:copy']);
}