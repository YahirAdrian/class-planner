    
const user = {
    userId: "qwkhkjask1",
    userName: "Yahir",
    avatar: "",
    preferences:{
        panelOrder: ["schedule", "tasks", "notes"],
        language: "Es"
    }
}


const notes = [
    {
        id: "1",
        title: "First note",
        content: "Lorem ipsum dolor sit amet consectetur adispisicing elit sed do eiusmod labore et dolore manga aliqua",
        subjectId: "1",
        createdAt: "2023-12-19"
    },
    {
        id: "2",
        title: "Second note",
        content: "Lorem ipsum dolor sit amet consectetur adispisicing elit sed do eiusmod labore et dolore manga aliqua",
        subjectId: "2",
        createdAt: "2023-12-20"
    },
    {
        id: "3",
        title: "Third note",
        content: "Lorem ipsum dolor sit amet consectetur adispisicing elit sed do eiusmod labore et dolore manga aliqua",
        subjectId: "3",
        createdAt: "2024-01-20"
    }
]

const tasks = [
    {
        id: "1",
        name: "First task",
        subjectId: "1",
        deadline: "12-01-2024",
        important: false,
        completed: false
    },
    {
        id: "2",
        name: "Second task",
        subjectId: "2",
        deadline: "12-01-2024",
        important: false,
        completed: false
    },
    {
        id: "3",
        name: "Third task",
        subjectId: "2",
        deadline: "13-01-2024",
        important: true,
        completed: false
    },
]

const subjects = [
    {
        id: "1",
        name: "Subject 1",
        colorId: "1",
        schedule: [
            {
                day: "monday",
                timeStart: "8:00",
                timeEnd: "10:00"
            },
            {
                day: "wednesday",
                timeStart: "10:00",
                timeEnd: "12:00"
            },
        ]
    },
    {
        id: "2",
        name: "Subject 2",
        colorId: "2",
        schedule: [
            {
                day: "tuesday",
                timeStart: "12:00",
                timeEnd: "14:00"
            },
            {
                day: "wednesday",
                timeStart: "12:00",
                timeEnd: "14:00"
            },
        ]
    },
    {
        id: "3",
        name: "Subject 3",
        colorId: "3",
        schedule: [
            {
                day: "monday",
                timeStart: "14:00",
                timeEnd: "16:00"
            },
            {
                day: "firday",
                timeStart: "8:00",
                timeEnd: "10:00"
            },
        ]
    },
]


const events = [
    {
        id: "1",
        title: "First event",
        date: "12-01-2023",
        timeStart: "8:00",
        timeEnd: "11:00",
        important: true
    },
    {
        id: "2",
        title: "Second event",
        date: "10-01-2023",
        timeStart: "16:00",
        timeEnd: "19:00",
        important: false
    },
    {
        id: "3",
        title: "Third event",
        date: "11-01-2023",
        timeStart: "16:00",
        timeEnd: "19:00",
        important: true
    },
]