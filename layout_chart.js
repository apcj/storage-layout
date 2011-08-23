draw_layout_chart = function() {
	var a = function(field) { return function(d) { return d[field]; }; };
	var curry = function(fna, fnb) { return function(d) { return fna(fnb(d)); }};

	var chart = d3.select("body")
		.append("div")
		.attr("class", "digran");

	var recordTypeDiv = chart.selectAll("div.recordType")
		.data(layout)
		.enter().append("div").attr("class", "recordType");
		
	recordTypeDiv.append("h3")
		.text(function(d) { return d.recordName + " (" + d3.sum(d.fields, a("size")) + " bytes)"; });

	recordTypeDiv.append("div").attr("class", "record").selectAll("span.field")
		.data(a("fields"))
		.enter().append("span").attr("class", "field")
			.attr("style", function(d) { return "width: " + d.size * 50 + "px"; })
			.text(a("name"));
}