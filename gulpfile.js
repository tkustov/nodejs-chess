var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var tasksPath = path.join(__dirname, 'tasks');
var tasks = fs.readdirSync(tasksPath);

tasks.forEach(task => { require(path.join(tasksPath, path.basename(task, path.extname(task)))); });

gulp.task('default', ['build']);
