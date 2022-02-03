import React, { Component } from 'react';
import BaseService from '../../services/baseService';

type Props = {};

type State = {
  responseData: Array<any>;
};
class About extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      responseData: [],
    };
  }
  componentDidMount() {
    this.loadSampleDataFromAPI();
  }
  async loadSampleDataFromAPI() {
    const bs = new BaseService();
    const { data = [] } = await bs.get(
      'http://dummy.restapiexample.com/api/v1/employees'
    );
      console.log(data);
      
    this.setState({
      responseData: data,
    });
  }
  render() {
    return (
      <div>
        Lets show API response Here.
        <ul>
          {this.state.responseData.map((item: any,  key: number) => {
            return <li key={key}>{item.employee_name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default About;
