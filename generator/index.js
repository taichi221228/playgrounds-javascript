const createFilter = (predicate) => (sequence) => {
	console.log("filter: start");
	function* filterGenerator() {
		for (const item of sequence) {
			console.log("filter:", item);
			if (predicate(item)) yield item;
		}
	}
	return filterGenerator();
};

const createMap = (mapping) => (sequence) => {
	console.log("map: start");
	function* mapGenerator() {
		for (const item of sequence) {
			console.log("map:", item);
			yield mapping(item);
		}
	}
	return mapGenerator();
};

const availabilityFilter = createFilter((item) => item.isAvailable);

const toViewMap = createMap((item) => ({
	name: `商品名: ${item.name}`,
	price: `${item.price.toLocaleString()}円`,
}));

const items = [
	{
		id: 1,
		isAvailable: true,
		name: "Product A",
		price: 1520,
	},
	{
		id: 2,
		isAvailable: true,
		name: "Product B",
		price: 8590,
	},
	{
		id: 3,
		isAvailable: false,
		name: "Product C",
		price: 4270,
	},
];

const formattedItems = [...toViewMap(availabilityFilter(items))];
console.log("result:", formattedItems);
