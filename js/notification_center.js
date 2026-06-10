const notificationSystem = {

    getNotifications() {
        return JSON.parse(
            localStorage.getItem("rahlat_notifications")
        ) || [];
    },

    saveNotification(notification) {

        let notifications = this.getNotifications();

        notifications.unshift({
            id: Date.now(),
            title: notification.title,
            message: notification.message,
            type: notification.type || "info",
            time: new Date().toLocaleString(),
            read: false
        });

        localStorage.setItem(
            "rahlat_notifications",
            JSON.stringify(notifications)
        );
    },

    getUnreadCount() {

        return this.getNotifications()
            .filter(n => !n.read)
            .length;
    },

    markAllRead() {

        let notifications = this.getNotifications();

        notifications.forEach(n => {
            n.read = true;
        });

        localStorage.setItem(
            "rahlat_notifications",
            JSON.stringify(notifications)
        );
    }
};