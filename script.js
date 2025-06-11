document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Touch interactive effect (sparkles) - Melhorado
    const sparkleContainer = document.createElement('div');
    sparkleContainer.classList.add('sparkle-container');
    document.body.appendChild(sparkleContainer);

    document.addEventListener('mousemove', (e) => {
        createSparkle(e.clientX, e.clientY);
    });

    document.addEventListener('touchstart', (e) => {
        for (let i = 0; i < e.touches.length; i++) {
            createSparkle(e.touches[i].clientX, e.touches[i].clientY);
        }
    }, { passive: true });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkleContainer.appendChild(sparkle); // Adiciona ao container de sparkles
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        const size = Math.random() * 12 + 8; // Random size between 8 and 20px
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;

        setTimeout(() => {
            sparkle.remove();
        }, 800); // Match with CSS animation duration
    }

    // Brilho na tela ao tocar
    const brightnessOverlay = document.getElementById('brightness-overlay');
    document.body.addEventListener('mousedown', (e) => {
        if (e.button === 0) { // Only for left click
            activateBrightnessOverlay();
        }
    });
    document.body.addEventListener('mouseup', () => {
        deactivateBrightnessOverlay();
    });
    document.body.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            activateBrightnessOverlay();
        }
    }, { passive: true });
    document.body.addEventListener('touchend', () => {
        deactivateBrightnessOverlay();
    });

    function activateBrightnessOverlay() {
        brightnessOverlay.classList.add('active');
    }

    function deactivateBrightnessOverlay() {
        brightnessOverlay.classList.remove('active');
    }

    // Quiz Logic
    const quizContainer = document.getElementById('quiz-container');
    const startQuizBtn = document.getElementById('start-quiz');
    const resultScreen = document.getElementById('result-screen');
    const resultMessage = document.getElementById('result-message');
    const restartQuizBtn = document.getElementById('restart-quiz');
    const jumentoScreen = document.getElementById('jumento-screen');
    const jumentoSom = document.getElementById('jumento-som');
    const einsteinScreen = document.getElementById('einstein-screen');
    const parabensSom = document.getElementById('parabens-som');

    let currentQuestionIndex = 0;
    let score = 0;
    const questions = [
        // Adicionei mais perguntas aqui, totalizando 40 para ter "mais de 30"
        {
            question: "Qual o símbolo químico da água?",
            options: ["H2O", "CO2", "O2", "N2"],
            answer: "H2O"
        },
        {
            question: "Qual elemento químico é o mais abundante na crosta terrestre?",
            options: ["Oxigênio", "Silício", "Alumínio", "Ferro"],
            answer: "Oxigênio"
        },
        {
            question: "Qual o nome do processo de transformação de líquido para gás?",
            options: ["Evaporação", "Condensação", "Sublimação", "Fusão"],
            answer: "Evaporação"
        },
        {
            question: "O que é um pH de 7?",
            options: ["Ácido", "Básico", "Neutro", "Alcalino"],
            answer: "Neutro"
        },
        {
            question: "Qual gás é essencial para a fotossíntese?",
            options: ["Oxigênio", "Nitrogênio", "Dióxido de Carbono", "Hidrogênio"],
            answer: "Dióxido de Carbono"
        },
        {
            question: "Qual a menor partícula de um elemento químico que mantém suas propriedades?",
            options: ["Molécula", "Átomo", "Íon", "Próton"],
            answer: "Átomo"
        },
        {
            question: "Qual tipo de ligação ocorre entre um metal e um não metal?",
            options: ["Covalente", "Iônica", "Metálica", "Hidrogênio"],
            answer: "Iônica"
        },
        {
            question: "Qual é a fórmula química do sal de cozinha?",
            options: ["KCl", "NaCl", "CaCl2", "MgCl2"],
            answer: "NaCl"
        },
        {
            question: "Qual é o nome do cientista que propôs a lei da conservação da massa?",
            options: ["Lavoisier", "Dalton", "Bohr", "Einstein"],
            answer: "Lavoisier"
        },
        {
            question: "O que significa 'solvente' em uma solução química?",
            options: ["A substância que se dissolve", "A substância que dissolve", "A substância resultante", "A substância insolúvel"],
            answer: "A substância que dissolve"
        },
        {
            question: "Qual o número atômico do Carbono?",
            options: ["6", "12", "14", "8"],
            answer: "6"
        },
        {
            question: "O que é um catalisador?",
            options: ["Uma substância que retarda uma reação", "Uma substância que acelera uma reação", "Uma substância que é consumida na reação", "Uma substância inerte na reação"],
            answer: "Uma substância que acelera uma reação"
        },
        {
            question: "Qual o principal componente do ar que respiramos?",
            options: ["Oxigênio", "Dióxido de Carbono", "Nitrogênio", "Argônio"],
            answer: "Nitrogênio"
        },
        {
            question: "Qual o estado da matéria que possui forma e volume definidos?",
            options: ["Sólido", "Líquido", "Gasoso", "Plasma"],
            answer: "Sólido"
        },
        {
            question: "O que é um isótopo?",
            options: ["Átomos do mesmo elemento com número de prótons diferente", "Átomos de elementos diferentes com número de nêutrons igual", "Átomos do mesmo elemento com número de nêutrons diferente", "Átomos de elementos diferentes com número de massa igual"],
            answer: "Átomos do mesmo elemento com número de nêutrons diferente"
        },
        {
            question: "Qual o nome da camada mais externa de elétrons de um átomo?",
            options: ["Núcleo", "Camada de valência", "Orbital", "Nível de energia"],
            answer: "Camada de valência"
        },
        {
            question: "A que grupo da tabela periódica pertence o Flúor?",
            options: ["Metais Alcalinos", "Metais Alcalino-Terrosos", "Halogênios", "Gases Nobres"],
            answer: "Halogênios"
        },
        {
            question: "Qual o ácido presente no estômago humano?",
            options: ["Ácido Sulfúrico", "Ácido Nítrico", "Ácido Clorídrico", "Ácido Acético"],
            answer: "Ácido Clorídrico"
        },
        {
            question: "Qual é a unidade de medida da quantidade de substância?",
            options: ["Gramas", "Litros", "Moles", "Joules"],
            answer: "Moles"
        },
        {
            question: "O que é eletronegatividade?",
            options: ["Capacidade de um átomo de perder elétrons", "Capacidade de um átomo de ganhar elétrons", "Capacidade de um átomo de atrair elétrons em uma ligação", "Capacidade de um átomo de repelir elétrons"],
            answer: "Capacidade de um átomo de atrair elétrons em uma ligação"
        },
        {
            question: "Qual o metal mais abundante na Terra?",
            options: ["Ferro", "Alumínio", "Cobre", "Ouro"],
            answer: "Alumínio"
        },
        {
            question: "O que é uma reação de neutralização?",
            options: ["Ácido + Ácido", "Base + Base", "Ácido + Base", "Sal + Água"],
            answer: "Ácido + Base"
        },
        {
            question: "Qual o gás responsável pelo cheiro característico da chuva?",
            options: ["Oxigênio", "Nitrogênio", "Ozônio", "Metano"],
            answer: "Ozônio"
        },
        {
            question: "Qual o nome do processo de decomposição de substâncias por meio de corrente elétrica?",
            options: ["Eletroforese", "Eletrólise", "Cromatografia", "Destilação"],
            answer: "Eletrólise"
        },
        {
            question: "Qual o elemento químico que compõe a maior parte do corpo humano?",
            options: ["Carbono", "Oxigênio", "Hidrogênio", "Nitrogênio"],
            answer: "Oxigênio"
        },
        {
            question: "O que é um polímero?",
            options: ["Uma molécula pequena", "Uma molécula grande formada por unidades repetidas", "Um tipo de metal", "Um composto inorgânico"],
            answer: "Uma molécula grande formada por unidades repetidas"
        },
        {
            question: "Qual o nome do fenômeno onde um líquido passa para o estado gasoso abaixo do seu ponto de ebulição?",
            options: ["Ebulição", "Condensação", "Evaporação", "Sublimação"],
            answer: "Evaporação"
        },
        {
            question: "Qual o gás nobre mais leve?",
            options: ["Hélio", "Neon", "Argônio", "Criptônio"],
            answer: "Hélio"
        },
        {
            question: "O que é densidade?",
            options: ["Massa por unidade de volume", "Volume por unidade de massa", "Força por unidade de área", "Energia por unidade de tempo"],
            answer: "Massa por unidade de volume"
        },
        {
            question: "Qual a função de um indicador ácido-base?",
            options: ["Medir a temperatura", "Medir a pressão", "Indicar o pH de uma solução", "Indicar a concentração de uma solução"],
            answer: "Indicar o pH de uma solução"
        },
        {
            question: "Qual o nome do fenômeno da passagem direta do estado sólido para o gasoso?",
            options: ["Fusão", "Vaporização", "Sublimação", "Condensação"],
            answer: "Sublimação"
        },
        {
            question: "Qual o processo em que uma substância gasosa se transforma em líquido?",
            options: ["Evaporação", "Condensação", "Solidificação", "Sublimação"],
            answer: "Condensação"
        },
        {
            question: "Qual o símbolo químico do ouro?",
            options: ["Ag", "Au", "Fe", "Cu"],
            answer: "Au"
        },
        {
            question: "O que é um íon?",
            options: ["Um átomo com carga elétrica neutra", "Um átomo que perdeu ou ganhou elétrons", "Uma molécula sem carga", "Um átomo que perdeu nêutrons"],
            answer: "Um átomo que perdeu ou ganhou elétrons"
        },
        {
            question: "Qual o nome da reação de um ácido com uma base, formando sal e água?",
            options: ["Oxidação", "Redução", "Neutralização", "Precipitação"],
            answer: "Neutralização"
        },
        {
            question: "Qual o principal elemento do diamante?",
            options: ["Silício", "Carbono", "Titânio", "Alumínio"],
            answer: "Carbono"
        },
        {
            question: "O que são isômeros?",
            options: ["Compostos com a mesma fórmula molecular mas estruturas diferentes", "Compostos com a mesma estrutura mas fórmulas moleculares diferentes", "Átomos com o mesmo número de prótons", "Átomos com o mesmo número de nêutrons"],
            answer: "Compostos com a mesma fórmula molecular mas estruturas diferentes"
        },
        {
            question: "Qual o gás usado para encher balões por ser mais leve que o ar?",
            options: ["Nitrogênio", "Oxigênio", "Hélio", "Dióxido de Carbono"],
            answer: "Hélio"
        },
        {
            question: "Qual o tipo de ligação presente na molécula de O2 (Oxigênio)?",
            options: ["Iônica", "Covalente", "Metálica", "Ligação de Hidrogênio"],
            answer: "Covalente"
        },
        {
            question: "Qual a propriedade que mede a acidez ou basicidade de uma solução?",
            options: ["Massa", "Densidade", "Ponto de Ebulição", "pH"],
            answer: "pH"
        }
    ];

    startQuizBtn.addEventListener('click', startQuiz);
    restartQuizBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizContainer.classList.remove('hidden');
        resultScreen.classList.add('hidden');
        showQuestion();
    }

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const questionData = questions[currentQuestionIndex];
            quizContainer.innerHTML = `
                <div class="quiz-question">
                    <p>${currentQuestionIndex + 1}. ${questionData.question}</p>
                    <div class="quiz-options">
                        ${questionData.options.map(option => `<button>${option}</button>`).join('')}
                    </div>
                </div>
                <button id="next-question" class="hidden">Próxima Pergunta</button>
            `;

            document.querySelectorAll('.quiz-options button').forEach(button => {
                button.addEventListener('click', selectAnswer);
            });
            document.getElementById('next-question').addEventListener('click', nextQuestion);
        } else {
            showResult();
        }
    }

    function selectAnswer(event) {
        const selectedButton = event.target;
        const userAnswer = selectedButton.textContent;
        const correctAnswer = questions[currentQuestionIndex].answer;

        // Disable all buttons after selection
        document.querySelectorAll('.quiz-options button').forEach(button => {
            button.disabled = true;
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            } else {
                button.classList.add('incorrect');
            }
        });

        if (userAnswer === correctAnswer) {
            score++;
            showEinsteinScreen();
        } else {
            showJumentoScreen();
        }

        document.getElementById('next-question').classList.remove('hidden');
    }

    function nextQuestion() {
        currentQuestionIndex++;
        showQuestion();
    }

    function showResult() {
        quizContainer.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        resultMessage.innerHTML = `Você acertou ${score} de ${questions.length} perguntas!`;
    }

    function showJumentoScreen() {
        jumentoScreen.classList.remove('hidden');
        jumentoSom.play();
        setTimeout(() => {
            jumentoScreen.classList.add('hidden');
            jumentoSom.pause();
            jumentoSom.currentTime = 0; // Rewind the audio
        }, 3000); // Display for 3 seconds
    }

    function showEinsteinScreen() {
        einsteinScreen.classList.remove('hidden');
        parabensSom.play();
        setTimeout(() => {
            einsteinScreen.classList.add('hidden');
            parabensSom.pause();
            parabensSom.currentTime = 0; // Rewind the audio
        }, 3000); // Display for 3 seconds
    }
});
