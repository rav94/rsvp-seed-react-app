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
    description:string
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
        description:'response not found'
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
        
        break;
        case 3:
        
          break;
    
      default:
        break;
    }
    const payload = this.state;
   const  result = await bs.post(baseEndpoint, payload);
   // check the result and bind the payload
   this.setState({
     resultPayload: {
       scorePercentage: '10',
       description:'demo response result is showing here'
   }})
   this.setState({ show: true });  
   
  }

  handleShow(value:boolean) {
    this.setState({show:value})
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
        onHide={()=>{this.handleShow(false)}}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <h3>Scope Percentage: {this.state.resultPayload.scorePercentage}</h3>
              <p>Analysis report: { this.state.resultPayload.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e)=>this.handleShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
      </>
    );
  }
}
