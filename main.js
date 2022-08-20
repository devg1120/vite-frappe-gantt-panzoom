import Gantt from './gantt/src/gantt.js';
import GanttIndex from './gantt/src/gantt_index.js';
import panzoom from "./panzoom/index.js";


var tasks = [
	{
		start: '2018-10-01',
		end: '2018-10-08',
		name: 'Redesign website',
		id: "Task 0",
		progress: 20
	},
	{
		start: '2018-10-03',
		end: '2018-10-06',
		name: 'Write new content',
		id: "Task 1",
		progress: 5,
		dependencies: 'Task 0'
	},
	{
		start: '2018-10-04',
		end: '2018-10-08',
		name: 'Apply new styles',
		id: "Task 2",
		progress: 10,
		dependencies: 'Task 1'
	},
	{
		start: '2018-10-08',
		end: '2018-10-09',
		name: 'Review',
		id: "Task 3",
		progress: 5,
		dependencies: 'Task 2'
	},
	{
		start: '2018-10-08',
		end: '2018-10-10',
		name: 'Deploy',
		id: "Task 4",
		progress: 0,
		dependencies: 'Task 2'
	},
	{
		start: '2018-10-11',
		end: '2018-10-11',
		name: 'Go Live!',
		id: "Task 5",
		progress: 0,
		dependencies: 'Task 4',
		custom_class: 'bar-milestone'
	},
	{
		start: '2018-10-05',
		end: '2018-10-12',
		name: 'Long term task',
		id: "Task 6",
		progress: 0
	},
	{
		start: '2018-10-10',
		end: '2018-10-12',
		name: 'Long term task',
		id: "Task 7",
		dependencies: 'Task 6',
		progress: 0
	},
	{
		start: '2018-10-22',
		end: '2018-10-25',
		name: 'Long term task',
		id: "Task 8",
		dependencies: 'Task 6',
		progress: 50
	},
]

function z2f(num) {
   return  ( '00' + num ).slice( -2 );
}

function formatDate(date, format) {
    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, z2f(date.getMonth() + 1));
    format = format.replace(/DD/, z2f(date.getDate()));
    return format;
}

function make_date_old(diffDay, dt_str) {
  let old_dt = new Date(dt_str);
  console.log("old " + old_dt);
  let dt = Date(old_dt.getDate() + diffDay);
  let new_dt = new Date (dt);
  //console.log("new " + new_dt);
  return formatDate(new_dt,"YYYY-MM-DD");
}

function make_date(diffDay, dt_str) {
  
  let date = new Date(dt_str);
  console.log("old " + date);
  date.setDate( date.getDate() + diffDay);
  console.log("new " + date);
  return formatDate(date,"YYYY-MM-DD");
}
let today = new Date();
let startdt = new Date(tasks[0].start);
let diffTime = today.getTime() - startdt.getTime();
let diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));

let new_tasks = [];
tasks.forEach(function(task){
  //console.log(task.start);
  //console.log(make_date(task.start));
  //console.log(make_date(task.end));
  new_tasks.push(
	  {
          start: make_date(diffDay,task.start),
          end  : make_date(diffDay,task.end),
          name : task.name,
          id   : task.id,
          progress   : task.progress,
          dependencies   : task.dependencies,
	  }
       );

});
console.log(new_tasks);

var base_width_int = 300;
//var base_width_int = 0;
var base_height_int = 86;
var base_width_px = base_width_int.toString(10) + 'px';
var base_height_px = base_height_int.toString(10) + 'px';

function gridHeaderSizeZoom(scale) {
   var base_width_px  = (base_width_int*scale).toString(10)  + 'px';
   var base_height_px = (base_height_int*scale).toString(10) + 'px';
   document.documentElement.style.setProperty("--gridWidth", base_width_px );
   document.documentElement.style.setProperty("--gridHeight", base_height_px );
}


document.documentElement.style.setProperty("--gridWidth", base_width_px );
document.documentElement.style.setProperty("--gridHeight", base_height_px );

//var gantt_chart = new Gantt(".gantt-target", new_tasks, {
var x_header = new Gantt("#svg1", new_tasks, {
	on_click: function (task) {
		console.log(task);
	},
	on_date_change: function(task, start, end) {
		console.log(task, start, end);
	},
	on_progress_change: function(task, progress) {
		console.log(task, progress);
	},
	on_view_change: function(mode) {
		console.log(mode);
	},
	view_mode: 'Day',
	language: 'jp'
});

var plot_area = new Gantt("#svg2", new_tasks, {
	on_click: function (task) {
		console.log(task);
	},
	on_date_change: function(task, start, end) {
		console.log(task, start, end);
	},
	on_progress_change: function(task, progress) {
		console.log(task, progress);
	},
	on_view_change: function(mode) {
		console.log(mode);
	},
	view_mode: 'Day',
	language: 'jp'
});

//var y_header = new Gantt("#svg3", new_tasks, {
var y_header = new GanttIndex("#svg3", new_tasks, {
	on_click: function (task) {
		console.log(task);
	},
	on_date_change: function(task, start, end) {
		console.log(task, start, end);
	},
	on_progress_change: function(task, progress) {
		console.log(task, progress);
	},
	on_view_change: function(mode) {
		console.log(mode);
	},
	view_mode: 'Day',
	language: 'jp'
});

//pan zoom
// panzoom
var element1 = document.querySelector('#svg1')
var element2 = document.querySelector('#svg2')
var element3 = document.querySelector('#svg3')
let topLeft = {x: 0, y: 0};
let topRight = {x: 1, y: 0};
let bottomLeft = {x: 0, y: 1};
let bottomRight = {x: 1, y: 1};
let centerCenter = {x: 0.5, y: 0.5};

var instance1 = panzoom(element1, {
  panMode: 'x',
  //bounds: true
  //boundsPadding: 0.1
  fixTopLeft: true,
  //fixTopLeftPosition: {x:-140, y:0},
  //fixTopLeftPosition: {x:-base_width_int, y:0},
  fixTopLeftPosition: {x:0, y:0},
  transformOrigin: topLeft,
  zoomEffect: false
});


var instance2 = panzoom(element2, {
  panMode: 'xy',
  fixTopLeft: true,
  //fixTopLeftPosition: {x:-140, y:-60},
  //fixTopLeftPosition: {x:-base_width_int, y:-base_height_int},
  fixTopLeftPosition: {x:0 , y:-base_height_int},

  transformOrigin: topLeft
});

var instance3 = panzoom(element3, {
  panMode: 'y',
  fixTopLeft: true,
  //fixTopLeftPosition: {x:0, y:-60},
  fixTopLeftPosition: {x:0, y:-base_height_int},
  //fixTopLeftPosition: {x:0, y:0},
  transformOrigin: topLeft,
  zoomEffect: false
});

instance1.on('pan', function(e) {
  var p = e.getPoint();
  instance2.syncMoveToX(p.x, p.y);
  //instance4.syncMoveToX(p.x, p.y);
});

instance2.on('pan', function(e) {
  var p = e.getPoint();
  instance1.syncMoveTo(p.x, p.y);
  instance3.syncMoveTo(p.x, p.y);
  //instance4.syncMoveToX(p.x, p.y);
});

instance3.on('pan', function(e) {
  var p = e.getPoint();
  instance2.syncMoveToY(p.x, p.y);
});

instance2.on('zoom', function(e) {
  var transform = e.getTransform();
  instance1.syncZoomTo(transform);
  instance3.syncZoomTo(transform);
  //instance4.syncZoomTo(transform);
  //instance5.syncZoomTo(transform);
  gridHeaderSizeZoom(transform.scale);

});

// grab the DOM SVG element that you want to be draggable/zoomable:
//var element = document.getElementById('scene')
//var element = document.getElementById('gantt-container')

// and forward it it to panzoom.
//panzoom(element)

//console.log(gantt_chart.tasks);

