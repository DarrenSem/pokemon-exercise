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
				{},
			 	types.join(", ")
			)
		] ),
	]);
};
// const PokemonRow_NON_TABLE = (props) => {
// 	const {pokemon} = props;
// 	const {id, name, types, sprite} = pokemon;
//
// 	return h(Fragment, null, [
// 		h(
// 			"img",
// 			{
// 				key: _id ++,
// 				src: sprite,
// 				alt: name,
// 				width: "10%"
// 			}
// 		),
// 		h(
// 			"b",
// 			{ key: _id ++ },
// 			`${name}`),
// 		h(
// 			"code",
// 			{ key: _id ++ },
// 			` (#${String(id).padStart(3, "0")}) `),
// 		h(
// 			"span",
// 			{ key: _id ++ },
// 			[
// 				`Type: `,
// 				h(
// 					"i",
// 					{ key: _id ++ },
// 				 	types.join(", ")
// 				)
// 			]
// 		),
// 	]);
// };
// export default PokemonRow;



// import React from "react";
// import PokemonRow from "./PokemonRow";
const PokedexTable = (props) => {
// debugger;
// console.warn(props);
	const {pokedex} = props;

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

	const body = pokedex.map( pokemon => {
// debugger;
// console.warn(props);
		const row = PokemonRow( { pokemon } );

		return row;

	});

	const chable = h(
		"table",
		{},
		[
			head,
			body,
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
		types: ["grass", "poison"],
		// sprite: "https://pokemon.com/pictures/bulbasaur.png"
		// https://www.pokemon.com/us/pokedex/bulbasaur => https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png
		sprite: "../img/001.png"
	},
	{
		id: 2,
		name: "Ivysaur",
		types: ["grass", "poison"],
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

 

];
// create a `<PokedexTable />` component that takes in the array and renders all the pokemon in that array.

const App = () => {
	return (
		h(
			"div",
			{},
			h( PokedexTable, { pokedex: pokemonArray } )
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
