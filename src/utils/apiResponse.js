class apiResponse {
    constructor(data, message = "success") {
        this.data = data
        this.message = message
        this.success = true
    }
}

module.exports = apiResponse;