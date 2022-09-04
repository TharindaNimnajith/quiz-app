import React, {useState} from 'react'
import {Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem} from 'reactstrap'
import {carousel1} from '../../../../shared/images'
import './admin-dashboard-component.css'

const AdminDashboardComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const next = () => {
    if (animating) {
      return
    }
    const nextIndex = activeIndex === carousel1.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) {
      return
    }
    const nextIndex = activeIndex === 0 ? carousel1.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const goToIndex = (newIndex) => {
    if (animating) {
      return
    }
    setActiveIndex(newIndex)
  }

  const slides = carousel1.map((item, index) => {
    return (
      <CarouselItem key={index}
                    onExiting={() => setAnimating(true)}
                    onExited={() => setAnimating(false)}>
        <div align='center'>
          <img src={item.src}
               alt={item.altText}
               width={item.width}
               height={item.height}/>
        </div>
        <CarouselCaption captionHeader={item.captionHeader}
                         captionText={item.captionText}
                         className='text'/>
      </CarouselItem>
    )
  })

  return (
    <div>
      <Carousel activeIndex={activeIndex}
                next={next}
                previous={previous}
                className='to-back'>
        <CarouselIndicators items={carousel1}
                            activeIndex={activeIndex}
                            onClickHandler={goToIndex}/>
        {slides}
        <CarouselControl direction='prev'
                         directionText='Previous'
                         onClickHandler={previous}/>
        <CarouselControl direction='next'
                         directionText='Next'
                         onClickHandler={next}/>
      </Carousel>
    </div>
  )
}

export default AdminDashboardComponent
