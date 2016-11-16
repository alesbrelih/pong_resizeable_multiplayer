"use strict";

const gulp = require("gulp");
const source = require("vinyl-source-stream");
const browserify = require("browserify");
const browserSync = require("browser-sync");

const scriptfiles = ["./scripts/**/*.js"];

gulp.task("browserify",()=>{

    let bundleStream = browserify('./scripts/app.js').bundle();

    bundleStream.on("error",function(err){
        console.log(err);
        this.emit("end");
    });

    bundleStream.pipe(source("app.js"))
            .pipe(gulp.dest("./dist/script"));
            
    
    
});

gulp.task("browserify-watch",["browserify"],function(done){
    browserSync.reload("./dist/script/app.js");
    done();
});

gulp.task("default",["browserify"],function(){
    browserSync.init({
        server: "./",
        files:["./**/*.html","./dist/script/app.js"]
    });
    
    gulp.watch(scriptfiles,["browserify-watch"]);
});
