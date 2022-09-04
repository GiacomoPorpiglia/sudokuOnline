const myStatisticsReducer = (myStatistics = [], action) => {
    switch (action.type) {
        case 'GET_MY_STATISTICS':
            return action?.data?.myStatistics
        default:
            return myStatistics
    }
}

export default myStatisticsReducer