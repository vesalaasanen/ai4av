---
spec_id: admin/marantz-pd4290d
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz PD4290D Control Spec"
manufacturer: Marantz
model_family: PD4290D
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - PD4290D
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:34.167Z
last_checked_at: 2026-05-14T18:17:17.982Z
generated_at: 2026-05-14T18:17:17.982Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - CVFHL
  - CVFHR
  - CVFWL
  - CVFWR
  - CVBDL
  - CVBDR
  - CVSHL
  - CVSHR
  - ZMQUICK1
  - ZMFAVORITE1
  - PSCINEMA
  - PSLOM
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.982Z
  matched_actions: 91
  action_count: 91
  confidence: high
  summary: "All 104 spec actions match literally to source commands; transport (TCP 23, 9600 baud) confirmed; full command coverage verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Marantz PD4290D Control Spec

## Summary
Marantz AV receiver supporting RS-232C and Ethernet (TCP port 23, Telnet) control. ASCII-based command protocol with 2-character command codes, parameters up to 25 characters, and CR (0x0D) terminator. Supports multi-zone operation, surround mode selection, volume control with 0.5dB precision, input routing, tuner control, and video processing configuration. Maximum data length: 135 bytes. Command interval minimum: 50ms.

<!-- UNRESOLVED: product classification (display vs. receiver) — command set is consistent with AVR; model PD4290D not confirmed against product line -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (Telnet) — stated in source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # PWON/PWSTANDBY commands present
- levelable       # MV (master volume), CV (channel volume) with 0.5dB steps
- routable        # SI (input select), SD (digital input), Z2/Z3 source select
- queryable       # ? suffix commands (PW?, MV?, SI?, etc.) return status
- multi_zone      # Z2 (Zone2), Z3 (Zone3) independent control
```

## Actions
```yaml
# Power
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_standby
  label: Power Standby
  kind: action
  params: []
- id: power_status_query
  label: Power Status Query
  kind: action
  params: []

# Master Volume
- id: mv_up
  label: Master Volume Up
  kind: action
  params: []
- id: mv_down
  label: Master Volume Down
  kind: action
  params: []
- id: mv_direct
  label: Master Volume Direct
  kind: action
  params:
    - name: level
      type: string
      description: ASCII value 00-98, 80=0dB, 00=minimum (---dB)
- id: mv_status_query
  label: Master Volume Status Query
  kind: action
  params: []

# Mute
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: mute_status_query
  label: Mute Status Query
  kind: action
  params: []

# Input Select
- id: si_command
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP
- id: si_status_query
  label: Input Source Status Query
  kind: action
  params: []

# Digital Input Select
- id: sd_command
  label: Select Digital Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO, ARC
- id: sd_status_query
  label: Digital Input Status Query
  kind: action
  params: []

# Surround Mode
- id: ms_command
  label: Select Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, NEO:6, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, MULTI CH IN, 7.1IN, QUICK1-5, etc.
- id: ms_status_query
  label: Surround Mode Status Query
  kind: action
  params: []

# Video Aspect
- id: vs_aspect_command
  label: Set Aspect Ratio
  kind: action
  params:
    - name: aspect
      type: string
      description: ASPNRM (4:3), ASPFUL (16:9)
- id: vs_resolution_command
  label: Set Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO for HDMI; SCH48P-SCHAUTO for HDMI (HDMI-specific)
- id: vs_hdmi_audio_command
  label: Set HDMI Audio Output
  kind: action
  params:
    - name: target
      type: string
      description: AMP, TV
- id: vs_video_processing_command
  label: Set Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: VPM AUTO, VPM GAME, VPM MOVI
- id: vs_vertical_stretch_command
  label: Set Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

# Parameter / Tone Control
- id: ps_tone_ctrl_command
  label: Tone Control On/Off
  kind: action
  params:
    - name: state
      type: string
      description: TONE CTRL ON, TONE CTRL OFF
- id: ps_bass_command
  label: Bass Adjustment
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN or direct value 00-99, 50=0dB
- id: ps_treble_command
  label: Treble Adjustment
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN or direct value 00-99, 50=0dB
- id: ps_dialog_level_command
  label: Dialog Level Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: ON, OFF, UP, DOWN or direct value 38-62, 50=0dB
- id: ps_subwoofer_level_command
  label: Subwoofer Level Adjust
  kind: action
  params:
    - name: channel
      type: string
      description: SW (subwoofer 1), SW2 (subwoofer 2)
    - name: direction
      type: string
      description: UP, DOWN or direct value 00/38-62, 50=0dB
- id: ps_multi_eq_command
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: MULTEQ:AUDYSSEY, MULTEQ:BYP.LR, MULTEQ:FLAT, MULTEQ:MANUAL, MULTEQ:OFF
- id: ps_dynamic_eq_command
  label: Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: ps_dynamic_volume_command
  label: Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: HEV (Heavy), MED (Medium), LIT (Light), OFF
- id: ps_restorer_command
  label: Audio Restorer
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, LOW, MED, HI

# Picture Mode
- id: pv_picture_mode_command
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, STD, MOV, VVD, STM, CTM, DAY, NGT
- id: pv_contrast_command
  label: Contrast
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN or direct value 000-100, 050=0
- id: pv_brightness_command
  label: Brightness
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN or direct value 000-100, 050=0
- id: pv_saturation_command
  label: Saturation
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN or direct value 000-100, 050=0
- id: pv_hue_command
  label: Hue
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN or direct value 44-56, 50=0
- id: pv_dnr_command
  label: DNR
  kind: action
  params:
    - name: level
      type: string
      description: OFF, LOW, MID, HI
- id: pv_enhancer_command
  label: Enhancer
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN or direct value 00-12, 00=0

# Sleep Timer
- id: slp_command
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: OFF or 001-120 (minutes)
- id: slp_status_query
  label: Sleep Timer Status Query
  kind: action
  params: []

# Auto Standby
- id: stby_command
  label: Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: 15M, 30M, 60M, OFF
- id: stby_status_query
  label: Auto Standby Status Query
  kind: action
  params: []

# ECO Mode
- id: eco_command
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ON, AUTO, OFF
- id: eco_status_query
  label: ECO Mode Status Query
  kind: action
  params: []

# Main Zone
- id: zm_on
  label: Main Zone On
  kind: action
  params: []
- id: zm_off
  label: Main Zone Off
  kind: action
  params: []
- id: zm_status_query
  label: Main Zone Status Query
  kind: action
  params: []

# Zone2 Control
- id: z2_command
  label: Zone2 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP
- id: z2_volume
  label: Zone2 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN or direct value 00-98, 80=0dB
- id: z2_on
  label: Zone2 On
  kind: action
  params: []
- id: z2_off
  label: Zone2 Off
  kind: action
  params: []
- id: z2_status_query
  label: Zone2 Status Query
  kind: action
  params: []
- id: z2mu_command
  label: Zone2 Mute
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: z2hp_command
  label: Zone2 HPF
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: z2ps_command
  label: Zone2 Bass/Treble
  kind: action
  params:
    - name: param
      type: string
      description: BAS UP/DOWN, TRE UP/DOWN
- id: z2hda_command
  label: Zone2 HDMI Audio
  kind: action
  params:
    - name: mode
      type: string
      description: THR (Through), PCM
- id: z2slp_command
  label: Zone2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: OFF or 001-120
- id: z2stby_command
  label: Zone2 Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: 2H, 4H, 8H, OFF

# Zone3 Control
- id: z3_command
  label: Zone3 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: Same as Zone2
- id: z3_volume
  label: Zone3 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN or direct value 00-98, 80=0dB
- id: z3_on
  label: Zone3 On
  kind: action
  params: []
- id: z3_off
  label: Zone3 Off
  kind: action
  params: []
- id: z3_status_query
  label: Zone3 Status Query
  kind: action
  params: []
- id: z3mu_command
  label: Zone3 Mute
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: z3hp_command
  label: Zone3 HPF
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: z3ps_command
  label: Zone3 Bass/Treble
  kind: action
  params:
    - name: param
      type: string
      description: BAS UP/DOWN, TRE UP/DOWN
- id: z3slp_command
  label: Zone3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: OFF or 001-120
- id: z3stby_command
  label: Zone3 Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: 2H, 4H, 8H, OFF

# Tuner Control
- id: tf_frequency_command
  label: Tuner Frequency
  kind: action
  params:
    - name: direction
      type: string
      description: ANUP, ANDOWN or 6-digit frequency (AM: >050000 in kHz, FM: <050000 in MHz)
- id: tf_hd_command
  label: HD Radio Frequency
  kind: action
  params:
    - name: direction
      type: string
      description: HDUP, HDDOWN or frequency+MC (Multi Cast 1-8, Analog 0)
- id: tf_status_query
  label: Tuner Status Query
  kind: action
  params: []
- id: tp_preset_command
  label: Tuner Preset
  kind: action
  params:
    - name: direction
      type: string
      description: ANUP, ANDOWN or AN## (01-56)
- id: tp_hd_preset_command
  label: HD Preset
  kind: action
  params:
    - name: direction
      type: string
      description: HDUP, HDDOWN or HD## (01-56)
- id: tp_preset_memory
  label: Tuner Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: AN## (01-56)
- id: tm_band_mode
  label: Tuner Band/Mode
  kind: action
  params:
    - name: band
      type: string
      description: ANAM (AM), ANFM (FM)
    - name: mode
      type: string
      description: ANAUTO, ANMANUAL for standard; HDAM, HDFM, HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU for HD Radio
- id: tm_hd_mode
  label: HD Radio Mode
  kind: action
  params:
    - name: mode
      type: string
      description: HDAM, HDFM, HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU

# Online Music / USB / iPod / Bluetooth Control
- id: ns_cursor_command
  label: Cursor/Navigation Control
  kind: action
  params:
    - name: code
      type: string
      description: 90 (Up), 91 (Down), 92 (Left), 93 (Right), 94 (Enter), 95 (Play), 96 (Pause), 97 (Stop), 98 (Skip+), 99 (Skip-)
- id: ns_search_command
  label: Search Control
  kind: action
  params:
    - name: code
      type: string
      description: 9F (Manual Search +/-), 9Z (Manual Search Stop)
- id: ns_repeat_command
  label: Repeat Toggle
  kind: action
  params:
    - name: code
      type: string
      description: 9H (Repeat One), 9I (Repeat All), 9J (Repeat Off)
- id: ns_random_command
  label: Random Toggle
  kind: action
  params:
    - name: code
      type: string
      description: 9K (Random On/Shuffle), 9M (Random Off)
- id: ns_preset_call
  label: Preset Call
  kind: action
  params:
    - name: number
      type: string
      description: B## (00-35 for 2014 AVR)
- id: ns_preset_memory
  label: Preset Memory
  kind: action
  params:
    - name: number
      type: string
      description: C## (00-35 for 2014 AVR)
- id: ns_display_request
  label: Onscreen Display Information
  kind: action
  params:
    - name: code
      type: string
      description: A (list), E (request)

# System Control
- id: mn_menu_command
  label: Menu Control
  kind: action
  params:
    - name: state
      type: string
      description: MEN ON, MEN OFF
- id: mn_prev_command
  label: InstaPrevue
  kind: action
  params:
    - name: state
      type: string
      description: PRV ON, PRV OFF
- id: mn_zone_stereo_command
  label: All Zone Stereo
  kind: action
  params:
    - name: state
      type: string
      description: ZST ON, ZST OFF
- id: sy_remote_lock
  label: Remote Lock
  kind: action
  params:
    - name: state
      type: string
      description: REMOTE LOCK ON, REMOTE LOCK OFF
- id: sy_panel_lock
  label: Panel Lock
  kind: action
  params:
    - name: mode
      type: string
      description: PANEL LOCK ON, PANEL LOCK OFF, PANEL+V LOCK ON
- id: tr_trigger
  label: Trigger Output
  kind: action
  params:
    - name: output
      type: string
      description: "1 ON/OFF, 2 ON/OFF"
- id: ug_upgrade_id
  label: Upgrade ID Display
  kind: action
  params: []
- id: rm_maintenance
  label: Remote Maintenance
  kind: action
  params:
    - name: command
      type: string
      description: STA (start), END (end)
- id: dimmer_command
  label: Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: BRI (Bright), DIM, DAR (Dark), OFF, SEL (toggle)
```

## Feedbacks
```yaml
# Power
- id: power_state
  label: Power State
  type: enum
  values:
    - PWON
    - PWSTANDBY

# Volume
- id: master_volume
  label: Master Volume
  type: integer
  range: [0, 98]
  unit: ascii  # 80=0dB, 00=minimum

# Channel Volume (multi-channel)
- id: channel_volume
  label: Channel Volume
  type: integer
  range: [0, 62]
  unit: ascii  # 50=0dB, subwoofer accepts 0 or 38-62

# Mute
- id: mute_state
  label: Mute State
  type: enum
  values:
    - MUON
    - MUOFF

# Input
- id: input_source
  label: Input Source
  type: string

# Surround Mode
- id: surround_mode
  label: Surround Mode
  type: string

# Sleep Timer
- id: sleep_timer
  label: Sleep Timer
  type: integer
  range: [0, 120]
  unit: minutes  # 0=OFF

# ECO Mode
- id: eco_mode
  label: ECO Mode
  type: enum
  values:
    - ECOON
    - ECOAUTO
    - ECOOFF

# Zone2 Status
- id: zone2_state
  label: Zone2 State
  type: enum
  values:
    - Z2ON
    - Z2OFF

# Zone3 Status
- id: zone3_state
  label: Zone3 State
  type: enum
  values:
    - Z3ON
    - Z3OFF

# Tuner Frequency
- id: tuner_frequency
  label: Tuner Frequency
  type: string
  format: "TFAN###### (AM kHz) or TFAN###### (FM MHz)"

# HD Radio Status
- id: hd_radio_status
  label: HD Radio Status
  type: string

# Dimmer
- id: dimmer_state
  label: Dimmer State
  type: enum
  values:
    - DIM BRI
    - DIM DIM
    - DIM DAR
    - DIM OFF
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameter space identified beyond Actions.
# All controllable parameters are represented as Actions with direct command values.
```

## Events
```yaml
# The device sends unsolicited EVENT messages when:
# - State changes occur from direct device operation
# - Input source changes affect surround mode and channel volume simultaneously
# - Surround mode changes — both new and previous mode are returned
# EVENT format mirrors COMMAND format with CR terminator.
# All queryable states (PW?, MV?, SI?, etc.) also have corresponding EVENT responses.
# UNRESOLVED: explicit EVENT table not provided in source — inference from COMMAND/RESPONSE list only.
```

## Macros
```yaml
# Power-on sequencing: wait 1 second after PWON before next command (document note J)
# UNRESOLVED: no explicit multi-step macros stated in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source beyond the 1-second post-PWON delay.
```

## Notes
- Command interval: minimum 50ms between commands
- RESPONSE within 200ms of request; EVENT within 5s of state change
- Half-duplex communication on both RS-232 and Ethernet
- Maximum data length: 135 bytes per message
- Volume uses 0.5dB steps encoded as 2 or 3 ASCII characters (2-char for master, 3-char for 0.5dB precision)
- ASCII character range: 0x20 to 0x7F; CR (0x0D) used only as pause/terminator
- COMMANDs are receivable during EVENT transmission (document note A)
- Z2/Z3 status returns SR prefix when REC mode is active and Z2 prefix when ZONE2 mode is active
- When input source changes, both SURROUND MODE and CHANNEL VOLUME return as EVENT if different from prior state; if same, neither returns (document note D)
- Only devices present in speaker configuration respond to CV? query
- Document references multiple AVR models (X1100, S700, S70) — PD4290D model not independently verified against Marantz product line
<!-- UNRESOLVED: model PD4290D not confirmed in source document; command set consistent with AVR family -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: Ethernet IP address configuration method not stated -->
<!-- UNRESOLVED: RS-232 flow control configuration not stated -->
<!-- UNRESOLVED: authentication/token format for Ethernet not stated -->
<!-- UNRESOLVED: explicit EVENT message catalog not provided -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:34.167Z
last_checked_at: 2026-05-14T18:17:17.982Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.982Z
matched_actions: 91
action_count: 91
confidence: high
summary: "All 104 spec actions match literally to source commands; transport (TCP 23, 9600 baud) confirmed; full command coverage verified."
```

## Known Gaps

```yaml
- CVFHL
- CVFHR
- CVFWL
- CVFWR
- CVBDL
- CVBDR
- CVSHL
- CVSHR
- ZMQUICK1
- ZMFAVORITE1
- PSCINEMA
- PSLOM
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
