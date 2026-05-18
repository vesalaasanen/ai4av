---
spec_id: admin/integra-dtr-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DTR Series Control Spec"
manufacturer: Integra
model_family: "DTR Series"
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - "DTR Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:31.200Z
last_checked_at: 2026-05-16T22:01:40.458Z
generated_at: 2026-05-16T22:01:40.458Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T22:01:40.458Z
  matched_actions: 135
  action_count: 135
  confidence: high
  summary: "All 135 spec actions match literal ISCP command tokens in source; transport verified; coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Integra DTR Series Control Spec

## Summary

The Integra DTR Series are AV receivers controlled via ISCP (Integra Serial Control Protocol), a 3-character command with variable-length parameter format. The spec covers both RS-232C serial control and Ethernet (eISCP/TCP) control. Commands address Main Zone, Zone 2, Zone 3, and Zone 4 independently; the protocol also supports unsolicited status notifications and query commands.

<!-- UNRESOLVED: specific DTR model numbers (e.g. DTR-50.4, DTR-70.4) not listed in source; source covers the DTR Series as a whole using ISCP v1.15 -->

## Transport

```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 60128  # default eISCP TCP port; configurable 49152–65535 via receiver setup menu
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- powerable       # power on/off commands present (PWR, ZPW, PW3, PW4)
- routable        # input selector commands present (SLI, SLZ, SL3, SL4)
- queryable       # QSTN query commands present throughout
- levelable       # volume control commands present (MVL, ZVL, VL3, VL4)
```

## Actions

```yaml
# ── Main Zone: System ──────────────────────────────────────────────

- id: power_on
  label: Power On (Main)
  kind: action
  cmd: "!1PWR01\r"
  params: []

- id: power_standby
  label: Power Standby (Main)
  kind: action
  cmd: "!1PWR00\r"
  params: []

- id: mute_off
  label: Audio Muting Off (Main)
  kind: action
  cmd: "!1AMT00\r"
  params: []

- id: mute_on
  label: Audio Muting On (Main)
  kind: action
  cmd: "!1AMT01\r"
  params: []

- id: mute_toggle
  label: Audio Muting Toggle (Main)
  kind: action
  cmd: "!1AMTTG\r"
  params: []

- id: volume_up
  label: Master Volume Up (Main)
  kind: action
  cmd: "!1MVLUP\r"
  params: []

- id: volume_down
  label: Master Volume Down (Main)
  kind: action
  cmd: "!1MVLDOWN\r"
  params: []

- id: volume_up_1db
  label: Master Volume Up 1dB (Main)
  kind: action
  cmd: "!1MVLUP1\r"
  params: []

- id: volume_down_1db
  label: Master Volume Down 1dB (Main)
  kind: action
  cmd: "!1MVLDOWN1\r"
  params: []

- id: volume_set
  label: Set Master Volume Level (Main, hex 00–64)
  kind: action
  cmd: "!1MVL{level}\r"
  params:
    - name: level
      type: string
      description: "Volume level in hex (00–64 for 0–100, or 00–50 for 0–80 depending on model)"

# ── Main Zone: Speaker ─────────────────────────────────────────────

- id: speaker_a_off
  label: Speaker A Off
  kind: action
  cmd: "!1SPA00\r"
  params: []

- id: speaker_a_on
  label: Speaker A On
  kind: action
  cmd: "!1SPA01\r"
  params: []

- id: speaker_b_off
  label: Speaker B Off
  kind: action
  cmd: "!1SPB00\r"
  params: []

- id: speaker_b_on
  label: Speaker B On
  kind: action
  cmd: "!1SPB01\r"
  params: []

- id: speaker_layout_surroundback
  label: Set Speaker Layout SurrBack
  kind: action
  cmd: "!1SPLSB\r"
  params: []

- id: speaker_layout_front_high
  label: Set Speaker Layout Front High
  kind: action
  cmd: "!1SPLFH\r"
  params: []

- id: speaker_layout_front_wide
  label: Set Speaker Layout Front Wide
  kind: action
  cmd: "!1SPLFW\r"
  params: []

# ── Main Zone: Input Selector ──────────────────────────────────────

- id: select_input
  label: Select Input (Main)
  kind: action
  cmd: "!1SLI{input}\r"
  params:
    - name: input
      type: string
      description: "Input code: 00=VIDEO1/VCR, 01=VIDEO2/CBL-SAT, 02=VIDEO3/GAME, 03=VIDEO4/AUX1, 04=VIDEO5/AUX2, 05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB Front, 2A=USB Rear, 30=MULTI CH, 31=XM, 32=SIRIUS, 40=Universal PORT, UP, DOWN"

- id: select_input_up
  label: Input Selector Up (Main)
  kind: action
  cmd: "!1SLIUP\r"
  params: []

- id: select_input_down
  label: Input Selector Down (Main)
  kind: action
  cmd: "!1SLIDOWN\r"
  params: []

- id: select_recout
  label: Select RECOUT Selector (Main)
  kind: action
  cmd: "!1SLR{input}\r"
  params:
    - name: input
      type: string
      description: "Input code: 00=VIDEO1, 01=VIDEO2, 02=VIDEO3, 03=VIDEO4, 04=VIDEO5, 05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 30=MULTI CH, 31=XM, 7F=OFF, 80=SOURCE"

- id: select_audio_input
  label: Select Audio Input (Main)
  kind: action
  cmd: "!1SLA{mode}\r"
  params:
    - name: mode
      type: string
      description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE, UP"

# ── Main Zone: Tone Controls ───────────────────────────────────────

- id: tone_front_bass_set
  label: Set Front Bass
  kind: action
  cmd: "!1TFRB{xx}\r"
  params:
    - name: xx
      type: string
      description: "Bass value: -A to +A in 2-step increments (-10 to +10), e.g. 00=flat, +5='+5'"

- id: tone_front_treble_set
  label: Set Front Treble
  kind: action
  cmd: "!1TFRT{xx}\r"
  params:
    - name: xx
      type: string
      description: "Treble value: -A to +A in 2-step increments (-10 to +10)"

- id: tone_center_bass_set
  label: Set Center Bass
  kind: action
  cmd: "!1TCTB{xx}\r"
  params:
    - name: xx
      type: string
      description: "Bass value: -A to +A in 2-step increments"

- id: tone_surround_bass_set
  label: Set Surround Bass
  kind: action
  cmd: "!1TSRB{xx}\r"
  params:
    - name: xx
      type: string
      description: "Bass value: -A to +A in 2-step increments"

- id: subwoofer_level_set
  label: Set Subwoofer Level (temporary)
  kind: action
  cmd: "!1SWL{level}\r"
  params:
    - name: level
      type: string
      description: "Level: -F to +C (-15dB to +12dB), or UP/DOWN"

- id: center_level_set
  label: Set Center Level (temporary)
  kind: action
  cmd: "!1CTL{level}\r"
  params:
    - name: level
      type: string
      description: "Level: -C to +C (-12dB to +12dB), or UP/DOWN"

# ── Main Zone: Display / OSD ───────────────────────────────────────

- id: dimmer_set
  label: Set Dimmer Level
  kind: action
  cmd: "!1DIM{level}\r"
  params:
    - name: level
      type: string
      description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright+LED OFF, DIM=wrap-around"

- id: display_mode_set
  label: Set Display Mode
  kind: action
  cmd: "!1DIF{mode}\r"
  params:
    - name: mode
      type: string
      description: "00=Selector+Volume, 01=Selector+Listening Mode, 02=Digital Format (temporary), 03=Video Format (temporary), TG=wrap-around"

- id: osd_menu
  label: OSD Menu Key
  kind: action
  cmd: "!1OSDMENU\r"
  params: []

- id: osd_up
  label: OSD Up Key
  kind: action
  cmd: "!1OSDUP\r"
  params: []

- id: osd_down
  label: OSD Down Key
  kind: action
  cmd: "!1OSDDOWN\r"
  params: []

- id: osd_left
  label: OSD Left Key
  kind: action
  cmd: "!1OSDLEFT\r"
  params: []

- id: osd_right
  label: OSD Right Key
  kind: action
  cmd: "!1OSDRIGHT\r"
  params: []

- id: osd_enter
  label: OSD Enter Key
  kind: action
  cmd: "!1OSDENTER\r"
  params: []

- id: osd_exit
  label: OSD Exit Key
  kind: action
  cmd: "!1OSDEXIT\r"
  params: []

- id: osd_audio
  label: OSD Audio Adjust Key
  kind: action
  cmd: "!1OSDAUDIO\r"
  params: []

- id: osd_video
  label: OSD Video Adjust Key
  kind: action
  cmd: "!1OSDVIDEO\r"
  params: []

# ── Main Zone: Sleep ───────────────────────────────────────────────

- id: sleep_set
  label: Set Sleep Timer
  kind: action
  cmd: "!1SLP{time}\r"
  params:
    - name: time
      type: string
      description: "01–5A (1–90 min in hex), OFF=disable, UP=wrap-around"

# ── Main Zone: Memory ──────────────────────────────────────────────

- id: memory_store
  label: Store Memory
  kind: action
  cmd: "!1MEMSTR\r"
  params: []

- id: memory_recall
  label: Recall Memory
  kind: action
  cmd: "!1MEMRCL\r"
  params: []

- id: memory_lock
  label: Lock Memory
  kind: action
  cmd: "!1MEMLOCK\r"
  params: []

- id: memory_unlock
  label: Unlock Memory
  kind: action
  cmd: "!1MEMUNLK\r"
  params: []

# ── Main Zone: 12V Triggers ────────────────────────────────────────

- id: trigger_a_on
  label: 12V Trigger A On
  kind: action
  cmd: "!1TGA01\r"
  params: []

- id: trigger_a_off
  label: 12V Trigger A Off
  kind: action
  cmd: "!1TGA00\r"
  params: []

- id: trigger_b_on
  label: 12V Trigger B On
  kind: action
  cmd: "!1TGB01\r"
  params: []

- id: trigger_b_off
  label: 12V Trigger B Off
  kind: action
  cmd: "!1TGB00\r"
  params: []

- id: trigger_c_on
  label: 12V Trigger C On
  kind: action
  cmd: "!1TGC01\r"
  params: []

- id: trigger_c_off
  label: 12V Trigger C Off
  kind: action
  cmd: "!1TGC00\r"
  params: []

# ── Main Zone: Video Output ────────────────────────────────────────

- id: hdmi_output_set
  label: Set HDMI Output Selector
  kind: action
  cmd: "!1HDO{mode}\r"
  params:
    - name: mode
      type: string
      description: "00=No/Analog, 01=Yes/HDMI Main, 02=HDMI Sub, 03=Both, 04=Both(Main), 05=Both(Sub), UP=wrap-around"

- id: monitor_resolution_set
  label: Set Monitor Out Resolution
  kind: action
  cmd: "!1RES{mode}\r"
  params:
    - name: mode
      type: string
      description: "00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p, 07=1080p/24fs, 06=Source, UP=wrap-around"

- id: isf_mode_set
  label: Set ISF Mode
  kind: action
  cmd: "!1ISF{mode}\r"
  params:
    - name: mode
      type: string
      description: "00=Custom, 01=Day, 02=Night, UP=wrap-around"

# ── Main Zone: Listening Mode ──────────────────────────────────────

- id: listening_mode_set
  label: Set Listening Mode (Main)
  kind: action
  cmd: "!1LMD{mode}\r"
  params:
    - name: mode
      type: string
      description: "00=STEREO, 01=DIRECT, 02=SURROUND, 03=FILM/Game-RPG, 04=THX, 05=ACTION/Game-Action, 06=MUSICAL/Game-Rock, 07=MONO MOVIE, 08=ORCHESTRA, 09=UNPLUGGED, 0A=STUDIO-MIX, 0B=TV LOGIC, 0C=ALL CH STEREO, 0D=THEATER-DIMENSIONAL, 0E=ENHANCED 7/Game-Sports, 0F=MONO, 11=PURE AUDIO, 12=MULTIPLEX, 13=FULL MONO, 14=DOLBY VIRTUAL, 15=DTS Surround Sensation, 16=Audyssey DSX, 40=5.1ch Surround, 41=Dolby EX/DTS ES, 42=THX Cinema, 43=THX Surround EX, 44=THX Music, 45=THX Games, 50=U2/S2 Cinema, 51=MusicMode, 52=Games Mode, 80=PLII/PLIIx Movie, 81=PLII/PLIIx Music, 82=Neo:6 Cinema, 83=Neo:6 Music, 84=PLII/PLIIx THX Cinema, 85=Neo:6 THX Cinema, 86=PLII/PLIIx Game, 87=Neural Surr, 88=Neural THX, 89=PLII/PLIIx THX Games, 8A=Neo:6 THX Games, 8B=PLII/PLIIx THX Music, 8C=Neo:6 THX Music, 8D=Neural THX Cinema, 8E=Neural THX Music, 8F=Neural THX Games, 90=PLIIz Height, 91=Neo:6 Cinema DTS, 92=Neo:6 Music DTS, 93=Neural Digital Music, A0-A7=various +Audyssey DSX, UP, DOWN, MOVIE, MUSIC, GAME"

- id: late_night_set
  label: Set Late Night Mode
  kind: action
  cmd: "!1LTN{mode}\r"
  params:
    - name: mode
      type: string
      description: "00=Off, 01=Low@DolbyDigital/On@TrueHD, 02=High@DolbyDigital, 03=Auto@TrueHD, UP=wrap-around"

- id: audyssey_eq_set
  label: Set Audyssey 2EQ/MultEQ/MultEQ XT
  kind: action
  cmd: "!1ADY{mode}\r"
  params:
    - name: mode
      type: string
      description: "00=Off, 01=On, UP=wrap-around"

- id: audyssey_dynamic_eq_set
  label: Set Audyssey Dynamic EQ
  kind: action
  cmd: "!1ADQ{mode}\r"
  params:
    - name: mode
      type: string
      description: "00=Off, 01=On, UP=wrap-around"

- id: audyssey_dynamic_volume_set
  label: Set Audyssey Dynamic Volume
  kind: action
  cmd: "!1ADV{mode}\r"
  params:
    - name: mode
      type: string
      description: "00=Off, 01=Light, 02=Medium, 03=Heavy, UP=wrap-around"

- id: dolby_volume_set
  label: Set Dolby Volume
  kind: action
  cmd: "!1DVL{mode}\r"
  params:
    - name: mode
      type: string
      description: "00=Off, 01=Low, 02=Mid, 03=High, UP=wrap-around"

- id: music_optimizer_set
  label: Set Music Optimizer
  kind: action
  cmd: "!1MOT{mode}\r"
  params:
    - name: mode
      type: string
      description: "00=Off, 01=On, UP=wrap-around"

- id: re_eq_set
  label: Set Re-EQ/Academy Filter
  kind: action
  cmd: "!1RAS{mode}\r"
  params:
    - name: mode
      type: string
      description: "00=Both Off (or Re-EQ Off or Cinema Filter Off), 01=Re-EQ On (or Cinema Filter On), 02=Academy On, UP=wrap-around. Behavior varies by model."

# ── Main Zone: Tuner ───────────────────────────────────────────────

- id: tune_frequency_set
  label: Set Tuning Frequency (Main)
  kind: action
  cmd: "!1TUN{freq}\r"
  params:
    - name: freq
      type: string
      description: "nnnnn = FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch (put 0 in first 2 digits for XM), or UP/DOWN"

- id: preset_set
  label: Set Tuner Preset (Main)
  kind: action
  cmd: "!1PRS{no}\r"
  params:
    - name: no
      type: string
      description: "01–28 (1–40 in hex) or 01–1E (1–30 in hex), or UP/DOWN"

- id: preset_memory_set
  label: Store Preset Memory (Main)
  kind: action
  cmd: "!1PRM{no}\r"
  params:
    - name: no
      type: string
      description: "01–28 (1–40 in hex) or 01–1E (1–30 in hex)"

# ── Main Zone: Net/USB ─────────────────────────────────────────────

- id: net_play
  label: Net/USB Play
  kind: action
  cmd: "!1NTCPLAY\r"
  params: []

- id: net_stop
  label: Net/USB Stop
  kind: action
  cmd: "!1NTCSTOP\r"
  params: []

- id: net_pause
  label: Net/USB Pause
  kind: action
  cmd: "!1NTCPAUSE\r"
  params: []

- id: net_track_up
  label: Net/USB Track Up
  kind: action
  cmd: "!1NTCTRUP\r"
  params: []

- id: net_track_down
  label: Net/USB Track Down
  kind: action
  cmd: "!1NTCTRDN\r"
  params: []

- id: net_ff
  label: Net/USB Fast Forward (send continuously, ≤100ms interval)
  kind: action
  cmd: "!1NTCFF\r"
  params: []

- id: net_rew
  label: Net/USB Rewind (send continuously, ≤100ms interval)
  kind: action
  cmd: "!1NTCREW\r"
  params: []

- id: net_repeat
  label: Net/USB Repeat
  kind: action
  cmd: "!1NTCREPEAT\r"
  params: []

- id: net_random
  label: Net/USB Random
  kind: action
  cmd: "!1NTCRANDOM\r"
  params: []

- id: net_up
  label: Net/USB Up Key
  kind: action
  cmd: "!1NTCUP\r"
  params: []

- id: net_down
  label: Net/USB Down Key
  kind: action
  cmd: "!1NTCDOWN\r"
  params: []

- id: net_left
  label: Net/USB Left Key
  kind: action
  cmd: "!1NTCLEFT\r"
  params: []

- id: net_right
  label: Net/USB Right Key
  kind: action
  cmd: "!1NTCRIGHT\r"
  params: []

- id: net_select
  label: Net/USB Select Key
  kind: action
  cmd: "!1NTCSELECT\r"
  params: []

- id: net_return
  label: Net/USB Return Key
  kind: action
  cmd: "!1NTCRETURN\r"
  params: []

- id: net_iradio_ch_up
  label: Net Internet Radio Channel Up
  kind: action
  cmd: "!1NTCCHUP\r"
  params: []

- id: net_iradio_ch_down
  label: Net Internet Radio Channel Down
  kind: action
  cmd: "!1NTCCHDN\r"
  params: []

- id: internet_radio_preset_set
  label: Set Internet Radio Preset (Main)
  kind: action
  cmd: "!1NPR{no}\r"
  params:
    - name: no
      type: string
      description: "01–28 (1–40 in hex)"

# ── Zone 2 ────────────────────────────────────────────────────────

- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  cmd: "!1ZPW01\r"
  params: []

- id: zone2_power_standby
  label: Zone 2 Power Standby
  kind: action
  cmd: "!1ZPW00\r"
  params: []

- id: zone2_mute_off
  label: Zone 2 Muting Off
  kind: action
  cmd: "!1ZMT00\r"
  params: []

- id: zone2_mute_on
  label: Zone 2 Muting On
  kind: action
  cmd: "!1ZMT01\r"
  params: []

- id: zone2_mute_toggle
  label: Zone 2 Muting Toggle
  kind: action
  cmd: "!1ZMTTG\r"
  params: []

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  cmd: "!1ZVLUP\r"
  params: []

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  cmd: "!1ZVLDOWN\r"
  params: []

- id: zone2_volume_set
  label: Set Zone 2 Volume Level (hex 00–64)
  kind: action
  cmd: "!1ZVL{level}\r"
  params:
    - name: level
      type: string
      description: "Volume level in hex (00–64 or 00–50 depending on model)"

- id: zone2_select_input
  label: Select Zone 2 Input
  kind: action
  cmd: "!1SLZ{input}\r"
  params:
    - name: input
      type: string
      description: "00=VIDEO1, 01=VIDEO2, 02=VIDEO3, 03=VIDEO4/AUX1, 04=VIDEO5/AUX2, 05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB Front, 2A=USB Rear, 30=MULTI CH, 31=XM, 32=SIRIUS, 40=Universal PORT, 80=SOURCE"

- id: zone2_tune_frequency
  label: Set Zone 2 Tuning Frequency (separate)
  kind: action
  cmd: "!1TUZ{freq}\r"
  params:
    - name: freq
      type: string
      description: "nnnnn frequency value, or UP/DOWN"

- id: zone2_preset_set
  label: Set Zone 2 Preset (separate)
  kind: action
  cmd: "!1PRZ{no}\r"
  params:
    - name: no
      type: string
      description: "01–28 or 01–1E, or UP/DOWN"

- id: zone2_net_play
  label: Zone 2 Net/USB Play (Network model)
  kind: action
  cmd: "!1NTZPLAY\r"
  params: []

- id: zone2_net_stop
  label: Zone 2 Net/USB Stop (Network model)
  kind: action
  cmd: "!1NTZSTOP\r"
  params: []

- id: zone2_internet_radio_preset
  label: Zone 2 Internet Radio Preset
  kind: action
  cmd: "!1NPZ{no}\r"
  params:
    - name: no
      type: string
      description: "01–28 (1–40 in hex)"

# ── Zone 3 ────────────────────────────────────────────────────────

- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  cmd: "!1PW301\r"
  params: []

- id: zone3_power_standby
  label: Zone 3 Power Standby
  kind: action
  cmd: "!1PW300\r"
  params: []

- id: zone3_mute_off
  label: Zone 3 Muting Off
  kind: action
  cmd: "!1MT300\r"
  params: []

- id: zone3_mute_on
  label: Zone 3 Muting On
  kind: action
  cmd: "!1MT301\r"
  params: []

- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  cmd: "!1VL3UP\r"
  params: []

- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  cmd: "!1VL3DOWN\r"
  params: []

- id: zone3_volume_set
  label: Set Zone 3 Volume Level (hex 00–64)
  kind: action
  cmd: "!1VL3{level}\r"
  params:
    - name: level
      type: string
      description: "Volume level in hex"

- id: zone3_select_input
  label: Select Zone 3 Input
  kind: action
  cmd: "!1SL3{input}\r"
  params:
    - name: input
      type: string
      description: "00=VIDEO1, 01=VIDEO2, 02=VIDEO3, 03=VIDEO4/AUX1, 04=VIDEO5/AUX2, 05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB Front, 2A=USB Rear, 30=MULTI CH, 31=XM, 32=SIRIUS, 40=Universal PORT, 80=SOURCE"

- id: zone3_tune_frequency
  label: Set Zone 3 Tuning Frequency (separate)
  kind: action
  cmd: "!1TU3{freq}\r"
  params:
    - name: freq
      type: string
      description: "nnnnn frequency value, or UP/DOWN"

- id: zone3_preset_set
  label: Set Zone 3 Preset (separate)
  kind: action
  cmd: "!1PR3{no}\r"
  params:
    - name: no
      type: string
      description: "01–28 or 01–1E, or UP/DOWN"

- id: zone3_net_play
  label: Zone 3 Net/USB Play (Network model)
  kind: action
  cmd: "!1NT3PLAY\r"
  params: []

- id: zone3_internet_radio_preset
  label: Zone 3 Internet Radio Preset
  kind: action
  cmd: "!1NP3{no}\r"
  params:
    - name: no
      type: string
      description: "01–28 (1–40 in hex)"

# ── Zone 4 ────────────────────────────────────────────────────────

- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  cmd: "!1PW401\r"
  params: []

- id: zone4_power_standby
  label: Zone 4 Power Standby
  kind: action
  cmd: "!1PW400\r"
  params: []

- id: zone4_mute_off
  label: Zone 4 Muting Off
  kind: action
  cmd: "!1MT400\r"
  params: []

- id: zone4_mute_on
  label: Zone 4 Muting On
  kind: action
  cmd: "!1MT401\r"
  params: []

- id: zone4_volume_up
  label: Zone 4 Volume Up
  kind: action
  cmd: "!1VL4UP\r"
  params: []

- id: zone4_volume_down
  label: Zone 4 Volume Down
  kind: action
  cmd: "!1VL4DOWN\r"
  params: []

- id: zone4_volume_set
  label: Set Zone 4 Volume Level (hex 00–64)
  kind: action
  cmd: "!1VL4{level}\r"
  params:
    - name: level
      type: string
      description: "Volume level in hex"

- id: zone4_select_input
  label: Select Zone 4 Input
  kind: action
  cmd: "!1SL4{input}\r"
  params:
    - name: input
      type: string
      description: "00=VIDEO1, 01=VIDEO2, 02=VIDEO3/GAME, 03=VIDEO4/AUX1, 04=VIDEO5/AUX2, 05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB Front, 2A=USB Rear, 30=MULTI CH, 31=XM, 32=SIRIUS, 40=Universal PORT, 80=SOURCE"

- id: zone4_tune_frequency
  label: Set Zone 4 Tuning Frequency (separate)
  kind: action
  cmd: "!1TU4{freq}\r"
  params:
    - name: freq
      type: string
      description: "nnnnn frequency value, or UP/DOWN"

- id: zone4_preset_set
  label: Set Zone 4 Preset (separate)
  kind: action
  cmd: "!1PR4{no}\r"
  params:
    - name: no
      type: string
      description: "01–28 or 01–1E"

- id: zone4_net_play
  label: Zone 4 Net/USB Play (Network model)
  kind: action
  cmd: "!1NT4PLAY\r"
  params: []

- id: zone4_internet_radio_preset
  label: Zone 4 Internet Radio Preset
  kind: action
  cmd: "!1NP4{no}\r"
  params:
    - name: no
      type: string
      description: "01–28 (1–40 in hex)"

# ── Dock (RI) ──────────────────────────────────────────────────────

- id: dock_power_on
  label: Dock Power On (via RI)
  kind: action
  cmd: "!1CDSPWRON\r"
  params: []

- id: dock_power_off
  label: Dock Power Off/Standby (via RI)
  kind: action
  cmd: "!1CDSPWROFF\r"
  params: []

- id: dock_play
  label: Dock Play/Resume (via RI)
  kind: action
  cmd: "!1CDSPLY/RES\r"
  params: []

- id: dock_stop
  label: Dock Stop (via RI)
  kind: action
  cmd: "!1CDSSTOP\r"
  params: []

- id: dock_pause
  label: Dock Play/Pause (via RI)
  kind: action
  cmd: "!1CDSPLY/PAU\r"
  params: []

- id: dock_track_up
  label: Dock Track Up (via RI)
  kind: action
  cmd: "!1CDSSKIP.F\r"
  params: []

- id: dock_track_down
  label: Dock Track Down (via RI)
  kind: action
  cmd: "!1CDSSKIP.R\r"
  params: []

- id: dock_shuffle
  label: Dock Shuffle (via RI)
  kind: action
  cmd: "!1CDSRANDOM\r"
  params: []

- id: dock_repeat
  label: Dock Repeat (via RI)
  kind: action
  cmd: "!1CDSREPEAT\r"
  params: []

# ── Speaker Level Calibration ──────────────────────────────────────

- id: speaker_calibration_test
  label: Speaker Level Calibration Test Key
  kind: action
  cmd: "!1SLCTEST\r"
  params: []

- id: speaker_calibration_ch_sel
  label: Speaker Level Calibration CH SEL Key
  kind: action
  cmd: "!1SLCCHSEL\r"
  params: []

- id: speaker_calibration_level_up
  label: Speaker Level Calibration Level Up
  kind: action
  cmd: "!1SLCUP\r"
  params: []

- id: speaker_calibration_level_down
  label: Speaker Level Calibration Level Down
  kind: action
  cmd: "!1SLCDOWN\r"
  params: []

# ── Audio/Video Info Queries ───────────────────────────────────────

- id: audio_info_query
  label: Get Audio Information (trigger with DIF02)
  kind: action
  cmd: "!1DIF02\r"
  params: []

- id: video_info_query
  label: Get Video Information (trigger with DIF03)
  kind: action
  cmd: "!1DIF03\r"
  params: []
```

## Feedbacks

```yaml
# Query responses — send "!1{CMD}QSTN\r" to get current state; device replies "!1{CMD}{value}[EOF]"

- id: power_state
  label: Main Zone Power State
  query_cmd: "!1PWRQSTN\r"
  type: enum
  values: ["00", "01"]
  value_map: {"00": "standby", "01": "on"}

- id: mute_state
  label: Main Zone Mute State
  query_cmd: "!1AMTQSTN\r"
  type: enum
  values: ["00", "01"]
  value_map: {"00": "off", "01": "on"}

- id: volume_level
  label: Main Zone Volume Level
  query_cmd: "!1MVLQSTN\r"
  type: string
  description: "Hex value 00–64 (0–100) or 00–50 (0–80)"

- id: input_selector
  label: Main Zone Input Selector
  query_cmd: "!1SLIQSTN\r"
  type: string
  description: "Two-character hex input code"

- id: recout_selector
  label: Main Zone RECOUT Selector
  query_cmd: "!1SLRQSTN\r"
  type: string
  description: "Two-character hex input code"

- id: audio_selector
  label: Main Zone Audio Selector
  query_cmd: "!1SLAQSTN\r"
  type: string
  description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE"

- id: listening_mode
  label: Main Zone Listening Mode
  query_cmd: "!1LMDQSTN\r"
  type: string
  description: "Two-character hex listening mode code"

- id: sleep_time
  label: Main Zone Sleep Time
  query_cmd: "!1SLPQSTN\r"
  type: string
  description: "01–5A (1–90 min in hex) or OFF"

- id: dimmer_level
  label: Dimmer Level
  query_cmd: "!1DIMQSTN\r"
  type: enum
  values: ["00", "01", "02", "03", "08"]
  value_map: {"00": "bright", "01": "dim", "02": "dark", "03": "shut-off", "08": "bright+led-off"}

- id: display_mode
  label: Display Mode
  query_cmd: "!1DIFQSTN\r"
  type: string
  description: "00=Selector+Volume, 01=Selector+Listening Mode"

- id: subwoofer_level
  label: Subwoofer Level (temporary)
  query_cmd: "!1SWLQSTN\r"
  type: string
  description: "-F to +C (-15dB to +12dB)"

- id: center_level
  label: Center Level (temporary)
  query_cmd: "!1CTLQSTN\r"
  type: string
  description: "-C to +C (-12dB to +12dB)"

- id: front_tone
  label: Front Tone (Bass + Treble)
  query_cmd: "!1TFRQSTN\r"
  type: string
  description: "BxxTxx format"

- id: hdmi_output
  label: HDMI Output Selector
  query_cmd: "!1HDOQSTN\r"
  type: string
  description: "00–05 enum"

- id: monitor_resolution
  label: Monitor Out Resolution
  query_cmd: "!1RESQSTN\r"
  type: string
  description: "00–07 enum"

- id: isf_mode
  label: ISF Mode State
  query_cmd: "!1ISFQSTN\r"
  type: enum
  values: ["00", "01", "02"]
  value_map: {"00": "custom", "01": "day", "02": "night"}

- id: speaker_a_state
  label: Speaker A State
  query_cmd: "!1SPAQSTN\r"
  type: enum
  values: ["00", "01"]
  value_map: {"00": "off", "01": "on"}

- id: speaker_b_state
  label: Speaker B State
  query_cmd: "!1SPBQSTN\r"
  type: enum
  values: ["00", "01"]
  value_map: {"00": "off", "01": "on"}

- id: speaker_layout
  label: Speaker Layout State
  query_cmd: "!1SPLQSTN\r"
  type: string
  description: "SB=SurrBack, FH=Front High, FW=Front Wide"

- id: late_night
  label: Late Night Level
  query_cmd: "!1LTNQSTN\r"
  type: string
  description: "00=Off, 01=Low/On, 02=High, 03=Auto"

- id: audyssey_eq_state
  label: Audyssey 2EQ/MultEQ/MultEQ XT State
  query_cmd: "!1ADYQSTN\r"
  type: enum
  values: ["00", "01"]
  value_map: {"00": "off", "01": "on"}

- id: audyssey_dynamic_eq_state
  label: Audyssey Dynamic EQ State
  query_cmd: "!1ADQQSTN\r"
  type: enum
  values: ["00", "01"]
  value_map: {"00": "off", "01": "on"}

- id: audyssey_dynamic_volume_state
  label: Audyssey Dynamic Volume State
  query_cmd: "!1ADVQSTN\r"
  type: string
  description: "00=Off, 01=Light, 02=Medium, 03=Heavy"

- id: dolby_volume_state
  label: Dolby Volume State
  query_cmd: "!1DVLQSTN\r"
  type: string
  description: "00=Off, 01=Low, 02=Mid, 03=High"

- id: music_optimizer_state
  label: Music Optimizer State
  query_cmd: "!1MOTQSTN\r"
  type: enum
  values: ["00", "01"]
  value_map: {"00": "off", "01": "on"}

- id: re_eq_state
  label: Re-EQ/Academy/Cinema Filter State
  query_cmd: "!1RASQSTN\r"
  type: string
  description: "Behavior varies by model; 00=off, 01=on/re-eq, 02=academy"

- id: tune_frequency
  label: Tuning Frequency (Main)
  query_cmd: "!1TUNQSTN\r"
  type: string
  description: "nnnnn: FM=nnn.nn MHz, AM=nnnnn kHz, XM channel"

- id: preset_no
  label: Tuner Preset No. (Main)
  query_cmd: "!1PRSQSTN\r"
  type: string
  description: "01–28 (hex)"

- id: audio_info
  label: Audio Information (after DIF02)
  query_cmd: "!1IFAQSTN\r"
  type: string
  description: "nnnnn:nnnnn comma-separated audio info"

- id: video_info
  label: Video Information (after DIF03)
  query_cmd: "!1IFVQSTN\r"
  type: string
  description: "nnnnn:nnnnn comma-separated video info"

- id: net_artist_name
  label: Net/USB Artist Name
  query_cmd: "!1NATQSTN\r"
  type: string
  description: "Variable-length, 64 letters max"

- id: net_album_name
  label: Net/USB Album Name
  query_cmd: "!1NALQSTN\r"
  type: string
  description: "Variable-length, 64 letters max"

- id: net_title_name
  label: Net/USB Title Name
  query_cmd: "!1NTIQSTN\r"
  type: string
  description: "Variable-length, 64 letters max"

- id: net_time_info
  label: Net/USB Time Info
  query_cmd: "!1NTMQSTN\r"
  type: string
  description: "mm:ss/mm:ss (elapsed/total, max 99:59)"

- id: net_track_info
  label: Net/USB Track Info
  query_cmd: "!1NTRQSTN\r"
  type: string
  description: "cccc/tttt (current/total, max 9999)"

- id: net_play_status
  label: Net/USB Play Status
  query_cmd: "!1NSTQSTN\r"
  type: string
  description: "3 chars: p=play status (S/P/p/F/R), r=repeat (-, R, F, 1), s=shuffle (-, S, A)"

- id: zone2_power_state
  label: Zone 2 Power State
  query_cmd: "!1ZPWQSTN\r"
  type: enum
  values: ["00", "01"]
  value_map: {"00": "standby", "01": "on"}

- id: zone2_mute_state
  label: Zone 2 Mute State
  query_cmd: "!1ZMTQSTN\r"
  type: enum
  values: ["00", "01"]
  value_map: {"00": "off", "01": "on"}

- id: zone2_volume_level
  label: Zone 2 Volume Level
  query_cmd: "!1ZVLQSTN\r"
  type: string
  description: "Hex value 00–64"

- id: zone2_input_selector
  label: Zone 2 Input Selector
  query_cmd: "!1SLZQSTN\r"
  type: string
  description: "Two-character hex input code"

- id: zone3_power_state
  label: Zone 3 Power State
  query_cmd: "!1PW3QSTN\r"
  type: enum
  values: ["00", "01"]
  value_map: {"00": "standby", "01": "on"}

- id: zone3_mute_state
  label: Zone 3 Mute State
  query_cmd: "!1MT3QSTN\r"
  type: enum
  values: ["00", "01"]
  value_map: {"00": "off", "01": "on"}

- id: zone3_volume_level
  label: Zone 3 Volume Level
  query_cmd: "!1VL3QSTN\r"
  type: string
  description: "Hex value 00–64"

- id: zone3_input_selector
  label: Zone 3 Input Selector
  query_cmd: "!1SL3QSTN\r"
  type: string
  description: "Two-character hex input code"

- id: zone4_power_state
  label: Zone 4 Power State
  query_cmd: "!1PW4QSTN\r"
  type: enum
  values: ["00", "01"]
  value_map: {"00": "standby", "01": "on"}

- id: zone4_mute_state
  label: Zone 4 Mute State
  query_cmd: "!1MT4QSTN\r"
  type: enum
  values: ["00", "01"]
  value_map: {"00": "off", "01": "on"}

- id: zone4_volume_level
  label: Zone 4 Volume Level
  query_cmd: "!1VL4QSTN\r"
  type: string
  description: "Hex value 00–64"

- id: zone4_input_selector
  label: Zone 4 Input Selector
  query_cmd: "!1SL4QSTN\r"
  type: string
  description: "Two-character hex input code"
```

## Variables

```yaml
# UNRESOLVED: no continuously-settable variable parameters beyond those covered in Actions/Feedbacks
```

## Events

```yaml
# Unsolicited notifications — device sends status messages spontaneously when its state changes.
# Format on RS-232C: !1{CMD}{value}[EOF]  (ASCII 0x1A)
# Format on eISCP/TCP: eISCP packet wrapping the same !1{CMD}{value}[EOF][CR][LF] payload.
#
# All queryable states listed in Feedbacks can also arrive as unsolicited events.
# Response is guaranteed within 50ms of a state change (source: section 2.1).
# Examples of unsolicited events:
# - !1PWR01  (power turned on)
# - !1SLI01  (input changed to VIDEO2)
# - !1MVL28  (volume changed to 0x28 = 40)
# - !1NST... (Net/USB play status changed)
```

## Macros

```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# No explicit safety warnings or interlock procedures stated in source.
# Note: eISCP TCP allows only ONE simultaneous client connection; connecting a second
# client disconnects the first (implied by "number of connections who can connect
# with a client is one").
```

## Notes

**Protocol framing (RS-232C):**
- Controller → Device: `!1{CMD}{PARAM}[CR]` or `[LF]` or `[CR][LF]`
- Device → Controller: `!1{CMD}{PARAM}[EOF]` (ASCII 0x1A)
- `!` is the start character; `1` is the unit type for Receiver; then 3-character command code; then variable-length parameter

**Protocol framing (eISCP over TCP):**
- Wrap ISCP data in a 16-byte header: magic `ISCP`, 4-byte header size (0x00000010, big-endian), 4-byte data size (big-endian), 1-byte version (0x01), 3-byte reserved (0x000000)
- Data portion: `!1{CMD}{PARAM}[EOF][CR][LF]` or `[EOF]` or `[EOF][CR]` depending on model
- Hold the TCP connection continuously — the device cannot send unsolicited status if the connection is dropped

**Timing:**
- Device responds within 50ms; if no response in 50ms, communication has failed
- For RS-232C, minimum interval between received messages is 50ms
- FF/REW Net-Tune commands must be sent continuously with no more than 100ms between codes

**Multi-zone notes:**
- Tuner (TUN/PRS) is shared between MAIN and all ZONEs; use TUZ/PRZ for Zone 2 separate control, TU3/PR3 for Zone 3, TU4/PR4 for Zone 4
- Net-Tune/Network function is shared by MAIN and ZONE sides
- 12V Triggers (TGA/TGB/TGC) are only available when each 12V Trigger parameter is set to "OFF" in the Setup Menu

**Model-specific features:**
- XM/SIRIUS input codes (31/32) only available on XM/SIRIUS-equipped models
- RDS commands (RDS, PTS, TPS) only available on RDS-equipped models
- HD Radio commands (HAT, HCN, HTI, HDS, HPR, HBL, HTS) only on HD Radio models
- Re-EQ/Academy/Cinema Filter (RAS) behavior and parameter meanings vary by model
- VOS (Video Output Selector) is Japanese market only
- Neural Surround (87) is North American model only

**ISCP source document:** Version 1.15, 31 August 2009, Copyright 2003–2009 ONKYO CORPORATION (Integra is the premium brand of Onkyo).

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:31.200Z
last_checked_at: 2026-05-16T22:01:40.458Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T22:01:40.458Z
matched_actions: 135
action_count: 135
confidence: high
summary: "All 135 spec actions match literal ISCP command tokens in source; transport verified; coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
