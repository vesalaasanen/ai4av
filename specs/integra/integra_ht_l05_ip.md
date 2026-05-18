---
spec_id: admin/integra-ht-l05
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra HT-L05 Control Spec"
manufacturer: Integra
model_family: HT-L05
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - HT-L05
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:31.200Z
last_checked_at: 2026-05-16T22:21:45.671Z
generated_at: 2026-05-16T22:21:45.671Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T22:21:45.671Z
  matched_actions: 98
  action_count: 98
  confidence: high
  summary: "All 98 spec action commands matched verbatim in source with correct parameter ranges; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Integra HT-L05 Control Spec

## Summary

The Integra HT-L05 is an AV receiver controlled via the ISCP (Integra Serial Control Protocol). This spec covers both the RS-232C serial interface and the Ethernet (eISCP) TCP/IP interface. Commands consist of a 3-character command mnemonic followed by variable-length parameter characters; queries use the "QSTN" parameter to retrieve current state. The device supports multi-zone operation (Main, Zone 2, Zone 3, Zone 4).

<!-- UNRESOLVED: Source document is the generic ISCP protocol spec (v1.15, 2009) applied to the HT-L05; model-specific command availability (e.g. XM/SIRIUS, HD Radio, Zone 3/4 presence) is not confirmed for the HT-L05 specifically. -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60128
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
- powerable       # inferred from PWR power on/off command
- queryable       # inferred from QSTN query commands throughout
- routable        # inferred from SLI input selector and zone selector commands
- levelable       # inferred from MVL master volume and tone commands
```

## Actions

```yaml
# --- System Power (Main Zone) ---
- id: power_on
  label: Power On
  kind: action
  params: []
  command: "PWR01"

- id: power_standby
  label: Power Standby
  kind: action
  params: []
  command: "PWR00"

# --- Audio Muting (Main Zone) ---
- id: mute_on
  label: Audio Muting On
  kind: action
  params: []
  command: "AMT01"

- id: mute_off
  label: Audio Muting Off
  kind: action
  params: []
  command: "AMT00"

- id: mute_toggle
  label: Audio Muting Toggle
  kind: action
  params: []
  command: "AMTTG"

# --- Master Volume (Main Zone) ---
- id: volume_set
  label: Set Master Volume
  kind: action
  params:
    - name: level
      type: string
      description: "Hex level 00–64 (0–100) or 00–50 (0–80) depending on model"
  command: "MVL{level}"

- id: volume_up
  label: Volume Up
  kind: action
  params: []
  command: "MVLUP"

- id: volume_down
  label: Volume Down
  kind: action
  params: []
  command: "MVLDOWN"

- id: volume_up_1db
  label: Volume Up 1dB
  kind: action
  params: []
  command: "MVLUP1"

- id: volume_down_1db
  label: Volume Down 1dB
  kind: action
  params: []
  command: "MVLDOWN1"

# --- Input Selector (Main Zone) ---
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: string
      description: "Input code: 00=VIDEO1/VCR, 01=VIDEO2/CBL, 02=VIDEO3/GAME, 03=VIDEO4/AUX1, 04=VIDEO5/AUX2, 05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB(Front), 2A=USB(Rear), 40=Universal PORT, 30=MULTI CH, 31=XM, 32=SIRIUS"
  command: "SLI{input}"

- id: input_up
  label: Input Selector Up
  kind: action
  params: []
  command: "SLIUP"

- id: input_down
  label: Input Selector Down
  kind: action
  params: []
  command: "SLIDOWN"

# --- Speaker A/B ---
- id: speaker_a_on
  label: Speaker A On
  kind: action
  params: []
  command: "SPA01"

- id: speaker_a_off
  label: Speaker A Off
  kind: action
  params: []
  command: "SPA00"

- id: speaker_b_on
  label: Speaker B On
  kind: action
  params: []
  command: "SPB01"

- id: speaker_b_off
  label: Speaker B Off
  kind: action
  params: []
  command: "SPB00"

# --- Speaker Layout ---
- id: speaker_layout_set
  label: Set Speaker Layout
  kind: action
  params:
    - name: layout
      type: string
      description: "SB=SurrBack, FH=Front High, FW=Front Wide"
  command: "SPL{layout}"

# --- Tone (Front) ---
- id: tone_front_set
  label: Set Front Tone
  kind: action
  params:
    - name: value
      type: string
      description: "Bxx for bass or Txx for treble (xx: -A..00..+A = -10..0..+10, 2-step)"
  command: "TFR{value}"

- id: tone_front_bass_up
  label: Front Bass Up
  kind: action
  params: []
  command: "TFRBUP"

- id: tone_front_bass_down
  label: Front Bass Down
  kind: action
  params: []
  command: "TFRBDOWN"

- id: tone_front_treble_up
  label: Front Treble Up
  kind: action
  params: []
  command: "TFRTUP"

- id: tone_front_treble_down
  label: Front Treble Down
  kind: action
  params: []
  command: "TFRTDOWN"

# --- Subwoofer Level ---
- id: subwoofer_level_set
  label: Set Subwoofer Level
  kind: action
  params:
    - name: level
      type: string
      description: "Hex: -F to +C (-15dB to +12dB)"
  command: "SWL{level}"

- id: subwoofer_level_up
  label: Subwoofer Level Up
  kind: action
  params: []
  command: "SWLUP"

- id: subwoofer_level_down
  label: Subwoofer Level Down
  kind: action
  params: []
  command: "SWLDOWN"

# --- Center Level ---
- id: center_level_set
  label: Set Center Level
  kind: action
  params:
    - name: level
      type: string
      description: "Hex: -C to +C (-12dB to +12dB)"
  command: "CTL{level}"

- id: center_level_up
  label: Center Level Up
  kind: action
  params: []
  command: "CTLUP"

- id: center_level_down
  label: Center Level Down
  kind: action
  params: []
  command: "CTLDOWN"

# --- Sleep Timer ---
- id: sleep_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: "Hex 01–5A (1–90 minutes) or OFF"
  command: "SLP{minutes}"

- id: sleep_off
  label: Sleep Timer Off
  kind: action
  params: []
  command: "SLPOFF"

# --- Listening Mode ---
- id: listening_mode_set
  label: Set Listening Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "Hex code: 00=STEREO, 01=DIRECT, 02=SURROUND, 03=FILM, 04=THX, 05=ACTION, 06=MUSICAL, 07=MONO MOVIE, 08=ORCHESTRA, 09=UNPLUGGED, 0A=STUDIO-MIX, 0B=TV LOGIC, 0C=ALL CH STEREO, 0D=THEATER-DIMENSIONAL, 0E=ENHANCED 7, 0F=MONO, 11=PURE AUDIO, 12=MULTIPLEX, 13=FULL MONO, 14=DOLBY VIRTUAL, 15=DTS Surround Sensation, 16=Audyssey DSX, 40=5.1ch Surround, 41=Dolby EX, 42=THX Cinema, 43=THX Surround EX, 44=THX Music, 45=THX Games, 50=U2/S2 Cinema, 51=MusicMode, 52=Games Mode, 80=PLII Movie, 81=PLII Music, 82=Neo:6 Cinema, 83=Neo:6 Music, 84=PLII THX Cinema, 85=Neo:6 THX Cinema, 86=PLII Game, 87=Neural Surr, 88=Neural THX, 89=PLII THX Games, 8A=Neo:6 THX Games, 8B=PLII THX Music, 8C=Neo:6 THX Music, 8D=Neural THX Cinema, 8E=Neural THX Music, 8F=Neural THX Games, 90=PLIIz Height, and more"
  command: "LMD{mode}"

- id: listening_mode_up
  label: Listening Mode Up
  kind: action
  params: []
  command: "LMDUP"

- id: listening_mode_down
  label: Listening Mode Down
  kind: action
  params: []
  command: "LMDDOWN"

# --- Display Mode ---
- id: display_mode_set
  label: Set Display Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "00=Selector+Volume, 01=Selector+Listening Mode, 02=Digital Format, 03=Video Format, TG=Toggle"
  command: "DIF{mode}"

# --- Dimmer ---
- id: dimmer_set
  label: Set Dimmer Level
  kind: action
  params:
    - name: level
      type: string
      description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright+LED OFF, DIM=Toggle"
  command: "DIM{level}"

# --- OSD / Setup Navigation ---
- id: osd_menu
  label: OSD Menu
  kind: action
  params: []
  command: "OSDMENU"

- id: osd_up
  label: OSD Up
  kind: action
  params: []
  command: "OSDUP"

- id: osd_down
  label: OSD Down
  kind: action
  params: []
  command: "OSDDOWN"

- id: osd_right
  label: OSD Right
  kind: action
  params: []
  command: "OSDRIGHT"

- id: osd_left
  label: OSD Left
  kind: action
  params: []
  command: "OSDLEFT"

- id: osd_enter
  label: OSD Enter
  kind: action
  params: []
  command: "OSDENTER"

- id: osd_exit
  label: OSD Exit
  kind: action
  params: []
  command: "OSDEXIT"

# --- Memory ---
- id: memory_store
  label: Memory Store
  kind: action
  params: []
  command: "MEMSTR"

- id: memory_recall
  label: Memory Recall
  kind: action
  params: []
  command: "MEMRCL"

# --- HDMI Output ---
- id: hdmi_output_set
  label: Set HDMI Output
  kind: action
  params:
    - name: mode
      type: string
      description: "00=No/Analog, 01=Yes/HDMI Main, 02=Out Sub, 03=Both, 04=Both(Main), 05=Both(Sub)"
  command: "HDO{mode}"

# --- Monitor Resolution ---
- id: resolution_set
  label: Set Monitor Out Resolution
  kind: action
  params:
    - name: res
      type: string
      description: "00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p, 07=1080p/24fs, 06=Source"
  command: "RES{res}"

# --- Audio Selector ---
- id: audio_selector_set
  label: Set Audio Selector
  kind: action
  params:
    - name: input
      type: string
      description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE"
  command: "SLA{input}"

# --- 12V Triggers ---
- id: trigger_a_on
  label: 12V Trigger A On
  kind: action
  params: []
  command: "TGA01"

- id: trigger_a_off
  label: 12V Trigger A Off
  kind: action
  params: []
  command: "TGA00"

- id: trigger_b_on
  label: 12V Trigger B On
  kind: action
  params: []
  command: "TGB01"

- id: trigger_b_off
  label: 12V Trigger B Off
  kind: action
  params: []
  command: "TGB00"

- id: trigger_c_on
  label: 12V Trigger C On
  kind: action
  params: []
  command: "TGC01"

- id: trigger_c_off
  label: 12V Trigger C Off
  kind: action
  params: []
  command: "TGC00"

# --- Tuner ---
- id: tuner_set_frequency
  label: Set Tuning Frequency
  kind: action
  params:
    - name: freq
      type: string
      description: "nnnnn: FM nnn.nn MHz or AM nnnnn kHz or XM channel"
  command: "TUN{freq}"

- id: tuner_up
  label: Tuning Up
  kind: action
  params: []
  command: "TUNUP"

- id: tuner_down
  label: Tuning Down
  kind: action
  params: []
  command: "TUNDOWN"

- id: preset_set
  label: Set Tuner Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "Hex 01–28 (preset 1–40)"
  command: "PRS{preset}"

- id: preset_up
  label: Preset Up
  kind: action
  params: []
  command: "PRSUP"

- id: preset_down
  label: Preset Down
  kind: action
  params: []
  command: "PRSDOWN"

# --- Audyssey ---
- id: audyssey_multeq_set
  label: Set Audyssey 2EQ/MultEQ/MultEQ XT
  kind: action
  params:
    - name: state
      type: string
      description: "00=Off, 01=On, UP=Toggle"
  command: "ADY{state}"

- id: audyssey_dynamic_eq_set
  label: Set Audyssey Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "00=Off, 01=On, UP=Toggle"
  command: "ADQ{state}"

- id: audyssey_dynamic_volume_set
  label: Set Audyssey Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: "00=Off, 01=Light, 02=Medium, 03=Heavy, UP=Toggle"
  command: "ADV{level}"

# --- Dolby Volume ---
- id: dolby_volume_set
  label: Set Dolby Volume
  kind: action
  params:
    - name: level
      type: string
      description: "00=Off, 01=Low, 02=Mid, 03=High, UP=Toggle"
  command: "DVL{level}"

# --- Music Optimizer ---
- id: music_optimizer_set
  label: Set Music Optimizer
  kind: action
  params:
    - name: state
      type: string
      description: "00=Off, 01=On, UP=Toggle"
  command: "MOT{state}"

# --- Late Night ---
- id: late_night_set
  label: Set Late Night Mode
  kind: action
  params:
    - name: level
      type: string
      description: "00=Off, 01=Low/On(TrueHD), 02=High, 03=Auto(TrueHD), UP=Toggle"
  command: "LTN{level}"

# --- Re-EQ ---
- id: re_eq_set
  label: Set Re-EQ/Cinema Filter
  kind: action
  params:
    - name: state
      type: string
      description: "00=Off, 01=Re-EQ On/Cinema Filter On, 02=Academy On, UP=Toggle"
  command: "RAS{state}"

# --- Net/USB Playback ---
- id: net_play
  label: Net/USB Play
  kind: action
  params: []
  command: "NTCPLAY"

- id: net_stop
  label: Net/USB Stop
  kind: action
  params: []
  command: "NTCSTOP"

- id: net_pause
  label: Net/USB Pause
  kind: action
  params: []
  command: "NTCPAUSE"

- id: net_track_up
  label: Net/USB Track Up
  kind: action
  params: []
  command: "NTCTRUP"

- id: net_track_down
  label: Net/USB Track Down
  kind: action
  params: []
  command: "NTCTRDN"

- id: net_repeat
  label: Net/USB Repeat
  kind: action
  params: []
  command: "NTCREPEAT"

- id: net_random
  label: Net/USB Random
  kind: action
  params: []
  command: "NTCRANDOM"

# --- Zone 2 ---
- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  params: []
  command: "ZPW01"

- id: zone2_power_standby
  label: Zone 2 Power Standby
  kind: action
  params: []
  command: "ZPW00"

- id: zone2_mute_on
  label: Zone 2 Muting On
  kind: action
  params: []
  command: "ZMT01"

- id: zone2_mute_off
  label: Zone 2 Muting Off
  kind: action
  params: []
  command: "ZMT00"

- id: zone2_volume_set
  label: Set Zone 2 Volume
  kind: action
  params:
    - name: level
      type: string
      description: "Hex 00–64 (0–100)"
  command: "ZVL{level}"

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  params: []
  command: "ZVLUP"

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  params: []
  command: "ZVLDOWN"

- id: zone2_input_set
  label: Set Zone 2 Input
  kind: action
  params:
    - name: input
      type: string
      description: "Same codes as SLI plus 80=SOURCE"
  command: "SLZ{input}"

# --- Zone 3 ---
- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  params: []
  command: "PW301"

- id: zone3_power_standby
  label: Zone 3 Power Standby
  kind: action
  params: []
  command: "PW300"

- id: zone3_mute_on
  label: Zone 3 Muting On
  kind: action
  params: []
  command: "MT301"

- id: zone3_mute_off
  label: Zone 3 Muting Off
  kind: action
  params: []
  command: "MT300"

- id: zone3_volume_set
  label: Set Zone 3 Volume
  kind: action
  params:
    - name: level
      type: string
      description: "Hex 00–64 (0–100)"
  command: "VL3{level}"

- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  params: []
  command: "VL3UP"

- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  params: []
  command: "VL3DOWN"

- id: zone3_input_set
  label: Set Zone 3 Input
  kind: action
  params:
    - name: input
      type: string
      description: "Same codes as SLI plus 80=SOURCE"
  command: "SL3{input}"

# --- Zone 4 ---
- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  params: []
  command: "PW401"

- id: zone4_power_standby
  label: Zone 4 Power Standby
  kind: action
  params: []
  command: "PW400"

- id: zone4_mute_on
  label: Zone 4 Muting On
  kind: action
  params: []
  command: "MT401"

- id: zone4_mute_off
  label: Zone 4 Muting Off
  kind: action
  params: []
  command: "MT400"

- id: zone4_volume_set
  label: Set Zone 4 Volume
  kind: action
  params:
    - name: level
      type: string
      description: "Hex 00–64 (0–100)"
  command: "VL4{level}"

- id: zone4_volume_up
  label: Zone 4 Volume Up
  kind: action
  params: []
  command: "VL4UP"

- id: zone4_volume_down
  label: Zone 4 Volume Down
  kind: action
  params: []
  command: "VL4DOWN"

- id: zone4_input_set
  label: Set Zone 4 Input
  kind: action
  params:
    - name: input
      type: string
      description: "Same codes as SLI plus 80=SOURCE"
  command: "SL4{input}"
```

## Feedbacks

```yaml
- id: power_state
  label: System Power State
  type: enum
  values: ["00", "01"]
  value_map: {"00": "standby", "01": "on"}
  command: "PWRQSTN"
  response_prefix: "PWR"

- id: mute_state
  label: Audio Muting State
  type: enum
  values: ["00", "01"]
  value_map: {"00": "off", "01": "on"}
  command: "AMTQSTN"
  response_prefix: "AMT"

- id: volume_level
  label: Master Volume Level
  type: string
  description: "Hex 00–64"
  command: "MVLQSTN"
  response_prefix: "MVL"

- id: input_selector
  label: Input Selector Position
  type: string
  description: "Hex code of current input"
  command: "SLIQSTN"
  response_prefix: "SLI"

- id: listening_mode
  label: Listening Mode
  type: string
  description: "Hex code of current listening mode"
  command: "LMDQSTN"
  response_prefix: "LMD"

- id: display_mode
  label: Display Mode
  type: enum
  values: ["00", "01", "02", "03"]
  value_map: {"00": "selector+volume", "01": "selector+listening mode", "02": "digital format", "03": "video format"}
  command: "DIFQSTN"
  response_prefix: "DIF"

- id: dimmer_level
  label: Dimmer Level
  type: enum
  values: ["00", "01", "02", "03", "08"]
  value_map: {"00": "bright", "01": "dim", "02": "dark", "03": "shut-off", "08": "bright+led off"}
  command: "DIMQSTN"
  response_prefix: "DIM"

- id: sleep_time
  label: Sleep Time
  type: string
  description: "Hex 01–5A (minutes) or OFF"
  command: "SLPQSTN"
  response_prefix: "SLP"

- id: subwoofer_level
  label: Subwoofer Level
  type: string
  description: "Hex -F to +C"
  command: "SWLQSTN"
  response_prefix: "SWL"

- id: center_level
  label: Center Level
  type: string
  description: "Hex -C to +C"
  command: "CTLQSTN"
  response_prefix: "CTL"

- id: audio_selector
  label: Audio Selector State
  type: string
  description: "Hex code of current audio selector"
  command: "SLAQSTN"
  response_prefix: "SLA"

- id: hdmi_output
  label: HDMI Output State
  type: string
  description: "00–05"
  command: "HDOQSTN"
  response_prefix: "HDO"

- id: monitor_resolution
  label: Monitor Out Resolution
  type: string
  description: "00–07"
  command: "RESQSTN"
  response_prefix: "RES"

- id: tuning_frequency
  label: Tuning Frequency
  type: string
  description: "nnnnn (FM nnn.nn MHz or AM nnnnn kHz)"
  command: "TUNQSTN"
  response_prefix: "TUN"

- id: preset_number
  label: Tuner Preset Number
  type: string
  description: "Hex 01–28"
  command: "PRSQSTN"
  response_prefix: "PRS"

- id: audio_info
  label: Audio Information
  type: string
  description: "Comma-separated audio format info"
  command: "IFAQSTN"
  response_prefix: "IFA"

- id: video_info
  label: Video Information
  type: string
  description: "Comma-separated video format info"
  command: "IFVQSTN"
  response_prefix: "IFV"

- id: audyssey_multeq_state
  label: Audyssey MultEQ State
  type: enum
  values: ["00", "01"]
  value_map: {"00": "off", "01": "on"}
  command: "ADYQSTN"
  response_prefix: "ADY"

- id: audyssey_dynamic_eq_state
  label: Audyssey Dynamic EQ State
  type: enum
  values: ["00", "01"]
  value_map: {"00": "off", "01": "on"}
  command: "ADQQSTN"
  response_prefix: "ADQ"

- id: audyssey_dynamic_volume_state
  label: Audyssey Dynamic Volume State
  type: enum
  values: ["00", "01", "02", "03"]
  value_map: {"00": "off", "01": "light", "02": "medium", "03": "heavy"}
  command: "ADVQSTN"
  response_prefix: "ADV"

- id: dolby_volume_state
  label: Dolby Volume State
  type: enum
  values: ["00", "01", "02", "03"]
  value_map: {"00": "off", "01": "low", "02": "mid", "03": "high"}
  command: "DVLQSTN"
  response_prefix: "DVL"

- id: music_optimizer_state
  label: Music Optimizer State
  type: enum
  values: ["00", "01"]
  value_map: {"00": "off", "01": "on"}
  command: "MOTQSTN"
  response_prefix: "MOT"

- id: late_night_level
  label: Late Night Level
  type: string
  description: "00=Off, 01=Low, 02=High, 03=Auto"
  command: "LTNQSTN"
  response_prefix: "LTN"

- id: net_play_status
  label: Net/USB Play Status
  type: string
  description: "3-char: p=play status (S/P/p/F/R), r=repeat status (-/R/F/1), s=shuffle status (-/S/A)"
  command: "NSTQSTN"
  response_prefix: "NST"

- id: net_artist_name
  label: Net/USB Artist Name
  type: string
  description: "Variable-length ASCII, max 64 chars"
  command: "NATQSTN"
  response_prefix: "NAT"

- id: net_album_name
  label: Net/USB Album Name
  type: string
  description: "Variable-length ASCII, max 64 chars"
  command: "NALQSTN"
  response_prefix: "NAL"

- id: net_title_name
  label: Net/USB Title Name
  type: string
  description: "Variable-length ASCII, max 64 chars"
  command: "NTIQSTN"
  response_prefix: "NTI"

- id: net_time_info
  label: Net/USB Time Info
  type: string
  description: "mm:ss/mm:ss (elapsed/total, max 99:59)"
  command: "NTMQSTN"
  response_prefix: "NTM"

- id: net_track_info
  label: Net/USB Track Info
  type: string
  description: "cccc/tttt (current/total, max 9999)"
  command: "NTRQSTN"
  response_prefix: "NTR"

- id: zone2_power_state
  label: Zone 2 Power State
  type: enum
  values: ["00", "01"]
  value_map: {"00": "standby", "01": "on"}
  command: "ZPWQSTN"
  response_prefix: "ZPW"

- id: zone2_mute_state
  label: Zone 2 Muting State
  type: enum
  values: ["00", "01"]
  value_map: {"00": "off", "01": "on"}
  command: "ZMTQSTN"
  response_prefix: "ZMT"

- id: zone2_volume_level
  label: Zone 2 Volume Level
  type: string
  description: "Hex 00–64"
  command: "ZVLQSTN"
  response_prefix: "ZVL"

- id: zone2_input_selector
  label: Zone 2 Input Selector
  type: string
  description: "Hex code of current Zone 2 input"
  command: "SLZQSTN"
  response_prefix: "SLZ"

- id: zone3_power_state
  label: Zone 3 Power State
  type: enum
  values: ["00", "01"]
  value_map: {"00": "standby", "01": "on"}
  command: "PW3QSTN"
  response_prefix: "PW3"

- id: zone3_volume_level
  label: Zone 3 Volume Level
  type: string
  description: "Hex 00–64"
  command: "VL3QSTN"
  response_prefix: "VL3"

- id: zone3_input_selector
  label: Zone 3 Input Selector
  type: string
  description: "Hex code of current Zone 3 input"
  command: "SL3QSTN"
  response_prefix: "SL3"

- id: zone4_power_state
  label: Zone 4 Power State
  type: enum
  values: ["00", "01"]
  value_map: {"00": "standby", "01": "on"}
  command: "PW4QSTN"
  response_prefix: "PW4"

- id: zone4_volume_level
  label: Zone 4 Volume Level
  type: string
  description: "Hex 00–64"
  command: "VL4QSTN"
  response_prefix: "VL4"

- id: zone4_input_selector
  label: Zone 4 Input Selector
  type: string
  description: "Hex code of current Zone 4 input"
  command: "SL4QSTN"
  response_prefix: "SL4"
```

## Variables

```yaml
# UNRESOLVED: no settable parameter variables beyond discrete actions/feedbacks found in source
```

## Events

```yaml
# Unsolicited status notifications: the receiver spontaneously sends status messages
# when its state changes (e.g. input changed via front panel, volume changed, power state changed).
# These use the same format as query responses (e.g. "SLI03", "MVL1A", "PWR01").
# All feedback response_prefix values above can appear as unsolicited events.
# The eISCP connection must be held continuously to receive unsolicited notifications.
# Only one TCP client connection is supported at a time.
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - description: "Zone 2 tone and balance commands only work when main zone is ON and Zone 2 is powered or set to variable output."
    affected_commands: [ZTN, ZBL]
  - description: "12V Trigger commands (TGA/TGB/TGC) only available when the respective trigger parameter is set to OFF in Setup Menu."
    affected_commands: [TGA, TGB, TGC]
  - description: "Zone 2 volume (ZVL) only works when main zone is ON."
    affected_commands: [ZVL]
```

## Notes

**Protocol framing (RS-232C):** Commands are framed as `!1{CMD}{PARAM}[CR]`. The `!` is the start character, `1` is the unit type for Receiver, and the end character is CR (0x0D), LF (0x0A), or CR+LF.

**Protocol framing (eISCP / TCP):** Commands are wrapped in an eISCP packet with a 16-byte big-endian header (magic "ISCP", header size 0x10, data size, version 0x01, 3 reserved bytes), followed by the ISCP data string `!1{CMD}{PARAM}[EOF]` or `[EOF][CR][LF]` depending on model.

**TCP connection:** Only one client connection is allowed at a time. The connection must be held continuously to receive unsolicited status notifications. The receiver responds within 50ms; if no response arrives within 50ms, the communication has failed. A minimum 50ms interval between received messages is required.

**Query pattern:** Append `QSTN` as the parameter to any command that supports it to retrieve the current value. Example: `!1SLIQSTN[CR]` returns the current input selector.

**Port configuration:** The default eISCP port is 60128. The receiver can be configured to use any port in the range 49152–65535 via the Setup Menu; after changing the port, the receiver must be powered off and back on (to standby).

**Volume range note:** The maximum volume level depends on model configuration: either 0x64 (100) or 0x50 (80). The source does not specify which applies to the HT-L05 specifically.

**RI (Remote Interactive) bus commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR, CDS):** These control attached RI-bus peripherals (CD player, tape decks, DVD player, MD recorder, CD-R recorder, docking stations) via the receiver's RI port. They are pass-through commands and do not reflect the receiver's own state.

**XM/SIRIUS/HD Radio commands:** The source notes these are model-specific. Availability on the HT-L05 is not confirmed in this document.

**Zone 3 and Zone 4 commands:** Source lists PW3/MT3/VL3/TN3/BL3/SL3 and PW4/MT4/VL4/SL4. Availability on the HT-L05 is not confirmed — consult the HT-L05 hardware specification.

**FFW/REW Net-tune:** NTC FF and NTC REW commands must be sent continuously with no more than 100ms between codes.

<!-- UNRESOLVED: HT-L05-specific model applicability of Zone 3, Zone 4, XM, SIRIUS, HD Radio, and RI bus commands not confirmed in source — this is a generic ISCP v1.15 protocol document. -->
<!-- UNRESOLVED: eISCP packet end character variant ("EOF", "EOF+CR", or "EOF+CR+LF") for the HT-L05 not specified in source — "depend on model". -->
<!-- UNRESOLVED: Maximum volume ceiling (0x64 vs 0x50) for the HT-L05 not specified in source. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:31.200Z
last_checked_at: 2026-05-16T22:21:45.671Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T22:21:45.671Z
matched_actions: 98
action_count: 98
confidence: high
summary: "All 98 spec action commands matched verbatim in source with correct parameter ranges; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
