---
spec_id: admin/classe-audio-ca-5100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio CA-5100 Control Spec"
manufacturer: "Classé"
model_family: CA-5100
aliases: []
compatible_with:
  manufacturers:
    - "Classé"
    - "Classe Audio"
  models:
    - CA-5100
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_Delta_Amps_RS232_Protocol.pdf
retrieved_at: 2026-05-31T19:03:52.409Z
last_checked_at: 2026-05-31T20:56:04.828Z
generated_at: 2026-05-31T20:56:04.828Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents only a subset of the full Delta/CT protocol; full command catalogue size unknown"
  - "amp=x and INPx=B/S appear to be persistent per-channel settings"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing documented"
  - "CA-5100 channel count not stated — affects expected heatsink line count in chk response"
  - "full Delta/CT command catalogue size unknown — source covers limited subset"
  - "IR remote codes, automation guide, and RS232 protocol PDF not accessible for richer spec"
verification:
  verdict: verified
  checked_at: 2026-05-31T20:56:04.828Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions matched literally to source commands with correct shapes and transport parameters fully verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-31
---

# Classe Audio CA-5100 Control Spec

## Summary
Classe Audio CA-5100 multi-channel power amplifier. RS-232C serial control protocol. Supports power on/off, mute, front panel dimming, AC module and heatsink status query, and per-channel input configuration. Serial: 9600 baud, 8N1, hardware flow control.

<!-- UNRESOLVED: source documents only a subset of the full Delta/CT protocol; full command catalogue size unknown -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: hardware
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
powerable: true  # PWR, PW0, PW1 present
queryable: true  # chk and fac return status
routable: true  # INPx=B/S configures per-channel input type
```

## Actions
```yaml
# Available at all times (amp on or off)

- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
  description: Toggles amplifier power state

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns amplifier off

- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns amplifier on

- id: dim_cycle
  label: Cycle Display Dimming
  kind: action
  params: []
  description: Cycles through full, medium, low brightness

- id: status_snapshot
  label: AC Module and Heatsink Status
  kind: query
  params: []
  description: Returns heatsink temperatures, AC line settings, internal temp, ground/phase/voltage status. Only available when amp is on

- id: version_info
  label: Version and Model Info
  kind: query
  params: []
  description: Returns D-AMP version, copyright, serial number, model, amp number. Last line omitted when amp is on

# Only available when amp is ON

- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []
  description: Toggles mute state

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: mute_on
  label: Mute On
  kind: action
  params: []

# Only available when amp is OFF

- id: set_amp_number
  label: Set Logical Amp Number
  kind: action
  params:
    - name: number
      type: integer
      description: Logical amp number for power-up delay (1 to 15)
  notes: Valid data is 1 to 15

- id: set_channel_input_balanced
  label: Set Channel Input Balanced
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
  notes: INPx=B format. Switches channel to Balanced input

- id: set_channel_input_single_ended
  label: Set Channel Input Single Ended
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
  notes: INPx=S format. Switches channel to Single Ended input
```

## Feedbacks
```yaml
- id: power_feedback
  type: enum
  values:
    - "_Amplifier now OFF._"
    - "_Amp already off._"
    - "_Power up in process. Amplifier now ON._"
    - "_Amp already on._"
    - "_A fault prevents power up._"
  description: Response to PWR, PW0, PW1

- id: mute_feedback
  type: enum
  values:
    - "_Mute off._"
    - "_Mute already off._"
    - "_Mute on._"
    - "_Mute already on._"
  description: Response to MUT, MU0, MU1

- id: dim_feedback
  type: enum
  values:
    - full_brightness
    - medium_brightness
    - low_brightness
  description: DIM cycles through these three states

- id: chk_feedback
  type: compound
  description: >
    chk response structure: Heatsink N: Current is Normal/Warning, TEMP is Normal/High/WARNING Temp is VERY HIGH (N = 1 to model-dependent max).
    AC Setting = 120, Line Freq. = 60Hz, Internal Temp. = ##C, Ground is OK, Line Phase is OK, Line Voltage is in spec, OK.
    When amp is off: first line reads "_This Amplifier is OFF_" and no heatsink lines follow.

- id: fac_feedback
  type: compound
  description: >
    fac response: D-AMP Ver: #.# Copyright (c) #### Classe Audio Sr No:######## Model: ########, Amp# ## OK AC Control: ##, Heatsink 1: ##, Heatsink 2: ##,...
    Last line omitted when amp is on.

- id: config_confirm
  type: enum
  values:
    - OK
  description: Confirm response for amp=x and INPx=B/S commands
```

## Variables
```yaml
# UNRESOLVED: amp=x and INPx=B/S appear to be persistent per-channel settings
# but source does not explicitly confirm storage behavior or enumerate all channels
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing documented
# Note: fac response includes "A fault prevents power up" - fault condition handling not detailed
```

## Notes
- Protocol header: "DELTA & CT AMPLIFIER (CA/CT-XXXX) RS232 Commands" — CA-5100 uses this same protocol family
- chk returns N heatsink lines where N depends on amplifier model (e.g., 5 for a 5-channel amp)
- fac omits last line while amp is on
- Italic text in source denotes amplifier reply strings
- Hardware flow control stated but RTS/CTS pinout not provided in source

<!-- UNRESOLVED: CA-5100 channel count not stated — affects expected heatsink line count in chk response -->
<!-- UNRESOLVED: full Delta/CT command catalogue size unknown — source covers limited subset -->
<!-- UNRESOLVED: IR remote codes, automation guide, and RS232 protocol PDF not accessible for richer spec -->

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_Delta_Amps_RS232_Protocol.pdf
retrieved_at: 2026-05-31T19:03:52.409Z
last_checked_at: 2026-05-31T20:56:04.828Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T20:56:04.828Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions matched literally to source commands with correct shapes and transport parameters fully verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents only a subset of the full Delta/CT protocol; full command catalogue size unknown"
- "amp=x and INPx=B/S appear to be persistent per-channel settings"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing documented"
- "CA-5100 channel count not stated — affects expected heatsink line count in chk response"
- "full Delta/CT command catalogue size unknown — source covers limited subset"
- "IR remote codes, automation guide, and RS232 protocol PDF not accessible for richer spec"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
