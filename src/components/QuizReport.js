import React from "react";

const QuizReport = ({ score, totalQuestions, userAnswers }) => {
  return (
    <div className="quiz-report">
      <h2>Quiz Report</h2>
      <p>
        Score: {score} / {totalQuestions}
      </p>
      <ul>
        {userAnswers.map((answer, idx) => (
          <li key={idx}>
            Q{idx + 1}: {answer.isCorrect ? "Correct" : "Wrong"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizReport;
