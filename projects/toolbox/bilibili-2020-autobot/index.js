(function () {
  const increaseBtn = document.querySelector(".button.add.ibg .interactive.fzdysk")
  const decreaseBtn = document.querySelector(".button.minus.ibg .interactive.fzdysk")

  setInterval(() => {
    handleModal()
    handleIncrease()
  }, 10)

  setInterval(() => {
    handleDecrease()
  }, 1000 * 70)

  function handleIncrease() {
    increaseBtn.click()
  }

  function handleDecrease() {
    decreaseBtn.click()
  }

  function handleModal() {
    const modal = document.querySelector(".modal.visible")

    if (modal) {
      modal.querySelector(".close-button.ibg")
        .click()
    }

    return !!modal
  }

})()
