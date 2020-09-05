const isEmpty = require('is-empty')

function searchQueryValidator(query) {
    let problems = []

    if (isEmpty(query)) {
        problems.push('These is no query provided')

        if (isEmpty(query.fromDate)) {
            problems.push('There is no from date provided')
        }

        if (isEmpty(query.toDate)) {
            problems.push('These is no to date provided')
        }

        if (isEmpty(query.destinations)) {
            problems.push('There is no destinations provided')
        }

        if (isEmpty(query.days)) {
            problems.push('There is no days provided')
        }
    }

    if (problems.length === 0) {
        return {
            result: true,
            problems: problems,
        }
    } else {
        return {
            result: false,
            problems: null,
        }
    }
}
module.exports = searchQueryValidator
