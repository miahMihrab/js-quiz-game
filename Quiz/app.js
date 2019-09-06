//Fetch Questions
const qu = fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple")

qu.then(res => {
    return res.json()
}).then(ar => {
    let displayQues = []
    let prev = []
    let correctAnswers = []

    const refresh = document.querySelector('.refresh')
    const sForm = document.querySelector('.quiz-form')

    //Refresh the page
    refresh.addEventListener('click', e => {
        document.location.reload(true)
    })

    //Randomly take question into displayQues array
    for (let i = 0; i < 5; i++) {
        if (displayQues.length > 5) break;
        const rand = Math.floor(Math.random() * 7)

        if (!prev.includes(rand)) {
            displayQues.push(ar.results[rand])

            correctAnswers[i] = ar.results[rand].correct_answer

            prev.push(rand)
        } else {
            i--;
        }
    }


    //Creating Element Randomly for Questions and inserting question and options
    let div;
    displayQues.forEach((q, i) => {
        let k = 0

        div = document.createElement('div')
        div.classList.add('my-5')

        let ques = document.createElement('p')
        ques.classList.add('lead')
        ques.classList.add('font-weight-normal')
        ques.innerText = `${q.question}`

        let optDiv = document.createElement('div')
        optDiv.classList.add("form-check")
        optDiv.classList.add("my-2")
        optDiv.classList.add('text-white')


        while (k < 4) {

            let label = document.createElement('label')
            let input = document.createElement('input')
            input.classList.add('form-check-input')
            input.type = 'radio'

            if (i === 0) input.name = 'q1'
            if (i === 1) input.name = 'q2'
            if (i === 2) input.name = 'q3'
            if (i === 3) input.name = 'q4'
            if (i === 4) input.name = 'q5'
            if (i === 5) input.name = 'q6'
            if (i === 6) input.name = 'q7'

            if (k === 0) {
                let A = q.correct_answer
                label.innerText = `${A}`;

                input.value = A
                // input.name = 'q1'
            }
            if (k === 1) {
                let B = q.incorrect_answers[0]
                label.innerText = `${B}`;
                input.value = B
                // input.name = 'q2'
            }
            if (k === 2) {
                let C = q.incorrect_answers[1]
                label.innerText = `${C}`;
                input.value = C
                //input.name = 'q3'

            }
            if (k === 3) {
                let D = q.incorrect_answers[2]
                label.innerText = `${D}`;
                input.value = D
                //input.name = 'q4'
            }

            label.style.display = 'block'
            label.classList.add('label')
            label.classList.add('form-check-label')
            label.classList.add('mb-2')

            //APPENDING child to PARENT
            optDiv.appendChild(input)
            optDiv.appendChild(label)
            div.appendChild(ques)
            div.appendChild(optDiv)

            sForm.appendChild(div)

            k++;

        }

    })

    //Creating Submit btn
    const submit = document.createElement('input')
    submit.type = 'submit'
    submit.classList.add('btn')
    submit.classList.add('btn-light')
    sForm.appendChild(submit)

    let userAns = []
    const scoreDisplay = document.querySelector('.score')
    const showScore = document.querySelector('#showScore')

    //Add eventListener to form and making it ready for submit 
    sForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let score = 0;
        if (sForm.q1.value != "" || sForm.q2.value != "" || sForm.q3.value != "" || sForm.q4.value != "" || sForm.q5.value != "")
            userAns = [sForm.q1.value, sForm.q2.value, sForm.q3.value, sForm.q4.value, sForm.q5.value]

        if (!userAns.length <= 0) {
            correctAnswers.forEach((ans, i) => {
                if (ans === userAns[i]) {
                    score += 20
                }
                scoreDisplay.style.display = 'block'
                scrollTo(0, 0)
            })
            let output = 0
            if (score != 0) {
                const timer = setInterval(() => {

                    output++;
                    showScore.innerText = `${output}%`
                    if (output === score) clearInterval(timer)
                }, 20)
            } else {
                showScore.innerText = `${output}%`
            }


        } else {
            alert("You have to answer all the question")
        }
    })
})