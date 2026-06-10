const safetyAnalytics = {

    calculateSafetyScore(studentData) {

        let score = 100;

        score -= studentData.lateTimes * 2;
        score -= studentData.absence * 3;
        score -= studentData.behaviorWarnings * 5;

        if(score < 0) score = 0;

        return score;
    },

    getPerformanceLevel(score) {

        if(score >= 90) {
            return "Excellent";
        }

        if(score >= 75) {
            return "Very Good";
        }

        if(score >= 60) {
            return "Good";
        }

        return "Needs Attention";
    },

    generateInsight(score) {

        if(score >= 90) {
            return "Outstanding transportation behavior.";
        }

        if(score >= 75) {
            return "Student follows most safety protocols.";
        }

        if(score >= 60) {
            return "Some improvements are recommended.";
        }

        return "Immediate monitoring recommended.";
    }
};