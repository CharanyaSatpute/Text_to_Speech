let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector('select');

window.speechSynthesis.onvoiceschanged = () =>{
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];
    voices.forEach((voice, i) => (voiceSelect.options[i]) = new Option(voice.name, i));
};

voiceSelect.addEventListener("change", ()=>{
    speech.voice = voices[voiceSelect.value];
})

document.querySelector("button").addEventListener("click", ()=>{
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
})
document.getElementById("download").addEventListener("click", () => {
    const textToSpeak = document.querySelector("textarea").value;
    
    if (textToSpeak.trim() !== "") {
        speech.text = textToSpeak;
        window.speechSynthesis.speak(speech);
        
        // Wait for the speech synthesis to finish before creating the download link
        speech.onend = () => {
            const audioBlob = new Blob([new Uint8Array([])], { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            
            const downloadLink = document.createElement('a');
            downloadLink.href = audioUrl;
            downloadLink.download = 'text_to_speech.wav';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };
    } else {
        alert("Please enter text in the textarea.");
    }
});