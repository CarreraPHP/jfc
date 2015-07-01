var chart2 = [{
    id: 'ch0001',
    name: 'Activity', 
    type: 'Activity',
    description: 'User is getting slow response',
    options: [{
        name: 'Always',
        impact: -1,
        charts: 'ch0001-ch0002'
    }]
}, {
    id: 'ch0001-ch0002',
    name: 'Activity', 
    type: 'Activity',
    description: [
        'Use Introscope <a href="https://google.com">to monitor the execution time</a> for queries, heap size, etc',
        'Use Introscope to monitor the execution time for queries, heap size, etc',
        'Use Introscope to monitor the execution time for queries, heap size, etc',
        'Use Introscope to monitor the execution time for queries, heap size, etc',
        'Use Introscope to monitor the execution time for queries, heap size, etc'
    ].join(' '),    
    options: [{
        name: 'Check',
        impact: -1,
        charts: 'ch0001-ch0002-ch0003'
    }, {
        name: 'Always',
        charts: 'ch0001-ch0002-ch0004'
    }, {
        name: 'rare',
        charts: 'ch0001-ch0002-ch0007'
    }]
}, {
    id: 'ch0001-ch0002-ch0003',
    name: 'Activity', 
    type: 'Activity',
    description: 'Check whether the utilization of the server is high',
    options: [{
        name: 'Always',
        impact: -1,
        charts: 'ch0001-ch0002-ch0003-ch0005'
    }, {
        name: 'Finish',
        impact: -1,
        charts: 'ch0001-ch0002-ch0003-ch0008'
    }]
}, {
    id: 'ch0001-ch0002-ch0004',
    name: 'Activity', 
    type: 'Activity',
    description: 'Nothing Here',
    options: [{
        name: 'next',
        charts: 'ch0001-ch0002-ch0003-ch0008'
    }]
}, {
    id: 'ch0001-ch0002-ch0003-ch0005',
    name: 'Activity', 
    type: 'Activity',
    description: 'Check whether the Query is taking more time',
    options: [{
        name: 'Always',
        impact: -1,
        charts: 'ch0001-ch0002-ch0003-ch0005-ch0006'
    }]
}, {
    id: 'ch0001-ch0002-ch0003-ch0005-ch0006',  
    name: 'Activity', 
    type: 'Activity',
    description: 'Try with different login id\'s and see if for all users getting slow response',
    options: [{
        name: 'Finish',
        charts: ''
    }]
}, {
    id: 'ch0001-ch0002-ch0007',  
    name: 'Activity', 
    type: 'Activity',
    description: 'Check dynamic behaviour of the flow chart',
    options: [{
        name: 'Working',
        charts: 'ch0001-ch0002-ch0003-ch0005-ch0006'
    }]
}, {
    id: 'ch0001-ch0002-ch0003-ch0008',
    name: 'Activity', 
    type: 'Activity',
    description: 'Check dynamic behaviour of the flow chart -2',
    options: [{
        name: 'Working',
        charts: ''
    }]
}];
