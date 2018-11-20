import { Restricts } from "./restricts";

const setModulesValueById = function (modules = [], id, value) {
    let ids = id.split('-')
    let mId = parseInt(ids[0], 10)
    let aId = parseInt(ids[1], 10)

    modules = modules.map((modulesItem) => {
        let productAttrs = modulesItem.productAttrs
        if (mId === modulesItem.id) {

            productAttrs = productAttrs.map((productAttrsItem) => {
                let attribute = productAttrsItem.attribute
                if (aId === attribute.id) {
                    console.log(modulesItem.name, attribute.name, value)
                    productAttrsItem.attribute.defaultValue = value
                }
                return productAttrsItem
            })
        }
        return modulesItem
    })
    return modules
}

export { Restricts, setModulesValueById }