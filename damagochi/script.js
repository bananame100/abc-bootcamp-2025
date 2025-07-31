// DOM 요소 가져오기
const petNameEl = document.getElementById('pet-name');
const petImageEl = document.getElementById('pet-image');
const petMessageEl = document.getElementById('pet-message');

const hungerBar = document.getElementById('hunger-bar');
const happinessBar = document.getElementById('happiness-bar');
const energyBar = document.getElementById('energy-bar');

const hungerValue = document.getElementById('hunger-value');
const happinessValue = document.getElementById('happiness-value');
const energyValue = document.getElementById('energy-value');

const feedBtn = document.getElementById('feed-btn');
const playBtn = document.getElementById('play-btn');
const sleepBtn = document.getElementById('sleep-btn');

// 펫 초기 상태 정의 (여기에 여러분만의 펫 이름을 넣어보세요!)
let pet = {
    name: "쿠키",
    hunger: 0,    // 0: 배부름, 100: 배고픔
    happiness: 100, // 0: 불행, 100: 행복
    energy: 0,    // 0: 활기참, 100: 졸림
    isSleeping: false,
    imagePath: {
        happy: 'images/happy_pet.png',
        hungry: 'images/hungry_pet.png',
        sad: 'images/sad_pet.png',
        sleep: 'images/sleep_pet.png'
    }
};

// --- 게임 초기화 및 데이터 로드 ---
function initGame() {
    // localStorage에서 저장된 펫 상태 불러오기
    const savedPet = localStorage.getItem('virtualPet');
    if (savedPet) {
        pet = JSON.parse(savedPet);
        // 이미지가 존재하지 않을 경우 기본 이미지로 설정
        if (!pet.imagePath) {
             pet.imagePath = {
                happy: 'images/happy_pet.png',
                hungry: 'images/hungry_pet.png',
                sad: 'images/sad_pet.png',
                sleep: 'images/sleep_pet.png'
            };
        }
    }
    updatePetDisplay(); // 초기 화면 업데이트
    startGameLoop();   // 게임 루프 시작
}

// --- 펫 상태 업데이트 관련 함수 ---
function updatePetDisplay() {
    // 상태 바 및 값 업데이트
    hungerBar.value = pet.hunger;
    hungerValue.textContent = pet.hunger;
    happinessBar.value = pet.happiness;
    happinessValue.textContent = pet.happiness;
    energyBar.value = pet.energy;
    energyValue.textContent = pet.energy;

    // 펫 이미지 및 메시지 업데이트
    if (pet.isSleeping) {
        petImageEl.src = pet.imagePath.sleep || 'images/sleep_pet.png';
        petMessageEl.textContent = `${pet.name} (쿨쿨... 잠자는 중)`;
        document.body.classList.add('sleeping');
        document.querySelector('.pet-container').classList.add('sleeping');
    }

    // 아주 즐거운 상태
    else if (pet.happiness >= 80 && pet.hunger <= 30 && pet.energy <= 30) {
        petImageEl.src = 'images/joyful_pet.png';
        petMessageEl.textContent = `${pet.name}가 너무너무 신나요! 함께 놀아요!`;
    }

    // 즐겁긴 하지만 피로하거나 배고픈 상태
    else if (pet.happiness >= 70 && (pet.hunger >= 40 || pet.energy >= 40)) {
        petImageEl.src = 'images/happy_pet.png';
        petMessageEl.textContent = `${pet.name}는 기분이 좋아요! 근데 좀 출출하거나 피곤한 것 같아요.`;
    }

    // 기분 좋지만 피로가 많이 쌓인 상태
    else if (pet.happiness >= 70 && pet.energy >= 70) {
        petImageEl.src = 'images/tired_but_happy.png';
        petMessageEl.textContent = `${pet.name}는 좋긴 한데 좀 피곤해 보여요...`;
    }

    // 행복도 낮고, 피로 + 배고픔도 높음 → 짜증
    else if (pet.happiness <= 40 && pet.hunger >= 60 && pet.energy >= 60) {
        petImageEl.src = 'images/grumpy_pet.png';
        petMessageEl.textContent = `${pet.name}가 짜증난 것 같아요. 너무 배고프고 피곤해요!`;
    }

    // 배고파서 짜증
    else if (pet.happiness < 60 && pet.hunger >= 80) {
        petImageEl.src = 'images/hungry_grumpy_pet.png';
        petMessageEl.textContent = `${pet.name}가 너무 배고파해요. 밥 좀 주세요!`;
    }

    // 행복도 낮고 피로도 높음 → 무기력
    else if (pet.happiness < 70 && pet.energy >= 80) {
        petImageEl.src = 'images/exhausted_pet.png';
        petMessageEl.textContent = `${pet.name}가 너무 피곤해 보여요. 자고 싶대요.`;
    }

    // 슬픔
    else if (pet.happiness <= 30) {
        petImageEl.src = 'images/sad_pet.png';
        petMessageEl.textContent = `${pet.name}가 슬퍼 보여요. 외로울지도 몰라요.`;
    }

    // 그 외 → 평범한 상태
    else {
        petImageEl.src = 'images/neutral_pet.png';
        petMessageEl.textContent = `${pet.name}는 그냥 평범한 하루를 보내고 있어요.`;
    }

    // 자고 있는 상태가 아닐 경우 화면 어둡게 제거
    if (!pet.isSleeping) {
        document.body.classList.remove('sleeping');
        document.querySelector('.pet-container').classList.remove('sleeping');
    }

    // 상태 바 색상 변경
    applyStatusBarColor(hungerBar, pet.hunger, 'high');
    applyStatusBarColor(happinessBar, pet.happiness, 'low');
    applyStatusBarColor(energyBar, pet.energy, 'high');

    // 버튼 활성화/비활성화
    feedBtn.disabled = pet.isSleeping;
    playBtn.disabled = pet.isSleeping;
    sleepBtn.disabled = pet.isSleeping;
}


// 상태 바 색상 적용 함수
function applyStatusBarColor(barElement, value, type) {
    barElement.classList.remove('low', 'critical');
    if (type === 'high') { // 높을수록 안 좋은 (배고픔, 피로도)
        if (value >= 80) {
            barElement.classList.add('critical');
        } else if (value >= 50) {
            barElement.classList.add('low');
        }
    } else if (type === 'low') { // 낮을수록 안 좋은 (행복도)
        if (value <= 20) {
            barElement.classList.add('critical');
        } else if (value <= 50) {
            barElement.classList.add('low');
        }
    }
}


// --- 펫 상호작용 함수 ---
function feedPet() {
    if (pet.isSleeping) return; // 자고 있으면 아무것도 못 함
    pet.hunger = Math.max(0, pet.hunger - 20); // 배고픔 감소
    pet.happiness = Math.min(100, pet.happiness + 5); // 행복도 약간 증가
    updatePetDisplay();
    saveGame();
}

function playPet() {
    if (pet.isSleeping) return; // 자고 있으면 아무것도 못 함
    pet.happiness = Math.min(100, pet.happiness + 25); // 행복도 증가
    pet.energy = Math.min(100, pet.energy + 10);     // 피로도 증가
    pet.hunger = Math.min(100, pet.hunger + 5);      // 배고픔 약간 증가
    updatePetDisplay();
    saveGame();
}

function sleepPet() {
    if (pet.isSleeping) return; // 이미 자고 있으면 스킵
    pet.isSleeping = true;
    updatePetDisplay();
    saveGame();

    // 일정 시간 후 펫 깨우기
    setTimeout(() => {
        pet.isSleeping = false;
        pet.energy = Math.max(0, pet.energy - 80); // 피로도 크게 감소
        pet.hunger = Math.min(100, pet.hunger + 10); // 배고픔 약간 증가
        updatePetDisplay();
        saveGame();
    }, 5000); // 5초 동안 잠자기
}

// --- 게임 루프 (자동 상태 변화) ---
let gameInterval; // setInterval ID를 저장할 변수

function startGameLoop() {
    // 기존 인터벌이 있다면 제거 (중복 실행 방지)
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    gameInterval = setInterval(() => {
        if (!pet.isSleeping) {
            pet.hunger = Math.min(100, pet.hunger + 5);    // 배고픔 증가
            pet.energy = Math.min(100, pet.energy + 3);    // 피로도 증가
            pet.happiness = Math.max(0, pet.happiness - 2); // 행복도 감소
        }
        updatePetDisplay();
        saveGame(); // 매 상태 변화마다 저장
    }, 3000); // 3초마다 펫 상태 업데이트
}

// --- 데이터 저장 (localStorage) ---
function saveGame() {
    localStorage.setItem('virtualPet', JSON.stringify(pet));
}

// --- 이벤트 리스너 등록 ---
feedBtn.addEventListener('click', feedPet);
playBtn.addEventListener('click', playPet);
sleepBtn.addEventListener('click', sleepPet);

// --- 페이지 로드 시 게임 초기화 ---
document.addEventListener('DOMContentLoaded', initGame);