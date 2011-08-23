draw_layout_chart = function() {
	var a = function(field) { return function(d) { return d[field]; }; };
	var curry = function(fna, fnb) { return function(d) { return fna(fnb(d)); }};

	var chart = d3.select("body")
		.append("div")
		.attr("class", "diagram");

	var recordTypeDiv = chart.selectAll("div.recordType")
		.data(layout)
		.enter().append("div").attr("class", "recordType");
		
	recordTypeDiv.append("h3")
		.text(function(d) { return d.recordName + " (" + d3.sum(d.fields, a("size")) + " bytes)"; });

	var vis = recordTypeDiv.append("svg:svg")
		.attr("width", 1200)
		.attr("height", 40)
		.attr("class", "record");
		
	var width = function(size) { return size * 32; };
	
	var stack = function(fields) {
		var position = 0;
		for (var i = 0; i < fields.length; i++) {
			fields[i].position = position;
			position += fields[i].size;
		}
		return fields;
	};
	
	vis.selectAll("rect")
		.data(curry(stack, a("fields")))
		.enter().append("svg:rect").attr("class", "field")
			.attr("height", 20)
			.attr("width", curry(width, a("size")))
			.attr("y", 1)
			.attr("x",curry(width, a("position")))
			// .text(a("name"));
}