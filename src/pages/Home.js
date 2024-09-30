import React from "react";
import QuizCard from "../components/QuizCard";

const Home = () => {
  const quizzes = [
    {
      id: 1,
      title: "JavaScript Basics",
      description: "Test your JavaScript skills",
    },
    {
      id: 2,
      title: "React Advanced",
      description: "Challenge your React knowledge",
    },
  ];

  return (
    <div className="home">
      <h1>Available Quizzes</h1>
      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default Home;
