import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quiz from "./routes/Quiz";
import Home from "./routes/Home";

export default function App() {
    return (
        <div className="App text-center">
            <h1 className="appTitle">Get Quizzzed!</h1>

            <BrowserRouter basename="/get-quizzzed">
                <Routes>
                    <Route key="Home" path="/" element={<Home />} />
                    <Route key="Quiz" path="quiz/:topic" element={<Quiz />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
