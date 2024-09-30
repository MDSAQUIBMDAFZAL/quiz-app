import React, { useState, useEffect } from "react";

const QuizForm = ({ onSubmit, quizToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState("");

  useEffect(() => {
    if (quizToEdit) {
      setTitle(quizToEdit.title);
      setDescription(quizToEdit.description);
      setQuestions(quizToEdit.questions.join("\n"));
    } else {
      setTitle("");
      setDescription("");
      setQuestions("");
    }
  }, [quizToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedQuestions = questions.split("\n").map((q) => q.trim());
    onSubmit({ title, description, questions: formattedQuestions });

    setTitle("");
    setDescription("");
    setQuestions("");
  };

  const isFormValid =
    title.trim() !== "" && description.trim() !== "" && questions.trim() !== "";

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter quiz title"
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </div>

      <div>
        <label>Questions</label>
        <textarea
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
          placeholder="Enter quiz questions (each on a new line)"
        />
      </div>

      <button type="submit" disabled={!isFormValid}>
        {quizToEdit ? "Update Quiz" : "Create Quiz"}
      </button>
    </form>
  );
};

export default QuizForm;
