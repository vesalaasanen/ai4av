---
spec_id: admin/tascam-bd-01u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Tascam BD-01U Control Spec"
manufacturer: Tascam
model_family: BD-01U
aliases: []
compatible_with:
  manufacturers:
    - Tascam
  models:
    - BD-01U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - tascam.com
  - tascam.eu
source_urls:
  - https://tascam.com/wp-content/uploads/downloads/products/tascam/bd-01u/rs-232c_protocol_bd-01uv0102_en.pdf
  - https://tascam.com/wp-content/uploads/downloads/products/tascam/bd-01u/bd-01u_spec_om_e_v1b.pdf
  - https://tascam.eu/en/downloads/archive/BD-01U
  - https://www.tascam.eu/en/docs/BD-01U_RS-232C_Protocol_v102.pdf
retrieved_at: 2026-05-14T02:34:39.467Z
last_checked_at: 2026-06-02T07:06:46.236Z
generated_at: 2026-06-02T07:06:46.236Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated in source"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:46.236Z
  matched_actions: 87
  action_count: 87
  confidence: medium
  summary: "All 87 spec actions matched exactly with source commands; transport parameters verified verbatim. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Tascam BD-01U Control Spec

## Summary
Blu-ray Disc Player controllable via RS-232C (3-wire, 9600/8N1) or TCP (port 60128). ASCII command protocol with `!7` unit-type prefix and CR/LF terminator. Ethernet transport wraps the same ASCII message in an ISCP header ("ISCP" + header size 0x00000010 + data size + version 0x01 + reserved 0x000000).

<!-- UNRESOLVED: firmware version not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 60128  # fixed per source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # 3-wire half-duplex, no flow control lines
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # PWR command
- queryable       # ?ST / ?SN / ?SV / ?SC queries
- routable        # ASC aspect, RSC resolution
- levelable       # DIM dimmer
```

## Actions
```yaml
# Command framing:
# - Serial: !7<CMD><PARAM>[CR|LF|CRLF]
# - Ethernet: ISCP header (16 bytes) + ASCII payload (no CR/LF inside header)
# Unit type "7" = Blu-ray Disc Player. All commands are controller -> device unless noted.

- id: power_standby
  label: Set System Standby
  kind: action
  command: "!7PWR00[CR]"
  params: []

- id: power_on
  label: Set System On
  kind: action
  command: "!7PWR01[CR]"
  params: []

- id: power_toggle
  label: Toggle Power (Standby <-> On)
  kind: action
  command: "!7PWR02[CR]"
  params: []

- id: open_close_tray
  label: Open/Close Tray
  kind: action
  command: "!7OPC[CR]"
  params: []

- id: osd_up
  label: OSD Cursor Up
  kind: action
  command: "!7OSDUP[CR]"
  params: []

- id: osd_down
  label: OSD Cursor Down
  kind: action
  command: "!7OSDDN[CR]"
  params: []

- id: osd_left
  label: OSD Cursor Left
  kind: action
  command: "!7OSDLF[CR]"
  params: []

- id: osd_right
  label: OSD Cursor Right
  kind: action
  command: "!7OSDRH[CR]"
  params: []

- id: color_a_red
  label: Color Button A (Red)
  kind: action
  command: "!7CBCAB[CR]"
  params: []

- id: color_b_green
  label: Color Button B (Green)
  kind: action
  command: "!7CBCBB[CR]"
  params: []

- id: color_c_blue
  label: Color Button C (Blue)
  kind: action
  command: "!7CBCCB[CR]"
  params: []

- id: color_d_yellow
  label: Color Button D (Yellow)
  kind: action
  command: "!7CBCDB[CR]"
  params: []

- id: enter
  label: Enter
  kind: action
  command: "!7ENT[CR]"
  params: []

- id: return
  label: Return
  kind: action
  command: "!7RET[CR]"
  params: []

- id: home
  label: Home
  kind: action
  command: "!7HOM[CR]"
  params: []

- id: menu
  label: Menu / PopupMenu
  kind: action
  command: "!7MNU[CR]"
  params: []

- id: title_menu
  label: Title (Top Menu)
  kind: action
  command: "!7TMN[CR]"
  params: []

- id: display
  label: Display (On Screen)
  kind: action
  command: "!7DSP[CR]"
  params: []

- id: pip_toggle
  label: PIP On/Off Toggle
  kind: action
  command: "!7PIPTG[CR]"
  params: []

- id: pip_on
  label: PIP On
  kind: action
  command: "!7PIPON[CR]"
  params: []

- id: pip_off
  label: PIP Off
  kind: action
  command: "!7PIPOF[CR]"
  params: []

- id: angle
  label: Angle
  kind: action
  command: "!7ANG[CR]"
  params: []

- id: audio
  label: Audio
  kind: action
  command: "!7AUD[CR]"
  params: []

- id: subtitle
  label: Subtitle Change
  kind: action
  command: "!7SUB[CR]"
  params: []

- id: play
  label: Play
  kind: action
  command: "!7PLYUP[CR]"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "!7STP[CR]"
  params: []

- id: pause
  label: Pause
  kind: action
  command: "!7PAS[CR]"
  params: []

- id: skip_up
  label: Skip Up (Next)
  kind: action
  command: "!7SKPUP[CR]"
  params: []

- id: skip_down
  label: Skip Down (Previous)
  kind: action
  command: "!7SKPDN[CR]"
  params: []

- id: scan_ff
  label: Scan Fast Forward
  kind: action
  command: "!7SCNUP[CR]"
  params: []

- id: scan_fr
  label: Scan Fast Reverse
  kind: action
  command: "!7SCNDN[CR]"
  params: []

- id: num_digit
  label: Numeric 1-9
  kind: action
  command: "!7NUM{nn}[CR]"  # nn = 01..09
  params:
    - name: nn
      type: string
      description: Two-digit number "01"-"09"

- id: num_zero_or_ten
  label: Numeric 0 or 10
  kind: action
  command: "!7NUM00[CR]"
  params: []

- id: search
  label: Search
  kind: action
  command: "!7SRC[CR]"
  params: []

- id: repeat
  label: Repeat Toggle
  kind: action
  command: "!7RPT[CR]"
  params: []

- id: ab_repeat
  label: A-B Repeat
  kind: action
  command: "!7ABR[CR]"
  params: []

- id: play_mode_toggle
  label: PlayMode Toggle
  kind: action
  command: "!7PLMTG[CR]"
  params: []

- id: clear
  label: Clear
  kind: action
  command: "!7CLR[CR]"
  params: []

- id: dimmer_step
  label: Dimmer Step (cycle one level)
  kind: action
  command: "!7DIMDN[CR]"
  params: []

- id: dimmer_bright
  label: Dimmer Bright
  kind: action
  command: "!7DIM00[CR]"
  params: []

- id: dimmer_dark
  label: Dimmer Dark
  kind: action
  command: "!7DIM02[CR]"
  params: []

- id: dimmer_auto
  label: Dimmer Auto
  kind: action
  command: "!7DIM07[CR]"
  params: []

- id: menu_lang_en
  label: Player Menu Language - English
  kind: action
  command: "!7CMLEN[CR]"
  params: []

- id: menu_lang_fr
  label: Player Menu Language - French
  kind: action
  command: "!7CMLFR[CR]"
  params: []

- id: menu_lang_sp
  label: Player Menu Language - Spanish
  kind: action
  command: "!7CMLSP[CR]"
  params: []

- id: menu_lang_de
  label: Player Menu Language - Deutsch
  kind: action
  command: "!7CMLGE[CR]"
  params: []

- id: menu_lang_it
  label: Player Menu Language - Italian
  kind: action
  command: "!7CMLIT[CR]"
  params: []

- id: menu_lang_jp
  label: Player Menu Language - Japanese
  kind: action
  command: "!7CMLJP[CR]"
  params: []

- id: init_start
  label: Initialize (requires No Disc state)
  kind: action
  command: "!7INI00[CR]"
  params: []

- id: init_reset_setup
  label: Reset Default Settings (Setup Menu, excl. Parental)
  kind: action
  command: "!7INI01[CR]"
  params: []

- id: cec_toggle
  label: CEC Control Toggle (Stop state only)
  kind: action
  command: "!7CCRTG[CR]"
  params: []

- id: cec_enable
  label: CEC Control Enable (Stop state only)
  kind: action
  command: "!7CCRON[CR]"
  params: []

- id: cec_disable
  label: CEC Control Disable (Stop state only)
  kind: action
  command: "!7CCROF[CR]"
  params: []

- id: econtrol_toggle
  label: E-control Power Toggle
  kind: action
  command: "!7EWCTG[CR]"
  params: []

- id: econtrol_enable
  label: E-control Power Enable
  kind: action
  command: "!7EWCON[CR]"
  params: []

- id: econtrol_disable
  label: E-control Power Disable
  kind: action
  command: "!7EWCOF[CR]"
  params: []

- id: hdmi_audio_multi_normal
  label: HDMI Audio - Multi (Normal)
  kind: action
  command: "!7MAU00[CR]"
  params: []

- id: hdmi_audio_multi_lpcm
  label: HDMI Audio - Multi (LPCM)
  kind: action
  command: "!7MAU02[CR]"
  params: []

- id: hdmi_audio_off
  label: HDMI Audio - Off
  kind: action
  command: "!7MAUFF[CR]"
  params: []

- id: pms_off
  label: Status Notifications - Off
  kind: action
  command: "!7PMS00[CR]"
  params: []

- id: pms_on
  label: Status Notifications - On (changes)
  kind: action
  command: "!7PMS01[CR]"
  params: []

- id: pms_no_time_off
  label: Status Notifications - No/Time Off
  kind: action
  command: "!7PMS02[CR]"
  params: []

- id: pms_no_time_on
  label: Status Notifications - No/Time On (changes)
  kind: action
  command: "!7PMS03[CR]"
  params: []

- id: aspect_43_letterbox
  label: Aspect 4:3 Letterbox
  kind: action
  command: "!7ASC00[CR]"
  params: []

- id: aspect_43_normal
  label: Aspect 4:3 Normal
  kind: action
  command: "!7ASC01[CR]"
  params: []

- id: aspect_169_wide
  label: Aspect 16:9 Widescreen
  kind: action
  command: "!7ASC02[CR]"
  params: []

- id: aspect_169_squeeze
  label: Aspect 16:9 Squeeze
  kind: action
  command: "!7ASC03[CR]"
  params: []

- id: resolution_toggle
  label: Resolution Toggle (Stop state only)
  kind: action
  command: "!7RSCTG[CR]"
  params: []

- id: resolution_auto
  label: Resolution Auto (Stop state only)
  kind: action
  command: "!7RSC01[CR]"
  params: []

- id: resolution_480p_576p
  label: Resolution 480p / 576p (576p Europe)
  kind: action
  command: "!7RSC02[CR]"
  params: []

- id: resolution_720p
  label: Resolution 720p
  kind: action
  command: "!7RSC03[CR]"
  params: []

- id: resolution_1080i
  label: Resolution 1080i
  kind: action
  command: "!7RSC04[CR]"
  params: []

- id: resolution_1080p
  label: Resolution 1080p
  kind: action
  command: "!7RSC05[CR]"
  params: []

- id: resolution_1080p24
  label: Resolution 1080p24
  kind: action
  command: "!7RSC07[CR]"
  params: []

- id: query_status_action
  label: Query Action Status
  kind: query
  command: "!7?STST[CR]"
  params: []

- id: query_status_disc
  label: Query Disc Status
  kind: query
  command: "!7?STDS[CR]"
  params: []

- id: query_status_dimmer
  label: Query Dimmer Status
  kind: query
  command: "!7?STMS[CR]"
  params: []

- id: query_status_aspect
  label: Query Aspect Ratio Status
  kind: query
  command: "!7?STAS[CR]"
  params: []

- id: query_status_resolution
  label: Query Resolution Status
  kind: query
  command: "!7?STRS[CR]"
  params: []

- id: query_status_hdmi_audio
  label: Query HDMI Audio Status
  kind: query
  command: "!7?STMA[CR]"
  params: []

- id: query_status_hdmi_output
  label: Query HDMI Output Status
  kind: query
  command: "!7?STMT[CR]"
  params: []

- id: query_title_group
  label: Query Title/Group/Folder No
  kind: query
  command: "!7?SNTG[CR]"
  params: []

- id: query_chapter_track
  label: Query Chapter/Track No
  kind: query
  command: "!7?SNTC[CR]"
  params: []

- id: query_elapsed_time
  label: Query Elapsed Time
  kind: query
  command: "!7?SNET[CR]"
  params: []

- id: query_hdmi_resolution
  label: Query HDMI Out Resolution
  kind: query
  command: "!7?SVMO[CR]"
  params: []

- id: query_menu_lang
  label: Query Menu Language
  kind: query
  command: "!7?SCML[CR]"
  params: []

- id: query_cec_status
  label: Query CEC Control Status
  kind: query
  command: "!7?SCCR[CR]"
  params: []
```

## Feedbacks
```yaml
# Device -> Controller. Terminator [EOF] (0x1A) on all status notifications.

- id: pms_notification
  type: enum
  values: [off, on, no_time_off, no_time_on]
  values_codes:
    "00": off
    "01": on
    "02": no_time_off
    "03": no_time_on

- id: action_status
  type: enum
  values: [standby, playback, pause, stop, unknown]
  values_codes:
    "00": standby
    "01": playback
    "02": pause
    "03": stop
    "FF": unknown

- id: disc_status
  type: enum
  values: [no_disc, dvd, cd, cd_data, bd_rom, usb, unknown]
  values_codes:
    "00": no_disc
    "01": dvd
    "04": cd
    "07": cd_data
    "10": bd_rom
    "12": usb
    "FF": unknown

- id: dimmer_status
  type: enum
  values: [bright, dark, auto, unknown]
  values_codes:
    "00": bright
    "02": dark
    "07": auto
    "FF": unknown

- id: aspect_status
  type: enum
  values: [letterbox, normal_43, widescreen, squeeze, unknown]
  values_codes:
    "00": letterbox
    "01": normal_43
    "02": widescreen
    "03": squeeze
    "FF": unknown

- id: title_group_no
  type: string
  description: "6 chars: cccTTT (current/total), or --- placeholders when unknown"

- id: chapter_track_no
  type: string
  description: "6 chars: cccTTT (current/total), or --- placeholders when unknown"

- id: elapsed_time
  type: string
  description: "hmmss format, or spaces when unknown (e.g. SET-0001 = 00:01)"

- id: hdmi_out_resolution
  type: enum
  values_codes:
    "00": no_video
    "02": 480p60
    "04": 720p60
    "05": 1080i60
    "16": 1080p60
    "17": 576p50
    "19": 720p50
    "20": 1080i50
    "31": 1080p50
    "32": 1080p24
    "35": 720p100
    "36": 720p120
    "37": 1080p48
    "FF": unknown

- id: menu_lang_status
  type: enum
  values: [en, fr, sp, de, it, jp]
  values_codes:
    "EN": en
    "FR": fr
    "SP": sp
    "GE": de
    "IT": it
    "JP": jp

- id: cec_status
  type: enum
  values: [enabled, disabled]
  values_codes:
    "ON": enabled
    "OF": disabled

- id: hdmi_resolution_setup
  type: enum
  values: [auto, 480p_576p, 720p, 1080i, 1080p, 1080p24, unknown]
  values_codes:
    "01": auto
    "02": 480p_576p
    "03": 720p
    "04": 1080i
    "05": 1080p
    "07": 1080p24
    "FF": unknown

- id: hdmi_audio_setup
  type: enum
  values: [multi_normal, multi_lpcm, off]
  values_codes:
    "00": multi_normal
    "02": multi_lpcm
    "FF": off
```

## Variables
```yaml
# No continuous/settable parameters beyond discrete command values in this spec.
```

## Events
```yaml
# Status notifications arrive as feedback messages ending in [EOF] (0x1A)
# when PMS mode is 01 or 03. See Feedbacks section for the SPM, SST, DST, MST,
# AST, STG, STC, SET, SMO, SCM, SCC, SMR, SMA notifications.
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes from source: INI00 only valid in "No Disc" state; INI01/CCR/*/MAU*/*/RSC* 
# marked "* Only recognized when the status is 'Stop'". Treat these as state-gated,
# not as safety interlocks, since source frames them as operational constraints.
```

## Notes
RS-232 is 3-wire half-duplex (RX/TX/GND only) on D-sub 9 female; do not cross-flow-control lines. Serial settings fixed: 9600/8/N/1.

Ethernet transport: TCP port 60128, only one client at a time, connection must be held open continuously to receive unsolicited status notifications. Messages from client must be spaced at least 50ms apart. Ethernet frames use 16-byte ISCP header (`ISCP` + 0x00000010 header-size BE + data-size BE + 0x01 version + 0x000000 reserved) wrapping the same `!7<CMD><PARAM>` ASCII payload (no CR/LF inside Ethernet frame).

Command framing rules: serial end char is CR / LF / CRLF (any one); status reply end char is [EOF] (0x1A). Unit-type character `7` is fixed for BD-01U.

Some commands (`INI01`, `CCR*`, `MAU*`, `RSC*`) are only recognized when player status is "Stop" — track player state before issuing. Dimmer DN cycles one step; use DN/00/02/07 for explicit levels. Aspect/Resolution values `FF` mean unknown/other.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - tascam.com
  - tascam.eu
source_urls:
  - https://tascam.com/wp-content/uploads/downloads/products/tascam/bd-01u/rs-232c_protocol_bd-01uv0102_en.pdf
  - https://tascam.com/wp-content/uploads/downloads/products/tascam/bd-01u/bd-01u_spec_om_e_v1b.pdf
  - https://tascam.eu/en/downloads/archive/BD-01U
  - https://www.tascam.eu/en/docs/BD-01U_RS-232C_Protocol_v102.pdf
retrieved_at: 2026-05-14T02:34:39.467Z
last_checked_at: 2026-06-02T07:06:46.236Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:46.236Z
matched_actions: 87
action_count: 87
confidence: medium
summary: "All 87 spec actions matched exactly with source commands; transport parameters verified verbatim. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated in source"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
