import { useState } from 'react';

function App() {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
	];
	const len = anecdotes.length;

	const [selected, setSelected] = useState(0);
	const arr = new Array(len).fill(0);
	const [votes, setVotes] = useState(arr);
	//the largest number of votes
	const max = Math.max(...votes);

	//the index of the element which has the highest number of votes
	const indexOfMax = votes.indexOf(max);

	return (
		<div>
			<div>
				<h1>Anecdote of the day</h1>
				<p>{anecdotes[selected]}</p>
				<p>has {votes[selected]} votes</p>
				<button
					onClick={() => {
						votes[selected] += 1;
						setVotes(votes);
					}}
				>
					vote
				</button>
				<button
					onClick={() => {
						setSelected(Math.floor(Math.random() * len));
					}}
				>
					next anecdote
				</button>
			</div>

			<div>
				<h1>Anecdote with most votes</h1>
				<p>{anecdotes[indexOfMax]}</p>
				<p>has {max} votes</p>
			</div>
		</div>
	);
}

export default App;
