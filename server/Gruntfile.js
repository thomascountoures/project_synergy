module.exports = function(grunt) {	

	grunt.initConfig({

		nodemon: {
		  dev: {
		    script: './server.js'
		  }
		},

		browserSync: {
            dev: {
                bsFiles: {
                	//define files to watch
                    src : [
                        '../client/app/assets/*.css',                                        
                        '../client/app/assets/*.js',
                        '../client/app/*.js',
                        '../client/**/*.html',
                        '../client/*.html',
                        '../client/app/modules/**/*.html',
                        '../client/app/modules/**/*.js',
                        '../client/app/**/*.js',
                        '../client/app/**/**/*.js'
                    ]
                },
                options: {
			        proxy: "http://localhost:8000",
			        reloadDelay: 1000
	   		 	}
            }
        },

        sass: {
        	dist: {
        		files: {
        			'../client/app/assets/css/style.css' : '../client/app/assets/css/style.scss'
        		}
        	}
        }

	}); 
	
	//reloads server.js file when changed
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-sass');

	//define default grunt task
	grunt.registerTask('default', ['nodemon', 'sass']);

}