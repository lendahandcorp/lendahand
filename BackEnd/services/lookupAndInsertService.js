module.exports = {

    tagLookupAndInsert: async function (reqBodyTags) {
        // I'm expecting an array of objects here, the property title is mandatory

        const { Tag } = require('../models/tag')

        findMyTags = async() => {
            return await Tag.find()
        }

        insertMyTags = async(objectToInsert) => {
            return await Tag.insertMany(objectToInsert).catch(err => console.log(err))
        }
        
        let currentTagList = await findMyTags()

        let listOfExistingTags = currentTagList.filter(currentTag => reqBodyTags.some(reqBody => currentTag.title === reqBody.title))

        let tagsToInsert = reqBodyTags.filter(reqBodyTag => !currentTagList.some(currentTag => currentTag.title === reqBodyTag.title))

        // Im returning an array of objects here just as they are on mongo, just the current post tags are being returned
        if(tagsToInsert.length>0) {
            let listOfNewTags = await insertMyTags(tagsToInsert)
            return listOfExistingTags.concat(listOfNewTags)
        }
        else {
            return listOfExistingTags
        }

    }

}


