---
spec_id: admin/rotel-ra-1592
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RA-1592 Control Spec"
manufacturer: Rotel
model_family: RA-1592
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RA-1592
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RA1592%20Protocol.pdf"
retrieved_at: 2026-05-21T20:47:33.539Z
last_checked_at: 2026-06-12T19:35:20.029Z
generated_at: 2026-06-12T19:35:20.029Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "V1.0 legacy protocol (pre-V1.53 firmware) documented but not spec'd as primary; V2.0 is current"
  - "no multi-step sequences described in source"
  - "source mentions RS-232 hardware does not support flow control;"
  - "V1.0 protocol commands not fully spec'd here; only V2.0 (current) is primary"
  - "special character mapping (Section 5) for display text not included — hex byte sequences for Unicode symbols"
  - "firmware version compatibility ranges not stated beyond V1.53 threshold"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:35:20.029Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions matched verbatim in V2.0 source; all transport parameters verified; complete bidirectional coverage of V2.0 command set. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Rotel RA-1592 Control Spec

## Summary
Rotel RA-1592 stereo integrated amplifier with RS-232 serial and TCP/IP control via ASCII command protocol. Commands terminated with `!`; V2.0 responses terminated with `$`. Covers power, volume, source selection, tone controls, balance, speaker output switching, dimmer, and transport control.

<!-- UNRESOLVED: V1.0 legacy protocol (pre-V1.53 firmware) documented but not spec'd as primary; V2.0 is current -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 9590
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off/toggle commands
  - routable     # inferred from source selection commands
  - queryable    # inferred from feedback request commands
  - levelable    # inferred from volume, bass, treble, balance controls
```

## Actions
```yaml
actions:
  # Power & Volume
  - id: power_on
    label: Power On
    kind: action
    params: []
    response: power=on$
  - id: power_off
    label: Power Off
    kind: action
    params: []
    response: power=standby$
  - id: power_toggle
    label: Power Toggle
    kind: action
    params: []
    response: "power=on$ or power=standby$"
  - id: vol_up
    label: Volume Up
    kind: action
    params: []
    response: volume=##$
  - id: vol_dwn
    label: Volume Down
    kind: action
    params: []
    response: volume=##$
  - id: vol_min
    label: Set Volume to Min
    kind: action
    params: []
    response: volume=00$
  - id: vol_nn
    label: Set Volume Level
    kind: action
    params:
      - name: level
        type: integer
        min: 1
        max: 96
        description: "Volume level (01-96), sent as two-digit zero-padded"
    response: volume=##$
  - id: mute
    label: Mute Toggle
    kind: action
    params: []
    response: "mute=on$ or mute=off$"
  - id: mute_on
    label: Mute On
    kind: action
    params: []
    response: mute=on$
  - id: mute_off
    label: Mute Off
    kind: action
    params: []
    response: mute=off$

  # Source Selection
  - id: source_cd
    label: Select Source CD
    kind: action
    command: cd!
    params: []
    response: source=cd$
  - id: source_coax1
    label: Select Source Coax 1
    kind: action
    command: coax1!
    params: []
    response: source=coax1$
  - id: source_coax2
    label: Select Source Coax 2
    kind: action
    command: coax2!
    params: []
    response: source=coax2$
  - id: source_coax3
    label: Select Source Coax 3
    kind: action
    command: coax3!
    params: []
    response: source=coax3$
  - id: source_opt1
    label: Select Source Optical 1
    kind: action
    command: opt1!
    params: []
    response: source=opt1$
  - id: source_opt2
    label: Select Source Optical 2
    kind: action
    command: opt2!
    params: []
    response: source=opt2$
  - id: source_opt3
    label: Select Source Optical 3
    kind: action
    command: opt3!
    params: []
    response: source=opt3$
  - id: source_aux
    label: Select Source Aux
    kind: action
    command: aux!
    params: []
    response: source=aux$
  - id: source_tuner
    label: Select Source Tuner
    kind: action
    command: tuner!
    params: []
    response: source=tuner$
  - id: source_phono
    label: Select Source Phono
    kind: action
    command: phono!
    params: []
    response: source=phono$
  - id: source_usb
    label: Select Source Front USB
    kind: action
    command: usb!
    params: []
    response: source=usb$
  - id: source_bluetooth
    label: Select Source Bluetooth
    kind: action
    command: bluetooth!
    params: []
    response: source=bluetooth$
  - id: source_bal_xlr
    label: Select Source XLR
    kind: action
    command: bal_xlr!
    params: []
    response: source=bal_xlr$
  - id: source_pcusb
    label: Select Source PC-USB
    kind: action
    command: pcusb!
    params: []
    response: source=pc_usb$

  # Transport Control
  - id: play
    label: Play
    kind: action
    params: []
  - id: stop
    label: Stop
    kind: action
    params: []
  - id: pause
    label: Pause
    kind: action
    params: []
  - id: trkf
    label: Track Forward
    kind: action
    params: []
  - id: trkb
    label: Track Backward
    kind: action
    params: []

  # Tone Control
  - id: bypass_on
    label: Tone Bypass On
    kind: action
    params: []
    response: bypass=on$
  - id: bypass_off
    label: Tone Bypass Off
    kind: action
    params: []
    response: bypass=off$
  - id: bass_up
    label: Bass Up
    kind: action
    params: []
    response: "bass=+##$/-##$/000$"
  - id: bass_down
    label: Bass Down
    kind: action
    params: []
    response: "bass=+##$/-##$/000$"
  - id: bass_set
    label: Set Bass Level
    kind: action
    params:
      - name: level
        type: integer
        min: -10
        max: 10
        description: "Bass level (-10 to +10). Command format: bass_-10! / bass_000! / bass_+10!"
    response: "bass=-10$/bass=000$/bass=+10$"
  - id: treble_up
    label: Treble Up
    kind: action
    params: []
    response: "treble=+##$/-##$/000$"
  - id: treble_down
    label: Treble Down
    kind: action
    params: []
    response: "treble=+##$/-##$/000$"
  - id: treble_set
    label: Set Treble Level
    kind: action
    params:
      - name: level
        type: integer
        min: -10
        max: 10
        description: "Treble level (-10 to +10). Command format: treble_-10! / treble_000! / treble_+10!"
    response: "treble=-10$/treble=000$/treble=+10$"

  # Balance Control
  - id: balance_r
    label: Balance Right
    kind: action
    params: []
    response: "balance=000$/L##$/R##$"
  - id: balance_l
    label: Balance Left
    kind: action
    params: []
    response: "balance=000$/L##$/R##$"
  - id: balance_l15
    label: Set Balance Max Left
    kind: action
    params: []
    response: balance=L15$
  - id: balance_000
    label: Set Balance Center
    kind: action
    params: []
    response: balance=000$
  - id: balance_r15
    label: Set Balance Max Right
    kind: action
    params: []
    response: balance=R15$

  # Speaker Output
  - id: speaker_a_toggle
    label: Toggle Speaker A
    kind: action
    command: speaker_a!
    params: []
    response: "speaker=a$/a_b$/off$"
  - id: speaker_b_toggle
    label: Toggle Speaker B
    kind: action
    command: speaker_b!
    params: []
    response: "speaker=b$/a_b$/off$"
  - id: speaker_a_on
    label: Speaker A On
    kind: action
    params: []
    response: "speaker=a$/a_b$"
  - id: speaker_a_off
    label: Speaker A Off
    kind: action
    params: []
    response: "speaker=b$/off$"
  - id: speaker_b_on
    label: Speaker B On
    kind: action
    params: []
    response: "speaker=b$/a_b$"
  - id: speaker_b_off
    label: Speaker B Off
    kind: action
    params: []
    response: "speaker=a$/off$"

  # Dimmer
  - id: dimmer_toggle
    label: Toggle Display Dimmer
    kind: action
    command: dimmer!
    params: []
    response: dimmer=#$
  - id: dimmer_set
    label: Set Display Dimmer Level
    kind: action
    params:
      - name: level
        type: integer
        min: 0
        max: 6
        description: "Dimmer level (0=brightest, 6=dimmest). Command format: dimmer_0! through dimmer_6!"
    response: "dimmer=0$ through dimmer=6$"

  # PC-USB Class
  - id: pcusb_class_1
    label: Set PC-USB Audio Class 1.0
    kind: action
    params: []
    response: pcusb_class=1$
  - id: pcusb_class_2
    label: Set PC-USB Audio Class 2.0
    kind: action
    params: []
    response: pcusb_class=2$

  # RS232 Update Mode
  - id: rs232_update_on
    label: Set Auto Update Mode
    kind: action
    params: []
    response: update_mode=auto$
  - id: rs232_update_off
    label: Set Manual Update Mode
    kind: action
    params: []
    response: update_mode=manual$
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    command: power?
    type: enum
    values: [on, standby]

  - id: current_source
    label: Current Source
    command: source?
    type: enum
    values: [cd, coax1, coax2, coax3, opt1, opt2, opt3, tuner, phono, usb, aux, pc_usb, bal_xlr, bluetooth]

  - id: volume_level
    label: Volume Level
    command: volume?
    type: integer
    description: "Two-digit volume level (00-96)"

  - id: mute_state
    label: Mute State
    command: mute?
    type: enum
    values: [on, off]

  - id: bypass_state
    label: Tone Bypass State
    command: bypass?
    type: enum
    values: [on, off]

  - id: bass_level
    label: Bass Level
    command: bass?
    type: string
    description: "Three-character value: +01 to +10, -01 to -10, or 000"

  - id: treble_level
    label: Treble Level
    command: treble?
    type: string
    description: "Three-character value: +01 to +10, -01 to -10, or 000"

  - id: balance_setting
    label: Balance Setting
    command: balance?
    type: string
    description: "L01-L15 (left), R01-R15 (right), or 000 (center)"

  - id: frequency
    label: Digital Input Frequency
    command: freq?
    type: enum
    values: [off, "32", "44.1", "48", "88.2", "96", "176.4", "192", "384"]

  - id: speaker_output
    label: Active Speaker Output
    command: speaker?
    type: enum
    values: [a, b, a_b, off]

  - id: dimmer_level
    label: Display Dimmer Level
    command: dimmer?
    type: integer
    min: 0
    max: 6

  - id: pcusb_class
    label: PC-USB Audio Class
    command: pcusb?
    type: enum
    values: ["1", "2"]

  - id: firmware_version
    label: Main CPU Firmware Version
    command: version?
    type: string
    description: "Format: #.##"

  - id: pcusb_firmware_version
    label: PC-USB Firmware Version
    command: pc_version?
    type: string
    description: "Format: #.##"

  - id: ip_address
    label: IP Address
    command: ip?
    type: string
    description: "Format: ###.###.###.###"

  - id: mac_address
    label: MAC Address
    command: mac?
    type: string
    description: "12 hex characters, uppercase"

  - id: model_number
    label: Model Number
    command: model?
    type: string

  - id: discover
    label: Device Discovery
    command: discover?
    type: string
    description: "Returns ip=###.###.###.### port=#### mac=############"
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume
    type: integer
    min: 0
    max: 96
    set_command: "vol_{value}!"
    query_command: volume?
    description: "Set volume level 01-96 via vol_nn!, query via volume?"

  - id: balance
    label: Balance
    type: string
    description: "L01-L15, R01-R15, or 000. No direct set-by-value command; use balance_l!, balance_r!, balance_l15!, balance_000!, balance_r15!"

  - id: bass
    label: Bass
    type: integer
    min: -10
    max: 10
    description: "Set via bass_-10! / bass_000! / bass_+10! or step via bass_up!/bass_down!. Query via bass?"

  - id: treble
    label: Treble
    type: integer
    min: -10
    max: 10
    description: "Set via treble_-10! / treble_000! / treble_+10! or step via treble_up!/treble_down!. Query via treble?"

  - id: dimmer
    label: Display Dimmer
    type: integer
    min: 0
    max: 6
    set_command: "dimmer_{value}!"
    query_command: dimmer?
    description: "0=brightest, 6=dimmest"
```

## Events
```yaml
events:
  - id: automatic_status_update
    label: Automatic Status Update
    description: "When auto update mode is enabled (rs232_update_on!), the unit sends status strings automatically when display changes. Basic status (volume, power, source) always sent automatically. USB metadata requires auto mode."
    trigger: rs232_update_on! previously sent
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions RS-232 hardware does not support flow control;
# care needed to avoid packet loss - this is a communication concern, not a safety interlock
```

## Notes
- All commands terminated with `!` (no spaces, no CR/LF — only the `!` character).
- V2.0 protocol (firmware V1.53+): responses terminated with `$`. V1.0 protocol: responses terminated with `!`.
- RS-232 hardware does not support flow control; sending/receiving application must handle buffering to avoid packet loss.
- Variable-length responses (e.g. display data) use a byte-count prefix instead of a terminating character. Byte count covers text data only, not the length field or comma delimiter.
- Rotel Link RCD feature: if an input is configured as Rotel Link RCD, source response includes `_cd` suffix (e.g. `source=coax1_cd$` instead of `source=coax1$`).
- PC-USB transport controls (play/pause/track) only function in USB 2.0 mode (`pcusb_class_2!`).
- Source documents both V1.0 and V2.0 command sets; V2.0 is the current protocol. Legacy V1.0 commands (`volume_up!`, `track_fwd!`, `tone_on!`, `display_update_auto!`, `balance_right!`, `balance_left!`, `rcd!`, `power_mode_quick!`, `power_mode_normal!`, menu/nav keys) removed in V2.0.

<!-- UNRESOLVED: V1.0 protocol commands not fully spec'd here; only V2.0 (current) is primary -->
<!-- UNRESOLVED: special character mapping (Section 5) for display text not included — hex byte sequences for Unicode symbols -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated beyond V1.53 threshold -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RA1592%20Protocol.pdf"
retrieved_at: 2026-05-21T20:47:33.539Z
last_checked_at: 2026-06-12T19:35:20.029Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:35:20.029Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions matched verbatim in V2.0 source; all transport parameters verified; complete bidirectional coverage of V2.0 command set. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "V1.0 legacy protocol (pre-V1.53 firmware) documented but not spec'd as primary; V2.0 is current"
- "no multi-step sequences described in source"
- "source mentions RS-232 hardware does not support flow control;"
- "V1.0 protocol commands not fully spec'd here; only V2.0 (current) is primary"
- "special character mapping (Section 5) for display text not included — hex byte sequences for Unicode symbols"
- "firmware version compatibility ranges not stated beyond V1.53 threshold"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
