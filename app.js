// app.js

// Pokemon Problem (from Theo of Ping.gg) -- FINAL time I will use NON-BUILD way of doing React client-side things! SIGH!

// REMINDER:
// const isDev = /[?&]dev\b/i.test(location.search);
// const usePreact = /[?&]preact\b/i.test(location.search);
// const useLiveReload = /[?&]live\b/i.test(location.search);
// const useCDNnotLCL = /[?&]cdn\b/i.test(location.search);

console.timeEnd("READY");	// typically 115ms - 180ms

// console.log("app.js TOP");

let _id = 0;

const {createElement: h, render, Fragment} = ( typeof preact === "object" ? preact : React );
const {useState, useEffect} = ( typeof preactHooks === "object" ? preactHooks : React );



// import React from "react";
const PokemonRow = (props) => {
// debugger;
// console.warn(props);
	const {pokemon} = props;
	const {id, name, types, sprite} = pokemon;

	return h("tr", { key: _id ++ }, [
		h("td", { key: _id ++ }, h(
			"img",
			{
				src: sprite,
				alt: name,
				width: "50%"
			}
		) ),
		h("td", { key: _id ++ }, h(
			"b",
			{},
			`${name}`
		) ),
		h("td", { key: _id ++ }, h(
			"code",
			{},
			"#" + String(id).padStart(3, "0")
		) ),
		h("td", { key: _id ++ }, [
			`Type: `,
			h(
				"i",
				{ key: _id ++ },
			 	types.join(", ")
			)
		] ),
	]);
};



// import React from "react";
// import PokemonRow from "./PokemonRow";
const PokedexTable = (props) => {
// debugger;
// console.warn(props);
	const {
		pokedex,
		selectedType,
	} = props;

	const headTag = false ? "th" : "td";

	const head = h(
		"tr",
		{ key: _id ++ },
		[
			h(
				headTag,
				{
					key: _id ++,
					// width: "5%",
				},
				"📷"
			),
			h(
				headTag,
				{
					key: _id ++,
					width: "20%",
				},
				"☎"
			),
			h(
				headTag,
				{
					key: _id ++,
					width: "5%",
				},
				"🆔"
			),
			h(
				headTag,
				{
					key: _id ++,
					width: "60%",
				},
				"⌨"
			),
		]
	);

// debugger;
	// const matching = selectedType.trim().length
	// ? pokedex.filter(
	// 	pokemon => pokemon.types.includes(selectedType)
	// )
	// : [...pokedex];

	const body = pokedex.map( pokemon => {
// debugger;
// console.warn(props);
		const row = PokemonRow( { key: _id ++, pokemon } );

		return row;

	});

	const chable = h(
		"table",
		{},
		[
			h(
				"thead",
				{ key: _id ++ },
				head,
			),
			h(
				"tbody",
				{ key: _id ++ },
				body,
			),
		]
	);

	return chable;

};
// export default PokedexTable;



// import React from "react";
// import PokedexTable from "./PokedexTable";
const pokemonArray = [
	{
		id: 1,
		name: "Bulbasaur",
		types: ["grass"],
		// sprite: "https://pokemon.com/pictures/bulbasaur.png"
		// https://www.pokemon.com/us/pokedex/bulbasaur => https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png
		sprite: "../img/001.png"
	},
	{
		id: 2,
		name: "Ivysaur",
		types: ["poison"],
		// sprite: "https://pokemon.com/pictures/ivysaur.png"
		// https://www.pokemon.com/us/pokedex/ivysaur => https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png
		sprite: "../img/002.png"
	},
	{
		id: 3,
		name: "Venusaur",
		types: ["grass", "poison"],
		// sprite: "https://pokemon.com/pictures/venusaur.png"
		// https://www.pokemon.com/us/pokedex/venusaur => https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png
		sprite: "../img/003.png"
	},
	{
		id: 4,
		name: "Charmander ",
		types: ["fire"],
		// sprite: "https://pokemon.com/pictures/charmander.png"
		// https://www.pokemon.com/us/pokedex/charmander => https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png
		sprite: "../img/004.png"
	},
];
// create a `<PokedexTable />` component that takes in the array and renders all the pokemon in that array.

// Provided a <PokemonTypeSelection /> component with the following props
// type PokemonTypeSelectionProps = {
// 	selectedType: string | undefined;
// 	selectType: (type: string | undefined) => void;
// }
// ...create a <FilterablePokedexTable /> component that renders both the <PokemonTypeSelection /> component and <PokedexTable />
// Make sure you only display Pokemon with the selected type!

// const handleSelectChange = (evt, selectType) => {
// 	// debugger;
// 	const {value} = evt.target;	// AKA const {value} = el.target[el.target.selectedIndex]
// 	selectType(value);
// };

const PokemonTypeSelection = ({pokedex, selectType, selectedType}) => {

	const typesAll = [];
	pokedex.forEach( pokemon => typesAll.push(...pokemon.types) );

	const options = ["", "-all-", ...new Set(typesAll), "[fakevalue aka -none-]"]
	// ^ "looks better" than this: const options = ["-all-", "[fakevalue aka -none-]", ...new Set(typesAll)]
	.map( (opt, i) => h(
		"option",
		{
			key: _id ++,
			value: opt === "-all-" ? "" : opt,
		},
		opt
	) );

	return (
		h(
			"div",
			{},
			[
				h(
					"select",
					{
						key: _id ++,
						id: "filter-pokemon-type",
						onChange: evt => {
							const {value} = evt.target;
							// AKA old way: const {value} = el.target[el.target.selectedIndex]
							selectType(value);
						},
					},
					options
				),
				h(
					"label",
					{
						key: _id ++,
						htmlFor: "filter-pokemon-type",
						title: `Show only this Type${selectedType ? `: ${selectedType}` : ""}`
					},
					`🔍${selectedType ? `${selectedType}` : ""}`
				),
			]
		)
	);

};

const getStartingType = () => {
	// later might even pull from localStorage as logic test of "set selection during page initial load" 
	// return "-faked-";
	// return "grass";
	// return "poison";
	return "";
};

const FilterablePokedexTable = ( {pokedex} ) => {

	const [selectedType, selectType] = useState(getStartingType);

	const pokedexFiltered = selectedType.trim().length
	? pokedex.filter(
		pokemon => pokemon.types.includes(selectedType)
	)
	: [...pokedex];

	return (
		h(
			Fragment,
			{},
			[
				h(
					PokemonTypeSelection,
					{
						key: _id ++,
						pokedex,
						selectType,
						selectedType,
					},
				),
				h(
					PokedexTable,
					{
						key: _id ++,
						pokedex: pokedexFiltered,
						selectedType
					},
				)

			]
		)
	);
};

const App = () => {
	return (
		h(
			"div",
			{},
			// h( PokedexTable, { pokedex: pokemonArray } )
			h( FilterablePokedexTable, { pokedex: pokemonArray } )
		)
	);
};
// export default App;



// import React from "react";
// import App from "./App";
const renderRoot = (root, element) => {
	if(typeof preact === "object") {
		render(element, root);	// OR: render( element, document.querySelector("body") );
	} else {
		// OLD: ReactDOM.render(element, root);	// RactDOM.render is no longer supported in React 18. 
		ReactDOM.createRoot(root).render(element);
	};
};

renderRoot(
	document.getElementById("root"),
	// h( PokemonRow, { pokemon: bulbasaur } )
	App()
);



// console.log("app.js BTM");
