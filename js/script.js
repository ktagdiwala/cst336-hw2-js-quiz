// Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

// Global Variables
let score = 0;
let attempts = localStorage.getItem("total_attempts");
let unanswered = [];

displayQ4Choices();
displayQ8Choices();

// Functions
function displayQ4Choices(){
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];

    // Randomizes the option order
    q4ChoicesArray= _.shuffle(q4ChoicesArray);
    for (let i = 0; i < q4ChoicesArray.length; i++){
        document.querySelector("#q4Choices").innerHTML += `<input type="radio" name="q4" id= "${q4ChoicesArray[i]}" 
        value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]} </label>`
    }
}//displayQ4Choices

function displayQ8Choices(){
    let q8ChoicesArray = ["Kentucky", "Tennessee", "Massachusetts", "Pennsylvania"];

    // Randomizes the option order
    q8ChoicesArray= _.shuffle(q8ChoicesArray);
    for (let i = 0; i < q8ChoicesArray.length; i++){
        document.querySelector("#q8Choices").innerHTML += `<input type="radio" name="q8" id= "${q8ChoicesArray[i]}" 
        value="${q8ChoicesArray[i]}"> <label for="${q8ChoicesArray[i]}"> ${q8ChoicesArray[i]} </label>`
    }
}//displayQ8Choices

function isFormValid(responses){
    let isValid = true;
    for (let i=0; i<11; i++){
        if(responses[i]==""){
            isValid = false;
            unanswered.push(i+1);
        }
    }
    if(unanswered.length!=0){
        document.querySelector("#validationFdbk").textContent = "Questions unanswered: " + unanswered;
    }

    return isValid;
}//isFormValid

function gradeQuiz(){
    document.querySelector("#feedback").textContent = "";
    console.log("Grading quiz…");
    document.querySelector("#validationFdbk").innerHTML = ""; // resets validation feedback
    unanswered = []; // resets unanswered questions list


    // variables
    score = 0;
    let responses = [];

    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q3Response = "temp"
    // determine if q3 is unanswered
        if(!document.querySelector("#Jefferson").checked && !document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked){
            q3Response = "";
        }
    let q4Response = document.querySelector("input[name=q4]:checked") ? document.querySelector("input[name=q4]:checked").value : "";
    let q5Response = document.querySelector("#q5").value;
    let q6Response = "temp"
    // determine if q6 is unanswered
        if(!document.querySelector("#Pacific").checked && !document.querySelector("#Atlantic").checked &&
            !document.querySelector("#Arctic").checked && !document.querySelector("#Indian").checked){
            q6Response = "";
        }
    let q7Response = document.querySelector("#q7").value.toLowerCase();
    let q8Response = document.querySelector("input[name=q8]:checked") ? document.querySelector("input[name=q8]:checked").value : "";
    let q9Response = document.querySelector("#q9").value;
    let q10Response = document.querySelector("#q10").value;
    let q11Response = document.querySelector("#q11").textContent;
    console.log("q10Response: " + q11Response);
    // determine if q11 is unanswered
        if(q11Response == "Select a zone on the map"){
            q11Response = "";
        }

    // adds all responses to an array
    responses.push(q1Response);
    responses.push(q2Response);
    responses.push(q3Response);
    responses.push(q4Response);
    responses.push(q5Response);
    responses.push(q6Response);
    responses.push(q7Response);
    responses.push(q8Response);
    responses.push(q9Response);
    responses.push(q10Response);
    responses.push(q11Response);


    if(!isFormValid(responses)){
        return;
    }

    // Grading question 1
    if(q1Response == "sacramento"){
        rightAnswer(1);
    }else{
        wrongAnswer(1);
    }

    // Grading question 2
    if(q2Response == "mo"){
        rightAnswer(2);
    }else{
        wrongAnswer(2);
    }

    // Grading question 3
    if(document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked){
        rightAnswer(3);
    }else{
        wrongAnswer(3);
    }

    // Grading question 4
    if(q4Response == "Rhode Island"){
        rightAnswer(4);
    }else{
        wrongAnswer(4);
    }

    // Grading question 5
    if(q5Response == "ak"){
        rightAnswer(5);
    }else{
        wrongAnswer(5);
    }

    // Grading question 6
    if(document.querySelector("#Pacific").checked && document.querySelector("#Atlantic").checked &&
        document.querySelector("#Arctic").checked && !document.querySelector("#Indian").checked){
        rightAnswer(6);
    }else{
        wrongAnswer(6);
    }

    // Grading question 7
    if(q7Response == "los angeles" || q7Response == "los angeles county"){
        rightAnswer(7);
    }else{
        wrongAnswer(7);
    }

    // Grading question 8
    if(q8Response == "Tennessee"){
        rightAnswer(8);
    }else{
        wrongAnswer(8);
    }

    // Grading question 9
    if(q9Response == "ca"){
        rightAnswer(9);
    }else{
        wrongAnswer(9);
    }

    // Grading question 10
    if(q10Response == 48){
        rightAnswer(10);
    }else{
        wrongAnswer(10);
    }

    // Grading question 11
    if(q11Response == "Zone 2"){
        rightAnswer(11);
        score +=1;
    }else{
        wrongAnswer(11);
    }


    let totalScore = document.querySelector("#totalScore");

    totalScore.textContent = `Total Score: ${score}`;
    document.querySelector("#totalAttempts").textContent = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);

    if(score < 80){
        totalScore.style.color = '#d62828';
    }else{
        totalScore.style.color = "#b1df78";
        document.querySelector("#feedback").textContent = "Congratulations! You scored at least 80%";
    }
}// gradeQuiz

function rightAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct";
    document.querySelector(`#q${index}Feedback`).className = "correct d-inline feedback";
    document.querySelector(`#markImg${index}`).innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"40\" width=\"40\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill=\"#74c365\" d=\"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z\"/></svg>";
    score += 9;
}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "incorrect d-inline feedback";
    document.querySelector(`#markImg${index}`).innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"40\" width=\"40\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill=\"#d62828\" d=\"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z\"/></svg>";
}

function selectRegion(zone){
    selection = document.querySelector('#q11');
    selection.textContent = zone;
    selection.style.color = "#36630E";
}