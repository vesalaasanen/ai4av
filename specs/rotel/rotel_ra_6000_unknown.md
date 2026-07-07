---
spec_id: admin/rotel-ra-6000
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RA-6000 Control Spec"
manufacturer: Rotel
model_family: RA-6000
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RA-6000
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RA6000%20Protocol.pdf"
retrieved_at: 2026-06-30T16:08:31.711Z
last_checked_at: 2026-07-07T12:32:42.285Z
generated_at: 2026-07-07T12:32:42.285Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no firmware compatibility range stated in source"
  - "no additional free-form variables documented beyond command parameters."
  - "no multi-step sequences documented in source."
  - "no safety warnings, interlocks, or power-on sequencing requirements in source."
  - "discover? example response shows port=9596 in documentation, but IP control section states port 9590. Treat as UNRESOLVED unless clarified by vendor."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:32:42.285Z
  matched_actions: 72
  action_count: 72
  confidence: medium
  summary: "All 72 spec actions matched verbatim in source; all transport parameters verified; complete one-to-one coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Rotel RA-6000 Control Spec

## Summary
Spec covers Rotel RA-6000 integrated amplifier over RS-232 serial and TCP/IP. ASCII command protocol, terminating "!" on commands and "$" on responses. Document v1.00, dated August 9, 2022.

<!-- UNRESOLVED: no firmware compatibility range stated in source -->

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
- powerable       # inferred from power on/off/toggle commands
- routable        # inferred from source selection commands
- queryable       # inferred from "?" query commands
- levelable       # inferred from volume, bass, treble, balance controls
```

## Actions
```yaml
# Power & Volume
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

- id: vol_nn
  label: Set Volume
  kind: action
  command: "vol_nn!"
  params:
    - name: nn
      type: integer
      description: Volume level 00-96

- id: mute
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

# Source Selection
- id: src_cd
  label: Source CD
  kind: action
  command: "cd!"
  params: []

- id: src_coax1
  label: Source Coax 1
  kind: action
  command: "coax1!"
  params: []

- id: src_coax2
  label: Source Coax 2
  kind: action
  command: "coax2!"
  params: []

- id: src_coax3
  label: Source Coax 3
  kind: action
  command: "coax3!"
  params: []

- id: src_opt1
  label: Source Optical 1
  kind: action
  command: "opt1!"
  params: []

- id: src_opt2
  label: Source Optical 2
  kind: action
  command: "opt2!"
  params: []

- id: src_opt3
  label: Source Optical 3
  kind: action
  command: "opt3!"
  params: []

- id: src_aux
  label: Source Aux
  kind: action
  command: "aux!"
  params: []

- id: src_tuner
  label: Source Tuner
  kind: action
  command: "tuner!"
  params: []

- id: src_phono
  label: Source Phono
  kind: action
  command: "phono!"
  params: []

- id: src_usb
  label: Source Front USB
  kind: action
  command: "usb!"
  params: []

- id: src_bluetooth
  label: Source Bluetooth
  kind: action
  command: "bluetooth!"
  params: []

- id: src_bal_xlr
  label: Source XLR
  kind: action
  command: "bal_xlr!"
  params: []

- id: src_pcusb
  label: Source PC-USB
  kind: action
  command: "pcusb!"
  params: []

# Source Control
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

# Tone Control
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

- id: bass_minus
  label: Set Bass Negative
  kind: action
  command: "bass_-nn!"
  params:
    - name: nn
      type: integer
      description: n = 01-10

- id: bass_zero
  label: Set Bass to 0
  kind: action
  command: "bass_000!"
  params: []

- id: bass_plus
  label: Set Bass Positive
  kind: action
  command: "bass_+nn!"
  params:
    - name: nn
      type: integer
      description: n = 01-10

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

- id: treble_minus
  label: Set Treble Negative
  kind: action
  command: "treble_-nn!"
  params:
    - name: nn
      type: integer
      description: n = 01-10

- id: treble_zero
  label: Set Treble to 0
  kind: action
  command: "treble_000!"
  params: []

- id: treble_plus
  label: Set Treble Positive
  kind: action
  command: "treble_+nn!"
  params:
    - name: nn
      type: integer
      description: n = 01-10

# Balance
- id: balance_r
  label: Balance Right
  kind: action
  command: "balance_r!"
  params: []

- id: balance_l
  label: Balance Left
  kind: action
  command: "balance_l!"
  params: []

- id: balance_lnn
  label: Set Balance Left
  kind: action
  command: "balance_lnn!"
  params:
    - name: nn
      type: integer
      description: n = 01-15

- id: balance_zero
  label: Set Balance to 0
  kind: action
  command: "balance_000!"
  params: []

- id: balance_rnn
  label: Set Balance Right
  kind: action
  command: "balance_rnn!"
  params:
    - name: nn
      type: integer
      description: n = 01-15

# Dimmer
- id: dimmer_toggle
  label: Toggle Display Dimmer
  kind: action
  command: "dimmer!"
  params: []

- id: dimmer_0
  label: Display Brightest
  kind: action
  command: "dimmer_0!"
  params: []

- id: dimmer_1
  label: Display Dimmer Level 1
  kind: action
  command: "dimmer_1!"
  params: []

- id: dimmer_2
  label: Display Dimmer Level 2
  kind: action
  command: "dimmer_2!"
  params: []

- id: dimmer_3
  label: Display Dimmer Level 3
  kind: action
  command: "dimmer_3!"
  params: []

- id: dimmer_4
  label: Display Dimmer Level 4
  kind: action
  command: "dimmer_4!"
  params: []

- id: dimmer_5
  label: Display Dimmer Level 5
  kind: action
  command: "dimmer_5!"
  params: []

- id: dimmer_6
  label: Display Dimmest
  kind: action
  command: "dimmer_6!"
  params: []

# Feedback Mode
- id: rs232_update_on
  label: RS232 Update Auto
  kind: action
  command: "rs232_update_on!"
  params: []

- id: rs232_update_off
  label: RS232 Update Manual
  kind: action
  command: "rs232_update_off!"
  params: []

# Queries
- id: power_query
  label: Power Status Query
  kind: query
  command: "power?"
  params: []

- id: source_query
  label: Source Query
  kind: query
  command: "source?"
  params: []

- id: volume_query
  label: Volume Query
  kind: query
  command: "volume?"
  params: []

- id: mute_query
  label: Mute Status Query
  kind: query
  command: "mute?"
  params: []

- id: bypass_query
  label: Tone Bypass Query
  kind: query
  command: "bypass?"
  params: []

- id: bass_query
  label: Bass Level Query
  kind: query
  command: "bass?"
  params: []

- id: treble_query
  label: Treble Level Query
  kind: query
  command: "treble?"
  params: []

- id: balance_query
  label: Balance Query
  kind: query
  command: "balance?"
  params: []

- id: freq_query
  label: Digital Input Frequency Query
  kind: query
  command: "freq?"
  params: []

- id: dimmer_query
  label: Display Dimmer Query
  kind: query
  command: "dimmer?"
  params: []

- id: pcusb_query
  label: PC-USB Class Query
  kind: query
  command: "pcusb?"
  params: []

- id: version_query
  label: Main CPU Version Query
  kind: query
  command: "version?"
  params: []

- id: pc_version_query
  label: PC-USB Version Query
  kind: query
  command: "pc_version?"
  params: []

- id: ip_query
  label: IP Address Query
  kind: query
  command: "ip?"
  params: []

- id: mac_query
  label: MAC Address Query
  kind: query
  command: "mac?"
  params: []

- id: model_query
  label: Model Number Query
  kind: query
  command: "model?"
  params: []

- id: discover_query
  label: Network Discovery Query
  kind: query
  command: "discover?"
  params: []
```

## Feedbacks
```yaml
- id: power
  type: enum
  values: [on, standby]

- id: source
  type: enum
  values: [cd, coax1, coax2, coax3, opt1, opt2, opt3, aux, tuner, phono, usb, bluetooth, bal_xlr, pc_usb]

- id: volume
  type: string
  description: "2-digit volume level 00-96, format volume=##$"

- id: mute
  type: enum
  values: [on, off]

- id: bypass
  type: enum
  values: [on, off]

- id: bass
  type: string
  description: "bass=###$ format, range +01..+10, -01..-10, 000"

- id: treble
  type: string
  description: "treble=###$ format, range +01..+10, -01..-10, 000"

- id: balance
  type: string
  description: "balance=###$ format, l01-l15, r01-r15, 000"

- id: freq
  type: enum
  values: [off, "32", "44.1", "48", "88.2", "96", "176.4", "192", "384"]

- id: dimmer
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]

- id: pcusb_class
  type: string
  description: "pcusb_class=#$ format, current PC-USB class"

- id: version
  type: string
  description: "version=#.##$ main CPU software version"

- id: pc_version
  type: string
  description: "pc_version=#.##$ PC-USB software version"

- id: ipaddress
  type: string
  description: "ipaddress=###.###.###.###$ device IP address"

- id: mac
  type: string
  description: "mac=############$ MAC address, uppercase"

- id: model
  type: string
  description: "model=text$ Rotel model number"

- id: update_mode
  type: enum
  values: [auto, manual]
```

## Variables
```yaml
# Settable numeric/string parameters covered as parameterized actions above (volume, bass, treble, balance, dimmer).
# UNRESOLVED: no additional free-form variables documented beyond command parameters.
```

## Events
```yaml
# Automatic status updates when update_mode=auto. Device sends the same response strings as documented in Feedbacks.
# Triggered on: volume change, power change, source change, mute change, tone/bass/treble/balance change, dimmer change.
# Front USB metadata updates only in manual mode by default.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements in source.
```

## Notes
ASCII command protocol. Commands terminate with "!" (no spaces, no CR/LF). Responses terminate with "$". RS-232 hardware has no flow control — care required to avoid packet loss. TCP control listens on port 9590 with identical command/response format. Auto-update mode (`rs232_update_on!`) causes device to push state-change responses unsolicited; manual mode requires explicit query.

<!-- UNRESOLVED: discover? example response shows port=9596 in documentation, but IP control section states port 9590. Treat as UNRESOLVED unless clarified by vendor. -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RA6000%20Protocol.pdf"
retrieved_at: 2026-06-30T16:08:31.711Z
last_checked_at: 2026-07-07T12:32:42.285Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:32:42.285Z
matched_actions: 72
action_count: 72
confidence: medium
summary: "All 72 spec actions matched verbatim in source; all transport parameters verified; complete one-to-one coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no firmware compatibility range stated in source"
- "no additional free-form variables documented beyond command parameters."
- "no multi-step sequences documented in source."
- "no safety warnings, interlocks, or power-on sequencing requirements in source."
- "discover? example response shows port=9596 in documentation, but IP control section states port 9590. Treat as UNRESOLVED unless clarified by vendor."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
