draw_layout_chart = function() {
	var a = function(field) { return function(d) { return d[field]; }; };
	var curry = function(fna, fnb) { return function(d) { return fna(fnb(d)); }};
    var translate = function(fnx, fny) { return function(d, i) { return "translate(" + fnx(d, i) + "," + fny(d, i) +")"; }};
    var fixed = function(number) { return function(d, i) { return number; }};

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
		.attr("height", 50)
		.attr("class", "record");
		
	var bitWidth = function(size) { return size * 4; };
	var width = function(size) { return bitWidth(size * 8); };
	
	var stack = function(fields) {
		var position = 0;
		for (var i = 0; i < fields.length; i++) {
			fields[i].position = position;
			position += fields[i].size;
		}
		return fields;
	};
	
	var field = vis.selectAll("g.field")
		.data(curry(stack, a("fields")))
		.enter().append("svg:g")
		.attr("class", "field")
		.attr("transform", translate(curry(width, a("position")), fixed(15)));
		
	field.append("svg:rect")
		.attr("class", "field")
		.attr("height", 20)
		.attr("width", curry(width, a("size")))
		.attr("y", 0)
		.attr("x", 0);

	field.append("svg:text")
		.attr("class", "fieldName")
		.attr("y", 0)
		.attr("dy", -5)
		.attr("x", 0)
		.attr("dx", 3)
		.text(a("name"));

	field.append("svg:text")
		.attr("class", "position")
		.attr("y", 20)
		.attr("dy", 10)
		.attr("dx", 0)
		.attr("x", curry(width, a("size")))
		.attr("text-anchor", "middle")
		.text(function(d) { return d.position + d.size; });
		
	var byte = field.selectAll("g.byte")
		.data(function(field) { console.log(field); return d3.range(1, field.size); })
		.enter().append("svg:g").attr("class", "byte")
		.attr("transform", translate(width, fixed(0)));
		
	byte.append("svg:line")
		.attr("y1", 0)
		.attr("y2", 20)
		.attr("stroke", "#CCC");
		
	var field = recordTypeDiv.selectAll("div.subrecord")
		.data(function(recordType) {
			 if (recordType["subrecords"]) {
				return recordType["subrecords"];
			} else {
				return [];
			}
		}).enter().append("div").attr("class", "subrecord");
		
}