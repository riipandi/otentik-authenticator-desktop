// Get initial from full name for avatar.
export const getInitials = (fullName: string): string => {
    const nameArr = fullName.split('')
    let initials = nameArr.filter(function (char) {
        return /[A-Z]/.test(char)
    })
    return initials.join('')
}
