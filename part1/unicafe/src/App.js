import { useState } from 'react';

//Button component
const Button = (props) => {
	return <button onClick={props.onClick}>{props.text}</button>;
};

//Statistics component to handle
const Stat = (props) => {
	return (
		<p>
			{props.text} {props.stat}
		</p>
	);
};

const DisplayStat = (props) => {
	if (props.all === 0) {
		return <p>No feedback given</p>;
	}
	return (
		<div className='stat'>
			<Stat text='good' stat={props.good} />
			<Stat text='neutral' stat={props.neutral} />
			<Stat text='bad' stat={props.bad} />
			<Stat text='all' stat={props.all} />
			<Stat text='average' stat={props.average} />
			<Stat text='positive (%)' stat={props.positive} />
		</div>
	);
};

function App() {
	//save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const all = good + neutral + bad;
	const average = (good * 1 + neutral * 0 + bad * -1) / all;
	const positive = (good / all) * 100;

	return (
		<div>
			<div className='feedback-container'>
				<h2>Give Feedback</h2>
				<Button onClick={() => setGood(good + 1)} text='good' />
				<Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
				<Button onClick={() => setBad(bad + 1)} text='bad' />
			</div>

			<div className='stats-container'>
        <h2>Statistics</h2>
				<DisplayStat
					good={good}
					neutral={neutral}
					bad={bad}
					all={all}
					average={average}
					positive={positive}
				/>
			</div>
		</div>
	);
}

export default App;
