var xlsx = require('xlsx')
//const jsonObject = require('./dataJ.json')

const jsonObject =[
    {description: 'theory of mechanics',category: 'academic',startTime: '12:00',duration: 60},
    {description: 'Hockey',category: 'sports',startTime: '16:00',duration: 100},
    {description: 'Seminar by Jay black',category: 'seminar',startTime: '13:00',duration: 60},
    {description: 'High Tea',category: 'others',startTime: '16:00',duration: 25},
    {description: 'Cult Night',category: 'cultural',startTime: '21:00',duration: 180},
    {description: 'Game Theory',category: 'academic',startTime: '13:00',duration: 60},
    {description: 'Cricket',category: 'sports',startTime: '12:00',duration: 120},
    {description: 'Seminar by frank',category: 'seminar',startTime: '11:00',duration: 60},
    {description: 'Open House Discussion',category: 'other',startTime: '10:00',duration: 90},
    {description: 'Rangoli',category: 'cultural',startTime: '09:00',duration: 30},
    {description: 'Design thinking',category: 'academic',startTime: '10:00',duration: 60},
    {description: 'Night Cricket',category: 'sports',startTime: '21:00',duration: 60},
    {description: 'Tradition dress Ramp Walk',category: 'cultural',startTime: '15:30',duration: 30}, 
    {description: 'Seminar on Simple science',category: 'seminar',startTime: '20:00',duration: 60}
]
var workbook = xlsx.utils.book_new()
var worksheet = xlsx.utils.json_to_sheet(jsonObject)
xlsx.utils.book_append_sheet(workbook,worksheet)
xlsx.writeFile(workbook,"convertedJsontoExcel.xlsx")