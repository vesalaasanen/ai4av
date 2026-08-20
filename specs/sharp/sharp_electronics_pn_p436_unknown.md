---
spec_id: admin/sharp-electronics-pn-p436
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Electronics PN-P436 Control Spec"
manufacturer: Sharp
model_family: PN-P436
aliases: []
compatible_with:
  manufacturers:
    - Sharp
    - "Sharp Electronics"
  models:
    - PN-P436
    - PN-P506
    - PN-P556
    - PN-P656
    - PN-M432
    - PN-M502
    - PN-M552
    - PN-M652
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - smj.jp.sharp
  - business.sharpusa.com
source_urls:
  - https://smj.jp.sharp/bs/lcd-display/lineup/pnp/download_files/sharp-lcd_display_m652_m552_m502_m432_p656_p556_p506_p436_external_control_manual_jp.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-pxx6_pn-mxx2_s_format_external_control_manual.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
retrieved_at: 2026-08-06T06:15:27.827Z
last_checked_at: 2026-08-19T09:44:14.151Z
generated_at: 2026-08-19T09:44:14.151Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "voltage/power/electrical specs not in source; flow_control not stated; auth credentials/token format N/A"
  - "flow control not stated in source"
  - "no discrete variable registry beyond the action list; monitor does"
  - "no stored macro table in source."
  - "firmware version compatibility not stated (doc Rev.1.1 only)."
  - "serial flow_control not stated; assumed N/A."
  - "electrical/voltage/power specs not in this control document."
  - "some OSD rows marked N/A in source (resolution, color format, HDCP status, etc.) have no command."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:44:14.151Z
  matched_actions: 262
  action_count: 262
  confidence: medium
  summary: "All 262 spec actions map to CTL or VCP commands documented in chapters 7-8; transport values verbatim in §3.1/3.2. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-06
---

# Sharp Electronics PN-P436 Control Spec

## Summary
External control spec for the Sharp Electronics PN-P436 LCD monitor (and the M/P series family: PN-M432/M502/M552/M652, PN-P436/P506/P556/P656). The monitor is controllable over both RS-232C (9-pin D-Sub, 9600 bps) and LAN (TCP/IP, fixed port 7142). Two command families are documented: VCP (parameter get/set addressed by OP code page + OP code) and CTL (system commands addressed by a hex command code). All commands share a common ASCII-framed packet: Header (SOH) + Message (STX...ETX) + XOR Block Check Code + CR delimiter.

<!-- UNRESOLVED: voltage/power/electrical specs not in source; flow_control not stated; auth credentials/token format N/A -->

## Transport
```yaml
protocols:
  - tcp
  - serial
# --- LAN (TCP/IP) ---
addressing:
  port: 7142  # fixed per source §3.2
auth:
  type: none  # inferred: no auth procedure in source
# --- RS-232C ---
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
# LAN connector: RJ-45 10/100 BASE-T (Cat 5+). Monitor disconnects after 15 min idle.
# RS-232C connector: 9-pin D-Sub, cross (reverse) cable. Inter-byte interval <= 100 ms.
# Char code: ASCII. Byte values are hex-encoded to ASCII pairs (e.g. 3Ah -> '3','A').
```

## Traits
```yaml
# - powerable       (CTL-C203-D6 power control present)
# - queryable       (extensive Get/read commands present)
# - levelable       (volume, backlight, contrast, gamma, gain controls present)
# - routable        (VCP-00-60 input source select, tile matrix routing present)
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# ============================================================================
# PACKET FRAMING (common to every command below):
#   Header : SOH(01h) | '0'(30h) | Dest | Src('0') | MsgType | MsgLen(Hi)(Lo)
#   Message: STX(02h) | <DATA> | ETX(03h)
#   Tail   : BCC(XOR D1..Dn) | CR(0Dh)
# Dest/Src byte = monitor ID mapped via ID->Address table (ID 1 = 'A'/41h, ALL = '*'/2Ah).
# Message Type: A=Command B=CommandReply C=GetCurrent D=GetReply E=Set F=SetReply
# `command:` below holds the <DATA> payload (between STX and ETX) verbatim, hex-encoded
# as ASCII pairs exactly as the source writes them. Dest/BCC omitted (computed at runtime).
# Read-style commands use Message Type 'C' (Get Current Parameter); the documented reply
# type is 'D'. Set-style use Type 'E'; reply 'F'. CTL Commands use Type 'A'; reply 'B'.
# ============================================================================
#
# ----------------------------- CTL COMMANDS ---------------------------------
- id: ctl_0c_save_current_settings
  label: Save Current Settings
  kind: action
  command: "0C"
  params: []
- id: ctl_07_get_timing_report
  label: Get Timing Report
  kind: query
  command: "07"
  params: []
- id: ctl_01d6_power_status_read
  label: Power Status Read
  kind: query
  command: "01D6"
  params: []
- id: ctl_c203d6_power_control
  label: Power Control
  kind: action
  command: "C203D6{mode}"
  params:
    - name: mode
      type: enum
      description: "0001=On, 0002=DoNotSet, 0003=DoNotSet, 0004=Standby"
- id: ctl_c211_date_time_read
  label: Date & Time Read
  kind: query
  command: "C211"
  params: []
- id: ctl_c212_date_time_write
  label: Date & Time Write
  kind: action
  command: "C212{year}{month}{day}{weekday}{hour}{minute}00"
  params:
    - name: year
      type: integer
      description: "Year offset from 2000 (18=2024 .. 25=2037)"
    - name: month
      type: integer
      description: "01..0C"
    - name: day
      type: integer
      description: "01..1F"
    - name: weekday
      type: enum
      description: "00=Sun..06=Sat"
    - name: hour
      type: integer
      description: "00..17"
    - name: minute
      type: integer
      description: "00..3B"
- id: ctl_c230_time_zone_read
  label: Time Zone Read
  kind: query
  command: "C230"
  params: []
- id: ctl_c231_time_zone_write
  label: Time Zone Write
  kind: action
  command: "C231{tz}"
  params:
    - name: tz
      type: enum
      description: "00=UTC-12:00 .. 30=UTC+12:00 (30-min steps)"
- id: ctl_c21a_time_server_read
  label: Time Server Read
  kind: query
  command: "C21A"
  params: []
- id: ctl_c21b_time_server_write
  label: Time Server Write
  kind: action
  command: "C21B{enable}{name}"
  params:
    - name: enable
      type: enum
      description: "00=Off, 01=On"
    - name: name
      type: string
      description: "Time server name (max 32 chars)"
- id: ctl_c23d_schedule_read
  label: Schedule Read
  kind: query
  command: "C23D{program}"
  params:
    - name: program
      type: integer
      description: "00=No.1 .. 0D=No.14"
- id: ctl_c23e_schedule_write
  label: Schedule Write
  kind: action
  command: "C23E{program}{event}{hour}{minute}{input}{weekday}{type}{picmode}{year}{month}{day}{order}000000"
  params:
    - name: program
      type: integer
      description: "Program No. 00..0D"
    - name: event
      type: enum
      description: "01=PowerOn, 02=PowerOff, 03=Reserved"
    - name: hour
      type: integer
      description: "00..17, 18=invalid"
    - name: minute
      type: integer
      description: "00..3B, 3C=invalid"
    - name: input
      type: enum
      description: "00=None/LastMemory, 0D=OPTION, 0F=DisplayPort, 11=HDMI1, 12=HDMI2, 88=COMPUTE MODULE, 89=USB-C"
    - name: weekday
      type: integer
      description: "bit0=Mon..bit6=Sun"
    - name: type
      type: integer
      description: "bit1=weekly, bit2=enable, bit6=date-spec"
    - name: year
      type: integer
      description: "18..25 or 26=invalid"
    - name: month
      type: integer
      description: "00=invalid, 01..0C, 0D=invalid"
    - name: day
      type: integer
      description: "00=invalid, 01..1F, 20=invalid"
    - name: order
      type: integer
      description: "Not supported on this monitor (set 00)"
- id: ctl_b1_self_diagnosis_status_read
  label: Self-diagnosis Status Read
  kind: query
  command: "B1"
  params: []
- id: ctl_c216_serial_no_read
  label: Serial No. Read
  kind: query
  command: "C216"
  params: []
- id: ctl_c217_model_name_read
  label: Model Name Read
  kind: query
  command: "C217"
  params: []
- id: ctl_c21d_security_lock_control
  label: Security Lock Control
  kind: action
  command: "C21D{mode}{pin1}{pin2}{pin3}{pin4}"
  params:
    - name: mode
      type: enum
      description: "00=Disable, 01=StartUpLock, 02=ControlLock, 03=BothLock"
    - name: pin1
      type: integer
      description: "Passcode digit 1 (00..09)"
    - name: pin2
      type: integer
      description: "Passcode digit 2 (00..09)"
    - name: pin3
      type: integer
      description: "Passcode digit 3 (00..09)"
    - name: pin4
      type: integer
      description: "Passcode digit 4 (00..09)"
- id: ctl_c220_mac_address_read
  label: MAC Address Read
  kind: query
  command: "C22000"
  params: []
- id: ctl_ca01_00_daylight_saving_read
  label: Daylight Saving Read
  kind: query
  command: "CA0100"
  params: []
- id: ctl_ca01_01_daylight_saving_write
  label: Daylight Saving Write
  kind: action
  command: "CA0101{smon}{sday1}{sday2}{shour}{smin}{emon}{eday1}{eday2}{ehour}{emin}{offset}"
  params:
    - name: smon
      type: integer
      description: "Start month 01..0C"
    - name: sday1
      type: enum
      description: "01=1st..05=Last"
    - name: sday2
      type: enum
      description: "01=Sun..07=Sat"
    - name: shour
      type: integer
      description: "00..17"
    - name: smin
      type: integer
      description: "00..3B"
    - name: emon
      type: integer
      description: "End month 01..0C"
    - name: eday1
      type: enum
      description: "01=1st..05=Last"
    - name: eday2
      type: enum
      description: "01=Sun..07=Sat"
    - name: ehour
      type: integer
      description: "00..17"
    - name: emin
      type: integer
      description: "00..3B"
    - name: offset
      type: enum
      description: "00=+01:00, 01=+00:30, 02=-00:30, 03=-01:00"
- id: ctl_ca01_02_daylight_saving_onoff_read
  label: Daylight Saving ON/OFF Read
  kind: query
  command: "CA0102"
  params: []
- id: ctl_ca01_03_daylight_saving_onoff_write
  label: Daylight Saving ON/OFF Write
  kind: action
  command: "CA0103{value}"
  params:
    - name: value
      type: enum
      description: "00=Off, 01=On"
- id: ctl_ca02_firmware_version_read
  label: Firmware Version Read
  kind: query
  command: "CA0200"
  params: []
- id: ctl_ca04_00_input_name_read
  label: Input Name Read
  kind: query
  command: "CA0400"
  params: []
- id: ctl_ca04_01_input_name_write
  label: Input Name Write
  kind: action
  command: "CA0401{name}"
  params:
    - name: name
      type: string
      description: "Input name (max 14 chars), hex-ASCII-encoded"
- id: ctl_ca04_02_input_name_reset
  label: Input Name Reset
  kind: action
  command: "CA0402"
  params: []
- id: ctl_ca15_00_proof_of_play_mode
  label: Set Proof of Play Operation Mode
  kind: action
  command: "CA1500{mode}"
  params:
    - name: mode
      type: enum
      description: "00=Stop, 01=Start, 02=ClearLog"
- id: ctl_ca15_01_proof_of_play_current
  label: Get Proof of Play Current
  kind: query
  command: "CA1501"
  params: []
- id: ctl_ca15_02_proof_of_play_status
  label: Get Proof of Play Status
  kind: query
  command: "CA1502"
  params: []
- id: ctl_ca15_03_proof_of_play_number_to_number
  label: Get Proof of Play Number to Number
  kind: query
  command: "CA1503{start}{end}"
  params:
    - name: start
      type: integer
      description: "Start log number (4 hex digits)"
    - name: end
      type: integer
      description: "End log number (4 hex digits, max 100 range)"
- id: ctl_ca0b_00_power_save_mode_read
  label: Power Save Mode Read
  kind: query
  command: "CA0B00"
  params: []
- id: ctl_ca0b_01_power_save_mode_write
  label: Power Save Mode Write
  kind: action
  command: "CA0B01{mode}"
  params:
    - name: mode
      type: enum
      description: "00=AutoPowerSave, 02=PowerSaveOff"
- id: ctl_ca0b_02_auto_power_save_time_read
  label: Auto Power Save Time Read
  kind: query
  command: "CA0B02"
  params: []
- id: ctl_ca0b_03_auto_power_save_time_write
  label: Auto Power Save Time Write
  kind: action
  command: "CA0B03{time}"
  params:
    - name: time
      type: integer
      description: "01(5s)..78(600s)"
- id: ctl_ca0c_02_pd_security_enable_read
  label: PD Security Enable Read
  kind: query
  command: "CA0C02"
  params: []
- id: ctl_ca0d_00_shipment_flag_read
  label: Shipment Flag Read
  kind: query
  command: "CA0D00"
  params: []
- id: ctl_ca0e_00_schedule_enable_read
  label: Schedule Enable Read
  kind: query
  command: "CA0E00"
  params: []
- id: ctl_ca0f_00_get_terminal_list
  label: Get Terminal List
  kind: query
  command: "CA0F00"
  params: []
- id: ctl_c03f_fw_revision_read
  label: F/W Revision Read
  kind: query
  command: "C03F"
  params: []
- id: ctl_ca03_01_auto_tile_matrix_execute
  label: Auto Tile Matrix Execute
  kind: action
  command: "CA0301{hmon}{vmon}{pattern}{input}{save}{dpmode}"
  params:
    - name: hmon
      type: integer
      description: "Horizontal monitors 01..10"
    - name: vmon
      type: integer
      description: "Vertical monitors 01..10"
    - name: pattern
      type: integer
      description: "Pattern ID (01)"
    - name: input
      type: enum
      description: "0D=OPTION,0F=DisplayPort,11=HDMI1,12=HDMI2,88=COMPUTE MODULE,89=USB-C"
    - name: save
      type: enum
      description: "00=Common, 01=Input"
    - name: dpmode
      type: enum
      description: "00=Other, 01=1.1a, 02=1.2"
- id: ctl_ca03_02_auto_tile_matrix_complete_notify
  label: Auto Tile Matrix Complete Notify
  kind: action
  command: "CA0302"
  params: []
- id: ctl_ca03_03_auto_tile_matrix_reset
  label: Auto Tile Matrix Reset
  kind: action
  command: "CA0303"
  params: []
- id: ctl_ca03_04_auto_tile_matrix_monitors_read
  label: Auto Tile Matrix Monitors Read
  kind: query
  command: "CA0304"
  params: []
- id: ctl_ca03_05_auto_tile_matrix_monitors_write
  label: Auto Tile Matrix Monitors Write
  kind: action
  command: "CA0305{hmon}{vmon}"
  params:
    - name: hmon
      type: integer
      description: "00..0A"
    - name: vmon
      type: integer
      description: "00..0A"
- id: ctl_ca32_lock_settings_read
  label: Lock Settings Read
  kind: query
  command: "CA32"
  params: []
- id: ctl_ca33_lock_settings_write
  label: Lock Settings Write
  kind: action
  command: "CA33{select}{mode}{power}{volume}{minvol}{maxvol}{input}"
  params:
    - name: select
      type: enum
      description: "00=Key, 01=IR, 02=Key&IR"
    - name: mode
      type: enum
      description: "00=Unlock, 01=CustomLock, 02=AllLock"
    - name: power
      type: enum
      description: "00=Unlock, 01=Lock"
    - name: volume
      type: enum
      description: "00=Unlock, 01=Lock"
    - name: minvol
      type: integer
      description: "00..64 (min volume)"
    - name: maxvol
      type: integer
      description: "00..64 (max volume)"
    - name: input
      type: enum
      description: "00=Unlock, 01=Lock"
- id: ctl_ca34_00_frame_lock_read
  label: Frame Lock Read
  kind: query
  command: "CA3400"
  params: []
- id: ctl_ca34_01_frame_lock_write
  label: Frame Lock Write
  kind: action
  command: "CA3401{value}"
  params:
    - name: value
      type: enum
      description: "00=Off, 01=On, 02=Auto"
- id: ctl_ca0a_05_auto_id_ext_execute
  label: Auto ID Extended Function Execute
  kind: action
  command: "CA0A05"
  params: []
- id: ctl_ca0a_06_auto_id_ext_apply
  label: Auto ID Extended Function Apply
  kind: action
  command: "CA0A06"
  params: []
- id: ctl_ca0a_07_auto_id_ext_status
  label: Auto ID Extended Function Status
  kind: query
  command: "CA0A07"
  params: []
- id: ctl_ca0a_08_auto_id_ext_reset
  label: Auto ID Extended Function Reset
  kind: action
  command: "CA0A08"
  params: []
- id: ctl_ca0a_0b_auto_id_ext_reset_item_set
  label: Auto ID Extended Function Reset Item Set
  kind: action
  command: "CA0A0B{type}"
  params:
    - name: type
      type: enum
      description: "00=MonitorID, 01=IPAddress, 02=Both"
- id: ctl_ca0a_0c_auto_id_ext_reset_item_get
  label: Auto ID Extended Function Reset Item Get
  kind: query
  command: "CA0A0C"
  params: []
- id: ctl_ca0a_0e_auto_id_ext_item_set
  label: Auto ID Extended Function Item Set
  kind: action
  command: "CA0A0E{type}{ip1}{ip2}{ip3}{01}{base}"
  params:
    - name: type
      type: enum
      description: "00=MonitorID, 01=IPAddress, 02=Both"
    - name: ip1
      type: integer
      description: "IP octet 1 (00..FF)"
    - name: ip2
      type: integer
      description: "IP octet 2 (00..FF)"
    - name: ip3
      type: integer
      description: "IP octet 3 (00..FF); octet 4 fixed 01"
    - name: base
      type: integer
      description: "Base number 01..63"
- id: ctl_ca0a_0f_auto_id_ext_item_get
  label: Auto ID Extended Function Item Get
  kind: query
  command: "CA0A0F"
  params: []
# ----------------------------- VCP COMMANDS ---------------------------------
# Each VCP item is addressed by OP code page + OP code, sent via Get (Type C) or
# Set (Type E). command: shows the page+code payload; {value} is the 16-bit set
# value (4 hex-ASCII digits). Reply (Type D/F) returns result+max+current.
- id: vcp_00_0b_white_point_increment
  label: White Point Increment (Color Temp Increment)
  kind: action
  command: "000B{value}"
  params: [{name: value, type: integer, description: "0001..1388 increment"}]
- id: vcp_00_0c_color_temperature_increment
  label: Color Temperature Increment Value
  kind: action
  command: "000C{value}"
  params: [{name: value, type: integer, description: "0=3000K base, else multiplier"}]
- id: vcp_00_10_backlight
  label: Backlight
  kind: action
  command: "0010{value}"
  params: [{name: value, type: integer, description: "0000..0064 (dark..bright)"}]
- id: vcp_00_12_contrast
  label: Contrast
  kind: action
  command: "0012{value}"
  params: [{name: value, type: integer, description: "0000..0064 (low..high)"}]
- id: vcp_00_14_color_temperature_preset
  label: Color Temperature Preset
  kind: action
  command: "0014{value}"
  params: [{name: value, type: enum, description: "0002=Native,0009=10000K,000B=User1"}]
- id: vcp_00_16_r_gain
  label: R Gain
  kind: action
  command: "0016{value}"
  params: [{name: value, type: integer, description: "0000..0064"}]
- id: vcp_00_18_g_gain
  label: G Gain
  kind: action
  command: "0018{value}"
  params: [{name: value, type: integer, description: "0000..0064"}]
- id: vcp_00_1a_b_gain
  label: B Gain
  kind: action
  command: "001A{value}"
  params: [{name: value, type: integer, description: "0000..0064"}]
- id: vcp_00_1f_saturation_alt
  label: Saturation (Color 0x1F)
  kind: action
  command: "001F{value}"
  params: [{name: value, type: integer, description: "0000..0064 (light..deep)"}]
- id: vcp_00_54_color_temperature_k
  label: Color Temperature (Kelvin)
  kind: action
  command: "0054{value}"
  params: [{name: value, type: integer, description: "0000..004A (2600K..10000K, step 100K)"}]
- id: vcp_00_60_input_source_select
  label: Input Source Select
  kind: action
  command: "0060{value}"
  params: [{name: value, type: enum, description: "000D=OPTION,000F=DisplayPort,0011=HDMI1,0012=HDMI2,0088=COMPUTE MODULE,0089=USB-C"}]
- id: vcp_00_62_audio_volume
  label: Audio Volume
  kind: action
  command: "0062{value}"
  params: [{name: value, type: integer, description: "0000..0064 (small..large)"}]
- id: vcp_00_68_language
  label: Language
  kind: action
  command: "0068{value}"
  params: [{name: value, type: enum, description: "0001=EN..0005=JA,000E=ZH"}]
- id: vcp_00_87_sharpness
  label: Sharpness (0x87)
  kind: action
  command: "0087{value}"
  params: [{name: value, type: integer, description: "0000..000A (soft..sharp)"}]
- id: vcp_00_8a_saturation
  label: Saturation (0x8A)
  kind: action
  command: "008A{value}"
  params: [{name: value, type: integer, description: "0000..0064 (light..deep)"}]
- id: vcp_00_8c_sharpness
  label: Sharpness (0x8C)
  kind: action
  command: "008C{value}"
  params: [{name: value, type: integer, description: "0000..000A (soft..sharp)"}]
- id: vcp_00_8f_treble
  label: Treble (High)
  kind: action
  command: "008F{value}"
  params: [{name: value, type: integer, description: "0000..0064 (weak..strong)"}]
- id: vcp_00_91_bass
  label: Bass (Low)
  kind: action
  command: "0091{value}"
  params: [{name: value, type: integer, description: "0000..0064 (weak..strong)"}]
- id: vcp_00_92_video_black_level
  label: Video Black Level
  kind: action
  command: "0092{value}"
  params: [{name: value, type: integer, description: "0000..0064 (dark..bright)"}]
- id: vcp_00_93_audio_balance
  label: Audio Balance
  kind: action
  command: "0093{value}"
  params: [{name: value, type: integer, description: "0000..0032 (left..right)"}]
- id: vcp_00_94_stereo_mono
  label: Stereo/Mono
  kind: action
  command: "0094{value}"
  params: [{name: value, type: enum, description: "0001=Mono, 0002=Stereo"}]
- id: vcp_00_9b_cc_red_hue
  label: Color Control RED Hue
  kind: action
  command: "009B{value}"
  params: [{name: value, type: integer, description: "0000..00C8 (magenta..yellow)"}]
- id: vcp_00_9c_cc_yellow_hue
  label: Color Control YELLOW Hue
  kind: action
  command: "009C{value}"
  params: [{name: value, type: integer, description: "0000..00C8 (red..green)"}]
- id: vcp_00_9d_cc_green_hue
  label: Color Control GREEN Hue
  kind: action
  command: "009D{value}"
  params: [{name: value, type: integer, description: "0000..00C8 (yellow..cyan)"}]
- id: vcp_00_9e_cc_cyan_hue
  label: Color Control CYAN Hue
  kind: action
  command: "009E{value}"
  params: [{name: value, type: integer, description: "0000..00C8 (green..blue)"}]
- id: vcp_00_9f_cc_blue_hue
  label: Color Control BLUE Hue
  kind: action
  command: "009F{value}"
  params: [{name: value, type: integer, description: "0000..00C8 (cyan..magenta)"}]
- id: vcp_00_a0_cc_magenta_hue
  label: Color Control MAGENTA Hue
  kind: action
  command: "00A0{value}"
  params: [{name: value, type: integer, description: "0000..00C8 (blue..red)"}]
- id: vcp_02_12_red_saturation
  label: RED Saturation
  kind: action
  command: "0212{value}"
  params: [{name: value, type: integer, description: "0000..00C8"}]
- id: vcp_02_13_yellow_saturation
  label: YELLOW Saturation
  kind: action
  command: "0213{value}"
  params: [{name: value, type: integer, description: "0000..00C8"}]
- id: vcp_02_14_green_saturation
  label: GREEN Saturation
  kind: action
  command: "0214{value}"
  params: [{name: value, type: integer, description: "0000..00C8"}]
- id: vcp_02_15_cyan_saturation
  label: CYAN Saturation
  kind: action
  command: "0215{value}"
  params: [{name: value, type: integer, description: "0000..00C8"}]
- id: vcp_02_16_blue_saturation
  label: BLUE Saturation
  kind: action
  command: "0216{value}"
  params: [{name: value, type: integer, description: "0000..00C8"}]
- id: vcp_02_17_magenta_saturation
  label: MAGENTA Saturation
  kind: action
  command: "0217{value}"
  params: [{name: value, type: integer, description: "0000..00C8"}]
- id: vcp_02_1a_picture_mode
  label: Picture Mode
  kind: action
  command: "021A{value}"
  params: [{name: value, type: enum, description: "0003=HighBright,0008=Custom,001C=Store,001D=Conference,001E=Transit,001F=Standard"}]
- id: vcp_02_2b_off_timer
  label: Off Timer
  kind: action
  command: "022B{value}"
  params: [{name: value, type: integer, description: "0000..0018 (off..24h)"}]
- id: vcp_02_2d_auto_brightness
  label: Auto Brightness
  kind: action
  command: "022D{value}"
  params: [{name: value, type: enum, description: "0000=Off,0001=Setting1,0002=Setting2"}]
- id: vcp_02_2e_audio_input_select
  label: Audio Input Select
  kind: action
  command: "022E{value}"
  params: [{name: value, type: enum, description: "0004=HDMI1,0006=Option,0007=DisplayPort,000A=HDMI2,000E=ComputeModule,000F=USB-C"}]
- id: vcp_02_34_surround
  label: Surround
  kind: action
  command: "0234{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_02_38_osd_h_position
  label: OSD H Position
  kind: action
  command: "0238{value}"
  params: [{name: value, type: integer, description: "0000..00FF (left..right)"}]
- id: vcp_02_39_osd_v_position
  label: OSD V Position
  kind: action
  command: "0239{value}"
  params: [{name: value, type: integer, description: "0000..00FF (down..up)"}]
- id: vcp_02_3d_information_osd
  label: Information OSD
  kind: action
  command: "023D{value}"
  params: [{name: value, type: enum, description: "0000=Off,0001=On"}]
- id: vcp_02_3e_monitor_id
  label: Monitor ID
  kind: action
  command: "023E{value}"
  params: [{name: value, type: integer, description: "0001..0064"}]
- id: vcp_02_40_auto_input_switch
  label: Auto Input Switch
  kind: action
  command: "0240{value}"
  params: [{name: value, type: enum, description: "0000=FirstDetect,0001=LastDetect,0002=None,0004=CustomDetect"}]
- id: vcp_02_41_osd_orientation
  label: OSD Orientation
  kind: action
  command: "0241{value}"
  params: [{name: value, type: enum, description: "0000=Normal,0001=Rotate90"}]
- id: vcp_02_68_gamma
  label: Gamma
  kind: action
  command: "0268{value}"
  params: [{name: value, type: enum, description: "0001=Native,0004=2.2,0005=DICOM,0006=Programmable1,0007=SGamma,0008=2.4,0009=Custom,000B=sRGB,000C=LStar,000D=Prog2,000E=Prog3,000F=Bt1886,0010=HDR-HLG,0011=HDR-PQ"}]
- id: vcp_02_6c_h_zoom
  label: H Zoom (0x2-6C)
  kind: action
  command: "026C{value}"
  params: [{name: value, type: integer, description: "0001..00C9 (100%..300%)"}]
- id: vcp_02_6d_v_zoom
  label: V Zoom (0x2-6D)
  kind: action
  command: "026D{value}"
  params: [{name: value, type: integer, description: "0001..00C9 (100%..300%)"}]
- id: vcp_02_6f_zoom
  label: Zoom (0x2-6F)
  kind: action
  command: "026F{value}"
  params: [{name: value, type: integer, description: "0001..00C9 (100%..300%)"}]
- id: vcp_02_70_aspect
  label: Aspect
  kind: action
  command: "0270{value}"
  params: [{name: value, type: enum, description: "0001=Normal,0002=Full,0003=Wide,0004=Zoom,0007=Off(1:1)"}]
- id: vcp_02_71_pip_size
  label: PIP/PBP Picture Size
  kind: action
  command: "0271{value}"
  params: [{name: value, type: enum, description: "0001=Small,0002=Mid,0003=Large"}]
- id: vcp_02_74_pip_h_position
  label: PIP H Position
  kind: action
  command: "0274{value}"
  params: [{name: value, type: integer, description: "0000..0064 (left..right)"}]
- id: vcp_02_75_pip_v_position
  label: PIP V Position
  kind: action
  command: "0275{value}"
  params: [{name: value, type: integer, description: "0000..0064 (up..down)"}]
- id: vcp_02_78_temp_sensor_select
  label: Temperature Sensor Select
  kind: action
  command: "0278{value}"
  params: [{name: value, type: enum, description: "0001=Sensor1,0002=Sensor2,0003=Sensor3"}]
- id: vcp_02_79_temperature_value
  label: Temperature Value
  kind: query
  command: "0279"
  params: []
- id: vcp_02_7a_fan_select
  label: Fan Select
  kind: action
  command: "027A{value}"
  params: [{name: value, type: enum, description: "0001=Fan1,0002=Fan2,0003=Fan3,0004=Fan1+2,0005=Fan1+2+3"}]
- id: vcp_02_7b_fan_status
  label: Fan Status
  kind: query
  command: "027B"
  params: []
- id: vcp_02_7d_fan_control
  label: Fan Control
  kind: action
  command: "027D{value}"
  params: [{name: value, type: enum, description: "0001=Auto(no offset),0002=ForceOn"}]
- id: vcp_02_8d_adaptive_contrast
  label: Adaptive Contrast
  kind: action
  command: "028D{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=Weak,0004=Strong"}]
- id: vcp_02_b3_luminance
  label: Luminance
  kind: action
  command: "02B3{value}"
  params: [{name: value, type: integer, description: "0014..03E8 (20..1000)"}]
- id: vcp_02_b4_current_illuminance
  label: Current Illuminance (Status)
  kind: query
  command: "02B4"
  params: []
- id: vcp_02_b8_osd_transparent
  label: OSD Transparent
  kind: action
  command: "02B8{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_02_be_power_lamp
  label: Power Lamp
  kind: action
  command: "02BE{value}"
  params: [{name: value, type: enum, description: "0001=On,0002=Off"}]
- id: vcp_02_c2_uniformity
  label: Uniformity (Refresh)
  kind: action
  command: "02C2{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On(refresh)"}]
- id: vcp_02_cb_reset
  label: Reset
  kind: action
  command: "02CB{value}"
  params: [{name: value, type: enum, description: "0001=All(Factory),0002=Video,0004=Audio,0005=Schedule,000F=Slot,0010=Network,0011=Protection,0012=System,0013=Input"}]
- id: vcp_02_cc_h_position
  label: H Position
  kind: action
  command: "02CC{value}"
  params: [{name: value, type: integer, description: "0000..00C8 (left..right)"}]
- id: vcp_02_cd_v_position
  label: V Position
  kind: action
  command: "02CD{value}"
  params: [{name: value, type: integer, description: "0000..00C8 (down..up)"}]
- id: vcp_02_d0_tile_matrix_h_monitors
  label: Tile Matrix Horizontal Monitors
  kind: action
  command: "02D0{value}"
  params: [{name: value, type: integer, description: "0001..000A"}]
- id: vcp_02_d1_tile_matrix_v_monitors
  label: Tile Matrix Vertical Monitors
  kind: action
  command: "02D1{value}"
  params: [{name: value, type: integer, description: "0001..000A"}]
- id: vcp_02_d2_tile_matrix_position
  label: Tile Matrix Position
  kind: action
  command: "02D2{value}"
  params: [{name: value, type: integer, description: "0001..0064 (top-left..bottom-right)"}]
- id: vcp_02_d3_tile_matrix_enable
  label: Tile Matrix Enable
  kind: action
  command: "02D3{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_02_d5_tile_comp
  label: Tile Comp
  kind: action
  command: "02D5{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_02_d7_image_flip
  label: Image Flip
  kind: action
  command: "02D7{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=Mirror,0003=Flip,0004=180"}]
- id: vcp_02_d8_power_on_delay
  label: Power On Delay
  kind: action
  command: "02D8{value}"
  params: [{name: value, type: integer, description: "0000=Off,0001..0032 (1s..50s)"}]
- id: vcp_02_db_screen_saver_gamma
  label: Screen Saver Gamma
  kind: action
  command: "02DB{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_02_dd_screen_saver_motion
  label: Screen Saver Motion/Interval
  kind: action
  command: "02DD{value}"
  params: [{name: value, type: integer, description: "0000..005A (0s..900s)"}]
- id: vcp_02_df_background_color
  label: Background Color
  kind: action
  command: "02DF{value}"
  params: [{name: value, type: integer, description: "0000..0064 (black..white)"}]
- id: vcp_02_e3_overscan
  label: Overscan
  kind: action
  command: "02E3{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On,0003=Auto"}]
- id: vcp_02_e8_custom_gamma_value
  label: Custom Gamma Value
  kind: action
  command: "02E8{value}"
  params: [{name: value, type: integer, description: "0000..015E (step=10)"}]
- id: vcp_02_ee_uniformity_level
  label: Uniformity Level
  kind: action
  command: "02EE{value}"
  params: [{name: value, type: enum, description: "0000=Off,0001..0005"}]
- id: vcp_02_f1_red_brightness
  label: RED Brightness
  kind: action
  command: "02F1{value}"
  params: [{name: value, type: integer, description: "0000..00C8"}]
- id: vcp_02_f2_yellow_brightness
  label: YELLOW Brightness
  kind: action
  command: "02F2{value}"
  params: [{name: value, type: integer, description: "0000..00C8"}]
- id: vcp_02_f3_green_brightness
  label: GREEN Brightness
  kind: action
  command: "02F3{value}"
  params: [{name: value, type: integer, description: "0000..00C8"}]
- id: vcp_02_f4_cyan_brightness
  label: CYAN Brightness
  kind: action
  command: "02F4{value}"
  params: [{name: value, type: integer, description: "0000..00C8"}]
- id: vcp_02_f5_blue_brightness
  label: BLUE Brightness
  kind: action
  command: "02F5{value}"
  params: [{name: value, type: integer, description: "0000..00C8"}]
- id: vcp_02_f6_magenta_brightness
  label: MAGENTA Brightness
  kind: action
  command: "02F6{value}"
  params: [{name: value, type: integer, description: "0000..00C8"}]
- id: vcp_10_10_co2_reduction_lo
  label: CO2 Reduction Low
  kind: query
  command: "1010"
  params: []
- id: vcp_10_11_co2_reduction_hi
  label: CO2 Reduction High
  kind: query
  command: "1011"
  params: []
- id: vcp_10_26_co2_emission2_lo
  label: CO2 Emission2 Low
  kind: query
  command: "1026"
  params: []
- id: vcp_10_27_co2_emission2_hi
  label: CO2 Emission2 High
  kind: query
  command: "1027"
  params: []
- id: vcp_10_28_co2_reduction2_lo
  label: CO2 Reduction2 Low
  kind: query
  command: "1028"
  params: []
- id: vcp_10_29_co2_reduction2_hi
  label: CO2 Reduction2 High
  kind: query
  command: "1029"
  params: []
- id: vcp_10_2a_co2_emission_lo
  label: CO2 Emission Low
  kind: query
  command: "102A"
  params: []
- id: vcp_10_2b_co2_emission_hi
  label: CO2 Emission High
  kind: query
  command: "102B"
  params: []
- id: vcp_10_2e_input_priority_1
  label: Input Priority 1
  kind: action
  command: "102E{value}"
  params: [{name: value, type: enum, description: "000D=OPTION,000F=DisplayPort,0011=HDMI1,0012=HDMI2,0088=COMPUTE MODULE,0089=USB-C"}]
- id: vcp_10_2f_input_priority_2
  label: Input Priority 2
  kind: action
  command: "102F{value}"
  params: [{name: value, type: enum, description: "000D=OPTION,000F=DisplayPort,0011=HDMI1,0012=HDMI2,0088=COMPUTE MODULE,0089=USB-C"}]
- id: vcp_10_30_input_priority_3
  label: Input Priority 3
  kind: action
  command: "1030{value}"
  params: [{name: value, type: enum, description: "000D=OPTION,000F=DisplayPort,0011=HDMI1,0012=HDMI2,0088=COMPUTE MODULE,0089=USB-C"}]
- id: vcp_10_33_dark_backlight
  label: Dark Backlight
  kind: action
  command: "1033{value}"
  params: [{name: value, type: integer, description: "0000..0064"}]
- id: vcp_10_34_bright_backlight
  label: Bright Backlight
  kind: action
  command: "1034{value}"
  params: [{name: value, type: integer, description: "0000..0064"}]
- id: vcp_10_3f_fan_speed
  label: Fan Speed
  kind: action
  command: "103F{value}"
  params: [{name: value, type: enum, description: "0001=High,0002=Low"}]
- id: vcp_10_40_video_range
  label: Video Range
  kind: action
  command: "1040{value}"
  params: [{name: value, type: enum, description: "0001=Limited,0002=Full,0003=Auto"}]
- id: vcp_10_41_slot_power
  label: Slot Power
  kind: action
  command: "1041{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On,0003=Auto"}]
- id: vcp_10_50_picture_mode_pm
  label: Picture Mode (PM Slots)
  kind: action
  command: "1050{value}"
  params: [{name: value, type: enum, description: "0001..0005 Programmable1..5"}]
- id: vcp_10_51_preset
  label: Preset
  kind: action
  command: "1051{value}"
  params: [{name: value, type: enum, description: "0001=sRGB,0002=AdobeRGB,0003=DCI,0004=Bt709,0006=FULL,0007=DICOM,0008=Prog1,000D=eciRGBv2,0013=LowBlue,0014=Bt2100HLG,0015=Bt2100PQ,0016=Signage,0017=TVStudio"}]
- id: vcp_10_52_white_x
  label: White x
  kind: action
  command: "1052{value}"
  params: [{name: value, type: integer, description: "00FA..01E0"}]
- id: vcp_10_53_white_y
  label: White y
  kind: action
  command: "1053{value}"
  params: [{name: value, type: integer, description: "00FA..01AE"}]
- id: vcp_10_54_black
  label: BLACK
  kind: action
  command: "1054{value}"
  params: [{name: value, type: integer, description: "0000..0032"}]
- id: vcp_10_55_red_x
  label: RED x
  kind: action
  command: "1055{value}"
  params: [{name: value, type: integer, description: "0226..0320"}]
- id: vcp_10_56_red_y
  label: RED y
  kind: action
  command: "1056{value}"
  params: [{name: value, type: integer, description: "00C8..0190"}]
- id: vcp_10_57_green_x
  label: GREEN x
  kind: action
  command: "1057{value}"
  params: [{name: value, type: integer, description: "0064..015E"}]
- id: vcp_10_58_green_y
  label: GREEN y
  kind: action
  command: "1058{value}"
  params: [{name: value, type: integer, description: "01F4..0384"}]
- id: vcp_10_59_blue_x
  label: BLUE x
  kind: action
  command: "1059{value}"
  params: [{name: value, type: integer, description: "0000..00FA"}]
- id: vcp_10_5a_blue_y
  label: BLUE y
  kind: action
  command: "105A{value}"
  params: [{name: value, type: integer, description: "0000..0096"}]
- id: vcp_10_5b_color_vision_emulation
  label: Color Vision Emulation
  kind: action
  command: "105B{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=P,0003=D,0004=T,0005=Gray"}]
- id: vcp_10_5c_metamerism
  label: Metamerism
  kind: action
  command: "105C{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_10_75_human_sensor
  label: Human Sensor
  kind: action
  command: "1075{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=AutoOff,0004=Custom"}]
- id: vcp_10_78_wait_time
  label: Wait Time
  kind: action
  command: "1078{value}"
  params: [{name: value, type: integer, description: "0000..0258 (short..long)"}]
- id: vcp_10_7f_group_id
  label: Group ID
  kind: action
  command: "107F{value}"
  params: [{name: value, type: integer, description: "0000..03FF bitmask A..J"}]
- id: vcp_10_80_audio_select
  label: Audio Select
  kind: action
  command: "1080{value}"
  params: [{name: value, type: enum, description: "0014=DisplayPort,0016=HDMI1,0017=HDMI2,0018=OPTION,001A=ComputeModule,001C=USB-C"}]
- id: vcp_10_81_line_out
  label: Line Out
  kind: action
  command: "1081{value}"
  params: [{name: value, type: enum, description: "0001=Fixed,0002=Linked"}]
- id: vcp_10_b9_pip_size_alt
  label: PIP/PBP Size (0x10-B9)
  kind: action
  command: "10B9{value}"
  params: [{name: value, type: integer, description: "0000..0050 (small..large)"}]
- id: vcp_10_bc_power_on_delay_id_link
  label: Power On Delay ID Linkage
  kind: action
  command: "10BC{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_10_c3_forced_shutdown
  label: Forced Shutdown (Option Slot)
  kind: action
  command: "10C3{value}"
  params: [{name: value, type: enum, description: "0001=Execute"}]
- id: vcp_10_c6_human_sensor_backlight
  label: Human Sensor Backlight
  kind: action
  command: "10C6{value}"
  params: [{name: value, type: integer, description: "0000..0064 (dark..bright)"}]
- id: vcp_10_c7_human_sensor_volume
  label: Human Sensor Volume
  kind: action
  command: "10C7{value}"
  params: [{name: value, type: integer, description: "0000..0064 (small..large)"}]
- id: vcp_10_c8_ambient_sensor_mode
  label: Ambient Sensor Mode
  kind: action
  command: "10C8{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_10_d0_human_sensor_input
  label: Human Sensor Input
  kind: action
  command: "10D0{value}"
  params: [{name: value, type: enum, description: "000D=OPTION,000F=DisplayPort,0011=HDMI1,0012=HDMI2,0088=ComputeModule,0089=USB-C"}]
- id: vcp_10_dd_human_sensor_enable
  label: Human Sensor Enable (Backlight)
  kind: action
  command: "10DD{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_10_de_human_sensor_volume_enable
  label: Human Sensor Enable (Volume)
  kind: action
  command: "10DE{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_10_df_human_sensor_input_enable
  label: Human Sensor Enable (Input)
  kind: action
  command: "10DF{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_11_09_uhd_upscaling
  label: UHD Upscaling
  kind: action
  command: "1109{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=Weak,0003=Mid,0004=Strong"}]
- id: vcp_11_0b_select_picture
  label: Select Picture (PIP)
  kind: action
  command: "110B{value}"
  params: [{name: value, type: enum, description: "0001=Picture1,0002=Picture2"}]
- id: vcp_11_0d_select_frame
  label: Select Frame
  kind: action
  command: "110D{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_11_0e_picture1_source
  label: Picture 1 Source
  kind: action
  command: "110E{value}"
  params: [{name: value, type: enum, description: "000D=OPTION,000F=DisplayPort,0011=HDMI1,0012=HDMI2,0088=ComputeModule,0089=USB-C"}]
- id: vcp_11_0f_picture2_source
  label: Picture 2 Source
  kind: action
  command: "110F{value}"
  params: [{name: value, type: enum, description: "000D=OPTION,000F=DisplayPort,0011=HDMI1,0012=HDMI2,0088=ComputeModule,0089=USB-C"}]
- id: vcp_11_12_rotate_picture1
  label: Rotate Picture 1
  kind: action
  command: "1112{value}"
  params: [{name: value, type: enum, description: "0001=Off,0004=On"}]
- id: vcp_11_13_rotate_picture2
  label: Rotate Picture 2
  kind: action
  command: "1113{value}"
  params: [{name: value, type: enum, description: "0001=Off,0004=On"}]
- id: vcp_11_16_full_rotation
  label: Full Rotation
  kind: action
  command: "1116{value}"
  params: [{name: value, type: enum, description: "0001=Off,0004=On"}]
- id: vcp_11_17_ip_id_information
  label: IP/ID Information
  kind: action
  command: "1117{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_11_2c_zoom_alt
  label: Zoom (0x11-2C)
  kind: action
  command: "112C{value}"
  params: [{name: value, type: integer, description: "0384..0BB8 (0.900..3.000)"}]
- id: vcp_11_2d_h_zoom_alt
  label: H Zoom (0x11-2D)
  kind: action
  command: "112D{value}"
  params: [{name: value, type: integer, description: "0384..0BB8 (0.900..3.000)"}]
- id: vcp_11_2e_v_zoom_alt
  label: V Zoom (0x11-2E)
  kind: action
  command: "112E{value}"
  params: [{name: value, type: integer, description: "0384..0BB8 (0.900..3.000)"}]
- id: vcp_11_47_spectraview_engine
  label: SpectraView Engine
  kind: action
  command: "1147{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_11_4e_backlight_dimming
  label: Backlight Dimming
  kind: action
  command: "114E{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_11_4f_command_transfer
  label: Command Transfer
  kind: action
  command: "114F{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_11_67_displayport_sst_mst
  label: DisplayPort SST/MST
  kind: action
  command: "1167{value}"
  params: [{name: value, type: enum, description: "0001=SST,0002=MST"}]
- id: vcp_11_68_hdmi_mode
  label: HDMI Mode
  kind: action
  command: "1168{value}"
  params: [{name: value, type: enum, description: "0001=Setting1,0002=Setting2"}]
- id: vcp_11_74_usb_pc_source
  label: USB PC Source
  kind: action
  command: "1174{value}"
  params: [{name: value, type: enum, description: "0001=Auto,0002=ExternalPC,0003=OPTION,0004=ComputeModule"}]
- id: vcp_11_75_usb_power
  label: USB Power
  kind: action
  command: "1175{value}"
  params: [{name: value, type: enum, description: "0001=On,0002=Auto"}]
- id: vcp_11_76_cec
  label: CEC
  kind: action
  command: "1176{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=Setting1(On),0003=Setting2"}]
- id: vcp_11_77_cec_power_link
  label: CEC Power Link
  kind: action
  command: "1177{value}"
  params: [{name: value, type: enum, description: "0001=Disable,0002=Enable"}]
- id: vcp_11_78_cec_audio_receiver
  label: CEC Audio Receiver
  kind: action
  command: "1178{value}"
  params: [{name: value, type: enum, description: "0001=Disable,0002=Enable"}]
- id: vcp_11_7a_key_guide
  label: Key Guide
  kind: action
  command: "117A{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_11_7b_power_save_message
  label: Power Save Message
  kind: action
  command: "117B{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_11_7f_ir_signal
  label: IR Signal
  kind: action
  command: "117F{value}"
  params: [{name: value, type: enum, description: "0001=Disable,0002=Enable"}]
- id: vcp_11_80_monitor_control
  label: Monitor Control
  kind: action
  command: "1180{value}"
  params: [{name: value, type: enum, description: "0001=Disable,0002=Enable"}]
- id: vcp_11_81_shutdown_signal
  label: Shutdown Signal
  kind: action
  command: "1181{value}"
  params: [{name: value, type: enum, description: "0001=Disable,0002=Enable"}]
- id: vcp_11_96_tile_h_size
  label: Tile H Size
  kind: action
  command: "1196{value}"
  params: [{name: value, type: integer, description: "0000..00C8 (-100..100)"}]
- id: vcp_11_97_tile_v_size
  label: Tile V Size
  kind: action
  command: "1197{value}"
  params: [{name: value, type: integer, description: "0000..00C8 (-100..100)"}]
- id: vcp_11_98_tile_h_adjust
  label: Tile H Adjust
  kind: action
  command: "1198{value}"
  params: [{name: value, type: integer, description: "0000..00C8 (-100..100)"}]
- id: vcp_11_99_tile_v_adjust
  label: Tile V Adjust
  kind: action
  command: "1199{value}"
  params: [{name: value, type: integer, description: "0000..00C8 (-100..100)"}]
- id: vcp_11_9b_wdt_enable
  label: WDT Enable
  kind: action
  command: "119B{value}"
  params: [{name: value, type: enum, description: "0001=Disable,0002=Enable"}]
- id: vcp_11_9c_wdt_start_up_time
  label: WDT Start Up Time
  kind: action
  command: "119C{value}"
  params: [{name: value, type: integer, description: "0001..001E (10..300)"}]
- id: vcp_11_9d_wdt_period_time
  label: WDT Period Time
  kind: action
  command: "119D{value}"
  params: [{name: value, type: integer, description: "0001..001E (10..300)"}]
- id: vcp_11_9e_wdt_control
  label: WDT Control
  kind: action
  command: "119E{value}"
  params: [{name: value, type: enum, description: "0000=NoMeaning(Set),0001=Reset(Set),0002=Stop(Set)"}]
- id: vcp_11_a3_colorimetry
  label: Colorimetry
  kind: action
  command: "11A3{value}"
  params: [{name: value, type: enum, description: "0001=Auto,0002=RGB,0003=YCbCr601,0004=YCbCr709,0005=YCbCr2020"}]
- id: vcp_11_b0_picture_mode_usage_count
  label: Picture Mode Usage Count
  kind: action
  command: "11B0{value}"
  params: [{name: value, type: integer, description: "0001..0005"}]
- id: vcp_11_b2_auto_hdr_select
  label: Auto HDR Select
  kind: action
  command: "11B2{value}"
  params: [{name: value, type: enum, description: "0001=On,0002=Off"}]
- id: vcp_11_b7_compute_module_auto_shutdown
  label: Compute Module Auto Shutdown
  kind: action
  command: "11B7{value}"
  params: [{name: value, type: enum, description: "0001=Disable,0002=Enable"}]
- id: vcp_11_b8_system_gamma
  label: System Gamma
  kind: action
  command: "11B8{value}"
  params: [{name: value, type: integer, description: "0000=Auto,0005..0014 (0.5..2.0)"}]
- id: vcp_11_b9_peak_luminance
  label: Peak Luminance
  kind: action
  command: "11B9{value}"
  params: [{name: value, type: integer, description: "0000=Auto,0001..0064 (100..10000 cd/m2)"}]
- id: vcp_11_bb_internal_speaker
  label: Internal Speaker
  kind: action
  command: "11BB{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_11_c0_tile_cut
  label: Tile Cut
  kind: action
  command: "11C0{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_11_c1_tile_cut_h_adjust
  label: Tile Cut H Adjust
  kind: action
  command: "11C1{value}"
  params: [{name: value, type: integer, description: "0000..03C0"}]
- id: vcp_11_c2_tile_cut_v_adjust
  label: Tile Cut V Adjust
  kind: action
  command: "11C2{value}"
  params: [{name: value, type: integer, description: "0000..021C"}]
- id: vcp_11_cf_network_interface_display
  label: Network Interface Display
  kind: action
  command: "11CF{value}"
  params: [{name: value, type: enum, description: "0001=Disable,0002=Enable"}]
- id: vcp_11_d1_network_interface_compute_module
  label: Network Interface Compute Module
  kind: action
  command: "11D1{value}"
  params: [{name: value, type: enum, description: "0001=Disable,0002=Enable"}]
- id: vcp_11_d2_hdcp_version
  label: HDCP Version
  kind: action
  command: "11D2{value}"
  params: [{name: value, type: enum, description: "0001=HDCP1.4,0002=HDCP2.2"}]
- id: vcp_11_d3_usbc_setting
  label: USB-C Setting
  kind: action
  command: "11D3{value}"
  params: [{name: value, type: enum, description: "0001=USB2.0,0002=USB3.2"}]
- id: vcp_11_d8_audio_mode
  label: Audio Mode
  kind: action
  command: "11D8{value}"
  params: [{name: value, type: enum, description: "0001=Store,0002=Conference,0003=HighBright,0004=Transit,0005=Custom,0007=Standard"}]
- id: vcp_11_db_option_slot_power_button
  label: Option Slot Power Button
  kind: action
  command: "11DB{value}"
  params: [{name: value, type: enum, description: "0001=Execute"}]
- id: vcp_11_dc_option_slot_reset
  label: Option Slot Reset
  kind: action
  command: "11DC{value}"
  params: [{name: value, type: enum, description: "0001=Execute"}]
- id: vcp_11_de_option_slot_auto_shutdown
  label: Option Slot Auto Shutdown
  kind: action
  command: "11DE{value}"
  params: [{name: value, type: enum, description: "0001=Disable,0002=Enable"}]
- id: vcp_11_e0_compute_module_power_button
  label: Compute Module Power Button
  kind: action
  command: "11E0{value}"
  params: [{name: value, type: enum, description: "0001=Execute"}]
- id: vcp_11_e1_compute_module_reset
  label: Compute Module Reset
  kind: action
  command: "11E1{value}"
  params: [{name: value, type: enum, description: "0001=Execute"}]
- id: vcp_11_e9_mute_setting
  label: Mute Setting
  kind: action
  command: "11E9{value}"
  params: [{name: value, type: enum, description: "0001=Audio,0002=Video,0003=Audio&Video"}]
- id: vcp_11_ea_quick_startup
  label: Quick Startup
  kind: action
  command: "11EA{value}"
  params: [{name: value, type: enum, description: "0001=Disable,0002=Enable"}]
- id: vcp_11_eb_multi_screen_mode
  label: Multi Screen Mode
  kind: action
  command: "11EB{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=2PIP,0003=2PBP"}]
- id: vcp_11_f0_http_server
  label: HTTP Server
  kind: action
  command: "11F0{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_11_f2_amx_beacon
  label: AMX Beacon
  kind: action
  command: "11F2{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_11_f3_crestron
  label: Crestron
  kind: action
  command: "11F3{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_11_f4_pc_control
  label: PC Control
  kind: action
  command: "11F4{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_11_f5_dark_illuminance
  label: Dark Illuminance
  kind: action
  command: "11F5{value}"
  params: [{name: value, type: integer, description: "0000..0064 (step 5)"}]
- id: vcp_11_f6_bright_illuminance
  label: Bright Illuminance
  kind: action
  command: "11F6{value}"
  params: [{name: value, type: integer, description: "0000..0064 (step 5)"}]
- id: vcp_11_fc_current_backlight
  label: Current Backlight (Status)
  kind: query
  command: "11FC"
  params: []
- id: vcp_11_fd_hdr
  label: HDR
  kind: action
  command: "11FD{value}"
  params: [{name: value, type: enum, description: "0001=Disable,0002=Enable"}]
- id: vcp_13_22_https_server
  label: HTTPS Server
  kind: action
  command: "1322{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_13_23_pc_control_secure
  label: PC Control Secure
  kind: action
  command: "1323{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_13_24_search
  label: Search
  kind: action
  command: "1324{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_13_25_lan_daisy_chain
  label: LAN Daisy Chain
  kind: action
  command: "1325{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_13_26_snmp
  label: SNMP
  kind: action
  command: "1326{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_13_27_icmp
  label: ICMP
  kind: action
  command: "1327{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_13_28_ip_mac_filter
  label: IP/MAC Filter
  kind: action
  command: "1328{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_13_29_ieee802_1x
  label: IEEE802.1X
  kind: action
  command: "1329{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_13_2a_rs232c_port
  label: RS-232C Port Enable
  kind: action
  command: "132A{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_13_2b_usb_port
  label: USB Port Enable
  kind: action
  command: "132B{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_13_3a_naviset_secure
  label: Naviset Secure
  kind: action
  command: "133A{value}"
  params: [{name: value, type: enum, description: "0001=Off,0002=On"}]
- id: vcp_13_3b_screen_saver_range
  label: Screen Saver Range
  kind: action
  command: "133B{value}"
  params: [{name: value, type: integer, description: "0001..0004"}]
```

## Feedbacks
```yaml
# All VCP Get/Set operations return a Get Parameter Reply (Msg Type D) or
# Set Parameter Reply (Msg Type F) carrying: Result code, OP page, OP code,
# Type, Max value (16-bit), Current/Requested value (16-bit).
- id: result_code
  type: enum
  values: ["00=no error", "01=unsupported/unsupported-in-current-state"]
# CTL commands return a 'B' (Commands Reply) message specific to each command.
# Timing Report reply (CTL-07) returns: SS status byte, H Freq (0.01kHz), V Freq (0.01Hz).
- id: timing_status_ss
  type: bitmask
  description: "bit7=freq-out-of-range/no-signal, bit6=count-unstable, bit1=H-sync+, bit0=V-sync+"
# Self-diagnosis reply (CTL-B1) returns status codes per fault type.
- id: self_diagnosis_status
  type: enum
  values: ["00=Normal", "70=Standby +3.3V abnormal", "71=Standby +5V abnormal", "78=Inverter/slot2 +24V abnormal", "7A=USB-C OVP", "7B=USB-C OCP", "80=Fan1 abnormal", "81=Fan2 abnormal", "82=Fan3 abnormal", "90=Inverter abnormal", "A0=Temp abnormal shutdown", "A1=Temp abnormal dim", "B0=No signal", "D0=Proof of Play log memory low", "D1=RTC abnormal", "E4=CPLD abnormal", "ED=L2SW abnormal", "EE=FAN CTL abnormal", "EF=AUDIO AMP abnormal"]
# Power status (CTL-01D6) values:
- id: power_status
  type: enum
  values: ["0001=On", "0002=PowerSave", "0003=Reserved", "0004=Standby"]
```

## Variables
```yaml
# Settable parameters are represented as parameterized Actions above (VCP Set).
# Read-back of current value uses the corresponding VCP Get / CTL Read action.
# UNRESOLVED: no discrete variable registry beyond the action list; monitor does
# not document a separate variable namespace.
```

## Events
```yaml
# NULL message (STX-'B'-'E'-ETX, code "BE") is returned by the monitor to signal:
#   - cannot reply to host (not ready / unexpected state)
#   - received unsupported message type
#   - Proof of Play Stop sent before Start, or Start sent before Stop
- id: null_message
  description: "Monitor cannot reply / unsupported message / Proof of Play sequence error"
  command: "BE"
# Auto Tile Matrix Complete Notify (CTL-CA03-02) is a monitor-originated notify.
- id: auto_tile_matrix_complete
  description: "Auto Tile Matrix operation completion notification"
  command: "CA0302"
```

## Macros
```yaml
# The source documents a multi-step usage example for Backlight change:
#   1. Get current parameter (OP page 0, OP code 10) -> get max + current
#   2. Set parameter (OP page 0, OP code 10, new value)
#   3. Save Current Settings (CTL-0C)
# Documented as a recommended flow, not a stored macro. No named macros defined.
# UNRESOLVED: no stored macro table in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Timing constraints from source §3.1.1 / §3.2.1 (command pacing, not safety interlocks):
#   - After Power ON / Power OFF command: wait ~15s before next command.
#   - After input switch / sub-screen input switch / auto setup / all reset: wait ~10s.
#   - After each command: receive the monitor's reply before sending the next command.
#   - LAN: monitor disconnects after 15 min idle; reconnect required.
# No explicit hardware interlock or power-sequencing safety procedure documented.
```

## Notes
- Document is titled "External Control — M Series / P Series" Rev.1.1 and covers the family PN-M432/M502/M552/M652, PN-P436/P506/P556/P656. The target device is the PN-P436.
- All numeric data is hex-encoded to ASCII character pairs before transmission (e.g. raw byte 3Ah is sent as ASCII '3' 'A' = 33h 41h). Multi-byte values are big-endian MSB..LSB, 16-bit.
- Check code (BCC) = XOR of bytes D1..Dn (everything from Reserved byte through ETX, inclusive of STX and ETX). Delimiter is ASCII CR (0Dh).
- Monitor ID 1 maps to Destination address 'A' (41h); 100 maps to A4h; 'ALL' (broadcast) = '*' (2Ah). Group IDs A..J map to '1'..'9',':'. Source byte is always '0' (30h) from the controller.
- Message Length (header bytes 6-7) counts bytes from STX through ETX inclusive, encoded as 2 ASCII hex digits.
- Several CTL commands only document the message payload and reference the header/length implicitly; the full packet (SOH...CR) is constructed per the common framing.
- Source is in Japanese; command mnemonics and payloads are language-independent ASCII.

<!-- UNRESOLVED: firmware version compatibility not stated (doc Rev.1.1 only). -->
<!-- UNRESOLVED: serial flow_control not stated; assumed N/A. -->
<!-- UNRESOLVED: electrical/voltage/power specs not in this control document. -->
<!-- UNRESOLVED: some OSD rows marked N/A in source (resolution, color format, HDCP status, etc.) have no command. -->
````

Spec built. 55 CTL + ~208 VCP actions enumerated from source rows per coverage rule. Transport = serial(9600,8,N,1) + TCP port 7142, both stated. Front matter draft/low/CC-BY-4.0. UNRESOLVED markers on firmware, flow_control, electrical specs.

## Provenance

```yaml
source_domains:
  - smj.jp.sharp
  - business.sharpusa.com
source_urls:
  - https://smj.jp.sharp/bs/lcd-display/lineup/pnp/download_files/sharp-lcd_display_m652_m552_m502_m432_p656_p556_p506_p436_external_control_manual_jp.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-pxx6_pn-mxx2_s_format_external_control_manual.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
retrieved_at: 2026-08-06T06:15:27.827Z
last_checked_at: 2026-08-19T09:44:14.151Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:44:14.151Z
matched_actions: 262
action_count: 262
confidence: medium
summary: "All 262 spec actions map to CTL or VCP commands documented in chapters 7-8; transport values verbatim in §3.1/3.2. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "voltage/power/electrical specs not in source; flow_control not stated; auth credentials/token format N/A"
- "flow control not stated in source"
- "no discrete variable registry beyond the action list; monitor does"
- "no stored macro table in source."
- "firmware version compatibility not stated (doc Rev.1.1 only)."
- "serial flow_control not stated; assumed N/A."
- "electrical/voltage/power specs not in this control document."
- "some OSD rows marked N/A in source (resolution, color format, HDCP status, etc.) have no command."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
