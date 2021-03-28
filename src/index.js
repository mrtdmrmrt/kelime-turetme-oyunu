import './css/main.css';
import { store } from './js/helpers/singleton';
import { names } from './js/names';
import { getNow, addMinutesToDate } from './js/helpers/date';
import {
  $pcName,
  $errorMSG,
  $pcPoint,
  $gamerPoint,
  pcPoint,
  gamerPoint,
} from './js/helpers/constant';
import { countdown } from './js/helpers/timer';
//Singleton object
let state = store.getInstance();
let transcript = state.getTranscript();
let lastName = state.getLastName();
let pcLastName = state.getPCLastName();
let pcName = state.getPCName();
const selectedNames = state.getSelectedName();
let tmpPcName = '';
let speakNames = [];

$pcPoint.innerHTML = pcPoint;
$gamerPoint.innerHTML = gamerPoint;

//14.110 * 30 / 1000 = 4233
const namesLength = (names.length * 30) / 100;

//speaking gamer
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

//pc speaking name 30%
for (let index = 0; index < namesLength; index++) {
  const random = Math.floor(Math.random() * namesLength);
  selectedNames.push(names[random]);
  state.setSelectedName(selectedNames);
}

recognition.onstart = function () {
  //mic start
  console.log('start mic');
};
recognition.onresult = function (event) {
  recognition.lang = 'tr-TR';
  transcript = '';
  transcript = Array.from(event.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');
  state.setTranscript(transcript);
  if (names.indexOf(transcript.toLowerCase()) == -1) {
    $errorMSG.innerHTML = 'ANLAMSIZ İSİM SÖYLEDİNİZ';
    pointCalculation('pcPoint');
  }
  if (pcLastName != transcript.toLowerCase().substring(0, 1)) {
    $errorMSG.innerHTML = 'ELENDİN SON HARF VE BAŞ HARF UYUŞMUYOR';
    pointCalculation('pcPoint');
  } else {
    lastName = transcript.slice(-1);
    state.setLastName(lastName);

    namesControll(transcript.toLowerCase(), 'gamer');
  }
  recognition.stop();
  const newDeadline = addMinutesToDate(getNow(), 0.15);
  setTimeout(() => {
    if (transcript === '') {
      $errorMSG.innerHTML = 'ELENDIN 8 SANIYE KONUSMADIN';
      pointCalculation('pcPoint');
    }
    setTimeout(() => {
      speakingPC();
    }, 1000);
  }, newDeadline);
};
//speaking gamer
function speakGamer() {
  transcript = '';
  state.setTranscript(transcript);
  const newDeadline = addMinutesToDate(getNow(), 0.15);
  countdown(newDeadline);
  recognition.start();
  setTimeout(() => {
    if (transcript === '') {
      $errorMSG.innerHTML = 'ELENDIN 8 SANIYE KONUSMADIN';
      pointCalculation('pcPoint');
    }
    setTimeout(() => {
      speakingPC();
    }, 1000);
  }, 8000);
}
//speaking pc
function speakingPC() {
  $errorMSG.innerHTML = '';
  if (lastName === '') {
    const randomSelectedName = Math.floor(Math.random() * selectedNames.length);
    tmpPcName = selectedNames[randomSelectedName];
  } else {
    pcName = selectedNames.filter((n) => n.substring(0, 1) === lastName);
    state.setPcName(pcName);
    const random = Math.floor(Math.random() * pcName.length);

    tmpPcName = pcName[random];
  }
  $pcName.innerHTML = tmpPcName;
  namesControll(tmpPcName.toLowerCase(), 'pc');
  pcLastName = tmpPcName.toLowerCase().slice(-1);

  state.setPCLastName(pcLastName);

  //güncel chrome da çalışmaya bilir kullanıcı activasyonu bekliyor.
  const synth = window.speechSynthesis;
  let utterThis = new SpeechSynthesisUtterance(tmpPcName);
  utterThis.lang = 'tr-TR';
  utterThis.pitch = 1;
  utterThis.volume = 1;
  synth.speak(utterThis);

  speakGamer();
}
//Aynı isimden birden fazla var mı yok mu
function namesControll(item, player = 'pc') {
  if (speakNames.indexOf(item) === -1) {
    speakNames.push(item);
  } else {
    $errorMSG.innerHTML = 'ELENDİN AYNI İSİMDEN BİRDEN FALZA VAR';
    let tmpPlayer = player === 'pc' ? 'gamerPoint' : 'pcPoint';
    pointCalculation(tmpPlayer);
  }
}
//Local storage da puan durumunun saklanması
function pointCalculation(player) {
  const total = Number(localStorage.getItem(player)) + 5;
  localStorage.setItem(player, total);
  $pcPoint.innerHTML = total;
}
speakingPC();
