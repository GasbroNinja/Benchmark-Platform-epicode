document.addEventListener('DOMContentLoaded', (event) => {


    //https://opentdb.com/api.php?amount=10&category=18&difficulty=easy
    const get = async (url, params) => {
        const response = await fetch(url + '?' + new URLSearchParams(params))
        const data = await response.json()
    
        return data
    }
/*
    get('https://opentdb.com/api.php', {
        amount:20,
        category:18,
        difficulty:"easy"
    }).then(data => console.log(data))
*/

const questions = [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does CPU stand for?",
      correct_answer: "Central Processing Unit",
      incorrect_answers: [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
      correct_answer: "Final",
      incorrect_answers: ["Static", "Private", "Public"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "The logo for Snapchat is a Bell.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question:
        "Pointers were not used in the original C programming language; they were added later on in C++.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the most preferred image format used for logos in the Wikimedia database?",
      correct_answer: ".svg",
      incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "In web design, what does CSS stand for?",
      correct_answer: "Cascading Style Sheet",
      incorrect_answers: [
        "Counter Strike: Source",
        "Corrective Style Sheet",
        "Computer Style Sheet",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the code name for the mobile operating system Android 7.0?",
      correct_answer: "Nougat",
      incorrect_answers: [
        "Ice Cream Sandwich",
        "Jelly Bean",
        "Marshmallow",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "On Twitter, what is the character limit for a Tweet?",
      correct_answer: "140",
      incorrect_answers: ["120", "160", "100"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "Linux was first created as an alternative to Windows XP.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
      }    
  ];
let results = {
  correct: 0,
  wrong: 0,
}
let questionsCount = 0
let timer
let main = document.querySelector('#main')


let proceed = document.querySelector('#main button')
    proceed.addEventListener('click', (e) =>{
            refreshPage('benchmark', renderBenchmark, countDownAnimation)
          })

    document.querySelector('#main input[type="checkbox"]').addEventListener('click', (e) =>{
      e.target.checked ? proceed.disabled = false : proceed.disabled = true
    })

function refreshPage(next, render, animation = false){
    let template = document.querySelector('#' + next).content.cloneNode(true)
        main.className = next
        main.innerHTML = ''
        main.append(render(template))

        if( animation ){
            animation()
        }
        
}

function renderFeedback(template){
    let typingTimer
    let rating = template.querySelector('.rating')
    let input = template.querySelector('input')
    let btn = template.querySelector('button')

    for (let i = 0; i < 10; i++) {
      let radio = createRadio(i, i + 1, {type: 'radio', name: 'rating'})
          rating.append(radio.input, radio.label)
    }
    input.addEventListener('keyup', (e) =>{
      clearTimeout(typingTimer);
      typingTimer = setTimeout(()=>{
        btn.disabled = false
      }, 1000);
    })


    input.addEventListener
    return template
}
function renderResults(template){
      for (const question of questions) {
          question.correct_answer == question.answer ? results.correct += 1  : results.wrong += 1
      }
      let stats = Object.keys(results)
      let indicator = template.querySelector('#scorePie .svg-indicator-indication')
      let msg = template.querySelectorAll('.testocentro')

      if ((100/questions.length)*results.wrong > 40 ){
          msg[0].classList.remove('hideMsg')
          msg[1].classList.add('hideMsg')
      }else{
          msg[0].classList.add('hideMsg')
          msg[1].classList.remove('hideMsg')
      }

      for (const stat of stats) {
          let partial = stat == 'correct' ? results.correct : results.wrong
          let el = template.querySelector(`#${stat} p`)
              el.textContent =  Number((100/questions.length) * partial).toFixed(2)  + "%"
          let count = template.querySelectorAll(`#${stat} p:last-child span`)
              count[0].textContent = partial
              count[1].textContent = questions.length
      }
      updateSvgIndicator(indicator, 145, questions.length, results.wrong)
      template.querySelector('button').addEventListener('click', (e) =>{
              refreshPage('feedback', renderFeedback)
      })  

  return template
}
function renderBenchmark (template){
  
  
  let second = Math.floor(Math.random()*2) ? 60 : 30
  let question = questions[questionsCount]
  let answers = Array.from(question.incorrect_answers)
      answers.push(question.correct_answer)  

  let countDown = template.querySelector("#countdown")
      countDown.setAttribute("data-seconds", second);
      countDown.textContent = second

  let current = template.querySelector('#current')
      current.textContent = questionsCount + 1

  let total = template.querySelector('#total')
      total.textContent = questions.length

  let fieldset = template.querySelector('fieldset')
      fieldset.innerHTML = ''

  let legend  = document.createElement('legend')
      legend.innerHTML = question.question

      fieldset.append(legend)
      for (let [i, a] of answers.entries()) {
        
        let radio =  createRadio(i,a,{type: 'radio', name: 'answer'})
            radio.input.addEventListener('click',(e) => {
                    question.answer = e.target.value
                    clearInterval(timer)
                    //setTimeout(continueExecution, 10000)
                    if ( questionsCount < questions.length - 1 ){
                          questionsCount = questionsCount + 1                      
                          refreshPage('benchmark', renderBenchmark, countDownAnimation)
                    }else{
                      refreshPage('results', renderResults)
                    }
                })
                fieldset.append(radio.input, radio.label)
      }
 
      return template
}

function resultsAnimation() {
  let time = 3000
  let indicator = document.querySelector('#scorePie .svg-indicator-indication')
  timer = setInterval(() => {
    time = time - 200
    updateSvgIndicator(indicator, 145, questions.length, results.wrong)
    if ( time == 0 ){
      clearInterval(timer)
    }
    console.log("Delayed for 1 second.");
  }, 200)
}

function countDownAnimation () {

    let timerEl = document.querySelector('#timer .svg-indicator-indication')
    let countDown = document.querySelector("#countdown")
    let second = start  = countDown.dataset.seconds


    if ( questionsCount < questions.length  ) {
      timer = setInterval(() => {
        second--
        countDown.textContent = second
        updateSvgIndicator(timerEl, 40, start, second)
        if ( second == 0 ){
          questionsCount = questionsCount + 1
          clearInterval(timer)
          refreshPage('benchmark', renderBenchmark, countDownAnimation)
        }
        console.log("Delayed for 1 second.");
      }, 1000)
  }else{
      console.log('Domande finite');
      refreshPage('results', renderResults)
  }
}

function createRadio (i, v, p){

  let input =  document.createElement('input')
      input.setAttribute('type', p.type)
      input.setAttribute('id', `${p.name}_${i}`)
      input.setAttribute('name', p.name)
      input.value = v      
  let label =  document.createElement('label')
      label.htmlFor = `${p.name}_${i}`
      label.textContent = v

  return { input: input, label: label }
}

function updateSvgIndicator (el, r, start, current){
  //let indicator = document.querySelector(el)
  let progress = (100/start)*current
  let arcOffset = ( 2*3.14*r ) * ((100 - progress)/100)
      el.style.strokeDashoffset = arcOffset
  console.log(arcOffset);
  //console.log(indicator.style.strokeDashoffset);
  /*
  size = 100
  strokeWidth = 10
  center = size / 2
         = 100 / 2 = 50
  radius = center - strokeWidth 
         = 50 - 10 = 40
  progress = 0
  arcLength = 2 * π * radius 
            = 2 * 3.14 * 40 = 251.2
  arcOffset = arcLength * ((100 - progress)/100) 
            = 251.2 * ((100 - 0)/100) = 251.2
*/


}
})



