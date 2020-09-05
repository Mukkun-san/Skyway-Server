let isEmpty = require('is-empty')
let Package = require('../../modals/packages/package')
const searchQueryValidator = require('../../validator/SearchQueryValidator')

let router = require('express').Router()

router.get('/:query', async (req, res) => {
    let query = req.params.query

    try {
        let srch = await Package.find()

        let final_res = []

        for (let i = 0; i < srch.length; i++) {
            let name = srch[i].packageName
            let place = srch[i].place

            let words = name.split(' ')

            if (place.toUpperCase().trim().startsWith(query.toUpperCase())) {
                final_res.push({
                    name: name,
                    id: srch[i]._id,
                })
            }

            for (let j = 0; j < words.length; j++) {
                if (words[j].toUpperCase().startsWith(query.toUpperCase())) {
                    final_res.push({
                        name: name,
                        id: srch[i]._id,
                    })
                }
            }
        }

        res.send(final_res)
    } catch (ex) {
        console.log(ex)
    }

    if (isEmpty(query)) {
        return res.send(200).json({
            msg: 'There was no sarch query provided',
            result: false,
        })
    }
})

//Query Search
router.get('/querySearch', async (req, res, next) => {
    try {
        let allPackages = await Package.find()

        let final_filter = []

        for (let i = 0; i < allPackages.length(); i++) {
            let currentPackage = allPackages[i]
        }
    } catch (ex) {
        next(ex)
    }
})

module.exports = router
