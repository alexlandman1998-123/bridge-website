import { useMemo, useState } from 'react'

function parseNumericValue(value) {
  const parsed = Number(String(value).replace(/[^\d.]/g, ''))
  return Number.isFinite(parsed) ? parsed : null
}

export default function SliderInput({
  label,
  value,
  min,
  max,
  step,
  suffix,
  inputMode = 'decimal',
  formatDisplay,
  onChange,
}) {
  const [draftValue, setDraftValue] = useState(() => String(value))
  const [isFocused, setIsFocused] = useState(false)

  const displayValue = useMemo(() => {
    if (isFocused) return draftValue
    if (formatDisplay) return formatDisplay(value)
    return String(value)
  }, [draftValue, formatDisplay, isFocused, value])

  function commitValue(nextValue) {
    const numericValue = parseNumericValue(nextValue)
    if (numericValue === null) return
    onChange(numericValue)
  }

  return (
    <label className="block">
      <span className="flex items-end justify-between gap-4">
        <span className="text-sm font-extrabold text-[#101828]">{label}</span>
        {suffix ? <span className="text-xs font-bold text-[#667085]">{suffix}</span> : null}
      </span>
      <input
        className="mt-3 h-12 w-full rounded-[14px] border border-black/[0.08] bg-[#FBFAF7] px-4 text-base font-extrabold text-[#101828] outline-none transition focus:border-[#0D4F45]/38 focus:bg-white focus:ring-4 focus:ring-[#0D4F45]/10"
        inputMode={inputMode}
        min={min}
        max={max}
        step={step}
        type="text"
        value={displayValue}
        onChange={(event) => {
          setDraftValue(event.target.value)
          commitValue(event.target.value)
        }}
        onFocus={() => {
          setIsFocused(true)
          setDraftValue(String(value))
        }}
        onBlur={(event) => {
          setIsFocused(false)
          commitValue(event.target.value)
        }}
      />
      <input
        className="mt-4 block h-2 w-full cursor-pointer accent-[#0D4F45]"
        min={min}
        max={max}
        step={step}
        type="range"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={`${label} slider`}
      />
      <span className="mt-2 flex justify-between text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#98A2B3]">
        <span>{formatDisplay ? formatDisplay(min) : min}</span>
        <span>{formatDisplay ? formatDisplay(max) : max}</span>
      </span>
    </label>
  )
}
