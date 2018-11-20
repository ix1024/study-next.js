
class Store {
    constructor() { }

    get(key) {
        let result = localStorage.getItem(key);
        try {
            result = JSON.parse(result)
        } catch (error) {

        }
        return result
    }
    set(key, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        localStorage.setItem(key, value)
    }
    clear(key) {
        if (key) {
            localStorage.removeItem(key)
        } else {
            localStorage.clear()
        }

    }
}
const store = new Store()

export { store }
export default Store
