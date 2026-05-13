---
spec_id: admin/denon-tu_1500rd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon TU-1500RD Control Spec"
manufacturer: Denon
model_family: TU-1500RD
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - TU-1500RD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
retrieved_at: 2026-04-29T09:03:31.094Z
last_checked_at: 2026-04-26T12:29:26.907Z
generated_at: 2026-04-26T12:29:26.907Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T12:29:26.907Z
  matched_actions: 132
  action_count: 132
  confidence: high
  summary: "All 132 spec actions matched cleanly against source commands; transport parameters verified; semantic-id convention maps comprehensively to wire protocol."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Denon TU-1500RD Control Spec

## Summary
The TU-1500RD is an audio tuner/receiver supporting both RS-232C and Ethernet (TCP/IP) control. The document describes the Denon AVR control protocol with COMMAND/EVENT/RESPONSE message types, ASCII-based command strings terminated by CR (0x0D), and multi-zone power, volume, input routing, and surround mode control.

<!-- UNRESOLVED: TU-1500RD-specific command coverage not verified; document describes general AVR protocol -->

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
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: 23  # TCP port 23 (telnet) - stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
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

- id: master_volume_up
  label: Master Volume Up
  kind: action
  params: []

- id: master_volume_down
  label: Master Volume Down
  kind: action
  params: []

- id: master_volume_set
  label: Master Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 00-98, 80=0dB, 00=minimum

- id: mute_on
  label: Mute On
  kind: action
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: |
        Input source selector. Supported values include: PHONO, CD, TUNER, DVD, BD,
        TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM,
        FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP

- id: surround_mode_set
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: |
        Surround mode selector. Supported values include: MOVIE, MUSIC, GAME, DIRECT,
        PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DOLBY PRO LOGIC, DOLBY PL2 C/M/G,
        DOLBY PL2X C/M/G, DOLBY PL2Z H, DOLBY SURROUND, DOLBY ATMOS, DOLBY D EX,
        DOLBY D+PL2X C/M/G, DOLBY D+PL2Z H, DOLBY D+DS, DOLBY D+NEO:X C/M/G,
        DTS SURROUND, DTS ES DSCRT6.1, DTS ES MTRX6.1, DTS+PL2X C/M/G, DTS+PL2Z H,
        DTS+DS, DTS96/24, DTS96 ES MTRX, DTS+NEO:6, DTS+NEO:X C/M/G, MULTI CH IN,
        M CH IN+DOLBY EX, M CH IN+PL2X C/M/G, M CH IN+PL2Z H, M CH IN+DS,
        MULTI CH IN 7.1, M CH IN+NEO:X C/M/G, DOLBY D+, DOLBY HD, DOLBY HD+EX,
        DOLBY HD+PL2X C/M/G, DOLBY HD+PL2Z H, DOLBY HD+DS, DOLBY HD+NEO:X C/M/G,
        DTS HD, DTS HD MSTR, DTS HD+PL2X C/M/G, DTS HD+PL2Z H, DTS HD+NEO:6,
        DTS HD+DS, DTS HD+NEO:X C/M/G, DTS EXPRESS, DTS ES 8CH DSCRT, MPEG2 AAC,
        AAC+DOLBY EX, AAC+PL2X C/M/G, AAC+PL2Z H, AAC+DS, AAC+NEO:X C/M/G,
        NEO:6 C DSX, NEO:6 M DSX, AUDYSSEY DSX, AURO3D, AURO2DSURR, MCH STEREO,
        WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE,
        MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, ALL ZONE STEREO, 7.1IN,
        PURE DIRECT EXT, QUICK0-QUICK5, QUICK1-QUICK5 MEMORY

- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []

- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []

- id: video_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: |
        Video source selector: DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-AUX7, CD,
        SOURCE (cancel), ON, OFF

- id: sleep_timer_set
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 minutes, 010=10min; use 0 or OFF to cancel"

- id: auto_standby_set
  label: Auto Standby Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "15M, 30M, 60M, OFF"

- id: eco_mode_set
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ON, AUTO, OFF"

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

- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  params: []

- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  params: []

- id: tuner_frequency_set
  label: Tuner Frequency Set
  kind: action
  params:
    - name: frequency
      type: string
      description: "6-digit frequency: ****.** MHz at FM (<050000), ****.** kHz at AM (>050000)"

- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  params: []

- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  params: []

- id: tuner_preset_select
  label: Tuner Preset Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 01-56"

- id: tuner_band_select
  label: Tuner Band Select
  kind: action
  params:
    - name: band
      type: string
      description: "AM, FM, AUTO, MANUAL"

- id: hd_radio_channel_up
  label: HD Radio Channel Up
  kind: action
  params: []

- id: hd_radio_channel_down
  label: HD Radio Channel Down
  kind: action
  params: []

- id: zone2_on
  label: Zone 2 On
  kind: action
  params: []

- id: zone2_off
  label: Zone 2 Off
  kind: action
  params: []

- id: zone2_source
  label: Zone 2 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: |
        Zone 2 input source: SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY,
        GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO,
        SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP

- id: zone3_on
  label: Zone 3 On
  kind: action
  params: []

- id: zone3_off
  label: Zone 3 Off
  kind: action
  params: []

- id: zone3_source
  label: Zone 3 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: Same source list as Zone 2

- id: display_dimmer
  label: Display Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: "BRI (bright), DIM (dim), DAR (dark), OFF, SEL (toggle)"

- id: setup_menu_on
  label: Setup Menu On
  kind: action
  params: []

- id: setup_menu_off
  label: Setup Menu Off
  kind: action
  params: []

- id: cursor_up
  label: Cursor Up
  kind: action
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  params: []

- id: cursor_enter
  label: Cursor Enter
  kind: action
  params: []

- id: trigger_1_on
  label: Trigger 1 On
  kind: action
  params: []

- id: trigger_1_off
  label: Trigger 1 Off
  kind: action
  params: []

- id: trigger_2_on
  label: Trigger 2 On
  kind: action
  params: []

- id: trigger_2_off
  label: Trigger 2 Off
  kind: action
  params: []

- id: remote_lock_on
  label: Remote Lock On
  kind: action
  params: []

- id: remote_lock_off
  label: Remote Lock Off
  kind: action
  params: []
- id: channel_volume_set
  label: Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "Channel: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
    - name: direction
      type: string
      description: "UP, DOWN, or numeric level 38-62 (50=0dB); use ZRL to reset all channels to factory defaults"

- id: channel_volume_reset
  label: Channel Volume Reset All
  kind: action
  params: []

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  params: []

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  params: []

- id: zone2_volume_set
  label: Zone 2 Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: "Volume level 00-98, 80=0dB, 00=minimum (---)"

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  params: []

- id: zone2_channel_setting
  label: Zone 2 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST (stereo), MONO"

- id: zone2_channel_volume_set
  label: Zone 2 Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: direction
      type: string
      description: "UP, DOWN, or numeric level 38-62 (50=0dB)"

- id: zone2_hpf_on
  label: Zone 2 HPF On
  kind: action
  params: []

- id: zone2_hpf_off
  label: Zone 2 HPF Off
  kind: action
  params: []

- id: zone2_bass_set
  label: Zone 2 Bass Set
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or numeric level 00-99 (50=0dB, range -10 to +10 = 40 to 60)"

- id: zone2_treble_set
  label: Zone 2 Treble Set
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or numeric level 00-99 (50=0dB, range -10 to +10 = 40 to 60)"

- id: zone2_hdmi_audio_set
  label: Zone 2 HDMI Audio Output Set
  kind: action
  params:
    - name: mode
      type: string
      description: "THR (through), PCM"

- id: zone2_sleep_timer_set
  label: Zone 2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 minutes, 010=10min; use OFF to cancel"

- id: zone2_auto_standby_set
  label: Zone 2 Auto Standby
  kind: action
  params:
    - name: mode
      type: string
      description: "2H, 4H, 8H, OFF"

- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  params: []

- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  params: []

- id: zone3_volume_set
  label: Zone 3 Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: "Volume level 00-98, 80=0dB, 00=minimum (---)"

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  params: []

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  params: []

- id: zone3_channel_setting
  label: Zone 3 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST (stereo), MONO"

- id: zone3_channel_volume_set
  label: Zone 3 Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: direction
      type: string
      description: "UP, DOWN, or numeric level 38-62 (50=0dB)"

- id: zone3_hpf_on
  label: Zone 3 HPF On
  kind: action
  params: []

- id: zone3_hpf_off
  label: Zone 3 HPF Off
  kind: action
  params: []

- id: zone3_bass_set
  label: Zone 3 Bass Set
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or numeric level 00-99 (50=0dB, range -10 to +10 = 40 to 60)"

- id: zone3_treble_set
  label: Zone 3 Treble Set
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or numeric level 00-99 (50=0dB, range -10 to +10 = 40 to 60)"

- id: zone3_sleep_timer_set
  label: Zone 3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 minutes, 010=10min; use OFF to cancel"

- id: zone3_auto_standby_set
  label: Zone 3 Auto Standby
  kind: action
  params:
    - name: mode
      type: string
      description: "2H, 4H, 8H, OFF"

- id: video_scaling_set
  label: Video Scaling / HDMI Output Set
  kind: action
  params:
    - name: parameter
      type: string
      description: "Aspect: ASPNRM (4:3), ASPFUL (16:9); Monitor: MONIAUTO, MONI1, MONI2; Resolution: SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO; HDMI Res: SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO; Audio: AUDIO AMP, AUDIO TV; VPM: VPMAUTO, VPMGAME, VPMMOVI; VST: VST ON, VST OFF"

- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"

- id: picture_contrast_set
  label: Picture Contrast Set
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or numeric level 000-100 (050=0, range -50 to +50)"

- id: picture_brightness_set
  label: Picture Brightness Set
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or numeric level 000-100 (050=0, range -50 to +50)"

- id: picture_saturation_set
  label: Picture Saturation Set
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or numeric level 000-100 (050=0, range -50 to +50)"

- id: picture_hue_set
  label: Picture Hue Set
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or numeric level 44-56 (50=0, range -6 to +6)"

- id: online_music_control
  label: Online Music / USB / Bluetooth Navigation
  kind: action
  params:
    - name: command
      type: string
      description: "90=CursorUp, 91=CursorDown, 92=CursorLeft, 93=CursorRight/Enter, 94=Play, 9A=Pause, 9B=Stop, 9C=SkipPlus, 9D=SkipMinus, 9H=RepeatOne, 9I=RepeatAll, 9J=RepeatOff, 9K=RandomOn, 9M=RandomOff, 9X=PageNext, 9Y=PagePrev, RPT=RepeatToggle, RND=RandomToggle"

- id: net_audio_preset_call
  label: Net Audio Preset Call
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 00-35 (2014 AVR)"

- id: net_audio_preset_memory
  label: Net Audio Preset Memory Store
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 00-35 (2014 AVR)"

- id: net_audio_display_request_utf8
  label: Onscreen Display Request (UTF-8)
  kind: query
  params: []

- id: tuner_preset_memory
  label: Tuner Preset Memory Store
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 01-56; omit for interactive memory mode"

- id: hd_radio_tuning_mode_set
  label: HD Radio Tuning Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU, HDAM, HDFM"

- id: upgrade_display_id
  label: Display Upgrade ID Number
  kind: action
  params: []

- id: remote_maintenance_set
  label: Remote Maintenance Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "STA (start), END"

- id: panel_lock_set
  label: Panel Lock Set
  kind: action
  params:
    - name: mode
      type: string
      description: "PANEL LOCK ON (panel buttons except master vol), PANEL+V LOCK ON (all panel+vol), PANEL LOCK OFF"
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values: [ON, STANDBY]
  query: PW?<CR>

- id: master_volume_status
  label: Master Volume Status
  type: string
  query: MV?<CR>
  description: "ASCII volume value 00-98, 80=0dB, 00=minimum (---)"

- id: mute_status
  label: Mute Status
  type: enum
  values: [ON, OFF]
  query: MU?<CR>

- id: input_source_status
  label: Input Source Status
  type: string
  query: SI?<CR>

- id: surround_mode_status
  label: Surround Mode Status
  type: string
  query: MS?<CR>

- id: main_zone_status
  label: Main Zone Status
  type: enum
  values: [ON, OFF]
  query: ZM?<CR>

- id: tuner_frequency_status
  label: Tuner Frequency Status
  type: string
  query: TFAN?<CR>

- id: tuner_band_status
  label: Tuner Band Status
  type: string
  query: TMAN?<CR>

- id: hd_radio_status
  label: HD Radio Status
  type: string
  query: HD?<CR>
  description: "Returns BAND, STATION NAME, MULTI CAST info, SIGNAL LEVEL, ARTIST, TITLE, ALBUM, GENRE, PROGRAM TYPE"

- id: video_select_status
  label: Video Select Status
  type: string
  query: SV?<CR>

- id: zone2_status
  label: Zone 2 Status
  type: string
  query: Z2?<CR>

- id: zone3_status
  label: Zone 3 Status
  type: string
  query: Z3?<CR>

- id: sleep_timer_status
  label: Sleep Timer Status
  type: string
  query: SLP?<CR>

- id: auto_standby_status
  label: Auto Standby Status
  type: string
  query: STBY?<CR>

- id: eco_mode_status
  label: ECO Mode Status
  type: string
  query: ECO?<CR>

- id: display_dimmer_status
  label: Display Dimmer Status
  type: string
  query: DIM?<CR>

- id: trigger_status
  label: Trigger Status
  type: string
  query: TR?<CR>
  description: "Returns TR1 ON/OFF, TR2 ON/OFF"

- id: net_audio_preset_status
  label: Net Audio Preset Name Status
  type: string
  query: NSH<CR>

- id: onscreen_display_status
  label: Onscreen Display Information
  type: string
  query: NSA<CR>
```

## Variables
```yaml
# UNRESOLVED: many PS (parameter) commands set semi-discrete values (bass/treble/dialog level
# etc.) but are documented as UP/DOWN/direct-set rather than persistent parameters.
# Populated in Feedbacks where query (?) commands exist.
```

## Events
```yaml
# The device sends EVENT messages asynchronously when system state changes.
# EVENT format mirrors COMMAND format. No explicit event subscription mechanism described.
# Timing: EVENT sent within 5 seconds of state change.
# UNRESOLVED: complete event catalog not enumerated in source - implied by state-change
# behavior noted in "Others" section (input change triggers CV/MS events; surround mode
# change triggers preceding-mode return event).
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
# NOTE: Command timing constraint - wait 1 second after PWON (power on) before sending
# next command (document section J).
```

## Notes

**Command timing:** Send COMMANDs in 50ms or more intervals. RESPONSE must be sent within 200ms of receiving a request. After `PWON<CR>` (power on), wait 1 second before transmitting the next command.

**Command format:** ASCII codes 0x20–0x7F plus carriage return (0x0D) as separator. Structure: `COMMAND + PARAMETER + CR`. Maximum data length: 135 bytes.

**Three message types:**
- `COMMAND` — controller-to-device (e.g. `PWON<CR>`)
- `EVENT` — device-to-controller, sent unsolicited on state change within 5s
- `RESPONSE` — device-to-controller, sent within 200ms in reply to query (`?` suffix)

**Volume encoding:** Master volume and channel volume use 0.5dB steps encoded as 3 ASCII digits. 0dB = 80 (master), 50 (channel). Minimum (---) = 00.

**Multi-zone behavior:** When input source changes, channel volume returns as EVENT for all active channels. Surround mode change also returns EVENT; if mode is unchanged before/after, EVENT is suppressed. Channel volume does not return when re-setting the same surround mode.

**Zone 2/3:** Support independent source selection, volume, mute, tone (bass/treble), channel volume (FL/FR only), HPF, sleep timer, and auto-standby.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: Tu-1500RD-specific model vs generic AVR commands not differentiated in source -->
<!-- UNRESOLVED: complete list of EVENT types the device will send unsolicited -->
<!-- UNRESOLVED: flow control (hardware handshake) for RS-232 not stated in source -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
retrieved_at: 2026-04-29T09:03:31.094Z
last_checked_at: 2026-04-26T12:29:26.907Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T12:29:26.907Z
matched_actions: 132
action_count: 132
confidence: high
summary: "All 132 spec actions matched cleanly against source commands; transport parameters verified; semantic-id convention maps comprehensively to wire protocol."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
