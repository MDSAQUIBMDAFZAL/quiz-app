import React, { useState, useEffect } from "react";
import QuizForm from "../components/QuizForm";
import "../styles/quiz.css";

const AdminPanel = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuizIndex, setEditingQuizIndex] = useState(null);

  useEffect(() => {
    const storedQuizzes = localStorage.getItem("quizzes");
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  const handleQuizSubmit = (newQuiz) => {
    if (editingQuizIndex !== null) {
      const updatedQuizzes = quizzes.map((quiz, index) =>
        index === editingQuizIndex ? newQuiz : quiz
      );
      setQuizzes(updatedQuizzes);
      setEditingQuizIndex(null);
    } else {
      setQuizzes([...quizzes, newQuiz]);
    }
  };

  const handleEdit = (index) => {
    setEditingQuizIndex(index);
  };

  const handleDelete = (index) => {
    const updatedQuizzes = quizzes.filter((_, i) => i !== index);
    setQuizzes(updatedQuizzes);
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <QuizForm
        onSubmit={handleQuizSubmit}
        quizToEdit={
          editingQuizIndex !== null ? quizzes[editingQuizIndex] : null
        }
      />
      <div className="quiz-list">
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <div key={index} className="quiz-item">
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <ul>
                <h3>Questions:</h3>
                {quiz.questions.map((question, idx) => (
                  <li key={idx}>{question}</li>
                ))}
              </ul>
              <div className="quiz-btn">
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No quizzes available</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
