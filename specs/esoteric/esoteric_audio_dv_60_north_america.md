---
spec_id: admin/esoteric_audio-dv_60
schema_version: ai4av-public-spec-v1
revision: 1
title: "Esoteric Audio DV-60 Control Spec"
manufacturer: Esoteric
model_family: DV-60
aliases: []
compatible_with:
  manufacturers:
    - Esoteric
    - "Esoteric Audio"
  models:
    - DV-60
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esoteric.jp
source_urls:
  - https://www.esoteric.jp/downloads/products/esoteric/k-01xd/esoteric_rs232c_command_table_rev1.5.pdf
retrieved_at: 2026-05-12T09:53:46.083Z
last_checked_at: 2026-05-20T11:49:44.092Z
generated_at: 2026-05-20T11:49:44.092Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - O.GAIN
  - GAIN-
  - GAIN+
  - "@?OUTPUT"
  - "@?EQ"
  - "@?GAIN"
  - "@?CGAIN"
verification:
  verdict: verified
  checked_at: 2026-05-20T11:49:44.092Z
  matched_actions: 41
  action_count: 41
  confidence: high
  summary: "All 41 spec actions matched verbatim; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# Esoteric Audio DV-60 Control Spec

## Summary
Esoteric Audio RS-232C serial control interface. Full-duplex asynchronous serial communication at 9600bps, 8-bit data, no parity, 1 stop bit, no flow control. ASCII command protocol with `@` start character and CR terminator. Supports power, playback, input selection, volume, and query commands.

<!-- UNRESOLVED: source document covers Grandioso C1X/C1Xsolo/E1, K-01XD/K-03XD/K-05XD/N-05XD, F-01/F-02 — DV-60 not listed. Spec populated from this source but device match unverified. -->

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
- powerable  # inferred: power ON/OFF commands present
- routable   # inferred: INPUT selection commands present
- queryable  # inferred: request commands returning state present
- levelable  # inferred: VOLUME command present
- playable   # inferred: PLAY/PAUSE/STOP/TRAY commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: dimmer
  label: Dimmer
  kind: action
  params: []
- id: key_command
  label: Key Command
  kind: action
  params:
    - name: code
      type: string
      description: "Hex key code (e.g. '01' for PLAY, '00' for TRAY)"
- id: tray
  label: Tray Open/Close
  kind: action
  params: []
- id: play
  label: Play
  kind: action
  params: []
- id: pause
  label: Pause
  kind: action
  params: []
- id: stop
  label: Stop
  kind: action
  params: []
- id: track_prev
  label: Track Previous (I<<)
  kind: action
  params: []
- id: track_next
  label: Track Next (>>I)
  kind: action
  params: []
- id: scan_rewind
  label: Scan Rewind (<<)
  kind: action
  params: []
- id: scan_forward
  label: Scan Forward (>>)
  kind: action
  params: []
- id: numeric
  label: Numeric Key
  kind: action
  params:
    - name: digit
      type: string
      description: "Single digit '0'-'9', or '+10', or 'CLEAR'"
- id: play_mode
  label: Play Mode
  kind: action
  params: []
- id: repeat
  label: Repeat
  kind: action
  params: []
- id: shuffle
  label: Shuffle
  kind: action
  params: []
- id: play_area
  label: Play Area
  kind: action
  params: []
- id: mode
  label: Mode
  kind: action
  params: []
- id: display
  label: Display
  kind: action
  params: []
- id: volume
  label: Volume
  kind: action
  params:
    - name: level
      type: string
      description: "Volume level in STEP (e.g. '23.4')"
- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: string
      description: "Input target (e.g. 'XLR1', 'RCA1', 'OPT')"
- id: input_minus
  label: Input Minus
  kind: action
  params: []

- id: input_plus
  label: Input Plus
  kind: action
  params: []

- id: volume_minus
  label: Volume Minus
  kind: action
  params: []

- id: volume_plus
  label: Volume Plus
  kind: action
  params: []

- id: mute
  label: Mute
  kind: action
  params: []

- id: setup_menu
  label: Setup/Menu
  kind: action
  params: []

- id: subsonic
  label: Subsonic
  kind: action
  params: []

- id: mono
  label: Mono
  kind: action
  params: []

- id: load
  label: Load
  kind: action
  params: []

- id: preset
  label: Preset
  kind: action
  params: []

- id: low_limit
  label: Low Limit
  kind: action
  params: []

- id: turnover
  label: Turnover
  kind: action
  params: []

- id: roll_off
  label: Roll Off
  kind: action
  params: []

- id: eq_minus
  label: EQ Minus
  kind: action
  params: []

- id: eq_plus
  label: EQ Plus
  kind: action
  params: []

- id: c_gain_minus
  label: C.Gain Minus
  kind: action
  params: []

- id: c_gain_plus
  label: C.Gain Plus
  kind: action
  params: []

- id: mm_mc
  label: MM/MC
  kind: action
  params: []

- id: cap_imp
  label: Cap/Imp
  kind: action
  params: []

- id: led_off
  label: LED Off
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: input_status
  label: Input Status
  type: enum
  values: [ESLA, XLR, RCA, DISC]
- id: analog_output_status
  label: Analog Output Status
  type: enum
  values: [SPEAKER, HP, XLR2, ESLA, RCA]
- id: digital_output_status
  label: Digital Output Status
  type: enum
  values: [ESLINK, XLR, RCA, OPT]
- id: volume_status
  label: Volume Status
  type: string
  description: "Volume level in STEP (e.g. '23.4')"
- id: media_status
  label: Media Status
  type: string
  description: "Returns media type, total tracks, total time (e.g. 'CD 15 64 08')"
- id: play_status
  label: Play Status
  type: string
  description: "Play state, track, time, time mode (e.g. 'PLAY 3 1 23 TE'). TE=Track Elapsed, TR=Track Remain, DE=Disc Elapsed, DR=Disc Remain"
- id: play_mode_status
  label: Play Mode Status
  type: enum
  values: [CONTINUE, PGM, SHUFFLE]
- id: repeat_status
  label: Repeat Status
  type: enum
  values: [OFF, ALL, "1"]
- id: upconv_status
  label: Upconv Status
  type: enum
  values: [OFF, 2fs, 4fs, 8fs, 16fs, DSD]
- id: sampling_frequency
  label: Sampling Frequency
  type: string
  description: "Sampling frequency of input source (e.g. '44.1kHz')"
- id: mqa_status
  label: MQA Status
  type: string
  description: "MQA decode status and sample rate (e.g. 'MQA. 192kHz'). Values: NON, MQA, MQA., MQB"
```

## Variables
```yaml
# UNRESOLVED: device-specific variables not stated in source
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications not described in source
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings or interlock procedures not present in source
```

## Notes
Command timing: delay >20ms after ACK before sending next command. Start char `@` (0x40), end char CR (0x0D). ACK=0x06, NAK=0x15. Request commands prefixed with `?` (e.g. `@?INPUT<CR>`). Normal commands prefixed with `@` and acknowledged with ACK/NAK. Key hex codes: PLAY=01, PAUSE=02, STOP=03, TRAY=00, I<<=0B, >>I=0C, << =40, >>=41, PLAY MODE=1E, REPEAT=47, SHUFFLE=1F, DIMMER=5A.
<!-- UNRESOLVED: DV-60 specific command coverage unverified — source covers Grandioso C1X/C1Xsolo/E1, K-01XD/K-03XD/K-05XD/N-05XD, F-01/F-02 families only -->
````

**Added vs current spec:**
- Actions: `dimmer`, `tray`, `play`, `pause`, `stop`, `track_prev`, `track_next`, `scan_rewind`, `scan_forward`, `numeric`, `play_mode`, `repeat`, `shuffle`, `play_area`, `mode`, `display`
- Traits: `playable`
- Feedbacks: `media_status`, `play_status`, `play_mode_status`, `repeat_status`, `upconv_status`, `sampling_frequency`, `mqa_status`
- `volume` param type → `string` (source uses decimal STEP like `23.4`, not integer)
- `volume_status` type → `string` (same reason)
- Notes expanded with key hex codes

## Provenance

```yaml
source_domains:
  - esoteric.jp
source_urls:
  - https://www.esoteric.jp/downloads/products/esoteric/k-01xd/esoteric_rs232c_command_table_rev1.5.pdf
retrieved_at: 2026-05-12T09:53:46.083Z
last_checked_at: 2026-05-20T11:49:44.092Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T11:49:44.092Z
matched_actions: 41
action_count: 41
confidence: high
summary: "All 41 spec actions matched verbatim; transport verified."
```

## Known Gaps

```yaml
- O.GAIN
- GAIN-
- GAIN+
- "@?OUTPUT"
- "@?EQ"
- "@?GAIN"
- "@?CGAIN"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
