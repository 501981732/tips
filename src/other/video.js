// 执行语音合成 

const speechSynthesis = message => {
    const msg = new SpeechSynthesisUtterance(message);
    msg.voice = window.speechSynthesis.getVoices()[0]; // 转换语音信息
    window.speechSynthesis.speak(msg); // 播放语音信息
};
