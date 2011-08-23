layout = [
{ recordName: "Node", fields: [
	{ name: "inUse", size: 1 },
	{ name: "nextRelId", size: 4, pointsTo: "Relationship" },
	{ name: "nextPropId", size: 4, pointsTo: "Property" }
]},
{ recordName: "Relationship", fields: [
	{ name: "inUse", size: 1 },
	{ name: "direction", size: 1 },
	{ name: "firstNode", size: 4, pointsTo: "Node" },
	{ name: "secondNode", size: 4, pointsTo: "Node" },
	{ name: "relationshipType", size: 4, pointsTo: "Relationship Type" },
	{ name: "firstPrevRelId", size: 4, pointsTo: "Relationship" },
	{ name: "firstNextRelId", size: 4, pointsTo: "Relationship" },
	{ name: "secondPrevRelId", size: 4, pointsTo: "Relationship" },
	{ name: "secondNextRelId", size: 4, pointsTo: "Relationship" },
	{ name: "nextPropId", size: 4, pointsTo: "Property" }
]},
{ recordName: "Relationship Type", fields: [
	{ name: "inUse", size: 1 },
	{ name: "typeBlockId", size: 4, pointsTo: "String" },
]},
{ recordName: "Property", fields: [
	{ name: "inUse", size: 1 },
	{ name: "type", size: 4 },
	{ name: "keyIndexId", size: 4, pointsTo: "Property Index" },
	{ name: "propBlock", size: 8 }, //extend to 32 bytes for short arrays and multi-property inlining
	{ name: "prevPropId", size: 4, pointsTo: "Property" },
	{ name: "nextPropId", size: 4, pointsTo: "Property" }
]},
{ recordName: "Property Index", fields: [
	{ name: "inUse", size: 1 },
	{ name: "propCount", size: 4 },
	{ name: "keyBlockId", size: 4, pointsTo: "some dynamic store" }
]},
{ recordName: "Dynamic Store", fields: [
	{ name: "inUse", size: 1 },
	{ name: "previous", size: 4, pointsTo: "Dynamic Store" },
	{ name: "length", size: 4 },
	{ name: "next", size: 4, pointsTo: "Dynamic Store" },
	{ name: "data", size: 64 }
]},
{ recordName: "NeoStore", fields: [
	{ name: "inUse", size: 1 },
	{ name: "datum", size: 4 }
]},

];