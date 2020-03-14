const Clock = () => {
  const minHand = document.querySelector('.minute')
  const hourHand = document.querySelector('.hour')

  function update () {
    const now = new Date()
    const seconds = now.getSeconds()

    const mins = now.getMinutes()
    const minsDegrees = (mins * 6) + (seconds / 60) * 6
    minHand.style.transform = `rotate(${minsDegrees}deg)`

    const hours = now.getHours()
    const hoursDegrees = (hours - 12) * 30 + (mins / 60) * 30
    // console.log(minsDegrees, hoursDegrees)
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`
  }
  setInterval(update, 1000)

  update()
}

export {
  Clock
} 