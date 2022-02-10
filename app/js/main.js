
function outer() {

  const showModalEditTimer = document.querySelector('.timer__start-time')
  const editModal = document.querySelector('.edit-timer');
  const container = document.querySelector('.container');

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


  function installTimerInput() {
    const timer = document.querySelectorAll('.timer__start-time')
    const hrsTime = document.querySelector('.edit-time__hrs-time');
    const minsTime = document.querySelector('.edit-time__mins-time')
    const secsTime = document.querySelector('.edit-time__secs-time')
    hrsTime.addEventListener('input', () => {
      if (hrsTime.value < 10) {
        console.log('hrsTime.value', hrsTime.value === '')
        timer[0].children[0].innerHTML = '0' + (hrsTime.value || 0)
        timer[1].children[0].innerHTML = '0' + (hrsTime.value || 0)
      } else if (hrsTime.value > 99) {
        timer[0].children[0].innerHTML = 99
        timer[1].children[0].innerHTML = 99
      } else {
        timer[0].children[0].innerHTML = hrsTime.value
        timer[1].children[0].innerHTML = hrsTime.value
      }
    })
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
    })

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


  function startTimer() {
    const clickStartBtn = document.querySelector('.timer__btn-start')
    clickStartBtn.addEventListener('click', () => {
      let timeNumber = showModalEditTimer.children
      let H = +timeNumber[0].textContent
      let M = +timeNumber[1].textContent
      let C = +timeNumber[2].textContent
      console.log('timeNumber', C)
      let index = C;
      if (H > 0 || M > 0 || C > 0) {
        let interval = setInterval(() => {
          index--
          if (index === 0) {
            clearInterval(interval)
          }
          if (index >= 10) {
            showModalEditTimer.children[2].innerHTML = index;
          } else {
            showModalEditTimer.children[2].innerHTML = '0' + index;
          }
          console.log('index', index)
        }, 1000)
      }
    })
  }

  startTimer()
}

outer()