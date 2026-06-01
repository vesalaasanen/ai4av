---
spec_id: admin/bose-cd20
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bose CD20 (Lifestyle 20/25/30) Control Spec"
manufacturer: Bose
model_family: "Lifestyle 20"
aliases: []
compatible_with:
  manufacturers:
    - Bose
  models:
    - "Lifestyle 20"
    - "Lifestyle 25"
    - "Lifestyle 30"
  firmware: "\"6.1+\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.boseprofessional.com
  - assets.bosecreative.com
source_urls:
  - https://assets.boseprofessional.com/m/4998082f60dfee56/original/ControlSpace-Serial-Protocol-v5-13.pdf
  - https://assets.boseprofessional.com/m/3f75dade2573b467/original/ControlSpace-Serial-Protocol-v5-14-1.pdf
  - https://assets.bosecreative.com/m/496577402d128874/original/SoundTouch-Web-API.pdf
retrieved_at: 2026-05-16T00:42:17.003Z
last_checked_at: 2026-05-26T06:08:52.231Z
generated_at: 2026-05-26T06:08:52.231Z
firmware_coverage: "\"6.1+\""
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-26T06:08:52.231Z
  matched_actions: 32
  action_count: 32
  confidence: high
  summary: "All 32 spec actions matched verbatim to source TABLE 2 remote codes and TAP mode commands; baud/parity/bits/duplex verified; complete coverage of documented control set."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Bose CD20 (Lifestyle 20/25/30) Control Spec

## Summary
Bose CD20 music center serial control spec. RS-232 half-duplex, 5V signal level, TAP mode for consumer control. Firmware 6.1+ required. Baud switchable 1200/9600 (default 1200).

<!-- UNRESOLVED: power consumption, voltage specs not in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 1200  # default; source allows 9600 also
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not mentioned
  duplex: half  # stated: software UART, half duplex only
addressing:
  port: null  # UNRESOLVED: port number not applicable for serial
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command set:
powerable: true
levelable: true  # VOL UP/DN, SUR VOL UP/DN, MUTE, MUTE ALL
routable: true    # input selection: VIDEO 1/2, AUX, CD, AM/FM, TAPE
queryable: false  # UNRESOLVED: no query commands in source
```

## Actions
```yaml
- id: power_toggle
  label: Power Toggle (ON/OFF)
  kind: action
  params: []
  notes: HEX 00h, ASCII @

- id: vol_up
  label: Volume Up
  kind: action
  params: []
  notes: HEX 01h, ASCII A

- id: skip_rev
  label: Skip Reverse
  kind: action
  params: []
  notes: HEX 02h, ASCII B

- id: play_pause
  label: Play/Pause
  kind: action
  params: []
  notes: HEX 03h, ASCII C

- id: skip_fwd
  label: Skip Forward
  kind: action
  params: []
  notes: HEX 04h, ASCII D

- id: vol_dn
  label: Volume Down
  kind: action
  params: []
  notes: HEX 05h, ASCII E

- id: next_disc
  label: Next Disc
  kind: action
  params: []
  notes: HEX 06h, ASCII F

- id: video_1
  label: Video 1 Input
  kind: action
  params: []
  notes: HEX 07h, ASCII G

- id: video_2
  label: Video 2 Input
  kind: action
  params: []
  notes: HEX 08h, ASCII H

- id: aux
  label: AUX Input
  kind: action
  params: []
  notes: HEX 09h, ASCII I

- id: cd
  label: CD Input
  kind: action
  params: []
  notes: HEX 0Ah, ASCII J

- id: am_fm
  label: AM/FM Input
  kind: action
  params: []
  notes: HEX 0Bh, ASCII K

- id: tape
  label: Tape Input
  kind: action
  params: []
  notes: HEX 0Ch, ASCII L

- id: stop
  label: Stop
  kind: action
  params: []
  notes: HEX 0Dh, ASCII M

- id: mute
  label: Mute
  kind: action
  params: []
  notes: HEX 0Eh, ASCII N

- id: mute_all
  label: Mute All
  kind: action
  params: []
  notes: HEX 0Fh, ASCII O

- id: random
  label: Random
  kind: action
  params: []
  notes: HEX 10h, ASCII P

- id: sur_vol_up
  label: Surround Volume Up
  kind: action
  params: []
  notes: HEX 11h, ASCII Q

- id: sur_vol_dn
  label: Surround Volume Down
  kind: action
  params: []
  notes: HEX 12h, ASCII R

- id: surround
  label: Surround Mode
  kind: action
  params: []
  notes: HEX 13h, ASCII S

- id: stereo_plus
  label: Stereo Plus
  kind: action
  params: []
  notes: HEX 14h, ASCII T

- id: center
  label: Center
  kind: action
  params: []
  notes: HEX 15h, ASCII U

- id: stereo
  label: Stereo
  kind: action
  params: []
  notes: HEX 16h, ASCII V

- id: t0_t9
  label: Tuner Presets T0-T9
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 0-9
  notes: HEX 17h-20h, ASCII W-`

- id: play
  label: Play
  kind: action
  params: []
  notes: HEX 21h, ASCII a

- id: pause
  label: Pause
  kind: action
  params: []
  notes: HEX 22h, ASCII b

- id: fast_rev
  label: Fast Reverse
  kind: action
  params: []
  notes: HEX 23h, ASCII c

- id: fast_fwd
  label: Fast Forward
  kind: action
  params: []
  notes: HEX 24h, ASCII d

- id: tap_enter
  label: Enter TAP Mode
  kind: action
  params: []
  notes: send "TAP" from idle mode

- id: tap_exit
  label: Exit TAP Mode
  kind: action
  params: []
  notes: send "axxx"

- id: tap_select_zone_1
  label: Select Zone 1
  kind: action
  params: []
  notes: "A<0x1> in hex data format"

- id: tap_select_zone_2
  label: Select Zone 2
  kind: action
  params: []
  notes: "A<0x2> in hex data format"
```

## Feedbacks
```yaml
# UNRESOLVED: no response strings documented beyond X (ACK) and * (reset indicator)
- id: tap_ack
  label: TAP Acknowledgement
  type: enum
  values:
    - X  # command completed
    - x  # command cannot be completed

- id: reset_indicator
  label: Reset/Power-up Indicator
  type: string
  value: "*"  # sent 300ms after each power-up or reset
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented beyond remote simulation
```

## Events
```yaml
# UNRESOLVED: no unsolicited event messages documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Electrical signal is 5V RS-232 - do not connect directly to PC RS-232 port; use RS-232 to TTL converter
  - After power-up (~300ms) or reset, CD20 sends "*" and enters IDLE mode; controller must explicitly invoke desired mode
# UNRESOLVED: no safety interlocks or sequencing requirements beyond above
```

## Notes
- TAP mode preamble byte "a" precedes all commands except mode-switch sequences
- Commands are 3 bytes: command + 2 data bytes (send placeholder bytes for commands without data)
- Controller must wait for ACK/NAK before sending next command (no concatenation)
- Half-duplex only — cannot send and receive simultaneously
- Baud rate switchable 1200/9600; 9600 has higher bit error rate; 1200 is recommended default
- Serial port uses 3.5mm stereo phone jack (SER-IN ring, SER-OUT tip); 330 ohm series resistor; 10K pull-up to +5V
- IDLE mode echoes any received character back to SER-OUT for testing
- "Bose" character sequence returns to IDLE from any mode
<!-- UNRESOLVED: port number, flow control settings, query commands, firmware compatibility beyond 6.1 -->

## Provenance

```yaml
source_domains:
  - assets.boseprofessional.com
  - assets.bosecreative.com
source_urls:
  - https://assets.boseprofessional.com/m/4998082f60dfee56/original/ControlSpace-Serial-Protocol-v5-13.pdf
  - https://assets.boseprofessional.com/m/3f75dade2573b467/original/ControlSpace-Serial-Protocol-v5-14-1.pdf
  - https://assets.bosecreative.com/m/496577402d128874/original/SoundTouch-Web-API.pdf
retrieved_at: 2026-05-16T00:42:17.003Z
last_checked_at: 2026-05-26T06:08:52.231Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-26T06:08:52.231Z
matched_actions: 32
action_count: 32
confidence: high
summary: "All 32 spec actions matched verbatim to source TABLE 2 remote codes and TAP mode commands; baud/parity/bits/duplex verified; complete coverage of documented control set."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
