import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TabContent from './TabContent';
import './tab.css'

export default function TabComponent() {
  const [key, setKey] = useState('home');
  const [tabsArray] = useState([
    { name: 'tab1', id: 1, questions: [{ id: 1, question: 'Do you use GDRP ?', possibleAnswers: ['Yes', 'No', 'N/A'] }] },
    { name:'tab2',questions:[{id:1,question:'Do you use GDRP ?', possibleAnswers:['Yes','No','N/A']},{id:2,question:'Do you use HIPPA ?', possibleAnswers:['Yes','No','N/A']}]},
    { name:'tab3',questions:[{id:1,question:'Do you use GDRP ?', possibleAnswers:['Yes','No','N/A']}]},
    { name:'tab4 content',questions:[{id:1,question:'Do you use GDRP ?', possibleAnswers:['Yes','No','N/A']}]},
    { name:'tab5',questions:[{id:1,question:'Do you use GDRP ?', possibleAnswers:['Yes','No','N/A']}]},
    { name:'tab6',questions:[{id:1,question:'Do you use GDRP ?', possibleAnswers:['Yes','No','N/A']}]},
    { name:'tab7',questions:[{id:1,question:'Do you use GDRP ?', possibleAnswers:['Yes','No','N/A']}]},
    { name: 'tab8', questions: [{ id: 1, question: 'Do you use GDRP ?', possibleAnswers: ['Yes', 'No', 'N/A'] }] },
    {
      name: 'tab9', questions: [{ id: 1, question: 'Do you use XXX ?', possibleAnswers: ['Yes', 'No', 'Not sure', 'N/A'] },
        { id: 2, question: 'Do you use A 2?', possibleAnswers: ['Yes', 'No', 'Not sure', 'N/A'] },
        {id:3,question:'Do you use A 3 ?', possibleAnswers:['Yes','No','N/A']}
      ]
    },
    { name: 'tab10', questions: [{ id: 1, question: 'Dopppppppp ?', possibleAnswers: ['Yes', 'No', 'N/A'] }] },

  ]);
    React.useEffect(() => {
        setKey('0')
    }, [])
  return (
    <div>
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
              <TabContent payload={{name:'sahan',key:key+1,questions:tab.questions }} ></TabContent>
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
}
