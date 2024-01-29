import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Question {
    question: string;
    options: string[];
    answer: string;
}

export default function Quiz() {
    const { topic } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSelectedOption, setCurrentSelectedOption] = useState("");
    const [isShowingResults, setIsShowingResults] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const { questions } = await (
                    await fetch(`../questions/${topic}.json`)
                ).json();
                setQuestions(questions);
            } catch (error) {
                console.log("Error fetching questions: " + error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchQuestions();
    }, [topic]);

    if (isLoading) {
        return <></>;
    }

    if (currentQuestion >= questions.length) {
        return (
            <div className="quizScreen screen">
                <h2 className="sectionHeader">
                    Final Score: {score} / {questions.length}
                </h2>

                <Link to={"/"}>
                    <button>Return Home</button>
                </Link>
            </div>
        );
    }

    function submitAnswer() {
        if (currentSelectedOption === questions[currentQuestion].answer) {
            setScore(score + 1);
        }

        setIsShowingResults(true);
    }

    function nextQuestion() {
        setCurrentQuestion(currentQuestion + 1);
        setIsShowingResults(false);
    }

    return (
        <div className="quizScreen screen">
            <h2 className="sectionHeader">
                Question # {currentQuestion + 1} / {questions.length}
            </h2>

            <h3 className="question">{questions[currentQuestion].question}</h3>

            {questions[currentQuestion].options.map((option) => {
                return (
                    <div
                        key={option}
                        className={
                            "questionOption" +
                            (currentSelectedOption === option
                                ? " currentSelectedOption"
                                : "") +
                            (isShowingResults &&
                            option === questions[currentQuestion].answer
                                ? " correctOption"
                                : "")
                        }
                        onClick={() =>
                            !isShowingResults &&
                            setCurrentSelectedOption(option)
                        }
                    >
                        {option}
                    </div>
                );
            })}

            {!isShowingResults && (
                <button onClick={() => currentSelectedOption && submitAnswer()}>
                    Submit
                </button>
            )}
            {isShowingResults && (
                <button onClick={() => nextQuestion()}>Next Question</button>
            )}
        </div>
    );
}
