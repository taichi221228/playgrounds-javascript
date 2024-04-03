function createFilter(predicate) {
	return (sequence) => {
		console.log("start filter");
		function* filterGenerator(sequence) {
			for (const item of sequence) {
				console.log("---> filter", item);
				if (predicate(item)) {
					yield item;
				}
			}
		}
		return filterGenerator();
	};
}

function createMap(mapping) {
	return (sequence) => {
		console.log("start map");
		function* mapGenerator(sequence) {
			for (const item of sequence) {
				console.log("---> map", item);
				yield mapping(item);
			}
		}
		return mapGenerator();
	};
}

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

const formattedItems = Array.from(toViewMap(availabilityFilter(items)));
console.log(formattedItems);
