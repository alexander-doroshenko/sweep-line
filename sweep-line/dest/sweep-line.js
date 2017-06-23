(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * construct AdvancingFront as doubly linked list 
 * 
 * @param root
 *            {Edge} - specified root element
 */
function AdvancingFront(root) {
	this.root = root || null;
}

/**
 * return last element of the advancing front
 * 
 * @return {Edge} last element
 */
AdvancingFront.prototype.lastElement = function() {
	var u = this.root;
	while (u.after) {
		u = u.after;
	}
	return u;
};

/**
 * remove the specified element from the advancing front
 * 
 * @param what
 *            {Edge} specified element
 */
AdvancingFront.prototype.remove = function(what) {
	if (what.before !== null) {
		what.before.after = what.after;
	}
	if (what.after !== null) {
		what.after.before = what.before;
	}
	if (this.root === what) {
		this.root = what.after;
	}
};

/**
 * insert element after specified position
 * 
 * @param where
 *            {Edge} specified position
 * @param what
 *            {Edge} adding edge
 */
AdvancingFront.prototype.add = function(where, what) {
	if (where.after !== null) {
		where.after.before = what;
	}
	what.after = where.after;
	where.after = what;
	what.before = where;
};

/**
 * find edge under specified point
 * 
 * @param what
 *            {Point} specified point
 * @return {Edge} - edge under point or null
 */
AdvancingFront.prototype.find = function(what) {
	var edge = this.root;
	while (edge !== null) {
		if (edge.b.x >= what.x) {
			return edge;
		}
		edge = edge.after;
	}
	return null;
};

/*
 * export AdvancingFront class
 */
module.exports = AdvancingFront;
},{}],2:[function(require,module,exports){
/**
 * Simple implementation of the edge of the advancing front.
 */

// -----------------------------------------------------
/**
 * construct a triangle edge, used in adjacent front
 * 
 * @param {Point}
 *            a - begin point
 * @param {Point}
 *            b - end point
 * @param {Triangle}
 *            adjA - triangle adjacent edge
 */
var Edge = function(a, b, adjA) {
	this.a = a;
	this.b = b;

	// links to previous and next edges
	this.before = null;
	this.after = null;

	this.adjA = adjA || null;
};

/**
 * This function simulate function that uses for triangles. It must change links
 * such that 'adjA' link was the specified triangle. But edge has only 'adjA'
 * link and really not need change something.
 * 
 * @param t
 *            {Triangle} or {Edge} - triangle adjacent this edge
 */
Edge.prototype.rotateToNeighbor = function(t) {
};

/**
 * find location of c point regard of the line segment contains edge So equation
 * line passing throw two points: w dot x+offset = 0, where w = ((b.y-a.y), (b.x
 * -a.x)) - line normal, and b = - w dot a
 * 
 * @param {Point}
 *            c - classify point
 * @return {number} - 1,0 or -1 if c left, on or right of ab respectively (if OY
 *         axis direct in top)
 */
Edge.prototype.classify = function(c) {
	var wx = this.b.y - this.a.y;
	var wy = this.a.x - this.b.x;
	var offset = wx * this.a.x + wy * this.a.y;
	var u = c.x * wx + c.y * wy - offset;
	return (u > 0) ? 1 : ((u < 0) ? -1 : 0);
};

/**
 * return true if angle ABC more then half Pi
 */
Edge.prototype.angleMoreHalfPi = function(c) {
	var ux = this.a.x - this.b.x;
	var uy = this.a.y - this.b.y;
	var vx = c.x - this.b.x;
	var vy = c.y - this.b.y;
	return ux * vx + uy * vy > 0;
};

/**
 * clear output
 * 
 * @return {string}
 */
Edge.prototype.toString = function() {
	return "Edge: (" + this.a + "," + this.b + ")";
};

/*
 * export class 'Edge'
 */
module.exports = Edge;
},{}],3:[function(require,module,exports){
/**
 * Simple point implementation.
 */

/**
 * Construct point object
 * 
 * @param x
 *            {number} horizontal coordinate
 * @param y
 *            {number} vertical coordinate
 */
function Point(x, y) {
	this.x = x;
	this.y = y;
}

/**
 * add specified point from this point
 * 
 * @param what
 *            {Point} specified point
 * @return {Point} result of subtraction
 */
Point.prototype.add = function(what) {
	return new Point(this.x + what.x, this.y + what.y);
};


/**
 * subtract specified point from this point
 * 
 * @param what
 *            {Point} specified point
 * @return {Point} result of subtraction
 */
Point.prototype.sub = function(what) {
	return new Point(this.x - what.x, this.y - what.y);
};

/**
 * return distance between this point and specified
 * 
 * @param what
 *            {Point} specified point
 * @return {number} distance between this point and specified point
 */
Point.prototype.dist = function(what) {
	return Math.sqrt((this.x - what.x) * (this.x - what.x) + (this.y - what.y)
			* (this.y - what.y));
};

/**
 * pretty output
 */
Point.prototype.toString = function() {
	return "[" + this.x + "," + this.y + "]";
};

/*
 * export class 'Point'
 */
module.exports = Point;

},{}],4:[function(require,module,exports){
(function (global){
/**
 * public API
 */

"use strict";

/**
<<<<<<< HEAD
 * create global variable
 */
function SweepLine() {
}

/**
 * exports Point for make input
 */
SweepLine.Point = require('./point');

/**
 * exports Triangle for output
 */
SweepLine.Triangle = require('./triangle');

/**
 * exports triangulate function
 */
SweepLine.triangulate = require('./triangulation');

/**
 * Exports global variable
 */
global.SweepLine = SweepLine;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./point":3,"./triangle":5,"./triangulation":6}],5:[function(require,module,exports){
/**
 * Simple triangle implementation.
 */


var Point = require('./point');

//----------------------------------------------------
/**
 * construct a triangle. Triangle structure contains three vertices and three
 * adjacent triangles at that adjA, adjB, adjC triangles be opposite a,b,c
 * vertices respectively
 * 
 * @param {Point}
 *            a - vertex
 * @param {Point}
 *            b - vertex
 * @param {Point}
 *            c - vertex
 * @param {Triangle}
 *            adjA - opposite "a" vertex adjacent triangle
 * @param {Triangle}
 *            adjB - opposite "b" vertex adjacent triangle
 * @param {Triangle}
 *            adjC - opposite "c" vertex adjacent triangle
 */
function Triangle(a, b, c, adjA, adjB, adjC) {
	this.a = a;
	this.b = b;
	this.c = c;

	this.adjA = adjA || null;
	this.adjB = adjB || null;
	this.adjC = adjC || null;
}

/**
 * rotate triangle such first vertex be opposite specified neighbor
 * 
 * @param neighbor
 *            {Triangle} or {Edge} neighbor of this triangle
 */
Triangle.prototype.rotateToNeighbor = function(neighbor) {
	if (this.adjA !== neighbor) {
		if (this.adjB === neighbor) {
			this.rotateCCW();
		} else {
			this.rotateCW();
		}
	}
};

/**
 * rotate triangle vertices names in counter clockwise direction So "a" vertex
 * will be old "c" vertex, "b" - "a", "c" - "b"
 */
Triangle.prototype.rotateCW = function() {
	var buf = this.c;
	this.c = this.b;
	this.b = this.a;
	this.a = buf;
	buf = this.adjC;
	this.adjC = this.adjB;
	this.adjB = this.adjA;
	this.adjA = buf;
};

/**
 * rotate triangle vertices names in counter clockwise direction So "a" vertex
 * will be old "b" vertex, "b" - "c", "c" - a
 */
Triangle.prototype.rotateCCW = function() {
	var buf = this.a;
	this.a = this.b;
	this.b = this.c;
	this.c = buf;
	buf = this.adjA;
	this.adjA = this.adjB;
	this.adjB = this.adjC;
	this.adjC = buf;
};

/**
 * Computes | a.x a.y a.x²+a.y² 1 | 
 * 			| b.x b.y b.x²+b.y² 1 |		| a.x-d.x a.y-d.y (a.x²-d.x²)+(a.y²-d.y²) | 
 * 			| c.x c.y c.x²+c.y² 1 | = 	| b.x-d.x b.y-d.y (b.x²-d.x²)+(b.y²-d.y²) | > 0 
 * 			| d.x d.y d.x²+d.y² 1 | 	| c.x-d.x c.y-d.y (c.x²-d.x²)+(c.y²-d.y²) |
 * 
 * @param {Point} d - testing point @return {boolean} true if d is in the
 * triangle circumcircle, boolean in another case
 */
Triangle.prototype.circumCircleTest = function(d) {

	var adx = this.a.x - d.x;
	var ady = this.a.y - d.y;
	var bdx = this.b.x - d.x;
	var bdy = this.b.y - d.y;
	var cdx = this.c.x - d.x;
	var cdy = this.c.y - d.y;

	var ad = adx * (this.a.x + d.x) + ady * (this.a.y + d.y);
	var bd = bdx * (this.b.x + d.x) + bdy * (this.b.y + d.y);
	var cd = cdx * (this.c.x + d.x) + cdy * (this.c.y + d.y);

	var det = adx * (bdy * cd - bd * cdy) - bdx * (ady * cd - ad * cdy) + cdx
			* (ady * bd - ad * bdy);
	return det < 0;
};

/**
 * return circumcircle center coordinates
 * (https://en.wikipedia.org/wiki/Circumscribed_circle)
 * used for visual check delaunay condition
 * 
 * @return {Point} circumcircle center
 */
Triangle.prototype.getCircumCenter = function() {
	// translate
	var trBx = this.b.x - this.a.x,
		trBy = this.b.y - this.a.y,
		trCx = this.c.x - this.a.x,
		trCy = this.c.y - this.a.y,
		d = 2 * (trBx * trCy - trBy * trCx),
		modB = (trBx * trBx + trBy * trBy),
		modC = (trCx * trCx + trCy * trCy),
		ux = (trCy * modB - trBy * modC) / d,
		uy = (trBx * modC - trCx * modB) / d;
	return new Point(ux + this.a.x, uy + this.a.y);
};

/**
 * return set of all vertices
 * 
 * @return {Array<Point>} vertices
 */
Triangle.prototype.getVertices = function() {
	return [ this.a, this.b, this.c ];
};

/**
 * clear output
 */
Triangle.prototype.toString = function() {
	return "Triangle: (" + this.a + "," + this.b + "," + this.c + ")";
};

/*
 * export class 'Triangle'
 */
module.exports = Triangle;

},{"./point":3}],6:[function(require,module,exports){
/**
 * implementation of Zalik's algorithm
 */

var Point = require('./point');
var Triangle = require('./triangle');
var Edge = require('./edge');
var AdvancingFront = require('./advancingfront');

// --------------------------------------------------------------------

/**
<<<<<<< HEAD
 * accuracy of computations
 */
var EPSILON = 0.000000001;

/**
 * build triangulation of given points set Zalik's sweep-line algorithm
 * 
 * @param points -
 *            {Array<{x, y}>} input points
 * @return {Array<Triangle>} - output triangles
 */
function triangulate(points) {
	
	// sort all points regarding Y coordinate
	points.sort(function(a, b) {
		return (Math.abs(a.y - b.y) > EPSILON) ? (a.y - b.y) : (a.x - b.x);
	});

	// remove doubles
	for (var i = 1; i < points.length; i++) {
		if (Math.abs(points[i].x - points[i - 1].x) < EPSILON
				&& Math.abs(points[i].y - points[i - 1].y) < EPSILON) {
			points.splice(i, 1);
		}
	}

	// create super triangle
	var st = computeSuperTriangle(points);

	// create two edges from edges of the super triangle
	var u = new Edge(st.a, st.b, st);
	var v = new Edge(st.b, st.c, st);
	st.adjA = v;
	st.adjC = u;

	// initialize advancing front with new edges
	var af = new AdvancingFront(u);
	af.add(af.root, v);

	// sweep all points
	var triangles = sweep(points, af, [ st ]);

	// delete triangles contains artificial points and
	// add missing triangles to convex hull
	return finalize(af, triangles);
}

/**
 * find extreme points and calculate super triangle such as all points from
 * given points set located above it
 * 
 * @note we suppose that points sorted regard Y coordinate
 * @param points
 *            {Array<Point>} given points set
 * @return {Triangle} super triangle
 */
function computeSuperTriangle(points) {
	// find extreme values
	var topmost = points[points.length - 1].y;
	var lowermost = points[0].y;
	var leftmost = points[0].x;
	var rightmost = points[0].x;
	for (var i = points.length; i--;) {
		if (points[i].x < leftmost)
			leftmost = points[i].x;
		if (points[i].x > rightmost)
			rightmost = points[i].x;
	}

	// calculate artificial points position
	var sl1 = new Point(leftmost - .3 * (rightmost - leftmost), lowermost - .3
			* (topmost - lowermost));
	var sl2 = new Point(rightmost + .3 * (rightmost - leftmost), lowermost - .3
			* (topmost - lowermost));

	return new Triangle(sl1, points[0], sl2);
}

/**
 * sweep points algorithm implementation
 * 
 * @note we supposed that first point already in triangulation (uses for build
 *       super triangle)
 * @param af
 *            {Array<Edge>} advancing front
 * @param points
 *            {Array<Point>} given points
 */
function sweep(points, af, triangles) {
	for (var i = 1; i < points.length; i++) {
		var underEdge = af.find(points[i]);
		if (points[i].x - underEdge.a.x < EPSILON) {
			addPointUnderPoint(points[i], underEdge.before, af, triangles);
		} else if (underEdge.b.x - points[i].x < EPSILON) {
			addPointUnderPoint(points[i], underEdge, af, triangles);
		} else {
			addPointUnderEdge(points[i], underEdge, af, triangles);
		}
	}
	return triangles;
}

/**
 * add two triangles and two edges
 * 
 * @param point
 *            {Point} adding point
 * @param underEdge
 *            {Edge} edge under adding point
 * @param advancingFront
 *            {AdvancingFront} advancing front (doubly linked list)
 * @param triangles
 *            {Array<Triangle>} current triangulation
 * 
 * @note this function may be useless and we can use only addPointUnderEdge
 *       function
 */
function addPointUnderPoint(point, underEdge, advancingFront, triangles) {

	var t1 = new Triangle(point, underEdge.b, underEdge.a, underEdge.adjA);
	(underEdge.adjA).rotateToNeighbor(underEdge);
	(underEdge.adjA).adjA = t1;
	var u = new Edge(underEdge.a, point, t1);
	t1.adjB = u;

	var t2 = new Triangle(point, (underEdge.after).b, (underEdge.after).a,
			(underEdge.after).adjA);
	(underEdge.after.adjA).rotateToNeighbor(underEdge.after);
	(underEdge.after.adjA).adjA = t2;
	var v = new Edge(point, (underEdge.after).b, t2);
	t2.adjC = v;

	t1.adjC = t2;
	t2.adjB = t1;

	advancingFront.add(underEdge.after, v);
	advancingFront.add(underEdge.after, u);
	advancingFront.remove(underEdge.after);
	advancingFront.remove(underEdge);

	var suspicious = [ [ t1, t2 ], [ t1, t1.adjA ], [ t2, t2.adjA ] ];
	if (!legalize(suspicious[0][0], suspicious[0][1])) {
		if (!legalize(suspicious[1][0], suspicious[1][1])) {
			legalize(suspicious[2][0], suspicious[2][1]);
		}
	}

	triangles.push(t1, t2);

	// check left and right angles
	while (u.before !== null && (u.before).angleMoreHalfPi(u.b)) {
		u = joinEdges(u.before, u, advancingFront, triangles);
	}
	while (v.after !== null && v.angleMoreHalfPi((v.after).b)) {
		v = joinEdges(v, v.after, advancingFront, triangles);
	}
}

/**
 * Add specified point that located to current triangulation
 * 
 * @param point
 *            {Point} specified point
 * @param advancingFront
 *            {AdvancingFront} advancing front
 * @param triangles
 *            {Array<Triangle>} triangles of current triangulation
 */
function addPointUnderEdge(point, underEdge, advancingFront, triangles) {
	var t = new Triangle(point, underEdge.b, underEdge.a, underEdge.adjA);
	// left edge
	var u = new Edge(underEdge.a, point, t);
	// right edge
	var v = new Edge(point, underEdge.b, t);

	(underEdge.adjA).rotateToNeighbor(underEdge);
	(underEdge.adjA).adjA = t;

	// insert new right and left edges
	advancingFront.add(underEdge, v);
	advancingFront.add(underEdge, u);
	advancingFront.remove(underEdge);
	t.adjB = u;
	t.adjC = v;
	triangles.push(t);
	legalize(t, t.adjA);

	// check left and right angles
	while (u.before !== null && (u.before).angleMoreHalfPi(u.b)) {
		u = joinEdges(u.before, u, advancingFront, triangles);
	}
	while (v.after !== null && v.angleMoreHalfPi((v.after).b)) {
		v = joinEdges(v, v.after, advancingFront, triangles);
	}
}

/**
 * finalize triangulation: passing advancing front and add triangles for convex
 * hull
 * 
 * @param advancingFront
 *            {Array<Edge>} - advancing front
 * @param triangles
 *            {Array<Triangle>} - array of triangles
 */
function finalize(advancingFront, triangles) {

	var u = advancingFront.root;
	// remove triangles with first artificial point
	while (true) {
		if ((u.adjA).adjA === null || (u.adjA).adjB === null
				|| (u.adjA).adjC === null) {
			advancingFront.remove(u);
			break;
		}
		u = removeEdgeWithTriangle(u, advancingFront)[0];
	}

	// remove triangles with second artificial point
	u = advancingFront.lastElement();
	while (true) {
		if ((u.adjA).adjA === null || (u.adjA).adjB === null
				|| (u.adjA).adjC === null) {
			u.adjA.isDeleted = true;
			advancingFront.remove(u);
			break;
		}
		u = removeEdgeWithTriangle(u, advancingFront)[1];
	}

	// add missing triangles from the convex hull
	fillToConvex(advancingFront, triangles);

	// remove deleted triangles
	var goodTriangles = [];
	for ( var i in triangles) {
		if (!triangles[i].isDeleted) {
			goodTriangles.push(triangles[i]);
		}
	}
	
	// remove links on advancingFront edges
	for (u = advancingFront.root; u !== null; u = u.after) {
		(u.adjA).rotateToNeighbor(u);
		(u.adjA).adjA = null;
	}
	
	return goodTriangles;
}

/**
 * remove edge of the advancing front with the adjacent triangle and create two
 * new edges if it not a super triangle
 * 
 * TODO do it more understandable
 * 
 * @param remEdge
 *            {Edge} specified removing edge
 * @param advancingFront
 *            {AdvancingFront} the advancing front
 * @return {Array<Edge>} array of new edges
 */
function removeEdgeWithTriangle(remEdge, advancingFront) {

	var remTriangle = remEdge.adjA;
	remTriangle.rotateToNeighbor(remEdge);
	remTriangle.isDeleted = true;

	var v = new Edge(remTriangle.a, remTriangle.c, remTriangle.adjB);
	(remTriangle.adjB).rotateToNeighbor(remTriangle);
	(remTriangle.adjB).adjA = v;
	advancingFront.add(remEdge, v);

	var u = new Edge(remTriangle.b, remTriangle.a, remTriangle.adjC);
	(remTriangle.adjC).rotateToNeighbor(remTriangle);
	(remTriangle.adjC).adjA = u;

	advancingFront.add(remEdge, u);
	advancingFront.remove(remEdge);
	return [ u, v ];
}

/**
 * add missing triangles to the convex hull: if angle between neighbors edges
 * less Pi than added new triangle and checked previous neighbor pair, otherwise -
 * next pair
 * 
 * @param {AdvancingFront}
 *            advancing front
 * @param {Triangle>
 *            triangles of current triangulation
 */
function fillToConvex(advancingFront, triangles) {
	var u = advancingFront.root, v;
	while (u.after !== null) {
		v = u.after;
		if (u.classify(v.b) === -1) {
			u = joinEdges(u, v, advancingFront, triangles);
			if (u.before !== null) {
				u = u.before;
			}
		} else {
			u = u.after;
		}
	}

	// check last and first edge in advancingFront (v contains last edge)
	// and if angle between them non convex fill gap and check neighbor edge
	while (true) {
		if (v.classify(advancingFront.root.b) === -1) {
			v = joinEdges(v, advancingFront.root, advancingFront, triangles);
			continue;
		}
		if ((v.before).classify(v.b) === -1) {
			v = joinEdges(v.before, v, advancingFront, triangles);
			continue;
		}
		break;
	}
}

/**
 * join two given neighbor edges: adding new triangle and replace edges to the
 * one new edge
 * 
 * @param u
 *            {Edge} first specified edge for join
 * @param v
 *            {Edge} second specified edge for join, must be right u neighbor
 * @param advancingFront
 *            {AdvancingFront} advancing front
 * @param triangles
 *            {Array<Triangle>} triangles of current triangulation
 */
function joinEdges(u, v, advancingFront, triangles) {
	var edge = new Edge(u.a, v.b);
	var t = new Triangle(v.b, v.a, u.a, u.adjA, edge, v.adjA);

	(u.adjA).rotateToNeighbor(u);
	(u.adjA).adjA = t;

	(v.adjA).rotateToNeighbor(v);
	(v.adjA).adjA = t;

	edge.adjA = t;

	// store new triangle
	triangles.push(t);

	// update advancing front
	advancingFront.add(u, edge);
	advancingFront.remove(u);
	advancingFront.remove(v);

	if (!legalize(t, u.adjA)) {
		legalize(t, v.adjA);
	}
	return edge;
}

/**
 * Lawson's legalization of two triangles. For more comfort and minimize code
 * triangles rotate such t1.a vertex and t2.a vertex be opposite. It's not
 * optimal decision.
 * 
 * @param t1
 *            {Triangle} first triangle
 * @param t2
 *            {Triangle} second triangle
 * @return {boolean} true if legalize perform, false otherwise
 */
function legalize(t1, t2) {
	if (t1 === null || t2 === null) {
		return false;
	}
	// return false if t1 or t2 is edge
	if (!("adjB" in t1) || !("adjB" in t2)) {
		return false;
	}

	// oriented t1 such as t1.adjB === t1
	t1.rotateToNeighbor(t2);
	// oriented t2 such as t2.adjA === t1
	t2.rotateToNeighbor(t1);

	// empty circumcircle test
	if (t1.circumCircleTest(t2.a)) {
		// change vertices
		t1.c = t2.a;
		t2.c = t1.a;

		// TODO t1.adjB can equal null only if t1 is super triangle
		if (t1.adjB !== null) {
			(t1.adjB).rotateToNeighbor(t1);
			(t1.adjB).adjA = t2;
		}

		t2.adjA = t1.adjB;
		t1.adjB = t2;

		// TODO see note above
		if (t2.adjB !== null) {
			(t2.adjB).rotateToNeighbor(t2);
			(t2.adjB).adjA = t1;
		}

		t1.adjA = t2.adjB;
		t2.adjB = t1;

		var suspicious = [ [ t1, t1.adjA ], [ t1, t1.adjC ], [ t2, t2.adjA ],
				[ t2, t2.adjC ] ];
		if (!legalize(suspicious[0][0], suspicious[0][1])) {
			legalize(suspicious[1][0], suspicious[1][1]);
		}
		if (!legalize(suspicious[2][0], suspicious[2][1])) {
			legalize(suspicious[3][0], suspicious[3][1]);
		}
		return true;
	}
	return false;
}

/*
 * export triangulate function
 */
module.exports = triangulate;
},{"./advancingfront":1,"./edge":2,"./point":3,"./triangle":5}]},{},[4]);
