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