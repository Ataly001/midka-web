$(document).ready(function () {
    const questions = [
        { id: 1, question: "Where does NEOS water come from?", answer: "NEOS is artesian water from Kazakhstan." },
        { id: 2, question: "What is NEOS BLUE?", answer: "BLUE is sparkling artesian water with the blue label." },
        { id: 3, question: "What is NEOS SILVER?", answer: "SILVER is still artesian water with the silver label." },
        { id: 4, question: "Can a business explore NEOS options?", answer: "Restaurants, hotels and offices can visit the Business page and try the cost estimate calculator." },
        { id: 5, question: "Where can I compare the collection?", answer: "The Water page compares BLUE and SILVER. The Products page has a searchable catalogue." }
    ];

    function createQuestion(item) {
        const article = document.createElement("article");
        article.className = "faq-item";
        const heading = document.createElement("h3");
        heading.textContent = item.question;
        const answer = document.createElement("div");
        answer.className = "faq-answer";
        answer.id = "faq-answer-" + item.id;
        const text = document.createElement("p");
        text.textContent = item.answer;
        answer.appendChild(text);
        article.appendChild(heading);
        article.appendChild(answer);
        return article;
    }

    function renderQuestions(items) {
        const list = document.getElementById("faq-list");
        list.textContent = "";
        items.forEach(function (item) {
            list.appendChild(createQuestion(item));
        });
        $("#faq-count").text(items.length === 0 ? "No matching questions. Try another word." : items.length + " question(s) found.");
    }

    function searchQuestions() {
        const query = $("#faq-search").val().trim().toLowerCase();
        const matches = [];
        for (const item of questions) {
            if ((item.question + " " + item.answer).toLowerCase().includes(query)) {
                matches.push(item);
            }
        }
        renderQuestions(matches);
    }

    $("#faq-search").on("input", searchQuestions);
    renderQuestions(questions);
});
