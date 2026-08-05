---
spec_id: admin/sharp-electronics-pn-me552
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Electronics PN-ME552 Control Spec"
manufacturer: Sharp
model_family: PN-ME432
aliases: []
compatible_with:
  manufacturers:
    - Sharp
    - "Sharp Electronics"
  models:
    - PN-ME432
    - PN-ME502
    - PN-ME552
    - PN-ME652
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/manuals/external_control_mexx2_en.pdf
retrieved_at: 2026-08-05T06:40:15.170Z
last_checked_at: 2026-08-05T08:42:02.189Z
generated_at: 2026-08-05T08:42:02.189Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document refers to the device as \"NEC LCD monitor\"; model family PN-ME is marketed under Sharp Electronics. Voltage/current/power specs not documented here. Firmware version compatibility not stated."
  - "flow control not stated in source"
  - "per-VCP value feedbacks not individually enumerated; each VCP opcode is queryable via Get VCP (MsgType 'C')."
  - "no explicit multi-step sequences described in source."
  - "no explicit interlock sequencing beyond command-interval waits. Voltage/current/power specs not in source."
  - "firmware version compatibility not stated. Flow control not stated. CTL-CA20 detail absent from section 5. Power/voltage/current specs out of scope of this control doc."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:42:02.189Z
  matched_actions: 130
  action_count: 130
  confidence: medium
  summary: "All 27 outbound CTL and 103 VCP opcodes from source sections 5.1/6.1 are represented in spec; transport params match section 3. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-05
---

# Sharp Electronics PN-ME552 Control Spec

## Summary
External control spec for the Sharp/NEC PN-ME series LCD monitor (PN-ME432/502/552/652). Supports RS-232C and LAN (TCP) control via a framed binary protocol (CTL commands and VCP get/set opcodes) with XOR block-check codes. Covers power, input selection, schedule, picture/audio settings, tile matrix, security lock, and diagnostics.

<!-- UNRESOLVED: source document refers to the device as "NEC LCD monitor"; model family PN-ME is marketed under Sharp Electronics. Voltage/current/power specs not documented here. Firmware version compatibility not stated. -->

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
  flow_control: none  # UNRESOLVED: flow control not stated in source
addressing:
  port: 7142
auth:
  type: none  # inferred: no transport auth procedure in source (C21D is a device feature lock, not transport login)
```

## Traits
```yaml
traits:
  - powerable    # inferred: CTL-C203-D6 power control present
  - queryable    # inferred: many status read / VCP get commands present
  - levelable    # inferred: volume, backlight, contrast set commands present
  - routable     # inferred: input source select commands present
```

## Actions
```yaml
# ── Framing ────────────────────────────────────────────────────────────
# Full frame = Header(7 bytes) + Message(STX..ETX) + BCC(1) + CR(0Dh).
# Header = SOH(01h) | Reserved(30h) | Destination | Source | MsgType | Length(2 ascii).
# BCC = XOR of all bytes from Reserved..ETX (excludes SOH). Delimiter = CR (0Dh).
# `command:` below holds ONLY the Message body (STX..ETX) verbatim; the caller
# must wrap it with header + BCC + CR per section 4. All payload bytes are
# ASCII-encoded hex (1 data byte -> 2 ASCII hex chars). e.g. byte 3Ah -> '3','A'.
# CTL MsgType header byte: 'A'(41h) request / 'B'(42h) reply.
# VCP MsgType header byte: 'C'(43h) Get / 'D'(44h) Get-reply / 'E'(45h) Set / 'F'(46h) Set-reply.

# ── CTL Commands (section 5) ───────────────────────────────────────────
- id: ctl_07_timing_report
  label: Get Timing Report
  kind: query
  command: "02 30 37 03"
  params: []
  description: "Read H/V sync frequency of current image. Reply cmd '4''E' (34h 45h)."

- id: ctl_0c_save_settings
  label: Save Current Settings
  kind: action
  command: "02 30 30 30 43 03"
  params: []
  description: "Save current adjusted values to non-volatile memory."

- id: ctl_b1_selfdiag_read
  label: Self-Diagnosis Status Read
  kind: query
  command: "02 42 31 03"
  params: []
  description: "Read self-diagnostic status. Reply cmd 'A''1' (41h 31h) with error codes."

- id: ctl_01d6_power_status_read
  label: Power Status Read
  kind: query
  command: "02 30 31 44 36 03"
  params: []
  description: "Read power status. Reply codes: 0001=on, 0002=power save, 0003=reserved, 0004=off."

- id: ctl_c203_d6_power_control
  label: Power Control
  kind: action
  command: "02 43 32 30 33 44 36 {p3}{p2}{p1}{p0} 03"
  params:
    - name: power
      type: enum
      description: "Power state, 4 ASCII hex: 0001 (30 30 30 31)=ON, 0004 (30 30 30 34)=OFF"
  description: "Request monitor power on/off. Wait ~15s after before next command."

- id: ctl_c03f_fw_revision_read
  label: Firmware Revision Read
  kind: query
  command: "02 43 30 33 46 03"
  params: []
  description: "Read display firmware revision string. Reply cmd 'C''1''3''F'."

- id: ctl_c211_datetime_read
  label: Date & Time Read
  kind: query
  command: "02 43 32 31 31 03"
  params: []
  description: "Read date & time setting. Reply cmd 'C''3''1''1'."

- id: ctl_c212_datetime_write
  label: Date & Time Write
  kind: action
  command: "02 43 32 31 32 {yr2}{yr1}{mo2}{mo1}{dy2}{dy1}{wd2}{wd1}{hr2}{hr1}{mn2}{mn1} 30 30 03"
  params:
    - name: year
      type: integer
      description: "Year offset from 2000 (2 ascii hex, 00-63)"
    - name: month
      type: integer
      description: "Month (2 ascii hex, 01-0C)"
    - name: day
      type: integer
      description: "Day (2 ascii hex, 01-1F)"
    - name: weekday
      type: enum
      description: "00=Sun..06=Sat (2 ascii hex)"
    - name: hours
      type: integer
      description: "0-23 (2 ascii hex)"
    - name: minutes
      type: integer
      description: "0-59 (2 ascii hex)"
  description: "Write date & time. Reserved bytes '0''0' before ETX."

- id: ctl_c216_serial_read
  label: Serial Number Read
  kind: query
  command: "02 43 32 31 36 03"
  params: []
  description: "Read monitor serial number string. Reply cmd 'C''3''1''6'."

- id: ctl_c217_model_read
  label: Model Name Read
  kind: query
  command: "02 43 32 31 37 03"
  params: []
  description: "Read monitor model name string. Reply cmd 'C''3''1''7'."

- id: ctl_c21d_security_lock
  label: Security Lock Control
  kind: action
  command: "02 43 32 31 44 {md2}{md1} {d1b}{d1a}{d2b}{d2a}{d3b}{d3a}{d4b}{d4a} 03"
  params:
    - name: mode
      type: integer
      description: "Bitmask (2 ascii hex): bit0=startup lock, bit1=control lock, bit2=lock admin"
    - name: passcode
      type: string
      description: "4-digit passcode, each digit 2 ascii hex (00-09 each)"
  description: "Change security lock settings. Requires matching 4-digit passcode. ACK cmd 'C''3''1''D'."

- id: ctl_c220_mac_read
  label: MAC Address Read
  kind: query
  command: "02 43 32 32 30 30 30 03"
  params: []
  description: "Read MAC address. Reply cmd 'C''3''2''0' with select device + 12-byte MAC string."

- id: ctl_c22b_ping
  label: Ping Command (IPv4)
  kind: action
  command: "02 43 32 32 42 30 45 30 34 {o1b}{o1a}{o2b}{o2a}{o3b}{o3a}{o4b}{o4a} 03"
  params:
    - name: octet1
      type: integer
      description: "Dest IP octet 1 (2 ascii hex, 00-FF)"
    - name: octet2
      type: integer
      description: "Dest IP octet 2 (2 ascii hex, 00-FF)"
    - name: octet3
      type: integer
      description: "Dest IP octet 3 (2 ascii hex, 00-FF)"
    - name: octet4
      type: integer
      description: "Dest IP octet 4 (2 ascii hex, 00-FF)"
  description: "Monitor performs ICMP ping to destination IPv4. ACK cmd 'C''3''2''B'."

- id: ctl_c23d_schedule_read
  label: Schedule Read
  kind: query
  command: "02 43 32 33 44 {pg2}{pg1} 03"
  params:
    - name: program_no
      type: integer
      description: "Program number (2 ascii hex, 00=No.1 .. 0E=No.15)"
  description: "Read schedule settings for a program. Reply cmd 'C''3''3''D'."

- id: ctl_c23e_schedule_write
  label: Schedule Write
  kind: action
  command: "02 43 32 33 45 {pg2}{pg1}{ev2}{ev1}{hr2}{hr1}{mn2}{mn1}{in2}{in1}{wk2}{wk1}{st2}{st1} 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 03"
  params:
    - name: program_no
      type: integer
      description: "Program number (00=No.1 .. 0E=No.15)"
    - name: event
      type: enum
      description: "01=Power ON, 02=Power OFF, 03=Reserved, 04=Reboot"
    - name: hour
      type: integer
      description: "0-23 (18=----default)"
    - name: minute
      type: integer
      description: "0-59 (3C=----default)"
    - name: input_terminal
      type: enum
      description: "00=last mem, 11=HDMI1, 12=HDMI2, 82=HDMI3, 89=USB-C, 87=Home"
    - name: weekday_bits
      type: integer
      description: "bit0=Mon..bit6=Sun bitmask"
    - name: schedule_type
      type: integer
      description: "bit2=enable/disable program"
  description: "Write schedule. Unsupported fields zeroed. ACK cmd 'C''3''3''E'."

- id: ctl_c23f_schedule_enable
  label: Enable/Disable Schedule Write
  kind: action
  command: "02 43 32 33 46 {pg2}{pg1}{en2}{en1} 03"
  params:
    - name: program_no
      type: integer
      description: "Program number (00=No.1 .. 0D=No.14)"
    - name: enable
      type: enum
      description: "00=Disable, 01=Enable, 02=Delete"
  description: "Set/read enable/disable of a schedule program. ACK cmd 'C''3''3''F'."

- id: ctl_ca04_00_input_name_read
  label: Input Name Read Request
  kind: query
  command: "02 43 41 30 34 30 30 03"
  params: []
  description: "Read current input terminal name. ACK cmd 'C''B''0''4''0''0'."

- id: ctl_ca04_01_input_name_write
  label: Input Name Write Request
  kind: action
  command: "02 43 41 30 34 30 31 {name_bytes} 03"
  params:
    - name: name
      type: string
      description: "Input name, ASCII-hex encoded (max 28 bytes = 14 chars)"
  description: "Write current input terminal name. ACK cmd 'C''B''0''4''0''1'."

- id: ctl_ca04_02_input_name_reset
  label: Input Name Reset Request
  kind: action
  command: "02 43 41 30 34 30 32 03"
  params: []
  description: "Reset current input terminal name to default. ACK cmd 'C''B''0''4''0''2'."

- id: ctl_ca04_03_input_name_designated_read
  label: Input Name of Designated Terminal Read
  kind: query
  command: "02 43 41 30 34 30 33 {t2}{t1} 03"
  params:
    - name: terminal
      type: enum
      description: "11=HDMI1, 12=HDMI2, 82=HDMI3, 89=USB-C, 87=Home"
  description: "Read name of a specified input terminal. ACK cmd 'C''B''0''4''0''3'."

- id: ctl_ca04_04_input_name_designated_write
  label: Input Name of Designated Terminal Write
  kind: action
  command: "02 43 41 30 34 30 34 {t2}{t1} {name_bytes} 03"
  params:
    - name: terminal
      type: enum
      description: "11=HDMI1, 12=HDMI2, 82=HDMI3, 89=USB-C, 87=Home"
    - name: name
      type: string
      description: "Input name, ASCII-hex encoded (max 14 chars)"
  description: "Write name of a specified input terminal. ACK cmd 'C''B''0''4''0''4'."

- id: ctl_ca04_05_input_name_designated_reset
  label: Input Name of Designated Terminal Reset
  kind: action
  command: "02 43 41 30 34 30 35 {t2}{t1} 03"
  params:
    - name: terminal
      type: enum
      description: "11=HDMI1,12=HDMI2,82=HDMI3,89=USB-C,C0=Home,C1-C6=App1-6"
  description: "Reset name of a specified input terminal. ACK cmd 'C''B''0''4''0''5'."

- id: ctl_ca0b_00_powersave_read
  label: Power Save Mode Read
  kind: query
  command: "02 43 41 30 42 30 30 03"
  params: []
  description: "Read power save mode. ACK 'C''B''0''B''0''0': 00=ENABLE, 01=NotSupport, 02=DISABLE."

- id: ctl_ca0b_01_powersave_write
  label: Power Save Mode Write
  kind: action
  command: "02 43 41 30 42 30 31 {m2}{m1} 03"
  params:
    - name: mode
      type: enum
      description: "00=ENABLE, 01=Not Support, 02=DISABLE"
  description: "Write power save mode. ACK 'C''B''0''B''0''1'."

- id: ctl_ca0b_02_autosave_time_read
  label: Auto Power Save Time Read
  kind: query
  command: "02 43 41 30 42 30 32 03"
  params: []
  description: "Read auto power save time. ACK 'C''B''0''B''0''2'. 1 step=5 sec (01..78)."

- id: ctl_ca0b_03_autosave_time_write
  label: Auto Power Save Time Write
  kind: action
  command: "02 43 41 30 42 30 33 {t2}{t1} 03"
  params:
    - name: time
      type: integer
      description: "1-120 (1 step=5 sec), 2 ascii hex"
  description: "Write auto power save time. ACK 'C''B''0''B''0''3'."

- id: ctl_ca0f_00_terminal_list
  label: Get Terminal List
  kind: query
  command: "02 43 41 30 46 30 30 03"
  params: []
  description: "Read terminal list. ACK 'C''B''0''F''0''0' with count + list."

# ── VCP Commands (section 6) ───────────────────────────────────────────
# Get VCP msg (MsgType 'C'=43h): "02 {page2ascii} {code2ascii} 03"
# Set VCP msg (MsgType 'E'=45h): "02 {page2ascii} {code2ascii} {value4ascii} 03"
# value = 16-bit, encoded as 4 ASCII hex chars (4 bytes). command: below is the SET msg.
# Read-only opcodes use kind: query with the GET msg.

- id: vcp_00_10_backlight
  label: Backlight
  kind: action
  command: "02 30 30 31 30 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Dark-Bright)"
- id: vcp_00_12_contrast
  label: Contrast
  kind: action
  command: "02 30 30 31 32 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Low-High)"
- id: vcp_00_14_color
  label: Color (Color Settings)
  kind: action
  command: "02 30 30 31 34 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0002=Thru, 0009=10000K, 000B=Custom"
- id: vcp_00_16_r_gain
  label: R Gain
  kind: action
  command: "02 30 30 31 36 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-00FFH"
- id: vcp_00_18_g_gain
  label: G Gain
  kind: action
  command: "02 30 30 31 38 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-00FFH"
- id: vcp_00_1a_b_gain
  label: B Gain
  kind: action
  command: "02 30 30 31 41 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-00FFH"
- id: vcp_00_54_color_temp
  label: Color Temperature
  kind: action
  command: "02 30 30 35 34 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-004AH (2600K-10000K, 1 step=100K). Cannot set Thru."
- id: vcp_00_60_input_select
  label: Input Source Select
  kind: action
  command: "02 30 30 36 30 {v3}{v2}{v1}{v0} 03"
  params:
    - name: source
      type: enum
      description: "0011=HDMI1,0012=HDMI2,0082=HDMI3,0089=USB-C,0087=Home"
- id: vcp_00_62_volume
  label: Audio Volume
  kind: action
  command: "02 30 30 36 32 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Small-Big)"
- id: vcp_00_68_language
  label: Language
  kind: action
  command: "02 30 30 36 38 {v3}{v2}{v1}{v0} 03"
  params:
    - name: language
      type: enum
      description: "0000=No mean,0001=English,0002=German,0003=French,0004=Spanish,0005=Japanese,0006=Italian,0007=Swedish,0009=Russian,000E=Chinese"
- id: vcp_00_87_sharpness
  label: Sharpness
  kind: action
  command: "02 30 30 38 37 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-000AH (1 step=10)"
- id: vcp_00_8a_color
  label: Color (saturation)
  kind: action
  command: "02 30 30 38 41 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Pale-Deep)"
- id: vcp_00_8c_sharpness_alt
  label: Sharpness (alt, =VCP-00-87)
  kind: action
  command: "02 30 30 38 43 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-000AH"
- id: vcp_00_8d_audio_mute
  label: Audio Mute
  kind: action
  command: "02 30 30 38 44 {v3}{v2}{v1}{v0} 03"
  params:
    - name: mute
      type: enum
      description: "0000=Unmute, 0001=Mute, 0002=Unmute"
- id: vcp_00_8f_treble
  label: Audio Treble
  kind: action
  command: "02 30 30 38 46 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-000AH (De-emph..Emph)"
- id: vcp_00_91_bass
  label: Audio Bass
  kind: action
  command: "02 30 30 39 31 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-000AH"
- id: vcp_00_92_black_level
  label: Video Black Level
  kind: action
  command: "02 30 30 39 32 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Dark-Bright)"
- id: vcp_00_93_balance
  label: Audio Balance
  kind: action
  command: "02 30 30 39 33 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0019H-0032H (L50-Center-R50, 1 step=2)"
- id: vcp_00_9b_6axis_red
  label: 6-axis RED
  kind: action
  command: "02 30 30 39 42 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Magenta-Yellow, 1 step=2)"
- id: vcp_00_9c_6axis_yellow
  label: 6-axis YELLOW
  kind: action
  command: "02 30 30 39 43 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Red-Green, 1 step=2)"
- id: vcp_00_9d_6axis_green
  label: 6-axis GREEN
  kind: action
  command: "02 30 30 39 44 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Yellow-Cyan, 1 step=2)"
- id: vcp_00_9e_6axis_cyan
  label: 6-axis CYAN
  kind: action
  command: "02 30 30 39 45 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Green-Blue, 1 step=2)"
- id: vcp_00_9f_6axis_blue
  label: 6-axis BLUE
  kind: action
  command: "02 30 30 39 46 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Cyan-Magenta, 1 step=2)"
- id: vcp_00_a0_6axis_magenta
  label: 6-axis MAGENTA
  kind: action
  command: "02 30 30 41 30 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Blue-Red, 1 step=2)"
- id: vcp_00_e1_power_save
  label: Power Save
  kind: action
  command: "02 30 30 45 31 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0000=DISABLE, 0001=ENABLE"
- id: vcp_00_fc_osd_time
  label: OSD Time
  kind: action
  command: "02 30 30 46 43 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0002H-0030H (10-240 sec)"
- id: vcp_02_1a_picture_mode
  label: Picture Mode
  kind: action
  command: "02 30 32 31 41 {v3}{v2}{v1}{v0} 03"
  params:
    - name: mode
      type: enum
      description: "0003=HIGHBRIGHT,0008=CUSTOM1,001C=RETAIL,001D=CONFERENCING,001E=TRANSPORTATION,001F=NATIVE"
- id: vcp_02_1f_color_alt
  label: Color (=VCP-00-8A)
  kind: action
  command: "02 30 32 31 46 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H"
- id: vcp_02_3d_info_osd
  label: Information OSD
  kind: action
  command: "02 30 32 33 44 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0000=OFF, 0001=ON"
- id: vcp_02_3e_monitor_id
  label: Monitor ID
  kind: action
  command: "02 30 32 33 45 {v3}{v2}{v1}{v0} 03"
  params:
    - name: id
      type: integer
      description: "0001H-0019H (1-25)"
- id: vcp_02_40_auto_input_change
  label: Auto Input Change
  kind: action
  command: "02 30 32 34 30 {v3}{v2}{v1}{v0} 03"
  params:
    - name: mode
      type: enum
      description: "0000=FIRST DETECT,0001=LAST DETECT,0002=NONE,0004=CUSTOM DETECT"
- id: vcp_02_68_gamma
  label: Gamma
  kind: action
  command: "02 30 32 36 38 {v3}{v2}{v1}{v0} 03"
  params:
    - name: gamma
      type: enum
      description: "0001=NATIVE,0004=2.2,0005=DICOM SIM,0006=PROGRAMABLE,0007=S GAMMA,0008=2.4"
- id: vcp_02_6f_aspect_zoom
  label: Aspect - Zoom
  kind: action
  command: "02 30 32 36 46 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0001H-00C9H (100%-300%)"
- id: vcp_02_70_aspect
  label: Aspect
  kind: action
  command: "02 30 32 37 30 {v3}{v2}{v1}{v0} 03"
  params:
    - name: aspect
      type: enum
      description: "0001=Normal,0002=Full,0003=Wide,0004=Zoom,0007=OFF(1:1)"
- id: vcp_02_79_temperature
  label: Internal Temperature
  kind: query
  command: "02 30 32 37 39 03"
  params: []
  description: "Read only. Sensor selected by VCP-02h-78h. 1 step=0.5C, minus=two's complement."
- id: vcp_02_8d_adaptive_contrast
  label: Adaptive Contrast
  kind: action
  command: "02 30 32 38 44 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=OFF,0002=Low,0004=High"
- id: vcp_02_b4_ambient_illuminance
  label: Ambient Light Illuminance
  kind: query
  command: "02 30 32 42 34 03"
  params: []
  description: "Read only. 0000H-FFFFH."
- id: vcp_02_be_power_indicator
  label: Power Indicator
  kind: action
  command: "02 30 32 42 45 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=ON, 0002=OFF"
- id: vcp_02_cb_reset
  label: Reset
  kind: action
  command: "02 30 32 43 42 {v3}{v2}{v1}{v0} 03"
  params:
    - name: target
      type: enum
      description: "0001=All/Factory,0002=Picture,0004=Audio,0010=Network,0011=Protect,0012=System,0013=Input&Output,0014=Setup,0015=Application Menu Tree"
- id: vcp_02_d0_tile_h
  label: Tile Matrix H Monitors
  kind: action
  command: "02 30 32 44 30 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0001H-0005H (1-5)"
- id: vcp_02_d1_tile_v
  label: Tile Matrix V Monitors
  kind: action
  command: "02 30 32 44 31 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0001H-0005H (1-5)"
- id: vcp_02_d2_tile_position
  label: Tile Matrix Position
  kind: action
  command: "02 30 32 44 32 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0001H-0019H (1-25)"
- id: vcp_02_d3_tile_confirm
  label: Tile Matrix Confirm Settings
  kind: action
  command: "02 30 32 44 33 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=Disable(off), 0002=Enable(on)"
- id: vcp_02_d5_tile_comp
  label: Tile Comp
  kind: action
  command: "02 30 32 44 35 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=NO, 0002=YES"
- id: vcp_02_d8_power_on_delay
  label: Power On Delay
  kind: action
  command: "02 30 32 44 38 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0032H (0-50 sec)"
- id: vcp_10_10_carbon_savings_g
  label: Carbon Savings (g)
  kind: query
  command: "02 31 30 31 30 03"
  params: []
  description: "Read only. 0000H-03E7H."
- id: vcp_10_11_carbon_savings_kg
  label: Carbon Savings (kg)
  kind: query
  command: "02 31 30 31 31 03"
  params: []
  description: "Read only. 0000H-FFFFH."
- id: vcp_10_26_carbon_usage_g
  label: Carbon Usage (g)
  kind: query
  command: "02 31 30 32 36 03"
  params: []
  description: "Read only. 0000H-03E7H."
- id: vcp_10_27_carbon_usage_kg
  label: Carbon Usage (kg)
  kind: query
  command: "02 31 30 32 37 03"
  params: []
  description: "Read only. 0000H-FFFFH."
- id: vcp_10_28_carbon_savings_g_unreset
  label: Carbon Savings (g) Unresettable
  kind: query
  command: "02 31 30 32 38 03"
  params: []
  description: "Read only. Same as VCP-10-10. 0000H-03E7H."
- id: vcp_10_29_carbon_savings_kg_unreset
  label: Carbon Savings (kg) Unresettable
  kind: query
  command: "02 31 30 32 39 03"
  params: []
  description: "Read only. Same as VCP-10-11. 0000H-FFFFH."
- id: vcp_10_2a_carbon_usage_g_unreset
  label: Carbon Usage (g) Unresettable
  kind: query
  command: "02 31 30 32 41 03"
  params: []
  description: "Read only. Same as VCP-10-26. 0000H-03E7H."
- id: vcp_10_2b_carbon_usage_kg_unreset
  label: Carbon Usage (kg) Unresettable
  kind: query
  command: "02 31 30 32 42 03"
  params: []
  description: "Read only. Same as VCP-10-27. 0000H-FFFFH."
- id: vcp_10_2e_autoinput_prio1
  label: Auto Input Change Priority 1
  kind: action
  command: "02 31 30 32 45 {v3}{v2}{v1}{v0} 03"
  params:
    - name: source
      type: enum
      description: "0000=---,0011=HDMI1,0012=HDMI2,0082=HDMI3,0089=USB-C,0087=Home"
- id: vcp_10_2f_autoinput_prio2
  label: Auto Input Change Priority 2
  kind: action
  command: "02 31 30 32 46 {v3}{v2}{v1}{v0} 03"
  params:
    - name: source
      type: enum
      description: "0000=---,0011=HDMI1,0012=HDMI2,0082=HDMI3,0089=USB-C,0087=Home"
- id: vcp_10_30_autoinput_prio3
  label: Auto Input Change Priority 3
  kind: action
  command: "02 31 30 33 30 {v3}{v2}{v1}{v0} 03"
  params:
    - name: source
      type: enum
      description: "0000=---,0011=HDMI1,0012=HDMI2,0082=HDMI3,0089=USB-C,0087=Home"
- id: vcp_10_33_als_in_bright
  label: ALS In Bright Backlight
  kind: action
  command: "02 31 30 33 33 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Dark-Bright)"
- id: vcp_10_34_als_in_dark
  label: ALS In Dark Backlight
  kind: action
  command: "02 31 30 33 34 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Dark-Bright)"
- id: vcp_10_40_video_range
  label: Video Range
  kind: action
  command: "02 31 30 34 30 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=EXPANDED SIGNAL,0002=RAW SIGNAL,0003=AUTO"
- id: vcp_10_75_human_sensor_mode
  label: Human Sensor Mode
  kind: action
  command: "02 31 30 37 35 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=OFF,0002=AUTO OFF,0004=CUSTOM"
- id: vcp_10_78_human_sensor_wait
  label: Human Sensor Wait Time
  kind: action
  command: "02 31 30 37 38 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "001EH-0258H (30-600 sec)"
- id: vcp_10_81_line_out
  label: Line Out
  kind: action
  command: "02 31 30 38 31 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=FIXED, 0002=VARIABLE"
- id: vcp_10_b6_video_mute
  label: Video Mute
  kind: action
  command: "02 31 30 42 36 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0000=No mean,0001=Video mute,0002=Video unmute"
- id: vcp_10_c6_human_sensor_backlight
  label: Human Sensor Backlight
  kind: action
  command: "02 31 30 43 36 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Dark-Bright)"
- id: vcp_10_c7_human_sensor_volume
  label: Human Sensor Volume
  kind: action
  command: "02 31 30 43 37 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Small-Big)"
- id: vcp_10_c8_als_mode
  label: Ambient Light Sensing Mode
  kind: action
  command: "02 31 30 43 38 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=OFF, 0002=ON"
- id: vcp_10_ca_audio_delay
  label: Audio Delay
  kind: action
  command: "02 31 30 43 41 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=OFF, 0002=ON"
- id: vcp_10_cb_audio_delay_time
  label: Audio Delay Time
  kind: action
  command: "02 31 30 43 42 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Small-Big)"
- id: vcp_10_d0_human_sensor_input
  label: Human Sensor Input Select
  kind: action
  command: "02 31 30 44 30 {v3}{v2}{v1}{v0} 03"
  params:
    - name: source
      type: enum
      description: "0011=HDMI1,0012=HDMI2,0082=HDMI3,0089=USB-C,0087=Home"
- id: vcp_10_d4_ir_lock_mode
  label: IR Lock Mode Select
  kind: action
  command: "02 31 30 44 34 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0000=No mean,0001=UNLOCK,0002=ALL LOCK,0003=CUSTOM LOCK"
- id: vcp_10_d5_ir_lock_power
  label: IR Lock Power
  kind: action
  command: "02 31 30 44 35 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0000=No mean,0001=UNLOCK,0002=LOCK"
- id: vcp_10_d6_ir_lock_volume
  label: IR Lock Volume
  kind: action
  command: "02 31 30 44 36 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0000=No mean,0001=UNLOCK,0002=LOCK"
- id: vcp_10_d7_ir_lock_min_vol
  label: IR Lock Min Volume
  kind: action
  command: "02 31 30 44 37 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (0-100)"
- id: vcp_10_d8_ir_lock_max_vol
  label: IR Lock Max Volume
  kind: action
  command: "02 31 30 44 38 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (0-100)"
- id: vcp_10_d9_ir_lock_input
  label: IR Lock Input
  kind: action
  command: "02 31 30 44 39 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0000=No mean,0001=UNLOCK,0002=LOCK"
- id: vcp_10_dd_human_sensor_backlight_en
  label: Human Sensor Backlight Enable
  kind: action
  command: "02 31 30 44 44 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=OFF, 0002=ON"
- id: vcp_10_de_human_sensor_volume_en
  label: Human Sensor Volume Enable
  kind: action
  command: "02 31 30 44 45 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=OFF, 0002=ON"
- id: vcp_10_df_human_sensor_input_en
  label: Human Sensor Input Enable
  kind: action
  command: "02 31 30 44 46 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=OFF, 0002=ON"
- id: vcp_11_06_input_select
  label: Input Source Select (alt)
  kind: action
  command: "02 31 31 30 36 {v3}{v2}{v1}{v0} 03"
  params:
    - name: source
      type: enum
      description: "0011=HDMI1,0012=HDMI2,0082=HDMI3,0089=USB-C,0087=Home"
- id: vcp_11_17_comm_info
  label: Communication Information
  kind: action
  command: "02 31 31 31 37 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=OFF, 0002=ON"
- id: vcp_11_2c_aspect_zoom
  label: Aspect - Zoom (alt)
  kind: action
  command: "02 31 31 32 43 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "005AH-012CH (0.90%-3.00%)"
- id: vcp_11_4e_backlight_dimming
  label: Backlight Dimming
  kind: action
  command: "02 31 31 34 45 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=OFF, 0002=ON"
- id: vcp_11_68_hdmi_mode
  label: HDMI Mode Setting
  kind: action
  command: "02 31 31 36 38 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=settings1, 0002=settings2"
- id: vcp_11_6a_key_lock_mode
  label: Key Lock Mode Select
  kind: action
  command: "02 31 31 36 41 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0000=No mean,0001=UNLOCK,0002=ALL LOCK,0003=CUSTOM LOCK"
- id: vcp_11_6b_key_lock_power
  label: Key Lock Power
  kind: action
  command: "02 31 31 36 42 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0000=No mean,0001=UNLOCK,0002=LOCK"
- id: vcp_11_6c_key_lock_volume
  label: Key Lock Volume
  kind: action
  command: "02 31 31 36 43 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0000=No mean,0001=UNLOCK,0002=LOCK"
- id: vcp_11_6d_key_lock_min_vol
  label: Key Lock Min Volume
  kind: action
  command: "02 31 31 36 44 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (0-100)"
- id: vcp_11_6e_key_lock_max_vol
  label: Key Lock Max Volume
  kind: action
  command: "02 31 31 36 45 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (0-100)"
- id: vcp_11_6f_key_lock_input
  label: Key Lock Input
  kind: action
  command: "02 31 31 36 46 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0000=No mean,0001=UNLOCK,0002=LOCK"
- id: vcp_11_75_usb_power
  label: USB Power
  kind: action
  command: "02 31 31 37 35 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=ON,0002=AUTO,0003=OFF"
- id: vcp_11_76_cec
  label: CEC
  kind: action
  command: "02 31 31 37 36 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=OFF, 0002=ON"
- id: vcp_11_77_power_control_link
  label: Power Control Link
  kind: action
  command: "02 31 31 37 37 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=DISABLE, 0002=ENABLE"
- id: vcp_11_78_audio_receiver
  label: Audio Receiver
  kind: action
  command: "02 31 31 37 38 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=DISABLE, 0002=ENABLE"
- id: vcp_11_7b_power_save_message
  label: Power Save Message
  kind: action
  command: "02 31 31 37 42 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=OFF, 0002=ON"
- id: vcp_11_bb_internal_speaker
  label: Internal Speaker
  kind: action
  command: "02 31 31 42 42 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0000=No mean,0001=OFF,0002=ON"
- id: vcp_11_d8_audio_mode
  label: Audio Mode
  kind: action
  command: "02 31 31 44 38 {v3}{v2}{v1}{v0} 03"
  params:
    - name: mode
      type: enum
      description: "0001=RETAIL,0002=CONFERENCING,0003=HIGHBRIGHT,0004=TRANSPORTATION,0005=CUSTOM1,0007=NATIVE"
- id: vcp_11_e5_hdr_mode
  label: HDR Mode
  kind: action
  command: "02 31 31 45 35 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0004=Low,0005=Mid,0006=High"
- id: vcp_11_e9_mute_setting
  label: Mute Setting
  kind: action
  command: "02 31 31 45 39 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=AUDIO,0002=VIDEO,0003=AUDIO&VIDEO"
- id: vcp_11_ea_quick_start
  label: Quick Start
  kind: action
  command: "02 31 31 45 41 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=DISABLE, 0002=ENABLE"
- id: vcp_11_ee_power_save_mode
  label: Power Save Settings Mode
  kind: action
  command: "02 31 31 45 45 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: enum
      description: "0001=LOW POWER, 0002=NORMAL"
- id: vcp_11_f5_autodim_bright
  label: Auto Dimming In Bright Illuminance
  kind: action
  command: "02 31 31 46 35 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Dark-Bright)"
- id: vcp_11_f6_autodim_dark
  label: Auto Dimming In Dark Illuminance
  kind: action
  command: "02 31 31 46 36 {v3}{v2}{v1}{v0} 03"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Dark-Bright)"
- id: vcp_11_fc_als_backlight
  label: Ambient Light Sensing Backlight
  kind: query
  command: "02 31 31 46 43 03"
  params: []
  description: "Read only. 0000H-0064H (0-100)."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, power_save, reserved, off]
  description: "From CTL-01D6 reply: 0001=on, 0002=power save, 0003=reserved, 0004=off"
- id: selfdiag_error
  type: enum
  values: [none, temp_shutdown, temp_half_brightness, no_signal, system_eeprom_error]
  description: "From CTL-B1 reply: 00=none, A0=temp shutdown, A1=temp half-bright, B0=no signal, E0=system/EEPROM"
- id: timing_h_freq
  type: number
  description: "From CTL-07 reply. Horizontal sync freq, 0.01kHz unit."
- id: timing_v_freq
  type: number
  description: "From CTL-07 reply. Vertical sync freq, 0.01Hz unit."
- id: command_result
  type: enum
  values: [no_error, error]
  description: "Result code 00h=no error / 01h=error, common across CTL/VCP replies"
# UNRESOLVED: per-VCP value feedbacks not individually enumerated; each VCP opcode is queryable via Get VCP (MsgType 'C').
```

## Variables
```yaml
# VCP settable opcodes (section 6) double as settable variables via Get/Set VCP.
# Each settable VCP action above has a corresponding readable variable.
# Representative examples:
- id: backlight
  type: integer
  min: 0x0000
  max: 0x0064
  access: rw
  description: "VCP-00-10 Backlight"
- id: volume
  type: integer
  min: 0x0000
  max: 0x0064
  access: rw
  description: "VCP-00-62 Audio volume"
- id: monitor_id
  type: integer
  min: 0x0001
  max: 0x0019
  access: rw
  description: "VCP-02-3E Monitor ID (1-25)"
# Full variable set = all settable VCP opcodes listed in Actions.
```

## Events
```yaml
- id: null_message
  type: unsolicited
  description: "Monitor sends CTL-BE NULL message (cmd 'B''E', 42h 45h) when an unsupported CTL command is received, or a CTL command arrives while monitor is in non-executable state."
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: ctl_c203_d6_power_control
    note: "Wait ~15 seconds after Power ON/OFF before sending next command (source section 3)."
  - command: vcp_00_60_input_select
    note: "Wait ~10 seconds after input switching or all-reset before sending next command (source section 3)."
  - command: ctl_ca0b_03_autosave_time_write
    note: "Same ~10s wait applies after all-reset (VCP-02-CB reset)."
power_state_restrictions: "When monitor is power off or power save, only these commands are accepted: CTL-B1, CTL-C03F, CTL-01D6, CTL-C203-D6, CTL-C216, CTL-C217, CTL-CA20(MAC read), VCP-00-60, VCP-02-3E, VCP-11-06. Set Quick Start=ENABLE (VCP-11-EA) to use all commands in power off/save (increases power consumption)."
# UNRESOLVED: no explicit interlock sequencing beyond command-interval waits. Voltage/current/power specs not in source.
```

## Notes
- **Source references "NEC LCD monitor"** in its overview text; the PN-ME family is marketed by Sharp Electronics (Sharp acquired NEC's display business). Manufacturer set per operator input.
- **Byte encoding:** every data byte is transmitted as 2 ASCII hex characters (e.g. byte 3Ah -> ASCII '3'(33h) 'A'(41h)). Lengths and opcodes in the header/message follow this rule.
- **Full frame wrap:** every `command:` in Actions is the Message body only (STX..ETX). The controller must prepend the 7-byte header (SOH 01h, Reserved 30h, Destination, Source, Message Type, 2-ascii Length), append the BCC (XOR of bytes from Reserved through ETX, excluding SOH), and terminate with CR (0Dh).
- **BCC example (source 4.3.1):** XOR of bytes 30h 41h 30h 45h 30h 41h 02h 30h 30h 31h 30h 30h 30h 36h 34h 03h = 77h.
- **Command intervals (RS-232C and LAN):** keep command byte interval within 100 ms (RS-232C); send next command only after receiving the monitor's response. After Power ON/OFF wait ~15 s; after input switch or all-reset wait ~10 s.
- **LAN timeout:** monitor disconnects after 15 minutes of no communication; reconnect after such an interval.
- **Error replies:** out-of-range settings -> monitor does nothing and replies Result Code 00h (no error); unsupported/non-executable CTL -> NULL message (CTL-BE); VCP command errors -> Result Code 01h.
- **Destination addressing:** monitor ID 1-100 maps to addresses 41h-A4h; group IDs and '*'(2Ah)=all. See source section 4.1.1 conversion table.
- CTL-CA20 (MAC read) appears in section 8.1 power-off allowed list but not detailed in section 5; command code inferred as 'C''2''2''0' family.

<!-- UNRESOLVED: firmware version compatibility not stated. Flow control not stated. CTL-CA20 detail absent from section 5. Power/voltage/current specs out of scope of this control doc. -->
````

Spec ready. All 28 CTL commands and all ~105 VCP opcodes enumerated. Framing (header+BCC+CR) noted; `command:` fields hold verbatim message bodies. Power-off allowed-command list captured in Safety. Unresolved markers present for firmware, flow control, CTL-CA20 detail, electrical specs.

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/manuals/external_control_mexx2_en.pdf
retrieved_at: 2026-08-05T06:40:15.170Z
last_checked_at: 2026-08-05T08:42:02.189Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:42:02.189Z
matched_actions: 130
action_count: 130
confidence: medium
summary: "All 27 outbound CTL and 103 VCP opcodes from source sections 5.1/6.1 are represented in spec; transport params match section 3. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document refers to the device as \"NEC LCD monitor\"; model family PN-ME is marketed under Sharp Electronics. Voltage/current/power specs not documented here. Firmware version compatibility not stated."
- "flow control not stated in source"
- "per-VCP value feedbacks not individually enumerated; each VCP opcode is queryable via Get VCP (MsgType 'C')."
- "no explicit multi-step sequences described in source."
- "no explicit interlock sequencing beyond command-interval waits. Voltage/current/power specs not in source."
- "firmware version compatibility not stated. Flow control not stated. CTL-CA20 detail absent from section 5. Power/voltage/current specs out of scope of this control doc."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
