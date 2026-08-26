import test from 'node:test'
import assert from 'node:assert/strict'

async function loadMetaPixelModule() {
  const module = await import(`./metaPixel.js?test=${Date.now()}${Math.random()}`)
  module.resetMetaPixelTracking()
  return module
}

test('tracks a lead event only once per submission id', async () => {
  const calls = []
  globalThis.window = {
    fbq: (...args) => {
      calls.push(args)
    },
  }

  const { createMetaEventId, trackMetaLeadOnce } = await loadMetaPixelModule()
  const submissionId = createMetaEventId('arch9_demo_lead')

  assert.equal(trackMetaLeadOnce(submissionId), true)
  assert.equal(trackMetaLeadOnce(submissionId), false)
  assert.equal(
    calls.filter(([command, eventName]) => command === 'track' && eventName === 'Lead').length,
    1,
  )

  delete globalThis.window
})

test('tracks a funnel visit only once per route key', async () => {
  const calls = []
  globalThis.window = {
    fbq: (...args) => {
      calls.push(args)
    },
  }

  const { trackMetaFunnelVisit } = await loadMetaPixelModule()

  assert.equal(trackMetaFunnelVisit('/book-demo'), true)
  assert.equal(trackMetaFunnelVisit('/book-demo'), false)
  assert.equal(trackMetaFunnelVisit('/contact'), true)
  assert.equal(
    calls.filter(([command, eventName]) => command === 'track' && eventName === 'Contact').length,
    2,
  )

  delete globalThis.window
})
