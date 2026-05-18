---
spec_id: admin/integra-dtx-8-9-series-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DTX-8.9 Series Control Spec"
manufacturer: Integra
model_family: DTX-8.9
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - DTX-8.9
    - DTR-8.9
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:31.200Z
last_checked_at: 2026-05-16T22:13:00.065Z
generated_at: 2026-05-16T22:13:00.065Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T22:13:00.065Z
  matched_actions: 126
  action_count: 126
  confidence: high
  summary: "All 126 spec actions matched literally in source with correct shapes; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Integra DTX-8.9 Series Control Spec

## Summary

The Integra DTX-8.9 (and closely related DTR-8.9) is an AV receiver supporting the ISCP (Integra Serial Control Protocol) over both RS-232C serial and Ethernet (eISCP over TCP/IP). This spec covers the TCP/IP (eISCP) control interface. Commands consist of a three-character command code followed by variable-length parameter characters, wrapped in an eISCP packet. The device supports main-zone and multi-zone (Zone 2, Zone 3) control.

<!-- UNRESOLVED: compatibility table columns confirm DTX-8.9 support for most commands but some Zone 3 tone/balance commands are not supported on this model (TN3, BL3 all No). Full firmware version compatibility not stated in source. -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60128  # default; receiver can be set 49152–65535 via setup menu
auth:
  type: none  # inferred: no auth procedure in source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
```

## Traits

```yaml
- powerable    # inferred from PWR power command examples
- queryable    # inferred from QSTN query command examples
- routable     # inferred from SLI/SLZ/SL3 routing command examples
- levelable    # inferred from MVL/ZVL/VL3 volume and tone control commands
```

## Actions

```yaml
# === MAIN ZONE — Power / Muting ===
- id: power_on
  label: Power On
  kind: action
  description: "Command: PWR 01. Sets system on."
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  description: "Command: PWR 00. Sets system standby."
  params: []

- id: mute_on
  label: Mute On
  kind: action
  description: "Command: AMT 01. Sets audio muting on."
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  description: "Command: AMT 00. Sets audio muting off."
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  description: "Command: AMT TG. Wraps around mute state."
  params: []

# === MAIN ZONE — Volume ===
- id: volume_set
  label: Set Master Volume
  kind: action
  description: "Command: MVL {level}. Level is hex 00–64 (0–100) or 00–50 (0–80 depending on model)."
  params:
    - name: level
      type: string
      description: "Hex level value, e.g. '32' for 50. Range 00–64."

- id: volume_up
  label: Volume Up
  kind: action
  description: "Command: MVL UP. Increments master volume."
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  description: "Command: MVL DOWN. Decrements master volume."
  params: []

- id: volume_up_1db
  label: Volume Up 1dB
  kind: action
  description: "Command: MVL UP1. Raises master volume 1dB."
  params: []

- id: volume_down_1db
  label: Volume Down 1dB
  kind: action
  description: "Command: MVL DOWN1. Lowers master volume 1dB."
  params: []

# === MAIN ZONE — Input Selection ===
- id: select_input
  label: Select Input
  kind: action
  description: "Command: SLI {code}. Selects input source."
  params:
    - name: code
      type: string
      description: "Input code: 00=VIDEO1/VCR, 01=VIDEO2/CBL-SAT, 02=VIDEO3/GAME, 03=VIDEO4/AUX1, 04=VIDEO5/AUX2, 05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB-Front, 2A=USB-Rear, 40=Universal PORT, 30=MULTI CH, 31=XM, 32=SIRIUS"

- id: select_input_up
  label: Input Selector Up
  kind: action
  description: "Command: SLI UP. Wraps input selection up."
  params: []

- id: select_input_down
  label: Input Selector Down
  kind: action
  description: "Command: SLI DOWN. Wraps input selection down."
  params: []

# === MAIN ZONE — Audio Selector ===
- id: audio_selector_set
  label: Set Audio Selector
  kind: action
  description: "Command: SLA {code}. Sets audio input selector."
  params:
    - name: code
      type: string
      description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE"

- id: audio_selector_up
  label: Audio Selector Up
  kind: action
  description: "Command: SLA UP. Wraps audio selector."
  params: []

# === MAIN ZONE — RECOUT Selector ===
- id: recout_selector_set
  label: Set RECOUT Selector
  kind: action
  description: "Command: SLR {code}. Sets RECOUT selector."
  params:
    - name: code
      type: string
      description: "00=VIDEO1, 01=VIDEO2, 02=VIDEO3, 03=VIDEO4, 04=VIDEO5, 10=DVD, 20=TAPE1, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 30=MULTI CH, 7F=OFF, 80=SOURCE"

# === MAIN ZONE — Listening Mode ===
- id: listening_mode_set
  label: Set Listening Mode
  kind: action
  description: "Command: LMD {code}. Sets surround/listening mode."
  params:
    - name: code
      type: string
      description: "Hex code, e.g. 00=STEREO, 01=DIRECT, 02=SURROUND, 03=FILM, 04=THX, 80=PLII Movie, 81=PLII Music, 82=Neo:6 Cinema, etc."

- id: listening_mode_up
  label: Listening Mode Up
  kind: action
  description: "Command: LMD UP. Wraps listening mode up."
  params: []

- id: listening_mode_down
  label: Listening Mode Down
  kind: action
  description: "Command: LMD DOWN. Wraps listening mode down."
  params: []

- id: listening_mode_movie
  label: Listening Mode Movie
  kind: action
  description: "Command: LMD MOVIE."
  params: []

- id: listening_mode_music
  label: Listening Mode Music
  kind: action
  description: "Command: LMD MUSIC."
  params: []

- id: listening_mode_game
  label: Listening Mode Game
  kind: action
  description: "Command: LMD GAME."
  params: []

# === MAIN ZONE — Tone Controls ===
- id: tone_front_set
  label: Set Front Tone
  kind: action
  description: "Command: TFR {Bxx|Txx}. Sets front bass/treble (-10 to +10 in 2-step, hex -A to +A)."
  params:
    - name: value
      type: string
      description: "Bxx for bass, Txx for treble. xx range: -A to +A."

- id: tone_front_bass_up
  label: Front Bass Up
  kind: action
  description: "Command: TFR BUP."
  params: []

- id: tone_front_bass_down
  label: Front Bass Down
  kind: action
  description: "Command: TFR BDOWN."
  params: []

- id: tone_front_treble_up
  label: Front Treble Up
  kind: action
  description: "Command: TFR TUP."
  params: []

- id: tone_front_treble_down
  label: Front Treble Down
  kind: action
  description: "Command: TFR TDOWN."
  params: []

- id: tone_center_set
  label: Set Center Tone
  kind: action
  description: "Command: TCT {Bxx|Txx}."
  params:
    - name: value
      type: string
      description: "Bxx for bass, Txx for treble."

- id: tone_surround_set
  label: Set Surround Tone
  kind: action
  description: "Command: TSR {Bxx|Txx}."
  params:
    - name: value
      type: string
      description: "Bxx for bass, Txx for treble."

- id: tone_surroundback_set
  label: Set Surround Back Tone
  kind: action
  description: "Command: TSB {Bxx|Txx}."
  params:
    - name: value
      type: string
      description: "Bxx for bass, Txx for treble."

- id: tone_subwoofer_set
  label: Set Subwoofer Tone
  kind: action
  description: "Command: TSW {Bxx}. Bass only."
  params:
    - name: value
      type: string
      description: "Bxx for bass level."

- id: subwoofer_level_set
  label: Set Subwoofer Level (Temporary)
  kind: action
  description: "Command: SWL {level}. -F to +C (-15dB to +12dB)."
  params:
    - name: level
      type: string
      description: "Hex level. -F=−15dB, 00=0dB, +C=+12dB."

- id: center_level_set
  label: Set Center Level (Temporary)
  kind: action
  description: "Command: CTL {level}. -C to +C (-12dB to +12dB)."
  params:
    - name: level
      type: string
      description: "Hex level. -C=−12dB, 00=0dB, +C=+12dB."

# === MAIN ZONE — Speaker Commands ===
- id: speaker_a_set
  label: Set Speaker A
  kind: action
  description: "Command: SPA {00|01|UP}. 00=off, 01=on."
  params:
    - name: state
      type: string
      description: "00=off, 01=on, UP=wrap-around"

- id: speaker_b_set
  label: Set Speaker B
  kind: action
  description: "Command: SPB {00|01|UP}."
  params:
    - name: state
      type: string
      description: "00=off, 01=on, UP=wrap-around"

- id: speaker_layout_set
  label: Set Speaker Layout
  kind: action
  description: "Command: SPL {code}. SB=SurrBack, FH=Front High, FW=Front Wide."
  params:
    - name: code
      type: string
      description: "SB, FH, FW, UP"

# === MAIN ZONE — Speaker Level Calibration ===
- id: speaker_cal_test
  label: Speaker Calibration Test
  kind: action
  description: "Command: SLC TEST."
  params: []

- id: speaker_cal_ch_sel
  label: Speaker Calibration Channel Select
  kind: action
  description: "Command: SLC CHSEL."
  params: []

- id: speaker_cal_up
  label: Speaker Level Calibration Up
  kind: action
  description: "Command: SLC UP."
  params: []

- id: speaker_cal_down
  label: Speaker Level Calibration Down
  kind: action
  description: "Command: SLC DOWN."
  params: []

# === MAIN ZONE — Display / OSD ===
- id: display_mode_set
  label: Set Display Mode
  kind: action
  description: "Command: DIF {code}. 00=Selector+Volume, 01=Selector+Listening Mode, 02=Digital Format, 03=Video Format, TG=wrap."
  params:
    - name: code
      type: string
      description: "00, 01, 02, 03, TG"

- id: dimmer_set
  label: Set Dimmer Level
  kind: action
  description: "Command: DIM {code}. 00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright+LED OFF."
  params:
    - name: code
      type: string
      description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright+LED OFF, DIM=wrap"

- id: osd_menu
  label: OSD Menu
  kind: action
  description: "Command: OSD MENU."
  params: []

- id: osd_up
  label: OSD Up
  kind: action
  description: "Command: OSD UP."
  params: []

- id: osd_down
  label: OSD Down
  kind: action
  description: "Command: OSD DOWN."
  params: []

- id: osd_left
  label: OSD Left
  kind: action
  description: "Command: OSD LEFT."
  params: []

- id: osd_right
  label: OSD Right
  kind: action
  description: "Command: OSD RIGHT."
  params: []

- id: osd_enter
  label: OSD Enter
  kind: action
  description: "Command: OSD ENTER."
  params: []

- id: osd_exit
  label: OSD Exit
  kind: action
  description: "Command: OSD EXIT."
  params: []

- id: osd_audio
  label: OSD Audio Adjust
  kind: action
  description: "Command: OSD AUDIO."
  params: []

- id: osd_video
  label: OSD Video Adjust
  kind: action
  description: "Command: OSD VIDEO."
  params: []

# === MAIN ZONE — Memory ===
- id: memory_store
  label: Memory Store
  kind: action
  description: "Command: MEM STR."
  params: []

- id: memory_recall
  label: Memory Recall
  kind: action
  description: "Command: MEM RCL."
  params: []

- id: memory_lock
  label: Memory Lock
  kind: action
  description: "Command: MEM LOCK."
  params: []

- id: memory_unlock
  label: Memory Unlock
  kind: action
  description: "Command: MEM UNLK."
  params: []

# === MAIN ZONE — Sleep ===
- id: sleep_set
  label: Set Sleep Timer
  kind: action
  description: "Command: SLP {time|OFF}. Time is hex 01–5A (1–90 min), OFF=disable."
  params:
    - name: value
      type: string
      description: "Hex 01–5A for minutes, or OFF."

- id: sleep_up
  label: Sleep Timer Up
  kind: action
  description: "Command: SLP UP."
  params: []

# === MAIN ZONE — Late Night ===
- id: late_night_set
  label: Set Late Night Mode
  kind: action
  description: "Command: LTN {code}. 00=Off, 01=Low(DD)/On(TrueHD), 02=High(DD), 03=Auto(TrueHD)."
  params:
    - name: code
      type: string
      description: "00, 01, 02, 03, UP"

# === MAIN ZONE — Audyssey / DSP ===
- id: audyssey_set
  label: Set Audyssey 2EQ/MultEQ/MultEQ XT
  kind: action
  description: "Command: ADY {00|01|UP}. 00=off, 01=on."
  params:
    - name: state
      type: string
      description: "00=off, 01=on, UP=wrap"

- id: audyssey_dynamic_eq_set
  label: Set Audyssey Dynamic EQ
  kind: action
  description: "Command: ADQ {00|01|UP}."
  params:
    - name: state
      type: string
      description: "00=off, 01=on, UP=wrap"

- id: audyssey_dynamic_volume_set
  label: Set Audyssey Dynamic Volume
  kind: action
  description: "Command: ADV {code}. 00=Off, 01=Light, 02=Medium, 03=Heavy."
  params:
    - name: code
      type: string
      description: "00=Off, 01=Light, 02=Medium, 03=Heavy, UP=wrap"

- id: dolby_volume_set
  label: Set Dolby Volume
  kind: action
  description: "Command: DVL {code}. 00=Off, 01=Low, 02=Mid, 03=High."
  params:
    - name: code
      type: string
      description: "00=Off, 01=Low, 02=Mid, 03=High, UP=wrap"

- id: music_optimizer_set
  label: Set Music Optimizer
  kind: action
  description: "Command: MOT {00|01|UP}."
  params:
    - name: state
      type: string
      description: "00=off, 01=on, UP=wrap"

- id: re_eq_set
  label: Set Re-EQ/Academy Filter
  kind: action
  description: "Command: RAS {code}. 00=Both Off, 01=Re-EQ On/Cinema Filter On, 02=Academy On."
  params:
    - name: code
      type: string
      description: "00, 01, 02, UP"

# === MAIN ZONE — 12V Triggers ===
- id: trigger_a_set
  label: Set 12V Trigger A
  kind: action
  description: "Command: TGA {00|01}. Available when trigger parameter is OFF in setup menu."
  params:
    - name: state
      type: string
      description: "00=off, 01=on"

- id: trigger_b_set
  label: Set 12V Trigger B
  kind: action
  description: "Command: TGB {00|01}."
  params:
    - name: state
      type: string
      description: "00=off, 01=on"

- id: trigger_c_set
  label: Set 12V Trigger C
  kind: action
  description: "Command: TGC {00|01}."
  params:
    - name: state
      type: string
      description: "00=off, 01=on"

# === MAIN ZONE — HDMI / Video ===
- id: hdmi_output_set
  label: Set HDMI Output
  kind: action
  description: "Command: HDO {code}. 00=No/Analog, 01=HDMI Main, 02=HDMI Sub, 03=Both, 04=Both(Main), 05=Both(Sub)."
  params:
    - name: code
      type: string
      description: "00, 01, 02, 03, 04, 05, UP"

- id: resolution_set
  label: Set Monitor Out Resolution
  kind: action
  description: "Command: RES {code}. 00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p, 06=Source, 07=1080p/24fs."
  params:
    - name: code
      type: string
      description: "00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p, 06=Source, 07=1080p/24fs, UP=wrap"

- id: isf_mode_set
  label: Set ISF Mode
  kind: action
  description: "Command: ISF {code}. 00=Custom, 01=Day, 02=Night."
  params:
    - name: code
      type: string
      description: "00=Custom, 01=Day, 02=Night, UP=wrap"

# === MAIN ZONE — Tuner ===
- id: tuner_frequency_set
  label: Set Tuner Frequency
  kind: action
  description: "Command: TUN {nnnnn}. FM nnn.nn MHz / AM nnnnn kHz."
  params:
    - name: frequency
      type: string
      description: "5-digit code e.g. 08750 for FM 87.50 MHz"

- id: tuner_up
  label: Tuner Up
  kind: action
  description: "Command: TUN UP."
  params: []

- id: tuner_down
  label: Tuner Down
  kind: action
  description: "Command: TUN DOWN."
  params: []

- id: preset_set
  label: Set Tuner Preset
  kind: action
  description: "Command: PRS {preset}. Hex 01–28 (presets 1–40)."
  params:
    - name: preset
      type: string
      description: "Hex 01–28"

- id: preset_up
  label: Preset Up
  kind: action
  description: "Command: PRS UP."
  params: []

- id: preset_down
  label: Preset Down
  kind: action
  description: "Command: PRS DOWN."
  params: []

- id: preset_memory_set
  label: Set Preset Memory
  kind: action
  description: "Command: PRM {preset}. Stores preset."
  params:
    - name: preset
      type: string
      description: "Hex 01–28"

# === MAIN ZONE — Net/USB ===
- id: net_usb_play
  label: Net/USB Play
  kind: action
  description: "Command: NTC PLAY."
  params: []

- id: net_usb_stop
  label: Net/USB Stop
  kind: action
  description: "Command: NTC STOP."
  params: []

- id: net_usb_pause
  label: Net/USB Pause
  kind: action
  description: "Command: NTC PAUSE."
  params: []

- id: net_usb_track_up
  label: Net/USB Track Up
  kind: action
  description: "Command: NTC TRUP."
  params: []

- id: net_usb_track_down
  label: Net/USB Track Down
  kind: action
  description: "Command: NTC TRDN."
  params: []

- id: net_usb_ff
  label: Net/USB Fast Forward
  kind: action
  description: "Command: NTC FF. Must be sent continuously with <100ms between codes."
  params: []

- id: net_usb_rew
  label: Net/USB Rewind
  kind: action
  description: "Command: NTC REW. Must be sent continuously with <100ms between codes."
  params: []

- id: net_usb_repeat
  label: Net/USB Repeat
  kind: action
  description: "Command: NTC REPEAT."
  params: []

- id: net_usb_random
  label: Net/USB Random
  kind: action
  description: "Command: NTC RANDOM."
  params: []

- id: net_usb_up
  label: Net/USB Up
  kind: action
  description: "Command: NTC UP."
  params: []

- id: net_usb_down
  label: Net/USB Down
  kind: action
  description: "Command: NTC DOWN."
  params: []

- id: net_usb_left
  label: Net/USB Left
  kind: action
  description: "Command: NTC LEFT."
  params: []

- id: net_usb_right
  label: Net/USB Right
  kind: action
  description: "Command: NTC RIGHT."
  params: []

- id: net_usb_select
  label: Net/USB Select
  kind: action
  description: "Command: NTC SELECT."
  params: []

- id: net_usb_return
  label: Net/USB Return
  kind: action
  description: "Command: NTC RETURN."
  params: []

- id: iradio_ch_up
  label: Internet Radio Channel Up
  kind: action
  description: "Command: NTC CHUP."
  params: []

- id: iradio_ch_down
  label: Internet Radio Channel Down
  kind: action
  description: "Command: NTC CHDN."
  params: []

- id: iradio_preset_set
  label: Set Internet Radio Preset
  kind: action
  description: "Command: NPR {preset}. Hex 01–28."
  params:
    - name: preset
      type: string
      description: "Hex 01–28"

# === ZONE 2 — Power / Muting ===
- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  description: "Command: ZPW 01."
  params: []

- id: zone2_power_standby
  label: Zone 2 Power Standby
  kind: action
  description: "Command: ZPW 00."
  params: []

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  description: "Command: ZMT 01."
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  description: "Command: ZMT 00."
  params: []

- id: zone2_mute_toggle
  label: Zone 2 Mute Toggle
  kind: action
  description: "Command: ZMT TG."
  params: []

# === ZONE 2 — Volume ===
- id: zone2_volume_set
  label: Set Zone 2 Volume
  kind: action
  description: "Command: ZVL {level}. Hex 00–64."
  params:
    - name: level
      type: string
      description: "Hex 00–64"

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  description: "Command: ZVL UP."
  params: []

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  description: "Command: ZVL DOWN."
  params: []

# === ZONE 2 — Tone / Balance ===
- id: zone2_tone_set
  label: Set Zone 2 Tone
  kind: action
  description: "Command: ZTN {Bxx|Txx}. Only works when main is ON and Zone2 is powered or variable."
  params:
    - name: value
      type: string
      description: "Bxx for bass, Txx for treble. Range -A to +A."

- id: zone2_balance_set
  label: Set Zone 2 Balance
  kind: action
  description: "Command: ZBL {xx}. xx is -A to +A."
  params:
    - name: value
      type: string
      description: "Balance value -A to +A, or UP/DOWN"

# === ZONE 2 — Input Selection ===
- id: zone2_input_set
  label: Set Zone 2 Input
  kind: action
  description: "Command: SLZ {code}. Only works when main is ON."
  params:
    - name: code
      type: string
      description: "00=VIDEO1, 01=VIDEO2, 02=VIDEO3, 03=VIDEO4, 04=VIDEO5, 10=DVD, 20=TAPE1, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB-Front, 2A=USB-Rear, 40=Universal PORT, 30=MULTI CH, 7F=OFF, 80=SOURCE"

# === ZONE 3 — Power / Muting ===
- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  description: "Command: PW3 01."
  params: []

- id: zone3_power_standby
  label: Zone 3 Power Standby
  kind: action
  description: "Command: PW3 00."
  params: []

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  description: "Command: MT3 01."
  params: []

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  description: "Command: MT3 00."
  params: []

- id: zone3_mute_toggle
  label: Zone 3 Mute Toggle
  kind: action
  description: "Command: MT3 TG."
  params: []

# === ZONE 3 — Volume ===
- id: zone3_volume_set
  label: Set Zone 3 Volume
  kind: action
  description: "Command: VL3 {level}. Hex 00–64 (DTX-8.9 confirmed)."
  params:
    - name: level
      type: string
      description: "Hex 00–64"

- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  description: "Command: VL3 UP."
  params: []

- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  description: "Command: VL3 DOWN."
  params: []

# === ZONE 3 — Input Selection ===
- id: zone3_input_set
  label: Set Zone 3 Input
  kind: action
  description: "Command: SL3 {code}. DTX-8.9 supported inputs: VIDEO1–5, DVD, TAPE1, PHONO, CD, FM, AM, TUNER, XM, SIRIUS, SOURCE."
  params:
    - name: code
      type: string
      description: "00=VIDEO1, 01=VIDEO2, 02=VIDEO3, 03=VIDEO4, 04=VIDEO5, 10=DVD, 20=TAPE1, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 31=XM, 32=SIRIUS, 80=SOURCE"

# === ZONE 3 — Tuner ===
- id: zone3_tuner_set
  label: Set Zone 3 Tuner Frequency
  kind: action
  description: "Command: TU3 {nnnnn}."
  params:
    - name: frequency
      type: string
      description: "5-digit code"

- id: zone3_preset_set
  label: Set Zone 3 Preset
  kind: action
  description: "Command: PR3 {preset}. Hex 01–28."
  params:
    - name: preset
      type: string
      description: "Hex 01–28"

- id: zone3_preset_up
  label: Zone 3 Preset Up
  kind: action
  description: "Command: PR3 UP."
  params: []

- id: zone3_preset_down
  label: Zone 3 Preset Down
  kind: action
  description: "Command: PR3 DOWN."
  params: []

# === RI System — Dock (CDS) ===
- id: dock_power_on
  label: Dock Power On
  kind: action
  description: "Command: CDS PWRON. Via RI system."
  params: []

- id: dock_power_off
  label: Dock Power Off
  kind: action
  description: "Command: CDS PWROFF. Via RI system."
  params: []

- id: dock_play
  label: Dock Play/Resume
  kind: action
  description: "Command: CDS PLY/RES."
  params: []

- id: dock_stop
  label: Dock Stop
  kind: action
  description: "Command: CDS STOP."
  params: []

- id: dock_pause
  label: Dock Pause
  kind: action
  description: "Command: CDS PAUSE."
  params: []

- id: dock_track_up
  label: Dock Track Up
  kind: action
  description: "Command: CDS SKIP.F."
  params: []

- id: dock_track_down
  label: Dock Track Down
  kind: action
  description: "Command: CDS SKIP.R."
  params: []
```

## Feedbacks

```yaml
# === MAIN ZONE ===
- id: power_state
  label: System Power State
  description: "Query: PWR QSTN. Response: PWR 00 (standby) or PWR 01 (on)."
  type: enum
  values: ["00", "01"]

- id: mute_state
  label: Audio Muting State
  description: "Query: AMT QSTN. Response: AMT 00 (off) or AMT 01 (on)."
  type: enum
  values: ["00", "01"]

- id: volume_level
  label: Master Volume Level
  description: "Query: MVL QSTN. Response: MVL {hex level 00–64}."
  type: string

- id: input_selector
  label: Input Selector Position
  description: "Query: SLI QSTN. Response: SLI {code}."
  type: string

- id: audio_selector_state
  label: Audio Selector State
  description: "Query: SLA QSTN. Response: SLA {code}."
  type: string

- id: recout_selector_state
  label: RECOUT Selector State
  description: "Query: SLR QSTN. Response: SLR {code}."
  type: string

- id: listening_mode_state
  label: Listening Mode State
  description: "Query: LMD QSTN. Response: LMD {hex code}."
  type: string

- id: speaker_a_state
  label: Speaker A State
  description: "Query: SPA QSTN. Response: SPA 00 or SPA 01."
  type: enum
  values: ["00", "01"]

- id: speaker_b_state
  label: Speaker B State
  description: "Query: SPB QSTN. Response: SPB 00 or SPB 01."
  type: enum
  values: ["00", "01"]

- id: speaker_layout_state
  label: Speaker Layout State
  description: "Query: SPL QSTN. Response: SPL {code}."
  type: string

- id: sleep_time
  label: Sleep Timer
  description: "Query: SLP QSTN. Response: SLP {hex time} or SLP OFF."
  type: string

- id: display_mode_state
  label: Display Mode State
  description: "Query: DIF QSTN. Response: DIF {code}."
  type: string

- id: dimmer_level
  label: Dimmer Level
  description: "Query: DIM QSTN. Response: DIM {code}."
  type: string

- id: late_night_state
  label: Late Night State
  description: "Query: LTN QSTN. Response: LTN {code}."
  type: string

- id: re_eq_state
  label: Re-EQ/Academy Filter State
  description: "Query: RAS QSTN."
  type: string

- id: audyssey_state
  label: Audyssey 2EQ/MultEQ/MultEQ XT State
  description: "Query: ADY QSTN."
  type: enum
  values: ["00", "01"]

- id: audyssey_dynamic_eq_state
  label: Audyssey Dynamic EQ State
  description: "Query: ADQ QSTN."
  type: enum
  values: ["00", "01"]

- id: audyssey_dynamic_volume_state
  label: Audyssey Dynamic Volume State
  description: "Query: ADV QSTN."
  type: enum
  values: ["00", "01", "02", "03"]

- id: dolby_volume_state
  label: Dolby Volume State
  description: "Query: DVL QSTN."
  type: enum
  values: ["00", "01", "02", "03"]

- id: music_optimizer_state
  label: Music Optimizer State
  description: "Query: MOT QSTN."
  type: enum
  values: ["00", "01"]

- id: hdmi_output_state
  label: HDMI Output Selector State
  description: "Query: HDO QSTN."
  type: string

- id: monitor_resolution_state
  label: Monitor Out Resolution State
  description: "Query: RES QSTN."
  type: string

- id: isf_mode_state
  label: ISF Mode State
  description: "Query: ISF QSTN."
  type: enum
  values: ["00", "01", "02"]

- id: tone_front_state
  label: Front Tone State
  description: "Query: TFR QSTN. Response: TFR BxxTxx."
  type: string

- id: tone_center_state
  label: Center Tone State
  description: "Query: TCT QSTN."
  type: string

- id: tone_surround_state
  label: Surround Tone State
  description: "Query: TSR QSTN."
  type: string

- id: tone_surroundback_state
  label: Surround Back Tone State
  description: "Query: TSB QSTN."
  type: string

- id: tone_subwoofer_state
  label: Subwoofer Tone State
  description: "Query: TSW QSTN."
  type: string

- id: subwoofer_level_state
  label: Subwoofer Level (Temporary)
  description: "Query: SWL QSTN."
  type: string

- id: center_level_state
  label: Center Level (Temporary)
  description: "Query: CTL QSTN."
  type: string

- id: audio_info
  label: Audio Information
  description: "Query: IFA QSTN (or send DIF02). Response: IFA nnnnn:nnnnn."
  type: string

- id: video_info
  label: Video Information
  description: "Query: IFV QSTN (or send DIF03). Response: IFV nnnnn:nnnnn."
  type: string

- id: tuner_frequency_state
  label: Tuner Frequency
  description: "Query: TUN QSTN."
  type: string

- id: preset_state
  label: Tuner Preset
  description: "Query: PRS QSTN."
  type: string

- id: net_usb_play_status
  label: Net/USB Play Status
  description: "Query: NST QSTN. Response: NST prs (play/repeat/shuffle flags)."
  type: string

- id: net_usb_artist
  label: Net/USB Artist Name
  description: "Query: NAT QSTN. Up to 64 ASCII chars."
  type: string

- id: net_usb_album
  label: Net/USB Album Name
  description: "Query: NAL QSTN. Up to 64 ASCII chars."
  type: string

- id: net_usb_title
  label: Net/USB Title Name
  description: "Query: NTI QSTN. Up to 64 ASCII chars."
  type: string

- id: net_usb_time
  label: Net/USB Time Info
  description: "Query: NTM QSTN. Format mm:ss/mm:ss."
  type: string

- id: net_usb_track
  label: Net/USB Track Info
  description: "Query: NTR QSTN. Format cccc/tttt."
  type: string

# === ZONE 2 ===
- id: zone2_power_state
  label: Zone 2 Power State
  description: "Query: ZPW QSTN."
  type: enum
  values: ["00", "01"]

- id: zone2_mute_state
  label: Zone 2 Muting State
  description: "Query: ZMT QSTN."
  type: enum
  values: ["00", "01"]

- id: zone2_volume_level
  label: Zone 2 Volume Level
  description: "Query: ZVL QSTN."
  type: string

- id: zone2_tone_state
  label: Zone 2 Tone State
  description: "Query: ZTN QSTN. Response: ZTN BxxTxx."
  type: string

- id: zone2_balance_state
  label: Zone 2 Balance State
  description: "Query: ZBL QSTN."
  type: string

- id: zone2_input_state
  label: Zone 2 Input Selector State
  description: "Query: SLZ QSTN."
  type: string

# === ZONE 3 ===
- id: zone3_power_state
  label: Zone 3 Power State
  description: "Query: PW3 QSTN."
  type: enum
  values: ["00", "01"]

- id: zone3_mute_state
  label: Zone 3 Muting State
  description: "Query: MT3 QSTN."
  type: enum
  values: ["00", "01"]

- id: zone3_volume_level
  label: Zone 3 Volume Level
  description: "Query: VL3 QSTN."
  type: string

- id: zone3_input_state
  label: Zone 3 Input Selector State
  description: "Query: SL3 QSTN."
  type: string

- id: zone3_tuner_frequency_state
  label: Zone 3 Tuner Frequency
  description: "Query: TU3 QSTN."
  type: string

- id: zone3_preset_state
  label: Zone 3 Preset
  description: "Query: PR3 QSTN."
  type: string
```

## Variables

```yaml
# UNRESOLVED: no settable parameters beyond discrete commands found in source
```

## Events

```yaml
# Unsolicited status messages are sent by the receiver whenever state changes
# (see section 2.3 of source: Event Notice Communication).
- id: status_change
  description: "The receiver sends an unsolicited status message (same format as query responses) whenever system state changes. Examples: SLI03 on input change, PWR01 on power on. Controllers must maintain a persistent TCP connection to receive these."
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - "Zone 2 tone and balance commands (ZTN, ZBL) only work when main zone is ON and Zone 2 is powered or set to variable output."
  - "Zone 2 volume and selector (ZVL, SLZ) only work when main zone is ON."
  - "12V Trigger commands (TGA, TGB, TGC) are only available when each trigger parameter is set to OFF in the Setup Menu."
```

## Notes

**Protocol framing (eISCP over TCP):**
The eISCP packet consists of a 16-byte header (`ISCP` magic + header size 0x00000010 + data size big-endian + version 0x01 + 3 reserved bytes) followed by the ISCP data. The ISCP data begins with `!1` (start char `!`, unit type `1` for receiver), then the 3-character command code, then the parameter, ending with `[EOF]` (0x1A), optionally followed by `[CR][LF]`.

**Connection requirements:**
- Only one TCP client connection is permitted at a time.
- The connection must remain persistent; the receiver cannot push unsolicited status notifications to a disconnected client.
- Minimum interval between received messages: 50ms. If the receiver does not respond within 50ms, the communication has failed.
- Default TCP port is 60128. The port can be changed via the receiver's setup menu to any value in the range 49152–65535; after changing, the receiver must be put into standby and powered on again.

**RS-232C framing:**
Commands are sent as `!1{CMD}{PARAM}[CR]` (or `[LF]` or `[CR][LF]`). Responses end with `[EOF]` (0x1A). Use a straight-through 9-pin cable. Pin 2=TX, Pin 3=RX, Pin 5=GND.

**Zone 3 limitations on DTX-8.9:**
Zone 3 tone control (TN3) and Zone 3 balance (BL3) are NOT supported on DTX-8.9 (all codes return "No" in the compatibility table). Zone 3 network operation (NT3, NP3) is also not supported. Zone 3 tuner and preset (TU3, PR3) are confirmed supported.

**Version info:**
DTX-8.9 was added to the ISCP spec in version 1.10 (13 June 2008) and refined in versions 1.11 and 1.12. The overall spec version used as source is 1.15 (31 August 2009).

<!-- UNRESOLVED: XM/SIRIUS model availability for DTX-8.9 not confirmed; source notes these inputs require XM/SIRIUS model. HD Radio (HAT, HCN, HTI, HDS, HPR, HBL, HTS) support for DTX-8.9 not individually confirmed in source tables. RDS support (RDS, PTS, TPS) not confirmed for DTX-8.9. The source compatibility table column confirms main command blocks but full per-command HD Radio/RDS columns for DTX-8.9 are not shown. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:31.200Z
last_checked_at: 2026-05-16T22:13:00.065Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T22:13:00.065Z
matched_actions: 126
action_count: 126
confidence: high
summary: "All 126 spec actions matched literally in source with correct shapes; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
