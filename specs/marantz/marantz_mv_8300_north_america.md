---
schema_version: ai4av-public-spec-v1
device_id: marantz/mv-8300
entity_id: marantz_mv_8300_north_america
spec_id: admin/marantz-mv-8300-north-america
revision: 1
author: admin
title: "Marantz MV-8300 Control Spec"
status: published
manufacturer: Marantz
manufacturer_key: marantz
model_family: MV-8300
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - MV-8300
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
    checked_at: 2026-04-29T11:13:37.141Z
retrieved_at: 2026-04-29T11:13:37.141Z
last_checked_at: 2026-04-23T08:09:31.160Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:09:31.160Z
  matched_actions: 86
  action_count: 86
  confidence: high
  summary: "Every spec action matched with literal source evidence; all transport parameters verified; command catalogue fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Marantz MV-8300 Control Spec

## Summary
Marantz MV-8300 is a multi-channel AV receiver supporting RS-232C and Ethernet (TCP/IP) control. Protocol is ASCII-based command/response with half-duplex communication. Supports power, volume, input routing, surround mode, zone control, tuner, and USB/iPod playback. Command interval: ≥50ms for commands, ≥200ms for response, ≥5s for event delivery.

<!-- UNRESOLVED: HD Radio status fields (artist/title/album/genre) return format not confirmed in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # stated: TCP port 23 (telnet)
serial:
  baud_rate: 9600  # stated: 9600bps
  data_bits: 8  # stated
  parity: none  # stated
  stop_bits: 1  # stated
  flow_control: none  # UNRESOLVED: flow control not mentioned in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # PWON/PWSTANDBY commands present
- levelable  # MV, CV commands for volume/gain control
- routable  # SI, SD, DC input routing commands present
- queryable  # ? suffix commands present (PW?, MV?, SI?, etc.)
```

## Actions
```yaml
- id: pw_on
  label: Power On
  kind: action
  params: []
- id: pw_standby
  label: Power Standby
  kind: action
  params: []
- id: mv_up
  label: Master Volume Up
  kind: action
  params: []
- id: mv_down
  label: Master Volume Down
  kind: action
  params: []
- id: mv_set
  label: Master Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00-98 (80=0dB, 00=---MIN); 3-char for 0.5dB steps"
- id: mu_on
  label: Mute On
  kind: action
  params: []
- id: mu_off
  label: Mute Off
  kind: action
  params: []
- id: si_select
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: enum
      values:
        - PHONO
        - CD
        - TUNER
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - HDRADIO
        - NET
        - PANDORA
        - SIRIUSXM
        - SPOTIFY
        - LASTFM
        - FLICKR
        - IRADIO
        - SERVER
        - FAVORITES
        - AUX1
        - AUX2
        - AUX3
        - AUX4
        - AUX5
        - AUX6
        - AUX7
        - BT
        - USB/IPOD
        - USB
        - IPD
        - IRP
        - FVP
- id: zm_on
  label: Main Zone On
  kind: action
  params: []
- id: zm_off
  label: Main Zone Off
  kind: action
  params: []
- id: zm_favorite
  label: Main Zone Favorite Select
  kind: action
  params:
    - name: slot
      type: enum
      values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]
- id: ms_surround
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - MOVIE
        - MUSIC
        - GAME
        - DIRECT
        - PURE DIRECT
        - STEREO
        - AUTO
        - DOLBY DIGITAL
        - DTS SURROUND
        - AURO3D
        - AURO2DSURR
        - MCH STEREO
        - WIDE SCREEN
        - SUPER STADIUM
        - ROCK ARENA
        - JAZZ CLUB
        - CLASSIC CONCERT
        - MONO MOVIE
        - MATRIX
        - VIDEO GAME
        - VIRTUAL
        - LEFT
        - RIGHT
        - QUICK1
        - QUICK2
        - QUICK3
        - QUICK4
        - QUICK5
- id: sd_digital_input
  label: Set Digital Input
  kind: action
  params:
    - name: input
      type: enum
      values: [AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO]
- id: dc_digital_input_mode
  label: Set Digital Input Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUTO, PCM, DTS]
- id: sv_video_select
  label: Set Video Select
  kind: action
  params:
    - name: source
      type: enum
      values:
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - AUX1-AUX7
        - CD
        - SOURCE
        - ON
        - OFF
- id: slp_sleep_timer
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 (010=10min)"
- id: stby_auto_standby
  label: Set Auto Standby
  kind: action
  params:
    - name: duration
      type: enum
      values: [15M, 30M, 60M, OFF]
- id: eco_mode
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [ON, AUTO, OFF]
- id: ps_tone_ctrl
  label: Tone Control On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
- id: ps_bass
  label: Bass Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [UP, DOWN]
- id: ps_treble
  label: Treble Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [UP, DOWN]
- id: ps_mult_eq
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF]
- id: ps_dyn_eq
  label: Dynamic EQ
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
- id: ps_ref_level
  label: Reference Level Offset
  kind: action
  params:
    - name: level
      type: integer
      description: "0/5/10/15 dB offset"
- id: ps_dyn_vol
  label: Dynamic Volume
  kind: action
  params:
    - name: level
      type: enum
      values: [HEV, MED, LIT, OFF]
- id: vs_aspect
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values: [ASPNRM, ASPFUL]
- id: vs_resolution
  label: Video Resolution
  kind: action
  params:
    - name: res
      type: enum
      values: [SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO]
- id: vs_hdmi_monitor
  label: HDMI Monitor Select
  kind: action
  params:
    - name: monitor
      type: enum
      values: [MONIAUTO, MONI1, MONI2]
- id: vs_hdmi_audio
  label: HDMI Audio Output
  kind: action
  params:
    - name: dest
      type: enum
      values: [AMP, TV]
- id: vs_video_proc_mode
  label: Video Processing Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUTO, GAME, MOVI]
- id: pv_picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [OFF, STD, MOV, VVD, STM, CTM, DAY, NGT]
- id: pv_contrast
  label: Contrast Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [UP, DOWN]
- id: pv_brightness
  label: Brightness Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [UP, DOWN]
- id: pv_saturation
  label: Saturation Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [UP, DOWN]
- id: pv_hue
  label: Hue Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [UP, DOWN]
- id: pv_dnr
  label: DNR Adjust
  kind: action
  params:
    - name: level
      type: enum
      values: [OFF, LOW, MID, HI]
- id: pv_enhancer
  label: Enhancer Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [UP, DOWN]
- id: tf_tuner_freq
  label: Tuner Frequency Tune
  kind: action
  params:
    - name: band
      type: enum
      values: [AM, FM]
    - name: freq
      type: string
      description: "6-digit frequency: AN****** (AM=****.**kHz, FM=****.**MHz)"
- id: tp_tuner_preset
  label: Tuner Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "AN** (01-56)"
- id: tp_tuner_mem
  label: Tuner Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "ANMEM** (01-56)"
- id: tm_tuner_band_mode
  label: Tuner Band/Mode
  kind: action
  params:
    - name: band
      type: enum
      values: [ANAM, ANFM]
    - name: tune_mode
      type: enum
      values: [ANAUTO, ANMANUAL]
- id: ns_net_usb
  label: USB/iPod/Online Control
  kind: action
  params:
    - name: command
      type: enum
      values:
        - "90"  # Cursor Up
        - "91"  # Cursor Down
        - "92"  # Cursor Left
        - "93"  # Cursor Right/Enter/Play/Pause/Stop/Skip+
        - "94"
        - "9A"
        - "9B"
        - "9C"
        - "9D"
        - "9E"  # Skip Minus
        - "9F"  # Manual Search +/-
        - "9G"
        - "9H"  # Repeat One
        - "9I"  # Repeat All
        - "9J"  # Repeat Off
        - "9K"  # Random On/Shuffle Songs
        - "9M"  # Random Off/Shuffle Off
        - "9W"  # Toggle iPod Mode
        - "9X"  # Page Next
        - "9Y"  # Page Previous
        - "9Z"  # Manual Search Stop
        - RPT
        - RND
        - B**  # Preset Call
        - C**  # Preset Memory
        - H    # Preset Name
        - FV MEM
        - NSA  # Onscreen Display Info
        - NSE
- id: z2_on
  label: Zone 2 On
  kind: action
  params: []
- id: z2_off
  label: Zone 2 Off
  kind: action
  params: []
- id: z2_source
  label: Zone 2 Source Select
  kind: action
  params:
    - name: source
      type: enum
      values:
        - SOURCE
        - PHONO
        - CD
        - TUNER
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - HDRADIO
        - NET
        - PANDORA
        - SIRIUSXM
        - SPOTIFY
        - LASTFM
        - FLICKR
        - IRADIO
        - SERVER
        - FAVORITES
        - AUX1-AUX7
        - BT
        - USB/IPOD
        - USB
        - IPD
        - IRP
        - FVP
- id: z2_volume
  label: Zone 2 Volume
  kind: action
  params:
    - name: direction
      type: enum
      values: [UP, DOWN]
- id: z2mu_on
  label: Zone 2 Mute On
  kind: action
  params: []
- id: z2mu_off
  label: Zone 2 Mute Off
  kind: action
  params: []
- id: z3_on
  label: Zone 3 On
  kind: action
  params: []
- id: z3_off
  label: Zone 3 Off
  kind: action
  params: []
- id: z3_source
  label: Zone 3 Source Select
  kind: action
  params:
    - name: source
      type: enum
      values:
        - SOURCE
        - PHONO
        - CD
        - TUNER
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - HDRADIO
        - NET
        - PANDORA
        - SIRIUSXM
        - SPOTIFY
        - LASTFM
        - FLICKR
        - IRADIO
        - SERVER
        - FAVORITES
        - AUX1-AUX7
        - BT
        - USB/IPOD
        - USB
        - IPD
        - IRP
        - FVP
- id: z3_volume
  label: Zone 3 Volume
  kind: action
  params:
    - name: direction
      type: enum
      values: [UP, DOWN]
- id: z3mu_on
  label: Zone 3 Mute On
  kind: action
  params: []
- id: z3mu_off
  label: Zone 3 Mute Off
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: pw_status
  type: enum
  values: [PWON, PWSTANDBY]
- id: mv_status
  type: integer
  description: "00-98 (80=0dB); 3-char for 0.5dB steps"
- id: mu_status
  type: enum
  values: [MUON, MUOFF]
- id: si_status
  type: enum
  values:
    - PHONO
    - CD
    - TUNER
    - DVD
    - BD
    - TV
    - SAT/CBL
    - MPLAY
    - GAME
    - HDRADIO
    - NET
    - PANDORA
    - SIRIUSXM
    - SPOTIFY
    - LASTFM
    - FLICKR
    - IRADIO
    - SERVER
    - FAVORITES
    - AUX1
    - AUX2
    - AUX3
    - AUX4
    - AUX5
    - AUX6
    - AUX7
    - BT
    - USB/IPOD
    - USB
    - IPD
    - IRP
    - FVP
- id: zm_status
  type: enum
  values: [ZMON, ZMOFF]
- id: ms_status
  type: string
  description: "Returns current surround mode name"
- id: sd_status
  type: enum
  values: [SDAUTO, SDHDMI, SDDIGITAL, SDANALOG, SDEXT.IN, SD7.1IN, SDNO, SDARC]
- id: dc_status
  type: enum
  values: [DCAUTO, DCPCM, DCDTS]
- id: sv_status
  type: string
  description: "Returns video select source and ON/OFF state"
- id: slp_status
  type: integer
  description: "001-120 minutes, OFF"
- id: stby_status
  type: enum
  values: [STBY15M, STBY30M, STBY60M, STBYOFF]
- id: eco_status
  type: enum
  values: [ECONON, ECOAUTO, ECOOFF]
- id: psbass_status
  type: integer
  description: "00-99 (50=0dB); range -6 to +6dB"
- id: pstre_status
  type: integer
  description: "00-99 (50=0dB); range -6 to +6dB"
- id: pstone_status
  type: enum
  values: [PSTONE CTRL ON, PSTONE CTRL OFF]
- id: psmulteq_status
  type: enum
  values: [PSMULTEQ:AUDYSSEY, PSMULTEQ:BYP.LR, PSMULTEQ:FLAT, PSMULTEQ:MANUAL, PSMULTEQ:OFF]
- id: psdyneq_status
  type: enum
  values: [PSDYNEQ ON, PSDYNEQ OFF]
- id: psreflev_status
  type: integer
  description: "0/5/10/15 dB offset"
- id: psdrc_status
  type: enum
  values: [PSDRC AUTO, PSDRC LOW, PSDRC MID, PSDRC HI, PSDRC OFF]
- id: psdynvol_status
  type: enum
  values: [PSDYNVOL HEV, PSDYNVOL MED, PSDYNVOL LIT, PSDYNVOL OFF]
- id: cv_status
  type: string
  description: "Returns channel volume per enabled channel; format CVFL 50, CVFR 50, etc."
- id: tf_status
  type: string
  description: "TFAN****** (AM kHz / FM MHz)"
- id: tp_status
  type: integer
  description: "Tuner preset 01-56"
- id: tm_status
  type: enum
  values: [TMANAM, TMANFM, TMANAUTO, TMANMANUAL]
- id: tfhd_status
  type: string
  description: "HD tuner frequency with multi-cast channel"
- id: tp_hd_status
  type: string
  description: "HD preset status"
- id: tm_hd_status
  type: string
  description: "HD radio band/mode"
- id: hd_status
  type: string
  description: "HD radio full status (band, station name, multi-cast info, signal level, metadata)"
- id: nsa_status
  type: string
  description: "Onscreen display info list (up to 96 bytes ASCII)"
- id: z2_status
  type: enum
  values: [Z2ON, Z2OFF]
- id: z2mu_status
  type: enum
  values: [Z2MUON, Z2MUOFF]
- id: z2cv_status
  type: string
  description: "Zone 2 channel volume status"
- id: z3_status
  type: enum
  values: [Z3ON, Z3OFF]
- id: z3mu_status
  type: enum
  values: [Z3MUON, Z3MUOFF]
- id: z3cv_status
  type: string
  description: "Zone 3 channel volume status"
```

## Variables
```yaml
# UNRESOLVED: channel volume (CV) commands are settable but fit better as action params.
# Master volume and channel levels are controlled via MV/CV commands with direct dB values.
```

## Events
```yaml
# The device sends EVENT messages when state changes (no request needed).
# Event format mirrors command format (COMMAND + PARAMETER + CR).
# Event timing: within 5 seconds of state change.
# Events fire for: power, input source change, surround mode change, channel volume change.
# Channel volume returns for all used channels simultaneously on input source change.
# If surround mode or channel volume unchanged before/after input switch, no EVENT returned.
```

## Macros
```yaml
# Power-on sequence: PWON command → wait 1 second → send next command (documented note)
# Input source change: SI command → automatic CV event for all channels
# Surround mode change: MS command → returns present mode first, then new mode as EVENT
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- Command structure: `COMMAND + PARAMETER + CR (0x0D)`, ASCII 0x20-0x7F only
- Commands require ≥50ms interval between sends
- Responses delivered within 200ms of request
- Events delivered within 5 seconds of state change
- Half-duplex communication on both serial and TCP
- Maximum data length: 135 bytes per message
- Volume uses 0.5dB steps; 3 ASCII characters when using 0.5dB precision
- Master volume range: 00 (min/---) to 98 (+18dB); 80 = 0dB reference
- Channel volume range: 38 (-12dB) to 62 (+12dB); 50 = 0dB
- Subwoofer can use 00 (off) in addition to 38-62 range
- No login/auth procedure described in source → auth.type: none
<!-- UNRESOLVED: firmware compatibility ranges not stated -->
<!-- UNRESOLVED: HD Radio metadata return format not fully verified -->
<!-- UNRESOLVED: Bluetooth control specifics minimal in source -->
<!-- UNRESOLVED: flow_control for serial not specified in source -->

## Provenance

```yaml
source_urls:
  - https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
source_documents:
  - title: "Marantz public source"
    url: https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:37.141Z
retrieved_at: 2026-04-29T11:13:37.141Z
last_checked_at: 2026-04-23T08:09:31.160Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:09:31.160Z
matched_actions: 86
action_count: 86
confidence: high
summary: "Every spec action matched with literal source evidence; all transport parameters verified; command catalogue fully represented."
```

## Known Gaps

```yaml
[]
```
