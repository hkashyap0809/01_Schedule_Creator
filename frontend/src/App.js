import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './App.css';

function App() {
  const [eventList, setEventList] = useState([
    { description: '', category: '', eventStartTime: '', duration: '' },
  ]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [noOfBreaks, setNoOfBreaks] = useState('');
  const [durationOfBreaks, setDurationOfBreaks] = useState('');
  const [durationOfLunchBreak, setDurationOfLunchBreak] = useState('');
  const [lunchBreak, setLunchBreak] = useState(false);

  const handleEventChange = (e, index) => {
    const { name, value, description } = e.target;
    console.log(e.target.value);
    console.log(description);
    const list = [...eventList];
    list[index][name] = value;
    setEventList(list);
  };

  const handleEventDescriptionChange = (e, index) => {
    const { name, value } = e.target;
    console.log(name + ' ' + value + ' ' + index);
    const list = [...eventList];
    list[index][name] = value;
    setEventList(list);
  };
  const handleEventCategoryChange = (e, index) => {
    const { name, value } = e.target;
    console.log(name + ' ' + value + ' ' + index);
    const list = [...eventList];
    list[index][name] = value;
    setEventList(list);
  };

  const handleEventDurationChange = (e, index) => {
    const { name, value } = e.target;
    console.log(name + ' ' + value + ' ' + index);
    const list = [...eventList];
    list[index][name] = value;
    setEventList(list);
  };

  const handleEventStartTimeChange = (e, index) => {
    const { name, value } = e.target;
    console.log(name + ' ' + value + ' ' + index);
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
    setEventList([
      ...eventList,
      { description: '', category: '', eventStartTime: '', duration: '' },
    ]);
  };

  return (
    <form className='App' autoComplete='off'>
      <h1> SCHEDULE CREATOR</h1>
      <div className='form-field'>
        <label htmlFor='startTime'>START TIME : </label>
        <input
          name='startTime'
          placeholder='START TIME'
          value={startTime}
          type='time'
          onChange={(e) => setStartTime(e.target.value)}
        />
        <br />
        <label htmlFor='endTime'>END TIME : </label>
        <input
          name='endTime'
          placeholder='END TIME'
          value={endTime}
          type='time'
          onChange={(e) => setEndTime(e.target.value)}
        />{' '}
        <br />
        <label htmlFor='eventDate'>EVENT DATE : </label>
        <input
          name='date'
          placeholder='DATE'
          value={eventDate}
          type='date'
          onChange={(e) => setEventDate(e.target.value)}
        />{' '}
        <br />
        <label htmlFor='noOfBreaks'>NO OF BREAKS : </label>
        <input
          name='noOfBreaks'
          placeholder='NO OF BREAKS'
          value={noOfBreaks}
          type='number'
          onChange={(e) => setNoOfBreaks(e.target.value)}
        />{' '}
        <br />
        <label htmlFor='durationOfBreaks'>DURATION OF BREAKS : </label>
        <input
          name='durationOfBreaks'
          placeholder='DURATION OF BREAK'
          value={durationOfBreaks}
          type='number'
          min='0'
          onChange={(e) => setDurationOfBreaks(e.target.value)}
        />
        <br />
        <label>LUNCH BREAK : </label>
        <input
          type='checkbox'
          name='lunchBreak'
          placeholder='LUNCH BREAK'
          value={lunchBreak}
          checked={lunchBreak}
          onChange={(e) => setLunchBreak(e.target.value)}
        />
        <br />
        <label htmlFor='durationOfLunchBreak'>DURATION OF LUNCH BREAK : </label>
        <input
          name='durationOfLunchBreak'
          placeholder='DURATION OF LUNCH BREAK'
          value={durationOfLunchBreak}
          type='number'
          min='0'
          onChange={(e) => setDurationOfLunchBreak(e.target.value)}
        />
        <br /> <br />
        <label htmlFor='events'>EVENT DETAILS</label>
        {eventList.map((singleEvent, index) => (
          <div key={index} className='events'>
            <span className='first-division'>
              <a style={{ marginLeft: '5px' }}> </a>
              <label>Description </label>
              <input
                name='description'
                type='text'
                id='description'
                placeholder='DESCRIPTION'
                value={singleEvent.description}
                onChange={(e) => handleEventDescriptionChange(e, index)}
                required
              />
              <a style={{ marginLeft: '5px' }}> </a>
              <label>Category </label>
              <select
                name='category'
                value={singleEvent.category}
                onChange={(e) => handleEventCategoryChange(e, index)}
              >
                <option value='academics'>Academics</option>
                <option value='sports'>Sports</option>
                <option value='cultural'>Cultural</option>
                <option value='seminar'>Seminar</option>
                <option value='others'>Others</option>
              </select>
              <a style={{ marginLeft: '5px' }}> </a>
              <label>Start time (optional)</label>
              <input
                name='eventStartTime'
                type='time'
                id='eventStartTime'
                value={singleEvent.eventStartTime}
                placeholder='START TIME'
                onChange={(e) => handleEventStartTimeChange(e, index)}
                required
              />
              <a style={{ marginLeft: '5px' }}> </a>
              <label>Duration(optional) </label>
              <input
                name='duration'
                type='number'
                id='duration'
                min='0'
                value={singleEvent.duration}
                placeholder='DURATION (in minutes)'
                onChange={(e) => handleEventDurationChange(e, index)}
                required
              />
            </span>
            <span style={{ marginLeft: '10px' }}> </span>
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
