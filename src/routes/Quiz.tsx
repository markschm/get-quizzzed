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
                setQuestions(getRandomizedQuestions(questions));
            } catch (error) {
                // TODO: should never occur, but could use better handling
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
            <div className="screen card mx-auto">
                <h2>Final Score</h2>

                <h2 className="score">
                    {score} / {questions.length}
                </h2>

                <div>
                    <Link to={"/"}>
                        <button className="btn btn-primary">Return Home</button>
                    </Link>
                </div>
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
        setCurrentSelectedOption("");
    }

    return (
        <div className="screen card mx-auto">
            <div className="row">
                <div className="col-md-3">
                    <h3>
                        {currentQuestion + 1} / {questions.length}
                    </h3>
                </div>

                <div className="col-md-9 order-md-first">
                    <h3>{questions[currentQuestion].question}</h3>
                </div>
            </div>

            {questions[currentQuestion].options.map((option) => (
                <div
                    key={option}
                    className={getOptionClassNames(
                        option,
                        currentSelectedOption,
                        questions[currentQuestion].answer,
                        isShowingResults
                    )}
                    onClick={() =>
                        !isShowingResults && setCurrentSelectedOption(option)
                    }
                >
                    {option}
                </div>
            ))}

            <div>
                {isShowingResults ? (
                    <button
                        className="btn btn-primary"
                        onClick={() => nextQuestion()}
                    >
                        Next Question
                    </button>
                ) : (
                    <button
                        className="btn btn-success"
                        onClick={() => currentSelectedOption && submitAnswer()}
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
}

function getRandomizedQuestions(questions: Question[]): Question[] {
    for (let i = 0; i < questions.length; i++) {
        questions[i].options = getRandomizedArray(questions[i].options);
    }

    questions = getRandomizedArray(questions);
    return questions;
}

function getRandomizedArray(arr: any[]): any[] {
    for (let i = 0; i < arr.length; i++) {
        const j = Math.floor(Math.random() * (arr.length - 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

function getOptionClassNames(
    option: string,
    currentSelectedOption: string,
    answer: string,
    isShowingResults: boolean
) {
    let classNames = "alert ";
    if (isShowingResults) {
        if (option === answer) {
            classNames += "alert-correct";
        } else if (option === currentSelectedOption) {
            classNames += "alert-incorrect";
        } else {
            classNames += "alert-secondary";
        }
    } else if (option === currentSelectedOption) {
        classNames += "alert-primary";
    } else {
        classNames += "alert-secondary";
    }

    return classNames;
}
