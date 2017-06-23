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