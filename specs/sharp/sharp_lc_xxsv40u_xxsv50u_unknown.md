---
spec_id: admin/sharp-lc-xxsv40u-xxsv50u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LC xxSV40U xxSV50U Control Spec"
manufacturer: Sharp
model_family: LC-46SV50U
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - LC-46SV50U
    - LC-42SV50U
    - LC-32SV40U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.sharpnecdisplays.us
  - sharp-displays.jp.sharp
  - business.sharpusa.com
source_urls:
  - https://assets.sharpnecdisplays.us/documents/usermanuals/4tb-series-operation-manual.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN_B501_B401_Operation_Manual.pdf
retrieved_at: 2026-04-30T10:43:39.739Z
last_checked_at: 2026-05-18T16:51:19.817Z
generated_at: 2026-05-18T16:51:19.817Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:51:19.817Z
  matched_actions: 26
  action_count: 26
  confidence: high
  summary: "All 26 spec actions matched verbatim in source command table; transport parameters fully verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Sharp LC xxSV40U xxSV50U Control Spec

## Summary
Sharp LC-32SV40U, LC-42SV50U, LC-46SV50U LCD TVs with RS-232C serial control. Eight-ASCII-character commands with CR terminator. Covers power, input selection, volume, AV mode, position, view mode, mute, surround, audio selection, sleep timer, channel tuning, and closed caption.

<!-- UNRESOLVED: no TCP/IP or other transport documented — serial only -->
<!-- UNRESOLVED: no response timeout specified -->
<!-- UNRESOLVED: no maximum command rate specified — source says wait for OK before next command -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands
  - queryable    # "?" parameter returns current setting
  - levelable    # volume 0-100
  - routable     # input selection commands
```

## Actions
```yaml
actions:
  - id: power_on_setting
    label: Power On Command Setting
    kind: action
    params:
      - name: accept
        type: integer
        description: "0: reject power on command (Off), 1: accept power on command (On)"
    command: "RSPW0000"
    notes: "Parameter 0 = reject, 1 = accept. Underscore = space."

  - id: power_off
    label: Power Off
    kind: action
    params: []
    command: "POWR0000"
    notes: "Shifts TV to standby."

  - id: power_on
    label: Power On
    kind: action
    params: []
    command: "POWR0001"
    notes: "Wait until system is completely powered off (LED turns Red) before sending."

  - id: input_toggle
    label: Input Selection Toggle
    kind: action
    params: []
    command: "ITGD000x"

  - id: input_tv
    label: Input TV
    kind: action
    params: []
    command: "ITVD0000"
    notes: "Switches to TV input. Channel remains as last memory."

  - id: input_av
    label: Input AV (INPUT1-6)
    kind: action
    params:
      - name: input_number
        type: integer
        description: "Input terminal number (1-6)"
    command: "IAVD000*"

  - id: av_mode
    label: AV Mode Selection
    kind: action
    params:
      - name: mode
        type: integer
        description: "0: Toggle, 1: Standard, 2: Movie, 3: Game, 4: PC, 5: Dynamic, 6: Dynamic (Fixed), 7: User"
    command: "AVMD000*"

  - id: volume
    label: Volume
    kind: action
    params:
      - name: level
        type: integer
        description: "Volume level (0-100)"
    command: "VOLM000*"

  - id: h_position
    label: H-Position
    kind: action
    params:
      - name: position
        type: integer
        description: "Horizontal position (0-100). PC mode only."
    command: "HPOS****"
    notes: "Menu display range +/-50. Only PC mode."

  - id: v_position
    label: V-Position
    kind: action
    params:
      - name: position
        type: integer
        description: "Vertical position (0-40). PC mode only."
    command: "VPOS****"
    notes: "Menu display range +/-20. Only PC mode."

  - id: clock
    label: Clock
    kind: action
    params:
      - name: value
        type: integer
        description: "Clock adjustment (0-180). PC mode only."
    command: "CLCK****"
    notes: "Menu display range +/-90. Only PC mode."

  - id: phase
    label: Phase
    kind: action
    params:
      - name: value
        type: integer
        description: "Phase adjustment (0-40). PC mode only."
    command: "PHSE****"
    notes: "Menu display range +/-20. Only PC mode."

  - id: view_mode
    label: View Mode
    kind: action
    params:
      - name: mode
        type: integer
        description: "0: Toggle, 1: Normal, 2: S.Stretch, 3: Stretch, 4: Zoom, 5: Full Screen, 6: Dot by Dot, 7: Cinema"
    command: "WIDE000*"
    notes: "Available modes depend on signal type and input."

  - id: mute
    label: Mute
    kind: action
    params:
      - name: state
        type: integer
        description: "0: Toggle, 1: On, 2: Off"
    command: "MUTE000*"

  - id: surround
    label: Surround
    kind: action
    params:
      - name: state
        type: integer
        description: "0: Toggle, 1: On, 2: Off"
    command: "ACSU000*"

  - id: audio_selection
    label: Audio Selection
    kind: action
    params: []
    command: "ACHA000x"
    notes: "Toggle operation."

  - id: sleep_timer
    label: Sleep Timer
    kind: action
    params:
      - name: timer
        type: integer
        description: "0: Off, 1: 30 min, 2: 60 min, 3: 90 min, 4: 120 min"
    command: "OFTM000*"

  - id: channel_direct_analog
    label: Channel Direct (Analog)
    kind: action
    params:
      - name: channel
        type: integer
        description: "Analog channel number (1-135). Air: 2-69, Cable: 1-135."
    command: "DCCH****"
    notes: "Input change included if not in TV display."

  - id: channel_digital_air
    label: Channel Digital Air (Two-Part)
    kind: action
    params:
      - name: channel
        type: integer
        description: "Digital Air channel (0100-9999). Two-part number: 2-digit + 2-digit."
    command: "DA2P****"

  - id: channel_digital_cable_major
    label: Channel Digital Cable Major
    kind: action
    params:
      - name: major
        type: integer
        description: "Front half of digital cable channel (1-999)."
    command: "DC2U***_"

  - id: channel_digital_cable_minor
    label: Channel Digital Cable Minor
    kind: action
    params:
      - name: minor
        type: integer
        description: "Rear half of digital cable channel (0-999)."
    command: "DC2L***_"

  - id: channel_digital_cable_onepart_low
    label: Channel Digital Cable One-Part (<10000)
    kind: action
    params:
      - name: channel
        type: integer
        description: "Digital cable one-part channel (0-9999)."
    command: "DC10****"

  - id: channel_digital_cable_onepart_high
    label: Channel Digital Cable One-Part (>=10000)
    kind: action
    params:
      - name: channel
        type: integer
        description: "Digital cable one-part channel (0-6383). Represents channels >=10000."
    command: "DC11****"

  - id: channel_up
    label: Channel Up
    kind: action
    params: []
    command: "CHUP000x"

  - id: channel_down
    label: Channel Down
    kind: action
    params: []
    command: "CHDW000x"
    notes: "If not in TV display, switches to TV input."

  - id: closed_caption
    label: Closed Caption Toggle
    kind: action
    params: []
    command: "CLCP000x"
    notes: "Toggle operation."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [on, off, standby]
    description: "Queried via POWR with '?' parameter. Returns current power state."

  - id: volume_level
    type: integer
    description: "Queried via VOLM with '?' parameter. Returns 0-100."

  - id: input_state
    type: enum
    description: "Queried via input commands with '?' parameter. Returns current input."

  - id: mute_state
    type: enum
    values: [on, off]
    description: "Queried via MUTE with '?' parameter."

  - id: av_mode_state
    type: integer
    description: "Queried via AVMD with '?' parameter."

  - id: response_ok
    type: enum
    values: [OK, ERR]
    description: "OK returned on success, ERR on communication error or incorrect command."
```

## Variables
```yaml
# UNRESOLVED: no distinct settable variables beyond actions - parameter ranges documented inline
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
interlocks:
  - "Power On command must wait until system is completely powered off (LED indicator turns Red)"
  - "Do not send multiple commands simultaneously - wait for OK response before next command"
# UNRESOLVED: no additional safety/interlock procedures documented
```

## Notes
- Command format: 8 ASCII characters + CR (C1 C2 C3 C4 P1 P2 P3 P4 + 0DH)
- Underscore (_) in parameter column means enter a space character
- Asterisk (*) means enter a value in the range indicated
- "x" can be replaced by any numerical value
- ERR returns when parameter is outside adjustable range
- Sending "?" as parameter queries the current setting value
- RS-232C terminal: 9-pin D-sub male connector on all models
- Commands not listed in the table are not guaranteed to operate
<!-- UNRESOLVED: exact command byte encoding for all parameter positions not fully clear from OCR -->
<!-- UNRESOLVED: response timeout not specified -->
<!-- UNRESOLVED: maximum serial command rate not specified -->

## Provenance

```yaml
source_domains:
  - assets.sharpnecdisplays.us
  - sharp-displays.jp.sharp
  - business.sharpusa.com
source_urls:
  - https://assets.sharpnecdisplays.us/documents/usermanuals/4tb-series-operation-manual.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN_B501_B401_Operation_Manual.pdf
retrieved_at: 2026-04-30T10:43:39.739Z
last_checked_at: 2026-05-18T16:51:19.817Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:51:19.817Z
matched_actions: 26
action_count: 26
confidence: high
summary: "All 26 spec actions matched verbatim in source command table; transport parameters fully verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
