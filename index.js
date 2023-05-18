// index.js

console.time("READY");

( (glo) => {

	const isDev = /[?&]dev\b/i.test(location.search);
	const usePreact = /[?&]preact\b/i.test(location.search);
	const useLiveReload = /[?&]live\b/i.test(location.search);
	const useCDNnotLCL = /[?&]cdn\b/i.test(location.search);

	let delim = " ";
	let CDN = "./CDN%20saved%20to%20LCL";
	let RVER = "@18.2.0";	// React
	let PVER = "@10.14.1";	// Preact

	if(useCDNnotLCL) {
		delim = "/";
		CDN = "https://unpkg.com";
		RVER = "@18";	// React
		PVER = "@10";	// Preact
	};

	const RENV = isDev ? "development" : "production.min";
	const PENV = isDev ? "umd" : "umd";

	const doc = document;
	const {head = doc.body} = doc;

	const deps = scriptArray => {
		if(!scriptArray?.length)return;
		const script = head.appendChild(doc.createElement("script"));
		script.onload = () => deps(scriptArray);
		script.src = scriptArray.shift();
	};

	[...doc.querySelectorAll("noscript")].forEach( el => el.remove() );

	deps(
		(
			usePreact ? [
				`${CDN}/preact${PVER}${delim}dist${delim}preact.${PENV}.js`,		 // (   10,774 bytes)
				`${CDN}/preact${PVER}${delim}hooks${delim}dist${delim}hooks.${PENV}.js`,	 // (    4,010 bytes)
				// `${CDN}/preact${PVER}${}compat${}dist${}compat.${PENV}.js`, // (  10,536 bytes) must be AFTER _both_ "preact" object AND "preact/hooks" are loaded
				// ^ now available to globalThis: [preact, preactHooks, preactCompat]
			] :
			[
				`${CDN}/react${RVER}${delim}umd${delim}react.${RENV}.js`,			 // (  109,909 bytes) for DEV (PRD.MIN =   10,736 bytes)
				`${CDN}/react-dom${RVER}${delim}umd${delim}react-dom.${RENV}.js`,	 // (1,076,999 bytes) for DEV (PRD.MIN =  131,881 bytes)
			]
		).concat(
			useLiveReload ? `http://localhost:${35729}/livereload.js?snipver=1` :
			[]
		).concat("../app.js")
	);

} )(this);
