(function() {
    "use strict";
}());
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        jshint: { //Check all selfwritten JS before concatting with jQuery and angularJS
            development: {

                options: {
                    force: true
                },
                src: "app/**/*.js"
            },
            production: {
                options: {
                    force: true
                },
                src: "app/**/*.js"
            }
        },
        clean: ["dist/*", "tmp/*"],

        uglify: { //Make it ugly and unreadable - Improves performance a great deal
            development: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true
                },
                src: [
                    "node_modules/angular/angular.js",
                    "node_modules/angular-ui-router/release/angular-ui-router.js",
                    "node_modules/angular-resource/angular-resource.js",
                    "node_modules/jquery/dist/jquery.js",
                    "node_modules/bootstrap/dist/js/bootstrap.js",
                    "app/**/*.js"
                ],
                dest: "dist/js/main.min.js"
            },
            production: {
                options: {
                    mangle: true,
                    compress: true
                },
                src: [
                    "node_modules/angular/angular.js",
                    "node_modules/angular-ui-router/release/angular-ui-router.js",
                    "node_modules/angular-resource/angular-resource.js",
                    "node_modules/jquery/dist/jquery.js",
                    "node_modules/bootstrap/dist/js/bootstrap.js",
                    "app/**/*.js"
                ],
                dest: "dist/js/main.min.js"
            }
        },
        less: { //Make it ugly and unreadable - Improves performance a great deal
            development: {
                options: {
                    compress: false,
                    ieCompat: true,
                    strictMath: true,
                    syncImport: true,
                },
                src: [
                    "app/styles/app.less"
                ],
                dest: "dist/css/main.min.css"
            },
            production: {
                options: {
                    compress: true,
                    ieCompat: true,
                    strictMath: true,
                    syncImport: true,
                },
                src: [
                    "app/styles/app.less"
                ],
                dest: "dist/css/main.min.css"
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: "app/",
                    src: "**/*.html",
                    dest: "dist"
                }, {
                    expand: true,
                    cwd: "node_modules/font-awesome",
                    src: "fonts/*",
                    dest: "dist"
                }, {
                    expand: true,
                    cwd: "./",
                    src: "public/**/*",
                    dest: "dist"
                }]
            }
        },
        watch: {
            production: {
                files: ["app/**/*", "node_modules/**/*", "public/**/*"],
                tasks: ["jshint:production", "clean", "uglify:production", "less:production", "copy"],
                options: {
                    debounceDelay: 3000,
                    spawn: true
                }
            },
            development: {
                files: ["app/**/*", "node_modules/**/*", "public/**/*"],
                tasks: ["jshint:development", "clean", "uglify:development", "less:development", "copy"],
                options: {
                    debounceDelay: 3000,
                    spawn: true
                }
            }
        }

    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-clean');

    var environment = grunt.option('environment') || 'development'; //How must it build (production || development)
    var watch = grunt.option("watch") || false;


    if (watch) {
        grunt.registerTask("default", ["jshint:" + environment, "clean", "uglify:" + environment, "less:" + environment, "copy", "watch:" + environment]);
    } else {
        grunt.registerTask("default", ["jshint:" + environment, "clean", "uglify:" + environment, "less:" + environment, "copy"]);
    }

};