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
