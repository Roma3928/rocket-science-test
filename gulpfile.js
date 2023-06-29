'use strict';

const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const rollup = require('gulp-better-rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

function buildScripts() {
    return src(['app/js/*.js', '!app/js/main.min.js'])
        .pipe(
            rollup({
                plugins: [
                    resolve({ browser: true }),
                    commonjs()
                ]
            }, {
                format: 'iife'
            })
        )
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function buildStyles() {
    return src('app/scss/style.scss')
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function watching() {
    watch(['app/scss/style.scss'], buildStyles);
    watch(['app/js/main.js'], buildScripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

function browserSynchronization() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function building() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/**/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'))
}

exports.buildStyles = buildStyles;
exports.buildScripts = buildScripts;
exports.watching = watching;
exports.browserSynchronization = browserSynchronization;

exports.build = series(cleanDist, building);
exports.default = parallel(buildStyles, buildScripts, browserSynchronization, watching);