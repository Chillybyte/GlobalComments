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
            },
            components: {
                options: {
                    force: true
                },
                src: "global_comments/src/**/*.js"
            }
        },
        clean: {
            main: ["dist/*", "tmp/*"],
            components: ["global_comments/tmp/", "global_comments/dist"]
        },

        html2js: {
            main: {
                options: {
                    base: "application",
                    module: 'gc-templates',
                    singleModule: true,
                    useStrict: true,
                    target: "js",
                    rename: function(moduleName) {
                        return moduleName.replace('../app/', '');
                    },
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                src: ['app/**/*template.html'],
                dest: 'tmp/templates.js'
            },
            components: {
                options: {
                    module: 'gc-templates',
                    singleModule: true,
                    useStrict: true,
                    target: "js",
                    rename: function(moduleName) {
                        console.log(moduleName.replace(/^\.\.\/global_comments\/src\//, ""));
                        return moduleName.replace(/^\.\.\/global_comments\/src\//, "");
                    },
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                src: ['global_comments/src/**/*template.html'],
                dest: 'global_comments/tmp/templates.js'
            }
        },

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
                    "global_comments/dist/min/gc-templates.min.js",
                    "node_modules/jquery/dist/jquery.js",
                    "node_modules/bootstrap/dist/js/bootstrap.js",
                    "app/app.js",
                    "app/router.js",
                    "app/application/**/*.js",
                    "app/components/**/*.js",
                    "app/services/**/*.js"
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
                    "global_comments/dist/min/gc-templates.min.js",
                    "node_modules/jquery/dist/jquery.js",
                    "node_modules/bootstrap/dist/js/bootstrap.js",
                    "app/**/*.js"
                ],
                dest: "dist/js/main.min.js"
            },
            components: {
                options: {
                    mangle: false,
                    compress: false
                },
                src: [
                    "global_comments/tmp/components/index.js",
                    "global_comments/tmp/components/gc-comments/**/*.js",
                    "global_comments/tmp/components/gc-frame/**/*.js",
                    "global_comments/tmp/services/**/*.js",
                    "global_comments/tmp/templates.js"
                ],
                dest: "global_comments/dist/min/gc-templates.min.js"
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
            },
            components: {
                options: {
                    compress: true,
                    ieCompat: true,
                    strictMath: true,
                    syncImport: true,
                },
                src: [
                    "global_comments/src/less/global_comments.less"
                ],
                dest: "global_comments/dist/min/main.min.css"
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
            },
            components: {
                files: [{
                    expand: true,
                    cwd: "global_comments/src",
                    src: ["components/**/*.js", "services/**/*.js"],
                    dest: "global_comments/tmp/"
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
    grunt.loadNpmTasks('grunt-html2js');

    var environment = grunt.option('environment') || 'development'; //How must it build (production || development)
    var watch = grunt.option("watch") || false;


    if (watch) {
        grunt.registerTask("default", ["clean:components", "copy:components", "jshint:components", "html2js:components", "uglify:components", "less:components", "jshint:" + environment, "clean:main", "html2js:main", "uglify:" + environment, "less:" + environment, "copy", "watch:" + environment]);
    } else {
        grunt.registerTask("default", ["clean:components", "copy:components", "jshint:components", "html2js:components", "uglify:components", "less:components", "jshint:" + environment, "clean:main", "html2js:main", "uglify:" + environment, "less:" + environment, "copy"]);
    }


    grunt.registerTask("components", ["clean:components", "copy:components", "jshint:components", "html2js:components", "uglify:components", "less:components"]);

};