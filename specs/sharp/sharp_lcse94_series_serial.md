---
spec_id: admin/sharp-lcse94-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCSE94 Series Control Spec"
manufacturer: Sharp
model_family: "LCSE94 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LCSE94 Series"
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
last_checked_at: 2026-05-31T21:11:58.166Z
generated_at: 2026-05-31T21:11:58.166Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T21:11:58.166Z
  matched_actions: 41
  action_count: 41
  confidence: high
  summary: "All 41 spec actions match command table entries one-to-one; all transport parameters verified in source; complete bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sharp LCSE94 Series Control Spec

## Summary
Sharp LCSE94 Series commercial display controlled via RS-232C. Eight-byte ASCII command protocol with 4-digit command + 4-digit parameter structure. Responses: `OK` or `ERR`. Serial settings: 9600 baud, 8N1, no flow control.

<!-- UNRESOLVED: power-on sequencing, fault behavior, error recovery not documented -->

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
- powerable    # power on/off commands present
- routable     # input selection commands present
- queryable    # "?" parameter returns current value
- levelable    # volume, contrast, brightness, etc.
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

- id: power_set
  label: Power Setting
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On

- id: input_toggle
  label: Input Selection (Toggle)
  kind: action
  params: []

- id: input_tv
  label: Input TV
  kind: action
  params: []

- id: input_av
  label: Input 1-7
  kind: action
  params:
    - name: port
      type: integer
      description: Input port number 1-7

- id: input_sel_1
  label: Input 1 Selection
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=AUTO, 1=VIDEO, 2=COMPONENT

- id: input_sel_3
  label: Input 3 Selection
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=AUTO, 1=VIDEO, 2=COMPONENT

- id: av_mode
  label: AV Mode Selection
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Toggle, 1=STANDARD, 2=MOVIE, 3=GAME, 4=USER, 5=DYNAMIC(Fixed), 6=DYNAMIC, 7=PC, 8=xvYCC

- id: volume
  label: Volume
  kind: action
  params:
    - name: level
      type: integer
      description: 0-60

- id: h_position
  label: H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: Range varies by View Mode and signal type

- id: v_position
  label: V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: Range varies by View Mode and signal type

- id: clock
  label: Clock (PC mode)
  kind: action
  params:
    - name: value
      type: integer
      description: 0-180

- id: phase
  label: Phase (PC mode)
  kind: action
  params:
    - name: value
      type: integer
      description: 0-40

- id: viewmode
  label: View Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Toggle, 1=Side Bar[AV], 2=S.Stretch[AV], 3=Zoom[AV], 4=Stretch[AV], 5=Normal[PC], 6=Zoom[PC], 7=Stretch[PC], 8=Dot by Dot[PC], 9=Full Screen[AV]

- id: mute
  label: Mute
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Toggle, 1=On, 2=Off

- id: surround
  label: Surround
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Toggle, 1=On, 3=Off

- id: audio_selection
  label: Audio Selection
  kind: action
  params: []

- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: 0=Off, 1=30, 2=60, 3=90, 4=120 (min)

- id: analog_air_cable_ch
  label: Analog Air/Cable Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Air Analog 2-69ch, Cable Analog 1-135ch

- id: analog_cable_ch
  label: Analog Cable Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: 1-135ch

- id: digital_air_ch
  label: Digital Air Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: 2-69ch (major channel only)

- id: digital_cable_ch
  label: Digital Cable Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: 1-135ch (major channel only)

- id: ch_updown
  label: Channel Up/Down
  kind: action
  params:
    - name: direction
      type: integer
      description: 0=Down, 1=Up

- id: opc
  label: OPC (Optical Picture Control)
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On, 2=On:Display

- id: backlight
  label: Backlight
  kind: action
  params:
    - name: level
      type: integer
      description: 0-16

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: 0-40

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: 0-30

- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      description: 0-30

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: 0-30

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: 0-10

- id: h_position_pc
  label: H-Position (PC)
  kind: action
  params:
    - name: value
      type: integer
      description: Range varies by View Mode and signal type

- id: v_position_pc
  label: V-Position (PC)
  kind: action
  params:
    - name: value
      type: integer
      description: Range varies by View Mode and signal type

- id: clock_pc
  label: Clock (PC)
  kind: action
  params:
    - name: value
      type: integer
      description: 0-180

- id: phase_pc
  label: Phase (PC)
  kind: action
  params:
    - name: value
      type: integer
      description: 0-40

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: value
      type: integer
      description: 0=High, 1=Mid-High, 2=Middle, 3=Mid-Low, 4=Low

- id: fine_motion_advanced
  label: Fine Motion Advanced
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On

- id: digital_noise_reduction
  label: Digital Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      description: 0=Off, 1=Low, 2=High

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      description: -15 to +15

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      description: -15 to +15

- id: balance
  label: Balance
  kind: action
  params:
    - name: value
      type: integer
      description: L30 to R30
```

## Feedbacks
```yaml
- id: response_code
  type: enum
  values:
    - OK
    - ERR
  description: All commands return either OK or ERR

- id: query_response
  type: string
  description: When "?" is used as parameter, current setting value is returned
```

## Variables
```yaml
# All settable parameters also support query via "?" parameter
# See Actions section for parameter ranges
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing documented
```

## Notes
Command format: 8 ASCII bytes + CR (0DH). Structure: C1 C2 C3 C4 P1 P2 P3 P4. Parameter aligned left, padded with spaces. Use `?` in parameter position to query current value.

RS-232C connector: 9-pin D-sub male. Do not send multiple commands simultaneously — wait for OK response before sending next command.

UNDERSCORE in parameter column requires SPACE character input.
ASTERISK in parameter column requires numeric value within specified range.
X in parameter column accepts any numeric value.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented -->
<!-- UNRESOLVED: OPC (Optical Picture Control) sensor details not documented -->

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
last_checked_at: 2026-05-31T21:11:58.166Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:11:58.166Z
matched_actions: 41
action_count: 41
confidence: high
summary: "All 41 spec actions match command table entries one-to-one; all transport parameters verified in source; complete bidirectional coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
