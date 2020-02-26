import React, { Component } from "react";
import "./App.css";

// the actual quiz
const questions = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const answers = ["zero", "ichi", "ni", "san", "yon", "go", "roku", "shichi", "hachi", "kyuu", "jyuu"];
const min = 0;
const max = 10;
const rand = Math.round(min + Math.random() * (max - min));
function getCount() {
  return questions.length;
}
function getQuestion(i) {
  return (
    <div>
      <span style={{ color: "red" }}>{questions[i]}</span> in japanese?
    </div>
  );
}
function getAnswer(i) {
  return answers[i];
}
// the actual quiz is done, boring stuff follows...

class App extends Component {
  constructor() {
    super();

    // console.log(rand);

    this.state = {
      question: getQuestion(rand),
      answer: getAnswer(rand),
      total: getCount(),
      i: rand
    };
  }

  nextQuestion() {
    console.log(this.state.i);
    this.setState({
      question: getQuestion((this.state.i + 1) % this.state.total),
      answer: getAnswer((this.state.i + 1) % this.state.total),
      i: (this.state.i + 1) % this.state.total
    });
    console.log(this.state.i);
  }

  render() {
    return (
      <div>
        {this.state.total ? <Count i={this.state.i} total={this.state.total} /> : null}
        <Flashcard question={this.state.question} answer={this.state.answer} />
        {this.state.total && this.state.i > this.state.total ? (
          console.log("rewinding")
        ) : (
          <button className="nextButton" onClick={this.nextQuestion.bind(this)}>
            Next Question
          </button>
        )}
      </div>
    );
  }
}

class Flashcard extends Component {
  constructor() {
    super();
    this.state = {
      reveal: false
    };
  }

  componentWillReceiveProps() {
    this.setState({ reveal: false });
  }

  flip() {
    this.setState({
      reveal: !this.state.reveal
    });
  }

  render() {
    const className = "card flip-container" + (this.state.reveal ? " flip" : "");
    return (
      <div>
        <center>
          <div className={className} onClick={this.flip.bind(this)}>
            <div className="flipper">
              <div className="front" style={{ display: this.state.reveal ? "none" : "" }}>
                {this.props.question}
              </div>
              <div className="back" style={{ display: this.state.reveal ? "" : "none" }}>
                {this.props.answer}
              </div>
            </div>
          </div>
          <button className="answerButton" onClick={this.flip.bind(this)}>
            flip
          </button>
        </center>
      </div>
    );
  }
}

const Count = ({ i, total }) => (
  <div>
    Question {i} / {total - 1}
  </div>
);

export default App;
