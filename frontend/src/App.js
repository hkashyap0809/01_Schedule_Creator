import { useState } from 'react';
import './App.css';

function App() {
  const [eventList, setEventList] = useState([
    { description: '', category: '', eventStartTime: '', duration: '' },
  ]);

  const handleEventChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...eventList];
    list[index][name] = value;
    setEventList(list);
  };

  const handleEventRemove = (index) => {
    const list = [...eventList];
    list.splice(index, 1);
    setEventList(list);
  };

  const handleEventAdd = () => {
    setEventList([...eventList, { service: '' }]);
  };

  return (
    <form className='App' autoComplete='off'>
      <h1> SCHEDULE CREATOR</h1>
      <div className='form-field'>
        <label>START TIME : </label>
        <input name='startTime' placeholder='START TIME' /> <br />
        <label>END TIME : </label>
        <input name='endTime' placeholder='END TIME' /> <br />
        <label>EVENT DATE : </label>
        <input name='date' placeholder='DATE' /> <br />
        <label>NO OF BREAKS : </label>
        <input name='noOfBreaks' placeholder='NO OF BREAKS' /> <br />
        <label>DURATION OF BREAKS : </label>
        <input name='durationOfBreak' placeholder='DURATION OF BREAK' />
        <br />
        <label>LUNCH BREAK : </label>
        <input type='checkbox' name='lunchBreak' placeholder='LUNCH BREAK' />
        <br />
        <label>DURATION OF LUNCH BREAK : </label>
        <input
          name='durationOfLunchBreak'
          placeholder='DURATION OF LUNCH BREAK'
        />
        <br /> <br /> <br />
        <label htmlFor='events'>EVENT DETAILS</label>
        {eventList.map((singleEvent, index) => (
          <div key={index} className='services'>
            <span className='first-division'>
              <a style={{ marginLeft: '5px' }}> </a>
              <input
                name='description'
                type='text'
                id='description'
                placeholder='DESCRIPTION'
                value={singleEvent.description}
                onChange={(e) => handleEventChange(e, index)}
                required
              />
              <a style={{ marginLeft: '5px' }}> </a>
              <input
                name='category'
                type='text'
                id='category'
                value={singleEvent.category}
                placeholder='CATEGORY'
                onChange={(e) => handleEventChange(e, index)}
                required
              />
              <a style={{ marginLeft: '5px' }}> </a>
              <input
                name='eventStartTime'
                type='text'
                id='eventStartTime'
                value={singleEvent.eventStartTime}
                placeholder='START TIME'
                onChange={(e) => handleEventChange(e, index)}
                required
              />
              <a style={{ marginLeft: '5px' }}> </a>
              <input
                name='duration'
                type='number'
                id='duration'
                value={singleEvent.duration}
                placeholder='DURATION (in minutes)'
                onChange={(e) => handleEventChange(e, index)}
                required
              />
              <br />
            </span>
            <span className='second-division'>
              {eventList.length !== 1 && (
                <button
                  type='button'
                  onClick={() => handleEventRemove(index)}
                  className='remove-btn'
                >
                  <span>Remove</span>
                </button>
              )}
              <br />
              {eventList.length - 1 === index && eventList.length < 10 && (
                <button
                  type='button'
                  onClick={handleEventAdd}
                  className='add-btn'
                >
                  <span>Add an Event</span>
                </button>
              )}
            </span>
          </div>
        ))}
      </div>
      {/* <div className='output'>
        <h2>Output</h2>
        {serviceList &&
          serviceList.map((singleService, index) => (
            <ul key={index}>
              {singleService.service && <li>{singleService.service}</li>}
            </ul>
          ))}
      </div> */}
    </form>
  );
}

export default App;
