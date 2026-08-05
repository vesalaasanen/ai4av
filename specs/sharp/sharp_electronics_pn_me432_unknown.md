---
spec_id: admin/sharp-electronics-pn-m432
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Electronics PN-M432 Control Spec"
manufacturer: Sharp
model_family: PN-M432
aliases: []
compatible_with:
  manufacturers:
    - Sharp
    - "Sharp Electronics"
  models:
    - PN-M432
    - PN-M502
    - PN-M552
    - PN-M652
    - PN-P436
    - PN-P506
    - PN-P556
    - PN-P656
    - PN-M752
    - PN-M862
    - PN-M982
    - PN-P756
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
  - smj.jp.sharp
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
  - https://smj.jp.sharp/bs/lcd-display/lineup/pnm/download_files/sharp-lcd_display_pnm2-pnp6-series_external-control_manual.pdf
  - https://business.sharpusa.com/product-downloads
retrieved_at: 2026-08-05T06:06:39.004Z
last_checked_at: 2026-08-05T08:41:25.572Z
generated_at: 2026-08-05T08:41:25.572Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "section 7 referenced for many CTL commands (INPUT NAME, MAC ADDRESS,"
  - "flow control not stated in source"
  - "section 7 payload not in source excerpt"
  - "input name payload per section 7 (not in source excerpt)\""
  - "none beyond action params"
  - none
  - "no multi-step sequences described in source"
  - "no explicit safety/hazard interlock procedures stated beyond communication timing."
  - "serial flow control not stated in source"
  - "section 7 CTL command payloads (INPUT NAME, MAC ADDRESS, PASSWORD, LOCK,"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:41:25.572Z
  matched_actions: 99
  action_count: 99
  confidence: medium
  summary: "All 99 spec actions map to wire tokens present verbatim in source; transport (9600/8/N/1, port 7142) is source-supported. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-05
---

# Sharp Electronics PN-M432 Control Spec

## Summary
Sharp PN-M/PN-P series LCD monitor external control spec covering the SHARP M/P Series
PN-M432 and siblings. The monitor supports RS-232C remote control (9600bps, 8N1) and
LAN (TCP/IP) control on fixed port 7142. Commands use a framed protocol (SOH header,
STX/ETX message, BCC check code, CR delimiter) with two command families: VCP (virtual
control panel get/set parameter) and CTL (discrete command messages).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: section 7 referenced for many CTL commands (INPUT NAME, MAC ADDRESS,
PASSWORD, LOCK, MODEL, SERIAL, FIRMWARE) was not included in the refined source excerpt;
CTL payload details for those commands are UNRESOLVED. -->

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
  port: 7142  # LAN control, fixed
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from CTL-C203-D6 power control command
  - queryable    # inferred from VCP get-parameter and CTL-01D6 power status read
  - levelable    # inferred from VCP volume / backlight / contrast set commands
```

## Actions
```yaml
# Protocol framing (applies to ALL commands): SOH(01h) | Reserved '0'(30h) |
# Destination | Source '0'(30h) | MsgType | MsgLen | STX(02h) | Message | ETX(03h) |
# BCC (XOR of bytes from Reserved through ETX) | CR(0Dh).
# MsgType: A=Command, B=Cmd reply, C=Get param, D=Get reply, E=Set param, F=Set reply.
# All numeric bytes are ASCII-encoded hex (e.g. byte 3Ah -> '3','A' = 33h,41h).
# Controller Source ID must be '0'(30h). Destination = monitor address (1->'A', ALL->'*').
# Per source: wait for reply before next command. After Power On/Off wait 15s; after
# Input / PIP Input / Auto Setup / Factory Reset wait 10s. LAN disconnects after 15min idle.

# --- CTL commands ---

- id: power_control
  label: Power Control
  kind: action
  command: "C203D6"   # CTL-C203-D6, message bytes 43H 32H 30H 33H 44H 36H
  params:
    - name: power_mode
      type: string
      description: Power mode value (4 ASCII hex chars)
      values:
        - "0001": ON
        - "0002": Do not set
        - "0003": Do not set
        - "0004": OFF (same as IR power off)

- id: power_status_read
  label: Power Status Read
  kind: query
  command: "01D6"   # CTL-01D6 get power status: 30H,31H,44H,36H
  params: []

- id: save_current_settings
  label: Save Current Settings
  kind: action
  command: "0C"   # CTL-0C, bytes 30H 43H
  params: []

- id: get_timing_report
  label: Get Timing Report
  kind: query
  command: "07"   # CTL-07, bytes 30H 37H; reply command code "4E"(34H 45H)
  params: []

- id: input_name_set
  label: Input Name Set
  kind: action
  command: "CA0400"   # CTL-CA04-00  # UNRESOLVED: section 7 payload not in source excerpt
  params:
    - name: name
      type: string
      description: "UNRESOLVED: input name payload per section 7 (not in source excerpt)"

- id: input_name_set_alt
  label: Input Name Set (alt)
  kind: action
  command: "CA0401"   # CTL-CA04-01  # UNRESOLVED: section 7 payload not in source excerpt
  params:
    - name: name
      type: string
      description: "UNRESOLVED: input name payload per section 7 (not in source excerpt)"

- id: name_reset
  label: Name Reset
  kind: action
  command: "CA0402"   # CTL-CA04-02  # UNRESOLVED: section 7 payload not in source excerpt
  params: []

- id: mac_address
  label: MAC Address
  kind: query
  command: "C220"   # CTL-C220  # UNRESOLVED: section 7 payload not in source excerpt
  params: []

- id: power_save_set_00
  label: Power Save Set
  kind: action
  command: "CA0B00"   # CTL-CA0B-00  # UNRESOLVED: section 7 payload not in source excerpt
  params: []

- id: power_save_set_01
  label: Power Save Set (alt)
  kind: action
  command: "CA0B01"   # CTL-CA0B-01  # UNRESOLVED: section 7 payload not in source excerpt
  params: []

- id: power_save_time_setting_02
  label: Power Save Time Setting
  kind: action
  command: "CA0B02"   # CTL-CA0B-02  # UNRESOLVED: section 7 payload not in source excerpt
  params: []

- id: power_save_time_setting_03
  label: Power Save Time Setting (alt)
  kind: action
  command: "CA0B03"   # CTL-CA0B-03  # UNRESOLVED: section 7 payload not in source excerpt
  params: []

- id: password_secure_mode
  label: Password / Secure Mode
  kind: action
  command: "C21D"   # CTL-C21D (Password, Start-Up Lock, Control Lock)  # UNRESOLVED: section 7 payload not in source excerpt
  params: []

- id: lock_settings_select
  label: Lock Settings Select
  kind: action
  command: "CA32"   # CTL-CA32  # UNRESOLVED: section 7 payload not in source excerpt
  params: []

- id: lock_settings_select_alt
  label: Lock Settings Select (alt)
  kind: action
  command: "CA33"   # CTL-CA33  # UNRESOLVED: section 7 payload not in source excerpt
  params: []

- id: model_read
  label: Monitor Model
  kind: query
  command: "C217"   # CTL-C217  # UNRESOLVED: section 7 payload not in source excerpt
  params: []

- id: serial_read
  label: Monitor Serial
  kind: query
  command: "C216"   # CTL-C216  # UNRESOLVED: section 7 payload not in source excerpt
  params: []

- id: firmware_revision_read
  label: Firmware Revision
  kind: query
  command: "C03F"   # CTL-C03F  # UNRESOLVED: section 7 payload not in source excerpt
  params: []

# --- VCP commands (each VCP-<page>-<code> supports get (MsgType C) and set (MsgType E)) ---
# Set message payload: STX | OP Code Page (Hi,Lo) | OP Code (Hi,Lo) | Set value (16-bit, MSB..LSB) | ETX

- id: input_select
  label: Input Select
  kind: action
  command: "VCP-00-60"
  params:
    - name: input
      type: string
      description: Input source (4 ASCII hex chars)
      values:
        - "000D": OPTION
        - "000F": DisplayPort
        - "0011": HDMI1
        - "0012": HDMI2
        - "0088": COMPUTE MODULE
        - "0089": USB-C

- id: auto_input_change
  label: Auto Input Change
  kind: action
  command: "VCP-02-40"
  params:
    - name: mode
      type: string
      values:
        - "0000": FIRST DETECT
        - "0001": LAST DETECT
        - "0002": NONE
        - "0004": CUSTOM DETECT

- id: input_priority_1
  label: Input Priority 1
  kind: action
  command: "VCP-10-2E"
  params:
    - name: input
      type: string
      values:
        - "000D": OPTION
        - "000F": DisplayPort
        - "0010": HDMI1
        - "0012": HDMI2
        - "0088": COMPUTE MODULE
        - "0089": USB-C

- id: input_priority_2
  label: Input Priority 2
  kind: action
  command: "VCP-10-2F"
  params:
    - name: input
      type: string
      values:
        - "000D": OPTION
        - "000F": DisplayPort
        - "0010": HDMI1
        - "0012": HDMI2
        - "0088": COMPUTE MODULE
        - "0089": USB-C

- id: input_priority_3
  label: Input Priority 3
  kind: action
  command: "VCP-10-30"
  params:
    - name: input
      type: string
      values:
        - "000D": OPTION
        - "000F": DisplayPort
        - "0010": HDMI1
        - "0012": HDMI2
        - "0088": COMPUTE MODULE
        - "0089": USB-C

- id: displayport_version
  label: DisplayPort Version
  kind: action
  command: "VCP-10-F2"
  params:
    - name: version
      type: string
      values:
        - "0001": "1.1a"
        - "0002": "1.2"
        - "0003": "1.4"

- id: dp_sst_mst
  label: DisplayPort SST/MST
  kind: action
  command: "VCP-11-67"
  params:
    - name: mode
      type: string
      values:
        - "0001": SST
        - "0002": MST

- id: hdcp_version
  label: HDCP Version
  kind: action
  command: "VCP-11-D2"
  params:
    - name: version
      type: string
      values:
        - "0001": HDCP1.4
        - "0002": HDCP2.2

- id: hdr_enable
  label: HDR
  kind: action
  command: "VCP-11-FD"
  params:
    - name: state
      type: string
      values:
        - "0001": DISABLE
        - "0002": ENABLE

- id: hdmi_mode
  label: HDMI Mode
  kind: action
  command: "VCP-11-68"
  params:
    - name: mode
      type: string
      values:
        - "0001": Mode1 (1.4)
        - "0002": Mode2 (2.0)

- id: overscan
  label: Overscan
  kind: action
  command: "VCP-02-E3"
  params:
    - name: mode
      type: string
      values:
        - "0001": OFF
        - "0002": ON
        - "0003": Auto

- id: video_range
  label: Video Range
  kind: action
  command: "VCP-10-40"
  params:
    - name: range
      type: string
      values:
        - "0001": LIMITED
        - "0002": FULL
        - "0003": AUTO

- id: colorimetry
  label: Colorimetry
  kind: action
  command: "VCP-11-A3"
  params:
    - name: mode
      type: string
      values:
        - "0001": AUTO
        - "0002": RGB
        - "0003": YCbCr (BT.601)
        - "0004": YCbCr (BT.709)
        - "0005": YCbCr (BT.2020)

- id: cec
  label: CEC
  kind: action
  command: "VCP-11-76"
  params:
    - name: mode
      type: string
      values:
        - "0001": OFF
        - "0002": MODE1 (ON)
        - "0003": MODE2

- id: cec_power_control_link
  label: CEC Power Control Link
  kind: action
  command: "VCP-11-77"
  params:
    - name: state
      type: string
      values:
        - "0001": DISABLE
        - "0002": ENABLE

- id: cec_audio_receiver
  label: CEC Audio Receiver
  kind: action
  command: "VCP-11-78"
  params:
    - name: state
      type: string
      values:
        - "0001": DISABLE
        - "0002": ENABLE

- id: background_color
  label: Background Color
  kind: action
  command: "VCP-02-DF"
  params:
    - name: level
      type: integer
      description: "0000H - 0064H (Black - White)"

- id: reset
  label: Reset
  kind: action
  command: "VCP-02-CB"   # same opcode used for multiple reset scopes; value selects scope
  params:
    - name: reset_type
      type: string
      description: Reset scope (4 ASCII hex chars)
      values:
        - "0013": Input
        - "0004": Audio
        - "000F": Slot
        - "0010": Network
        - "0001": All (Factory Reset)

- id: picture_mode
  label: Picture Mode
  kind: action
  command: "VCP-02-1A"
  params:
    - name: mode
      type: string
      values:
        - "0003": HIGHBRIGHT
        - "0008": CUSTOM1
        - "001C": RETAIL
        - "001D": CONFERENCING
        - "001E": TRANSPORTATION
        - "001F": NATIVE

- id: backlight
  label: Backlight
  kind: action
  command: "VCP-00-10"
  params:
    - name: level
      type: integer
      description: "0000H - 0064H (Dark - Bright)"

- id: video_black_level
  label: Video Black Level
  kind: action
  command: "VCP-00-92"
  params:
    - name: level
      type: integer
      description: "0000H - 0064H (To Dark - To Bright)"

- id: gamma
  label: Gamma
  kind: action
  command: "VCP-02-68"
  params:
    - name: gamma
      type: string
      values:
        - "0001": NATIVE
        - "0004": "2.2"
        - "0005": DICOM SIM.
        - "0006": PROGRAMABLE1
        - "0007": S GAMMA
        - "0008": "2.4"
        - "0009": Custom
        - "000B": sRGB
        - "000C": L STAR
        - "000D": PROGRAMMABLE2
        - "000E": PROGRAMMABLE3
        - "000F": Bt1886
        - "0010": HDR-Hybrid Log
        - "0011": HDR-ST2084 (PQ)

- id: auto_hdr_select
  label: Auto HDR Select
  kind: action
  command: "VCP-11-B2"
  params:
    - name: state
      type: string
      values:
        - "0001": ON
        - "0002": OFF

- id: color_vcp_021f
  label: Color (VCP-02-1F)
  kind: action
  command: "VCP-02-1F"
  params:
    - name: level
      type: integer
      description: "0000H - 0064H (Pale - To Deep)"

- id: color_vcp_008a
  label: Color (VCP-00-8A)
  kind: action
  command: "VCP-00-8A"
  params:
    - name: level
      type: integer
      description: "0000H - 0064H (Pale - To Deep)"

- id: color_temperature_multiplier
  label: Color Temperature Multiplier
  kind: action
  command: "VCP-00-0C"
  params:
    - name: multiplier
      type: integer
      description: "0 - (max value: 0001h-FFFFh); 0 -> 3000K base; >0 = multiplier of increment (VCP-00-0B) added to base 3000K"

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "VCP-00-54"
  params:
    - name: kelvin
      type: integer
      description: "0000H - 004AH (2600K - 10000K), step 100K"

- id: color_temperature_preset
  label: Color Temperature Preset
  kind: action
  command: "VCP-00-14"
  params:
    - name: preset
      type: string
      values:
        - "0002": Display native (NATIVE)
        - "0009": 10000K
        - "000B": User1 (CUSTOM)

- id: r_gain
  label: R Gain
  kind: action
  command: "VCP-00-16"
  params:
    - name: level
      type: integer
      description: "0000H - 0064H (Dark - Bright)"

- id: g_gain
  label: G Gain
  kind: action
  command: "VCP-00-18"
  params:
    - name: level
      type: integer
      description: "0000H - 0064H (Dark - Bright)"

- id: b_gain
  label: B Gain
  kind: action
  command: "VCP-00-1A"
  params:
    - name: level
      type: integer
      description: "0000H - 0064H (Dark - Bright)"

- id: contrast
  label: Contrast
  kind: action
  command: "VCP-00-12"
  params:
    - name: level
      type: integer
      description: "0000H - 0064H (Low - High)"

- id: audio_mode
  label: Audio Mode
  kind: action
  command: "VCP-11-D8"
  params:
    - name: mode
      type: string
      values:
        - "0001": RETAIL
        - "0002": CONFERENCING
        - "0003": HIGHBRIGHT
        - "0004": TRANSPORTATION
        - "0005": CUSTOM
        - "0007": NATIVE

- id: volume
  label: Volume
  kind: action
  command: "VCP-00-62"
  params:
    - name: level
      type: integer
      description: "0000H - 0064H (Whisper - Loud)"

- id: stereo_mono
  label: Stereo/Mono
  kind: action
  command: "VCP-00-94"
  params:
    - name: mode
      type: string
      values:
        - "0001": Monaural
        - "0002": Stereo

- id: balance
  label: Balance
  kind: action
  command: "VCP-00-93"
  params:
    - name: level
      type: integer
      description: "0000H - 0032H (To Left - To Right)"

- id: surround
  label: Surround
  kind: action
  command: "VCP-02-34"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: treble
  label: Treble
  kind: action
  command: "VCP-00-8F"
  params:
    - name: level
      type: integer
      description: "0000H - 0064H (De-emphasized - Emphasized)"

- id: bass
  label: Bass
  kind: action
  command: "VCP-00-91"
  params:
    - name: level
      type: integer
      description: "0000H - 0064H (De-emphasized - Emphasized)"

- id: line_out
  label: Line Out
  kind: action
  command: "VCP-10-81"
  params:
    - name: mode
      type: string
      values:
        - "0001": FIXED
        - "0002": VARIABLE

- id: audio_input
  label: Audio Input
  kind: action
  command: "VCP-02-2E"
  params:
    - name: input
      type: string
      values:
        - "0004": HDMI1
        - "0006": Option
        - "0007": DisplayPort
        - "000A": HDMI2
        - "000E": COMPUTE MODULE
        - "000F": USB-C

- id: internal_speaker
  label: Internal Speaker
  kind: action
  command: "VCP-11-BB"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: auto_shutdown
  label: Auto Shutdown
  kind: action
  command: "VCP-11-B7"
  params:
    - name: state
      type: string
      values:
        - "0001": DISABLE
        - "0002": ENABLE

- id: shutdown_signal
  label: Shutdown Signal
  kind: action
  command: "VCP-11-81"
  params:
    - name: state
      type: string
      values:
        - "0001": DISABLE
        - "0002": ENABLE

- id: ir_signal
  label: IR Signal
  kind: action
  command: "VCP-11-7F"
  params:
    - name: state
      type: string
      values:
        - "0001": DISABLE
        - "0002": ENABLE

- id: monitor_control
  label: Monitor Control
  kind: action
  command: "VCP-11-80"
  params:
    - name: state
      type: string
      values:
        - "0001": DISABLE
        - "0002": ENABLE

- id: wdt_enable
  label: WDT Enable/Disable
  kind: action
  command: "VCP-11-9B"
  params:
    - name: state
      type: string
      values:
        - "0001": DISABLE
        - "0002": ENABLE

- id: wdt_control
  label: WDT Control/Status
  kind: action
  command: "VCP-11-9E"
  params:
    - name: action
      type: string
      description: "Set: 0000H=No mean, 0001H=Reset WDT, 0002H=Stop. Get: 0000H=disabled, 0001H=running, 0002H=stopped"
      values:
        - "0000": No mean (Set) / WDT is disabled (Get)
        - "0001": Reset WDT (Set) / WDT is running (Get)
        - "0002": Stop (Set) / WDT is stopped (Get)

- id: wdt_startup_time
  label: WDT Start Up Time
  kind: action
  command: "VCP-11-9C"
  params:
    - name: seconds
      type: integer
      description: "0001H - 001EH (10 - 300)"

- id: wdt_period_time
  label: WDT Period Time
  kind: action
  command: "VCP-11-9D"
  params:
    - name: seconds
      type: integer
      description: "0001H - 001EH (10 - 300)"

- id: slot_power
  label: Slot Power
  kind: action
  command: "VCP-10-41"
  params:
    - name: mode
      type: string
      values:
        - "0001": OFF
        - "0002": ON
        - "0003": AUTO

- id: network_interface_display
  label: Network Interface Display
  kind: action
  command: "VCP-11-CF"
  params:
    - name: state
      type: string
      values:
        - "0001": Disable
        - "0002": Enable

- id: network_interface_compute_module
  label: Network Interface Compute Module
  kind: action
  command: "VCP-11-D1"
  params:
    - name: state
      type: string
      values:
        - "0001": Disable
        - "0002": Enable

- id: http_server
  label: HTTP Server
  kind: action
  command: "VCP-11-F0"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: https_server
  label: HTTPS Server
  kind: action
  command: "VCP-13-22"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: pc_control
  label: PC Control
  kind: action
  command: "VCP-11-F4"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: pc_control_secure
  label: PC Control Secure
  kind: action
  command: "VCP-13-23"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: search
  label: Search
  kind: action
  command: "VCP-13-24"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: lan_daisy_chain
  label: LAN Daisy Chain
  kind: action
  command: "VCP-13-25"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: amx_beacon
  label: AMX Beacon
  kind: action
  command: "VCP-11-F2"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: crestron
  label: Crestron
  kind: action
  command: "VCP-11-F3"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: snmp
  label: SNMP
  kind: action
  command: "VCP-13-26"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: icmp
  label: ICMP
  kind: action
  command: "VCP-13-27"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: ip_mac_filter
  label: IP/MAC Filter
  kind: action
  command: "VCP-13-28"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: naviset_secure
  label: NAVISET Secure
  kind: action
  command: "VCP-13-3A"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: ieee802_1x
  label: IEEE802.1X
  kind: action
  command: "VCP-13-29"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: power_save_message
  label: Power Save Message
  kind: action
  command: "VCP-11-7B"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: quick_start
  label: Quick Start
  kind: action
  command: "VCP-11-EA"
  params:
    - name: state
      type: string
      values:
        - "0001": DISABLE
        - "0002": ENABLE

- id: fan_control
  label: Fan Control
  kind: action
  command: "VCP-02-7D"
  params:
    - name: mode
      type: string
      values:
        - "0001": AUTO (no offset)
        - "0002": Forced ON

- id: fan_speed
  label: Fan Speed
  kind: action
  command: "VCP-10-3F"
  params:
    - name: speed
      type: string
      values:
        - "0001": HIGH
        - "0002": LOW

- id: fan_status_select
  label: Fan Status Select
  kind: action
  command: "VCP-02-7A"
  params:
    - name: fan
      type: string
      description: Selects which fan to read via VCP-02-7B
      values:
        - "0001": Fan#1
        - "0002": Fan#2
        - "0003": Fan#3
        - "0004": Fan#1+Fan#2
        - "0005": Fan#1+Fan#2+Fan#3

- id: fan_status_value
  label: Fan Status Value
  kind: query
  command: "VCP-02-7B"
  params:
    - name: status
      type: string
      values:
        - "0000": OFF
        - "0001": ON
        - "0002": Error

- id: temperature_sensor_select
  label: Temperature Sensor Select
  kind: action
  command: "VCP-02-78"
  params:
    - name: sensor
      type: string
      values:
        - "0001": Sensor#1
        - "0002": Sensor#2
        - "0003": Sensor#3

- id: temperature_value
  label: Temperature Value
  kind: query
  command: "VCP-02-79"
  params:
    - name: value
      type: integer
      description: "0000H - FFFFH"

- id: power_on_delay
  label: Power On Delay
  kind: action
  command: "VCP-02-D8"
  params:
    - name: seconds
      type: integer
      description: "0000H: OFF; 0001H - 0032H (1sec - 50sec)"

- id: link_to_id
  label: Link To ID
  kind: action
  command: "VCP-10-BC"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: ext_control_rs232c_port
  label: External Control RS-232C Port
  kind: action
  command: "VCP-13-2A"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: ext_control_usb_port
  label: External Control USB Port
  kind: action
  command: "VCP-13-2B"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON

- id: monitor_id
  label: Monitor ID
  kind: action
  command: "VCP-02-3E"
  params:
    - name: id
      type: integer
      description: "0001H - 0064H"

- id: group_id
  label: Group ID
  kind: action
  command: "VCP-10-7F"
  params:
    - name: bitmask
      type: integer
      description: "0000H - 03FFH; bit0=A, bit1=B, bit2=C, bit3=D, bit4=E, bit5=F, bit6=G, bit7=H, bit8=I, bit9=J"

- id: command_transfer
  label: Command Transfer
  kind: action
  command: "VCP-11-4F"
  params:
    - name: state
      type: string
      values:
        - "0001": OFF
        - "0002": ON
```

## Feedbacks
```yaml
# Result codes are returned in reply messages (MsgType B/D/F):
#   00h: No Error
#   01h: Unsupported operation with this monitor or unsupported under current condition

- id: power_state
  type: enum
  values: [ON, Stand-by, Reserved, OFF]
  # CTL-01D6 reply current power mode: 0001=ON, 0002=Stand-by(power save), 0003=Reserved, 0004=OFF

- id: timing_status
  type: string
  description: "CTL-07 reply: SS byte (bit7 out-of-range, bit6 unstable, bit1 H-sync polarity, bit0 V-sync polarity), H Freq (0.01kHz), V Freq (0.01Hz)"

- id: get_param_reply
  type: string
  description: "VCP get reply (MsgType D): Result | OP Code Page | OP Code | Type (00=Set, 01=Momentary) | Max value | Current Value"

- id: set_param_reply
  type: string
  description: "VCP set reply (MsgType F): Result | OP Code Page | OP Code | Type | Max value | Requested Setting Value"

- id: null_message
  type: string
  description: "CTL-BE (NULL message): returned on timeout (default 10s), unsupported message type, BCC error, or not ready/not expected. Returned during execution of Power ON/OFF, Auto Setup, Input, PIP Input, Factory reset."
```

## Variables
```yaml
# Settable parameters are represented as Actions above (each VCP code is get/set).
# No additional independent variables defined.
# UNRESOLVED: none beyond action params
```

## Events
```yaml
# No unsolicited notifications documented; monitor replies only to controller requests.
# NULL message (CTL-BE) is a reply, not an unsolicited event.
# UNRESOLVED: none
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "After Power On / Power Off, controller must wait 15 seconds before sending next command."
  - "After Input / PIP Input / Auto Setup / Factory Reset, controller must wait 10 seconds before sending next command."
  - "Controller must wait for a reply packet before sending the next command."
  - "LAN control: monitor disconnects if no packet received for 15 minutes; controller must re-connect to resume control."
# UNRESOLVED: no explicit safety/hazard interlock procedures stated beyond communication timing.
```

## Notes
- Framed binary-over-ASCII protocol. All numeric data bytes are ASCII-encoded hex (e.g. byte
  value 3Ah is sent as ASCII '3','A'). BCC check code = XOR of all bytes from Reserved ('0')
  through ETX, inclusive. Delimiter is CR (0Dh).
- Two command families: **VCP** (get/set a parameter by OP code page + OP code; MsgType C/E,
  reply D/F) and **CTL** (discrete command messages; MsgType A, reply B). VCP codes use the
  `VCP-<page>-<code>` notation; CTL codes use the `CTL-<...>` notation.
- Destination address maps to Monitor ID (1->'A' 41h ... 100->A4h, ALL->'*' 2Ah) or Group ID
  (A->'1' ... J->':'). Reply sets destination to the controller ('0') and source to the
  monitor's own ID.
- Many CTL commands (INPUT NAME, NAME RESET, MAC ADDRESS, POWER SAVE, TIME SETTING,
  PASSWORD/SECURE MODE, LOCK SETTINGS, MODEL, SERIAL, FIRMWARE) are referenced to "section 7"
  which was not present in the refined source excerpt; their detailed payloads are marked
  UNRESOLVED in the Actions section.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: serial flow control not stated in source -->
<!-- UNRESOLVED: section 7 CTL command payloads (INPUT NAME, MAC ADDRESS, PASSWORD, LOCK,
MODEL, SERIAL, FIRMWARE, POWER SAVE, TIME SETTING) not included in source excerpt -->

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
  - smj.jp.sharp
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
  - https://smj.jp.sharp/bs/lcd-display/lineup/pnm/download_files/sharp-lcd_display_pnm2-pnp6-series_external-control_manual.pdf
  - https://business.sharpusa.com/product-downloads
retrieved_at: 2026-08-05T06:06:39.004Z
last_checked_at: 2026-08-05T08:41:25.572Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:41:25.572Z
matched_actions: 99
action_count: 99
confidence: medium
summary: "All 99 spec actions map to wire tokens present verbatim in source; transport (9600/8/N/1, port 7142) is source-supported. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "section 7 referenced for many CTL commands (INPUT NAME, MAC ADDRESS,"
- "flow control not stated in source"
- "section 7 payload not in source excerpt"
- "input name payload per section 7 (not in source excerpt)\""
- "none beyond action params"
- none
- "no multi-step sequences described in source"
- "no explicit safety/hazard interlock procedures stated beyond communication timing."
- "serial flow control not stated in source"
- "section 7 CTL command payloads (INPUT NAME, MAC ADDRESS, PASSWORD, LOCK,"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
