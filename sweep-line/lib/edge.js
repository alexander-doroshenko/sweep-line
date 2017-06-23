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