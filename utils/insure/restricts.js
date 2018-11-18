class Restricts {
    constructor(props) {
        //console.log(props);
        this.modules = JSON.stringify(props.modules);
        this.modules = JSON.parse(this.modules);
        this.restricts = Array.isArray(props.restricts) ? props.restricts : [];
        this.init();
    }
    init() { }

    cale(executeType) {
        this.restricts.forEach((restrictsItem) => {
            let executes = restrictsItem.executes;
            let results = restrictsItem.results;
            let _type = '';
            if (0 === executeType) {
                //_type = '默认约束';
                results.forEach((restrictsItem) => {

                    let rModuleId = parseInt(restrictsItem.moduleId, 10);
                    let rAttributeId = parseInt(restrictsItem.attributeId, 10);
                    let conditions = parseInt(restrictsItem.conditions, 10);
                    let unit = parseInt(restrictsItem.unit, 10);
                    let value = restrictsItem.value || '';
                    let valueAttr = value.split(',');

                    this.modules = this.modules.map((modulesItem) => {

                        let modulesId = parseInt(modulesItem.id, 10);
                        //moduele id and attribulte id
                        modulesItem.productAttrs = modulesItem.productAttrs.map((productAttrsItem) => {

                            let mAttribulte = parseInt(productAttrsItem.attributeId, 10);


                            if (
                                rModuleId === modulesId &&
                                rAttributeId === mAttribulte
                            ) {
                                //console.log(rModuleId, modulesId, rAttributeId, mAttribulte);
                                switch (conditions) {

                                    case 6://包含
                                        if (unit === 0) {
                                            productAttrsItem.attribute.values = productAttrsItem.attribute.values.map((valuesItem) => {
                                                if (valueAttr.indexOf(valuesItem.controlValue.toString()) !== -1) {//
                                                    return valuesItem;
                                                }
                                            });
                                            productAttrsItem.attribute.values = productAttrsItem.attribute.values.filter(item => {
                                                return item;
                                            });
                                            console.log('values', productAttrsItem.attribute.values, valueAttr)
                                        }
                                        break;

                                    default:
                                        break;
                                }
                            }
                            return productAttrsItem;
                        });
                        return modulesItem;
                    });


                });
            } else if (1 === executeType) {
                _type = '一般约束';
                executes.forEach((executesItem) => {

                });
            }
            console.log(1, _type);
        })
        console.log(this.modules[0].productAttrs[1].attribute.values.length, 'length');
        return this.modules;
    }
}
export { Restricts }