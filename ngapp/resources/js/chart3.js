var chart = [{
    id: 'ch0001',
    name: 'User is getting slow response',
    description: '',
    options: [{
        name: 'Always',
        impact: -1,
        charts: 'ch0001-ch0002'
    }]
}, {
    id: 'ch0001-ch0002',
    name: [
        'Use Introscope <a href="https://google.com">to monitor the execution time</a> for queries, heap size, etc',
        'Use Introscope to monitor the execution time for queries, heap size, etc',
        'Use Introscope to monitor the execution time for queries, heap size, etc',
        'Use Introscope to monitor the execution time for queries, heap size, etc',
        'Use Introscope to monitor the execution time for queries, heap size, etc'
    ].join(' '),
    description: '',
    options: [{
        name: 'Check',
        impact: -1,
        charts: 'ch0001-ch0002-ch0003-ch0008'
    }, {
        name: 'Always',
        charts: 'ch0001-ch0002-ch0004'
    }, {
        name: 'rare',
        charts: 'ch0001-ch0002-ch0007'
    }]
}, {
    id: 'ch0001-ch0002-ch0003',
    name: 'Check whether the utilization of the server is high',
    description: '',
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
    name: 'Nothing Here',
    description: '',
    options: [{
        name: 'next',
        charts: 'ch0001-ch0002-ch0003-ch0008'
    }]
}, {
    id: 'ch0001-ch0002-ch0003-ch0005',
    name: 'Check whether the Query is taking more time',
    description: '',
    options: [{
        name: 'Always',
        impact: -1,
        charts: 'ch0001-ch0002-ch0003-ch0005-ch0006'
    }]
}, {
    id: 'ch0001-ch0002-ch0003-ch0005-ch0006',  
    name: 'Try with different login id\'s and see if for all users getting slow response',
    description: '',
    options: [{
        name: 'Finish',
        charts: ''
    }]
}, {
    id: 'ch0001-ch0002-ch0007',  
    name: 'Check dynamic behaviour of the flow chart',
    description: '',
    options: [{
        name: 'Working',
        charts: 'ch0001-ch0002-ch0003-ch0005-ch0006'
    }]
}, {
    id: 'ch0001-ch0002-ch0003-ch0008',
    name: 'Check dynamic behaviour of the flow chart -2',
    description: '',
    options: [{
        name: 'Working',
        charts: ''
    }]
}];
