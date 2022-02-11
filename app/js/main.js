
function outer() {

  const showModalEditTimer = document.querySelector('.timer__start-time')
  const clickStartBtn = document.querySelector('.timer__btn-start')
  const editModal = document.querySelector('.edit-timer');
  const progress = document.querySelector('.timer__line');
  const container = document.querySelector('.container');

  let index = 0
  let timeResetHour = 0;
  let timeResetMin = 0;
  let timeResetSec = 0;


  function clickOnTime() {
    showModalEditTimer.addEventListener('click', () => {
      editModal.style.display = 'block'
      container.style.top = '60%';
    })

    installTimerInput()
    newNameTimer()
  }

  clickOnTime()

  function clickOnCloseModal() {
    const closeModalBtn = document.querySelector('.edit-timer__btn-close');
    closeModalBtn.addEventListener('click', () => {
      editModal.style.display = 'none'
      container.style.top = '30%';
    })
  }

  clickOnCloseModal()

  function clickDoneModal() {
    const doneModalClose = document.querySelector('.edit-timer__btn-done');
    doneModalClose.addEventListener('click', () => {
      editModal.style.display = 'none'
      container.style.top = '30%';
    })
  }

  clickDoneModal()



  // модальное окно input-s
  function installTimerInput() {
    const timer = document.querySelectorAll('.timer__start-time')
    hrsTimeInputData(timer)
    minsTimeInputData(timer)
    secsTimeInputData(timer)
  }


  function hrsTimeInputData(timer) {
    const hrsTime = document.querySelector('.edit-timer__hrs-time');
    hrsTime.addEventListener('input', () => {
      if (hrsTime.value < 10) {
        timer[0].children[0].innerHTML = '0' + (hrsTime.value || 0)
        timer[1].children[0].innerHTML = '0' + (hrsTime.value || 0)
      } else if (hrsTime.value > 99) {
        timer[0].children[0].innerHTML = 99
        timer[1].children[0].innerHTML = 99
      } else {
        timer[0].children[0].innerHTML = hrsTime.value
        timer[1].children[0].innerHTML = hrsTime.value
      }
      timeResetHour = timer[0].children[0].textContent;
    })
  }

  function minsTimeInputData(timer) {
    const minsTime = document.querySelector('.edit-timer__mins-time')
    minsTime.addEventListener('input', () => {
      if (minsTime.value < 10) {
        timer[0].children[1].innerHTML = '0' + (minsTime.value || 0)
        timer[1].children[1].innerHTML = '0' + (minsTime.value || 0)
      } else if (minsTime.value > 59) {
        timer[0].children[1].innerHTML = 59
        timer[1].children[1].innerHTML = 59
      } else {
        timer[0].children[1].innerHTML = minsTime.value
        timer[1].children[1].innerHTML = minsTime.value
      }
      timeResetMin = timer[0].children[1].textContent;
    })
  }

  function secsTimeInputData(timer) {
    const secsTime = document.querySelector('.edit-timer__secs-time')
    secsTime.addEventListener('input', () => {
      if (secsTime.value < 10) {
        timer[0].children[2].innerHTML = '0' + (secsTime.value || 0)
        timer[1].children[2].innerHTML = '0' + (secsTime.value || 0)
      } else if (secsTime.value > 59) {
        timer[0].children[2].innerHTML = 59
        timer[1].children[2].innerHTML = 59
      } else {
        timer[0].children[2].innerHTML = secsTime.value
        timer[1].children[2].innerHTML = secsTime.value
      }
      timeResetSec = timer[0].children[2].textContent;
    })
  }


  function newNameTimer() {
    const setNameInput = document.querySelector('.edit-timer__name-input');
    const timerName = document.querySelector('.timer__name');
    setNameInput.value = timerName.textContent
    setNameInput.addEventListener('input', () => {
      timerName.innerHTML = setNameInput.value
    })
  }

  function clickEditShowModal() {
    const timerEdit = document.querySelector('.timer__edit')
    timerEdit.addEventListener('click', () => {
      editModal.style.display = 'block'
    })
  }

  clickEditShowModal()




  // выполнение отсчета заданного времени
  // увеличение линии пройденного времени
  function startTimer() {
    clickStartBtn.addEventListener('click', () => {
      let timeNumber = showModalEditTimer.children
      let H = +timeNumber[0].textContent
      let M = +timeNumber[1].textContent
      let C = +timeNumber[2].textContent
      let sec = C;
      let min = M;
      let hour = H;
      let counter = 0;

      counter += sec;
      counter += min * 60;
      counter += hour * 3600;


      if (H > 0 || M > 0 || C > 0) {

        let line = ((100 - index) / counter)

        if (clickStartBtn.textContent === 'Start') {
          clickStartBtn.innerHTML = 'Pause'
        } else {
          clickStartBtn.innerHTML = 'Start'
        }
        let interval = setInterval(() => {
          if (clickStartBtn.textContent === 'Start') {
            clearInterval(interval)
            clicBtnReset()
          }
          if (sec === 1 && min === 0 && hour === 0) {
            clearInterval(interval)
            clicBtnReset()
            clickStartBtn.setAttribute('disabled', 'disabled')
          } else if (sec === 0 && min > 0) {
            min--
            sec = 60
          } else if (sec === 0 && min === 0 && hour > 0) {
            min = 59;
            sec = 60;
            hour--
          }

          sec--;

          if (hour === 0) {
            showModalEditTimer.children[0].innerHTML = '00';
          } else if (hour >= 10) {
            showModalEditTimer.children[0].innerHTML = hour;
          } else {
            showModalEditTimer.children[0].innerHTML = '0' + hour;
          }
          if (min === 0) {
            showModalEditTimer.children[1].innerHTML = '00';
          } else if (min >= 10) {
            showModalEditTimer.children[1].innerHTML = min;
          } else {
            showModalEditTimer.children[1].innerHTML = '0' + min;
          }
          if (sec >= 10) {
            showModalEditTimer.children[2].innerHTML = sec;
          } else {
            showModalEditTimer.children[2].innerHTML = '0' + sec;
          }

          if (index !== 100) {
            index += line
            progress.style.width = index + '%'
          }


        }, 1000)
      }
    })
  }

  function clicBtnReset() {
    const clickResetBtn = document.querySelector('.timer__btn-reset')
    const timeNum = showModalEditTimer.children
    clickResetBtn.removeAttribute('disabled')
    clickResetBtn.style.background = 'blue'
    clickResetBtn.style.color = '#fff'

    clickResetBtn.addEventListener('click', () => {
      clickResetBtn.setAttribute('disabled', 'disabled')
      clickResetBtn.style.background = ''
      clickResetBtn.style.color = 'gray'

      timeNum[0].innerHTML = (timeResetHour || '00')
      timeNum[1].innerHTML = (timeResetMin || '00')
      timeNum[2].innerHTML = (timeResetSec || '00')


      clickStartBtn.innerHTML = 'Start'
      clickStartBtn.removeAttribute('disabled')
      progress.style.width = '0%';
      index = 0
    })
  }

  startTimer()
}

outer()