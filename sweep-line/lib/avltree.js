/**
 * AvlTree class
 */

// --------------------------------------------

/**
 * 
 * @param root
 * @returns
 */
function AvlTree(root) {
	this.root = root;
}

/**
 * add element after specified element
 * 
 * @param what
 *            adding element
 * @param where
 *            element after that adding element
 */
AvlTree.prototype.add = function(where, what) {
	// add as tree node
	if (where.right !== null) {
		where.after.left = what;
		what.parent = where.after;
	} else {
		where.right = what;
		what.parent = where;
	}

	this.balanceTree(what.parent);

	// add as list node
	if (where.after !== null) {
		where.after.before = what;
	}
	what.after = where.after;
	what.before = where;
	where.after = what;
};

/**
 * return maximum element of the tree
 */
AvlTree.prototype.maxElement = function() {
	var u = this.root;
	while (u.right !== null) {
		u = u.right;
	}
	return u;
};

/**
 * return minimum element of the tree
 */
AvlTree.prototype.minElement = function() {
	var u = this.root;
	while (u.left !== null) {
		u = u.left;
	}
	return u;
};

/**
 * remove the specified element from tree and rebalance
 * 
 * @param what -
 *            specified element
 * 
 */
AvlTree.prototype.remove = function(what) {
	var instead;
	// remove as tree element
	if (what.left !== null && what.right !== null) {
		instead = what.after;

		this.naiveRemove(instead);
		instead.parent = what.parent;
		instead.left = what.left;

		if (instead.left !== null) {
			instead.left.parent = instead;
		}
		instead.right = what.right;
		if (instead.right !== null) {
			instead.right.parent = instead;
		}

		if (instead.parent !== null) {
			if (instead.parent.left === what) {
				instead.parent.left = instead;
			} else {
				instead.parent.right = instead;
			}
		}

		if (what.parent === null) {
			this.root = what;
		}
	} else {
		instead = this.naiveRemove(what);
		if (what.parent === null) {
			this.root = instead;
		}
	}

	// as list element
	if (what.before !== null) {
		what.before.after = what.after;
	}
	if (what.after !== null) {
		what.after.before = what.before;
	}
};

/**
 * 
 */
AvlTree.prototype.find = function(what) {
	var where = this.root;

	while (true) {
		if (what.x < where.a.x) {
			where = where.left;
			continue;
		}
		if (what.x > where.b.x) {
			where = where.right;
			continue;
		}
		return where;
	}
};

/**
 * 
 */
AvlTree.prototype.balanceTree = function(what) {
	var u = what;
	while (u !== null) {
		u = this.balance(u);
		u = u.parent;
	}
};

/**
 * 
 */
AvlTree.prototype.balance = function(what) {
	this.fixHeight(what);

	var bf = this.balanceFactor(what);
	if (bf > 1) {
		if (what.right !== null && this.balanceFactor(what.right) < 0) {
			this.rotateRight(what.right);
		}
		what = this.rotateLeft(what);
		if (bf > 2) {
			return this.balance(what);
		} else {
			return what;
		}
	}

	if (bf < -1) {
		if (what.left !== null && this.balanceFactor(what.left) > 0) {
			this.rotateLeft(what.left);
		}
		what = this.rotateRight(what);
		if (bf < -2) {
			return this.balance(what);
		} else {
			return what;
		}
	}
	return what;
};

/**
 * 
 */
AvlTree.prototype.balanceFactor = function(what) {
	var rh = (what.right === null) ? 0 : what.right.height;
	var lh = (what.left === null) ? 0 : what.left.height;
	return rh - lh;
};

/**
 * remove specified element as if this tree is simple binary tree
 * 
 * @param what
 *            removing element
 */
AvlTree.prototype.naiveRemove = function(what) {
	var instead;
	if (what.left !== null) {
		instead = what.left;
	} else {
		instead = what.right;
	}

	if (instead !== null) {
		instead.parent = what.parent;
	}

	if (what.parent !== null) {
		if (what.parent.left === what) {
			what.parent.left = instead;
		} else {
			what.parent.right = instead;
		}
	}
};

/**
 * left rotate
 */
AvlTree.prototype.rotateLeft = function(u) {
	var v = u.right;
	u.right = v.left;
	if (u.right !== null) {
		u.right.parent = u;
	}
	v.left = u;
	v.parent = u.parent;
	if (u.parent !== null) {
		if (u.parent.right === u) {
			u.parent.right = v;
		} else {
			u.parent.left = v;
		}
	}
	u.parent = v;
	if (v.parent === null) {
		this.root = v;
	}
	this.fixHeight(u);
	this.fixHeight(v);
	return v;
};

/**
 * right rotate respectively specified node
 * 
 * @param u -
 *            specified node
 */
AvlTree.prototype.rotateRight = function(u) {
	var v = u.left;
	u.left = v.right;
	if (u.left !== null) {
		u.left.parent = u;
	}
	v.right = u;
	v.parent = u.parent;
	if (u.parent !== null) {
		if (u.parent.right === u) {
			u.parent.right = v;
		} else {
			u.parent.left = v;
		}
	}
	u.parent = v;
	if (v.parent === null) {
		this.root = v;
	}
	this.fixHeight(u);
	this.fixHeight(v);
	return v;
};

/**
 * recalculate height of the specified element
 * 
 * @param what
 *            {AvlNode} specified tree element
 */
AvlTree.prototype.fixHeight = function(what) {
	var hl = (what.left === null) ? 0 : (what.left).height;
	var hr = (what.right === null) ? 0 : (what.right).height;
	what.height = ((hl > hr) ? hl : hr) + 1;
};

/*
 * export AvlTree class
 */
module.exports = AvlTree;