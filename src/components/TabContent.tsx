// @flow
import * as React from 'react';
import { Accordion, Button, Form, Modal } from 'react-bootstrap';
import BaseService from '../services/baseService';
type Props = {
  payload: { tabName: string; key: number; questions: Array<any> };
}
type State = {
  questions: Array<any>;
  show: boolean,
  resultPayload: {
    scorePercentage: string,
    insight: string,
    recommendation: string
  }
};
export default class TabContent extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      questions: this.props.payload.questions.map((q) => {
        q.selectedAnswer = '';
        return q;
      }),
      show: false,
      resultPayload: {
        scorePercentage: '0',
        insight: 'response not found',
        recommendation: 'response not found'
      }
    };
  }
  componentDidMount() {
  }
  changeSelector(event: any, index: number, value: string) {
    const modifiedQuestionList = this.state.questions;
    modifiedQuestionList[index].selectedAnswer = value;
    this.setState({ questions: modifiedQuestionList });
  }
  resetSelection(index: number) {
    const tempQuestions = this.state.questions;
    tempQuestions[index].selectedAnswer = '';
    this.setState({ questions: tempQuestions });
  }
  async submitResult() {
    const bs = new BaseService();
    let baseEndpoint = 'http://localhost:3001';
    switch (this.props.payload.key) {
      case 1:
        baseEndpoint = `${baseEndpoint}/cat-a-gov`;
        break;
      case 2:
        baseEndpoint = `${baseEndpoint}/cat-a-ops`;
        break;
      case 3:
        baseEndpoint = `${baseEndpoint}/cat-b-gov`;
        break;
      case 4:
        baseEndpoint = `${baseEndpoint}/cat-b-ops`;
        break;
      case 5:
        baseEndpoint = `${baseEndpoint}/cat-c-gov`;
        break;
      case 6:
        baseEndpoint = `${baseEndpoint}/cat-c-ops`;
        break;
      case 7:
        baseEndpoint = `${baseEndpoint}/cat-d-gov`;
        break;
      case 8:
        baseEndpoint = `${baseEndpoint}/cat-d-ops`;
        break;
      default:
        break;
    }
    let formattedPaylod: any = {}
    const payload = this.state.questions.forEach((q: any) => {
      console.log({ q });

      const { id, selectedAnswer } = q;
      formattedPaylod[id] = selectedAnswer;


    });

    console.log(formattedPaylod)
    const result = await bs.post(baseEndpoint, formattedPaylod);
    console.log({ result })
    // check the result and bind the payload
    this.setState({
      resultPayload: {
        scorePercentage: result.score_percentage,
        insight: result.insight,
        recommendation: result.recommendation
      }
    })
    this.setState({ show: true });

  }

  handleShow(value: boolean) {
    this.setState({ show: value })
  }
  render() {
    return (
      <>
        {this.state.questions.map((question: any, index: number) => {
          return (
            <Accordion key={index} defaultActiveKey='0'>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>
                  Question Number {index + 1}{' '}
                </Accordion.Header>
                <Accordion.Body>
                  <h4>{question.question}</h4>
                  <Form>
                    {question.possibleAnswers.map(
                      (answer: string, key: number) => {
                        return (
                          <Form.Group
                            key={key}
                            className='mb-3'
                            controlId='formBasicCheckbox'
                          >
                            <Form.Check
                              onChange={(e: any) =>
                                this.changeSelector(e, index, answer)
                              }
                              checked={question.selectedAnswer === answer}
                              type='radio'
                              label={answer}
                            />
                          </Form.Group>
                        );
                      }
                    )}
                  </Form>
                  <Button className='clear-btn' onClick={(e) => this.resetSelection(index)}>
                    clear answer
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          );
        })}
        <div className='submit-view'>
          <Button onClick={(e) => this.submitResult()}>Submit Result</Button>

        </div>
        <>
          <Modal
            show={this.state.show}
            onHide={() => { this.handleShow(false) }}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Result</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Insight: {this.state.resultPayload.insight}</p>
              <p>Recommendation: {this.state.resultPayload.recommendation}</p>
              <p>Scope Percentage: {this.state.resultPayload.scorePercentage}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={(e) => this.handleShow(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </>
    );
  }
}
