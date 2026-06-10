const meetingSystem = {

    createMeeting(data) {

        let meetings = JSON.parse(
            localStorage.getItem("meetings")
        ) || [];

        meetings.push({
            id: Date.now(),
            staff: data.staff,
            reason: data.reason,
            date: data.date,
            status: "Pending"
        });

        localStorage.setItem(
            "meetings",
            JSON.stringify(meetings)
        );

        notificationSystem.saveNotification({
            title: "Meeting Request",
            message: "Meeting request submitted successfully.",
            type: "meeting"
        });
    },

    getMeetings() {

        return JSON.parse(
            localStorage.getItem("meetings")
        ) || [];
    }
};