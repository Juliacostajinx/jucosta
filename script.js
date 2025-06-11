// --- Efeito de "Luzes ao Tocar" Mais Intuitivo ---
document.addEventListener('click', function(e) {
    createTouchLight(e.clientX, e.clientY);
});

document.addEventListener('touchstart', function(e) {
    // Para toques em dispositivos móveis
    for (let i = 0; i < e.touches.length; i++) {
        createTouchLight(e.touches[i].clientX, e.touches[i].clientY);
    }
});

function createTouchLight(x, y) {
    const light = document.createElement('div');
    light.classList.add('touch-light');
    document.body.appendChild(light);

    // Tamanho e duração aleatórios para maior variação
    const size = Math.random() * 100 + 100; // Entre 100px e 200px
    const duration = Math.random() * 0.4 + 0.6; // Entre 0.6s e 1.0s

    light.style.width = `${size}px`;
    light.style.height = `${size}px`;
    light.style.left = `${x - size / 2}px`;
    light.style.top = `${y - size / 2}px`;
    light.style.animationDuration = `${duration}s`;

    // Remover a luz após a animação
    light.addEventListener('animationend', () => {
        light.remove();
    });
}

// --- Tabela Periódica Interativa Completa (ainda parcial para exemplo) ---
const periodicTableGrid = document.getElementById('periodic-table-grid');
const elementDetails = document.getElementById('element-details');

// Dados completos da Tabela Periódica (apenas alguns para exemplo)
// Em um projeto real, isso viria de um JSON ou API com todos os 118+ elementos
const elementsData = [
    { symbol: "H", name: "Hidrogênio", atomic: 1, mass: 1.008, group: 1, period: 1, type: "Não-metal", info: "O mais leve e abundante do universo. Essencial para água e moléculas orgânicas." },
    { symbol: "He", name: "Hélio", atomic: 2, mass: 4.0026, group: 18, period: 1, type: "Gás Nobre", info: "Inerte e não reativo, usado em balões e criogenia." },
    { symbol: "Li", name: "Lítio", atomic: 3, mass: 6.94, group: 1, period: 2, type: "Metal Alcalino", info: "Usado em baterias recarregáveis e tratamento de transtornos de humor." },
    { symbol: "Be", name: "Berílio", atomic: 4, mass: 9.0122, group: 2, period: 2, type: "Metal Alcalino-Terroso", info: "Leve e resistente, usado em ligas e equipamentos aeroespaciais." },
    { symbol: "B", name: "Boro", atomic: 5, mass: 10.81, group: 13, period: 2, type: "Semimetal", info: "Presente em vidros, cerâmicas e como nutriente de plantas." },
    { symbol: "C", name: "Carbono", atomic: 6, mass: 12.011, group: 14, period: 2, type: "Não-metal", info: "A base da vida. Formas incluem diamante, grafite e fulerenos." },
    { symbol: "N", name: "Nitrogênio", atomic: 7, mass: 14.007, group: 15, period: 2, type: "Não-metal", info: "Principal componente do ar, vital para proteínas e ácidos nucleicos." },
    { symbol: "O", name: "Oxigênio", atomic: 8, mass: 15.999, group: 16, period: 2, type: "Não-metal", info: "Essencial para a respiração e combustão." },
    { symbol: "F", name: "Flúor", atomic: 9, mass: 18.998, group: 17, period: 2, type: "Halogênio", info: "O mais reativo dos halogênios, usado em cremes dentais." },
    { symbol: "Ne", name: "Neônio", atomic: 10, mass: 20.180, group: 18, period: 2, type: "Gás Nobre", info: "Gás inerte que produz um brilho laranja-avermelhado em lâmpadas." },
    { symbol: "Na", name: "Sódio", atomic: 11, mass: 22.990, group: 1, period: 3, type: "Metal Alcalino", info: "Metal reativo, essencial para o equilíbrio de fluidos no corpo." },
    { symbol: "Mg", name: "Magnésio", atomic: 12, mass: 24.305, group: 2, period: 3, type: "Metal Alcalino-Terroso", info: "Leve, usado em ligas e pirotecnia. Importante para a função muscular." },
    { symbol: "Al", name: "Alumínio", atomic: 13, mass: 26.982, group: 13, period: 3, type: "Outro Metal", info: "Metal leve e resistente à corrosão, amplamente usado em construções." },
    { symbol: "Si", name: "Silício", atomic: 14, mass: 28.085, group: 14, period: 3, type: "Semimetal", info: "Base de semicondutores e principal componente da areia e vidro." },
    { symbol: "P", name: "Fósforo", atomic: 15, mass: 30.974, group: 15, period: 3, type: "Não-metal", info: "Vital para o DNA e energia celular (ATP)." },
    { symbol: "S", name: "Enxofre", atomic: 16, mass: 32.06, group: 16, period: 3, type: "Não-metal", info: "Usado em fertilizantes, pesticidas e ácido sulfúrico." },
    { symbol: "Cl", name: "Cloro", atomic: 17, mass: 35.45, group: 17, period: 3, type: "Halogênio", info: "Gás tóxico, usado como desinfetante e na produção de PVC." },
    { symbol: "Ar", name: "Argônio", atomic: 18, mass: 39.948, group: 18, period: 3, type: "Gás Nobre", info: "Gás inerte, usado em iluminação e como gás de proteção em soldagem." },
    { symbol: "K", name: "Potássio", atomic: 19, mass: 39.0983, group: 1, period: 4, type: "Metal Alcalino", info: "Metal reativo, essencial para o funcionamento de células nervosas." },
    { symbol: "Ca", name: "Cálcio", atomic: 20, mass: 40.078, group: 2, period: 4, type: "Metal Alcalino-Terroso", info: "Principal componente de ossos e dentes." }
    // ... adicione MUITOS mais elementos aqui para preencher a tabela completa ...
];

// Mapeia a posição de cada elemento na grade (para simular a tabela real)
// Você precisará adicionar as posições de todos os 118+ elementos aqui para uma tabela completa!
const elementPositions = {
    // Período 1
    "H": { row: 1, col: 1 }, "He": { row: 1, col: 18 },
    // Período 2
    "Li": { row: 2, col: 1 }, "Be": { row: 2, col: 2 }, "B": { row: 2, col: 13 }, "C": { row: 2, col: 14 }, "N": { row: 2, col: 15 }, "O": { row: 2, col: 16 }, "F": { row: 2, col: 17 }, "Ne": { row: 2, col: 18 },
    // Período 3
    "Na": { row: 3, col: 1 }, "Mg": { row: 3, col: 2 }, "Al": { row: 3, col: 13 }, "Si": { row: 3, col: 14 }, "P": { row: 3, col: 15 }, "S": { row: 3, col: 16 }, "Cl": { row: 3, col: 17 }, "Ar": { row: 3, col: 18 },
    // Período 4 (apenas os 2 primeiros para exemplo)
    "K": { row: 4, col: 1 }, "Ca": { row: 4, col: 2 }
    // ... adicione as posições para todos os elementos que você incluiu em elementsData
};

// Popula a Tabela Periódica
function populatePeriodicTable() {
    const maxRow = 7; // Períodos
    const maxCol = 18; // Grupos

    // Limpa a tabela antes de popular, útil se a função for chamada novamente
    periodicTableGrid.innerHTML = '';

    for (let r = 1; r <= maxRow; r++) {
        for (let c = 1; c <= maxCol; c++) {
            const elementBox = document.createElement('div');
            elementBox.classList.add('element-box');

            let foundElement = false;
            // Percorre as posições mapeadas para encontrar o elemento correto
            for (const symbol in elementPositions) {
                const pos = elementPositions[symbol];
                if (pos.row === r && pos.col === c) {
                    const element = elementsData.find(el => el.symbol === symbol);
                    if (element) {
                        elementBox.textContent = element.symbol;
                        elementBox.dataset.symbol = element.symbol;
                        // Opcional: pode adicionar dataset.type para colorir por tipo
                        // elementBox.dataset.type = element.type.replace(/\s/g, ''); // Remove espaços para classe CSS
                        foundElement = true;
                        break;
                    }
                }
            }

            // Lógica para os espaços vazios (blocos f e d que não são preenchidos por padrão)
            if (!foundElement) {
                // Condições para os "buracos" na tabela real
                // Por exemplo, os blocos d e f, que começam a partir do período 4
                if (r >= 4 && r <= 7 && c >= 3 && c <= 12) { // Bloco D
                    elementBox.classList.add('placeholder');
                } else if ((r === 6 && c === 3) || (r === 7 && c === 3)) { // Lantanídeos/Actinídeos placeholders (marcadores de início)
                    elementBox.classList.add('placeholder');
                    elementBox.textContent = '...'; // Indicar que há mais aqui
                } else if (r === 6 && (c === 4 || c === 5) ) { // Apenas um exemplo de mais placeholders
                    elementBox.classList.add('placeholder');
                }
                else if (r === 7 && (c === 4 || c === 5)) { // Apenas um exemplo de mais placeholders
                    elementBox.classList.add('placeholder');
                }
                 else if (r === 6 && c === 18 && !elementPositions["Rn"]) { // Exemplo para o Rn no periodo 6
                    elementBox.classList.add('placeholder');
                }
                 else if (r === 7 && c === 18 && !elementPositions["Og"]) { // Exemplo para o Og no periodo 7
                    elementBox.classList.add('placeholder');
                }
                else if (r >= 1 && r <= 7 && c >= 1 && c <= 18 && !foundElement) {
                    elementBox.classList.add('placeholder'); // Default para outros espaços vazios
                }
            }
            periodicTableGrid.appendChild(elementBox);
        }
    }

    // Adiciona event listeners para os elementos que não são placeholders
    document.querySelectorAll('.element-box:not(.placeholder)').forEach(box => {
        box.addEventListener('click', function() {
            const symbol = this.dataset.symbol;
            const element = elementsData.find(el => el.symbol === symbol);

            // Remove a classe 'active' de qualquer elemento previamente clicado
            document.querySelectorAll('.element-box').forEach(el => el.classList.remove('active'));
            // Adiciona a classe 'active' ao elemento clicado
            this.classList.add('active');

            if (element) {
                elementDetails.innerHTML = `
                    <h3>${element.name} (${element.symbol}) <span class="neon-icon">✨</span></h3>
                    <p><strong>Número Atômico:</strong> ${element.atomic}</p>
                    <p><strong>Massa Atômica:</strong> ${element.mass.toFixed(3)}</p>
                    <p><strong>Grupo:</strong> ${element.group} &nbsp; <strong>Período:</strong> ${element.period}</p>
                    <p><strong>Tipo:</strong> ${element.type}</p>
                    <p>${element.info}</p>
                `;
            } else {
                elementDetails.innerHTML = "<p>Detalhes não disponíveis para este elemento ainda.</p>";
            }
        });
    });
}

// Chama a função para popular a tabela quando a página carrega
populatePeriodicTable();


// --- Lógica do Quiz de Química ---
const quizForm = document.getElementById('quiz-form');
const quizResult = document.getElementById('quiz-result');
const resetButton = document.querySelector('.reset-button');

const correctAnswers = {
    q1: 'c', // Sublimação
    q2: 'c', // Argônio
    q3: 'c', // H₂O₂
    q4: 'b', // Polímeros
    q5: 'c'  // Sua acidez ou basicidade
};

function checkQuiz() {
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    for (const questionId in correctAnswers) {
        const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === correctAnswers[questionId]) {
                score++;
            }
        }
    }

    const percentage = (score / totalQuestions) * 100;
    let message = "";

    quizResult.classList.remove('show'); // Esconde antes de mostrar novamente
    quizResult.style.color = ''; // Reseta estilos
    quizResult.style.borderColor = '';
    quizResult.style.boxShadow = '';

    if (percentage === 100) {
        message = `Parabéns! Você acertou todas as ${totalQuestions} perguntas! Sua nota é ${percentage.toFixed(0)}%! 🌟`;
        quizResult.style.color = '#00FFCC';
        quizResult.style.borderColor = '#00FFCC';
        quizResult.style.boxShadow = '0 0 20px rgba(0,255,204,0.7)';
    } else if (percentage >= 70) {
        message = `Muito bem! Você acertou ${score} de ${totalQuestions} perguntas. Sua nota é ${percentage.toFixed(0)}%! ✨`;
        quizResult.style.color = '#CCFF00';
        quizResult.style.borderColor = '#CCFF00';
        quizResult.style.boxShadow = '0 0 15px rgba(204,255,0,0.7)';
    } else {
        message = `Você acertou ${score} de ${totalQuestions} perguntas. Sua nota é ${percentage.toFixed(0)}%. Tente novamente para melhorar! 💡`;
        quizResult.style.color = '#FF6600';
        quizResult.style.borderColor = '#FF6600';
        quizResult.style.boxShadow = '0 0 10px rgba(255,102,0,0.7)';
    }

    quizResult.textContent = message;
    quizResult.classList.add('show');
}

quizForm.addEventListener('submit', function(e) {
    e.preventDefault();
    checkQuiz();
});

resetButton.addEventListener('click', function() {
    quizForm.reset(); // Limpa as opções selecionadas no formulário
    quizResult.classList.remove('show'); // Esconde o resultado
    quizResult.textContent = ''; // Limpa o texto do resultado
});

