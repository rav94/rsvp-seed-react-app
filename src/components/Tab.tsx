import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TabContent from './TabContent';
import './tab.css'
import questionSet from './question.json';

export default function TabComponent() {
  const [key, setKey] = useState('home');
  const [tabsArray] = useState(questionSet.data);
    React.useEffect(() => {
        setKey('0')
    }, [])
  return (
    <div className='main-wrapper'>
      <h1 className='app-name'>Application Title </h1>
      <Tabs
        id='controlled-tab-example'
        activeKey={key}
        onSelect={(k: any) => setKey(k.toString())}
        className='mb-3'
      >
        {' '}
        {tabsArray.map((tab: any, key: number) => {
          return (
            <Tab key={key} eventKey={key} title={tab.name}>
              <TabContent payload={{tabName:tab.name,key:key+1,questions:tab.questions }} ></TabContent>
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
}
