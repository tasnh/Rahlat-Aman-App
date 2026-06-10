document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeReports();

    }
);

function initializeReports() {

    loadSafetyData();

    loadNotifications();

    loadRatings();

    loadMeetings();
}

function loadSafetyData() {

    let studentData = {

        lateTimes: 2,
        absence: 1,
        behaviorWarnings: 0
    };

    let score =
        safetyAnalytics.calculateSafetyScore(studentData);

    let level =
        safetyAnalytics.getPerformanceLevel(score);

    let insight =
        safetyAnalytics.generateInsight(score);

    console.log(score);
    console.log(level);
    console.log(insight);
}

function loadNotifications() {

    let count =
        notificationSystem.getUnreadCount();

    console.log("Unread:", count);
}

function loadRatings() {

    let avg =
        ratingSystem.getAverageRating();

    console.log("Rating:", avg);
}

function loadMeetings() {

    let meetings =
        meetingSystem.getMeetings();

    console.log(meetings);
}