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
        const button = document.createElement("button");
        button.type = "button";
        button.className = "faq-btn";
        button.textContent = item.question;
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-controls", "faq-answer-" + item.id);
        heading.appendChild(button);
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
        $(".faq-answer").hide();
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
        $("#faq-list").stop(true, true).hide().fadeIn(150);
    }

    $("#faq-list").on("click", ".faq-btn", function () {
        const button = $(this);
        const answer = button.closest(".faq-item").find(".faq-answer");
        const isOpen = button.attr("aria-expanded") === "true";
        $(".faq-answer").not(answer).stop(true, true).slideUp(200);
        $(".faq-btn").not(button).attr("aria-expanded", "false");
        button.attr("aria-expanded", String(!isOpen));
        answer.stop(true, true).slideToggle(200);
    });

    $("#faq-search").on("input", searchQuestions);
    renderQuestions(questions);
});
