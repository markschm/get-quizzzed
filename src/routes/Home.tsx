import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [selectedTopic, setSelectedTopic] = useState("");
    const quizTopics = ["Baseball", "Football", "History"];

    return (
        <div className="homeScreen screen">
            <h2>Select a topic!</h2>

            <ul>
                {quizTopics.map((topic) => {
                    return (
                        <li
                            key={topic}
                            onClick={() => setSelectedTopic(topic)}
                            className={
                                "quizTopicElement" +
                                (selectedTopic === topic
                                    ? " selectedTopicElement"
                                    : "")
                            }
                        >
                            {topic}
                        </li>
                    );
                })}
            </ul>

            {selectedTopic && (
                <Link to={`/quiz/${selectedTopic}`}>
                    <button>Start Quiz</button>
                </Link>
            )}
        </div>
    );
}
