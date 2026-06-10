const ratingSystem = {

    saveRating(data) {

        let ratings = JSON.parse(
            localStorage.getItem("driver_ratings")
        ) || [];

        ratings.push({
            stars: data.stars,
            feedback: data.feedback,
            date: new Date().toLocaleString()
        });

        localStorage.setItem(
            "driver_ratings",
            JSON.stringify(ratings)
        );
    },

    getRatings() {

        return JSON.parse(
            localStorage.getItem("driver_ratings")
        ) || [];
    },

    getAverageRating() {

        let ratings = this.getRatings();

        if(ratings.length === 0) return 0;

        let total = ratings.reduce(
            (sum, r) => sum + r.stars,
            0
        );

        return (
            total / ratings.length
        ).toFixed(1);
    }
};