---
spec_id: admin/rotel-p5-series-2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel P5 / P5 S2 Control Spec"
manufacturer: Rotel
model_family: P5
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - P5
    - "P5 S2"
  firmware: "P5 V1.09 / P5 S2 V2.00 or later"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/P5-P5S2%20Protocol.pdf"
  - https://www.rotel.com/manual-resources/rs232-protocols
retrieved_at: 2026-06-30T16:11:46.486Z
last_checked_at: 2026-07-07T12:29:51.585Z
generated_at: 2026-07-07T12:29:51.585Z
firmware_coverage: "P5 V1.09 / P5 S2 V2.00 or later"
protocol_coverage: []
known_gaps:
  - "no explicit authentication/login procedure described; treating as open protocol per source."
  - "source describes no multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "source document metadata (full vendor URL, exact author of revision history) not captured."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:29:51.585Z
  matched_actions: 69
  action_count: 69
  confidence: medium
  summary: "All 69 spec actions matched literally against source command table and feedback request section; transport parameters verified; one-to-one coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Rotel P5 / P5 S2 Control Spec

## Summary
Stereo preamplifier supporting ASCII RS-232 and TCP/IP control. Commands and responses are ASCII strings terminated with `!` (commands) and `$` (responses). Effective for firmware P5 V1.09 / P5 S2 V2.00 or later.

<!-- UNRESOLVED: no explicit authentication/login procedure described; treating as open protocol per source. -->

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
  port: 9596
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power_on / power_off / power_toggle commands
- levelable       # inferred from vol_up / vol_dwn / vol_nn / bass / treble commands
- routable        # inferred from source selection commands
- queryable       # inferred from ?-suffixed feedback request commands
```

## Actions
```yaml
# POWER & VOLUME
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
    - name: level
      type: integer
      description: Volume level 01-96

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

# SOURCE SELECTION
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

- id: src_aux1
  label: Source Aux 1
  kind: action
  command: "aux1!"
  params: []

- id: src_aux2
  label: Source Aux 2
  kind: action
  command: "aux2!"
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

- id: src_bluetooth
  label: Source Bluetooth
  kind: action
  command: "bluetooth!"
  params: []

- id: src_bal_xlr1
  label: Source XLR 1
  kind: action
  command: "bal_xlr1!"
  params: []

- id: src_bal_xlr2
  label: Source XLR 2
  kind: action
  command: "bal_xlr2!"
  params: []

- id: src_pcusb
  label: Source PC-USB
  kind: action
  command: "pcusb!"
  params: []

# SOURCE TRANSPORT
- id: play
  label: Play
  kind: action
  command: "play!"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "stop!"
  params: []

- id: pause
  label: Pause
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

# TONE
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

- id: bass_minus10
  label: Set Bass -10
  kind: action
  command: "bass_-10!"
  params: []

- id: bass_000
  label: Set Bass 0
  kind: action
  command: "bass_000!"
  params: []

- id: bass_plus10
  label: Set Bass +10
  kind: action
  command: "bass_+10!"
  params: []

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

- id: treble_minus10
  label: Set Treble -10
  kind: action
  command: "treble_-10!"
  params: []

- id: treble_000
  label: Set Treble 0
  kind: action
  command: "treble_000!"
  params: []

- id: treble_plus10
  label: Set Treble +10
  kind: action
  command: "treble_+10!"
  params: []

# BALANCE
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
    - name: steps
      type: integer
      description: Left offset 01-10

- id: balance_000
  label: Set Balance Center
  kind: action
  command: "balance_000!"
  params: []

- id: balance_rnn
  label: Set Balance Right
  kind: action
  command: "balance_rnn!"
  params:
    - name: steps
      type: integer
      description: Right offset 01-10

# DIMMER
- id: dimmer
  label: Dimmer Toggle
  kind: action
  command: "dimmer!"
  params: []

- id: dimmer_0
  label: Dimmer Brightest
  kind: action
  command: "dimmer_0!"
  params: []

- id: dimmer_1
  label: Dimmer Level 1
  kind: action
  command: "dimmer_1!"
  params: []

- id: dimmer_2
  label: Dimmer Level 2
  kind: action
  command: "dimmer_2!"
  params: []

- id: dimmer_3
  label: Dimmer Level 3
  kind: action
  command: "dimmer_3!"
  params: []

- id: dimmer_4
  label: Dimmer Dimmest
  kind: action
  command: "dimmer_4!"
  params: []

# RS232 FEEDBACK
- id: rs232_update_on
  label: RS232 Update On (Auto)
  kind: action
  command: "rs232_update_on!"
  params: []

- id: rs232_update_off
  label: RS232 Update Off (Manual)
  kind: action
  command: "rs232_update_off!"
  params: []

# QUERIES
- id: power_status_query
  label: Query Power
  kind: query
  command: "power?"
  params: []

- id: source_query
  label: Query Source
  kind: query
  command: "source?"
  params: []

- id: volume_query
  label: Query Volume
  kind: query
  command: "volume?"
  params: []

- id: mute_query
  label: Query Mute
  kind: query
  command: "mute?"
  params: []

- id: bypass_query
  label: Query Tone Bypass
  kind: query
  command: "bypass?"
  params: []

- id: bass_query
  label: Query Bass
  kind: query
  command: "bass?"
  params: []

- id: treble_query
  label: Query Treble
  kind: query
  command: "treble?"
  params: []

- id: balance_query
  label: Query Balance
  kind: query
  command: "balance?"
  params: []

- id: freq_query
  label: Query Digital Input Frequency
  kind: query
  command: "freq?"
  params: []

- id: dimmer_query
  label: Query Dimmer
  kind: query
  command: "dimmer?"
  params: []

- id: version_query
  label: Query Firmware Version
  kind: query
  command: "version?"
  params: []

- id: ip_query
  label: Query IP Address
  kind: query
  command: "ip?"
  params: []

- id: mac_query
  label: Query MAC Address
  kind: query
  command: "mac?"
  params: []

- id: model_query
  label: Query Model
  kind: query
  command: "model?"
  params: []

- id: discover_query
  label: Discover Device
  kind: query
  command: "discover?"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]

- id: source_state
  type: enum
  values: [cd, coax1, coax2, coax3, opt1, opt2, opt3, tuner, phono, aux1, aux2, pcusb, bluetooth, bal_xlr1, bal_xlr2]

- id: volume_level
  type: integer
  description: 2-digit current volume level (01-96)

- id: mute_state
  type: enum
  values: [on, off]

- id: bypass_state
  type: enum
  values: [on, off]

- id: bass_level
  type: string
  description: Signed 2-digit level (-10 to +10) or 000

- id: treble_level
  type: string
  description: Signed 2-digit level (-10 to +10) or 000

- id: balance_level
  type: string
  description: L/R offset (l01-l10, r01-r10) or 000

- id: freq_value
  type: enum
  values: [None, "32", "44.1", "48", "88.2", "96", "176.4", "192", "384"]

- id: dimmer_level
  type: enum
  values: ["0", "1", "2", "3", "4"]

- id: firmware_version
  type: string
  description: Rotel main CPU software version (e.g. 1.02)

- id: ip_address
  type: string
  description: Current IPv4 address

- id: mac_address
  type: string
  description: Uppercase MAC address (12 hex chars)

- id: model_number
  type: string
  description: Rotel model identifier (e.g. p5)

- id: discover_packet
  type: string
  description: ip=###.###.###.### port=#### mac=############
```

## Variables
```yaml
<!-- Section omitted: source defines all settable parameters as discrete command actions. -->
```

## Events
```yaml
<!-- Section omitted: events arrive as the same response strings listed in Feedbacks, sent automatically when rs232_update_on is set. -->
```

## Macros
```yaml
<!-- UNRESOLVED: source describes no multi-step sequences. -->
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
Commands must not include spaces; append `!` only (no CR/LF). Responses terminated with `$`. RS-232 hardware lacks flow control — pacing important to avoid packet loss. When `rs232_update_on` is set, the device pushes status changes as response strings; with `rs232_update_off` it is silent unless polled. IP control requires a valid IP address on a local network; TCP port 9596. Both P5 and P5 S2 share identical ASCII protocol but diverge on firmware (P5 V1.09+ vs P5 S2 V2.00+).
<!-- UNRESOLVED: source document metadata (full vendor URL, exact author of revision history) not captured. -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/P5-P5S2%20Protocol.pdf"
  - https://www.rotel.com/manual-resources/rs232-protocols
retrieved_at: 2026-06-30T16:11:46.486Z
last_checked_at: 2026-07-07T12:29:51.585Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:29:51.585Z
matched_actions: 69
action_count: 69
confidence: medium
summary: "All 69 spec actions matched literally against source command table and feedback request section; transport parameters verified; one-to-one coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no explicit authentication/login procedure described; treating as open protocol per source."
- "source describes no multi-step sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "source document metadata (full vendor URL, exact author of revision history) not captured."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
