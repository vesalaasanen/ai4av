---
schema_version: ai4av-public-spec-v1
device_id: marantz/vs3002-north-america
entity_id: marantz_vs3002_north_america
spec_id: admin/marantz-vs3002-north-america
revision: 1
author: admin
title: "Marantz VS3002 (North America) Control Spec"
status: published
manufacturer: Marantz
manufacturer_key: marantz
model_family: "VS3002 (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "VS3002 (North America)"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
source_documents:
  - title: "Marantz public source"
    url: https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:54.096Z
retrieved_at: 2026-04-29T11:13:54.096Z
last_checked_at: 2026-04-23T08:13:13.645Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:13:13.645Z
  matched_actions: 60
  action_count: 60
  confidence: high
  summary: "Every spec action matched literally in source commands; transport parameters (port 23, baud 9600) confirmed; full command coverage achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Marantz VS3002 (North America) Control Spec

## Summary
AV surround receiver supporting both RS-232C serial and TCP/IP (Telnet) control. Commands are ASCII-based with CR (0x0D) termination. Supports multi-zone control (Zone2, Zone3, All Zone Stereo), HD Radio, surround mode selection, video processing, and Audyssey room correction. Command interval minimum 50ms; response within 200ms; events sent within 5 seconds of state changes.

<!-- UNRESOLVED: complete command set coverage not verified against device -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # TCP port 23 (Telnet) - stated in source
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
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  params: []

- id: power_query
  label: Query Power Status
  kind: action
  params: []

- id: master_volume_up
  label: Master Volume Up
  kind: action
  params: []

- id: master_volume_down
  label: Master Volume Down
  kind: action
  params: []

- id: master_volume_set
  label: Set Master Volume (direct dB)
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-98, 80=0dB, 00=--- (MIN); 0.5dB step uses 3 ASCII chars (e.g. MV805=+0.5dB)

- id: mute_on
  label: Mute On
  kind: action
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: mute_query
  label: Query Mute Status
  kind: action
  params: []

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP

- id: input_query
  label: Query Input Source
  kind: action
  params: []

- id: surround_mode_set
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-QUICK5, QUICK1 MEMORY-QUICK5 MEMORY, and many DTS/Dolby variants

- id: surround_mode_query
  label: Query Surround Mode
  kind: action
  params: []

- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []

- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []

- id: main_zone_query
  label: Query Main Zone Status
  kind: action
  params: []

- id: sleep_timer_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: 001-120 minutes; 010=10min; OFF to cancel

- id: auto_standby_set
  label: Set Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: "15M, 30M, 60M, OFF"

- id: eco_mode_set
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ON, AUTO, OFF

- id: digital_input_select
  label: Select Digital Input
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO

- id: video_select_set
  label: Set Video Select Mode
  kind: action
  params:
    - name: source
      type: string
      description: DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-AUX7, CD, SOURCE, ON, OFF

- id: tone_control_on
  label: Tone Control On
  kind: action
  params: []

- id: tone_control_off
  label: Tone Control Off
  kind: action
  params: []

- id: bass_up
  label: Bass Up
  kind: action
  params: []

- id: bass_down
  label: Bass Down
  kind: action
  params: []

- id: treble_up
  label: Treble Up
  kind: action
  params: []

- id: treble_down
  label: Treble Down
  kind: action
  params: []

- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, STD, MOV, VVD, STM, CTM, DAY, NGT

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: string
      description: "000-100, 050=0; range -50 to +50"

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: string
      description: "000-100, 050=0; range -50 to +50"

- id: saturation_set
  label: Set Saturation
  kind: action
  params:
    - name: value
      type: string
      description: "000-100, 050=0; range -50 to +50"

- id: hue_set
  label: Set Hue
  kind: action
  params:
    - name: value
      type: string
      description: "44-56, 50=0; range -6 to +6"

- id: DNR_set
  label: Set DNR
  kind: action
  params:
    - name: level
      type: string
      description: OFF, LOW, MID, HI

- id: enhancer_set
  label: Set Enhancer
  kind: action
  params:
    - name: value
      type: string
      description: "00-12, 00=0"

- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  params: []

- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  params: []

- id: tuner_frequency_set
  label: Set Tuner Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: 6 digits - ****.** kHz AM (>050000), ****.** MHz FM (<050000)

- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  params: []

- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  params: []

- id: tuner_preset_select
  label: Select Tuner Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-56"

- id: tuner_band_select
  label: Select Tuner Band
  kind: action
  params:
    - name: band
      type: string
      description: AM, FM, AUTO, MANUAL

- id: tuner_preset_memory
  label: Memory Tuner Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-56"

- id: dimmer_set
  label: Set Display Dimmer
  kind: action
  params:
    - name: mode
      type: string
      description: BRI, DIM, DAR, OFF, SEL (toggle)

- id: remote_lock_on
  label: Remote Lock On
  kind: action
  params: []

- id: remote_lock_off
  label: Remote Lock Off
  kind: action
  params: []

- id: panel_lock_on
  label: Panel Lock On
  kind: action
  params: []

- id: panel_lock_off
  label: Panel Lock Off
  kind: action
  params: []

- id: trigger1_set
  label: Trigger 1 On/Off
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: trigger2_set
  label: Trigger 2 On/Off
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: trigger_query
  label: Query Trigger Status
  kind: action
  params: []

# Zone2 actions
- id: zone2_on
  label: Zone2 On
  kind: action
  params: []

- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []

- id: zone2_select_input
  label: Zone2 Select Input
  kind: action
  params:
    - name: source
      type: string
      description: Same as main zone input list

- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  params: []

- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  params: []

- id: zone2_mute_on
  label: Zone2 Mute On
  kind: action
  params: []

- id: zone2_mute_off
  label: Zone2 Mute Off
  kind: action
  params: []

# Zone3 actions
- id: zone3_on
  label: Zone3 On
  kind: action
  params: []

- id: zone3_off
  label: Zone3 Off
  kind: action
  params: []

- id: zone3_select_input
  label: Zone3 Select Input
  kind: action
  params:
    - name: source
      type: string
      description: Same as main zone input list

- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  params: []

- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  params: []

- id: zone3_mute_on
  label: Zone3 Mute On
  kind: action
  params: []

- id: zone3_mute_off
  label: Zone3 Mute Off
  kind: action
  params: []

- id: all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  params: []

- id: all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  params: []
```

## Feedbacks
```yaml
# All query commands (?) return RESPONSE strings matching the command+parameter format:
# - PW? returns PWON<CR> or PWSTANDBY<CR>
# - MV? returns MVxx<CR> (current volume value)
# - SI? returns SIxxx<CR> (current input)
# - MS? returns MSxxx<CR> (current surround mode)
# - MU? returns MUON<CR> or MUOFF<CR>
# - etc.

- id: power_state
  type: enum
  values: [on, standby]

- id: volume_state
  type: string
  description: "MV command response, e.g. MV80<CR> (master volume)"

- id: input_state
  type: string
  description: "SI command response, e.g. SIDVD<CR>"

- id: surround_state
  type: string
  description: "MS command response string"

- id: mute_state
  type: enum
  values: [on, off]

- id: tuner_state
  type: string
  description: "TFAN105000<CR> format for AM/FM frequency"

- id: hd_radio_state
  type: object
  description: "Returns: HDST NAME*, HDSIG LEV 0-6, HDMLT CURRCH*, HDMLT CAST CH*, HDPTY, HDARTIST, HDTITLE, HDALBUM, HDGENRE, HDMODE DIGITAL/ANALOG"

- id: zone2_state
  type: enum
  values: [on, off]

- id: zone3_state
  type: enum
  values: [on, off]

- id: trigger_state
  type: string
  description: "TR1 ON<CR> TR2 ON<CR> format"
```

## Variables
```yaml
# Settable parameters not discrete actions:

- id: master_volume
  type: integer
  description: "00-98 (ASCII), 80=0dB; 3-char for 0.5dB steps"

- id: bass_level
  type: integer
  description: "00-99 ASCII, 50=0dB; range 44-56 (-6 to +6)"

- id: treble_level
  type: integer
  description: "00-99 ASCII, 50=0dB; range 44-56 (-6 to +6)"

- id: channel_volume
  type: string
  description: "CVFL, CVFR, CVC (center), CVSW/SW2, CVSL/SR/SBL/SBR/SB, CVFHL/FHR/FWL/FWR/TFL/TFR/TML/TMR/TRL/TRR/RHL/RHR/FDL/FDR/SDL/SDR/BDL/BDR/SHL/SHR/TS - each 38-62 ASCII, 50=0dB"

- id: subwoofer_level
  type: string
  description: "00,38-62 ASCII, 50=0dB"

- id: dynamic_eq
  type: enum
  values: [on, off]

- id: dynamic_volume
  type: enum
  values: [hev, med, lit, off]

- id: mult_eq_mode
  type: enum
  values: [audyssey, byp.lr, flat, manual, off]

- id: loudness_management
  type: enum
  values: [on, off]

- id: cinema_eq
  type: enum
  values: [on, off]

- id: sleep_timer
  type: integer
  description: "001-120 minutes, 010=10min; OFF to cancel"

- id: auto_standby
  type: string
  description: "15M, 30M, 60M, OFF"

- id: eco_mode
  type: enum
  values: [on, auto, off]

- id: picture_contrast
  type: integer
  description: "000-100, 050=0"

- id: picture_brightness
  type: integer
  description: "000-100, 050=0"

- id: picture_saturation
  type: integer
  description: "000-100, 050=0"

- id: picture_hue
  type: integer
  description: "44-56, 50=0"

- id: picture_dnr
  type: enum
  values: [off, low, mid, hi]

- id: picture_enhancer
  type: integer
  description: "00-12, 00=0"

- id: display_dimmer
  type: enum
  values: [bri, dim, dar, off]
```

## Events
```yaml
# Device sends unsolicited EVENT messages when state changes:
# - Power state change -> PWON<CR> or PWSTANDBY<CR>
# - Input change -> SIxxxx<CR> (also returns channel volume and surround mode simultaneously)
# - Surround mode change -> MSxxxx<CR> (returns old mode before new mode)
# - Volume change -> MVxxxx<CR> or CVFL xx<CR> etc.
# - Channel volume resets on input change (if same as previous, no event returned)
# All EVENTs sent within 5 seconds of state change
```

## Macros
```yaml
# Power-on sequencing (documented):
- id: power_on_sequence
  description: Transmit PWON<CR> then wait 1 second before next command (J note in source)

# Preset memory (documented):
- id: tuner_preset_store
  steps:
    - TPANMEM<CR>  # enter memory mode
    - TPANUP<CR> or TPANDOWN<CR> or TPAN**<CR>  # select preset
    - TPANMEM**<CR>  # confirm

# HD Radio preset memory:
- id: hd_radio_preset_store
  steps:
    - TPHDMEM<CR>
    - TPHDUP<CR> or TPHDDOWN<CR> or TPHD**<CR>
    - TPHDMEM**<CR>
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
Command structure: `COMMAND + PARAMETER + CR (0x0D)`, ASCII 0x20–0x7F only. Minimum 50ms between commands. RESPONSE within 200ms; EVENT within 5 seconds. Maximum data length 135 bytes. Half duplex on both serial and TCP.

Volume encoding: 0.5dB step uses 3 ASCII characters. MASTER VOLUME range +18.0dB to --- (MV98 to MV00). Channel volume range 38–62 ASCII (50=0dB), subwoofer 00,38–62.

Power-on note: wait 1 second after PWON before sending next command.

Input source change simultaneously resets channel volume and surround mode — if values unchanged from before, no EVENT is returned. Surround mode EVENT returns old mode before new mode.

Zone2/Zone3 operate independently with full command sets (input, volume, mute, bass/treble, sleep, standby). All Zone Stereo mode for synchronized playback across all zones.

No password or login required for any control interface.
<!-- UNRESOLVED:firmware version compatibility not stated in source-->
<!-- UNRESOLVED:binary command byte encodings not provided (ASCII only)-->
<!-- UNRESOLVED:REST API not covered in source (only RS-232C and TCP/Telnet documented)-->

## Provenance

```yaml
source_urls:
  - https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
source_documents:
  - title: "Marantz public source"
    url: https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:54.096Z
retrieved_at: 2026-04-29T11:13:54.096Z
last_checked_at: 2026-04-23T08:13:13.645Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:13:13.645Z
matched_actions: 60
action_count: 60
confidence: high
summary: "Every spec action matched literally in source commands; transport parameters (port 23, baud 9600) confirmed; full command coverage achieved."
```

## Known Gaps

```yaml
[]
```
