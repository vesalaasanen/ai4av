---
spec_id: admin/bose-lifetyle-home-entertainment-system
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bose Lifestyle Home Entertainment System Control Spec"
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
  firmware: "\"6.1 or later\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eserviceinfo.com
  - files.remotecentral.com
source_urls:
  - "https://www.eserviceinfo.com/preview_html.php?fileid=60281&previewid=31157"
  - "https://files.remotecentral.com/view/7121-18700-1/bose_t_&_v-class_home_theater_systems.html"
retrieved_at: 2026-05-22T15:53:45.910Z
last_checked_at: 2026-06-02T21:41:06.414Z
generated_at: 2026-06-02T21:41:06.414Z
firmware_coverage: "\"6.1 or later\""
protocol_coverage: []
known_gaps:
  - "source does not state pinout beyond ring/tip; full mechanical drawings not provided"
  - "no settable parameter values documented in source beyond discrete"
  - "source does not document any multi-step sequences or named macros."
  - "full electrical specs (max cable length, drive current) not in source"
  - "ACK timeout value not specified — controller must choose its own wait timeout"
  - "behavior when ACK not received within timeout (retry? abort?) not in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:06.414Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions match literally with source Table 2 remote codes and section 5 TAP protocol; all transport parameters verified; complete coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Bose Lifestyle Home Entertainment System Control Spec

## Summary
RS-232 serial control spec for Bose Lifestyle 20/25/30 home entertainment systems. Internal Bose designation for the shared music center is CD20. Control runs over a 3.5 mm stereo phone jack (SER-IN ring, SER-OUT tip) at 5 V TTL levels (not true RS-232 — converter required). Half-duplex TAP mode is the only consumer-relevant protocol.

<!-- UNRESOLVED: source does not state pinout beyond ring/tip; full mechanical drawings not provided -->

## Transport
```yaml
# Serial-only device. 5V TTL levels - not true ±12V RS-232.
# Source states "be careful not to connect directly to a PC RS232 port - use a RS232 to TTL converter".
protocols:
  - serial
serial:
  baud_rate: 1200  # source: default and recommended; 9600 selectable but higher bit error rate
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # half-duplex, no flow control documented
auth:
  type: none  # inferred: no login/password procedure in source
```

## Traits
```yaml
powerable: true   # ON/OFF remote code (00h)
levelable: true   # VOL UP/DN, SUR VOL UP/DN, MUTE, MUTE ALL, CENTER, SURROUND, STEREO, STEREO+
routable: true    # VIDEO 1/2, AUX, CD, AM/FM, TAPE input select codes
queryable: false  # no query commands documented; all TAP codes are one-way fire-and-ACK
```

## Actions
```yaml
# === Serial port mode invocation (Idle mode) ===
# Source: section 4.1. After reset CD20 monitors SER-IN and echoes any char back.
# Three monitored 4-char sequences (CR = 0x0D) switch modes.

- id: invoke_tap
  label: Switch to TAP mode
  kind: action
  command: "TAP\r"  # 4 bytes: 'T' 'A' 'P' 0x0D
  params: []

- id: software_reset
  label: Software reset (RST)
  kind: action
  command: "RST\r"  # 4 bytes: 'R' 'S' 'T' 0x0D
  params: []

- id: invoke_idle
  label: Return to Idle mode
  kind: action
  command: "Bose"  # any-mode -> Idle escape sequence (per source section 4.1.1)
  params: []

# === TAP session control ===
# Source: section 5. TAP mode is invoked from Idle via "TAP\r".
# All subsequent commands follow: send 'a' preamble, wait for 'X' (TAP_ACK) or 'x' (TAP_NAK),
# then send a 3-byte command (cmd, d1, d2), wait for ACK.

- id: tap_preamble
  label: TAP command preamble
  kind: action
  command: "a"  # 0x61 single byte; controller waits for 'X' before sending command
  params: []

- id: tap_exit
  label: Exit TAP mode
  kind: action
  command: "a@@@"  # 4 bytes total: 'a' + 3 placeholder bytes (per source section 5.2)
  params: []

# === TAP zone setup ===
# Source: section 5.4. Hex data byte required; only two zones documented.

- id: select_zone_1
  label: Select Zone 1
  kind: action
  command: "aA\x01@"  # cmd='A' (0x41), d1=0x01, d2=any
  params: []

- id: select_zone_2
  label: Select Zone 2
  kind: action
  command: "aA\x02@"  # cmd='A' (0x41), d1=0x02, d2=any
  params: []

# === TAP_simul_remote command set ===
# Source: section 5.5, Table 2. Format: 'a' preamble, then 3 bytes (cmd='E', d1=remote code char, d2=any).
# d1 bits 7,6,5 are don't-care; bits 4..0 encode the remote code. Visible ASCII equivalents listed.
# Each row of Table 2 enumerated as a distinct action per granularity rule.

- id: power_on_off
  label: Power On/Off (toggle)
  kind: action
  command: "aE@@"  # remote code 00h
  params: []

- id: vol_up
  label: Volume Up
  kind: action
  command: "aEA@"  # remote code 01h
  params: []

- id: skip_rev
  label: Skip Reverse (previous track)
  kind: action
  command: "aEB@"  # remote code 02h
  params: []

- id: play_pause
  label: Play / Pause
  kind: action
  command: "aEC@"  # remote code 03h
  params: []

- id: skip_fwd
  label: Skip Forward (next track)
  kind: action
  command: "aED@"  # remote code 04h
  params: []

- id: vol_dn
  label: Volume Down
  kind: action
  command: "aEE@"  # remote code 05h
  params: []

- id: next_disc
  label: Next Disc
  kind: action
  command: "aEF@"  # remote code 06h
  params: []

- id: select_video_1
  label: Select Input: Video 1
  kind: action
  command: "aEG@"  # remote code 07h
  params: []

- id: select_video_2
  label: Select Input: Video 2
  kind: action
  command: "aEH@"  # remote code 08h
  params: []

- id: select_aux
  label: Select Input: AUX
  kind: action
  command: "aEI@"  # remote code 09h
  params: []

- id: select_cd
  label: Select Input: CD
  kind: action
  command: "aEJ@"  # remote code 0Ah
  params: []

- id: select_am_fm
  label: Select Input: AM/FM (Tuner)
  kind: action
  command: "aEK@"  # remote code 0Bh
  params: []

- id: select_tape
  label: Select Input: Tape
  kind: action
  command: "aEL@"  # remote code 0Ch
  params: []

- id: stop
  label: Stop
  kind: action
  command: "aEM@"  # remote code 0Dh
  params: []

- id: mute
  label: Mute
  kind: action
  command: "aEN@"  # remote code 0Eh
  params: []

- id: mute_all
  label: Mute All Zones
  kind: action
  command: "aEO@"  # remote code 0Fh
  params: []

- id: random
  label: Random (shuffle)
  kind: action
  command: "aEP@"  # remote code 10h
  params: []

- id: sur_vol_up
  label: Surround Volume Up
  kind: action
  command: "aEQ@"  # remote code 11h
  params: []

- id: sur_vol_dn
  label: Surround Volume Down
  kind: action
  command: "aER@"  # remote code 12h
  params: []

- id: surround
  label: Surround (mode cycle)
  kind: action
  command: "aES@"  # remote code 13h
  params: []

- id: stereo_plus
  label: Stereo+ (mode)
  kind: action
  command: "aET@"  # remote code 14h
  params: []

- id: center
  label: Center (level/mode)
  kind: action
  command: "aEU@"  # remote code 15h
  params: []

- id: stereo
  label: Stereo (mode)
  kind: action
  command: "aEV@"  # remote code 16h
  params: []

- id: digit_0
  label: Digit 0
  kind: action
  command: "aEW@"  # remote code 17h (T0)
  params: []

- id: digit_1
  label: Digit 1
  kind: action
  command: "aEX@"  # remote code 18h (T1)
  params: []

- id: digit_2
  label: Digit 2
  kind: action
  command: "aEY@"  # remote code 19h (T2)
  params: []

- id: digit_3
  label: Digit 3
  kind: action
  command: "aEZ@"  # remote code 1Ah (T3)
  params: []

- id: digit_4
  label: Digit 4
  kind: action
  command: "aE[@"  # remote code 1Bh (T4)
  params: []

- id: digit_5
  label: Digit 5
  kind: action
  command: "aE\\@"  # remote code 1Ch (T5)
  params: []

- id: digit_6
  label: Digit 6
  kind: action
  command: "aE]@"  # remote code 1Dh (T6)
  params: []

- id: digit_7
  label: Digit 7
  kind: action
  command: "aE^@"  # remote code 1Eh (T7)
  params: []

- id: digit_8
  label: Digit 8
  kind: action
  command: "aE_@"  # remote code 1Fh (T8)
  params: []

- id: digit_9
  label: Digit 9
  kind: action
  command: "aE`@"  # remote code 20h (T9)
  params: []

- id: play
  label: Play
  kind: action
  command: "aEa@"  # remote code 21h
  params: []

- id: pause
  label: Pause
  kind: action
  command: "aEb@"  # remote code 22h
  params: []

- id: fast_rev
  label: Fast Reverse (search)
  kind: action
  command: "aEc@"  # remote code 23h
  params: []

- id: fast_fwd
  label: Fast Forward (search)
  kind: action
  command: "aEd@"  # remote code 24h
  params: []
```

## Feedbacks
```yaml
- id: tap_ack
  type: enum
  values: [X]
  description: TAP_ACK (0x58) - command accepted, sent after each TAP command

- id: tap_nak
  type: enum
  values: [x]
  description: TAP_NAK (0x78) - command could not be completed (e.g. CD Play with no disc)

- id: power_up_marker
  type: enum
  values: ["*"]
  description: ASCII '*' (0x2A) emitted ~300 ms after power-up or software reset; used to detect reset/power-break
```

## Variables
```yaml
# UNRESOLVED: no settable parameter values documented in source beyond discrete
# remote-key actions. No numeric parameter ranges, no enum setters.
[]
```

## Events
```yaml
- id: power_up_event
  description: Device sends ASCII '*' (0x2A) ~300 ms after hardware reset or RST command; controller uses this to detect reset/power-break
  payload: "*"

- id: tap_ack_event
  description: TAP_ACK 'X' (0x58) returned after every successful TAP command
  payload: "X"

- id: tap_nak_event
  description: TAP_NAK 'x' (0x78) returned when a TAP command cannot be completed
  payload: "x"
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences or named macros.
[]
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
# The only "safety-adjacent" item is the explicit warning not to connect the 5V TTL
# port directly to a PC RS-232 port (electrical damage to the unit), captured in Notes.
```

## Notes
- **Electrical warning (source, verbatim):** "be careful not to connect directly to a PC RS232 port - use a RS232 to TTL converter". The CD20 serial port uses 5 V TTL levels; idle state is 5 V. Direct connection will damage the unit or the PC.
- **Half-duplex only.** Source: "the communication is only HALF DUPLEX" (single software timer). Controller must not transmit while expecting an ACK.
- **Default baud is 1200** after power-up. 9600 is selectable but has a higher bit error rate per source.
- **Software reset keypress** (for diagnostics): STORE+ERASE+ON on the front panel.
- **Firmware check** (front panel, unit OFF): hold Skip Down + Tune Down + Source Select simultaneously. Display should read e.g. "Crev 6.1". Serial remote requires 6.1 or later.
- **TAP_simul_remote d1 bits 7..5 are don't-care.** The visible-character column in Table 2 is the convenience mapping; the underlying encoding is the low 5 bits of d1.
- **Zone select is hex** (`A<0x1>`, `A<0x2>`), unlike the rest of TAP commands which use ASCII data bytes.

<!-- UNRESOLVED: full electrical specs (max cable length, drive current) not in source -->
<!-- UNRESOLVED: ACK timeout value not specified — controller must choose its own wait timeout -->
<!-- UNRESOLVED: behavior when ACK not received within timeout (retry? abort?) not in source -->

## Provenance

```yaml
source_domains:
  - eserviceinfo.com
  - files.remotecentral.com
source_urls:
  - "https://www.eserviceinfo.com/preview_html.php?fileid=60281&previewid=31157"
  - "https://files.remotecentral.com/view/7121-18700-1/bose_t_&_v-class_home_theater_systems.html"
retrieved_at: 2026-05-22T15:53:45.910Z
last_checked_at: 2026-06-02T21:41:06.414Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:06.414Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions match literally with source Table 2 remote codes and section 5 TAP protocol; all transport parameters verified; complete coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state pinout beyond ring/tip; full mechanical drawings not provided"
- "no settable parameter values documented in source beyond discrete"
- "source does not document any multi-step sequences or named macros."
- "full electrical specs (max cable length, drive current) not in source"
- "ACK timeout value not specified — controller must choose its own wait timeout"
- "behavior when ACK not received within timeout (retry? abort?) not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
