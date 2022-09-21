import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';

function App() {
	console.log('App');
	const [countries, setCountries] = useState([]);

	//fetch data
	const effectHandler = () => {
		console.log('effect');
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(countries.concat(response.data));
		});
	};
	useEffect(effectHandler, []);
	console.log('countries', countries);

	const len = countries.length;
	const names = countries.map((country) => country.name.common);
	const areas = countries.map((country) => country.area);
	const capitals = countries.map((country) => {
		if (country.capital !== undefined) {
			return country.capital;
		} else {
			return ['no data to show'];
		}
	});
	const languages = countries.map((country) => {
		if (country.languages !== undefined) {
			return Object.values(country.languages);
		} else {
			return ['no data to show'];
		}
	});
	const flags = countries.map((country) => {
		if (country.flags !== undefined) {
			return Object.values(country.flags);
		} else {
			return ['no data to show'];
		}
	});

	const all = [];
	for (let i = 0; i < len; i++) {
		all.push({
			name: names[i],
			capital: capitals[i],
			area: areas[i],
			languages: languages[i],
			flags: flags[i],
		});
	}

	const displayAll = all.map((country, index) => {
		return (
			<div id={index} className='country-container'>
				<h1 className='name'>{country.name}</h1>
				<p>Capital: {country.capital.map((cap) => `${cap} `)}</p>
				<p>Area: {country.area} </p>
				<p>
					<b>Languages:</b>{' '}
				</p>
				<ul>
					{country.languages.map((lang) => (
						<li>{lang}</li>
					))}
				</ul>
				<img
					src={country.flags[0]}
					alt='country flag'
					width='400'
					height='300'
				/>
			</div>
		);
	});

	//show details of each country
	let displayOne;
	//function handleSearch
	function handleSearch() {
		//get the input value
		const input = document.getElementById('search-input');
		const filter = input.value.toLowerCase();
		console.log('filter', filter);

		//an array storing all indexes of matched countries
		let matchCases = [];
		//loop through countries and hide those don't match
		for (let i = 0; i < len; i++) {
			if (names[i].toLowerCase().indexOf(filter) > -1) {
				matchCases.push(i);
			}
		}
		const main = document.getElementById('main');
		const p = document.createElement('p');
		const textNode = document.createTextNode('Too many cases found to display');
		p.appendChild(textNode);
		main.appendChild(p);
		p.style.display = 'none';


		if (matchCases.length <= 10) {
			for (let i of matchCases) {
				const textNodeForName = document.createTextNode(names[i]);
				const pForName = document.createElement('p');
				pForName.appendChild(textNodeForName);

				const button = document.createElement('button');
				const buttonText = document.createTextNode('show');
				button.appendChild(buttonText);

				pForName.appendChild(button);
				main.appendChild(pForName);

				button.onclick = () => {
					console.log('button clicked');
				};
			}
		} else if (matchCases.length === 1) {
			p.style.display = 'none';
			const i = matchCases[0];
			displayOne = displayAll[i];
			console.log('view', displayOne);

		} else {
			//handle the case when there are more than 10 matches
			p.style.display = '';
		}

		console.log('matchCases: ', matchCases, matchCases.length);
		//display match cases
		console.log('display one', displayOne)
	}

	return (
		<div id='main'>
			<p>
				Find countries{' '}
				<input type='text' id='search-input' onKeyUp={handleSearch} />
			</p>
			<div id="all"></div>
		</div>
	);
}
export default App;
