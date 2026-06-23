document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Hands-on Lab Snippets Tab Switching & Copy Logic
    // ----------------------------------------------------
    const labTabs = document.querySelectorAll('.lab-tab');
    const labPanes = document.querySelectorAll('.lab-pane');
    const copyBtn = document.getElementById('lab-copy-action');

    labTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active classes
            labTabs.forEach(t => t.classList.remove('active'));
            labPanes.forEach(p => p.classList.remove('active'));

            // Add active class to selected tab & pane
            tab.classList.add('active');
            const targetPaneId = 'pane-' + tab.getAttribute('data-tab');
            document.getElementById(targetPaneId).classList.add('active');
        });
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const activePane = document.querySelector('.lab-pane.active .lab-code');
            if (activePane) {
                // Get clean text content (ignoring HTML tags from syntax highlighting)
                const textToCopy = activePane.innerText || activePane.textContent;
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalBtnText = copyBtn.innerHTML;
                    copyBtn.innerHTML = `
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span style="color:#10b981">Copied!</span>
                    `;
                    setTimeout(() => {
                        copyBtn.innerHTML = originalBtnText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            }
        });
    }


    // ----------------------------------------------------
    // 2. Video Walkthrough Simulator
    // ----------------------------------------------------
    const slides = document.querySelectorAll('.video-slide');
    const playToggle = document.getElementById('vid-play-toggle');
    const playIcon = document.getElementById('vid-play-icon');
    const pauseIcon = document.getElementById('vid-pause-icon');
    const progressBar = document.getElementById('vid-progress');
    const stepLabel = document.getElementById('vid-step-label');
    const timeLabel = document.getElementById('vid-time-label');
    const prevBtn = document.getElementById('vid-prev-btn');
    const nextBtn = document.getElementById('vid-next-btn');

    let currentSlideIndex = 0;
    let isPlaying = false;
    let playInterval = null;
    let currentSlideProgress = 0; // percentage within current slide
    const slideDurations = [10, 15, 10, 10]; // seconds per slide
    const totalDuration = slideDurations.reduce((a, b) => a + b, 0); // 45s total

    function updateVideoState() {
        // Deactivate all slides
        slides.forEach(slide => slide.classList.remove('active'));
        // Activate current slide
        slides[currentSlideIndex].classList.add('active');

        // Update step label
        stepLabel.textContent = `Step ${currentSlideIndex + 1} of ${slides.length}`;

        // Calculate time elapsed
        let elapsed = 0;
        for (let i = 0; i < currentSlideIndex; i++) {
            elapsed += slideDurations[i];
        }
        // Add progress within the current slide
        const currentSlideSec = (currentSlideProgress / 100) * slideDurations[currentSlideIndex];
        const currentTime = elapsed + currentSlideSec;

        // Formats MM:SS
        const formatTime = (secs) => {
            const m = Math.floor(secs / 60);
            const s = Math.floor(secs % 60);
            return `${m}:${s < 10 ? '0' : ''}${s}`;
        };

        timeLabel.textContent = `${formatTime(currentTime)} / ${formatTime(totalDuration)}`;

        // Calculate total progress percentage
        const totalProgressPercent = (currentTime / totalDuration) * 100;
        progressBar.style.width = `${totalProgressPercent}%`;
    }

    function advanceProgress() {
        if (!isPlaying) return;

        // Progress step is 1% every duration/100 seconds
        // Interval is 100ms
        const increment = 100 / (slideDurations[currentSlideIndex] * 10);
        currentSlideProgress += increment;

        if (currentSlideProgress >= 100) {
            currentSlideProgress = 0;
            currentSlideIndex++;

            if (currentSlideIndex >= slides.length) {
                // Video finished
                currentSlideIndex = 0;
                pauseVideo();
            }
        }
        updateVideoState();
    }

    function playVideo() {
        isPlaying = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        playInterval = setInterval(advanceProgress, 100);
    }

    function pauseVideo() {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        clearInterval(playInterval);
    }

    if (playToggle) {
        playToggle.addEventListener('click', () => {
            if (isPlaying) {
                pauseVideo();
            } else {
                playVideo();
            }
        });

        prevBtn.addEventListener('click', () => {
            pauseVideo();
            currentSlideProgress = 0;
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateVideoState();
        });

        nextBtn.addEventListener('click', () => {
            pauseVideo();
            currentSlideProgress = 0;
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateVideoState();
        });

        // Initial setup
        updateVideoState();
    }


    // ----------------------------------------------------
    // 3. Knowledge Check Quiz Engine
    // ----------------------------------------------------
    const quizQuestions = [
        {
            question: "Which Authorization header format is standard and correct for Bearer token credentials?",
            options: [
                "Authorization: Token sandbox_key_abc123",
                "Authorization: Bearer sandbox_key_abc123",
                "Authorization: credentials(sandbox_key_abc123)",
                "Auth-Token: sandbox_key_abc123"
            ],
            correctIndex: 1,
            explanation: "The OAuth 2.0 / Bearer scheme utilizes the standard 'Authorization' header prefix, followed by the keyword 'Bearer' and a single space, then the token."
        },
        {
            question: "If the API returns a '404 Not Found' status code, which troubleshooting step is most relevant?",
            options: [
                "Verify that your authorization token is not expired.",
                "Wait 60 seconds to avoid exceeding the API rate limit quota.",
                "Verify the endpoint base URL spelling and check for missing path variables.",
                "Submit a POST request instead because GET requests are not allowed."
            ],
            correctIndex: 2,
            explanation: "A 404 HTTP status code indicates that the server cannot map the requested URI to an existing resource. Double check resource path plurals and API version numbers."
        },
        {
            question: "Why should developers store API keys in environment variables instead of hardcoding them in code files?",
            options: [
                "To prevent accidental leakage of secrets to public version control (e.g. GitHub repos).",
                "Because environment variables make API requests process 10x faster.",
                "Because hardcoded keys are rejected by the browser's JSON parser.",
                "To allow the API to bypass rate-limiting checks."
            ],
            correctIndex: 0,
            explanation: "Hardcoded API keys are easily exposed when codebase files are pushed to shared remote systems. Environment variables dynamically load keys at runtime to protect credentials."
        }
    ];

    let currentQuestionIdx = 0;
    let userScore = 0;
    let selectedOptionIdx = null;
    let quizState = 'answering'; // 'answering' or 'submitted'

    const quizProgressText = document.getElementById('quiz-progress-text');
    const quizScoreText = document.getElementById('quiz-score-text');
    const quizQuestionText = document.getElementById('quiz-question-text');
    const quizOptionsList = document.getElementById('quiz-options-list');
    const quizFeedbackBox = document.getElementById('quiz-feedback-box');
    const quizFeedbackTitle = document.getElementById('quiz-feedback-title');
    const quizFeedbackText = document.getElementById('quiz-feedback-text');
    const quizActionBtn = document.getElementById('quiz-action-btn');
    const quizQuestionBox = document.getElementById('quiz-question-box');
    const quizResultsBox = document.getElementById('quiz-results-box');
    const quizRetryBtn = document.getElementById('quiz-retry-btn');

    function renderQuizQuestion() {
        if (currentQuestionIdx >= quizQuestions.length) {
            // Show results
            quizQuestionBox.style.display = 'none';
            quizFeedbackBox.style.display = 'none';
            quizActionBtn.style.display = 'none';
            quizResultsBox.classList.add('show');
            quizResultsScore.textContent = `${userScore} / ${quizQuestions.length}`;
            quizProgressText.textContent = `Evaluation Complete`;
            return;
        }

        quizQuestionBox.style.display = 'block';
        quizResultsBox.classList.remove('show');
        quizActionBtn.style.display = 'block';
        quizFeedbackBox.classList.remove('show');
        quizActionBtn.disabled = true;
        quizActionBtn.textContent = "Check Answer";
        quizState = 'answering';
        selectedOptionIdx = null;

        const currentQ = quizQuestions[currentQuestionIdx];
        quizProgressText.textContent = `Question ${currentQuestionIdx + 1} of ${quizQuestions.length}`;
        quizScoreText.textContent = `Score: ${userScore}/${quizQuestions.length}`;
        quizQuestionText.textContent = currentQ.question;
        
        quizOptionsList.innerHTML = '';
        currentQ.options.forEach((option, idx) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'quiz-option';
            optionBtn.setAttribute('data-idx', idx);
            optionBtn.innerHTML = `
                <span>${option}</span>
                <span class="quiz-option-marker"></span>
            `;
            
            optionBtn.addEventListener('click', () => {
                if (quizState !== 'answering') return;
                
                // Remove selected class from all options
                document.querySelectorAll('.quiz-option').forEach(btn => btn.classList.remove('selected'));
                // Add to clicked
                optionBtn.classList.add('selected');
                selectedOptionIdx = idx;
                quizActionBtn.disabled = false;
            });
            
            quizOptionsList.appendChild(optionBtn);
        });
    }

    if (quizActionBtn) {
        quizActionBtn.addEventListener('click', () => {
            const currentQ = quizQuestions[currentQuestionIdx];
            
            if (quizState === 'answering') {
                quizState = 'submitted';
                quizActionBtn.textContent = currentQuestionIdx === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question";
                
                const selectedBtn = document.querySelector(`.quiz-option[data-idx="${selectedOptionIdx}"]`);
                const correctBtn = document.querySelector(`.quiz-option[data-idx="${currentQ.correctIndex}"]`);
                
                if (selectedOptionIdx === currentQ.correctIndex) {
                    userScore++;
                    quizScoreText.textContent = `Score: ${userScore}/${quizQuestions.length}`;
                    
                    selectedBtn.classList.add('correct');
                    quizFeedbackBox.className = 'quiz-feedback correct-feedback show';
                    quizFeedbackTitle.textContent = "Correct!";
                } else {
                    selectedBtn.classList.add('incorrect');
                    correctBtn.classList.add('correct');
                    quizFeedbackBox.className = 'quiz-feedback incorrect-feedback show';
                    quizFeedbackTitle.textContent = "Incorrect";
                }
                
                quizFeedbackText.textContent = currentQ.explanation;
            } else {
                // Advance to next question
                currentQuestionIdx++;
                renderQuizQuestion();
            }
        });

        quizRetryBtn.addEventListener('click', () => {
            currentQuestionIdx = 0;
            userScore = 0;
            quizQuestionBox.style.display = 'block';
            renderQuizQuestion();
        });

        // Initialize quiz
        renderQuizQuestion();
    }


    // ----------------------------------------------------
    // 4. Troubleshooting Accordion Toggles
    // ----------------------------------------------------
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            
            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
