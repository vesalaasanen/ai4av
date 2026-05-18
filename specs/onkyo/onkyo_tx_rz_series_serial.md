---
spec_id: admin/onkyo-tx-rz-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-RZ Series Control Spec"
manufacturer: Onkyo
model_family: "TX-RZ Series"
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - "TX-RZ Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-04T16:23:20.505Z
last_checked_at: 2026-05-16T23:46:32.077Z
generated_at: 2026-05-16T23:46:32.077Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T23:46:32.077Z
  matched_actions: 139
  action_count: 139
  confidence: high
  summary: "All 139 spec action-units matched cleanly; transport parameters verified in source; ISCP 1.15 protocol fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Onkyo TX-RZ Series Control Spec

## Summary

The Onkyo TX-RZ Series consists of AV receivers controlled via the ISCP (Integra Serial Control Protocol). This spec covers both RS-232C serial control and Ethernet-based eISCP (TCP) control. Commands are ASCII-framed with a fixed 3-character command code followed by variable-length parameters; the protocol supports bidirectional communication with unsolicited status notifications from the device.

<!-- UNRESOLVED: specific TX-RZ model numbers are not enumerated in the source; the document applies to Onkyo AV receivers generally with ISCP version 1.15. Firmware version compatibility not stated. -->

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
  port: 60128
auth:
  type: none  # inferred: no auth procedure in source
```

### Protocol framing notes

**RS-232C (ISCP over RS-232C):**
- 9-pin female D-type connector; pin 2 = transmit, pin 3 = receive, pin 5 = signal ground
- Use a straight-through cable to connect to a PC
- Controller→Device message format: `!1<CMD><PARAM>[CR]` (start char `!`, unit type `1`, 3-char command, variable param, terminated with CR, LF, or CR+LF)
- Device→Controller message format: `!1<CMD><PARAM>[EOF]` (terminated with ASCII 0x1A)
- Special characters: `[CR]` = 0x0D, `[LF]` = 0x0A, `[EOF]` = 0x1A

**Ethernet (eISCP over TCP):**
- Default port: 60128; configurable 49152–65535 via receiver setup menu
- eISCP packet = 16-byte header (`ISCP` + header size 0x10 + data size big-endian + version 0x01 + 3 reserved bytes) followed by eISCP data
- eISCP data format: `!1<CMD><PARAM>[EOF]` (optionally followed by CR/LF depending on model)
- Receiver accepts only one simultaneous TCP connection
- Messages must be spaced at least 50 ms apart
- Receiver sends unsolicited status messages when state changes

## Traits

```yaml
- powerable       # inferred from power command examples (PWR, ZPW, PW3, PW4)
- routable        # inferred from routing command examples (SLI, ZSL, SL3, SL4, SLA, HDO)
- queryable       # inferred from query command examples (QSTN parameter on most commands)
- levelable       # inferred from volume/tone commands (MVL, ZVL, VL3, VL4, TFR, etc.)
```

## Actions

```yaml
# ── MAIN ZONE — Power ──────────────────────────────────────────────────────
- id: power_standby
  label: System Standby
  kind: action
  params: []
  notes: "Send: !1PWR00[CR]"

- id: power_on
  label: System Power On
  kind: action
  params: []
  notes: "Send: !1PWR01[CR]"

# ── MAIN ZONE — Audio Muting ───────────────────────────────────────────────
- id: mute_off
  label: Audio Muting Off
  kind: action
  params: []
  notes: "Send: !1AMT00[CR]"

- id: mute_on
  label: Audio Muting On
  kind: action
  params: []
  notes: "Send: !1AMT01[CR]"

- id: mute_toggle
  label: Audio Muting Toggle
  kind: action
  params: []
  notes: "Send: !1AMTTG[CR]"

# ── MAIN ZONE — Master Volume ──────────────────────────────────────────────
- id: volume_set
  label: Set Master Volume Level
  kind: action
  params:
    - name: level
      type: string
      description: "Hex level 00-64 (0-100) or 00-50 (0-80 on some models)"
  notes: "Send: !1MVL<level>[CR]"

- id: volume_up
  label: Volume Up
  kind: action
  params: []
  notes: "Send: !1MVLUP[CR]"

- id: volume_down
  label: Volume Down
  kind: action
  params: []
  notes: "Send: !1MVLDOWN[CR]"

- id: volume_up_1db
  label: Volume Up 1dB Step
  kind: action
  params: []
  notes: "Send: !1MVLUP1[CR]"

- id: volume_down_1db
  label: Volume Down 1dB Step
  kind: action
  params: []
  notes: "Send: !1MVLDOWN1[CR]"

# ── MAIN ZONE — Input Selector ─────────────────────────────────────────────
- id: input_select
  label: Select Input
  kind: action
  params:
    - name: input_code
      type: string
      description: "Input code: 00=VIDEO1/VCR, 01=VIDEO2/CBL/SAT, 02=VIDEO3/GAME, 03=VIDEO4/AUX1, 04=VIDEO5/AUX2, 05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB(Front), 2A=USB(Rear), 40=Universal PORT, 30=MULTI CH, 31=XM, 32=SIRIUS"
  notes: "Send: !1SLI<input_code>[CR]"

- id: input_up
  label: Input Selector Up
  kind: action
  params: []
  notes: "Send: !1SLIUP[CR]"

- id: input_down
  label: Input Selector Down
  kind: action
  params: []
  notes: "Send: !1SLIDOWN[CR]"

# ── MAIN ZONE — Audio Selector ─────────────────────────────────────────────
- id: audio_selector_set
  label: Set Audio Selector
  kind: action
  params:
    - name: mode
      type: string
      description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE"
  notes: "Send: !1SLA<mode>[CR]"

- id: audio_selector_up
  label: Audio Selector Wrap-Around Up
  kind: action
  params: []
  notes: "Send: !1SLAUP[CR]"

# ── MAIN ZONE — Speaker A/B ────────────────────────────────────────────────
- id: speaker_a_off
  label: Speaker A Off
  kind: action
  params: []
  notes: "Send: !1SPA00[CR]"

- id: speaker_a_on
  label: Speaker A On
  kind: action
  params: []
  notes: "Send: !1SPA01[CR]"

- id: speaker_b_off
  label: Speaker B Off
  kind: action
  params: []
  notes: "Send: !1SPB00[CR]"

- id: speaker_b_on
  label: Speaker B On
  kind: action
  params: []
  notes: "Send: !1SPB01[CR]"

# ── MAIN ZONE — Speaker Layout ─────────────────────────────────────────────
- id: speaker_layout_set
  label: Set Speaker Layout
  kind: action
  params:
    - name: layout
      type: string
      description: "SB=SurrBack, FH=Front High, FW=Front Wide, UP=Wrap-Around"
  notes: "Send: !1SPL<layout>[CR]"

# ── MAIN ZONE — Listening Mode ─────────────────────────────────────────────
- id: listening_mode_set
  label: Set Listening Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "Hex code; see Notes for full list (00=STEREO, 01=DIRECT, 02=SURROUND, 03=FILM, 04=THX, 05=ACTION, 06=MUSICAL, 07=MONO MOVIE, 08=ORCHESTRA, 09=UNPLUGGED, 0A=STUDIO-MIX, 0B=TV LOGIC, 0C=ALL CH STEREO, 0D=THEATER-DIMENSIONAL, 0E=ENHANCED 7, 0F=MONO, 11=PURE AUDIO, 12=MULTIPLEX, 13=FULL MONO, 14=DOLBY VIRTUAL, 15=DTS Surround Sensation, 16=Audyssey DSX, 40=5.1ch Surround, 41=Dolby EX/DTS ES, 42=THX Cinema, 43=THX Surround EX, 44=THX Music, 45=THX Games, 50=U2/S2 Cinema, 51=U2/S2 Music, 52=U2/S2 Games, 80=PLII Movie, 81=PLII Music, 82=Neo:6 Cinema, 83=Neo:6 Music, 84=PLII THX Cinema, 85=Neo:6 THX Cinema, 86=PLII Game, 87=Neural Surr, 88=Neural THX, 89=PLII THX Games, 8A=Neo:6 THX Games, 8B=PLII THX Music, 8C=Neo:6 THX Music, 8D=Neural THX Cinema, 8E=Neural THX Music, 8F=Neural THX Games, 90=PLIIz Height, 91=Neo:6 Cinema DTS, 92=Neo:6 Music DTS, 93=Neural Digital Music, 94-99=PLIIz+THX variants, A0-A7=Audyssey DSX variants)"
  notes: "Send: !1LMD<mode>[CR]"

- id: listening_mode_up
  label: Listening Mode Wrap-Around Up
  kind: action
  params: []
  notes: "Send: !1LMDUP[CR]"

- id: listening_mode_down
  label: Listening Mode Wrap-Around Down
  kind: action
  params: []
  notes: "Send: !1LMDDOWN[CR]"

- id: listening_mode_movie
  label: Listening Mode Movie Wrap
  kind: action
  params: []
  notes: "Send: !1LMDMOVIE[CR]"

- id: listening_mode_music
  label: Listening Mode Music Wrap
  kind: action
  params: []
  notes: "Send: !1LMDMUSIC[CR]"

- id: listening_mode_game
  label: Listening Mode Game Wrap
  kind: action
  params: []
  notes: "Send: !1LMDGAME[CR]"

# ── MAIN ZONE — Tone Controls ──────────────────────────────────────────────
- id: tone_front_set
  label: Set Front Tone (Bass/Treble)
  kind: action
  params:
    - name: value
      type: string
      description: "Bxx for bass (-A to +A = -10 to +10 in 2-step), Txx for treble, BUP, BDOWN, TUP, TDOWN for increment"
  notes: "Send: !1TFR<value>[CR]"

- id: tone_center_set
  label: Set Center Tone
  kind: action
  params:
    - name: value
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
  notes: "Send: !1TCT<value>[CR]"

- id: tone_surround_set
  label: Set Surround Tone
  kind: action
  params:
    - name: value
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
  notes: "Send: !1TSR<value>[CR]"

- id: tone_surround_back_set
  label: Set Surround Back Tone
  kind: action
  params:
    - name: value
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
  notes: "Send: !1TSB<value>[CR]"

- id: tone_subwoofer_set
  label: Set Subwoofer Tone
  kind: action
  params:
    - name: value
      type: string
      description: "Bxx, BUP, BDOWN"
  notes: "Send: !1TSW<value>[CR]"

- id: tone_front_wide_set
  label: Set Front Wide Tone
  kind: action
  params:
    - name: value
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
  notes: "Send: !1TFW<value>[CR]"

- id: tone_front_high_set
  label: Set Front High Tone
  kind: action
  params:
    - name: value
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
  notes: "Send: !1TFH<value>[CR]"

# ── MAIN ZONE — Subwoofer Level ────────────────────────────────────────────
- id: subwoofer_level_set
  label: Set Subwoofer Level (temporary)
  kind: action
  params:
    - name: level
      type: string
      description: "-F to +C (-15dB to +12dB), UP, DOWN"
  notes: "Send: !1SWL<level>[CR]"

- id: center_level_set
  label: Set Center Level (temporary)
  kind: action
  params:
    - name: level
      type: string
      description: "-C to +C (-12dB to +12dB), UP, DOWN"
  notes: "Send: !1CTL<level>[CR]"

# ── MAIN ZONE — Sleep ──────────────────────────────────────────────────────
- id: sleep_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: time
      type: string
      description: "01-5A = 1-90 minutes (hex), OFF = disable, UP = wrap-around"
  notes: "Send: !1SLP<time>[CR]"

# ── MAIN ZONE — Dimmer ─────────────────────────────────────────────────────
- id: dimmer_set
  label: Set Dimmer Level
  kind: action
  params:
    - name: level
      type: string
      description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright+LED OFF, DIM=wrap-around"
  notes: "Send: !1DIM<level>[CR]"

# ── MAIN ZONE — Display ────────────────────────────────────────────────────
- id: display_mode_set
  label: Set Display Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "00=Selector+Volume, 01=Selector+Listening Mode, 02=Digital Format (temporary), 03=Video Format (temporary), TG=wrap-around"
  notes: "Send: !1DIF<mode>[CR]"

# ── MAIN ZONE — HDMI Output ────────────────────────────────────────────────
- id: hdmi_output_set
  label: Set HDMI Output
  kind: action
  params:
    - name: mode
      type: string
      description: "00=No/Analog, 01=Yes/Out Main/HDMI Main, 02=Out Sub/HDMI Sub, 03=Both, 04=Both(Main), 05=Both(Sub), UP=wrap-around"
  notes: "Send: !1HDO<mode>[CR]"

# ── MAIN ZONE — Monitor Resolution ────────────────────────────────────────
- id: monitor_resolution_set
  label: Set Monitor Out Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: "00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p, 07=1080p/24fs, 06=Source, UP=wrap-around"
  notes: "Send: !1RES<resolution>[CR]"

# ── MAIN ZONE — ISF Mode ──────────────────────────────────────────────────
- id: isf_mode_set
  label: Set ISF Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "00=Custom, 01=Day, 02=Night, UP=wrap-around"
  notes: "Send: !1ISF<mode>[CR]"

# ── MAIN ZONE — 12V Triggers ──────────────────────────────────────────────
- id: trigger_a_set
  label: Set 12V Trigger A
  kind: action
  params:
    - name: state
      type: string
      description: "00=Off, 01=On"
  notes: "Send: !1TGA<state>[CR]; only available when 12V Trigger parameter is OFF in Setup Menu"

- id: trigger_b_set
  label: Set 12V Trigger B
  kind: action
  params:
    - name: state
      type: string
      description: "00=Off, 01=On"
  notes: "Send: !1TGB<state>[CR]"

- id: trigger_c_set
  label: Set 12V Trigger C
  kind: action
  params:
    - name: state
      type: string
      description: "00=Off, 01=On"
  notes: "Send: !1TGC<state>[CR]"

# ── MAIN ZONE — OSD Navigation ────────────────────────────────────────────
- id: osd_menu
  label: OSD Menu Key
  kind: action
  params: []
  notes: "Send: !1OSDMENU[CR]"

- id: osd_up
  label: OSD Up Key
  kind: action
  params: []
  notes: "Send: !1OSDUP[CR]"

- id: osd_down
  label: OSD Down Key
  kind: action
  params: []
  notes: "Send: !1OSDDOWN[CR]"

- id: osd_right
  label: OSD Right Key
  kind: action
  params: []
  notes: "Send: !1OSDRIGHT[CR]"

- id: osd_left
  label: OSD Left Key
  kind: action
  params: []
  notes: "Send: !1OSDLEFT[CR]"

- id: osd_enter
  label: OSD Enter Key
  kind: action
  params: []
  notes: "Send: !1OSDENTER[CR]"

- id: osd_exit
  label: OSD Exit Key
  kind: action
  params: []
  notes: "Send: !1OSDEXIT[CR]"

- id: osd_audio
  label: OSD Audio Adjust Key
  kind: action
  params: []
  notes: "Send: !1OSDAUDIO[CR]"

- id: osd_video
  label: OSD Video Adjust Key
  kind: action
  params: []
  notes: "Send: !1OSDVIDEO[CR]"

# ── MAIN ZONE — Memory ────────────────────────────────────────────────────
- id: memory_store
  label: Store Memory
  kind: action
  params: []
  notes: "Send: !1MEMSTR[CR]"

- id: memory_recall
  label: Recall Memory
  kind: action
  params: []
  notes: "Send: !1MEMRCL[CR]"

- id: memory_lock
  label: Lock Memory
  kind: action
  params: []
  notes: "Send: !1MEMLOCK[CR]"

- id: memory_unlock
  label: Unlock Memory
  kind: action
  params: []
  notes: "Send: !1MEMUNLK[CR]"

# ── MAIN ZONE — Audyssey ──────────────────────────────────────────────────
- id: audyssey_multieq_set
  label: Set Audyssey 2EQ/MultEQ/MultEQ XT
  kind: action
  params:
    - name: state
      type: string
      description: "00=Off, 01=On, UP=wrap-around"
  notes: "Send: !1ADY<state>[CR]"

- id: audyssey_dynamic_eq_set
  label: Set Audyssey Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "00=Off, 01=On, UP=wrap-around"
  notes: "Send: !1ADQ<state>[CR]"

- id: audyssey_dynamic_volume_set
  label: Set Audyssey Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: "00=Off, 01=Light, 02=Medium, 03=Heavy, UP=wrap-around"
  notes: "Send: !1ADV<level>[CR]"

# ── MAIN ZONE — Dolby Volume ──────────────────────────────────────────────
- id: dolby_volume_set
  label: Set Dolby Volume
  kind: action
  params:
    - name: level
      type: string
      description: "00=Off, 01=Low, 02=Mid, 03=High, UP=wrap-around"
  notes: "Send: !1DVL<level>[CR]"

# ── MAIN ZONE — Music Optimizer ───────────────────────────────────────────
- id: music_optimizer_set
  label: Set Music Optimizer
  kind: action
  params:
    - name: state
      type: string
      description: "00=Off, 01=On, UP=wrap-around"
  notes: "Send: !1MOT<state>[CR]"

# ── MAIN ZONE — Late Night ────────────────────────────────────────────────
- id: late_night_set
  label: Set Late Night Mode
  kind: action
  params:
    - name: level
      type: string
      description: "00=Off, 01=Low (DD)/On (TrueHD), 02=High (DD), 03=Auto (TrueHD), UP=wrap-around"
  notes: "Send: !1LTN<level>[CR]"

# ── MAIN ZONE — Re-EQ/Cinema Filter ──────────────────────────────────────
- id: reeq_set
  label: Set Re-EQ/Academy Filter
  kind: action
  params:
    - name: state
      type: string
      description: "00=Both Off, 01=Re-EQ On, 02=Academy On, UP=wrap-around"
  notes: "Send: !1RAS<state>[CR]"

# ── MAIN ZONE — Speaker Level Calibration ────────────────────────────────
- id: speaker_calibration_test
  label: Speaker Level Calibration Test
  kind: action
  params: []
  notes: "Send: !1SLCTEST[CR]"

- id: speaker_calibration_chsel
  label: Speaker Level Calibration CH Select
  kind: action
  params: []
  notes: "Send: !1SLCCHSEL[CR]"

- id: speaker_calibration_up
  label: Speaker Level Calibration Level Up
  kind: action
  params: []
  notes: "Send: !1SLCUP[CR]"

- id: speaker_calibration_down
  label: Speaker Level Calibration Level Down
  kind: action
  params: []
  notes: "Send: !1SLCDOWN[CR]"

# ── MAIN ZONE — Tuner ─────────────────────────────────────────────────────
- id: tuner_frequency_set
  label: Set Tuner Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: "nnnnn: FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch"
  notes: "Send: !1TUN<frequency>[CR]"

- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  params: []
  notes: "Send: !1TUNUP[CR]"

- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  params: []
  notes: "Send: !1TUNDOWN[CR]"

- id: tuner_preset_set
  label: Set Tuner Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28 (hex) for preset 1-40, or 01-1E for preset 1-30"
  notes: "Send: !1PRS<preset>[CR]"

- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  params: []
  notes: "Send: !1PRSUP[CR]"

- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  params: []
  notes: "Send: !1PRSDOWN[CR]"

- id: tuner_preset_memory
  label: Store Tuner Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28 (hex)"
  notes: "Send: !1PRM<preset>[CR]"

# ── MAIN ZONE — Net/USB Transport ─────────────────────────────────────────
- id: net_play
  label: Net/USB Play
  kind: action
  params: []
  notes: "Send: !1NTCPLAY[CR]"

- id: net_stop
  label: Net/USB Stop
  kind: action
  params: []
  notes: "Send: !1NTCSTOP[CR]"

- id: net_pause
  label: Net/USB Pause
  kind: action
  params: []
  notes: "Send: !1NTCPAUSE[CR]"

- id: net_track_up
  label: Net/USB Track Up
  kind: action
  params: []
  notes: "Send: !1NTCTRUP[CR]"

- id: net_track_down
  label: Net/USB Track Down
  kind: action
  params: []
  notes: "Send: !1NTCTRDN[CR]"

- id: net_ff
  label: Net/USB Fast Forward
  kind: action
  params: []
  notes: "Send: !1NTCFF[CR]; must be sent continuously, no more than 100ms between codes"

- id: net_rew
  label: Net/USB Rewind
  kind: action
  params: []
  notes: "Send: !1NTCREW[CR]; must be sent continuously, no more than 100ms between codes"

- id: net_repeat
  label: Net/USB Repeat
  kind: action
  params: []
  notes: "Send: !1NTCREPEAT[CR]"

- id: net_random
  label: Net/USB Random
  kind: action
  params: []
  notes: "Send: !1NTCRANDOM[CR]"

- id: net_display
  label: Net/USB Display Key
  kind: action
  params: []
  notes: "Send: !1NTCDISPLAY[CR]"

- id: net_channel_up
  label: Net/USB Internet Radio Channel Up
  kind: action
  params: []
  notes: "Send: !1NTCCHUP[CR]"

- id: net_channel_down
  label: Net/USB Internet Radio Channel Down
  kind: action
  params: []
  notes: "Send: !1NTCCHDN[CR]"

- id: net_internet_radio_preset_set
  label: Set Internet Radio Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28 (hex) for preset 1-40"
  notes: "Send: !1NPR<preset>[CR]"

# ── MAIN ZONE — REC OUT Selector ──────────────────────────────────────────
- id: recout_selector_set
  label: Set REC OUT Selector
  kind: action
  params:
    - name: input_code
      type: string
      description: "00=VIDEO1, 01=VIDEO2, 02=VIDEO3, 03=VIDEO4, 04=VIDEO5, 05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 30=MULTI CH, 31=XM, 7F=OFF, 80=SOURCE"
  notes: "Send: !1SLR<input_code>[CR]"

# ── ZONE 2 ─────────────────────────────────────────────────────────────────
- id: zone2_power_standby
  label: Zone 2 Standby
  kind: action
  params: []
  notes: "Send: !1ZPW00[CR]"

- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  params: []
  notes: "Send: !1ZPW01[CR]"

- id: zone2_mute_off
  label: Zone 2 Muting Off
  kind: action
  params: []
  notes: "Send: !1ZMT00[CR]"

- id: zone2_mute_on
  label: Zone 2 Muting On
  kind: action
  params: []
  notes: "Send: !1ZMT01[CR]"

- id: zone2_mute_toggle
  label: Zone 2 Muting Toggle
  kind: action
  params: []
  notes: "Send: !1ZMTTG[CR]"

- id: zone2_volume_set
  label: Set Zone 2 Volume Level
  kind: action
  params:
    - name: level
      type: string
      description: "Hex level 00-64 (0-100) or 00-50 (0-80)"
  notes: "Send: !1ZVL<level>[CR]; only works when main zone is ON"

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  params: []
  notes: "Send: !1ZVLUP[CR]"

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  params: []
  notes: "Send: !1ZVLDOWN[CR]"

- id: zone2_input_select
  label: Zone 2 Input Select
  kind: action
  params:
    - name: input_code
      type: string
      description: "Same codes as SLI plus 80=SOURCE"
  notes: "Send: !1ZSL<input_code>[CR]"

- id: zone2_tone_set
  label: Set Zone 2 Tone
  kind: action
  params:
    - name: value
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
  notes: "Send: !1ZTN<value>[CR]; only works when main is ON and Zone2 is powered or variable"

- id: zone2_balance_set
  label: Set Zone 2 Balance
  kind: action
  params:
    - name: value
      type: string
      description: "xx=balance value, UP=right, DOWN=left"
  notes: "Send: !1ZBL<value>[CR]"

- id: zone2_tuner_frequency_set
  label: Zone 2 Tuner Frequency (separate control)
  kind: action
  params:
    - name: frequency
      type: string
      description: "nnnnn: FM nnn.nn MHz / AM nnnnn kHz"
  notes: "Send: !1TU2<frequency>[CR]"

- id: zone2_preset_set
  label: Zone 2 Preset (separate control)
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28 (hex)"
  notes: "Send: !1PR2<preset>[CR]"

- id: zone2_net_play
  label: Zone 2 Net/USB Play (separate control)
  kind: action
  params: []
  notes: "Send: !1NT2PLAY[CR]"

- id: zone2_net_stop
  label: Zone 2 Net/USB Stop
  kind: action
  params: []
  notes: "Send: !1NT2STOP[CR]"

- id: zone2_internet_radio_preset_set
  label: Zone 2 Internet Radio Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28 (hex)"
  notes: "Send: !1NP2<preset>[CR]"

# ── ZONE 3 ─────────────────────────────────────────────────────────────────
- id: zone3_power_standby
  label: Zone 3 Standby
  kind: action
  params: []
  notes: "Send: !1PW300[CR]"

- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  params: []
  notes: "Send: !1PW301[CR]"

- id: zone3_mute_off
  label: Zone 3 Muting Off
  kind: action
  params: []
  notes: "Send: !1MT300[CR]"

- id: zone3_mute_on
  label: Zone 3 Muting On
  kind: action
  params: []
  notes: "Send: !1MT301[CR]"

- id: zone3_volume_set
  label: Set Zone 3 Volume Level
  kind: action
  params:
    - name: level
      type: string
      description: "Hex level 00-64 or 00-50"
  notes: "Send: !1VL3<level>[CR]"

- id: zone3_input_select
  label: Zone 3 Input Select
  kind: action
  params:
    - name: input_code
      type: string
      description: "Same codes as SLI plus 80=SOURCE"
  notes: "Send: !1SL3<input_code>[CR]"

- id: zone3_tuner_frequency_set
  label: Zone 3 Tuner Frequency (separate control)
  kind: action
  params:
    - name: frequency
      type: string
      description: "nnnnn"
  notes: "Send: !1TU3<frequency>[CR]"

- id: zone3_preset_set
  label: Zone 3 Preset (separate control)
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28 (hex)"
  notes: "Send: !1PR3<preset>[CR]"

- id: zone3_net_play
  label: Zone 3 Net/USB Play (separate control)
  kind: action
  params: []
  notes: "Send: !1NT3PLAY[CR]"

- id: zone3_internet_radio_preset_set
  label: Zone 3 Internet Radio Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28 (hex)"
  notes: "Send: !1NP3<preset>[CR]"

# ── ZONE 4 ─────────────────────────────────────────────────────────────────
- id: zone4_power_standby
  label: Zone 4 Standby
  kind: action
  params: []
  notes: "Send: !1PW400[CR]"

- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  params: []
  notes: "Send: !1PW401[CR]"

- id: zone4_mute_off
  label: Zone 4 Muting Off
  kind: action
  params: []
  notes: "Send: !1MT400[CR]"

- id: zone4_mute_on
  label: Zone 4 Muting On
  kind: action
  params: []
  notes: "Send: !1MT401[CR]"

- id: zone4_volume_set
  label: Set Zone 4 Volume Level
  kind: action
  params:
    - name: level
      type: string
      description: "Hex level 00-64 or 00-50"
  notes: "Send: !1VL4<level>[CR]"

- id: zone4_input_select
  label: Zone 4 Input Select
  kind: action
  params:
    - name: input_code
      type: string
      description: "Same codes as SLI plus 80=SOURCE"
  notes: "Send: !1SL4<input_code>[CR]"

- id: zone4_tuner_frequency_set
  label: Zone 4 Tuner Frequency (separate control)
  kind: action
  params:
    - name: frequency
      type: string
      description: "nnnnn"
  notes: "Send: !1TU4<frequency>[CR]"

- id: zone4_preset_set
  label: Zone 4 Preset (separate control)
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28 (hex)"
  notes: "Send: !1PR4<preset>[CR]"

- id: zone4_net_play
  label: Zone 4 Net/USB Play (separate control)
  kind: action
  params: []
  notes: "Send: !1NT4PLAY[CR]"

- id: zone4_internet_radio_preset_set
  label: Zone 4 Internet Radio Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28 (hex)"
  notes: "Send: !1NP4<preset>[CR]"

# ── RI System — CD Player ──────────────────────────────────────────────────
- id: ri_cd_power
  label: RI CD Player Power On/Off
  kind: action
  params: []
  notes: "Send: !1CCDPOWER[CR]"

- id: ri_cd_play
  label: RI CD Player Play
  kind: action
  params: []
  notes: "Send: !1CCDPLAY[CR]"

- id: ri_cd_stop
  label: RI CD Player Stop
  kind: action
  params: []
  notes: "Send: !1CCDSTOP[CR]"

- id: ri_cd_pause
  label: RI CD Player Pause
  kind: action
  params: []
  notes: "Send: !1CCDPAUSE[CR]"

# ── RI System — DVD Player ────────────────────────────────────────────────
- id: ri_dvd_power
  label: RI DVD Player Power On/Off
  kind: action
  params: []
  notes: "Send: !1CDVPOWER[CR]"

- id: ri_dvd_play
  label: RI DVD Player Play
  kind: action
  params: []
  notes: "Send: !1CDVPLAY[CR]"

- id: ri_dvd_stop
  label: RI DVD Player Stop
  kind: action
  params: []
  notes: "Send: !1CDVSTOP[CR]"

# ── RI System — Docking Station ───────────────────────────────────────────
- id: ri_dock_power_on
  label: RI Dock Power On
  kind: action
  params: []
  notes: "Send: !1CDSPWRON[CR]"

- id: ri_dock_power_off
  label: RI Dock Standby
  kind: action
  params: []
  notes: "Send: !1CDSPWROFF[CR]"

- id: ri_dock_play_resume
  label: RI Dock Play/Resume
  kind: action
  params: []
  notes: "Send: !1CDSPLY/RES[CR]"

- id: ri_dock_play_pause
  label: RI Dock Play/Pause
  kind: action
  params: []
  notes: "Send: !1CDSPLY/PAU[CR]"

- id: ri_dock_stop
  label: RI Dock Stop
  kind: action
  params: []
  notes: "Send: !1CDSSTOP[CR]"

- id: ri_dock_track_up
  label: RI Dock Track Up
  kind: action
  params: []
  notes: "Send: !1CDSSKIP.F[CR]"

- id: ri_dock_track_down
  label: RI Dock Track Down
  kind: action
  params: []
  notes: "Send: !1CDSSKIP.R[CR]"
```

## Feedbacks

```yaml
- id: power_state
  label: System Power State
  type: enum
  values: [standby, on]
  notes: "Response: !1PWR00[EOF] = standby, !1PWR01[EOF] = on. Query: !1PWRQSTN[CR]"

- id: mute_state
  label: Audio Muting State
  type: enum
  values: [off, on]
  notes: "Response: !1AMT00[EOF] or !1AMT01[EOF]. Query: !1AMTQSTN[CR]"

- id: volume_level
  label: Master Volume Level
  type: string
  notes: "Response: !1MVL<hex>[EOF]; hex 00-64 = level 0-100. Query: !1MVLQSTN[CR]"

- id: input_selector
  label: Input Selector Position
  type: string
  notes: "Response: !1SLI<code>[EOF]. Query: !1SLIQSTN[CR]"

- id: audio_selector_state
  label: Audio Selector State
  type: string
  notes: "Response: !1SLA<code>[EOF]. Query: !1SLAQSTN[CR]"

- id: listening_mode
  label: Listening Mode
  type: string
  notes: "Response: !1LMD<hex>[EOF]. Query: !1LMDQSTN[CR]"

- id: tone_front
  label: Front Tone (Bass+Treble)
  type: string
  notes: "Response: !1TFRBxxTxx[EOF]. Query: !1TFRQSTN[CR]"

- id: tone_center
  label: Center Tone
  type: string
  notes: "Response: !1TCTBxxTxx[EOF]. Query: !1TCTQSTN[CR]"

- id: tone_surround
  label: Surround Tone
  type: string
  notes: "Response: !1TSRBxxTxx[EOF]. Query: !1TSRQSTN[CR]"

- id: tone_surround_back
  label: Surround Back Tone
  type: string
  notes: "Response: !1TSBBxxTxx[EOF]. Query: !1TSBQSTN[CR]"

- id: tone_subwoofer
  label: Subwoofer Tone
  type: string
  notes: "Response: !1TSWBxx[EOF]. Query: !1TSWQSTN[CR]"

- id: subwoofer_level
  label: Subwoofer Level
  type: string
  notes: "Query: !1SWLQSTN[CR]"

- id: center_level
  label: Center Level
  type: string
  notes: "Query: !1CTLQSTN[CR]"

- id: sleep_time
  label: Sleep Timer Setting
  type: string
  notes: "Response: !1SLP<hex>[EOF] or !1SLPOFF[EOF]. Query: !1SLPQSTN[CR]"

- id: dimmer_level
  label: Dimmer Level
  type: string
  notes: "Response: !1DIM<code>[EOF]. Query: !1DIMQSTN[CR]"

- id: display_mode
  label: Display Mode
  type: string
  notes: "Response: !1DIF<code>[EOF]. Query: !1DIFQSTN[CR]"

- id: hdmi_output
  label: HDMI Output Selector
  type: string
  notes: "Response: !1HDO<code>[EOF]. Query: !1HDOQSTN[CR]"

- id: monitor_resolution
  label: Monitor Out Resolution
  type: string
  notes: "Response: !1RES<code>[EOF]. Query: !1RESQSTN[CR]"

- id: isf_mode
  label: ISF Mode State
  type: string
  notes: "Response: !1ISF<code>[EOF]. Query: !1ISFQSTN[CR]"

- id: speaker_a_state
  label: Speaker A State
  type: enum
  values: [off, on]
  notes: "Query: !1SPAQSTN[CR]"

- id: speaker_b_state
  label: Speaker B State
  type: enum
  values: [off, on]
  notes: "Query: !1SPBQSTN[CR]"

- id: speaker_layout_state
  label: Speaker Layout State
  type: string
  notes: "Query: !1SPLQSTN[CR]"

- id: late_night_level
  label: Late Night Level
  type: string
  notes: "Query: !1LTNQSTN[CR]"

- id: reeq_state
  label: Re-EQ/Cinema Filter State
  type: string
  notes: "Query: !1RASQSTN[CR]"

- id: audyssey_multieq_state
  label: Audyssey 2EQ/MultEQ State
  type: enum
  values: [off, on]
  notes: "Query: !1ADYQSTN[CR]"

- id: audyssey_dynamic_eq_state
  label: Audyssey Dynamic EQ State
  type: enum
  values: [off, on]
  notes: "Query: !1ADQQSTN[CR]"

- id: audyssey_dynamic_volume_state
  label: Audyssey Dynamic Volume State
  type: string
  notes: "Query: !1ADVQSTN[CR]"

- id: dolby_volume_state
  label: Dolby Volume State
  type: string
  notes: "Query: !1DVLQSTN[CR]"

- id: music_optimizer_state
  label: Music Optimizer State
  type: enum
  values: [off, on]
  notes: "Query: !1MOTQSTN[CR]"

- id: tuner_frequency
  label: Tuner Frequency
  type: string
  notes: "Query: !1TUNQSTN[CR]"

- id: tuner_preset
  label: Tuner Preset Number
  type: string
  notes: "Query: !1PRSQSTN[CR]"

- id: audio_info
  label: Audio Information
  type: string
  notes: "Response: !1IFAnnnnn:nnnnn[EOF]; comma-separated. Query: !1IFAQSTN[CR]; also triggered by DIF02"

- id: video_info
  label: Video Information
  type: string
  notes: "Response: !1IFVnnnnn:nnnnn[EOF]; comma-separated. Query: !1IFVQSTN[CR]; also triggered by DIF03"

- id: net_artist_name
  label: Net/USB Artist Name
  type: string
  notes: "Query: !1NATQSTN[CR]; up to 64 ASCII chars"

- id: net_album_name
  label: Net/USB Album Name
  type: string
  notes: "Query: !1NALQSTN[CR]; up to 64 ASCII chars"

- id: net_title_name
  label: Net/USB Title Name
  type: string
  notes: "Query: !1NTIQSTN[CR]; up to 64 ASCII chars"

- id: net_time_info
  label: Net/USB Time Info
  type: string
  notes: "Response: !1NTMmm:ss/mm:ss[EOF]; elapsed/track time. Query: !1NTMQSTN[CR]"

- id: net_track_info
  label: Net/USB Track Info
  type: string
  notes: "Response: !1NTRcccc/tttt[EOF]; current/total tracks. Query: !1NTRQSTN[CR]"

- id: net_play_status
  label: Net/USB Play Status
  type: string
  notes: "Response: !1NSTprs[EOF]; p=play state (S/P/p/F/R), r=repeat state (-/R/F/1), s=shuffle state. Query: !1NSTQSTN[CR]"

- id: zone2_power_state
  label: Zone 2 Power State
  type: enum
  values: [standby, on]
  notes: "Query: !1ZPWQSTN[CR]"

- id: zone2_mute_state
  label: Zone 2 Muting State
  type: enum
  values: [off, on]
  notes: "Query: !1ZMTQSTN[CR]"

- id: zone2_volume_level
  label: Zone 2 Volume Level
  type: string
  notes: "Query: !1ZVLQSTN[CR]"

- id: zone2_input_selector
  label: Zone 2 Input Selector
  type: string
  notes: "Query: !1ZSLQSTN[CR]"

- id: zone2_tone
  label: Zone 2 Tone
  type: string
  notes: "Query: !1ZTNQSTN[CR]"

- id: zone2_balance
  label: Zone 2 Balance
  type: string
  notes: "Query: !1ZBLQSTN[CR]"

- id: zone3_power_state
  label: Zone 3 Power State
  type: enum
  values: [standby, on]
  notes: "Query: !1PW3QSTN[CR]"

- id: zone3_mute_state
  label: Zone 3 Muting State
  type: enum
  values: [off, on]
  notes: "Query: !1MT3QSTN[CR]"

- id: zone3_volume_level
  label: Zone 3 Volume Level
  type: string
  notes: "Query: !1VL3QSTN[CR]"

- id: zone3_input_selector
  label: Zone 3 Input Selector
  type: string
  notes: "Query: !1SL3QSTN[CR]"

- id: zone4_power_state
  label: Zone 4 Power State
  type: enum
  values: [standby, on]
  notes: "Query: !1PW4QSTN[CR]"

- id: zone4_mute_state
  label: Zone 4 Muting State
  type: enum
  values: [off, on]
  notes: "Query: !1MT4QSTN[CR]"

- id: zone4_volume_level
  label: Zone 4 Volume Level
  type: string
  notes: "Query: !1VL4QSTN[CR]"

- id: zone4_input_selector
  label: Zone 4 Input Selector
  type: string
  notes: "Query: !1SL4QSTN[CR]"
```

## Variables

```yaml
# UNRESOLVED: no settable parameters outside of discrete actions were identified; all adjustable
# parameters are controlled via Actions. Remove this section or populate if additional
# persistent variables are found in a more detailed source document.
```

## Events

```yaml
- id: status_change_notification
  label: Unsolicited Status Notification
  notes: "Device sends a status message whenever internal state changes without a command trigger. Format is identical to query responses: !1<CMD><value>[EOF]. Requires an active persistent TCP connection for eISCP; RS-232C delivers notifications automatically."
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences are explicitly defined in the source.
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - description: "Zone 2 tone and volume commands only work when main zone is powered ON"
    commands: [zone2_tone_set, zone2_volume_set]
  - description: "12V Trigger commands (TGA/TGB/TGC) are only available when the respective 12V Trigger parameter is set to OFF in the receiver Setup Menu"
    commands: [trigger_a_set, trigger_b_set, trigger_c_set]
  - description: "TCP (eISCP): only one client connection is permitted at a time; connecting a second client will displace the first"
    commands: []
```

## Notes

**Protocol structure:**
- ISCP protocol version: 1.15 (dated 31 August 2009; Onkyo copyright 2003-2009)
- Every command follows the pattern: `!1<3-char-code><param>[terminator]`
- Query parameter is always `QSTN` (e.g., `!1PWRQSTN[CR]` queries power state)
- Wrap-around increment commands are `UP`; wrap-around decrement is `DOWN`
- Toggle commands use `TG`

**Timing:**
- Receiver must respond within 50 ms; if no response, communication has failed
- For eISCP (TCP), interval between received messages must be at least 50 ms
- FFW/REW Net-tune commands must be sent continuously with no more than 100 ms between codes

**Multi-zone architecture:**
- Main zone: commands use 3-char codes (PWR, SLI, MVL, etc.)
- Zone 2: uses ZPW (power), ZVL (volume), ZSL (input), ZTN (tone), ZBL (balance), ZMT (mute); shared tuner/preset use PRS/TUN; separate zone control uses PR2/TU2
- Zone 3: PW3, VL3, SL3, MT3; separate control PR3/TU3/NT3
- Zone 4: PW4, VL4, SL4, MT4; separate control PR4/TU4/NT4
- Tuner/XM/SIRIUS/Net-Tune functions are shared across main and all zones by default; separate per-zone commands (TU2, PR2, NT2, etc.) provide independent zone control

**eISCP TCP header format (big-endian):**
- Bytes 0-3: ASCII `ISCP`
- Bytes 4-7: Header size = 0x00000010 (16 bytes)
- Bytes 8-11: Data size (big-endian 32-bit)
- Byte 12: Version = 0x01
- Bytes 13-15: Reserved = 0x000000

**RI System:**
- Onkyo RI (Remote Interactive) commands control connected Onkyo peripheral devices (CD, DVD, MD, DAT, tape decks, equalizers, docking stations) through the RI bus
- RI commands are issued from the receiver via serial/eISCP to control attached accessories

**Model-specific notes:**
- XM and SIRIUS inputs/commands are only available on XM/SIRIUS-equipped models
- HD Radio commands (HAT, HCN, HTI, HDS, HPR, HBL, HTS) are only available on HD Radio models
- RDS commands (RDS, PTS, TPS) are only available on RDS/RBDS models
- SIRIUS parental lock command SLK is SIRIUS-only
- Video Output Selector VOS is Japanese market only
- Neural Surround (LMD 87) is North America only
- Listening mode 40 behavior differs between pre- and post-TX-SR805 models
- Net-Tune commands NTC with z-suffix (PLAYz, STOPz, etc.) are for older Net-Tune models before TX-NR1000

<!-- UNRESOLVED: specific TX-RZ model numbers supported by this ISCP 1.15 document are not enumerated. The source document title references "AV Receiver" generically. The TX-RZ branding appears to postdate this 2009 document version; confirm protocol applicability to specific TX-RZ variants. -->
<!-- UNRESOLVED: video output selector VOS (D4/Component) is Japanese model only; applicability to TX-RZ export models not confirmed. -->
<!-- UNRESOLVED: eISCP packet endianness for data size field verified as big-endian in source; verify implementation against actual device. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-04T16:23:20.505Z
last_checked_at: 2026-05-16T23:46:32.077Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T23:46:32.077Z
matched_actions: 139
action_count: 139
confidence: high
summary: "All 139 spec action-units matched cleanly; transport parameters verified in source; ISCP 1.15 protocol fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
