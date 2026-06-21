const API_URL = "http://localhost:8080/feedback";

async function submitFeedback() {
    const feedback = {
        studentName: document.getElementById("studentName").value,
        course: document.getElementById("course").value,
        rating: parseInt(document.getElementById("rating").value),
        comments: document.getElementById("comments").value
    };

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(feedback)
    });

    loadFeedback();

    document.getElementById("studentName").value = "";
    document.getElementById("course").value = "";
    document.getElementById("rating").value = "";
    document.getElementById("comments").value = "";
}

async function loadFeedback() {
    const response = await fetch(API_URL);
    const data = await response.json();

    const feedbackList = document.getElementById("feedbackList");
    feedbackList.innerHTML = "";

    data.forEach(feedback => {
        const li = document.createElement("li");
        li.innerHTML =
            "<b>" + feedback.studentName + "</b> - " +
            feedback.course + " | Rating: " +
            feedback.rating + "<br>" +
            feedback.comments;

        feedbackList.appendChild(li);
    });
}

window.onload = loadFeedback;