import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';

function App() {
	//console.log('App');
	const [countries, setCountries] = useState([]);
	const [filter, setFilter] = useState([]);
	const [matches, setMatches] = useState([]);

	const len = countries.length; //number of countries in the database
	const allContainers = document.querySelectorAll('.country-container');
	const countryNames = document.querySelectorAll('.country-name');

	//fetch data
	const effectHandler = () => {
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(countries.concat(response.data));
		});
	};
	useEffect(effectHandler, []);
	console.log('countries', countries);

	//get name of all countries
	const names = countries.map((country) => {
		if (country.name.common !== undefined) {
			return country.name.common;
		} else {
			return 'no data to show';
		}
	});
	//get area of all countries
	const areas = countries.map((country) => {
		if (country.area !== undefined) {
			return country.area;
		} else {
			return 'no data to show';
		}
	});
	//capiital(s) of countries
	const capitals = countries.map((country) => {
		//get capital of all countries
		if (country.capital !== undefined) {
			return country.capital;
		} else {
			return ['no data to show'];
		}
	});
	//official languages
	const languages = countries.map((country) => {
		if (country.languages !== undefined) {
			return Object.values(country.languages);
		} else {
			return ['no data to show'];
		}
	});
	//flag iamge
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

	//handle hide/show country details
	function showCountryDetails(index) {
		const targetContainer = allContainers[index];
		if (targetContainer.style.display === 'none') {
			targetContainer.style.display = 'block';
		} else {
			targetContainer.style.display = 'none';
		}
	}

	//handle searching
	const handleSearch = () => {
		//get the input value
		const input = document.getElementById('search-input');
		const inputValue = input.value;
		setFilter(inputValue.toUpperCase());
		console.log('search keys:', filter);

		//an array storing all indexes of matched countries
		setMatches(
			names.reduce((allMatches, currentName, currentIndex) => {
				if (currentName.toUpperCase().indexOf(filter) > -1) {
					allMatches.push(currentIndex);
				}
				return allMatches;
			}, [])
		);
		console.log('match indexes: ', matches);
		const main = document.getElementById('main');

		const p = document.createElement('p');
		const textNode = document.createTextNode('');
		p.appendChild(textNode);
		main.appendChild(p);
		p.style.display = 'none';

		if (matches.length <= 10 && matches.length >= 2) {
			for (let i of matches) {
				countryNames[i].style.display = 'block';
			}
		} else if (matches.length === 1) {
			const i = matches[0];
			countryNames[i].style.display = 'none';
			allContainers[i].style.display = 'block';
		} else if (matches.length === 0) {
			textNode.textContent = 'There is no match found';
			p.style.display = 'block';
		} else {
			//too many cases
			textNode.textContent = 'Too many matches found';
			p.style.display = 'block';
		}
	}

	return (
		<div id='main'>
			<div>
				<label for="search-input">Find countries{' '}</label>
				<input type='text' id='search-input' onKeyUp={handleSearch} />
			</div>
			{names.map((name, index) => (
				<div className='country'>
					<p className='country-name' style={{ display: 'none' }}>
						{name}
						<button onClick={() => showCountryDetails(index)}>show</button>
					</p>
					<div
						id={index}
						className='country-container'
						style={{ display: 'none' }}
					>
						<h1 className='name'>{names[index]}</h1>
						<p>Capital: {capitals[index].map((cap) => `${cap} `)}</p>
						<p>Area: {areas[index]} </p>
						<p>
							<b>Languages:</b>{' '}
						</p>
						<ul>
							{languages[index].map((lang) => (
								<li>{lang}</li>
							))}
						</ul>
						<img
							src={flags[index][0] || flags[index][1]}
							alt='country flag'
							width='400'
							height='300'
						/>
					</div>
				</div>
			))}
		</div>
	);
}
export default App;
