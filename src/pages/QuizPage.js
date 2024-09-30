import React, { useState } from "react";
import QuizReport from "../components/QuizReport";
import "../styles/quiz.css";
import javascriptQuestions from "../questions/javascriptQuestions";
import reactQuestions from "../questions/reactQuestions";

const getRandomQuestions = (questions) => {
  return questions.sort(() => 0.5 - Math.random()).slice(0, 10);
};

const QuizPage = () => {
  const [topic, setTopic] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isOptionClicked, setIsOptionClicked] = useState(false);

  const handleTopicSelection = (selectedTopic) => {
    setTopic(selectedTopic);
    if (selectedTopic === "JavaScript") {
      setQuizQuestions(getRandomQuestions(javascriptQuestions));
    } else if (selectedTopic === "React") {
      setQuizQuestions(getRandomQuestions(reactQuestions));
    }
    resetQuiz();
  };

  const handleOptionClick = (optionIndex) => {
    if (!isOptionClicked) {
      setSelectedOptionIndex(optionIndex);
      setIsOptionClicked(true);

      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestionIndex] = {
        question: quizQuestions[currentQuestionIndex].question,
        selectedOption: optionIndex,
        isCorrect:
          optionIndex === quizQuestions[currentQuestionIndex].correctOption,
      };
      setUserAnswers(updatedAnswers);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null);
      setIsOptionClicked(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOptionIndex(null);
      setIsOptionClicked(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setIsCompleted(false);
    setSelectedOptionIndex(null);
    setIsOptionClicked(false);
  };

  return (
    <div className="quiz-page">
      {!topic ? (
        <div>
          <h2>Select a Quiz Topic</h2>
          <div className="quiz-btn">
            <button onClick={() => handleTopicSelection("JavaScript")}>
              JavaScript
            </button>
            <button onClick={() => handleTopicSelection("React")}>React</button>
          </div>
        </div>
      ) : !isCompleted ? (
        <div>
          <h2>{topic} Quiz</h2>
          <p>{quizQuestions[currentQuestionIndex].question}</p>
          <ul>
            {quizQuestions[currentQuestionIndex].options.map(
              (option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className={
                    selectedOptionIndex === index
                      ? quizQuestions[currentQuestionIndex].correctOption ===
                        index
                        ? "correct-option"
                        : "incorrect-option"
                      : ""
                  }
                  style={{ pointerEvents: isOptionClicked ? "none" : "auto" }}
                >
                  {option}
                </li>
              )
            )}
          </ul>
          <div className="quiz-btn">
            {currentQuestionIndex > 0 && (
              <button onClick={handlePreviousQuestion}>Previous</button>
            )}
            <button onClick={handleNextQuestion}>
              {currentQuestionIndex < quizQuestions.length - 1
                ? "Next"
                : "Submit"}
            </button>
          </div>
        </div>
      ) : (
        <QuizReport
          score={userAnswers.filter((answer) => answer.isCorrect).length}
          totalQuestions={quizQuestions.length}
          userAnswers={userAnswers}
        />
      )}
    </div>
  );
};

export default QuizPage;
