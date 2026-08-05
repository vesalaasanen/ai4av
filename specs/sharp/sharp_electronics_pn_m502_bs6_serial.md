---
spec_id: admin/sharp-electronics-pn-m502-bs6
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Electronics PN-M502 Control Spec"
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
  - sharp-displays.jp.sharp
  - manuals.plus
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/M652_M552_M502_M432_P656_P556_P506_P436_Manual_EN_V2.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/m652_m552_m502_m432_p556_p506_p436_usermanual_english.pdf
  - https://manuals.plus/sharp/pn-m432-series-lcd-monitor-manual
  - https://business.sharpusa.com
retrieved_at: 2026-08-02T06:25:13.070Z
last_checked_at: 2026-08-05T08:40:47.359Z
generated_at: 2026-08-05T08:40:47.359Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-specific model coverage — source manual is shared across 12 SKUs; per-model feature support not enumerated"
  - "not applicable - VCP/CTL protocol exposes all settable parameters as discrete action commands; no separate Variables layer needed"
  - "source describes only request/response framing; unsolicited push events not documented"
  - "source does not document multi-step macro sequences"
  - "source does not document electrical safety warnings or hardware interlocks beyond the inter-command timing intervals above"
  - "firmware version compatibility ranges, error recovery sequences, and per-model command support gaps are not specified in source"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:40:47.359Z
  matched_actions: 108
  action_count: 108
  confidence: medium
  summary: "All 108 spec actions carry wire-literal VCP/CTL opcodes that appear verbatim in the source's chapter-7 CTL list and chapter-8 OSD command table; shapes and transport parameters agree. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-02
---

# Sharp Electronics PN-M502 Control Spec

## Summary
RS-232C and LAN (TCP/IP) external control spec for Sharp Electronics M/P Series professional LCD monitors (PN-M432 through PN-P756). Defines framed VCP/CTL command protocol with ASCII header, message body, BCC checksum, and CR delimiter; specifies serial parameters (9600/8/N/1) and LAN port 7142.

<!-- UNRESOLVED: device-specific model coverage — source manual is shared across 12 SKUs; per-model feature support not enumerated -->

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
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from CTL-C203-D6 power control command
- routable        # inferred from VCP-00-60 input select command
- queryable       # inferred from CTL-01D6, CTL-07, and VCP Get commands
- levelable       # inferred from VCP-00-62 volume, VCP-00-10 backlight
```

## Actions
```yaml
- id: save_current_settings
  label: Save Current Settings
  kind: action
  command: "CTL-0C  # STX '0''C' ETX, full packet: SOH-'0'-ID-'0'-'A'-'0'-'4'-STX-'0'-'C'-ETX-BCC-CR"
  params: []

- id: get_timing_report
  label: Get Timing Report
  kind: query
  command: "CTL-07  # STX '0''7' ETX, full packet: SOH-'0'-ID-'0'-'A'-'0'-'4'-STX-'0'-'7'-ETX-BCC-CR"
  params: []

- id: null_message
  label: NULL Message (monitor reply)
  kind: feedback
  command: "STX 'B''E' ETX  # 01h-30h-30h-41h-42h-30h-34h-02h-42h-45h-03h-CHK-0Dh"
  params: []

- id: power_status_read
  label: Power Status Read
  kind: query
  command: "CTL-01D6  # OP code page 01, OP code D6"
  params: []

- id: power_control
  label: Power Control
  kind: action
  command: "CTL-C203-D6  # D01~06 'C203D6', D07~10 power mode"
  params:
    - name: power_mode
      type: integer
      description: "0001H=ON, 0002H=Do not set, 0003H=Do not set, 0004H=OFF"

- id: input_select
  label: Input Select
  kind: action
  command: "VCP-00-60  # 16-bit value selects input"
  params:
    - name: input
      type: integer
      description: "000DH=OPTION, 000FH=DisplayPort, 0011H=HDMI1, 0012H=HDMI2, 0088H=COMPUTE MODULE, 0089H=USB-C"

- id: input_name
  label: Input Name
  kind: action
  command: "CTL-CA04-00  # input 1 name"
  params: []

- id: input_name2
  label: Input Name (input 2)
  kind: action
  command: "CTL-CA04-01"
  params: []

- id: name_reset
  label: Name Reset
  kind: action
  command: "CTL-CA04-02"
  params: []

- id: auto_input_change
  label: Auto Input Change
  kind: action
  command: "VCP-02-40"
  params:
    - name: mode
      type: integer
      description: "0000H=FIRST DETECT, 0001H=LAST DETECT, 0002H=NONE, 0004H=CUSTOM DETECT"

- id: input_priority_1
  label: Input Priority 1
  kind: action
  command: "VCP-10-2E"
  params:
    - name: input
      type: integer
      description: "000DH=OPTION, 000FH=DisplayPort, 0010H=HDMI1, 0012H=HDMI2, 0088H=COMPUTE MODULE, 0089H=USB-C"

- id: input_priority_2
  label: Input Priority 2
  kind: action
  command: "VCP-10-2F"
  params:
    - name: input
      type: integer
      description: "000DH=OPTION, 000FH=DisplayPort, 0010H=HDMI1, 0012H=HDMI2, 0088H=COMPUTE MODULE, 0089H=USB-C"

- id: input_priority_3
  label: Input Priority 3
  kind: action
  command: "VCP-10-30"
  params:
    - name: input
      type: integer
      description: "000DH=OPTION, 000FH=DisplayPort, 0010H=HDMI1, 0012H=HDMI2, 0088H=COMPUTE MODULE, 0089H=USB-C"

- id: current_input
  label: Current Input (read)
  kind: query
  command: "VCP-00-60  # read current value"
  params: []

- id: displayport_version
  label: DisplayPort Version
  kind: action
  command: "VCP-10-F2"
  params:
    - name: version
      type: integer
      description: "0001H=1.1a, 0002H=1.2, 0003H=1.4"

- id: displayport_mst
  label: DisplayPort MST/SST
  kind: action
  command: "VCP-11-67"
  params:
    - name: mode
      type: integer
      description: "0001H=SST, 0002H=MST"

- id: hdcp_version
  label: HDCP Version
  kind: action
  command: "VCP-11-D2"
  params:
    - name: version
      type: integer
      description: "0001H=HDCP1.4, 0002H=HDCP2.2"

- id: hdr
  label: HDR
  kind: action
  command: "VCP-11-FD"
  params:
    - name: state
      type: integer
      description: "0001H=DISABLE, 0002H=ENABLE"

- id: hdmi_mode
  label: HDMI Mode
  kind: action
  command: "VCP-11-68"
  params:
    - name: mode
      type: integer
      description: "0001H=Mode1(1.4), 0002H=Mode2(2.0)"

- id: overscan
  label: Overscan
  kind: action
  command: "VCP-02-E3"
  params:
    - name: mode
      type: integer
      description: "0001H=OFF, 0002H=ON, 0003H=Auto"

- id: video_range
  label: Video Range
  kind: action
  command: "VCP-10-40"
  params:
    - name: range
      type: integer
      description: "0001H=LIMITED, 0002H=FULL, 0003H=AUTO"

- id: colorimetry
  label: Colorimetry
  kind: action
  command: "VCP-11-A3"
  params:
    - name: mode
      type: integer
      description: "0001H=AUTO, 0002H=RGB, 0003H=YCbCr(BT.601), 0004H=YCbCr(BT.709), 0005H=YCbCr(BT.2020)"

- id: cec
  label: CEC
  kind: action
  command: "VCP-11-76"
  params:
    - name: mode
      type: integer
      description: "0001H=OFF, 0002H=MODE1(ON), 0003H=MODE2"

- id: power_control_link
  label: Power Control Link (CEC)
  kind: action
  command: "VCP-11-77"
  params:
    - name: state
      type: integer
      description: "0001H=DISABLE, 0002H=ENABLE"

- id: audio_receiver
  label: Audio Receiver (CEC)
  kind: action
  command: "VCP-11-78"
  params:
    - name: state
      type: integer
      description: "0001H=DISABLE, 0002H=ENABLE"

- id: background_color
  label: Background Color
  kind: action
  command: "VCP-02-DF"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Black-White)"

- id: reset_input
  label: Reset Input
  kind: action
  command: "VCP-02-CB  # value 0013H"
  params: []

- id: picture_mode
  label: Picture Mode
  kind: action
  command: "VCP-02-1A"
  params:
    - name: mode
      type: integer
      description: "0003H=HIGHBRIGHT, 0008H=CUSTOM1, 001CH=RETAIL, 001DH=CONFERENCING, 001EH=TRANSPORTATION, 001FH=NATIVE"

- id: backlight
  label: Backlight
  kind: action
  command: "VCP-00-10"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Dark-Bright)"

- id: video_black_level
  label: Video Black Level
  kind: action
  command: "VCP-00-92"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (To Dark-To Bright)"

- id: gamma
  label: Gamma
  kind: action
  command: "VCP-02-68"
  params:
    - name: mode
      type: integer
      description: "0001H=NATIVE, 0004H=2.2, 0005H=DICOM SIM., 0006H=PROGRAMABLE1, 0007H=S GAMMA, 0008H=2.4, 0009H=Custom, 000BH=sRGB, 000CH=L STAR, 000DH=PROGRAMMABLE2, 000EH=PROGRAMMABLE3, 000FH=Bt1886, 0010H=HDR-Hybrid Log, 0011H=HDR-ST2084(PQ)"

- id: auto_hdr_select
  label: Auto HDR Select
  kind: action
  command: "VCP-11-B2"
  params:
    - name: state
      type: integer
      description: "0001H=ON, 0002H=OFF"

- id: color_vcp02
  label: Color (VCP-02-1F)
  kind: action
  command: "VCP-02-1F"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Pale-To Deep)"

- id: color_vcp00
  label: Color (VCP-00-8A)
  kind: action
  command: "VCP-00-8A"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Pale-To Deep)"

- id: color_temp_base
  label: Color Temperature Base
  kind: action
  command: "VCP-00-0C"
  params:
    - name: value
      type: integer
      description: "0=Get: 2600K-3000K, Set: 3000K; >0 multiplier of increment"

- id: color_temp_range
  label: Color Temperature Range
  kind: action
  command: "VCP-00-54"
  params:
    - name: value
      type: integer
      description: "0000H-004AH (2600K-10000K) step 100K"

- id: color_temp_preset
  label: Color Temperature Preset
  kind: action
  command: "VCP-00-14"
  params:
    - name: preset
      type: integer
      description: "0002H=NATIVE, 0009H=10000K, 000BH=User1(CUSTOM)"

- id: r_gain
  label: R Gain
  kind: action
  command: "VCP-00-16"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Dark-Bright)"

- id: g_gain
  label: G Gain
  kind: action
  command: "VCP-00-18"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Dark-Bright)"

- id: b_gain
  label: B Gain
  kind: action
  command: "VCP-00-1A"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Dark-Bright)"

- id: contrast
  label: Contrast
  kind: action
  command: "VCP-00-12"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Low-High)"

- id: audio_mode
  label: Audio Mode
  kind: action
  command: "VCP-11-D8"
  params:
    - name: mode
      type: integer
      description: "0001H=RETAIL, 0002H=CONFERENCING, 0003H=HIGHBRIGHT, 0004H=TRANSPORTATION, 0005H=CUSTOM, 0007H=NATIVE"

- id: volume
  label: Volume
  kind: action
  command: "VCP-00-62"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (Whisper-Loud)"

- id: stereo_mono
  label: Stereo/Mono
  kind: action
  command: "VCP-00-94"
  params:
    - name: mode
      type: integer
      description: "0001H=Monaural, 0002H=Stereo"

- id: balance
  label: Balance
  kind: action
  command: "VCP-00-93"
  params:
    - name: value
      type: integer
      description: "0000H-0032H (To Left-To Right)"

- id: surround
  label: Surround
  kind: action
  command: "VCP-02-34"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: treble
  label: Treble
  kind: action
  command: "VCP-00-8F"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (De-emphasized-Emphasized)"

- id: bass
  label: Bass
  kind: action
  command: "VCP-00-91"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (De-emphasized-Emphasized)"

- id: line_out
  label: Line Out
  kind: action
  command: "VCP-10-81"
  params:
    - name: mode
      type: integer
      description: "0001H=FIXED, 0002H=VARIABLE"

- id: audio_input
  label: Audio Input
  kind: action
  command: "VCP-02-2E"
  params:
    - name: input
      type: integer
      description: "0004H=HDMI1, 0006H=Option, 0007H=DisplayPort, 000AH=HDMI2, 000EH=COMPUTE MODULE, 000FH=USB-C"

- id: internal_speaker
  label: Internal Speaker
  kind: action
  command: "VCP-11-BB"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: reset_audio
  label: Reset Audio
  kind: action
  command: "VCP-02-CB  # value 0004H"
  params: []

- id: auto_shutdown
  label: Auto Shutdown
  kind: action
  command: "VCP-11-B7"
  params:
    - name: state
      type: integer
      description: "0001H=DISABLE, 0002H=ENABLE"

- id: shutdown_signal
  label: Shutdown Signal
  kind: action
  command: "VCP-11-81"
  params:
    - name: state
      type: integer
      description: "0001H=DISABLE, 0002H=ENABLE"

- id: ir_signal
  label: IR Signal
  kind: action
  command: "VCP-11-7F"
  params:
    - name: state
      type: integer
      description: "0001H=DISABLE, 0002H=ENABLE"

- id: monitor_control
  label: Monitor Control
  kind: action
  command: "VCP-11-80"
  params:
    - name: state
      type: integer
      description: "0001H=DISABLE, 0002H=ENABLE"

- id: wdt_enable
  label: WDT Enable
  kind: action
  command: "VCP-11-9B"
  params:
    - name: state
      type: integer
      description: "0001H=DISABLE, 0002H=ENABLE"

- id: wdt_control
  label: WDT Control (set)
  kind: action
  command: "VCP-11-9E"
  params:
    - name: control
      type: integer
      description: "0000H=No mean, 0001H=Reset WDT, 0002H=Stop"

- id: wdt_status
  label: WDT Status (read)
  kind: query
  command: "VCP-11-9E  # read returns 0000H=disabled, 0001H=running, 0002H=stopped"
  params: []

- id: wdt_start_up_time
  label: WDT Start Up Time
  kind: action
  command: "VCP-11-9C"
  params:
    - name: value
      type: integer
      description: "0001H-001EH (10-300)"

- id: wdt_period_time
  label: WDT Period Time
  kind: action
  command: "VCP-11-9D"
  params:
    - name: value
      type: integer
      description: "0001H-001EH (10-300)"

- id: slot_power
  label: Slot Power
  kind: action
  command: "VCP-10-41"
  params:
    - name: mode
      type: integer
      description: "0001H=OFF, 0002H=ON, 0003H=AUTO"

- id: reset_slot
  label: Reset Slot
  kind: action
  command: "VCP-02-CB  # value 000FH"
  params: []

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "CTL-C220"
  params: []

- id: network_interface_display
  label: Network Interface Display
  kind: action
  command: "VCP-11-CF"
  params:
    - name: state
      type: integer
      description: "0001H=Disable, 0002H=Enable"

- id: network_interface_compute_module
  label: Network Interface Compute Module
  kind: action
  command: "VCP-11-D1"
  params:
    - name: state
      type: integer
      description: "0001H=Disable, 0002H=Enable"

- id: http_server
  label: HTTP Server
  kind: action
  command: "VCP-11-F0"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: https_server
  label: HTTPS Server
  kind: action
  command: "VCP-13-22"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: pc_control
  label: PC Control
  kind: action
  command: "VCP-11-F4"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: pc_control_secure
  label: PC Control Secure
  kind: action
  command: "VCP-13-23"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: search
  label: Search
  kind: action
  command: "VCP-13-24"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: lan_daisy_chain
  label: LAN Daisy Chain
  kind: action
  command: "VCP-13-25"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: amx_beacon
  label: AMX Beacon
  kind: action
  command: "VCP-11-F2"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: crestron
  label: Crestron
  kind: action
  command: "VCP-11-F3"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: snmp
  label: SNMP
  kind: action
  command: "VCP-13-26"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: icmp
  label: ICMP
  kind: action
  command: "VCP-13-27"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: ip_mac_filter
  label: IP/MAC Filter
  kind: action
  command: "VCP-13-28"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: naviset_secure
  label: NaviSet Secure
  kind: action
  command: "VCP-13-3A"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: ieee802_1x
  label: IEEE 802.1X
  kind: action
  command: "VCP-13-29"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: reset_network
  label: Reset Network
  kind: action
  command: "VCP-02-CB  # value 0010H"
  params: []

- id: power_save_message
  label: Power Save Message
  kind: action
  command: "VCP-11-7B"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: quick_start
  label: Quick Start
  kind: action
  command: "VCP-11-EA"
  params:
    - name: state
      type: integer
      description: "0001H=DISABLE, 0002H=ENABLE"

- id: fan_control
  label: Fan Control
  kind: action
  command: "VCP-02-7D"
  params:
    - name: mode
      type: integer
      description: "0001H=AUTO(no offset), 0002H=Forced ON"

- id: fan_speed
  label: Fan Speed
  kind: action
  command: "VCP-10-3F"
  params:
    - name: speed
      type: integer
      description: "0001H=HIGH, 0002H=LOW"

- id: fan_select
  label: Fan Select
  kind: action
  command: "VCP-02-7A"
  params:
    - name: fan
      type: integer
      description: "0001H=Fan#1, 0002H=Fan#2, 0003H=Fan#3, 0004H=Fan#1+Fan#2, 0005H=Fan#1+Fan#2+Fan#3"

- id: fan_status
  label: Fan Status (read)
  kind: query
  command: "VCP-02-7B"
  params:
    - name: status
      type: integer
      description: "0000H=OFF, 0001H=ON, 0002H=Error"

- id: temperature_sensor_select
  label: Temperature Sensor Select
  kind: action
  command: "VCP-02-78"
  params:
    - name: sensor
      type: integer
      description: "0001H=Sensor#1, 0002H=Sensor#2, 0003H=Sensor#3"

- id: temperature_read
  label: Internal Temperature Read
  kind: query
  command: "VCP-02-79  # returns 0000H-FFFFH"
  params: []

- id: power_on_delay
  label: Power On Delay
  kind: action
  command: "VCP-02-D8"
  params:
    - name: value
      type: integer
      description: "0000H=OFF, 0001H-0032H (1sec-50sec)"

- id: link_to_id
  label: Power On Delay Link to ID
  kind: action
  command: "VCP-10-BC"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: security_password
  label: Security Password
  kind: action
  command: "CTL-C21D"
  params: []

- id: startup_lock
  label: Start-up Lock
  kind: action
  command: "CTL-C21D"
  params: []

- id: control_lock
  label: Control Lock
  kind: action
  command: "CTL-C21D"
  params: []

- id: lock_settings_select
  label: Lock Settings Select
  kind: action
  command: "CTL-CA32"
  params: []

- id: lock_settings_mode
  label: Lock Settings Mode
  kind: action
  command: "CTL-CA33"
  params: []

- id: get_model
  label: Get Model
  kind: query
  command: "CTL-C217"
  params: []

- id: get_serial
  label: Get Serial
  kind: query
  command: "CTL-C216"
  params: []

- id: get_firmware_revision
  label: Get Firmware Revision
  kind: query
  command: "CTL-C03F"
  params: []

- id: external_control_rs232c
  label: External Control RS-232C
  kind: action
  command: "VCP-13-2A"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: external_control_usb
  label: External Control USB
  kind: action
  command: "VCP-13-2B"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: monitor_id
  label: Monitor ID
  kind: action
  command: "VCP-02-3E"
  params:
    - name: id
      type: integer
      description: "0001H-0064H (1-100)"

- id: group_id
  label: Group ID
  kind: action
  command: "VCP-10-7F"
  params:
    - name: bits
      type: integer
      description: "0000H-03FFH; bit 0=A, bit 1=B, bit 2=C, bit 3=D, bit 4=E, bit 5=F, bit 6=G, bit 7=H, bit 8=I, bit 9=J"

- id: command_transfer
  label: Command Transfer
  kind: action
  command: "VCP-11-4F"
  params:
    - name: state
      type: integer
      description: "0001H=OFF, 0002H=ON"

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "VCP-02-CB  # value 0001H"
  params: []

- id: power_save_setting_mode
  label: Power Save Setting Mode
  kind: action
  command: "CTL-CA0B-00"
  params: []

- id: power_save_setting_value
  label: Power Save Setting Value
  kind: action
  command: "CTL-CA0B-01"
  params: []

- id: power_save_time
  label: Power Save Time
  kind: action
  command: "CTL-CA0B-02"
  params: []

- id: power_save_time_value
  label: Power Save Time Value
  kind: action
  command: "CTL-CA0B-03"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - on
    - standby
    - reserved
    - off
  notes: "From CTL-01D6 reply: 0001H=ON, 0002H=Stand-by, 0003H=Reserved, 0004H=OFF"

- id: get_param_reply
  type: object
  description: "Reply packet: STX + Result(00/01) + OP Code Page + OP Code + Type(00=set/01=momentary) + Max Value(16bit) + Current Value(16bit) + ETX"

- id: set_param_reply
  type: object
  description: "Reply packet: STX + Result(00/01) + OP Code Page + OP Code + Type(00/01) + Max Value(16bit) + Requested Setting Value(16bit) + ETX"

- id: timing_reply
  type: object
  description: "CTL-07 reply: STX + '4E' + SS(2 bytes: bit7=OOR/no signal, bit6=unstable, bit1=Hsync polarity, bit0=Vsync polarity) + H Freq(0.01kHz, 4 bytes) + V Freq(0.01Hz, 4 bytes) + ETX"

- id: null_message
  type: signal
  description: "BE NULL packet: 01h-30h-30h-41h-42h-30h-34h-02h-42h-45h-03h-CHK-0Dh - returned on timeout/error/busy"
```

## Variables
```yaml
<!-- UNRESOLVED: not applicable - VCP/CTL protocol exposes all settable parameters as discrete action commands; no separate Variables layer needed -->
```

## Events
```yaml
<!-- UNRESOLVED: source describes only request/response framing; unsolicited push events not documented -->
```

## Macros
```yaml
<!-- UNRESOLVED: source does not document multi-step macro sequences -->
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
  - name_reset
  - reset_input
  - reset_audio
  - reset_slot
  - reset_network
interlocks:
  - description: "After Power On/Off command, controller must wait 15s before next command"
  - description: "After Input/PIP Input/Auto Setup/Factory Reset, controller must wait 10s before next command"
  - description: "LAN connection drops after 15 minutes of packet inactivity; controller must reconnect"
<!-- UNRESOLVED: source does not document electrical safety warnings or hardware interlocks beyond the inter-command timing intervals above -->
```

## Notes
Protocol frames packets as: `SOH | Reserved('0') | DestAddr | SrcAddr('0' for controller) | MsgType | Length | STX ... ETX | BCC | CR`. BCC = XOR of D1..D16 bytes. Delimiter fixed as CR (0Dh). All message-body byte values are encoded as ASCII hex (e.g. 3Ah → '3A'). Monitor-ID-to-DestAddr mapping: ID 1→'A'(41h) ... ID 25→'Y'(59h), ID 26→'Z'(5Ah), IDs 26-100 continue hex sequence; ALL monitors → '*'(2Ah). Group ID A-J maps to '1'-':' (31h-3Ah). Default timeouts: 10 seconds. Power modes per CTL-01D6: 0001H=ON, 0002H=Stand-by (power save), 0003H=Reserved, 0004H=OFF (same as IR power off). Manual covers 12 SKUs (PN-M432/M502/M552/M652/P436/P506/P556/P656/M752/M862/M982/P756) — per-model feature availability not enumerated in source.

<!-- UNRESOLVED: firmware version compatibility ranges, error recovery sequences, and per-model command support gaps are not specified in source -->

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
  - sharp-displays.jp.sharp
  - manuals.plus
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/M652_M552_M502_M432_P656_P556_P506_P436_Manual_EN_V2.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/m652_m552_m502_m432_p556_p506_p436_usermanual_english.pdf
  - https://manuals.plus/sharp/pn-m432-series-lcd-monitor-manual
  - https://business.sharpusa.com
retrieved_at: 2026-08-02T06:25:13.070Z
last_checked_at: 2026-08-05T08:40:47.359Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:40:47.359Z
matched_actions: 108
action_count: 108
confidence: medium
summary: "All 108 spec actions carry wire-literal VCP/CTL opcodes that appear verbatim in the source's chapter-7 CTL list and chapter-8 OSD command table; shapes and transport parameters agree. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-specific model coverage — source manual is shared across 12 SKUs; per-model feature support not enumerated"
- "not applicable - VCP/CTL protocol exposes all settable parameters as discrete action commands; no separate Variables layer needed"
- "source describes only request/response framing; unsolicited push events not documented"
- "source does not document multi-step macro sequences"
- "source does not document electrical safety warnings or hardware interlocks beyond the inter-command timing intervals above"
- "firmware version compatibility ranges, error recovery sequences, and per-model command support gaps are not specified in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
