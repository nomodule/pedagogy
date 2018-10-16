module.exports = {
    getSubject: function (key) {
        const subjects = ['Hindi','Math', 'History', 'English', 'Geography', 'Biology', 'Physics', 'Chemistry', 'Social Sciences', 'Computer Science', 'Business Studies', 'Sociology', 'Science', 'Economy'];
        const subject = key - 1;
        return subjects[subject];
    }
}