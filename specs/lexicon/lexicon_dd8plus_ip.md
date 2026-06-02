---
spec_id: admin/lexicon-dd8plus
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lexicon DD8+ Control Spec"
manufacturer: Lexicon
model_family: "Lexicon DD8+"
aliases: []
compatible_with:
  manufacturers:
    - Lexicon
  models:
    - "Lexicon DD8+"
    - DD8P
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lexicon.com
source_urls:
  - "https://www.lexicon.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwa48ad2d8/pdfs/Lexicon DD-8P_IP Control_Protocol.pdf"
  - https://www.lexicon.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwaf911684/pdfs/Lexicon_DD-8p_Network_and_Firmware_Guide.pdf
retrieved_at: 2026-05-21T05:56:02.857Z
last_checked_at: 2026-05-26T20:04:55.392Z
generated_at: 2026-05-26T20:04:55.392Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "port number not stated in source — device uses port 80 by default but explicit port not documented"
  - "no unsolicited event notifications described in source"
  - "no multi-step macros documented in source"
  - "port number not stated — default HTTP port 80 typical but not confirmed in source"
  - "power on/off commands not present in source — only auto_powerdown setting"
verification:
  verdict: verified
  checked_at: 2026-05-26T20:04:55.392Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 14 spec actions map cleanly to source endpoints; transport parameters verified; source command catalogue fully represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Lexicon DD8+ Control Spec

## Summary
The DD8P is a multi-channel audio processor controlled over TCP via an embedded HTTP server accepting JSON request/response packets. Clients send HTTP GET to query state and HTTP POST to change settings. No authentication required.

<!-- UNRESOLVED: port number not stated in source — device uses port 80 by default but explicit port not documented -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  base_url: http://{device_ip}
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # GET /info, /settings, /status, /input, /output, /channel, /pair
- routable        # input_mix / output_mix routing matrices
- levelable       # volume, trim_volume, bass_boost, treble_boost, limiter, hpf/lpf freq
```

## Actions
```yaml
- id: get_info
  label: Get Device Info
  kind: action
  params: []

- id: get_settings
  label: Get Settings
  kind: action
  params: []

- id: set_settings
  label: Set Settings
  kind: action
  params:
    - name: settings
      type: object
      description: Subset of settings object (max 512 bytes)

- id: get_status
  label: Get Status
  kind: action
  params: []

- id: get_input
  label: Get Input Settings
  kind: action
  params:
    - name: input_idx
      type: integer
      description: Input index 0-18

- id: set_input
  label: Set Input Settings
  kind: action
  params:
    - name: input_idx
      type: integer
      description: Input index 0-18
    - name: settings
      type: object
      description: "input_mix array or name"

- id: get_output
  label: Get Output Settings
  kind: action
  params:
    - name: output_idx
      type: integer
      description: Output index 0-7

- id: set_output
  label: Set Output Settings
  kind: action
  params:
    - name: output_idx
      type: integer
      description: Output index 0-7
    - name: settings
      type: object
      description: "mute, dim, volume, turn_on_volume, max_volume, limiter, output_mix"

- id: get_channel
  label: Get Channel Settings
  kind: action
  params:
    - name: channel_idx
      type: integer
      description: Channel index 0-7 (channels A-H)

- id: set_channel
  label: Set Channel Settings
  kind: action
  params:
    - name: channel_idx
      type: integer
      description: Channel index 0-7
    - name: settings
      type: object
      description: "trim_volume, volume, mute, bass_boost, treble_boost, hpf, lpf, delay"

- id: get_peq
  label: Get PEQ Band
  kind: action
  params:
    - name: channel_idx
      type: integer
      description: Channel index 0-7
    - name: band_idx
      type: integer
      description: PEQ band index 0-9

- id: set_peq
  label: Set PEQ Band
  kind: action
  params:
    - name: channel_idx
      type: integer
      description: Channel index 0-7
    - name: band_idx
      type: integer
      description: PEQ band index 0-9
    - name: settings
      type: object
      description: "enab, gain, freq, q"

- id: get_pair
  label: Get Channel Pair Settings
  kind: action
  params:
    - name: pair_idx
      type: integer
      description: Pair index 0-3

- id: set_pair
  label: Set Channel Pair Settings
  kind: action
  params:
    - name: pair_idx
      type: integer
      description: Pair index 0-3
    - name: settings
      type: object
      description: "mode"
```

## Feedbacks
```yaml
- id: device_info
  type: object
  description: "/info response"
  fields:
    device_type: string
    device_name: string
    mac: string
    ip: string
    app_version: string
    boot_version: string
    build: string

- id: settings_state
  type: object
  description: "/settings response - includes device_name, use_static_ip, static_ip, netmask, gateway, preset_settings_modified, loaded_preset, config_name, preset_names, auto_powerdown, green_mode"

- id: status_state
  type: object
  description: "/status response"
  fields:
    cfg_change_ctr: integer
    sig_present: array of boolean  # signal present per output
    sig_clip: array of boolean    # clip indicator per output
    trigger_in: integer

- id: input_state
  type: object
  description: "/input/INPUT_IDX response"
  fields:
    input_id: integer
    name: string
    input_mix: array of float  # routing mix coefficients

- id: output_state
  type: object
  description: "/output/OUTPUT_IDX response"
  fields:
    output_id: integer
    name: string
    mute: boolean
    dim: boolean
    volume: float  # dB
    turn_on_volume: float  # dB
    max_volume: float  # dB
    limiter: float  # dB threshold, 0 = disabled
    output_mix: array of float  # routing mix coefficients

- id: channel_state
  type: object
  description: "/channel/CHANNEL_IDX response"
  fields:
    ch_id: integer
    trim_volume: float  # dB
    volume: float  # dB
    mute: boolean
    bass_boost: float  # dB
    treble_boost: float  # dB
    hpf: object  # {mode: integer, freq: integer}
    lpf: object  # {mode: integer, freq: integer}
    delay: integer  # 48kHz samples, 0-720

- id: peq_state
  type: object
  description: "/channel/CHANNEL_IDX/peq/BAND_IDX response"
  fields:
    ch_id: integer
    band_id: integer
    enab: boolean
    gain: float  # dB
    freq: integer  # Hz
    q: float

- id: pair_state
  type: object
  description: "/pair/PAIR_IDX response"
  fields:
    pair_id: integer
    mode: integer
```

## Variables
```yaml
- id: auto_powerdown
  type: boolean
  writable: true
  description: Auto power-down enable (0=Off, 1=On)

- id: green_mode
  type: boolean
  writable: true
  description: Green mode enable (0=Off, 1=On)

- id: device_name
  type: string
  writable: true
  description: Device name, advertised to DHCP server

- id: use_static_ip
  type: boolean
  writable: true
  description: Use static IP instead of DHCP

- id: static_ip
  type: string
  writable: true
  description: Static IP address (aaa.bbb.ccc.ddd)

- id: netmask
  type: string
  writable: true
  description: Netmask (aaa.bbb.ccc.ddd)

- id: gateway
  type: string
  writable: true
  description: Gateway IP (aaa.bbb.ccc.ddd)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- TCP connection is single-session; server drops connection seconds after last activity. Poll ~once per second to keep alive.
- POST messages must be < 512 bytes.
- POST /settings responds with cfg_change_ctr for change detection.
- Server supports persistent (keep-alive) TCP connections.
<!-- UNRESOLVED: port number not stated — default HTTP port 80 typical but not confirmed in source -->
<!-- UNRESOLVED: power on/off commands not present in source — only auto_powerdown setting -->

## Provenance

```yaml
source_domains:
  - lexicon.com
source_urls:
  - "https://www.lexicon.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwa48ad2d8/pdfs/Lexicon DD-8P_IP Control_Protocol.pdf"
  - https://www.lexicon.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwaf911684/pdfs/Lexicon_DD-8p_Network_and_Firmware_Guide.pdf
retrieved_at: 2026-05-21T05:56:02.857Z
last_checked_at: 2026-05-26T20:04:55.392Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-26T20:04:55.392Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 14 spec actions map cleanly to source endpoints; transport parameters verified; source command catalogue fully represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "port number not stated in source — device uses port 80 by default but explicit port not documented"
- "no unsolicited event notifications described in source"
- "no multi-step macros documented in source"
- "port number not stated — default HTTP port 80 typical but not confirmed in source"
- "power on/off commands not present in source — only auto_powerdown setting"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
