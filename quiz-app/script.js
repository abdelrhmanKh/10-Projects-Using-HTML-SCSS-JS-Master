const quizData = [
    {
        q: "What is My Name?",
        a: "Abdo",
        b: "Ahmed",
        c: "Ali",
        d: "AAAA",
        correct: "a"
    },
    {
        q: "What is My Age?",
        a: "10",
        b: "12",
        c: "13",
        d: "21",
        correct: "d"
    },
    {
        q: "What is the color the apper for mixing Red Green And blue?",
        a: "Blue",
        b: "Black",
        c: "White",
        d: "red",
        correct: "b"
    },
    {
        q: "What contennt does Egypt Locat on?",
        a: "Asia",
        b: "Africa",
        c: "Europe",
        d: "America",
        correct: "b"
    },
];

let score = 0;
let quest = 0;

const que = document.querySelector("#que");
const ans = document.querySelector("#ans");
const btn = document.querySelector(".quiz__btn")
const scoreEl = document.querySelector(".quiz__score")
const divQuiz = document.querySelector(".quiz")



function createQuestion(index) {
    let queData = quizData[index];
    let theAns = [queData.a, queData.b, queData.c, queData.d];
    que.innerHTML = queData.q;
    ans.innerHTML = `<li class="quiz__answer">
                <input type="radio" id="a" name="answer">
                <label for="a">${theAns[0]}</label>
            </li>
            <li class="quiz__answer">
                <input type="radio" id="b" name="answer">
                <label for="b">${theAns[1]}</label>
            </li>
            <li class="quiz__answer">
                <input type="radio" id="c" name="answer">
                <label for="c">${theAns[2]}</label>
            </li>
            <li class="quiz__answer">
                <input type="radio" id="d" name="answer">
                <label for="d">${theAns[3]}</label>
            </li>
            `;
}
createQuestion(quest)

btn.addEventListener("click", submitQues)


function submitQues() {
    const theAns = document.querySelectorAll("input[name='answer']")
    choosenAns = "";

    theAns.forEach(e => {
        if (e.checked) {
            choosenAns = e.id
        }
    })
    if (choosenAns == quizData[quest].correct && quest <= quizData.length - 1) {
        score++;
        scoreEl.innerHTML = score
    }
    if (quest < quizData.length - 1) {
        quest++;
        createQuestion(quest);
    } else {
        scorePage(score)
    }
}

function scorePage(score) {
    divQuiz.innerHTML = ` <h2 ">
   ${score >= Math.floor(quizData.length / 2) ? 'Congratulation on finishing the Exam' : 'Sorry But you fail'}  
     <span class="score"><br>Your score is: ${score}.</span>
</h2>`

}