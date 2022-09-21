import React from 'react';

const Title = ({ course }) => {
	return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
	return course.parts.map((part) => (
		<p key={part.id}>
			{part.name} {part.exercises}
		</p>
	));
};

const Total = ({ course }) => {
	const total = course.parts.reduce((total, part) => total + part.exercises, 0);
	return (
		<p>
			<b>total of {total} exercises</b>
		</p>
	);
};

const Course = ({ courses }) => {
	const display = courses.map((course) => {
		return (
			<div key={course.id}>
				<Title course={course} />
				<Content course={course} />
				<Total course={course} />
			</div>
		)
	});
	return display;
};

export default Course;