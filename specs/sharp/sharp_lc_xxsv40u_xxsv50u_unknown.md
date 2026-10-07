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
  - files.sharpusa.com
  - assets.sharpnecdisplays.us
  - github.com
  - manualslib.com
source_urls:
  - http://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC32SV40U_LC42SV50U_LC46SV50U.pdf
  - https://assets.sharpnecdisplays.us/documents/miscellaneous/pj-control-command-codes.pdf
  - https://github.com/golliher/go-sharptv
  - https://github.com/jdwhite/aquosctl
  - https://www.manualslib.com/brand/sharp/
retrieved_at: 2026-05-15T02:35:06.944Z
last_checked_at: 2026-09-28T14:21:57.780Z
generated_at: 2026-09-28T14:21:57.780Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no TCP/IP or other transport documented — serial only"
  - "no response timeout specified"
  - "no maximum command rate specified — source says wait for OK before next command"
  - "authentication requirements are not specified"
  - "source does not identify which commands accept queries or specify power response values.\""
  - "source does not establish VOLM query support or response encoding. The settable volume range is 0-100.\""
  - "source does not identify a query-capable input command or response encoding.\""
  - "source does not establish MUTE query support or response encoding.\""
  - "source does not establish AVMD query support or response encoding.\""
  - "no distinct settable variables beyond actions - parameter ranges documented inline"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no additional safety/interlock procedures documented"
  - "exact command byte encoding for all parameter positions not fully clear from OCR"
  - "response timeout not specified"
  - "maximum serial command rate not specified"
verification:
  verdict: verified
  checked_at: 2026-09-28T14:21:57.780Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 table-backed actions match; documented framing is retained and unspecified query/channel encodings remain explicit gaps. (16 unresolved item(s) noted in Known Gaps.)"
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
  type: unknown  # UNRESOLVED: authentication requirements are not specified
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
    command: "RSPW"
    notes: "Parameter is accept followed by three spaces (0 = reject, 1 = accept); append CR. Underscore in the source means a space."

  - id: power_off
    label: Power Off
    kind: action
    params: []
    command: "POWR"
    notes: "Parameter is 0 followed by three spaces; append CR. Shifts TV to standby."

  - id: power_on
    label: Power On
    kind: action
    params: []
    command: "POWR"
    notes: "Parameter is 1 followed by three spaces; append CR. Wait until system is completely powered off (LED turns Red) before sending."

  - id: input_toggle
    label: Input Selection Toggle
    kind: action
    params: []
    command: "ITGD"
    notes: "Parameter x is any numerical value; complete the four-character parameter with spaces. Append CR."

  - id: input_tv
    label: Input TV
    kind: action
    params: []
    command: "ITVD"
    notes: "Parameter 0, with spaces for the remainder of the four-character parameter. Append CR. Switches to TV input; channel remains as last memory."

  - id: input_av
    label: Input AV (INPUT1-6)
    kind: action
    params:
      - name: input_number
        type: integer
        description: "Input terminal number (1-6)"
    command: "IAVD"

  - id: av_mode
    label: AV Mode Selection
    kind: action
    params:
      - name: mode
        type: integer
        description: "0: Toggle, 1: Standard, 2: Movie, 3: Game, 4: PC, 5: Dynamic, 6: Dynamic (Fixed), 7: User"
    command: "AVMD"

  - id: volume
    label: Volume
    kind: action
    params:
      - name: level
        type: integer
        description: "Volume level (0-100)"
    command: "VOLM"

  - id: h_position
    label: H-Position
    kind: action
    params:
      - name: position
        type: integer
        description: "Horizontal position (0-100). PC mode only."
    command: "HPOS"
    notes: "Menu display range +/-50. Only PC mode."

  - id: v_position
    label: V-Position
    kind: action
    params:
      - name: position
        type: integer
        description: "Vertical position (0-40). PC mode only."
    command: "VPOS"
    notes: "Menu display range +/-20. Only PC mode."

  - id: clock
    label: Clock
    kind: action
    params:
      - name: value
        type: integer
        description: "Clock adjustment (0-180). PC mode only."
    command: "CLCK"
    notes: "Menu display range +/-90. Only PC mode."

  - id: phase
    label: Phase
    kind: action
    params:
      - name: value
        type: integer
        description: "Phase adjustment (0-40). PC mode only."
    command: "PHSE"
    notes: "Menu display range +/-20. Only PC mode."

  - id: view_mode
    label: View Mode
    kind: action
    params:
      - name: mode
        type: integer
        description: "0: Toggle, 1: Normal, 2: S.Stretch, 3: Stretch, 4: Zoom, 5: Full Screen, 6: Dot by Dot, 7: Cinema"
    command: "WIDE"
    notes: "Available modes depend on signal type and input."

  - id: mute
    label: Mute
    kind: action
    params:
      - name: state
        type: integer
        description: "0: Toggle, 1: On, 2: Off"
    command: "MUTE"

  - id: surround
    label: Surround
    kind: action
    params:
      - name: state
        type: integer
        description: "0: Toggle, 1: On, 2: Off"
    command: "ACSU"

  - id: audio_selection
    label: Audio Selection
    kind: action
    params: []
    command: "ACHA"
    notes: "Parameter x is any numerical value; complete the four-character parameter with spaces. Append CR. Toggle operation."

  - id: sleep_timer
    label: Sleep Timer
    kind: action
    params:
      - name: timer
        type: integer
        description: "0: Off, 1: 30 min, 2: 60 min, 3: 90 min, 4: 120 min"
    command: "OFTM"

  - id: channel_direct_analog
    label: Channel Direct (Analog)
    kind: action
    params:
      - name: channel
        type: integer
        description: "Analog channel number (1-135). Air: 2-69, Cable: 1-135."
    command: "DCCH"
    notes: "Input change included if not in TV display."

  - id: channel_digital_air
    label: Channel Digital Air (Two-Part)
    kind: action
    params:
      - name: channel
        type: integer
        description: "Digital Air channel (0100-9999). Two-part number: 2-digit + 2-digit."
    command: "DA2P"
    notes: "The source specifies two two-digit parts occupying all four parameter positions (0100-9999); retain required leading zeroes, for example 0100, rather than replacing them with trailing spaces."

  - id: channel_digital_cable_major
    label: Channel Digital Cable Major
    kind: action
    params:
      - name: major
        type: integer
        description: "Front half of digital cable channel (1-999); source parameter pattern is three value positions followed by one space."
    command: "DC2U"

  - id: channel_digital_cable_minor
    label: Channel Digital Cable Minor
    kind: action
    params:
      - name: minor
        type: integer
        description: "Rear half of digital cable channel (0-999); source parameter pattern is three value positions followed by one space."
    command: "DC2L"

  - id: channel_digital_cable_onepart_low
    label: Channel Digital Cable One-Part (<10000)
    kind: action
    params:
      - name: channel
        type: integer
        description: "Digital cable one-part channel (0-9999)."
    command: "DC10"

  - id: channel_digital_cable_onepart_high
    label: Channel Digital Cable One-Part (High Range)
    kind: action
    params:
      - name: channel
        type: integer
        description: "Raw parameter range 0-6383. The source describes this as digital cable one-part numbers more than 10000; logical channel-to-parameter mapping and boundary behavior are UNRESOLVED."
    command: "DC11"

  - id: channel_up
    label: Channel Up
    kind: action
    params: []
    command: "CHUP"
    notes: "Parameter x is any numerical value; complete the four-character parameter with spaces. Append CR."

  - id: channel_down
    label: Channel Down
    kind: action
    params: []
    command: "CHDW"
    notes: "Parameter x is any numerical value; complete the four-character parameter with spaces. Append CR. If not in TV display, switches to TV input."

  - id: closed_caption
    label: Closed Caption Toggle
    kind: action
    params: []
    command: "CLCP"
    notes: "Parameter x is any numerical value; complete the four-character parameter with spaces. Append CR. Toggle operation."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    description: "Power-state response placeholder; UNRESOLVED: source does not identify which commands accept queries or specify power response values."

  - id: volume_level
    type: integer
    description: "Volume response placeholder; UNRESOLVED: source does not establish VOLM query support or response encoding. The settable volume range is 0-100."

  - id: input_state
    type: enum
    description: "Input-state response placeholder; UNRESOLVED: source does not identify a query-capable input command or response encoding."

  - id: mute_state
    type: enum
    description: "Mute-state response placeholder; UNRESOLVED: source does not establish MUTE query support or response encoding."

  - id: av_mode_state
    type: integer
    description: "AV-mode response placeholder; UNRESOLVED: source does not establish AVMD query support or response encoding."

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
- Each `command` field contains the four-character mnemonic reconstructed from the source table columns. It is not a complete request. Send that mnemonic followed by the four-character parameter and CR (0DH): C1 C2 C3 C4 P1 P2 P3 P4.
- Enter the parameter value within its documented range and format, preserving required digits (including the four-digit DA2P format); fill any remaining parameter positions with spaces. Do not prepend the invented `000` padding from the earlier spec. Explicit underscores in the source require spaces. The source does not establish every formatting detail for every numeric width; test against the device before relying on ambiguous cases.
- Underscore (_) in parameter column means enter a space character
- Asterisk (*) means enter a value in the range indicated
- "x" can be replaced by any numerical value
- ERR returns when parameter is outside adjustable range
- Sending "?" as a parameter queries the current setting for some commands; the source does not identify which commands support queries or unambiguously show the query padding.
- RS-232C terminal: 9-pin D-sub male connector on all models
- Commands not listed in the table are not guaranteed to operate
<!-- UNRESOLVED: exact command byte encoding for all parameter positions not fully clear from OCR -->
<!-- UNRESOLVED: response timeout not specified -->
<!-- UNRESOLVED: maximum serial command rate not specified -->

## Provenance

```yaml
source_domains:
  - files.sharpusa.com
  - assets.sharpnecdisplays.us
  - github.com
  - manualslib.com
source_urls:
  - http://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC32SV40U_LC42SV50U_LC46SV50U.pdf
  - https://assets.sharpnecdisplays.us/documents/miscellaneous/pj-control-command-codes.pdf
  - https://github.com/golliher/go-sharptv
  - https://github.com/jdwhite/aquosctl
  - https://www.manualslib.com/brand/sharp/
retrieved_at: 2026-05-15T02:35:06.944Z
last_checked_at: 2026-09-28T14:21:57.780Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-28T14:21:57.780Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 table-backed actions match; documented framing is retained and unspecified query/channel encodings remain explicit gaps. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no TCP/IP or other transport documented — serial only"
- "no response timeout specified"
- "no maximum command rate specified — source says wait for OK before next command"
- "authentication requirements are not specified"
- "source does not identify which commands accept queries or specify power response values.\""
- "source does not establish VOLM query support or response encoding. The settable volume range is 0-100.\""
- "source does not identify a query-capable input command or response encoding.\""
- "source does not establish MUTE query support or response encoding.\""
- "source does not establish AVMD query support or response encoding.\""
- "no distinct settable variables beyond actions - parameter ranges documented inline"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no additional safety/interlock procedures documented"
- "exact command byte encoding for all parameter positions not fully clear from OCR"
- "response timeout not specified"
- "maximum serial command rate not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
