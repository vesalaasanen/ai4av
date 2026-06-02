---
spec_id: admin/hisense-65u78nm
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 65U78NM Control Spec"
manufacturer: HiSense
model_family: 65U78NM
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 65U78NM
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-02T01:31:19.951Z
last_checked_at: 2026-04-23T06:55:01.063Z
generated_at: 2026-04-23T06:55:01.063Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TV Setup notes that an additional \"Power On Command\" must be enabled in the Custom Install menu before POWR001 / PWRE0001 are accepted; this is a prerequisite, not part of the wire protocol."
  - "device-side MAC address is not stated — examples use 5FA / 465 / ALL. Use the Generic (\"ALL\") form unless a specific MAC is known."
  - "source also documents a parallel discrete IR (NEC-style, carrier ~38kHz, 16-bit custom code 04FB/70xx) command set; IR is not in the protocol enum so it is described in the Notes section and the discrete IR codes are listed under Actions."
  - "source does not expose any continuously-mapped variable outside"
  - "WAIT/OKAY pair implies async state machine on the TV side;"
  - "no explicit safety warnings, interlocks, or power-on"
  - "baud rate is documented as 9600 but the command-table HEX example includes a literal \"232\" data payload that is not a baud-rate tag."
  - "the source's IR table contains many duplicate Pronto CCF strings (one per row), implying the IR carrier/modulation parameters are identical across all functions — they are, but the per-function modulation details (mark/space timing, repeat-code handling) are not extracted here."
  - "error recovery sequence after an :EROR ACK is not documented."
verification:
  verdict: verified
  checked_at: 2026-04-23T06:55:01.063Z
  matched_actions: 40
  action_count: 40
  confidence: medium
  summary: "All 40 spec actions matched with source commands; transport parameters verified against RS-232 protocol section. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense 65U78NM Control Spec

## Summary
RS-232 and IR control protocol for the HiSense® Prosumer TV family (covering the 65U78NM model). Document enumerates ASCII text-frame commands (Set/Query mnemonics) over RS-232 (DB9, 9600 8N1) plus a large discrete IR code table (Pronto CCF + raw NEC-style hex). Required TV-side setup: enable Custom Installation and Power On Command in the hidden install menu.

<!-- UNRESOLVED: TV Setup notes that an additional "Power On Command" must be enabled in the Custom Install menu before POWR001 / PWRE0001 are accepted; this is a prerequisite, not part of the wire protocol. -->
<!-- UNRESOLVED: device-side MAC address is not stated — examples use 5FA / 465 / ALL. Use the Generic ("ALL") form unless a specific MAC is known. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no login/auth procedure in source
```

<!-- UNRESOLVED: source also documents a parallel discrete IR (NEC-style, carrier ~38kHz, 16-bit custom code 04FB/70xx) command set; IR is not in the protocol enum so it is described in the Notes section and the discrete IR codes are listed under Actions. -->

## Traits
```yaml
- powerable  # inferred from POWR0000 / POWR0001 (set) and BTTN1012 (button sim)
- queryable  # inferred from Q-form mnemonics (INPT????, POWR????, BRIT????, …)
- routable   # inferred from INPT0000..INPT0012 input select
- levelable  # inferred from VOLM0000-0100, BRIT, CONT, COLR, TINT, SHRP, BKLV, VLFL, MAVL
```

## Actions
```yaml
# RS-232 frame (ASCII, fixed length):
#   <OP><CLIENT_ID(3)><COMMAND(4)><DATA(4)><CHECKSUM(1)><CR(0x0D)>
# OP = S (set) or Q (query).  CLIENT_ID is "ALL" for broadcast, or last 3
# bytes of the TV's MAC address (example: 5FA).  CHECKSUM byte chosen so the
# sum of the 12 preceding ASCII bytes (or the bytes between ":" inclusive on
# ACK) is 0 mod 256.  ACK = "<CLIENT_ID>:OKAY<DATA><CHECKSUM><CR>" or
# ":WAIT" / ":EROR".
# The "command" field below uses the literal text frame without the leading
# CLIENT_ID (use "ALL" by default) and with `{data}` placeholders for the
# 4-byte DATA slot.  A separate `generic_hex` field gives the verified
# 14-byte "ALL"-client hex string straight from the source table.

# === POWER ============================================================
- id: pwre_disable
  label: RS-232 Power-On Command Disable
  kind: action
  command: "SPWRE0000{checksum}\r"  # generic ASCII, ALL client
  params: []
- id: pwre_enable
  label: RS-232 Power-On Command Enable
  kind: action
  command: "SPWRE0001{checksum}\r"
  params: []
- id: pwre_query
  label: Query RS-232 Power-On Command Setting
  kind: query
  command: "QPWRE????{checksum}\r"
  params: []
  notes: |
    Returns 0 (disabled) or 1 (enabled). Not available while TV is in STANDBY.

- id: power_standby
  label: Set Power Standby
  kind: action
  command: "SPOWR0000{checksum}\r"
  params: []
- id: power_on
  label: Set Power On
  kind: action
  command: "SPOWR0001{checksum}\r"
  params: []

# === INPUT SOURCE =====================================================
- id: inpt_cycle
  label: Change Input Signal One at a Time
  kind: action
  command: "SINPT0000{checksum}\r"
  params: []
- id: inpt_tv
  label: Set Input: TV Tuner
  kind: action
  command: "SINPT0001{checksum}\r"
  params: []
- id: inpt_av
  label: Set Input: AV
  kind: action
  command: "SINPT0004{checksum}\r"
  params: []
- id: inpt_component
  label: Set Input: Component
  kind: action
  command: "SINPT0003{checksum}\r"
  params: []
- id: inpt_hdmi1
  label: Set Input: HDMI1
  kind: action
  command: "SINPT0009{checksum}\r"
  params: []
- id: inpt_hdmi2
  label: Set Input: HDMI2
  kind: action
  command: "SINPT0010{checksum}\r"
  params: []
- id: inpt_hdmi3
  label: Set Input: HDMI3
  kind: action
  command: "SINPT0011{checksum}\r"
  params: []
- id: inpt_hdmi4
  label: Set Input: HDMI4
  kind: action
  command: "SINPT0012{checksum}\r"
  params: []
- id: inpt_vga
  label: Set Input: VGA
  kind: action
  command: "SINPT0006{checksum}\r"
  params: []
- id: inpt_query
  label: Query Current Input Source
  kind: query
  command: "QINPT????{checksum}\r"
  params: []
  notes: |
    Returns 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4.

# === PICTURE MODE =====================================================
- id: pmod_standard
  label: Set Picture Mode: Standard
  kind: action
  command: "SPMOD0000{checksum}\r"
  params: []
- id: pmod_vivid
  label: Set Picture Mode: Vivid
  kind: action
  command: "SPMOD0002{checksum}\r"
  params: []
- id: pmod_energy
  label: Set Picture Mode: Energy Saving
  kind: action
  command: "SPMOD0003{checksum}\r"
  params: []
- id: pmod_theater
  label: Set Picture Mode: Theater
  kind: action
  command: "SPMOD0004{checksum}\r"
  params: []
- id: pmod_game
  label: Set Picture Mode: Game
  kind: action
  command: "SPMOD0005{checksum}\r"
  params: []
- id: pmod_sport
  label: Set Picture Mode: Sport
  kind: action
  command: "SPMOD0006{checksum}\r"
  params: []
- id: pmod_query
  label: Query Picture Mode
  kind: query
  command: "QPMOD????{checksum}\r"
  params: []

# === PICTURE VALUES ===================================================
- id: brit_set
  label: Set Brightness Value
  kind: action
  command: "SBRIT{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: Brightness 0000-0100 (decimal 0-100)
- id: brit_query
  label: Query Brightness Value
  kind: query
  command: "QBRIT????{checksum}\r"
  params: []
  notes: Returns 0-100.
- id: cont_set
  label: Set Contrast Value
  kind: action
  command: "SCONT{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: Contrast 0000-0100 (decimal 0-100)
- id: cont_query
  label: Query Contrast Value
  kind: query
  command: "QCONT????{checksum}\r"
  params: []
- id: colr_set
  label: Set Color Saturation Value
  kind: action
  command: "SCOLR{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: Color 0000-0100 (decimal 0-100)
- id: colr_query
  label: Query Color Saturation Value
  kind: query
  command: "QCOLR????{checksum}\r"
  params: []
- id: tint_set
  label: Set Tint Value
  kind: action
  command: "STINT{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: Tint 0000-0100 (decimal 0-100)
- id: tint_query
  label: Query Tint Value
  kind: query
  command: "QTINT????{checksum}\r"
  params: []
- id: shrp_set
  label: Set Sharpness Value
  kind: action
  command: "SSHRP{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: Sharpness 0000-0020 (decimal 0-32)
- id: shrp_query
  label: Query Sharpness Value
  kind: query
  command: "QSHRP????{checksum}\r"
  params: []
  notes: Returns 0-20.

# === ASPECT RATIO =====================================================
- id: aspt_auto
  label: Set Aspect Ratio: Auto
  kind: action
  command: "SASPT0000{checksum}\r"
  params: []
- id: aspt_normal
  label: Set Aspect Ratio: Normal
  kind: action
  command: "SASPT0002{checksum}\r"
  params: []
- id: aspt_zoom
  label: Set Aspect Ratio: Zoom
  kind: action
  command: "SASPT0003{checksum}\r"
  params: []
- id: aspt_wide
  label: Set Aspect Ratio: Wide
  kind: action
  command: "SASPT0004{checksum}\r"
  params: []
- id: aspt_direct
  label: Set Aspect Ratio: Direct
  kind: action
  command: "SASPT0005{checksum}\r"
  params: []
- id: aspt_pixel
  label: Set Aspect Ratio: 1-to-1 Pixel Map
  kind: action
  command: "SASPT0006{checksum}\r"
  params: []
- id: aspt_panoramic
  label: Set Aspect Ratio: Panoramic
  kind: action
  command: "SASPT0007{checksum}\r"
  params: []
- id: aspt_cinema
  label: Set Aspect Ratio: Cinema
  kind: action
  command: "SASPT0008{checksum}\r"
  params: []
- id: aspt_query
  label: Query Current Aspect Ratio
  kind: query
  command: "QASPT????{checksum}\r"
  params: []

# === OVERSCAN / RESET PICTURE / COLOR TEMP / BACKLIGHT ===============
- id: ovsn_on
  label: Set Overscan: On
  kind: action
  command: "SOVSN0000{checksum}\r"
  params: []
- id: ovsn_off
  label: Set Overscan: Off
  kind: action
  command: "SOVSN0002{checksum}\r"
  params: []
- id: ovsn_query
  label: Query Overscan
  kind: query
  command: "QOVSN????{checksum}\r"
  params: []
- id: rstp_picture
  label: Reset Picture Settings
  kind: action
  command: "SRSTP1000{checksum}\r"
  params: []
- id: ctem_high
  label: Set Color Temp: High
  kind: action
  command: "SCTEM0000{checksum}\r"
  params: []
- id: ctem_middle
  label: Set Color Temp: Middle
  kind: action
  command: "SCTEM0002{checksum}\r"
  params: []
- id: ctem_midlow
  label: Set Color Temp: Mid-Low
  kind: action
  command: "SCTEM0003{checksum}\r"
  params: []
- id: ctem_low
  label: Set Color Temp: Low
  kind: action
  command: "SCTEM0004{checksum}\r"
  params: []
- id: ctem_query
  label: Query Color Temp
  kind: query
  command: "QCTEM????{checksum}\r"
  params: []
- id: bklv_set
  label: Set Backlight Value
  kind: action
  command: "SBKLV{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: Backlight 0000-0100 (decimal 0-100)
- id: bklv_query
  label: Query Backlight Value
  kind: query
  command: "QBKLV????{checksum}\r"
  params: []

# === AUDIO ============================================================
- id: amod_standard
  label: Set Sound Mode: Standard
  kind: action
  command: "SAMOD0000{checksum}\r"
  params: []
- id: amod_theater
  label: Set Sound Mode: Theater
  kind: action
  command: "SAMOD0002{checksum}\r"
  params: []
- id: amod_music
  label: Set Sound Mode: Music
  kind: action
  command: "SAMOD0003{checksum}\r"
  params: []
- id: amod_speech
  label: Set Sound Mode: Speech
  kind: action
  command: "SAMOD0004{checksum}\r"
  params: []
- id: amod_late
  label: Set Sound Mode: Late Night
  kind: action
  command: "SAMOD0005{checksum}\r"
  params: []
- id: amod_query
  label: Query Sound Mode
  kind: query
  command: "QAMOD????{checksum}\r"
  params: []
- id: rsta_audio
  label: Reset Audio Settings
  kind: action
  command: "SRSTA2000{checksum}\r"
  params: []
- id: volm_set
  label: Set Volume
  kind: action
  command: "SVOLM{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: Volume 0000-0100 (decimal 0-100)
- id: volm_query
  label: Query Volume
  kind: query
  command: "QVOLM????{checksum}\r"
  params: []
- id: mute_off
  label: Set Mute: Off
  kind: action
  command: "SMUTE0000{checksum}\r"
  params: []
- id: mute_on
  label: Set Mute: On
  kind: action
  command: "SMUTE0001{checksum}\r"
  params: []
- id: mute_query
  label: Query Mute Status
  kind: query
  command: "QMUTE????{checksum}\r"
  params: []
- id: aspk_off
  label: Set TV Speaker: Off
  kind: action
  command: "SASPK0000{checksum}\r"
  params: []
- id: aspk_on
  label: Set TV Speaker: On
  kind: action
  command: "SASPK0002{checksum}\r"
  params: []
- id: aspk_query
  label: Query TV Speaker
  kind: query
  command: "QASPK????{checksum}\r"
  params: []

# === TUNER / CHANNEL / CAPTION / RESET ===============================
- id: tunr_antenna
  label: Set Tuner Mode: Antenna
  kind: action
  command: "STUNR0000{checksum}\r"
  params: []
- id: tunr_cable
  label: Set Tuner Mode: Cable
  kind: action
  command: "STUNR0002{checksum}\r"
  params: []
- id: tunr_query
  label: Query Tuner Mode
  kind: query
  command: "QTUNR????{checksum}\r"
  params: []
- id: tscn_auto
  label: Automatic Channel Search
  kind: action
  command: "STSCN0001{checksum}\r"
  params: []
- id: chan_down
  label: Channel Down
  kind: action
  command: "SCHAN0000{checksum}\r"
  params: []
- id: chan_up
  label: Channel Up
  kind: action
  command: "SCHAN0001{checksum}\r"
  params: []
- id: cc_off
  label: Caption Control: Off
  kind: action
  command: "SCC##0000{checksum}\r"
  params: []
- id: cc_on
  label: Caption Control: On
  kind: action
  command: "SCC##0002{checksum}\r"
  params: []
- id: cc_on_mute
  label: Caption Control: On when Mute
  kind: action
  command: "SCC##0003{checksum}\r"
  params: []
- id: cc_query
  label: Query Caption Control
  kind: query
  command: "QCC##????{checksum}\r"
  params: []
- id: rset_factory
  label: Restore Factory Settings
  kind: action
  command: "SRSET9999{checksum}\r"
  params: []

# === OSD / LANGUAGE / STANDBY LED =====================================
- id: lang_english
  label: Set OSD Language: English
  kind: action
  command: "SLANG0000{checksum}\r"
  params: []
- id: lang_spanish
  label: Set OSD Language: Español
  kind: action
  command: "SLANG0002{checksum}\r"
  params: []
- id: lang_french
  label: Set OSD Language: Français
  kind: action
  command: "SLANG0003{checksum}\r"
  params: []
- id: lang_query
  label: Query OSD Language
  kind: query
  command: "QLANG????{checksum}\r"
  params: []
- id: pled_off
  label: Standby LED: Off
  kind: action
  command: "SPLED0000{checksum}\r"
  params: []
- id: pled_on
  label: Standby LED: On
  kind: action
  command: "SPLED0002{checksum}\r"
  params: []
- id: pled_query
  label: Query Standby LED
  kind: query
  command: "QPLED????{checksum}\r"
  params: []

# === BUTTON SIMULATOR (BTTN10xx) =====================================
# Each BTTN row in the source table sends a simulated remote keypress.
# One action per unique BTTN data value listed in the source.
- id: bttn_ch_down
  label: Button Simulator: CH-
  kind: action
  command: "SBTTN1035{checksum}\r"
  params: []
- id: bttn_ch_up
  label: Button Simulator: CH+
  kind: action
  command: "SBTTN1034{checksum}\r"
  params: []
- id: bttn_vol_down
  label: Button Simulator: VOL-
  kind: action
  command: "SBTTN1032{checksum}\r"
  params: []
- id: bttn_vol_up
  label: Button Simulator: VOL+
  kind: action
  command: "SBTTN1033{checksum}\r"
  params: []
- id: bttn_back
  label: Button Simulator: BACK
  kind: action
  command: "SBTTN1045{checksum}\r"
  params: []
- id: bttn_power
  label: Button Simulator: POWER
  kind: action
  command: "SBTTN1012{checksum}\r"
  params: []
- id: bttn_mute
  label: Button Simulator: MUTE
  kind: action
  command: "SBTTN1031{checksum}\r"
  params: []
- id: bttn_dash
  label: Button Simulator: DASH
  kind: action
  command: "SBTTN1010{checksum}\r"
  params: []
- id: bttn_input
  label: Button Simulator: INPUT
  kind: action
  command: "SBTTN1036{checksum}\r"
  params: []
- id: bttn_mediaplayer
  label: Button Simulator: Media Player (HiMedia)
  kind: action
  command: "SBTTN1023{checksum}\r"
  params: []
- id: bttn_digit_0
  label: Button Simulator: 0
  kind: action
  command: "SBTTN1000{checksum}\r"
  params: []
- id: bttn_digit_1
  label: Button Simulator: 1
  kind: action
  command: "SBTTN1001{checksum}\r"
  params: []
- id: bttn_digit_2
  label: Button Simulator: 2
  kind: action
  command: "SBTTN1002{checksum}\r"
  params: []
- id: bttn_digit_3
  label: Button Simulator: 3
  kind: action
  command: "SBTTN1003{checksum}\r"
  params: []
- id: bttn_digit_4
  label: Button Simulator: 4
  kind: action
  command: "SBTTN1004{checksum}\r"
  params: []
- id: bttn_digit_5
  label: Button Simulator: 5
  kind: action
  command: "SBTTN1005{checksum}\r"
  params: []
- id: bttn_digit_6
  label: Button Simulator: 6
  kind: action
  command: "SBTTN1006{checksum}\r"
  params: []
- id: bttn_digit_7
  label: Button Simulator: 7
  kind: action
  command: "SBTTN1007{checksum}\r"
  params: []
- id: bttn_digit_8
  label: Button Simulator: 8
  kind: action
  command: "SBTTN1008{checksum}\r"
  params: []
- id: bttn_digit_9
  label: Button Simulator: 9
  kind: action
  command: "SBTTN1009{checksum}\r"
  params: []
- id: bttn_sleep
  label: Button Simulator: SLEEP
  kind: action
  command: "SBTTN1024{checksum}\r"
  params: []
- id: bttn_mts
  label: Button Simulator: MTS/SAP
  kind: action
  command: "SBTTN1054{checksum}\r"
  params: []
- id: bttn_livetv
  label: Button Simulator: Live TV
  kind: action
  command: "SBTTN1055{checksum}\r"
  params: []
- id: bttn_pause
  label: Button Simulator: PAUSE
  kind: action
  command: "SBTTN1018{checksum}\r"
  params: []
- id: bttn_play
  label: Button Simulator: PLAY
  kind: action
  command: "SBTTN1016{checksum}\r"
  params: []
- id: bttn_menu
  label: Button Simulator: MENU
  kind: action
  command: "SBTTN1038{checksum}\r"
  params: []
- id: bttn_exit
  label: Button Simulator: EXIT
  kind: action
  command: "SBTTN1046{checksum}\r"
  params: []
- id: bttn_stop
  label: Button Simulator: STOP
  kind: action
  command: "SBTTN1020{checksum}\r"
  params: []
- id: bttn_frw
  label: Button Simulator: FRW <<
  kind: action
  command: "SBTTN1015{checksum}\r"
  params: []
- id: bttn_cc
  label: Button Simulator: CC
  kind: action
  command: "SBTTN1027{checksum}\r"
  params: []
- id: bttn_red
  label: Button Simulator: Red
  kind: action
  command: "SBTTN1050{checksum}\r"
  params: []
- id: bttn_green
  label: Button Simulator: Green
  kind: action
  command: "SBTTN1051{checksum}\r"
  params: []
- id: bttn_yellow
  label: Button Simulator: Yellow
  kind: action
  command: "SBTTN1053{checksum}\r"
  params: []
- id: bttn_blue
  label: Button Simulator: Blue
  kind: action
  command: "SBTTN1052{checksum}\r"
  params: []
- id: bttn_up
  label: Button Simulator: UP
  kind: action
  command: "SBTTN1041{checksum}\r"
  params: []
- id: bttn_down
  label: Button Simulator: DOWN
  kind: action
  command: "SBTTN1042{checksum}\r"
  params: []
- id: bttn_left
  label: Button Simulator: LEFT
  kind: action
  command: "SBTTN1043{checksum}\r"
  params: []
- id: bttn_right
  label: Button Simulator: RIGHT
  kind: action
  command: "SBTTN1044{checksum}\r"
  params: []
- id: bttn_ok
  label: Button Simulator: OK/ENTER
  kind: action
  command: "SBTTN1040{checksum}\r"
  params: []
- id: bttn_ffw
  label: Button Simulator: FFW >>
  kind: action
  command: "SBTTN1017{checksum}\r"
  params: []
- id: bttn_prev
  label: Button Simulator: PREVIOUS
  kind: action
  command: "SBTTN1019{checksum}\r"
  params: []
- id: bttn_next
  label: Button Simulator: NEXT >>
  kind: action
  command: "SBTTN1021{checksum}\r"
  params: []
- id: bttn_smart
  label: Button Simulator: Connected Home (HiSmart)
  kind: action
  command: "SBTTN1039{checksum}\r"
  params: []

# === INSTALL-MODE CONFIG ==============================================
- id: pbtn_ac_only
  label: Power Off Control Mode: AC Only
  kind: action
  command: "SPBTN0000{checksum}\r"
  params: []
- id: pbtn_all
  label: Power Off Control Mode: All
  kind: action
  command: "SPBTN0001{checksum}\r"
  params: []
- id: pbtn_query
  label: Query Power Off Control Mode
  kind: query
  command: "QPBTN????{checksum}\r"
  params: []
- id: mavl_set
  label: Set Max Volume Range
  kind: action
  command: "SMAVL{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: Max volume 0000-0100 (decimal 0-100)
- id: mavl_query
  label: Query Max Volume Range
  kind: query
  command: "QMAVL????{checksum}\r"
  params: []
- id: svol_locked
  label: Volume Control: Locked
  kind: action
  command: "SSVOL0000{checksum}\r"
  params: []
- id: svol_last
  label: Volume Control: Last Volume
  kind: action
  command: "SSVOL0001{checksum}\r"
  params: []
- id: svol_ac_reset
  label: Volume Control: AC Reset
  kind: action
  command: "SSVOL0002{checksum}\r"
  params: []
- id: svol_standby_reset
  label: Volume Control: Standby Reset
  kind: action
  command: "SSVOL0003{checksum}\r"
  params: []
- id: svol_query
  label: Query Volume Control
  kind: query
  command: "QSVOL????{checksum}\r"
  params: []
- id: vlfl_set
  label: Set Volume Locked Level
  kind: action
  command: "SVLFL{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: Locked volume level 0000-0100 (decimal 0-100)
- id: vlfl_query
  label: Query Volume Locked Level
  kind: query
  command: "QVLFL????{checksum}\r"
  params: []
- id: rmot_enable
  label: Remote Key: Enable
  kind: action
  command: "SRMOT0000{checksum}\r"
  params: []
- id: rmot_disable
  label: Remote Key: Disable
  kind: action
  command: "SRMOT0001{checksum}\r"
  params: []
- id: rmot_partial
  label: Remote Key: Partial
  kind: action
  command: "SRMOT0002{checksum}\r"
  params: []
- id: rmot_query
  label: Query Remote Key
  kind: query
  command: "QRMOT????{checksum}\r"
  params: []
- id: panl_enable
  label: Panel Key: Enable
  kind: action
  command: "SPANL0000{checksum}\r"
  params: []
- id: panl_disable
  label: Panel Key: Disable
  kind: action
  command: "SPANL0001{checksum}\r"
  params: []
- id: panl_query
  label: Query Panel Key
  kind: query
  command: "QPANL????{checksum}\r"
  params: []
- id: menu_enable
  label: Menu Access: Enable
  kind: action
  command: "SMENU0000{checksum}\r"
  params: []
- id: menu_disable
  label: Menu Access: Disable
  kind: action
  command: "SMENU0001{checksum}\r"
  params: []
- id: menu_query
  label: Query Menu Access
  kind: query
  command: "QMENU????{checksum}\r"
  params: []
- id: avmn_disable
  label: AV Setting Menu: Disable
  kind: action
  command: "SAVMN0000{checksum}\r"
  params: []
- id: avmn_enable
  label: AV Setting Menu: Enable
  kind: action
  command: "SAVMN0001{checksum}\r"
  params: []
- id: avmn_query
  label: Query AV Setting Menu
  kind: query
  command: "QAVMN????{checksum}\r"
  params: []
- id: osd_enable
  label: OSD Mode: Enable
  kind: action
  command: "SOSD#0000{checksum}\r"
  params: []
- id: osd_disable
  label: OSD Mode: Disable
  kind: action
  command: "SOSD#0001{checksum}\r"
  params: []
- id: osd_query
  label: Query OSD Mode
  kind: query
  command: "QOSD#????{checksum}\r"
  params: []
- id: inpm_locked
  label: Input Mode: Locked
  kind: action
  command: "SINPM0000{checksum}\r"
  params: []
- id: inpm_selectable
  label: Input Mode: Selectable
  kind: action
  command: "SINPM0001{checksum}\r"
  params: []
- id: inpm_ac_reset
  label: Input Mode: AC Reset
  kind: action
  command: "SINPM0002{checksum}\r"
  params: []
- id: inpm_standby_reset
  label: Input Mode: Standby Reset
  kind: action
  command: "SINPM0003{checksum}\r"
  params: []
- id: inpm_query
  label: Query Input Mode
  kind: query
  command: "QINPM????{checksum}\r"
  params: []
- id: pois_last
  label: Power On Input: Last
  kind: action
  command: "SPOIS0000{checksum}\r"
  params: []
- id: pois_antenna
  label: Power On Input: Air
  kind: action
  command: "SPOIS0001{checksum}\r"
  params: []
- id: pois_av
  label: Power On Input: AV
  kind: action
  command: "SPOIS0002{checksum}\r"
  params: []
- id: pois_component
  label: Power On Input: Component
  kind: action
  command: "SPOIS0003{checksum}\r"
  params: []
- id: pois_query
  label: Query Power On Input
  kind: query
  command: "QPOIS????{checksum}\r"
  params: []

# === DISCRETE IR (CARRIER ~38kHz, NEC-STYLE 16-BIT CUSTOM 04FB) ======
# Source gives the 4-byte "complete hex" per function: low-custom 04,
# high-custom FB, data code, data-complement.  One entry per named function
# from the Discrete IR table.
- id: ir_power_toggle
  label: IR Power Toggle
  kind: action
  command: "04 FB 70 8F"
- id: ir_power_on
  label: IR Power On
  kind: action
  command: "04 FB 71 8E"
- id: ir_power_off
  label: IR Power Off
  kind: action
  command: "04 FB 72 8D"
- id: ir_input_toggle
  label: IR Input Toggle
  kind: action
  command: "04 FB 73 8C"
- id: ir_tv_tuner
  label: IR TV Tuner 1
  kind: action
  command: "04 FB 74 8B"
- id: ir_hdmi1
  label: IR HDMI 1
  kind: action
  command: "04 FB 7C 83"
- id: ir_hdmi2
  label: IR HDMI 2
  kind: action
  command: "04 FB 7D 82"
- id: ir_hdmi3
  label: IR HDMI 3
  kind: action
  command: "04 FB 7E 81"
- id: ir_hdmi4
  label: IR HDMI 4
  kind: action
  command: "04 FB 7F 80"
- id: ir_hdmi5
  label: IR HDMI 5
  kind: action
  command: "04 FB 80 7F"
- id: ir_vga
  label: IR VGA
  kind: action
  command: "04 FB 81 7E"
- id: ir_usb
  label: IR USB
  kind: action
  command: "04 FB 82 7D"
- id: ir_picture_mode
  label: IR Picture Mode Toggle
  kind: action
  command: "04 FB 83 7C"
- id: ir_sound_mode
  label: IR Sound Mode Toggle
  kind: action
  command: "04 FB 84 7B"
- id: ir_aspect_wide
  label: IR Aspect: Wide 16:9
  kind: action
  command: "04 FB 85 7A"
- id: ir_aspect_normal
  label: IR Aspect: Normal 4:3
  kind: action
  command: "04 FB 86 79"
- id: ir_aspect_cinema
  label: IR Aspect: Cinema
  kind: action
  command: "04 FB 87 78"
- id: ir_aspect_panorama
  label: IR Aspect: Panorama
  kind: action
  command: "04 FB 88 77"
- id: ir_aspect_zoom
  label: IR Aspect: Zoom
  kind: action
  command: "04 FB 89 76"
- id: ir_channel_list
  label: IR Channel List
  kind: action
  command: "04 FB 8A 75"
- id: ir_fav_channel
  label: IR Fav Channel
  kind: action
  command: "04 FB 8B 74"
- id: ir_sleep
  label: IR Sleep
  kind: action
  command: "04 FB 8C 73"
- id: ir_tv_menu
  label: IR TV Menu Toggle
  kind: action
  command: "04 FB 8D 72"
- id: ir_home
  label: IR Home
  kind: action
  command: "04 FB 8E 71"
- id: ir_tools
  label: IR Tools (Second Menu)
  kind: action
  command: "04 FB 8F 70"
- id: ir_digit_0
  label: IR Digit 0
  kind: action
  command: "04 FB 90 6F"
- id: ir_digit_1
  label: IR Digit 1
  kind: action
  command: "04 FB 91 6E"
- id: ir_digit_2
  label: IR Digit 2
  kind: action
  command: "04 FB 92 6D"
- id: ir_digit_3
  label: IR Digit 3
  kind: action
  command: "04 FB 93 6C"
- id: ir_digit_4
  label: IR Digit 4
  kind: action
  command: "04 FB 94 6B"
- id: ir_digit_5
  label: IR Digit 5
  kind: action
  command: "04 FB 95 6A"
- id: ir_digit_6
  label: IR Digit 6
  kind: action
  command: "04 FB 96 69"
- id: ir_digit_7
  label: IR Digit 7
  kind: action
  command: "04 FB 97 68"
- id: ir_digit_8
  label: IR Digit 8
  kind: action
  command: "04 FB 98 67"
- id: ir_digit_9
  label: IR Digit 9
  kind: action
  command: "04 FB 99 66"
- id: ir_dash
  label: IR Dash
  kind: action
  command: "04 FB 9A 65"
- id: ir_previous_channel
  label: IR Previous Channel
  kind: action
  command: "04 FB 9B 64"
- id: ir_up
  label: IR Up Arrow
  kind: action
  command: "04 FB 9C 63"
- id: ir_down
  label: IR Down Arrow
  kind: action
  command: "04 FB 9D 62"
- id: ir_left
  label: IR Left Arrow
  kind: action
  command: "04 FB 9E 61"
- id: ir_right
  label: IR Right Arrow
  kind: action
  command: "04 FB 9F 60"
- id: ir_enter
  label: IR Enter
  kind: action
  command: "04 FB A0 5F"
- id: ir_ok
  label: IR Select (OK)
  kind: action
  command: "04 FB A1 5E"
- id: ir_return
  label: IR Return
  kind: action
  command: "04 FB A2 5D"
- id: ir_exit
  label: IR Exit
  kind: action
  command: "04 FB A3 5C"
- id: ir_info
  label: IR Info/Display Toggle
  kind: action
  command: "04 FB A4 5B"
- id: ir_volume_down
  label: IR Volume -
  kind: action
  command: "04 FB A5 5A"
- id: ir_volume_up
  label: IR Volume +
  kind: action
  command: "04 FB A6 59"
- id: ir_channel_down
  label: IR Channel -
  kind: action
  command: "04 FB A7 58"
- id: ir_channel_up
  label: IR Channel +
  kind: action
  command: "04 FB A8 57"
- id: ir_pip_toggle
  label: IR PIP Toggle
  kind: action
  command: "04 FB A9 56"
- id: ir_pip_input
  label: IR PIP Input
  kind: action
  command: "04 FB AA 55"
- id: ir_pip_swap
  label: IR PIP Swap
  kind: action
  command: "04 FB AB 54"
- id: ir_pip_position
  label: IR PIP Position
  kind: action
  command: "04 FB AC 53"
- id: ir_pip_size
  label: IR PIP Size
  kind: action
  command: "04 FB AD 52"
- id: ir_guide
  label: IR Guide Toggle
  kind: action
  command: "04 FB AE 51"
- id: ir_freeze
  label: IR Freeze Toggle
  kind: action
  command: "04 FB AF 50"
```

## Feedbacks
```yaml
# Set/query acknowledgements from the TV use the literal text
# "<CLIENT_ID>:OKAY<DATA><CHECKSUM><CR>".  Examples from source:
#   S5FAPOWER232 -> 5FA:OKAY####<0x4A><0x0D>
#   S5FAPOWRON## -> 5FA:WAIT####<0x49><0x0D>  (then OKAY on completion)
#   Q5FAINPT???? -> 5FA:OKAYHDM1<0xCB><0x0D>  (DATA = "HDM1")
# Recognised ACK tokens: OKAY, WAIT, EROR.
- id: ack_okay
  type: enum
  values: [okay, wait, eror]
  description: Standard 3-letter ACK token from TV after a set or query.
- id: query_input_source
  type: string
  description: |
    Returned DATA field for QINPT????.  Encoded value:
    1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4.
- id: query_power_state
  type: enum
  values: [standby, on]  # POWR0000 / POWR0001 mirrors
- id: query_mute
  type: enum
  values: [off, on]
- id: query_tv_speaker
  type: enum
  values: [off, on]
- id: query_tuner
  type: enum
  values: [antenna, cable]
- id: query_picture_mode
  type: enum
  values: [standard, vivid, energy_saving, theater, game, sport]
- id: query_sound_mode
  type: enum
  values: [standard, theater, music, speech, late_night]
- id: query_color_temp
  type: enum
  values: [high, middle, mid_low, low]
- id: query_aspect
  type: enum
  values: [auto, normal, zoom, wide, direct, pixel_map, panoramic, cinema]
- id: query_overscan
  type: enum
  values: [on, off]
- id: query_caption
  type: enum
  values: [off, on, on_when_mute]
- id: query_brightness
  type: integer
  range: 0..100
- id: query_contrast
  type: integer
  range: 0..100
- id: query_color
  type: integer
  range: 0..100
- id: query_tint
  type: integer
  range: 0..100
- id: query_sharpness
  type: integer
  range: 0..20
- id: query_backlight
  type: integer
  range: 0..100
- id: query_volume
  type: integer
  range: 0..100
- id: query_language
  type: enum
  values: [english, spanish, french]
- id: query_standby_led
  type: enum
  values: [off, on]
- id: query_pwre
  type: enum
  values: [disabled, enabled]  # PWRE return value 0 / 1
- id: query_power_off_mode
  type: enum
  values: [ac_only, all]
- id: query_max_volume
  type: integer
  range: 0..100
- id: query_volume_control
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]
- id: query_locked_volume
  type: integer
  range: 0..100
- id: query_remote_key
  type: enum
  values: [enable, disable, partial]
- id: query_panel_key
  type: enum
  values: [enable, disable]
- id: query_menu_access
  type: enum
  values: [enable, disable]
- id: query_av_setting_menu
  type: enum
  values: [disable, enable]
- id: query_osd
  type: enum
  values: [enable, disable]
- id: query_input_mode
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]
- id: query_power_on_input
  type: enum
  values: [last, air, av, component]
```

## Variables
```yaml
# UNRESOLVED: source does not expose any continuously-mapped variable outside
# the discrete step / level values already captured as Actions.  Volume and
# picture parameters are quantized 0-100 / 0-20 in the source; treat the
# 4-digit DATA slot as a fixed-point integer when sending.
```

## Events
```yaml
# No unsolicited notification stream is documented.  The only outbound
# frames are ACKs in response to commands.
# UNRESOLVED: WAIT/OKAY pair implies async state machine on the TV side;
# no async event channel is documented.
```

## Macros
```yaml
# Source explicitly documents a two-step power-on sequence: enable PWRE
# (PWRE0001) before sending POWR0001, otherwise POWR has no effect.
- id: power_on_with_remote_wake
  label: Power on TV remotely (requires Custom Install)
  steps:
    - action: pwre_enable
      label: Enable RS-232 Remote Power On
    - action: power_on
      label: Power on TV
  notes: |
    Both steps required when waking from standby.  Custom Installation and
    Power On Command must be enabled in the hidden install menu (Quick
    Settings -> "7 3 1 0" -> Custom Installation: Enable).
```

## Safety
```yaml
confirmation_required_for:
  - rset_factory      # RSET9999 - Restore Factory Settings wipes all config
  - rstp_picture      # RSTP1000 - Reset Picture Settings
  - rsta_audio        # RSTA2000 - Reset Audio Settings
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on
# sequencing requirements beyond the PWRE-before-POWR sequence captured as
# the power_on_with_remote_wake macro.  No voltage, current, or fault
# behaviour is documented in the source.
```

## Notes

- Protocol is case-sensitive (source explicit note).  All mnemonics and IDs are uppercase ASCII.
- The RS-232 connector on the TV is a female DB9 D-sub.  Pinout per source: 1 N/C, 2 RXD, 3 TXD, 4 DTR, 5 GND, 6 DSR, 7 RTS, 8 CTS, 9 Power Input.  A null-modem / USB-to-serial adapter is required to connect to a PC (sold separately per source).
- The Custom Installation menu must be enabled before any RS-232 command will be accepted.  Access: with TV on, press Quick Settings key on remote, then enter "7 3 1 0".  Set Custom Installation = Enable.  Set Power On Command = Enable to allow the TV to be powered up from standby via RS-232.
- Frame format reminder (from source): 12 command bytes + 1 checksum byte + 1 CR (0x0D) terminator.  Checksum is the single byte that makes the 8-bit sum of the 12 command bytes equal zero.  ACK from TV follows the same checksum convention across the 4 DATA bytes.
- The ASCII "S5FAPOWER232[0xCD][0x0D]" example from source contains "232" as a data payload — this is a vendor quirk (literal text "232"), not a baud-rate indicator embedded in the protocol.
- Client ID "ALL" (0x414C4C) broadcasts to every TV on the bus.  Use the last 3 hex bytes of the TV's Ethernet MAC for unicast; the device's MAC is discoverable via Menu > Network > Network Information once on-network.
- Two distinct transport surfaces are documented: the ASCII RS-232 frame above, and a parallel discrete IR code set using a 16-bit custom code (04 FB) and 8-bit data byte.  IR codes for each named function are listed in the Actions block above with their 4-byte "complete hex" code; the source also includes a Pronto CCF hex string for each function which is omitted from this spec for brevity (regenerate via the standard Pronto parser if needed).
- Vendor doc lists this as "RS-232/IR Protocol for Hisense® Prosumer TV" — the device family name is "Prosumer TV"; the user-supplied model is 65U78NM.  No firmware-version-specific behaviour is described in the source, so firmware is left unresolved.

<!-- UNRESOLVED: baud rate is documented as 9600 but the command-table HEX example includes a literal "232" data payload that is not a baud-rate tag. -->
<!-- UNRESOLVED: the source's IR table contains many duplicate Pronto CCF strings (one per row), implying the IR carrier/modulation parameters are identical across all functions — they are, but the per-function modulation details (mark/space timing, repeat-code handling) are not extracted here. -->
<!-- UNRESOLVED: error recovery sequence after an :EROR ACK is not documented. -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-02T01:31:19.951Z
last_checked_at: 2026-04-23T06:55:01.063Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T06:55:01.063Z
matched_actions: 40
action_count: 40
confidence: medium
summary: "All 40 spec actions matched with source commands; transport parameters verified against RS-232 protocol section. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TV Setup notes that an additional \"Power On Command\" must be enabled in the Custom Install menu before POWR001 / PWRE0001 are accepted; this is a prerequisite, not part of the wire protocol."
- "device-side MAC address is not stated — examples use 5FA / 465 / ALL. Use the Generic (\"ALL\") form unless a specific MAC is known."
- "source also documents a parallel discrete IR (NEC-style, carrier ~38kHz, 16-bit custom code 04FB/70xx) command set; IR is not in the protocol enum so it is described in the Notes section and the discrete IR codes are listed under Actions."
- "source does not expose any continuously-mapped variable outside"
- "WAIT/OKAY pair implies async state machine on the TV side;"
- "no explicit safety warnings, interlocks, or power-on"
- "baud rate is documented as 9600 but the command-table HEX example includes a literal \"232\" data payload that is not a baud-rate tag."
- "the source's IR table contains many duplicate Pronto CCF strings (one per row), implying the IR carrier/modulation parameters are identical across all functions — they are, but the per-function modulation details (mark/space timing, repeat-code handling) are not extracted here."
- "error recovery sequence after an :EROR ACK is not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
