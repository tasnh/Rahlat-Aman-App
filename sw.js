self.addEventListener('push', function(event) {
    const data = event.data ? event.data.text() : "New Notification";

    event.waitUntil(
        self.registration.showNotification("Rahlat Aman", {
            body: data,
            icon: "logo.png",
            vibrate: [200,100,200]
        })
    );
});