import { store } from "../../utils/storage";
/**
 * 
 */
class Restricts {
    constructor(props) {

        //this.modules = JSON.stringify(props.modules)
        //this.modules = JSON.parse(this.modules)
        this.modules = props.modules
        this.restricts = Array.isArray(props.restricts) ? props.restricts : []
        this.init()

    }
    init() { }

    __event() {

    }
    _cale(a, b, conditions) {
        switch (conditions) {
            case 0: //大于
                return a > b
            case 1://大于等于
                return a >= b
            case 2://小于
                return a < b
            case 3://小于等于
                return a <= b
            case 4: //不等于
                return a !== b
            case 5: //等于
                return a === b
            default:
        }
    }
    __toString(val) {
        return ((val === undefined || val === null) ? '' : val).toString()
    }
    filterValuesByConditions(values = [], conditions, source = [], unit = 0) {
        let _conditions
        /**
         * 根据条件返回状态
         * @param {原始值} a 
         * @param {比较值} b 
         * @param {运算关系} conditions 
         */

        _conditions = conditions

        if (conditions === 0 ||
            conditions === 1 ||
            conditions === 2 ||
            conditions === 3 ||
            conditions === 4) {
            _conditions = 5
        }

        if (conditions === 5 ||
            conditions === 6) {
            _conditions = 6
        }

        switch (_conditions) {
            case 0: //大于               
                break
            case 1: //大于等于
                break
            case 2: //小于
                break
            case 3: //小于等于
                break
            case 4: //不等于 
                break
            case 5: //等于

                if (unit === 0) {
                    values = values.map((valuesItem) => {
                        var status = false
                        source.forEach((sItem) => {
                            status = this._cale(_conditions)
                        })
                        if (status) {
                            return valuesItem
                        }
                    })
                }
                break
            case 6: //包含

                if (unit === 0) {


                    values = values.map((valuesItem) => {
                        //console.log(source, this.__toString(valuesItem.controlValue));
                        if (source.indexOf(this.__toString(valuesItem.controlValue)) !== -1) {
                            console.log('sourceList', values, valuesItem.controlValue)
                            return valuesItem
                        }
                    })
                }
                break
            case 7: //不包含
                break
            case 8: //提示
                break
            case 9: //隐藏
                break
            default:
                break
        }
        values = values.filter(item => {
            return item !== undefined
        })
        //console.log('values', values);

        return values
    }

    /**
     * 获取条件约束状态
     */
    getExecuteStatus(executes = [], executeType) {
        let status = false


        executes.forEach((executesItem) => {
            let executesStatus = true
            const conditions = executesItem.conditions
            const unit = executesItem.unit
            const value = executesItem.value
            if (status) {
                return
            }
            this.modules.forEach((modulesItem) => {
                let productAttrs = modulesItem.productAttrs

                productAttrs.forEach((productAttrsItem) => {
                    let attribute = productAttrsItem.attribute
                    let defaultValue = attribute.defaultValue

                    if (
                        executesItem.moduleId === modulesItem.id &&
                        executesItem.attributeId === productAttrsItem.attributeId
                    ) {
                        if (Array.isArray(defaultValue)) {
                            defaultValue = defaultValue[0]
                            defaultValue = this.__toString(defaultValue)
                        }
                        if (conditions <= 5) {
                            if (executeType === 0) {//满足所有条件才执行
                                if (!this._cale(defaultValue, value, conditions)) {
                                    executesStatus = false
                                    console.log(defaultValue, value);

                                }

                            } else if (executeType === 1) {//满足一个条件就执行
                                status = this._cale(defaultValue, value, conditions)
                            }
                        }


                    }
                })

            })
            status = executesStatus
        })
        console.log('executesStatus', executes, status)

        return status
    }

    runResult(results = []) {
        results.forEach((restrictsItem) => {

            let rModuleId = parseInt(restrictsItem.moduleId, 10)
            let rAttributeId = parseInt(restrictsItem.attributeId, 10)
            let conditions = parseInt(restrictsItem.conditions, 10)
            let unit = parseInt(restrictsItem.unit, 10)
            let value = restrictsItem.value || ''
            let valueAttr = value.split(',')
            if (restrictsItem.restrictId !== 26127) {
                //return
            }

            this.modules = this.modules.map((modulesItem, modueleIndex) => {

                let modulesId = parseInt(modulesItem.id, 10)
                //moduele id and attribulte id
                modulesItem.productAttrs = modulesItem.productAttrs.map((productAttrsItem, productAttrsIndex) => {

                    let mAttribulte = parseInt(productAttrsItem.attributeId, 10)
                    let values = productAttrsItem.attribute.values
                    try {
                        // values = store.get('modules')[modueleIndex].productAttrs[productAttrsIndex].attribute.values
                    } catch (error) {

                    }
                    if (
                        rModuleId === modulesId &&
                        rAttributeId === mAttribulte
                    ) {


                        if (unit === 0) {
                            console.log('values', values);

                            productAttrsItem.attribute.values = this.filterValuesByConditions(values, conditions, valueAttr)

                        }
                    }
                    return productAttrsItem
                })
                return modulesItem
            })


        })
    }
    /**
     * executeType
     * type: 0——一般约束；1——默认约束；
     */
    cale() {

        this.restricts.forEach((restrictsItem) => {
            let executes = restrictsItem.executes
            let results = restrictsItem.results
            let type = restrictsItem.type
            let executeType = restrictsItem.executeType
            let _type = ''
            if (1 === type) {
                _type = '默认约束'
                this.runResult(results)
            } else if (0 === type) {
                _type = '一般约束'
                if (this.getExecuteStatus(executes, executeType)) {
                    this.runResult(results)
                }
            }
            console.log(_type)
        })
        return this.modules
    }
}
export { Restricts }