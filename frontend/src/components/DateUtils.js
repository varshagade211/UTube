export function getSpentTime(createdDate) {
    let updatedDate = new Date(createdDate)
    let now = new Date(Date.now())
    let years = now.getFullYear() - updatedDate.getFullYear()
    if (years) {
        return years + " years ago"
    }
    let months = now.getMonth() - updatedDate.getMonth()
    if (months) {
        return months + " months ago"
    }
    let days = now.getDate() - updatedDate.getDate()
    if (days) {
        return days + " days ago"
    }
    let hours = now.getHours() - updatedDate.getHours()
    if (hours) {
        return hours + " hours ago"
    }
    let minutes = now.getMinutes() - updatedDate.getMinutes()
    if (minutes) {
        return minutes + " minutes ago"
    }
    let seconds = now.getSeconds() - updatedDate.getSeconds()
    return seconds + " seconds ago"
}
