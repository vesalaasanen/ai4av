---
spec_id: admin/denon-avr-discrete-codes
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVR Discrete Codes Control Spec"
manufacturer: Denon
model_family: "denon discrete codes"
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models: []
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T09:03:25.322Z
last_checked_at: 2026-05-14T18:17:15.332Z
generated_at: 2026-05-14T18:17:15.332Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.332Z
  matched_actions: 45
  action_count: 56
  confidence: high
  summary: "Every spec action matched literal source commands; all transport values verified in source; comprehensive coverage of AVR protocol."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Denon AVR Discrete Codes Control Spec

## Summary
Denon AVR control protocol supporting both RS-232C serial and Ethernet TCP/IP (Telnet) control. ASCII-based command/response protocol with three message types: COMMAND, EVENT, and RESPONSE. Protocol supports multi-zone control (Main Zone, Zone2, Zone3), tuner control, HD Radio, online music, USB/iPod, Bluetooth, and system configuration. No authentication required.

<!-- UNRESOLVED: compatible models list not stated — document covers generic Denon AVR protocol; specific model families not enumerated -->

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
  port: 23
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
      type: string
      description: ASCII value 00-98, 80=0dB, 00=minimum (---)

- id: mute_on
  label: Mute On
  kind: action
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: input_select
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-7, BT, USB/IPOD, USB, IPD, IRP, FVP

- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []

- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []

- id: channel_volume
  label: Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
    - name: direction
      type: string
      description: UP, DOWN, or absolute value (38-62, 50=0dB)

- id: channel_volume_reset
  label: Reset All Channel Levels
  kind: action
  params: []

- id: surround_mode_set
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DOLBY PRO LOGIC, DOLBY PL2 C/M/G, DOLBY PL2X C/M/G, DOLBY PL2Z H, DOLBY SURROUND, DOLBY ATMOS, DOLBY D EX, DOLBY D+PL2X C/M/G, DOLBY D+PL2Z H, DOLBY D+DS, DOLBY D+NEO:X C/M/G, DTS SURROUND, DTS ES DSCRT6.1, DTS ES MTRX6.1, DTS+PL2X C/M/G, DTS+PL2Z H, DTS+DS, DTS96/24, DTS96 ES MTRX, DTS+NEO:6, DTS+NEO:X C/M/G, MULTI CH IN, M CH IN+DOLBY EX, M CH IN+PL2X C/M/G, M CH IN+PL2Z H, M CH IN+DS, MULTI CH IN 7.1, M CH IN+NEO:X C/M/G, DOLBY D+, DOLBY D+ +EX, DOLBY D+ +PL2X C/M/G, DOLBY D+ +PL2Z H, DOLBY D+ +DS, DOLBY D+ +NEO:X C/M/G, DOLBY HD, DOLBY HD+EX, DOLBY HD+PL2X C/M/G, DOLBY HD+PL2Z H, DOLBY HD+DS, DOLBY HD+NEO:X C/M/G, DTS HD, DTS HD MSTR, DTS HD+PL2X C/M/G, DTS HD+PL2Z H, DTS HD+NEO:6, DTS HD+DS, DTS HD+NEO:X C/M/G, DTS EXPRESS, DTS ES 8CH DSCRT, MPEG2 AAC, AAC+DOLBY EX, AAC+PL2X C/M/G, AAC+PL2Z H, AAC+DS, AAC+NEO:X C/M/G, NEO:6 C DSX, NEO:6 M DSX, AUDYSSEY DSX, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, ALL ZONE STEREO, 7.1IN, PURE DIRECT EXT, QUICK1-5, QUICK0

- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: 0-120 (001-120, 010=10min), 0=OFF

- id: auto_standby
  label: Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: 15M, 30M, 60M, OFF

- id: eco_mode
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ON, AUTO, OFF

- id: video_scaling
  label: Video Scaling
  kind: action
  params:
    - name: setting
      type: string
      description: Aspect (ASPNRM, ASPFUL, ?), Monitor (MONIAUTO, MONI1, MONI2, ?), Resolution (SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO, ?), HDMI Resolution (SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO, ?), HDMI Audio (AUDIO AMP, AUDIO TV, ?), Video Processing (VPMAUTO, VPMGAME, VPMMOVI, ?), Vertical Stretch (VST ON, VST OFF, ?)

- id: tone_control
  label: Tone Control
  kind: action
  params:
    - name: setting
      type: string
      description: TONE CTRL ON/OFF, BAS UP/DOWN, TRE UP/DOWN, DIL ON/OFF/UP/DOWN, SWL ON/OFF/UP/DOWN, SWL2 UP/DOWN, CINEMA EQ.ON/OFF, MODE:MUSIC/CINEMA/GAME/PRO LOGIC/HEIGHT, PSLOM ON/OFF, FH:ON/OFF, SP:FW/FH/SB/HW/BH/BW/FL/HF/FR, PHG LOW/MID/HI, MULTEQ:AUDYSSEY/BYP.LR/FLAT/MANUAL/OFF, DYNEQ ON/OFF, REFLEV 0/5/10/15, DYNVOL HEV/MED/LIT/OFF, LFC ON/OFF, CNTAMT UP/DOWN, DSX ONHW/ONH/ONW/OFF, STW UP/DOWN, STH UP/DOWN, GEQ ON/OFF, DRC AUTO/LOW/MID/HI/OFF, BSC UP/DOWN, DEH OFF/LOW/MED/HIGH, LFE UP/DOWN, LFL 00/05/10/15, EFF ON/OFF/UP/DOWN, DEL UP/DOWN, PAN ON/OFF, DIM UP/DOWN, CEN UP/DOWN, CEI UP/DOWN, CEG UP/DOWN, CES ON/OFF, SWR ON/OFF, RSZ S/MS/M/ML/L, DELAY UP/DOWN, RSTR OFF/LOW/MED/HI, FRONT SPA/SPB/A+B

- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, STD, MOV, VVD, STM, CTM, DAY, NGT, CN UP/DOWN, BR UP/DOWN, ST UP/DOWN, HUE UP/DOWN, DNR OFF/LOW/MID/HI, ENH UP/DOWN

- id: zone2_on
  label: Zone2 On
  kind: action
  params: []

- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []

- id: zone2_source
  label: Zone2 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-7, BT, USB/IPOD, USB, IPD, IRP, FVP

- id: zone2_volume
  label: Zone2 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or absolute value (00-98, 80=0dB)

- id: zone2_mute
  label: Zone2 Mute
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: zone2_channel_volume
  label: Zone2 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL, FR
    - name: direction
      type: string
      description: UP, DOWN, or absolute value

- id: zone2_hpf
  label: Zone2 HPF
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: zone2_bass_treble
  label: Zone2 Bass/Treble
  kind: action
  params:
    - name: band
      type: string
      description: BAS, TRE
    - name: direction
      type: string
      description: UP, DOWN, or absolute value (00-99, 50=0dB)

- id: zone2_hdmi_audio
  label: Zone2 HDMI Audio
  kind: action
  params:
    - name: mode
      type: string
      description: THR (Through), PCM

- id: zone2_sleep
  label: Zone2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: 0=OFF, 001-120

- id: zone2_standby
  label: Zone2 Auto Standby
  kind: action
  params:
    - name: hours
      type: string
      description: 2H, 4H, 8H, OFF

- id: zone3_on
  label: Zone3 On
  kind: action
  params: []

- id: zone3_off
  label: Zone3 Off
  kind: action
  params: []

- id: zone3_source
  label: Zone3 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: Same as Zone2

- id: zone3_volume
  label: Zone3 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or absolute value

- id: zone3_mute
  label: Zone3 Mute
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: zone3_channel_volume
  label: Zone3 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL, FR
    - name: direction
      type: string
      description: UP, DOWN, or absolute value

- id: zone3_hpf
  label: Zone3 HPF
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: zone3_bass_treble
  label: Zone3 Bass/Treble
  kind: action
  params:
    - name: band
      type: string
      description: BAS, TRE
    - name: direction
      type: string
      description: UP, DOWN, or absolute value

- id: zone3_sleep
  label: Zone3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: 0=OFF, 001-120

- id: zone3_standby
  label: Zone3 Auto Standby
  kind: action
  params:
    - name: hours
      type: string
      description: 2H, 4H, 8H, OFF

- id: tuner_frequency
  label: Tuner Frequency
  kind: action
  params:
    - name: direction
      type: string
      description: ANUP, ANDOWN, or 6-digit frequency (AN******)
    - name: band
      type: string
      description: AM (>50000), FM (<=50000)

- id: tuner_preset
  label: Tuner Preset
  kind: action
  params:
    - name: operation
      type: string
      description: ANUP, ANDOWN, AN** (01-56), ANMEM, ANMEM**
    - name: preset
      type: integer
      description: 01-56 (when applicable)

- id: tuner_band_mode
  label: Tuner Band/Mode
  kind: action
  params:
    - name: band
      type: string
      description: ANAM (AM), ANFM (FM)
    - name: mode
      type: string
      description: ANAUTO, ANMANUAL

- id: hd_radio_channel
  label: HD Radio Channel
  kind: action
  params:
    - name: operation
      type: string
      description: HDUP, HDDOWN, or frequency (HD******), HDMC* (multicast 1-8, 0=analog)
    - name: frequency
      type: string
      description: 6-digit frequency with optional multicast channel

- id: hd_radio_preset
  label: HD Radio Preset
  kind: action
  params:
    - name: operation
      type: string
      description: HDUP, HDDOWN, HD** (01-56), HDMEM, HDMEM**

- id: hd_radio_band_mode
  label: HD Radio Band/Mode
  kind: action
  params:
    - name: setting
      type: string
      description: HDAM, HDFM, HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU

- id: netusb_control
  label: NetUSB/Online Music Control
  kind: action
  params:
    - name: command
      type: string
      description: "90=Cursor Up, 91=Cursor Down, 92=Cursor Left, 93=Cursor Right/Enter, 94=Play, 9A=Pause, 9B=Stop, 9C=Skip Plus, 9D=Skip Minus, 9E=Search Plus, 9F, 9G, 9H=Repeat One, 9I=Repeat All, 9J=Repeat Off, 9K=Random On, 9M=Random Off, 9W=Toggle iPod Mode, 9X=Page Next, 9Y=Page Previous, 9Z=Manual Search Stop, RPT=Repeat toggle, RND=Random toggle, B**=Preset Call (00-35), C**=Preset Memory (00-35), H=Preset Name Status, FV MEM=Add Favorites, A=Onscreen Display Info, E=Onscreen Display Info (UTF-8)"

- id: menu_control
  label: Menu/Control
  kind: action
  params:
    - name: operation
      type: string
      description: CUP (Up), CDN (Down), CLT, CRT (Right/Enter/Return/OPTION/INFO), ENT, RTN, OPT, INF, CHL (Channel Level Adjust), MEN ON/OFF/?, PRV ON/OFF/?, ZST ON/OFF/?

- id: system_control
  label: System Control
  kind: action
  params:
    - name: operation
      type: string
      description: REMOTE LOCK ON/OFF, PANEL LOCK ON/OFF, PANEL+V LOCK ON, TR1 ON/OFF, TR2 ON/OFF, ?

- id: maintenance
  label: Maintenance/Upgrade
  kind: action
  params:
    - name: operation
      type: string
      description: IDN (Display upgrade ID), STA (Start maintenance mode), END (End maintenance mode), ? (query maintenance status)

- id: display_dimmer
  label: Display Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: BRI (Bright), DIM (Dim), DAR (Dark), OFF (Off), SEL (Toggle cycle)

- id: quick_select
  label: Quick Select
  kind: action
  params:
    - name: zone
      type: string
      description: MS (Main), Z2, Z3
    - name: number
      type: integer
      description: 0-5 (0=clear, 1-5=recall, MEM suffix to save)
    - name: action
      type: string
      description: MEM (save current settings), or empty (recall)

- id: favorite
  label: Favorite
  kind: action
  params:
    - name: zone
      type: string
      description: ZM (Main), Z2, Z3
    - name: number
      type: integer
      description: 1-4
    - name: action
      type: string
      description: MEM (save), or empty (recall)

- id: zone2_channel_setting
  label: Zone2 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: ST (Stereo), MONO

- id: zone3_channel_setting
  label: Zone3 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: ST (Stereo), MONO

- id: video_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-7, CD, SOURCE (cancel), ON, OFF
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [ON, STANDBY]

- id: master_volume_status
  type: string
  description: MV status, ASCII value 00-98, 80=0dB

- id: mute_status
  type: enum
  values: [ON, OFF]

- id: input_source_status
  type: string
  description: Current input source

- id: main_zone_status
  type: enum
  values: [ON, OFF]

- id: channel_volume_status
  type: string
  description: CVFL/CVFR/etc. status, ASCII value 38-62, 50=0dB

- id: surround_mode_status
  type: string
  description: Current surround mode

- id: sleep_timer_status
  type: string
  description: SLP status, 001-120 minutes

- id: auto_standby_status
  type: string
  description: STBY status

- id: eco_mode_status
  type: string
  description: ECO status

- id: video_scaling_status
  type: string
  description: VSASPECT, VSMONI, VSSC status

- id: tone_control_status
  type: string
  description: PSTONE CONTROL, PSBAS, PSTRE, etc.

- id: picture_mode_status
  type: string
  description: PV status

- id: zone2_status
  type: string
  description: Z2 status including source and volume

- id: zone3_status
  type: string
  description: Z3 status including source and volume

- id: tuner_status
  type: string
  description: TFAN status including frequency and band

- id: hd_radio_status
  type: string
  description: HD status with band, station name, multi-cast info, signal level

- id: menu_status
  type: enum
  values: [ON, OFF]
  description: MNMEN status

- id: trigger_status
  type: string
  description: TR status (e.g., "TR1 ON<CR>TR2 ON<CR>")

- id: display_dimmer_status
  type: string
  description: DIM status

- id: maintenance_status
  type: string
  description: RM status (ON/OFF)
```

## Variables
```yaml
# Volume variables are settable parameters via MV/CV commands; modeled as actions.
# No separate Variables section required - volume levels are controlled via actions.
```

## Events
```yaml
# EVENT messages are sent unsolicited from the AVR when state changes.
# Events use the same format as COMMAND/RESPONSE.
# Key event behaviors documented:
- id: power_state_event
  type: string
  description: PW event sent when power state changes

- id: volume_event
  type: string
  description: MV/CV events sent when volume changes; note that changing input source may trigger CV events for all channels simultaneously

- id: surround_mode_event
  type: string
  description: MS event sent when surround mode changes; when input source changes, both surround mode and channel volume return as events if different from previous state

- id: input_source_event
  type: string
  description: SI event sent when input source changes

- id: mute_event
  type: string
  description: MU event sent when mute state changes

# Event timing:
# - Events sent within 5 seconds of state change
# - Events use half-duplex communication
# - Command can be received during EVENT transmission
```

## Macros
```yaml
# 1 second delay required after power on command (PWON) before sending next command.
# This is the only explicit macro/timing requirement stated in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - 1-second delay required after PWON command before transmitting next command
# UNRESOLVED: no safety warnings or interlock procedures found in source beyond power-on timing requirement
```

## Notes
**Command timing:** Send commands in 50ms or greater intervals. After PWON, wait 1 second before next command. Response within 200ms of request command.

**ASCII character range:** 0x20 to 0x7F plus carriage return (0x0D) as pause sign.

**Command structure:** COMMAND + PARAMETER + CR (0x0D). Max 135 bytes total per message.

**Half duplex:** Both RS-232 and Ethernet use half-duplex communication.

**Zone behavior:** When Zone2 mode is selected, Z2 status returns. When REC mode is selected, SR status returns.

**Channel volume:** Changing input source triggers channel volume changes for all channels simultaneously, returning as events.

**Volume representation:** Master volume 0dB = MV80, minimum = MV00 (---). Channel volume 0dB = 50, range 38-62 for most channels.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: specific compatible models list not enumerated — document is generic AVR protocol -->
<!-- UNRESOLVED: authentication credentials not stated — no auth required per protocol spec -->
<!-- UNRESOLVED: TCP keepalive/heartbeat interval not stated -->
<!-- UNRESOLVED: maximum concurrent Telnet sessions not specified -->
<!-- UNRESOLVED: Event/command queuing behavior when commands arrive during EVENT transmission not fully specified beyond " receivable also during transmission of EVENT" -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T09:03:25.322Z
last_checked_at: 2026-05-14T18:17:15.332Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.332Z
matched_actions: 45
action_count: 56
confidence: high
summary: "Every spec action matched literal source commands; all transport values verified in source; comprehensive coverage of AVR protocol."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
