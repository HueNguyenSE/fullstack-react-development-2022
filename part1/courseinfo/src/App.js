const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Part = ({ part, exercises }) => {
	return (
		<p>
			{part} {exercises}
		</p>
	);
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </div>
  );
};

const Total = ({ sum }) => {
	return <p>Number of exercises {sum}</p>;
};

function App() {
	const course = 'Half Stack application development';
	const part1 = 'Fundementals of React';
	const exercises1 = 10;
	const part2 = 'Using props to pass data';
	const exercises2 = 7;
	const part3 = 'State of a component';
	const exercises3 = 14;
	const sum = exercises1 + exercises2 + exercises3;

	return (
		<div>
			<Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
			<Total sum={sum} />
		</div>
	);
}

export default App;
