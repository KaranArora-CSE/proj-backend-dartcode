class apiError {
    constructor(data, message = "Error") {
        this.data = data
        this.message = message
        this.success = false
    }
}

module.exports = apiError;