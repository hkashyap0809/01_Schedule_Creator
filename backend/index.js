let inputData = {
  startTime: '09:00',
  endTime: '23:30',
  date: '2022-10-27',
  noOfBreaks: 4,
  durationOfBreak: 5,
  lunchBreak: true,
  durationOfLunchBreak: 50,
  events: [
    {
      description: 'theory of mechanics',
      category: 'academic',
      eventStartTime: '17:00',
      duration: 260,
    },
    {
      description: 'Hockey',
      category: 'sports',
      eventStartTime: '14:00',
      duration: 100,
    },
    {
      description: 'Seminar by Jay black',
      category: 'seminar',
      eventStartTime: '13:00',
      duration: 60,
    },
    {
      description: 'High Tea',
      category: 'others',
      eventStartTime: '16:00',
      duration: 25,
    },
    {
      description: 'Cult Night',
      category: 'cultural',
      eventStartTime: '21:00',
      duration: 180,
    },
    {
      description: 'Automata Theory',
      category: 'academic',
      eventStartTime: '13:00',
      duration: 60,
    },
    {
      description: 'Cricket',
      category: 'sports',
      eventStartTime: '12:00',
      duration: 120,
    },
    {
      description: 'Seminar by frank',
      category: 'seminar',
      eventStartTime: '11:00',
      duration: 60,
    },
    {
      description: 'Open House Discussion',
      category: 'other',
      eventStartTime: '10:00',
      duration: 90,
    },
    {
      description: 'Rangoli',
      category: 'cultural',
      eventStartTime: '09:00',
      duration: 30,
    },
    {
      description: 'Design thinking',
      category: 'academic',
      eventStartTime: '10:00',
      duration: 60,
    },
    {
      description: 'Pattern thinking',
      category: 'academic',
      eventStartTime: '17:00',
      duration: 160,
    },
    {
      description: 'Night Cricket',
      category: 'sports',
      eventStartTime: '12:00',
      duration: 60,
    },
    {
      description: 'Tradition dress Ramp Walk',
      category: 'cultural',
      eventStartTime: '15:30',
      duration: 30,
    },

    {
      description: 'Seminar on Simple science',
      category: 'seminar',
      eventStartTime: '20:00',
      duration: 60,
    },
  ],
};

console.log(inputData);
console.log(inputData.startTime);
starTimeHour = parseInt(inputData.startTime.split(':')[0]);
endTimeHour = parseInt(inputData.endTime.split(':')[0]);

starTimeMin = parseInt(inputData.startTime.split(':')[1]);
endTimeMin = parseInt(inputData.endTime.split(':')[1]);

totaHours = (endTimeHour - starTimeHour) * 60;
totalMin = endTimeMin - starTimeMin;
totalTime = totaHours + totalMin;

slots = totalTime / inputData.durationOfBreak;
console.log(totalTime);
console.log(slots);
console.log('Yeah');
console.log(inputData.events[0].category);

academic = [];
sports = [];
seminar = [];
others = [];
cultural = [];
others = [];

for (let i = 0; i < inputData.events.length; i++) {
  //  console.log(inputData.events[i]);

  if (inputData.events[i].category === 'academic') {
    academic.push(inputData.events[i]);
  } else if (inputData.events[i].category === 'sports') {
    sports.push(inputData.events[i]);
  } else if (inputData.events[i].category === 'seminar') {
    seminar.push(inputData.events[i]);
  } else if (inputData.events[i].category === 'others') {
    others.push(inputData.events[i]);
  } else if (inputData.events[i].category === 'cultural') {
    cultural.push(inputData.events[i]);
  }
}

function compare(a, b) {
  if (a.eventStartTime < b.eventStartTime) {
    return -1;
  }
  if (a.eventStartTime > b.eventStartTime) {
    return 1;
  }

  if (a.eventStartTime == b.eventStartTime) {
    if (a.duration < b.duration) {
      return -1;
    } else {
      return 1;
    }
  }
  return 0;
}

//   console.log(sports)

academic.sort(compare);
sports.sort(compare);
seminar.sort(compare);
others.sort(compare);
cultural.sort(compare);

combinedList = [];

for (let i = 0; i < academic.length; i++) {
  combinedList.push(academic[i]);
}
for (let i = 0; i < sports.length; i++) {
  combinedList.push(sports[i]);
}

for (let i = 0; i < seminar.length; i++) {
  combinedList.push(seminar[i]);
}

for (let i = 0; i < others.length; i++) {
  combinedList.push(others[i]);
}

for (let i = 0; i < cultural.length; i++) {
  combinedList.push(cultural[i]);
}

combinedList.sort(compare);

combinedList.sort(compare);
console.log(combinedList);

console.log(academic);
console.log(sports);
console.log(seminar);
console.log(others);
console.log(cultural);
console.log(others);

let scheduleArray = new Array(slots);
