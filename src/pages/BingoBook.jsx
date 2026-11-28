
import {
  useEffect,
  useState,
  useRef,
  forwardRef,
} from 'react'

import { Link } from 'react-router-dom'
import HTMLFlipBook from 'react-pageflip'

import {
  bingoRecords as records,
  bingoCategories as categories,
} from '../data/bingoBook'

import { getBingoCharacter } from '../services/bingoBookService'
import BingoPortrait from '../components/BingoPortrait'

import './BingoBookEntrance.css'

const INDEX_PAGES = 6
const TOTAL_PAGES = INDEX_PAGES + records.length * 2

const BOUNTIES = [
  500000,
  400000,
  1000000,
  750000,
  2500000,
  1500000,
  3000000,
]

function ArchiveAtmosphere({ isOpen }) {
  return (
    <div
      className={`bingo-atmosphere transition-opacity duration-700 ${
        isOpen ? 'opacity-70' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <div className="bingo-atmosphere-glow" />

      <div className="bingo-mist bingo-mist-one" />
      <div className="bingo-mist bingo-mist-two" />

      <span className="bingo-background-kanji kanji-one">
        忍
      </span>

      <span className="bingo-background-kanji kanji-two">
        木
      </span>

      <span className="bingo-background-kanji kanji-three">
        秘
      </span>

      {Array.from({ length: 24 }, (_, index) => (
        <span
          key={index}
          className="bingo-gold-particle"
          style={{
            '--particle-x': `${(index * 37) % 100}%`,
            '--particle-y': `${(index * 23) % 100}%`,
            '--particle-size': `${2 + index % 4}px`,
            '--particle-delay': `${-(index * 0.7)}s`,
            '--particle-duration': `${7 + index % 6}s`,
          }}
        />
      ))}
    </div>
  )
}

function BingoInformationScroll() {
  return (
    <aside className="bingo-scroll-area">
      <div className="bingo-scroll-floating">
        <div className="bingo-scroll-roller bingo-scroll-top" />

        <div className="bingo-scroll-paper">
          <div className="bingo-scroll-content">
            <img
              src={`${import.meta.env.BASE_URL}images/konoha-logo.png`}
              alt="Hidden Leaf Village"
              className="bingo-scroll-emblem"
            />

            <span className="bingo-scroll-label">
              KONOHA INTELLIGENCE
            </span>

            <div className="bingo-scroll-divider" />

            <h2>
              WHAT IS THE
              <br />
              BINGO BOOK?
            </h2>

            <p>
              The Bingo Book is a confidential intelligence
              archive used by shinobi villages to identify
              wanted ninja, missing-nin and dangerous
              individuals across the shinobi world.
            </p>

            <p>
              Each record contains information about a
              shinobi's identity, affiliation, classification
              and bounty reward.
            </p>

            <div className="bingo-scroll-divider" />

            <span className="bingo-scroll-restricted">
              AUTHORIZED SHINOBI ONLY
            </span>

            <div className="bingo-scroll-stamp">
              CLASSIFIED
            </div>
          </div>
        </div>

        <div className="bingo-scroll-roller bingo-scroll-bottom" />
      </div>
    </aside>
  )
}

function BountyAnimations() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((previous) => (
        (previous + 1) % BOUNTIES.length
      ))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <aside className="bingo-bounty-area">
      <div className="bingo-bounty-heading">
        <span>両</span>
        <h2>BOUNTY RECORDS</h2>
        <p>SHINOBI REWARD SYSTEM</p>
      </div>

      <div className="bingo-bounty-cards">
        {Array.from({ length: 3 }, (_, index) => {
          const amount = BOUNTIES[
            (offset + index) % BOUNTIES.length
          ]

          return (
            <div
              key={index}
              className={`bingo-floating-bounty bounty-card-${index + 1}`}
            >
              <div className="bingo-ryo-coin">
                <span>両</span>
              </div>

              <div className="bingo-bounty-text">
                <span className="bingo-bounty-label">
                  BOUNTY REWARD
                </span>

                <strong
                  key={amount}
                  className="bingo-bounty-amount"
                >
                  {amount.toLocaleString('en-US')}
                </strong>

                <span className="bingo-bounty-currency">
                  RYŌ
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bingo-floating-coins" aria-hidden="true">
        {Array.from({ length: 7 }, (_, index) => (
          <span
            key={index}
            className="bingo-small-coin"
            style={{
              '--coin-x': `${8 + index * 14}%`,
              '--coin-delay': `${-index * 1.3}s`,
              '--coin-duration': `${7 + index % 4}s`,
            }}
          >
            両
          </span>
        ))}
      </div>

      <p className="bingo-bounty-notice">
        ILLUSTRATIVE BOUNTY VALUES
      </p>
    </aside>
  )
}

const BookPage = forwardRef(function BookPage(
  { children, side, number },
  ref
) {
  return (
    <div ref={ref} className="bingo-flip-page">
      <section className={`bingo-page bingo-${side}-page`}>
        {children}

        <span className="bingo-page-number">
          {number}
        </span>
      </section>
    </div>
  )
})

function BingoBook() {
  const bookRef = useRef(null)
  const pageSoundRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  const recordIndex = Math.floor(
    (currentPage - INDEX_PAGES) / 2
  )

  const record = records[recordIndex]

  useEffect(() => {
    const audio = new Audio(
      `${import.meta.env.BASE_URL}sounds/page-turn.mp3`
    )

    audio.volume = 0.4
    audio.preload = 'auto'

    pageSoundRef.current = audio

    return () => {
      audio.pause()
      pageSoundRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isOpen || !record) {
      setCharacter(null)
      setLoading(false)
      setError('')
      return
    }

    const controller = new AbortController()

    async function loadCharacter() {
      setCharacter(null)
      setLoading(true)
      setError('')

      try {
        const data = await getBingoCharacter(
          record.name,
          controller.signal
        )

        if (controller.signal.aborted) return

        if (!data) {
          setError('Character record not found.')
          return
        }

        setCharacter(data)
      } catch {
        if (controller.signal.aborted) return

        setError('Archive connection lost.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadCharacter()

    return () => controller.abort()
  }, [isOpen, record, retryCount])

  function playPageSound() {
    const audio = pageSoundRef.current

    if (!audio) return

    audio.pause()
    audio.currentTime = 0

    audio.play().catch(() => {})
  }

  function changePage(page) {
    if (isFlipping) return
    if (page < 0 || page >= TOTAL_PAGES) return

    bookRef.current?.pageFlip()?.flip(page)
  }

  function closeBook() {
    setIsOpen(false)
    setCurrentPage(0)
    setCharacter(null)
    setLoading(false)
    setError('')
    setIsFlipping(false)

    const audio = pageSoundRef.current

    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }

  function handleFlip(event) {
    setCurrentPage(event.data)
  }

  function handleStateChange(event) {
    setIsFlipping(event.data !== 'read')

    if (event.data === 'flipping') {
      playPageSound()
    }
  }

  function renderCategory(category) {
    const categoryRecords = records
      .map((item, index) => ({
        ...item,
        originalIndex: index,
      }))
      .filter((item) => item.category === category)

    return (
      <div className="bingo-index-section bingo-category-page">
        <div className="bingo-category-symbol">
          忍
        </div>

        <h2 className="bingo-category-title">
          {category}
        </h2>

        <p className="bingo-category-count">
          {categoryRecords.length} SHINOBI RECORDS
        </p>

        <div className="bingo-index-records">
          {categoryRecords.map((item) => (
            <button
              key={item.name}
              className="bingo-index-link"
              onClick={() =>
                changePage(
                  INDEX_PAGES + item.originalIndex * 2
                )
              }
            >
              <span>{item.name}</span>

              <span className="bingo-index-dots" />

              <span className="bingo-index-page-number">
                {item.originalIndex * 2 + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const indexPages = [
    <BookPage key="intro" side="left" number="I">
      <div className="bingo-page-header">
        RESTRICTED ARCHIVES
      </div>

      <div className="bingo-intro-symbol">
        忍
      </div>

      <h2 className="bingo-page-title">
        Bingo Book
      </h2>

      <p className="bingo-introduction">
        Confidential records of rogue shinobi,
        criminal organizations and legendary threats.
      </p>

      <div className="bingo-secret-stamp">
        CLASSIFIED
      </div>

      <p className="bingo-record-number">
        {records.length} SHINOBI RECORDS
      </p>
    </BookPage>,

    <BookPage key="index-1" side="right" number="II">
      <div className="bingo-page-header">
        SHINOBI INDEX
      </div>

      {renderCategory(categories[0])}
    </BookPage>,

    <BookPage key="index-2" side="left" number="III">
      <div className="bingo-page-header">
        SHINOBI INDEX
      </div>

      {renderCategory(categories[1])}
    </BookPage>,

    <BookPage key="index-3" side="right" number="IV">
      <div className="bingo-page-header">
        SHINOBI INDEX
      </div>

      {renderCategory(categories[2])}
    </BookPage>,

    <BookPage key="index-4" side="left" number="V">
      <div className="bingo-page-header">
        SHINOBI INDEX
      </div>

      {renderCategory(categories[3])}
    </BookPage>,

    <BookPage key="archive" side="right" number="VI">
      <div className="bingo-page-header">
        ARCHIVE INFORMATION
      </div>

      <div className="bingo-archive-information">
        <div className="bingo-intro-symbol">
          木
        </div>

        <h2 className="bingo-page-title">
          Shinobi Intelligence
        </h2>

        <p className="bingo-introduction">
          This archive contains classified records
          from the shinobi world.
        </p>

        <div className="bingo-archive-statistics">
          <div>
            <strong>{records.length}</strong>
            <span>SHINOBI RECORDS</span>
          </div>

          <div>
            <strong>{categories.length}</strong>
            <span>CLASSIFICATIONS</span>
          </div>

          <div>
            <strong>2</strong>
            <span>SHINOBI ERAS</span>
          </div>
        </div>

        <p className="bingo-archive-disclaimer">
          Fan-made archive inspired by Naruto and
          Naruto Shippuden. Bounty rewards are
          unofficial unless otherwise stated.
        </p>

        <button
          className="bingo-dossier-button"
          onClick={() => changePage(INDEX_PAGES)}
        >
          BEGIN SHINOBI RECORDS →
        </button>
      </div>
    </BookPage>,
  ]

  const characterPages = records.flatMap((item, index) => {
    const isActive = index === recordIndex

    return [
      <BookPage
        key={`${item.name}-left`}
        side="left"
        number={index * 2 + 1}
      >
        <div className="bingo-page-header">
          KONOHA INTELLIGENCE
        </div>

        <h2 className="bingo-wanted-title">
          WANTED
        </h2>

        <BingoPortrait
          key={`${item.name}-${retryCount}`}
          character={isActive ? character : null}
          name={item.name}
          loading={!isActive || loading}
        />

        <h2 className="bingo-character-name">
          {item.name}
        </h2>

        <p className="bingo-record-number">
          RECORD NO.{' '}
          {String(index + 1).padStart(3, '0')}
        </p>
      </BookPage>,

      <BookPage
        key={`${item.name}-right`}
        side="right"
        number={index * 2 + 2}
      >
        <div className="bingo-page-header">
          CONFIDENTIAL RECORD
        </div>

        <div className="bingo-information">
          <span>CLASSIFICATION</span>
          <h3>{item.category}</h3>
        </div>

        <div className="bingo-information">
          <span>ORGANIZATION</span>
          <h3>{item.organization}</h3>
        </div>

        <div className="bingo-information">
          <span>VILLAGE OF ORIGIN</span>
          <h3>{item.village}</h3>
        </div>

        <div className="bingo-reward">
          <span>BOUNTY REWARD</span>

          <strong>
            {item.reward.toLocaleString('en-US')}
          </strong>

          <span>RYŌ — 両</span>

          <small>
            {item.rewardType === 'Official'
              ? 'Official reward'
              : 'Unofficial reward'}
          </small>
        </div>

        {isActive && character?.id != null ? (
          <Link
            to={`/characters/${character.id}`}
            className="bingo-dossier-button"
          >
            VIEW DOSSIER →
          </Link>
        ) : (
          <button
            className="bingo-dossier-button"
            disabled
          >
            {!isActive || loading
              ? 'RETRIEVING RECORD...'
              : 'DOSSIER UNAVAILABLE'}
          </button>
        )}

        {isActive && error && (
          <div className="bingo-api-error">
            <p>{error}</p>

            <button
              onClick={() =>
                setRetryCount((count) => count + 1)
              }
            >
              TRY AGAIN
            </button>
          </div>
        )}
      </BookPage>,
    ]
  })

  return (
    <main className="bingo-archive bingo-entrance-active relative isolate min-h-screen overflow-hidden">

      <ArchiveAtmosphere isOpen={isOpen} />

      {isOpen && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,rgba(197,149,76,0.12),transparent_65%)]"
        />
      )}

      <header className="bingo-header relative z-10">
        <span>KONOHA INTELLIGENCE DIVISION</span>
        <h1>BINGO BOOK</h1>
        <p>Confidential Shinobi Archives</p>
      </header>

      {!isOpen ? (
        <div className="bingo-entrance-layout">
          <BingoInformationScroll />

          <div className="bingo-closed-container">
            <button
              className="bingo-cover"
              onClick={() => setIsOpen(true)}
              aria-label="Open Bingo Book"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/bingo-book-cover.png`}
                alt="Shinobi Bingo Book"
                className="bingo-cover-image"
                draggable={false}
              />
            </button>

            <p className="bingo-open-hint">
              CLICK TO OPEN THE BOOK
            </p>
          </div>

          <BountyAnimations />
        </div>
      ) : (
        <div className="bingo-open-container relative z-10">

          <div className="bingo-real-book">
            <HTMLFlipBook
              ref={bookRef}
              width={500}
              height={720}
              size="stretch"
              minWidth={280}
              maxWidth={500}
              minHeight={404}
              maxHeight={720}
              flippingTime={800}
              maxShadowOpacity={0.5}
              drawShadow={true}
              showCover={false}
              usePortrait={true}
              autoSize={true}
              startPage={0}
              mobileScrollSupport={true}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={true}
              renderOnlyPageLengthChange={false}
              onFlip={handleFlip}
              onChangeState={handleStateChange}
              className="bingo-pageflip"
            >
              {[...indexPages, ...characterPages]}
            </HTMLFlipBook>
          </div>

          <p className="bingo-flip-hint">
            DRAG THE PAGE CORNERS TO TURN
          </p>

          <div className="bingo-bottom-navigation flex justify-center">
            <button
              onClick={closeBook}
              disabled={isFlipping}
            >
              CLOSE BOOK
            </button>
          </div>

        </div>
      )}
    </main>
  )
}

export default BingoBook
