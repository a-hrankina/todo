import {Category} from '../model/Category';
import {Priority} from '../model/Priority';
import {Task} from '../model/Task';

export class TestData {

    static categories: Category[] = [
        {id: 1, title: 'Work'},
        {id: 2, title: 'Family'},
        {id: 3, title: 'Training'},
        {id: 4, title: 'Rest'},
        {id: 5, title: 'Sport'},
        {id: 6, title: 'Food'},
        {id: 7, title: 'Finance'},
        {id: 8, title: 'Gadgets'},
        {id: 9, title: 'Health'},
        {id: 10, title: 'Car'},
        {id: 11, title: 'Repair'},
    ];

    static priorities: Priority[] = [
        {id: 1, title: 'Low', color: '#e5e5e5'},
        {id: 2, title: 'Medium', color: '#85D1B2'},
        {id: 3, title: 'High', color: '#F1828D'},
        {id: 4, title: 'Urgent', color: '#F1128D'}
    ];

    static tasks: Task[] = [
        {
            id: 1,
            title: 'Fill a full tank with gas',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[9],
            date: new Date('2020-04-10')
        },
        {
            id: 2,
            title: 'Give reports to department head',
            priority: TestData.priorities[0],
            completed: false,
            category: TestData.categories[0],
            date: new Date('2020-04-11')
        },
        {
            id: 3,
            title: 'Sweep the floor, water the plants',
            priority: TestData.priorities[2],
            completed: true,
            category: TestData.categories[1]
        },
        {
            id: 4,
            title: 'Go to the park with family, invite friends',
            priority: TestData.priorities[1],
            completed: false,
            category: TestData.categories[1],
            date: new Date('2020-08-17')
        },
        {
            id: 5,
            title: 'Find and learn a lecture on quantum physics',
            completed: false,
            category: TestData.categories[2]
        },
        {
            id: 6,
            title: 'Go to a programming workshop',
            priority: TestData.priorities[1],
            completed: true,
            category: TestData.categories[2],
            date: new Date('2020-06-11')
        },
        {
            id: 7,
            title: 'Find tickets to Turkey, choose a hotel',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[3]
        },
        {
            id: 8,
            title: 'Cook dinner for the whole family',
            completed: false,
            category: TestData.categories[5]
        },
        {
            id: 9,
            title: 'Take up some sport ',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[4],
            date: new Date('2020-03-12')
        },
        {
            id: 10,
            title: 'Run the 100 meters',
            priority: TestData.priorities[0],
            completed: true,
            category: TestData.categories[4]
        },
        {
            id: 11,
            title: 'Organize children\'s celebrations.',
            completed: false
        },
        {
            id: 12,
            title: 'Go to the lecture "How to learn to program in Angular"',
            priority: TestData.priorities[1],
            completed: false,
            category: TestData.categories[2]
        },
        {
            id: 13,
            title: 'Buy products for the week',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[5],
            date: new Date('2020-05-11')
        },
        {
            id: 14,
            title: 'Schedule a meeting next Tuesday',
            completed: true,
            category: TestData.categories[0]
        },
        {
            id: 15,
            title: 'Pass the Angular exam',
            priority: TestData.priorities[2],
            completed: true
        },
        {
            id: 16,
            title: 'Put $ 100,000 in a bank deposit',
            priority: TestData.priorities[3],
            completed: false,
            category: TestData.categories[6]
        },
        {
            id: 17,
            title: 'Ask for an advance at work',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[6]
        },
        {
            id: 18,
            title: 'Take tests, check hemoglobin',
            priority: TestData.priorities[3],
            completed: false,
            category: TestData.categories[8],
            date: new Date('2020-12-11')
        },
        {
            id: 19,
            title: 'Compare the new iPad with Samsung',
            priority: TestData.priorities[0],
            completed: false,
            category: TestData.categories[7],
            date: new Date('2020-10-11')
        },
        {
            id: 20,
            title: 'Football with employees',
            priority: TestData.priorities[0],
            completed: false,
            category: TestData.categories[4],
            date: new Date('2020-03-17')
        }
    ];
}

