/**
 * double-linked list 
 */

function DoubleLinkedList(root) {
	this.root = root;
}

/**
 * insert element after specified position
 * 
 * @param where
 *            {Edge} specified position
 * @param what
 *            {Edge} adding edge
 */
DoubleLinkedList.prototype.add = function(where, what) {
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
DoubleLinkedList.prototype.find = function(what) {
	var edge = this.root;
	while (edge !== null) {
		if (edge.b.x >= what.x) {
			return edge;
		}
		edge = edge.after;
	}
	return null;
};

/**
 * return last element of the list
 * 
 * @return {Edge} last element
 */
DoubleLinkedList.prototype.maxElement = function() {
	var u = this.root;
	while (u.after) {
		u = u.after;
	}
	return u;
};

/**
 * return minimum element (first) of this list
 */
DoubleLinkedList.prototype.minElement = function() {
	return this.root;
};

/**
 * remove the specified element from the advancing front
 * 
 * @param what
 *            {Edge} specified element
 */
DoubleLinkedList.prototype.remove = function(what) {
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

/*
 * export DoubleLinkedList class 
 */
module.exports = DoubleLinkedList;
