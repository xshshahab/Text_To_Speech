document.addEventListener("DOMContentLoaded", () => {
    const speech = new SpeechSynthesisUtterance();
    const voiceSelect = document.getElementById('voiceSelect');
    const playButton = document.getElementById("play");
    const pauseButton = document.getElementById("pause");
    const resumeButton = document.getElementById("resume");
    const resetButton = document.getElementById("reset");
    const rateSlider = document.getElementById("rate");
    const rateValue = document.getElementById("rateValue");
    const textarea = document.getElementById("textarea");
    let voices = [];

    const populateVoiceList = () => {
        voices = window.speechSynthesis.getVoices();
        voiceSelect.innerHTML = '';
        voices
            .filter(voice => voice.lang.includes('en'))
            .forEach((voice, index) => {
                const option = document.createElement("option");
                const voiceName = voice.name.includes('Microsoft') ? voice.name.split(' ')[1] : voice.name;
                option.textContent = `${voiceName} (${voice.lang})`;
                option.value = index;
                voiceSelect.appendChild(option);
            });
        if (voices.length > 0) {
            speech.voice = voices[0];
        }
    };

    const setSpeechProperties = () => {
        speech.voice = voices[voiceSelect.value];
        speech.rate = rateSlider.value;
    };

    playButton.addEventListener("click", () => {
        const textToSpeak = textarea.value.trim();
        if (textToSpeak === "") {
            alert("Please write something to listen.");
            return;
        }
        
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        
        setSpeechProperties();
        speech.text = textToSpeak;
        window.speechSynthesis.speak(speech);
    });

    pauseButton.addEventListener("click", () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
        }
    });

    resumeButton.addEventListener("click", () => {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }
    });

    resetButton.addEventListener("click", () => {
        window.speechSynthesis.cancel();
        textarea.value = '';
    });

    rateSlider.addEventListener("input", () => {
        rateValue.textContent = rateSlider.value;
    });

    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    populateVoiceList();
});
