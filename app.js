let signup = () => {
    var email = document.getElementById('email').value
    var password = document.getElementById('pass').value
    console.log(email, password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((data) => {
            console.log(data)
            alert("User Registered Successfully")

        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });
}

let signin = () => {
    var email = document.getElementById('loginemail').value
    var password = document.getElementById('loginpass').value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((data) => {
            console.log("user signin")
            console.log(data)
            window.location.href = './home.html'
            alert("User Login Successfully")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            alert("Incorrect Email or Password")

        });

        var name1 = document.getElementById("loginname").value
        console.log(name1)
        localStorage.setItem("name",name1)
        localStorage.getItem("name")

        // setTimeout(function(){ 
        //     alert("Hello"); 
        // window.location.href = './home.html'},
        //  3000);
        // window.location.href = './home.html'

}

a=localStorage.getItem("name")



var quizDB = [
{
    question:"1. What is the National Bird of Pakistan",
    a:"Peacock",
    b:"Eagle",
    c:"Chaukor",
    d:"Parrot",
    ans:"ans3"
},{
    question:"2. What is the National Animal of Pakistan",
    a:"Lion",
    b:"Markhor",
    c:"Tiger",
    d:"Wolf",
    ans:"ans2"
},{
    question:"3. Who wrote the National Anthem of Pakistan",
    a:"Hafeez Jalhandari",
    b:"Allama Iqbal",
    c:"Chaudary Rehmat Ali",
    d:"Ameer Ud din Chughtai",
    ans:"ans1"
},
{
    question:"4. Who was the first governor general of Pakistan",
    a:"Qamar Javed Bajwa",
    b:"Liaquat Ali Khan",
    c:"Quaid e Azam",
    d:"Iskandar Mirza",
    ans:"ans3"
},
{
    question:"5. Who was the first Prime Minister of Pakistan",
    a:"Iskandar Mirza",
    b:"Liaquat Ali Khan",
    c:"Chaudary Rehmat Ali",
    d:"Quaid e Azam",
    ans:"ans2"
},
]

var question = document.querySelector('.question')
var option1 = document.getElementById("option1")
var option2 = document.getElementById("option2")
var option3 = document.getElementById("option3")
var option4 = document.getElementById("option4")
var submit = document.getElementById("submit")
var answers = document.querySelectorAll(".answer")



var questionCount = 0;
let score = 0;

function loadquestion(e){
    var questionlist = quizDB[questionCount];

    question.innerText = questionlist.question;

    option1.innerText = questionlist.a;
    option2.innerText = questionlist.b;
    option3.innerText = questionlist.c;
    option4.innerText = questionlist.d;
    
}

loadquestion()

const getcheckedanswer = () => {
    let answer;

    answers.forEach(currentelement => {
        if(currentelement.checked){
            answer = currentelement.id;
        }
    });
    return answer;

}

const deselectAll = () =>{
    answers.forEach((currentelement) => currentelement.checked = false)
}
  


var showscore = document.getElementById("showscore")

function signout(){
    localStorage.clear()
    window.location.href = './index.html'
    alert("User Signout successfully")

}


submit.addEventListener('click' , () =>{
    const checkedAnswer = getcheckedanswer();
    console.log(checkedAnswer);

    if (checkedAnswer === quizDB[questionCount].ans){
        score++
        console.log(score)

    }

    questionCount++

    deselectAll()

    if (questionCount<quizDB.length){
        loadquestion()
    }
    else{

        showscore.innerHTML =`
            <h3>Your Score is ${score}/${quizDB.length}</h3>
            <button class="btn" onclick="location.reload()">Reload</button>
            <button class="btn" onclick="signout()">signout</button>
            `

        showscore.classList.remove("scorearea")
        a = document.getElementById("submit")
        a.disabled = true;

        firebase.database().ref("score of "+localStorage.getItem("name")).set(score)
    }
})








