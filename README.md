## sweep-line.js

Implementation of the B. Zalik's sweep-line algorithm.

Based on two papers:
"An efficient sweep-line Delaunay triangulation" by B. Zalik,
"Sweep-line algorithm for constrained Delaunay triangulation" by V. Domiter and and B. Zalik


### Usage:

You can use any point class implementation that contains "x" and "y" fields, for example:

	var triangles = SweepLine.triangulate([
		{x: 100, y: 100},
		{x: 100, y: 300},
		{x: 300, y: 200},
		{x: 200, y: 200}
	]);
	
or take my simple implementation:  
	
	var triangles = SweepLine.triangulate([
		new SweepLine.Point(100, 100), 
		new SweepLine.Point(100, 300),
		new SweepLine.Point(300, 200),
		new SweepLine.Point(200, 200)
	]);

### Output	

I decide stay output triangles type 'SweepLine.Triangle'. 
The 'SweepLine.Triangle' class contains three vertices ('a', 'b', 'c') and 
three links to adjacent (neighbor) triangles 'adjA, 'adjB', 'adjC' that opposite 'a','b','c' vertices respectively.

I think my output more useful than indexes of triangle vertices in the input set of points.
So if you want know which point of the input set in some triangle - add 'id' field in input point.

### Note: 

This implementation is not fastest, though it work.
If you want constrained Delaunay triangulation I advice used poly2tri library

### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
