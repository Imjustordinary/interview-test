import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { answerAction } from "../store";

const questions = [
  {
    question: "What is 1+1?",
    answer: "2",
  },
  {
    question: "What is 1+2?",
    answer: "3",
  },
  {
    question: "What is 3+1?",
    answer: "4",
  },
];

function QuestionScreen() {
  const dispatch = useDispatch();
  const marks = useSelector((state) => state.marks);

  const answerText = useRef();

  const [questionNumber, setQuestionNumber] = useState(0);
  const [myInterval, setMyInterval] = useState();
  const [second, setSecond] = useState(10);
  const [start, setStart] = useState(false);

  const onNextHandler = useCallback(() => {
    setSecond(3);
    if (questionNumber < 3) {
      if (answerText.current.value === questions[questionNumber].answer) {
        dispatch(answerAction.correct());
      }
      setQuestionNumber(questionNumber + 1);
    }
  }, [questionNumber]);

  const onRetry = useCallback(() => {
    setQuestionNumber(0);
    setSecond(10);
    setMyInterval(setInterval(() => setSecond((prev) => prev - 1), 1000));
  }, []);

  const onStartHandler = useCallback(() => {
    setStart(true);
    setMyInterval(setInterval(() => setSecond((prev) => prev - 1), 1000));
  }, []);

  const Question = memo(() => {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formQuiz">
          <Form.Label>{questions[questionNumber].question}</Form.Label>
          <Form.Control type="text" ref={answerText} />
        </Form.Group>
      </Form>
    );
  }, [questionNumber]);

  const QuestionHeader = memo(() => {
    return questionNumber < 3 ? (
      <>
        <h3>React Quzis</h3>
        <h5>Question {questionNumber + 1} of 3</h5>
      </>
    ) : (
      <>
        <h3>React Quzis</h3>
        <h5>Congrats</h5>
      </>
    );
  }, []);

  const body = useMemo(() => {
    if (!!start) {
      if (questionNumber < 3) {
        return <Question />;
      } else {
        return (
          <div>
            <h1 className="display-4">
              {marks < 1 ? "Your mark is" : "Your marks is"} : {marks}
            </h1>
          </div>
        );
      }
    }
  }, [questionNumber, start]);

  const StartHeader = memo(() => {
    return (
      <>
        <h3>React Quzis</h3>
        <h5>Wanna test your IQ?</h5>
      </>
    );
  }, []);

  const header = useMemo(() => {
    if (!!start) {
      return <QuestionHeader />;
    } else {
      return <StartHeader />;
    }
  }, [questionNumber, start]);

  useEffect(() => {
    // startAnswering()
    if (second < 0) {
      setQuestionNumber((prev) => prev + 1);
      setSecond(10);
    }
    if (questionNumber > 2) {
      clearInterval(myInterval);
    }
  }, [second]);

  return (
    <Container className="">
      <Row className="justify-content-center">
        <Col className="col-lg-6 border rounded m-5 ">
          <div className="py-3">
            <div className="py-3 text-center">
              {header}
              {/* <p class="lead">what is 1 + 1?</p> */}
            </div>
            {body}

            {!!start && questionNumber < 3 && (
              <>
                <p>{second}s left</p>
                <Button onClick={onNextHandler}>Next</Button>
              </>
            )}
            {!start && questionNumber < 1 && (
              <Button onClick={onStartHandler}>Start</Button>
            )}
            {questionNumber > 2 && <Button onClick={onRetry}>Retry</Button>}
          </div>
          <div></div>
        </Col>
      </Row>
    </Container>
  );
}

export default QuestionScreen;
