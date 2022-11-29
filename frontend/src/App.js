import React from 'react';
import { useState, useReducer, createContext } from 'react';
import './App.css';
import { ScheduleCreator } from './ScheduleCreator';

export const EventContext = createContext();

const initialState = {
  startTime: '00:00',
  endTime: '23:00',
  eventDate: new Date().toISOString().slice(0, 10),
  // lunchbreak: true,
  // durationOfLunchBreak: 50,
  events: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setStartTime':
      return { ...state, startTime: action.payload };
    case 'setEndTime':
      return { ...state, endTime: action.payload };
    case 'setEventDate':
      return { ...state, eventDate: action.payload };
    case 'updateEvents':
      return { ...state, events: action.payload };
    default:
      return state;
  }
};

function App() {
  const [eventDetails, dispatch] = useReducer(reducer, initialState);
  const [eventList, setEventList] = useState([
    {
      description: '',
      category: 'academics',
      eventStartTime: '24:00',
      duration: 0,
      afterBreak: 0,
    },
  ]);

  const setStartTime = (value) => {
    let hr = value.split(':')[0];
    let min = Number(value.split(':')[1]);
    min = Math.ceil(min / 5) * 5;
    if (min < 10) min = '0' + String(min);
    else min = String(min);
    value = hr + ':' + min;

    dispatch({ type: 'setStartTime', payload: value });
  };
  const setEndTime = (value) => {
    let hr = value.split(':')[0];
    let min = Number(value.split(':')[1]);
    min = Math.ceil(min / 5) * 5;
    if (min < 10) min = '0' + String(min);
    else min = String(min);
    value = hr + ':' + min;
    dispatch({ type: 'setEndTime', payload: value });
  };
  const setDate = (value) => {
    dispatch({ type: 'setEventDate', payload: value });
  };

  // const handleEventChange = (e, index) => {
  //   const { name, value, description } = e.target;
  //   const list = [...eventList];
  //   list[index][name] = value;
  //   setEventList(list);
  // };

  const handleEventDescriptionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...eventList];
    list[index][name] = value;
    setEventList(list);
  };
  const handleEventCategoryChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...eventList];
    list[index][name] = value;
    setEventList(list);
  };

  const handleEventDurationChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...eventList];
    list[index][name] = value;
    setEventList(list);
  };

  const handleEventStartTimeChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...eventList];
    list[index][name] = value;
    setEventList(list);
  };

  const handleAfterBreakChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...eventList];
    list[index][name] = value;
    setEventList(list);
  };

  const handleEventRemove = (index) => {
    const list = [...eventList];
    list.splice(index, 1);
    setEventList(list);
    dispatch({ type: 'updateEvents', payload: list });
  };

  const handleEventAdd = () => {
    let updatedEventsList = [
      ...eventList,
      {
        description: '',
        category: 'academics',

        duration: 0,
        afterBreak: 0,
      },
    ];
    setEventList(updatedEventsList);
    dispatch({ type: 'updateEvents', payload: updatedEventsList });
  };

  // const generateSchedule = (e) => {
  //   e.preventDefault();
  //   console.log(eventDetails);
  //   console.log('generate schedule');
  //   setScheduleCreated(true);
  // };

  return (
    <EventContext.Provider value={eventDetails}>
      <h1 id='schedule-creator'> SCHEDULE CREATOR</h1>
      <form className='App' autoComplete='off'>
        <div className='form-field'>
          <table id='schedule-creator-table'>
            <th>
              <label htmlFor='startTime'>START TIME : </label>
            </th>
            <th>
              <input
                name='startTime'
                placeholder='START TIME'
                value={eventDetails.startTime}
                type='time'
                step='300'
                onChange={(e) => setStartTime(e.target.value)}
              />
            </th>
            <th>
              <label htmlFor='endTime'>END TIME : </label>
            </th>
            <th>
              <input
                name='endTime'
                placeholder='END TIME'
                value={eventDetails.endTime}
                type='time'
                step='300'
                onChange={(e) => setEndTime(e.target.value)}
              />
            </th>
            <th>
              <label htmlFor='eventDate'>EVENT DATE : </label>
            </th>
            <th>
              <input
                name='date'
                placeholder='DATE'
                value={eventDetails.eventDate}
                type='date'
                onChange={(e) => setDate(e.target.value)}
              />
            </th>
          </table>
          <br /> <br />
          <h2 id='event-details'> EVENT DETAILS</h2>
          <table id='schedule-creator-table'>
            <tr>
              <th>Event No.</th>
              <th>Event Description</th>
              <th>Event Category</th>
              <th>Start Time (optional)</th>
              <th>Duration (in min)</th>
              <th>After Event Break (in min)</th>
            </tr>
            {eventList.map((singleEvent, index) => (
              <>
                <tr key={index}>
                  <th>{index + 1}</th>
                  <th>
                    <input
                      name='description'
                      type='text'
                      id='description'
                      placeholder='DESCRIPTION'
                      value={singleEvent.description}
                      onChange={(e) => handleEventDescriptionChange(e, index)}
                      required
                    />
                  </th>

                  <th>
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
                  </th>

                  <th>
                    <input
                      name='eventStartTime'
                      type='time'
                      id='eventStartTime'
                      value={singleEvent.eventStartTime}
                      placeholder='START TIME'
                      onChange={(e) => handleEventStartTimeChange(e, index)}
                    />
                  </th>

                  <th>
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
                  </th>
                  <th>
                    <input
                      name='afterBreak'
                      type='number'
                      id='afterBreak'
                      min='0'
                      step='5'
                      value={singleEvent.afterBreak}
                      placeholder='after break (in minutes)'
                      onChange={(e) => handleAfterBreakChange(e, index)}
                      required
                    />
                  </th>
                  <th>
                    <span className='second-division'>
                      {eventList.length !== 1 && (
                        <button
                          type='button'
                          onClick={() => handleEventRemove(index)}
                          className='remove-btn'
                        >
                          <i
                            id='delete-button-style'
                            className='fa fa-trash'
                            aria-hidden='true'
                          ></i>
                        </button>
                      )}
                    </span>
                  </th>
                </tr>
                <tr>
                  <div>
                    {eventList.length - 1 === index && eventList.length < 30 && (
                      <button
                        type='button'
                        onClick={handleEventAdd}
                        className='add-btn'
                      >
                        <i
                          id='add-button-style'
                          className='fa fa-plus fa-2x'
                          aria-hidden='true'
                        ></i>
                      </button>
                    )}
                  </div>
                </tr>
              </>
            ))}
          </table>
        </div>
      </form>
      <ScheduleCreator />
    </EventContext.Provider>
  );
}

export default App;
