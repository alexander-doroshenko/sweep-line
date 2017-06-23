"use strict";

var CANVAS_MARGIN = 20;
var POINT_SIZE = 1;
var TRIANGLE_FILL_COLOR = '#3F8C8C';
var TRIANGLE_STROKE_COLOR = '#175E5E';
var POINT_COLOR = '#1D3369';
var CIRCUMCIRCLE_COLOR = '#E9A369'

/**
 * find bounds of points set
 * 
 * @param points
 * @returns {leftmost, lowermost, rightmost, uppermost} - extreme values of
 *          bounding box
 */
function getBoundingBox(points) {
	var bounds = {};
	bounds.leftmost = Number.MAX_VALUE;
	bounds.lowermost = Number.MAX_VALUE;
	bounds.rightmost = Number.MIN_VALUE;
	bounds.uppermost = Number.MIN_VALUE;
	for ( var p in points) {
		bounds.leftmost = Math.min(bounds.leftmost, points[p].x);
		bounds.lowermost = Math.min(bounds.lowermost, points[p].y);
		bounds.rightmost = Math.max(bounds.rightmost, points[p].x);
		bounds.uppermost = Math.max(bounds.uppermost, points[p].y);
	}
	return bounds;
}

/**
 * create the new layer named "points" and draw all points like circles
 * 
 * @param stage
 *            {Kinetic.Stage}
 * @param points
 *            {Array<Point>} given points
 */
function drawPoints(stage, points) {
	// draw triangles
	var layer = new Kinetic.Layer({
		name : "points"
	});
	for ( var p in points) {
		var point = new Kinetic.Circle({
			x : points[p].x,
			y : points[p].y,
			radius : POINT_SIZE / stage.getScaleX(),
			strokeWidth : 1 / stage.getScaleX(),
			fill : POINT_COLOR,
			stroke : POINT_COLOR
		});
		layer.add(point);
	}
	stage.add(layer);
}

/**
 * create new layer named "triangles" and draw given triangles
 * 
 * @param stage
 *            {Kinetic.Stage}
 * @param triangles
 *            {Array<Triangle>} Delaunay triangulation
 */
function drawTriangles(stage, triangles) {
	var layer = new Kinetic.Layer({
		name : "triangles"
	});

	for ( var t in triangles) {
		var triangle = new Kinetic.Line({
			strokeWidth : 1 / stage.getScaleX(),
			fill : TRIANGLE_FILL_COLOR,
			stroke : TRIANGLE_STROKE_COLOR,
			points : [ triangles[t].a.x, triangles[t].a.y, triangles[t].b.x,
					triangles[t].b.y, triangles[t].c.x, triangles[t].c.y ],
			tension : 0,
			closed : true,
			listening : true,
			draggable : false
		});
		var circumcenter = triangles[t].getCircumCenter();
		var circumradius = circumcenter.dist(triangles[t].a);
		triangle.circumcircle = new Kinetic.Circle({
			x : circumcenter.x,
			y : circumcenter.y,
			radius : circumradius,
			strokeWidth : 2 / stage.getScaleX(),
			stroke : CIRCUMCIRCLE_COLOR,
			visible : false,
			listening : false
		});
		triangle.on('click', function() {
			this.circumcircle.visible(true);
			this.circumcircle.moveToTop();
			layer.draw();
		});
		layer.add(triangle.circumcircle);
		layer.add(triangle);
	}

	stage.add(layer);
}

$(document).ready(
		function() {
			var container = $('#container');

			var stage = new Kinetic.Stage({
				container : container[0],
				width : container.width(),
				height : container.height()
			});

			$(window).resize(function() {
				stage.setSize(container.width(), container.height());
				stage.draw();
			});

			var points = [];
			for (var i = 100; i--;) {
				var p = new SweepLine.Point(Math.random(), Math.random());
				points.push(p);
			}

			var triangles = SweepLine.triangulate(points);

			// auto scale / translate
			var bounds = getBoundingBox(points);
			var xscale = (stage.getWidth() - 2 * CANVAS_MARGIN)
					/ (bounds.rightmost - bounds.leftmost);
			var yscale = (stage.getHeight() - 2 * CANVAS_MARGIN)
					/ (bounds.uppermost - bounds.lowermost);
			var scale = Math.min(xscale, yscale);

			stage.setOffsetX(bounds.leftmost - CANVAS_MARGIN / scale);
			stage.setOffsetY(bounds.lowermost - CANVAS_MARGIN / scale);
			stage.scaleX(scale);
			stage.scaleY(scale);

			drawTriangles(stage, triangles);
			drawPoints(stage, points);
			stage.draw();
		});
"use strict";

var CANVAS_MARGIN = 20;
var POINT_SIZE = 1;
var TRIANGLE_FILL_COLOR = '#3F8C8C';
var TRIANGLE_STROKE_COLOR = '#175E5E';
var POINT_COLOR = '#1D3369';
var CIRCUMCIRCLE_COLOR = '#E9A369'

/**
 * find bounds of points set
 * 
 * @param points
 * @returns {leftmost, lowermost, rightmost, uppermost} - extreme values of
 *          bounding box
 */
function getBoundingBox(points) {
	var bounds = {};
	bounds.leftmost = Number.MAX_VALUE;
	bounds.lowermost = Number.MAX_VALUE;
	bounds.rightmost = Number.MIN_VALUE;
	bounds.uppermost = Number.MIN_VALUE;
	for ( var p in points) {
		bounds.leftmost = Math.min(bounds.leftmost, points[p].x);
		bounds.lowermost = Math.min(bounds.lowermost, points[p].y);
		bounds.rightmost = Math.max(bounds.rightmost, points[p].x);
		bounds.uppermost = Math.max(bounds.uppermost, points[p].y);
	}
	return bounds;
}

/**
 * create the new layer named "points" and draw all points like circles
 * 
 * @param stage
 *            {Kinetic.Stage}
 * @param points
 *            {Array<Point>} given points
 */
function drawPoints(stage, points) {
	// draw triangles
	var layer = new Kinetic.Layer({
		name : "points"
	});
	for ( var p in points) {
		var point = new Kinetic.Circle({
			x : points[p].x,
			y : points[p].y,
			radius : POINT_SIZE / stage.getScaleX(),
			strokeWidth : 1 / stage.getScaleX(),
			fill : POINT_COLOR,
			stroke : POINT_COLOR
		});
		layer.add(point);
	}
	stage.add(layer);
}

/**
 * create new layer named "triangles" and draw given triangles
 * 
 * @param stage
 *            {Kinetic.Stage}
 * @param triangles
 *            {Array<Triangle>} Delaunay triangulation
 */
function drawTriangles(stage, triangles) {
	var layer = new Kinetic.Layer({
		name : "triangles"
	});

	for ( var t in triangles) {
		var triangle = new Kinetic.Line({
			strokeWidth : 1 / stage.getScaleX(),
			fill : TRIANGLE_FILL_COLOR,
			stroke : TRIANGLE_STROKE_COLOR,
			points : [ triangles[t].a.x, triangles[t].a.y, triangles[t].b.x,
					triangles[t].b.y, triangles[t].c.x, triangles[t].c.y ],
			tension : 0,
			closed : true,
			listening : true,
			draggable : false
		});
		var circumcenter = triangles[t].getCircumCenter();
		var circumradius = circumcenter.dist(triangles[t].a);
		triangle.circumcircle = new Kinetic.Circle({
			x : circumcenter.x,
			y : circumcenter.y,
			radius : circumradius,
			strokeWidth : 2 / stage.getScaleX(),
			stroke : CIRCUMCIRCLE_COLOR,
			visible : false,
			listening : false
		});
		triangle.on('click', function() {
			this.circumcircle.visible(true);
			this.circumcircle.moveToTop();
			layer.draw();
		});
		layer.add(triangle.circumcircle);
		layer.add(triangle);
	}

	stage.add(layer);
}

$(document).ready(
		function() {
			var container = $('#container');

			var stage = new Kinetic.Stage({
				container : container[0],
				width : container.width(),
				height : container.height()
			});

			$(window).resize(function() {
				stage.setSize(container.width(), container.height());
				stage.draw();
			});

			var points = [];
			for (var i = 1000; i--;) {
				points.push(new SweepLine.Point(Math.random(), Math.random()));
			}

			var triangles = SweepLine.triangulate(points);

			// auto scale / translate
			var bounds = getBoundingBox(points);
			var xscale = (stage.getWidth() - 2 * CANVAS_MARGIN)
					/ (bounds.rightmost - bounds.leftmost);
			var yscale = (stage.getHeight() - 2 * CANVAS_MARGIN)
					/ (bounds.uppermost - bounds.lowermost);
			var scale = Math.min(xscale, yscale);

			stage.setOffsetX(bounds.leftmost - CANVAS_MARGIN / scale);
			stage.setOffsetY(bounds.lowermost - CANVAS_MARGIN / scale);
			stage.scaleX(scale);
			stage.scaleY(scale);

			drawTriangles(stage, triangles);
			drawPoints(stage, points);
			stage.draw();
		});