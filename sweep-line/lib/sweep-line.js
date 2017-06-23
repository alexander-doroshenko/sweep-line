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