
function insureUtils(modules, _id, callback) {
    _id = _id.split('-')
    const mID = parseInt(_id[0])
    const attrID = parseInt(_id[1])
    modules.map((item) => {
        let productAttrs = item.productAttrs
        if (item.id === mID) {
            return productAttrs.map((subItem) => {
                if (subItem.attributeId === attrID) {
                    subItem = callback(item)
                }
                return subItem
            })

        }
        return item
    })
    return modules
}
/**
 * 约束
 * @param {*} modules 
 * @param {*} restricts 
 */
function restricts(modules, restricts) {
    restricts.forEach(function (resItem) {
        const executeType = resItem.executeType;
    })
}
export { insureUtils, restricts }