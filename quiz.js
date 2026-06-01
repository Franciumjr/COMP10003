var questions = [
    {
        building: "233 Bouverie Street",
        photo: "assets/233photo.jpeg",
        text: "Approximately how far is 233 Bouverie Street from Stop 1?",
        options: ["50 metres", "100 metres", "200 metres", "500 metres"],
        correct: 2,
    },
    {
        building: "233 Bouverie Street",
        photo: "assets/233photo.jpeg",
        text: "Which direction do you turn after passing the museum inside 233 Bouverie?",
        options: ["Left", "Right", "Straight ahead", "Back towards the entrance"],
        correct: 1,
    },
    {
        building: "West Edge Biosciences",
        photo: "assets/web.jpeg",
        text: "How many microwaves are in the West Edge Biosciences Student Kitchenette?",
        options: ["2", "6", "10", "12"],
        correct: 1,
    },
    {
        building: "Old Agricultural Building",
        photo: "assets/oabquiz.jpeg",
        text: "What amenities are included with the Old Agricultural Building Kitchen (G62A)?",
        options: ["Two microwaves, multi-purpose bin area, hot/cold tap and sink, stove, and dishwasher", "Two microwaves, stove, hot/cold tap and sink, fridge, and dishwasher", "Two microwaves, hot/cold tap and sink", "Two microwaves, multi-purpose bin area, hot/cold tap and sink, and dishwasher"],
        correct: 3,
    },
    {
        building: "John Medley - East Tower",
        photo: "assets/jm_background.webp",
        text: "What colour is the microwave in the John Medley East Tower?",
        options: ["Silver", "Black", "Grey", "White" ],
        correct: 3,
    },
    {
        building: "John Medley - West Tower",
        photo: "assets/jm_westtower_micro_2.jpg",
        text: "On what level is the microwave in the John Medley West Tower?",
        options: ["1", "2", "3", "4"],
        correct: 0,
    },
    {
        building: "MSD Building",
        photo: "assets/MSDlevel3.jpg",
        text: "After what time are MSD Level 3 and 4 microwaves restricted to most students?",
        options: ["4:00 PM", "5:00 PM", "6:00 PM", "8:00 PM"],
        correct: 2,
    },
    {
        building: "MSD Building",
        photo: "assets/MSDlevel2.jpg",
        text: "On Level 2 of the MSD building, which side of the building are the microwaves on?",
        options: ["East side (front)", "West side (back)", "North side", "Centre atrium"],
        correct: 0,
    },
    {
        building: "Student Pavillion",
        photo: "assets/studentpav402.jpeg",
        text: "On which floor of the Student Pavillion is the Reheat Station (402) located?",
        options: ["2nd floor", "3rd floor", "4th (top) floor", "Ground floor"],
        correct: 2,
    },
    {
        building: "Student Pavillion",
        photo: "assets/studentpav.jpg",
        text: "Which entrance should you use when heading to the Student Pavillion microwave?",
        options: ["Northern entrance", "Eastern entrance", "Southern entrance", "Western entrance"],
        correct: 2,
    },
    {
        building: "Law Building",
        photo: "assets/lawbuilding-3.jpg",
        text: "Where is the Law Building Kitchnette?",
        options: ["Office Areas", "First Floor Lobby", "Level 3 Study Area", "Food Court Space"],
        correct: 3,
    },
    {
        building: "General Knowledge",
        photo: "assets/kwongleedow-building-2.jpg",
        text: "What overall rating did the 233 Bouverie kitchenette receive?",
        options: ["5.5/10", "6.4/10", "7.2/10", "8.0/10"],
        correct: 1,
    },
];

var currentIdx = 0;
var score = 0;
var answered = false;
var selectedIdx = null;

function loadQuestion() {
    answered = false;
    selectedIdx = null;

    var q = questions[currentIdx];

    document.getElementById('buildingHeading').textContent = q.building;
    document.getElementById('buildingPhoto').src = q.photo;
    document.getElementById('counter').textContent = 'Question ' + (currentIdx + 1) + ' of ' + questions.length;
    document.getElementById('questionText').textContent = q.text;
    document.getElementById('feedbackText').textContent = '';

    var actionBtn = document.getElementById('actionBtn');
    actionBtn.textContent = 'SUBMIT';
    actionBtn.classList.add('faded');

    var pct = Math.round(((currentIdx + 1) / questions.length) * 100);
    document.getElementById('progressBarFill').style.width = pct + '%';
    document.getElementById('progressLabel').textContent = 'Question ' + (currentIdx + 1) + ' of ' + questions.length;

    var list = document.getElementById('optionsList');
    list.innerHTML = '';
    for (var i = 0; i < q.options.length; i++) {
        var btn = document.createElement('button');
        btn.className = 'optionBtn';
        btn.textContent = q.options[i];
        btn.setAttribute('data-index', i);
        btn.onclick = function() { selectAnswer(parseInt(this.getAttribute('data-index'))); };
        list.appendChild(btn);
    }
}

function selectAnswer(idx) {
    if (answered) return;

    var btns = document.querySelectorAll('.optionBtn');
    btns.forEach(b => b.classList.remove('selected'));
    btns[idx].classList.add('selected');

    selectedIdx = idx;
    document.getElementById('actionBtn').classList.remove('faded');
}

function handleAction() {
    var actionBtn = document.getElementById('actionBtn');

    if (!answered) {
        if (selectedIdx === null) return;
        answered = true;

        var q = questions[currentIdx];
        var btns = document.querySelectorAll('.optionBtn');
        var feedback = document.getElementById('feedbackText');

        btns.forEach(b => b.disabled = true);

        for (var i = 0; i < btns.length; i++) {
            if (i === q.correct) {
                btns[i].className = 'optionBtn correct';
            } else if (i === selectedIdx) {
                btns[i].className = 'optionBtn wrong';
            }
        }

        if (selectedIdx === q.correct) {
            score++;
            feedback.style.color = 'green';
            feedback.textContent = 'Correct!';
        } else {
            feedback.style.color = 'red';
            feedback.textContent = 'Incorrect';
        }

        actionBtn.textContent = (currentIdx + 1 >= questions.length) ? 'SEE RESULTS' : 'NEXT';

    } else {
        nextQuestion();
    }
}

function nextQuestion() {
    currentIdx++;
    if (currentIdx >= questions.length) {
        showResult();
    } else {
        loadQuestion();
    }
}

function showResult() {
    document.getElementById('questionScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'flex';

    var pct = Math.round((score / questions.length) * 100);
    document.getElementById('scoreText').textContent = 'You scored ' + score + ' out of ' + questions.length;
    document.getElementById('scorePercent').textContent = pct + '%';

    var msg;
    if (pct === 100) {
        msg = 'Perfect score! You know every microwave on campus!';
    } else if (pct >= 70) {
        msg = 'Well done! You know your way around campus pretty well.';
    } else if (pct >= 40) {
        msg = 'Not bad! A few more microwave visits might help.';
    } else if (pct >= 20) {
        msg = 'You must be used to having cold food.';
    } else if (pct === 0) {
        msg = 'Do you even know what a microwave is?';
    } else {
        msg = 'Keep exploring! There is a lot to discover on campus.';
    }
    document.getElementById('resultMessage').textContent = msg;

    document.getElementById('buildingHeading').textContent = 'Quiz Complete!';
    document.getElementById('buildingPhoto').src = 'assets/quizlogo.png';
}

function restartQuiz() {
    currentIdx = 0;
    score = 0;
    document.getElementById('questionScreen').style.display = 'block';
    document.getElementById('resultScreen').style.display = 'none';
    loadQuestion();
}

loadQuestion();