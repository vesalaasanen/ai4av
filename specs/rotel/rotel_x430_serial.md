---
spec_id: admin/rotel-x430
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel X430 Control Spec"
manufacturer: Rotel
model_family: X430
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - X430
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - https://www.rotel.com/sites/default/files/product/rs232/X430_Protocol.pdf
  - https://www.rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-06-30T16:36:25.253Z
last_checked_at: 2026-07-07T12:41:17.611Z
generated_at: 2026-07-07T12:41:17.611Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "full enumeration of which state changes trigger unsolicited updates"
  - "error/fault response strings beyond the documented value enums not enumerated"
  - "command timing / inter-command spacing limits not specified"
  - "max concurrent TCP connections not stated"
verification:
  verdict: verified
  checked_at: 2026-07-07T12:41:17.611Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "All 67 spec actions matched; transport parameters verified against protocol and connection settings. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Rotel X430 Control Spec

## Summary
ASCII-based RS-232 and TCP/IP control spec for the Rotel X430 stereo amplifier. Commands terminate with `!`; status responses terminate with `$`. Covers power, volume, mute, source selection, transport, tone (bass/treble/bypass), balance, speaker A/B, RS232 feedback mode, and a set of status queries.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9596
serial:
  baud_rate: 115200
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
  - powerable    # inferred: power_on/off/toggle commands present
  - levelable    # inferred: volume/bass/treble/balance set commands present
  - queryable    # inferred: status query commands (power?, source?, volume?, etc.) present
```

## Actions
```yaml
# All commands terminate with literal "!". Copy payload verbatim including "!".
actions:
  # --- POWER & VOLUME ---
  - id: power_on
    label: Power On
    kind: action
    command: "power_on!"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "power_off!"
    params: []

  - id: power_toggle
    label: Power Toggle
    kind: action
    command: "power_toggle!"
    params: []

  - id: vol_up
    label: Volume Up
    kind: action
    command: "vol_up!"
    params: []

  - id: vol_dwn
    label: Volume Down
    kind: action
    command: "vol_dwn!"
    params: []

  - id: vol_set
    label: Set Volume
    kind: action
    command: "vol_{level}!"
    params:
      - name: level
        type: integer
        description: "Volume level 00-96 (2 digit, zero padded)"

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: "mute!"
    params: []

  - id: mute_on
    label: Mute On
    kind: action
    command: "mute_on!"
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "mute_off!"
    params: []

  # --- SOURCE SELECTION (each source = distinct source row) ---
  - id: source_cd
    label: Source CD
    kind: action
    command: "cd!"
    params: []

  - id: source_coax1
    label: Source Coax 1
    kind: action
    command: "coax1!"
    params: []

  - id: source_coax2
    label: Source Coax 2
    kind: action
    command: "coax2!"
    params: []

  - id: source_coax3
    label: Source Coax 3
    kind: action
    command: "coax3!"
    params: []

  - id: source_opt1
    label: Source Optical 1
    kind: action
    command: "opt1!"
    params: []

  - id: source_opt2
    label: Source Optical 2
    kind: action
    command: "opt2!"
    params: []

  - id: source_opt3
    label: Source Optical 3
    kind: action
    command: "opt3!"
    params: []

  - id: source_aux
    label: Source Aux
    kind: action
    command: "aux!"
    params: []

  - id: source_tuner
    label: Source Tuner
    kind: action
    command: "tuner!"
    params: []

  - id: source_phono
    label: Source Phono
    kind: action
    command: "phono!"
    params: []

  - id: source_bluetooth
    label: Source Bluetooth
    kind: action
    command: "bluetooth!"
    params: []

  - id: source_bal_xlr
    label: Source XLR
    kind: action
    command: "bal_xlr!"
    params: []

  - id: source_pcusb
    label: Source PC-USB
    kind: action
    command: "pcusb!"
    params: []

  - id: source_arc
    label: Source ARC
    kind: action
    command: "arc!"
    params: []

  # --- SOURCE CONTROL (transport) ---
  - id: play
    label: Play Source
    kind: action
    command: "play!"
    params: []

  - id: stop
    label: Stop Source
    kind: action
    command: "stop!"
    params: []

  - id: pause
    label: Pause Source
    kind: action
    command: "pause!"
    params: []

  - id: trkf
    label: Track Forward / Tune Up
    kind: action
    command: "trkf!"
    params: []

  - id: trkb
    label: Track Backward / Tune Down
    kind: action
    command: "trkb!"
    params: []

  # --- TONE CONTROL (bass_-nn / bass_000 / bass_+nn = separate rows) ---
  - id: bypass_on
    label: Tone Bypass On
    kind: action
    command: "bypass_on!"
    params: []

  - id: bypass_off
    label: Tone Bypass Off
    kind: action
    command: "bypass_off!"
    params: []

  - id: bass_up
    label: Bass Up
    kind: action
    command: "bass_up!"
    params: []

  - id: bass_down
    label: Bass Down
    kind: action
    command: "bass_down!"
    params: []

  - id: bass_set_neg
    label: Set Bass Negative
    kind: action
    command: "bass_-{level}!"
    params:
      - name: level
        type: integer
        description: "Bass level 01-10 (2 digit, zero padded)"

  - id: bass_set_zero
    label: Set Bass to 0
    kind: action
    command: "bass_000!"
    params: []

  - id: bass_set_pos
    label: Set Bass Positive
    kind: action
    command: "bass_+{level}!"
    params:
      - name: level
        type: integer
        description: "Bass level 01-10 (2 digit, zero padded)"

  - id: treble_up
    label: Treble Up
    kind: action
    command: "treble_up!"
    params: []

  - id: treble_down
    label: Treble Down
    kind: action
    command: "treble_down!"
    params: []

  - id: treble_set_neg
    label: Set Treble Negative
    kind: action
    command: "treble_-{level}!"
    params:
      - name: level
        type: integer
        description: "Treble level 01-10 (2 digit, zero padded)"

  - id: treble_set_zero
    label: Set Treble to 0
    kind: action
    command: "treble_000!"
    params: []

  - id: treble_set_pos
    label: Set Treble Positive
    kind: action
    command: "treble_+{level}!"
    params:
      - name: level
        type: integer
        description: "Treble level 01-10 (2 digit, zero padded)"

  # --- BALANCE (lnn / 000 / rnn = separate rows) ---
  - id: balance_right_step
    label: Balance Right Step
    kind: action
    command: "balance_r!"
    params: []

  - id: balance_left_step
    label: Balance Left Step
    kind: action
    command: "balance_l!"
    params: []

  - id: balance_set_left
    label: Set Balance Left
    kind: action
    command: "balance_l{level}!"
    params:
      - name: level
        type: integer
        description: "Balance left 01-15 (2 digit, zero padded)"

  - id: balance_set_zero
    label: Set Balance to 0
    kind: action
    command: "balance_000!"
    params: []

  - id: balance_set_right
    label: Set Balance Right
    kind: action
    command: "balance_r{level}!"
    params:
      - name: level
        type: integer
        description: "Balance right 01-15 (2 digit, zero padded)"

  # --- SPEAKER ---
  - id: speaker_a_toggle
    label: Toggle Speaker A
    kind: action
    command: "speaker_a!"
    params: []

  - id: speaker_b_toggle
    label: Toggle Speaker B
    kind: action
    command: "speaker_b!"
    params: []

  # --- RS232 FEEDBACK MODE ---
  - id: rs232_update_on
    label: RS232 Update Auto On
    kind: action
    command: "rs232_update_on!"
    params: []

  - id: rs232_update_off
    label: RS232 Update Manual Off
    kind: action
    command: "rs232_update_off!"
    params: []

  # --- STATUS QUERIES (Section 2) ---
  - id: query_power
    label: Query Power Status
    kind: query
    command: "power?"
    params: []

  - id: query_source
    label: Query Source
    kind: query
    command: "source?"
    params: []

  - id: query_source_name
    label: Query Source Name
    kind: query
    command: "name?"
    params: []

  - id: query_volume
    label: Query Volume
    kind: query
    command: "volume?"
    params: []

  - id: query_mute
    label: Query Mute
    kind: query
    command: "mute?"
    params: []

  - id: query_bypass
    label: Query Tone Bypass
    kind: query
    command: "bypass?"
    params: []

  - id: query_bass
    label: Query Bass Level
    kind: query
    command: "bass?"
    params: []

  - id: query_treble
    label: Query Treble Level
    kind: query
    command: "treble?"
    params: []

  - id: query_balance
    label: Query Balance
    kind: query
    command: "balance?"
    params: []

  - id: query_speaker
    label: Query Active Speaker Outputs
    kind: query
    command: "speaker?"
    params: []

  - id: query_freq
    label: Query Digital Input Frequency
    kind: query
    command: "freq?"
    params: []

  - id: query_pcusb_class
    label: Query PC-USB Class
    kind: query
    command: "pcusb?"
    params: []

  - id: query_version
    label: Query Software Version
    kind: query
    command: "version?"
    params: []

  - id: query_pc_version
    label: Query PC-USB Software Version
    kind: query
    command: "pc_version?"
    params: []

  - id: query_ip
    label: Query IP Address
    kind: query
    command: "ip?"
    params: []

  - id: query_mac
    label: Query MAC Address
    kind: query
    command: "mac?"
    params: []

  - id: query_model
    label: Query Model Number
    kind: query
    command: "model?"
    params: []

  - id: query_discover
    label: Discover Device on Network
    kind: query
    command: "discover?"
    params: []
```

## Feedbacks
```yaml
# Observable state strings emitted by the device (terminate with "$").
feedbacks:
  - id: power_state
    type: enum
    values: [on, standby]

  - id: volume_level
    type: string
    description: "volume=##$ (2 digit 00-96)"

  - id: mute_state
    type: enum
    values: [on, off]

  - id: source_state
    type: enum
    values: [cd, coax1, coax2, coax3, opt1, opt2, opt3, tuner, phono, aux, pc_usb, bal_xlr, bluetooth, arc]

  - id: source_name
    type: string
    description: "name=custom_input_name$"

  - id: bypass_state
    type: enum
    values: [on, off]

  - id: bass_level
    type: string
    description: "bass=###$ (+01-10, -01-10, 000)"

  - id: treble_level
    type: string
    description: "treble=###$ (+01-10, -01-10, 000)"

  - id: balance_level
    type: string
    description: "balance=###$ (l01-15, r01-15, 000)"

  - id: speaker_state
    type: enum
    values: [a, b, a_b, off]

  - id: update_mode
    type: enum
    values: [auto, manual]

  - id: freq_value
    type: enum
    values: [off, "32", "44.1", "48", "88.2", "96", "176.4", "192", "384", "2.8m", not_support]

  - id: pcusb_class
    type: enum
    values: ["1", "2"]

  - id: software_version
    type: string
    description: "version=#.##$"

  - id: pc_usb_version
    type: string
    description: "pc_version=#.##$"

  - id: ip_address
    type: string
    description: "ipaddress=###.###.###.###$"

  - id: mac_address
    type: string
    description: "mac=############$ (uppercase)"

  - id: model_name
    type: string
    description: "model=text$"

  - id: discover_response
    type: string
    description: "discover=ip=###.###.###.### port=#### mac=############$"
```

## Variables
```yaml
# No settable continuous variables beyond those exposed as parameterized actions above.
```

## Events
```yaml
# Unsolicited status updates sent when rs232_update_on is active. Format identical
# to query response strings (e.g. power=on$, volume=40$, source=cd$). No separate
# event opcodes documented.
# UNRESOLVED: full enumeration of which state changes trigger unsolicited updates
# not exhaustively listed in source.
```

## Macros
```yaml
# No multi-step command sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes RS232 hardware has no flow control - care needed to avoid packet
# loss when sending/receiving. Not an interlock, but relevant transport caveat.
```

## Notes
- Command terminator: literal `!`. No spaces, no CR/LF after command.
- Status terminator: literal `$`.
- RS232 hardware lacks flow control — pace sends to avoid packet loss.
- IP control uses same ASCII command set on TCP port 9596.
- `rs232_update_on!` enables unsolicited status push on any state change; `rs232_update_off!` requires polling.
- Source set response uses `pc_usb` token; the select command is `pcusb!` (no underscore). Verbatim per source.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: error/fault response strings beyond the documented value enums not enumerated -->
<!-- UNRESOLVED: command timing / inter-command spacing limits not specified -->
<!-- UNRESOLVED: max concurrent TCP connections not stated -->
````

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - https://www.rotel.com/sites/default/files/product/rs232/X430_Protocol.pdf
  - https://www.rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-06-30T16:36:25.253Z
last_checked_at: 2026-07-07T12:41:17.611Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:41:17.611Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "All 67 spec actions matched; transport parameters verified against protocol and connection settings. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "full enumeration of which state changes trigger unsolicited updates"
- "error/fault response strings beyond the documented value enums not enumerated"
- "command timing / inter-command spacing limits not specified"
- "max concurrent TCP connections not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
