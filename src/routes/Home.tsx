import React, { useState } from "react";
import { Link } from "react-router-dom";

const quizTopics = [
    "Baseball",
    "Football",
    "History",
    "Geography",
    "Basketball",
];

export default function Home() {
    const [selectedTopic, setSelectedTopic] = useState("");

    return (
        <div className="screen card mx-auto">
            <h2>Select a topic!</h2>
            <br />

            {quizTopics.map((topic) => (
                <div
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={
                        "alert" +
                        (selectedTopic === topic
                            ? " alert-primary"
                            : " alert-secondary")
                    }
                >
                    {topic}
                </div>
            ))}

            {selectedTopic && (
                <Link to={`/quiz/${selectedTopic}`}>
                    <button className="btn btn-success">Start Quiz</button>
                </Link>
            )}
        </div>
    );
}
