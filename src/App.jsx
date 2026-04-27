import { useEffect, useRef, useState } from 'react'
import './App.css'
import page1Image from './assets/page-image/p1.png'
import page2Image from './assets/page-image/p2.jpg'
import page3Image from './assets/page-image/p3.jpg'
import page4Image from './assets/page-image/p4.jpg'
import page5Image from './assets/page-image/p5.jpg'
import page6Image from './assets/page-image/p6.jpg'
import page7Image from './assets/page-image/p7.jpg'
import page8Image from './assets/page-image/p8.jpg'
import page9Image from './assets/page-image/p9.jpg'
import page10Image from './assets/page-image/p10.jpg'
import page11Image from './assets/page-image/p11.jpg'
import page12Image from './assets/page-image/p12.jpg'
import page13Image from './assets/page-image/p13.jpg'
import page14Image from './assets/page-image/p14.jpg'
import page15Image from './assets/page-image/p15.jpg'
import page16Image from './assets/page-image/p16.jpg'
import page17Image from './assets/page-image/p17.jpg'
import page18Image from './assets/page-image/p18.jpg'
import page19Image from './assets/page-image/p19.jpg'
import page20Image from './assets/page-image/p20.jpg'
import page21Image from './assets/page-image/p21.jpg'
import page22Image from './assets/page-image/p22.jpg'
import page23Image from './assets/page-image/p23.jpg'
import page24Image from './assets/page-image/p24.jpg'
import page25Image from './assets/page-image/p25.jpg'
import page26Image from './assets/page-image/p26.jpg'
import page27Image from './assets/page-image/p27.jpg'
import page28Image from './assets/page-image/p28.jpg'
import film1Image from './assets/film-image/film1.png'
import film2Image from './assets/film-image/film2.png'
import film3Image from './assets/film-image/film3.png'
import film4Image from './assets/film-image/film4.png'
import film5Image from './assets/film-image/film5.png'
import elephantFrameImage from './assets/frame-image/elephant-frame.png'
import orangutanFrameImage from './assets/frame-image/orang-frame.png'
import batFrameImage from './assets/frame-image/bat-frame.png'
import otterFrameImage from './assets/frame-image/otter-frame.png'
import wolfFrameImage from './assets/frame-image/wolf-frame.png'

const TOTAL_PAGES = 28
const FRONT_COVER_PAGE = 1
const FIRST_SPREAD_LEFT_PAGE = 2
const LAST_SPREAD_LEFT_PAGE = TOTAL_PAGES - 2
const BACK_COVER_PAGE = TOTAL_PAGES

const animalCards = [
  { id: 'elephant', name: 'African Forest Elephant', color: '#CF5348', triggerPage: 7 },
  { id: 'orangutan', name: 'Bornean Orangutan', color: '#D28B40', triggerPage: 11 },
  { id: 'bat', name: 'Brazilian Free-tailed Bat', color: '#B288E7', triggerPage: 15 },
  { id: 'otter', name: 'Sea Otter', color: '#4D9E79', triggerPage: 19 },
  { id: 'wolf', name: 'Gray Wolf', color: '#7896D8', triggerPage: 23 },
]

const actionItems = [
  { id: 'feeding', label: 'Feeding', icon: '🍎' },
  { id: 'cleaning', label: 'Cleaning', icon: '🌿' },
  { id: 'restoring', label: 'Restoring', icon: '💧' },
]


const createInitialAnimalProgress = () =>
  animalCards.reduce((acc, animal) => {
    acc[animal.name] = {
      feeding: false,
      cleaning: false,
      restoring: false,
      reveal: 0,
    }
    return acc
  }, {})

function App() {
  const [stage, setStage] = useState('cover')
  const [currentLeftPage, setCurrentLeftPage] = useState(FIRST_SPREAD_LEFT_PAGE)
  const [isTurning, setIsTurning] = useState(false)
  const [turnDirection, setTurnDirection] = useState('next')
  const [animalProgress, setAnimalProgress] = useState(createInitialAnimalProgress)
  const changeTimerRef = useRef(null)
  const endTimerRef = useRef(null)

  useEffect(() => {
    if (stage !== 'opening') {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setStage('spread')
    }, 580)

    return () => window.clearTimeout(timer)
  }, [stage])

  useEffect(() => {
    return () => {
      if (changeTimerRef.current) {
        window.clearTimeout(changeTimerRef.current)
      }
      if (endTimerRef.current) {
        window.clearTimeout(endTimerRef.current)
      }
    }
  }, [])

  const openBook = () => {
    if (stage !== 'cover') {
      return
    }
    setCurrentLeftPage(FIRST_SPREAD_LEFT_PAGE)
    setStage('opening')
  }

  const goToPreviousSpread = () => {
    if (isTurning) {
      return
    }
    if (stage === 'back-cover') {
      setTurnDirection('prev')
      setIsTurning(true)
      endTimerRef.current = window.setTimeout(() => {
        setCurrentLeftPage(LAST_SPREAD_LEFT_PAGE)
        setStage('spread')
        setIsTurning(false)
      }, 580)
      return
    }
    if (stage !== 'spread') {
      return
    }
    if (currentLeftPage <= FIRST_SPREAD_LEFT_PAGE) {
      setTurnDirection('prev')
      setIsTurning(true)
      endTimerRef.current = window.setTimeout(() => {
        setStage('cover')
        setIsTurning(false)
      }, 580)
      return
    }
    setTurnDirection('prev')
    setIsTurning(true)
    changeTimerRef.current = window.setTimeout(() => {
      setCurrentLeftPage((prev) => Math.max(FIRST_SPREAD_LEFT_PAGE, prev - 2))
    }, 260)
    endTimerRef.current = window.setTimeout(() => {
      setIsTurning(false)
    }, 580)
  }

  const goToNextSpread = () => {
    if (stage === 'cover') {
      openBook()
      return
    }
    if (stage !== 'spread' || isTurning) {
      return
    }
    if (currentLeftPage >= LAST_SPREAD_LEFT_PAGE) {
      setTurnDirection('next')
      setIsTurning(true)
      endTimerRef.current = window.setTimeout(() => {
        setStage('back-cover')
        setIsTurning(false)
      }, 580)
      return
    }
    setTurnDirection('next')
    setIsTurning(true)
    changeTimerRef.current = window.setTimeout(() => {
      setCurrentLeftPage((prev) => Math.min(LAST_SPREAD_LEFT_PAGE, prev + 2))
    }, 260)
    endTimerRef.current = window.setTimeout(() => {
      setIsTurning(false)
    }, 580)
  }

  const leftPageNumber = currentLeftPage
  const rightPageNumber = Math.min(currentLeftPage + 1, TOTAL_PAGES)
  const activeAnimal =
    stage === 'spread'
      ? (animalCards.find(
          (animal) => animal.triggerPage === leftPageNumber || animal.triggerPage === rightPageNumber
        ) ?? null)
      : null
  const activeAnimalName = activeAnimal?.name ?? null
  const activeAnimalState = activeAnimalName ? animalProgress[activeAnimalName] : null
  const isRevealUnlocked = activeAnimalState
    ? activeAnimalState.feeding && activeAnimalState.cleaning && activeAnimalState.restoring
    : false
  const scanimationDropPage = activeAnimal?.triggerPage ?? null
  const isLeftDropZone = scanimationDropPage === leftPageNumber
  const isRightDropZone = scanimationDropPage === rightPageNumber
  const scanimationPages = new Set(animalCards.map((animal) => animal.triggerPage))
  const animalByPage = new Map(animalCards.map((animal) => [animal.triggerPage, animal]))

  const handleActionDragStart = (event, actionId) => {
    event.dataTransfer.setData('text/plain', actionId)
    event.dataTransfer.effectAllowed = 'move'
    const selection = window.getSelection?.()
    selection?.removeAllRanges()

    const dragTarget = event.currentTarget
    if (dragTarget instanceof HTMLElement) {
      event.dataTransfer.setDragImage(dragTarget, dragTarget.clientWidth / 2, dragTarget.clientHeight / 2)
    }
  }

  const handleDropZoneDragOver = (event, canDrop) => {
    if (!canDrop) {
      return
    }
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const handleDropOnScanimation = (event, canDrop) => {
    if (!canDrop || !activeAnimalName) {
      return
    }
    event.preventDefault()
    const droppedAction = event.dataTransfer.getData('text/plain')
    if (!['feeding', 'cleaning', 'restoring'].includes(droppedAction)) {
      return
    }
    setAnimalProgress((prev) => ({
      ...prev,
      [activeAnimalName]: {
        ...prev[activeAnimalName],
        [droppedAction]: true,
      },
    }))
  }

  const handleRevealChange = (event) => {
    if (!activeAnimalName || !isRevealUnlocked) {
      return
    }
    const nextValue = Number(event.target.value)
    setAnimalProgress((prev) => ({
      ...prev,
      [activeAnimalName]: {
        ...prev[activeAnimalName],
        reveal: nextValue,
      },
    }))
  }


  const canGoPrevious = (stage === 'spread' || stage === 'back-cover') && !isTurning
  const canGoNext = (stage === 'cover' || (stage === 'spread' && rightPageNumber < TOTAL_PAGES)) && !isTurning
  const isAnimalActiveSpread = stage === 'spread' && Boolean(activeAnimalName)
  const activeAnimalClassMap = {
    'African Forest Elephant': 'animal-card--tone-elephant',
    'Bornean Orangutan': 'animal-card--tone-orangutan',
    'Brazilian Free-tailed Bat': 'animal-card--tone-bat',
    'Sea Otter': 'animal-card--tone-otter',
    'Gray Wolf': 'animal-card--tone-wolf',
  }
  const scanimationDepthLayers = [
    { triggerPage: 7, baseSrc: page7Image, filmSrc: film1Image, frameSrc: elephantFrameImage, widthRatio: 1 },
    { triggerPage: 11, baseSrc: page11Image, filmSrc: film2Image, frameSrc: orangutanFrameImage, widthRatio: 1.125 },
    { triggerPage: 15, baseSrc: page15Image, filmSrc: film3Image, frameSrc: batFrameImage, widthRatio: 1.25 },
    { triggerPage: 19, baseSrc: page19Image, filmSrc: film4Image, frameSrc: otterFrameImage, widthRatio: 1.375 },
    { triggerPage: 23, baseSrc: page23Image, filmSrc: film5Image, frameSrc: wolfFrameImage, widthRatio: 1.5 },
  ]
  const futureDepthLayers =
    stage === 'spread' ? scanimationDepthLayers.filter((layer) => layer.triggerPage > rightPageNumber).slice(0, 5) : []
  const coverDepthLayers = stage === 'cover' ? scanimationDepthLayers : []

  const renderSpreadPage = (pageNumber) => {
    if (
      (pageNumber >= 2 && pageNumber <= 6) ||
      pageNumber === 8 ||
      pageNumber === 9 ||
      pageNumber === 10 ||
      pageNumber === 12 ||
      pageNumber === 13 ||
      pageNumber === 14 ||
      pageNumber === 16 ||
      pageNumber === 17 ||
      pageNumber === 18 ||
      pageNumber === 20 ||
      pageNumber === 21 ||
      pageNumber === 22 ||
      pageNumber === 24 ||
      pageNumber === 25 ||
      pageNumber === 26 ||
      pageNumber === 27
    ) {
      const pageImageMap = {
        2: page2Image,
        3: page3Image,
        4: page4Image,
        5: page5Image,
        6: page6Image,
        8: page8Image,
        9: page9Image,
        10: page10Image,
        12: page12Image,
        13: page13Image,
        14: page14Image,
        16: page16Image,
        17: page17Image,
        18: page18Image,
        20: page20Image,
        21: page21Image,
        22: page22Image,
        24: page24Image,
        25: page25Image,
        26: page26Image,
        27: page27Image,
      }
      const imageSrc = pageImageMap[pageNumber]
      return (
        <>
          <img className="spread-page-image" src={imageSrc} alt={`Page ${pageNumber}`} />
        </>
      )
    }

    const scanAnimal = animalByPage.get(pageNumber)
    if (!scanimationPages.has(pageNumber) || !scanAnimal) {
      return <p>Page {pageNumber}</p>
    }

    const progress = animalProgress[scanAnimal.name]
    const revealValue = progress?.reveal ?? 0
    const filmBaseShiftMap = {
      7: 3,
    }
    const filmBaseShift = filmBaseShiftMap[pageNumber] ?? 0
    const filmShift = filmBaseShift + Math.round((revealValue / 100) * 36)
    const scanimationBaseImageMap = {
      7: page7Image,
      11: page11Image,
      15: page15Image,
      19: page19Image,
      23: page23Image,
    }
    const scanimationFilmImageMap = {
      7: film1Image,
      11: film2Image,
      15: film3Image,
      19: film4Image,
      23: film5Image,
    }
    const scanimationTopFrameImageMap = {
      7: elephantFrameImage,
      11: orangutanFrameImage,
      15: batFrameImage,
      19: otterFrameImage,
      23: wolfFrameImage,
    }
    const baseImageSrc = scanimationBaseImageMap[pageNumber]
    const filmImageSrc = scanimationFilmImageMap[pageNumber]
    const topFrameImageSrc = scanimationTopFrameImageMap[pageNumber]

    return (
      <>
        <div
          className={`scanimation-stage scanimation-stage--full ${
            pageNumber === 7 ? 'scanimation-stage--page7' : ''
          }`}
          aria-label={`${scanAnimal.name} scanimation`}
        >
          <div className={`scanimation-background scanimation-background--${scanAnimal.id}`}>
            {baseImageSrc ? (
              <img className="scanimation-background-image" src={baseImageSrc} alt={`Page ${pageNumber} base`} />
            ) : null}
            <span className="scanimation-animal-label">{scanAnimal.name}</span>
          </div>
          {filmImageSrc ? (
            <div className="scanimation-film-wrapper" style={{ '--film-shift': `${filmShift}px` }}>
              <div className="scanimation-film-viewport">
                <img className="scanimation-film-core-image" src={filmImageSrc} alt={`Film layer for page ${pageNumber}`} />
              </div>
            </div>
          ) : null}
          {topFrameImageSrc ? (
            <img className="scanimation-top-frame-image" src={topFrameImageSrc} alt={`Top frame for page ${pageNumber}`} />
          ) : null}
          <div className="scanimation-frame" />
        </div>
        <p className="spread-page-number">Page {pageNumber}</p>
      </>
    )
  }

  return (
    <main className={`experience experience--${stage}`}>
      <p className="logo-mark">
        <span>EXTINCTION</span>
        <span>ENSEMBLE</span>
      </p>

      <div className="stage-layout">
        <button
          type="button"
          className="nav-arrow nav-arrow--left"
          onClick={goToPreviousSpread}
          disabled={!canGoPrevious}
          aria-label={
            stage === 'back-cover'
              ? 'Previous spread'
              : stage === 'spread' && currentLeftPage === FIRST_SPREAD_LEFT_PAGE
                ? `Go to page ${FRONT_COVER_PAGE}`
                : 'Previous spread'
          }
        >
          &#8592;
        </button>

        <section className="book-zone" aria-label="Book stage">
          {stage === 'spread' ? (
            <div
              className={`spread-placeholder ${
                isTurning
                  ? turnDirection === 'prev' && currentLeftPage === FIRST_SPREAD_LEFT_PAGE
                    ? 'spread-placeholder--to-cover'
                    : turnDirection === 'next' && currentLeftPage === LAST_SPREAD_LEFT_PAGE
                      ? 'spread-placeholder--to-back-cover'
                      : `spread-placeholder--turning-${turnDirection}`
                  : ''
              } ${leftPageNumber === 6 && rightPageNumber === 7 ? 'spread-placeholder--layout-6-7' : ''} ${
                leftPageNumber === 8 && rightPageNumber === 9 ? 'spread-placeholder--layout-8-9' : ''
              } ${leftPageNumber === 10 && rightPageNumber === 11 ? 'spread-placeholder--layout-10-11' : ''} ${
                leftPageNumber === 12 && rightPageNumber === 13 ? 'spread-placeholder--layout-12-13' : ''
              } ${leftPageNumber === 14 && rightPageNumber === 15 ? 'spread-placeholder--layout-14-15' : ''} ${
                leftPageNumber === 16 && rightPageNumber === 17 ? 'spread-placeholder--layout-16-17' : ''
              } ${leftPageNumber === 18 && rightPageNumber === 19 ? 'spread-placeholder--layout-18-19' : ''} ${
                leftPageNumber === 20 && rightPageNumber === 21 ? 'spread-placeholder--layout-20-21' : ''
              } ${
                leftPageNumber === 22 && rightPageNumber === 23 ? 'spread-placeholder--layout-22-23' : ''
              } ${leftPageNumber === 24 && rightPageNumber === 25 ? 'spread-placeholder--layout-24-25' : ''} ${
                leftPageNumber === 26 && rightPageNumber === 27 ? 'spread-placeholder--layout-26-27' : ''
              } ${rightPageNumber <= 7 ? 'spread-placeholder--depth-offset-1-7' : ''}`}
              role="status"
              aria-live="polite"
            >
              <div
                className={`spread-page spread-page--left ${isLeftDropZone ? 'spread-page--dropzone' : ''}`}
                onDragOver={(event) => handleDropZoneDragOver(event, isLeftDropZone)}
                onDrop={(event) => handleDropOnScanimation(event, isLeftDropZone)}
              >
                {renderSpreadPage(leftPageNumber)}
              </div>
              <div
                className={`spread-page spread-page--right ${isRightDropZone ? 'spread-page--dropzone' : ''}`}
                onDragOver={(event) => handleDropZoneDragOver(event, isRightDropZone)}
                onDrop={(event) => handleDropOnScanimation(event, isRightDropZone)}
              >
                {futureDepthLayers.length > 0 && !(isTurning && turnDirection === 'next') ? (
                  <div className="spread-page-behind-stack" aria-hidden="true">
                    {futureDepthLayers.map((layer, index) => (
                      <div
                        key={layer.triggerPage}
                        className="behind-page-layer"
                        style={{
                          '--behind-page-width-ratio': layer.widthRatio,
                          zIndex: futureDepthLayers.length - index,
                        }}
                      >
                        <img className="behind-page-layer__base" src={layer.baseSrc} alt="" />
                        <img className="behind-page-layer__film" src={layer.filmSrc} alt="" />
                        <img className="behind-page-layer__frame" src={layer.frameSrc} alt="" />
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="spread-page-content">
                  {renderSpreadPage(rightPageNumber)}
                  {isRightDropZone ? <span className="dropzone-hint">Drop actions here</span> : null}
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`book-cover ${
                stage === 'opening'
                  ? 'book-cover--opening'
                  : stage === 'back-cover' && isTurning && turnDirection === 'prev'
                      ? 'book-cover--back-exit'
                      : ''
              } ${stage !== 'back-cover' ? 'book-cover--page-image' : ''}`}
              role={stage === 'back-cover' ? 'img' : undefined}
              aria-label={stage === 'back-cover' ? `Back cover page ${BACK_COVER_PAGE}` : undefined}
            >
              {stage === 'back-cover' ? (
                <img className="book-cover-image" src={page28Image} alt={`Page ${BACK_COVER_PAGE} cover`} />
              ) : (
                <div className="book-cover-content">
                  {coverDepthLayers.length > 0 ? (
                    <div className="book-cover-behind-stack" aria-hidden="true">
                      {coverDepthLayers.map((layer, index) => (
                        <div
                          key={`cover-${layer.triggerPage}`}
                          className="behind-page-layer"
                          style={{
                            '--behind-page-width-ratio': layer.widthRatio,
                            zIndex: coverDepthLayers.length - index,
                          }}
                        >
                          <img className="behind-page-layer__base" src={layer.baseSrc} alt="" />
                          <img className="behind-page-layer__film" src={layer.filmSrc} alt="" />
                          <img className="behind-page-layer__frame" src={layer.frameSrc} alt="" />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <img className="book-cover-image" src={page1Image} alt="Page 1 cover" />
                </div>
              )}
            </div>
          )}
        </section>

        <button
          type="button"
          className="nav-arrow nav-arrow--right"
          onClick={goToNextSpread}
          disabled={!canGoNext || stage === 'opening'}
          aria-label={stage === 'cover' ? 'Open book' : 'Next spread'}
        >
          &#8594;
        </button>

        <aside
          className={`controller-panel ${stage === 'cover' ? 'controller-panel--cover' : ''}`}
          aria-label="Controller panel (locked)"
        >
          <p className="controller-title">controler</p>
          <article className={`system-card ${isAnimalActiveSpread ? 'system-card--active' : 'system-card--inactive'}`}>
            <h2>System</h2>
            <ul>
              <li className={activeAnimalState?.feeding ? 'system-item system-item--filled' : 'system-item'}>
                <span>Health</span>
                <span className="system-item__value">{activeAnimalState?.feeding ? 'Alive' : 'Empty'}</span>
              </li>
              <li className={activeAnimalState?.cleaning ? 'system-item system-item--filled' : 'system-item'}>
                <span>Ecosystem</span>
                <span className="system-item__value">{activeAnimalState?.cleaning ? 'Alive' : 'Empty'}</span>
              </li>
              <li className={activeAnimalState?.restoring ? 'system-item system-item--filled' : 'system-item'}>
                <span>Habitat</span>
                <span className="system-item__value">{activeAnimalState?.restoring ? 'Alive' : 'Empty'}</span>
              </li>
            </ul>
          </article>

          <div className="animal-card-list">
            {animalCards.map((animal) => (
              <article
                key={animal.name}
                className={`animal-card ${
                  activeAnimalName !== animal.name ? 'animal-card--inactive' : 'animal-card--active'
                } ${stage === 'cover' ? 'animal-card--cover' : ''} ${
                  isAnimalActiveSpread && animal.name === activeAnimalName ? 'animal-card--expanded' : ''
                } ${isAnimalActiveSpread && animal.name === activeAnimalName ? activeAnimalClassMap[animal.name] : ''}`}
                aria-disabled={activeAnimalName !== animal.name}
                aria-current={activeAnimalName === animal.name ? 'true' : undefined}
              >
                <p className="animal-card__name">{animal.name}</p>
                <span className="animal-card__theme" style={{ '--theme': animal.color }} />
                {isAnimalActiveSpread && animal.name === activeAnimalName ? (
                  <div className="animal-card__active-ui">
                    <div className="animal-card__actions">
                      {actionItems.map((action) => {
                        const completed = Boolean(activeAnimalState?.[action.id])
                        return (
                          <div key={action.id} className="animal-action-row">
                            <span className="animal-action-row__label">{action.label}</span>
                            {!completed ? (
                              <button
                                type="button"
                                className="animal-action-drag"
                                draggable
                                onDragStart={(event) => handleActionDragStart(event, action.id)}
                                aria-label={`${action.label} action icon`}
                              >
                                {action.icon}
                              </button>
                            ) : (
                              <span className="animal-action-slot" aria-hidden="true" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                    <label className={`animal-reveal ${isRevealUnlocked ? 'animal-reveal--enabled' : ''}`}>
                      <span>Reveal</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={activeAnimalState?.reveal ?? 0}
                        onChange={handleRevealChange}
                        disabled={!isRevealUnlocked}
                        aria-label="Reveal scanimation"
                      />
                    </label>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}

export default App
