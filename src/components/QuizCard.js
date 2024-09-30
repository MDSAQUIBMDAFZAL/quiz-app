import React from "react";
import { Link } from "react-router-dom";
import "../styles/quiz.css";

const QuizCard = ({ quiz }) => {
  return (
    <div className="quiz-card">
      <h3>{quiz.title}</h3>
      <p>{quiz.description}</p>
      <Link to={`/quiz/${quiz.id}`}>Start Quiz</Link>
    </div>
  );
};

export default QuizCard;
