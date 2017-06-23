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
