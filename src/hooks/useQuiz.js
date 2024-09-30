import { useState } from "react";

const useQuiz = (initialQuizzes) => {
  const [quizzes, setQuizzes] = useState(initialQuizzes || []);

  const addQuiz = (newQuiz) => {
    setQuizzes([...quizzes, newQuiz]);
  };

  return {
    quizzes,
    addQuiz,
  };
};

export default useQuiz;
