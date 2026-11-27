
import { useEffect, useRef, useState } from 'react'
import {
  getCharacterForms,
  getPowerTier,
} from '../data/battleStats'

const elementColors = {
  fire: '#F97316',
  wind: '#22C55E',
  lightning: '#A78BFA',
  water: '#38BDF8',
  earth: '#A16207',
  chakra: '#EAB308',
  wood: '#65A30D',
  sand: '#D6B36A',
  ice: '#67E8F9',
  lava: '#EF4444',
  dust: '#D1D5DB',
  paper: '#F1E3C6',
  shadow: '#94A3B8',
  ink: '#818CF8',
  taijutsu: '#FB7185',
}

function FormPortrait({ character }) {
  const [imageIndex, setImageIndex] = useState(0)

  const images = Array.isArray(character.images)
    ? character.images.filter(Boolean)
    : []

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-orange-500/30 bg-[#10151D]">

      {images[imageIndex] ? (
        <img
          src={images[imageIndex]}
          alt={character.name}
          onError={() =>
            setImageIndex(previous => previous + 1)
          }
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="flex h-full items-center justify-center">

          <span className="text-6xl text-gray-600">
            忍
          </span>

        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

    </div>
  )
}

function FormOption({
  form,
  selected,
  onSelect,
}) {
  const tier = getPowerTier(form.power)

  const tierColor = tier?.color || '#9CA3AF'

  const elementColor =
    elementColors[form.element] || '#9CA3AF'

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(form.id)}
      className={`relative w-full overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 sm:p-5 ${
        selected
          ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.12)]'
          : 'border-white/10 bg-[#202630] hover:border-orange-500/50 hover:bg-orange-500/5'
      }`}
    >

      {selected && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(249,115,22,0.12),transparent_70%)]" />
      )}

      <div className="relative flex items-center gap-3">

        <div
          className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
            selected
              ? 'border-orange-500 bg-orange-500 text-white'
              : 'border-gray-600 text-transparent'
          }`}
        >
          ✓
        </div>

        <div className="min-w-0 flex-1">

          <h3 className="text-sm leading-relaxed text-[#F1E3C6] sm:text-base">
            {form.name}
          </h3>

          <p
            className="mt-2 text-[10px] font-bold uppercase tracking-wider"
            style={{ color: tierColor }}
          >
            {tier?.name || 'Unknown Tier'}
          </p>

        </div>

        <div className="shrink-0 text-right">

          <p className="text-[9px] uppercase tracking-widest text-gray-400">
            Power
          </p>

          <p
            className="mt-1 text-2xl font-bold sm:text-3xl"
            style={{ color: tierColor }}
          >
            {form.power}
          </p>

        </div>

      </div>

      <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-black/50">

        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${form.power / 10}%`,
            backgroundColor: tierColor,
            boxShadow: `0 0 12px ${tierColor}`,
          }}
        />

      </div>

      <div className="relative mt-4 flex flex-wrap items-center justify-between gap-3">

        <span
          className="rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={{
            color: elementColor,
            borderColor: `${elementColor}55`,
            backgroundColor: `${elementColor}15`,
          }}
        >
          {form.element}
        </span>

        <p className="text-[10px] text-gray-300 sm:text-xs">
          {form.jutsu}
        </p>

      </div>

    </button>
  )
}

function BattleFormSelector({
  character,
  side = 'first',
  initialFormId,
  onClose,
  onBack,
  onConfirm,
}) {
  const forms = getCharacterForms(character.name)

  const [selectedFormId, setSelectedFormId] =
    useState(() => {
      const initialForm = forms.find(
        form => form.id === initialFormId
      )

      return initialForm?.id || forms[0]?.id || null
    })

  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const closeRef = useRef(onClose)

  const selectedForm = forms.find(
    form => form.id === selectedFormId
  )

  const selectedTier = selectedForm
    ? getPowerTier(selectedForm.power)
    : null

  const isFirst = side === 'first'

  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow

    const previousFocus =
      document.activeElement

    document.body.style.overflow = 'hidden'

    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeRef.current?.()
      }

      if (event.key === 'Tab') {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll(
            'button:not([disabled]), a[href], input:not([disabled])'
          ) || []
        )

        if (!focusable.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault()
          last.focus()
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener(
      'keydown',
      handleKeyDown
    )

    return () => {
      document.body.style.overflow =
        previousOverflow

      document.removeEventListener(
        'keydown',
        handleKeyDown
      )

      if (previousFocus?.isConnected) {
        previousFocus.focus()
      }
    }
  }, [])

  function confirmSelection() {
    if (!selectedForm) return

    onConfirm({
      character,
      form: selectedForm,
    })
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >

      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="battle-form-title"
        onClick={event => event.stopPropagation()}
        className="flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-orange-500/50 bg-[#15191F] text-[#F1E3C6] shadow-[0_0_60px_rgba(249,115,22,0.15)]"
      >

        <header className="shrink-0 border-b border-orange-500/20 p-4 sm:p-6">

          <div className="flex items-start justify-between gap-4">

            <div>

              <p className={`text-[10px] font-bold tracking-[0.2em] sm:text-xs ${
                isFirst
                  ? 'text-orange-400'
                  : 'text-indigo-400'
              }`}>
                PLAYER {isFirst ? '01' : '02'} — FORM SELECTION
              </p>

              <h2
                id="battle-form-title"
                className="mt-3 text-xl leading-relaxed sm:text-3xl"
              >
                {character.name.toUpperCase()}
              </h2>

              <p className="mt-3 text-xs text-gray-400">
                Choose your shinobi's transformation.
              </p>

            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close form selection"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-orange-500/30 text-xl text-orange-400 hover:border-orange-500 hover:bg-orange-500/10"
            >
              ✕
            </button>

          </div>

        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">

          <div className="grid gap-6 md:grid-cols-[240px_minmax(0,1fr)]">

            <aside>

              <div className="mx-auto max-w-[180px] md:max-w-none">

                <FormPortrait
                  key={character.id}
                  character={character}
                />

              </div>

              <div className="mt-4 rounded-xl border border-orange-500/20 bg-[#202630] p-4 text-center">

                <p className="text-[10px] uppercase tracking-widest text-gray-400">
                  Available Forms
                </p>

                <p className="mt-2 text-3xl font-bold text-orange-400">
                  {forms.length}
                </p>

              </div>

              {selectedForm && (

                <div className="mt-4 rounded-xl border border-orange-500/30 bg-black/30 p-4 text-center">

                  <p className="text-[10px] uppercase tracking-widest text-gray-400">
                    Selected Form
                  </p>

                  <h3 className="mt-3 text-sm leading-relaxed">
                    {selectedForm.name}
                  </h3>

                  <p
                    className="mt-4 text-4xl font-bold"
                    style={{
                      color: selectedTier?.color || '#F97316',
                    }}
                  >
                    {selectedForm.power}
                  </p>

                  <p
                    className="mt-2 text-xs font-bold"
                    style={{
                      color: selectedTier?.color || '#9CA3AF',
                    }}
                  >
                    {selectedTier?.name}
                  </p>

                  <div className="mt-4 border-t border-white/10 pt-4">

                    <p className="text-[10px] uppercase tracking-widest text-gray-400">
                      Signature Jutsu
                    </p>

                    <p className="mt-2 text-xs leading-6 text-orange-300">
                      {selectedForm.jutsu}
                    </p>

                  </div>

                </div>

              )}

            </aside>

            <div>

              <div className="mb-5">

                <p className="text-[10px] font-bold tracking-[0.25em] text-orange-400">
                  UNLEASH YOUR CHAKRA
                </p>

                <h3 className="mt-3 text-lg sm:text-xl">
                  CHOOSE YOUR FORM
                </h3>

                <p className="mt-3 text-xs leading-6 text-gray-400">
                  Each form has a unique power rating,
                  chakra element and signature jutsu.
                </p>

              </div>

              {forms.length > 0 ? (

                <div className="space-y-3">

                  {forms.map(form => (

                    <FormOption
                      key={form.id}
                      form={form}
                      selected={
                        selectedFormId === form.id
                      }
                      onSelect={setSelectedFormId}
                    />

                  ))}

                </div>

              ) : (

                <div className="rounded-xl border border-white/10 bg-[#202630] p-8 text-center">

                  <p className="text-4xl text-gray-600">
                    忍
                  </p>

                  <h3 className="mt-4 text-base">
                    No Forms Available
                  </h3>

                  <p className="mt-3 text-xs text-gray-400">
                    This shinobi has no battle power data.
                  </p>

                </div>

              )}

              <p className="mt-6 text-[10px] leading-5 text-gray-500">
                Power ratings are custom arena values
                and are not official Naruto statistics.
              </p>

            </div>

          </div>

        </div>

        <footer className="shrink-0 border-t border-orange-500/20 bg-[#10151D] p-4 sm:p-6">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-orange-500/30 px-5 py-3 text-xs font-bold text-orange-400 transition-all hover:bg-orange-500/10 sm:px-8"
            >
              ← BACK
            </button>

            <button
              type="button"
              disabled={!selectedForm}
              onClick={confirmSelection}
              className="flex-1 rounded-lg border border-orange-400 bg-orange-600 px-5 py-3 text-xs font-bold tracking-wider text-white shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-30 sm:flex-none sm:px-8 sm:text-sm"
            >
              CONFIRM FIGHTER
            </button>

          </div>

        </footer>

      </section>

    </div>
  )
}

export default BattleFormSelector
