module.exports = function(grunt) {

	grunt.initConfig({





		// Kompiluj a minifikuj less
		less: {
			style: {
				files: {
					"css/style.min.css": "less/style.less"
				},
				options: {
					compress: true,
					relativeUrls: true,
					yuicompress: true,

					sourceMap: false, // Nezapomenout přeponout i v Autoprefixeru!
					sourceMapFilename: 'css/style.min.css.map', // where file is generated and located
					sourceMapURL: 'style.min.css.map', // the complete url and filename put in the compiled css file
					sourceMapBasepath: '', // Sets sourcemap base path, defaults to current working directory.
					sourceMapRootpath: '../' // adds this path onto the sourcemap filename and less file paths
				}
			}
		},





		// Autoprefixuj
		autoprefixer: {
			options: {
				map: false
			},
			file: {
				src: 'css/style.min.css',
				dest: 'css/style.min.css'
			}
		},





		// Zkopíruj potřebné dependency komponenty z bower adresáře, aby šly použít mimo tento adresář
		bowercopy: {
			options: {

			},
			jquery: {
				files: {
					'js/jquery.min.js': 'jquery/dist/jquery.min.js'
				}
			}
		},





		// Notifikace úspěchu a failů pro parádu
		notify: {
			notify_js: {
				options: {
					title: 'Kombinace a minifikace JS se povedla!',  // Volitelný
					message: 'Jsi šikovný borec, jen tak dál!' // Povinný
				}
			},
			notify_less: {
				options: {
					title: 'LESS se zkompilovalo na výbornou!',  // Volitelný
					message: 'Jsi šikovný borec, jen tak dál!' // Povinný
				}
			}
		},





		// Sleduj a konej
		watch: {
			configFiles: {
				files: ['gruntfile.js'] // Při aktualizace gruntfile.js jej znovu načti (netřeba watch exitovat a znovu spouštět)
			},
			less: {
				files: ['less/**/*.less'],
				tasks: ['less:style', 'autoprefixer:file', 'notify:notify_less'],
				options: {
					spawn: false,
					livereload: false
				}
			}
		},


	});





	// Naloaduj tasky
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-watch');





	// Registruj spouštějící úlohy pro terminál - pro defaultní stačí volat "grunt"
	grunt.registerTask('default', [ 'watch' ]);


};