---
spec_id: admin/sharp-electronics-pn-m752
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Electronics PN-M752 Control Spec"
manufacturer: Sharp
model_family: PN-M752
aliases: []
compatible_with:
  manufacturers:
    - Sharp
    - "Sharp Electronics"
  models:
    - PN-M752
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
retrieved_at: 2026-08-02T12:16:35.433Z
last_checked_at: 2026-08-05T08:41:41.158Z
generated_at: 2026-08-05T08:41:41.158Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-CTL-command payload bytes for CTL-CA04/CA0B/CA32/CA33/C03F/C216/C217/C21D/C220 are referenced as \"Refer to section 7\" but section 7 detail is not present in the supplied source text"
  - "flow control not stated in source"
  - "payload \"Refer to section 7\" not in source"
  - "flow control not stated for RS-232C"
  - "payloads for CTL-CA04-00/01, CTL-CA04-02, CTL-CA0B-00/01/02/03, CTL-CA32, CTL-CA33, CTL-C03F, CTL-C216, CTL-C217, CTL-C21D, CTL-C220 referenced as \"Refer to section 7\" but section 7 body not present in supplied source"
  - "firmware version compatibility not stated in source"
  - "PIP Input commands referenced in NULL-message execution list but no PIP command table present in source"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:41:41.158Z
  matched_actions: 106
  action_count: 106
  confidence: medium
  summary: "Every spec action's wire token (CTL or VCP code) and every transport value appears verbatim in the refined source; spec covers all 17 CTL + 76 VCP tokens. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-02
---

# Sharp Electronics PN-M752 Control Spec

## Summary
External control spec for the Sharp PN-M752 LCD monitor (M/P Series family), covering RS-232C and LAN (TCP/IP) control. Uses a framed ASCII packet protocol with VCP (Get/Set parameter) and CTL (command) message types, a header/STX-ETX/BCC-checksum/CR-delimiter structure, and a large OSD-mirrored VCP command catalogue (input select, picture, audio, network, power, thermal, scheduling).

Note: source document also lists sibling models PN-M432/PN-M502/PN-M552/PN-M652/PN-P436/PN-P506/PN-P556/PN-P656/PN-M862/PN-M982/PN-P756 sharing the same protocol; this spec targets PN-M752.

<!-- UNRESOLVED: per-CTL-command payload bytes for CTL-CA04/CA0B/CA32/CA33/C03F/C216/C217/C21D/C220 are referenced as "Refer to section 7" but section 7 detail is not present in the supplied source text -->

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
  port: 7142  # LAN control, fixed
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from CTL-C203-D6 power control (ON/OFF)
  - queryable    # inferred from Get parameter / CTL-01D6 power status read
  - levelable    # inferred from VCP volume/backlight/contrast/gain settable params
```

## Actions
```yaml
# All payloads use the source's VCP/CTL mnemonic as the documented command
# identifier. Full wire framing (header + STX/ETX + BCC + CR) is described in
# Notes; each `command:` value is the verbatim OP-code/CTL code from the source.
# VCP Get/Set use OP code page + OP code (e.g. VCP-00-60 => page 00, op 60).
# Set value is a 16-bit ASCII-encoded value (see per-action params/description).

# --- System / CTL commands ---

- id: save_current_settings
  label: Save Current Settings
  kind: action
  command: "CTL-0C"
  params: []

- id: get_timing_report
  label: Get Timing Report
  kind: query
  command: "CTL-07"
  params: []

- id: power_status_read
  label: Power Status Read
  kind: query
  command: "CTL-01D6"
  params: []

- id: power_control
  label: Power Control
  kind: action
  command: "CTL-C203-D6"
  params:
    - name: power_mode
      type: integer
      description: "0001=ON, 0002=Do not set, 0003=Do not set, 0004=OFF (same as IR power off)"

# --- INPUT ---

- id: input_select
  label: Input Select
  kind: action
  command: "VCP-00-60"
  params:
    - name: input
      type: integer
      description: "000D=OPTION, 000F=DisplayPort, 0011=HDMI1, 0012=HDMI2, 0088=COMPUTE MODULE, 0089=USB-C"

- id: input_name_00
  label: Input Name (CTL-CA04-00)
  kind: action
  command: "CTL-CA04-00"
  params: []  # UNRESOLVED: payload "Refer to section 7" not in source

- id: input_name_01
  label: Input Name (CTL-CA04-01)
  kind: action
  command: "CTL-CA04-01"
  params: []  # UNRESOLVED: payload "Refer to section 7" not in source

- id: name_reset
  label: Name Reset
  kind: action
  command: "CTL-CA04-02"
  params: []  # UNRESOLVED: payload "Refer to section 7" not in source

- id: auto_input_change
  label: Auto Input Change
  kind: action
  command: "VCP-02-40"
  params:
    - name: mode
      type: integer
      description: "0000=FIRST DETECT, 0001=LAST DETECT, 0002=NONE, 0004=CUSTOM DETECT"

- id: priority_1
  label: Priority 1
  kind: action
  command: "VCP-10-2E"
  params:
    - name: input
      type: integer
      description: "000D=OPTION, 000F=DisplayPort, 0010=HDMI1, 0012=HDMI2, 0088=COMPUTE MODULE, 0089=USB-C"

- id: priority_2
  label: Priority 2
  kind: action
  command: "VCP-10-2F"
  params:
    - name: input
      type: integer
      description: "000D=OPTION, 000F=DisplayPort, 0010=HDMI1, 0012=HDMI2, 0088=COMPUTE MODULE, 0089=USB-C"

- id: priority_3
  label: Priority 3
  kind: action
  command: "VCP-10-30"
  params:
    - name: input
      type: integer
      description: "000D=OPTION, 000F=DisplayPort, 0010=HDMI1, 0012=HDMI2, 0088=COMPUTE MODULE, 0089=USB-C"

- id: current_input_info
  label: Current Input (Information)
  kind: query
  command: "VCP-00-60"
  params: []

- id: dp_version
  label: DisplayPort Version
  kind: action
  command: "VCP-10-F2"
  params:
    - name: version
      type: integer
      description: "0001=1.1a, 0002=1.2, 0003=1.4"

- id: dp_sst_mst
  label: DisplayPort SST/MST
  kind: action
  command: "VCP-11-67"
  params:
    - name: mode
      type: integer
      description: "0001=SST, 0002=MST"

- id: hdcp_version_dp
  label: HDCP Version (DisplayPort)
  kind: action
  command: "VCP-11-D2"
  params:
    - name: version
      type: integer
      description: "0001=HDCP1.4, 0002=HDCP2.2"

- id: hdr_dp
  label: HDR (DisplayPort)
  kind: action
  command: "VCP-11-FD"
  params:
    - name: state
      type: integer
      description: "0001=DISABLE, 0002=ENABLE"

- id: hdmi_mode
  label: HDMI Mode
  kind: action
  command: "VCP-11-68"
  params:
    - name: mode
      type: integer
      description: "0001=Mode1(1.4), 0002=Mode2(2.0)"

- id: hdcp_version_hdmi
  label: HDCP Version (HDMI)
  kind: action
  command: "VCP-11-D2"
  params:
    - name: version
      type: integer
      description: "0001=HDCP1.4, 0002=HDCP2.2"

- id: hdr_hdmi
  label: HDR (HDMI)
  kind: action
  command: "VCP-11-FD"
  params:
    - name: state
      type: integer
      description: "0001=DISABLE, 0002=ENABLE"

- id: overscan
  label: Overscan
  kind: action
  command: "VCP-02-E3"
  params:
    - name: mode
      type: integer
      description: "0001=OFF, 0002=ON, 0003=Auto"

- id: video_range
  label: Video Range
  kind: action
  command: "VCP-10-40"
  params:
    - name: range
      type: integer
      description: "0001=LIMITED, 0002=FULL, 0003=AUTO"

- id: colorimetry
  label: Colorimetry
  kind: action
  command: "VCP-11-A3"
  params:
    - name: mode
      type: integer
      description: "0001=AUTO, 0002=RGB, 0003=YCbCr(BT.601), 0004=YCbCr(BT.709), 0005=YCbCr(BT.2020)"

- id: cec
  label: CEC
  kind: action
  command: "VCP-11-76"
  params:
    - name: mode
      type: integer
      description: "0001=OFF, 0002=MODE1(ON), 0003=MODE2"

- id: cec_power_control_link
  label: CEC Power Control Link
  kind: action
  command: "VCP-11-77"
  params:
    - name: state
      type: integer
      description: "0001=DISABLE, 0002=ENABLE"

- id: cec_audio_receiver
  label: CEC Audio Receiver
  kind: action
  command: "VCP-11-78"
  params:
    - name: state
      type: integer
      description: "0001=DISABLE, 0002=ENABLE"

- id: background_color
  label: Background Color
  kind: action
  command: "VCP-02-DF"
  params:
    - name: value
      type: integer
      description: "0000-0064 (Black)-(White)"

- id: input_reset
  label: Reset (Input)
  kind: action
  command: "VCP-02-CB"
  params:
    - name: target
      type: integer
      description: "0013=Input"

# --- PICTURE ---

- id: picture_mode
  label: Picture Mode
  kind: action
  command: "VCP-02-1A"
  params:
    - name: mode
      type: integer
      description: "0003=HIGHBRIGHT, 0008=CUSTOM1, 001C=RETAIL, 001D=CONFERENCING, 001E=TRANSPORTATION, 001F=NATIVE"

- id: backlight
  label: Backlight
  kind: action
  command: "VCP-00-10"
  params:
    - name: level
      type: integer
      description: "0000-0064 (Dark)-(Bright)"

- id: video_black_level
  label: Video Black Level
  kind: action
  command: "VCP-00-92"
  params:
    - name: level
      type: integer
      description: "0000-0064 (To Dark)-(To Bright)"

- id: gamma
  label: Gamma
  kind: action
  command: "VCP-02-68"
  params:
    - name: mode
      type: integer
      description: "0001=NATIVE,0004=2.2,0005=DICOM SIM.,0006=PROGRAMABLE1,0007=S GAMMA,0008=2.4,0009=Custom,000B=sRGB,000C=L STAR,000D=PROGRAMMABLE2,000E=PROGRAMMABLE3,000F=Bt1886,0010=HDR-Hybrid Log,0011=HDR-ST2084(PQ)"

- id: auto_hdr_select
  label: Auto HDR Select
  kind: action
  command: "VCP-11-B2"
  params:
    - name: state
      type: integer
      description: "0001=ON, 0002=OFF"

- id: color_1
  label: Color (VCP-02-1F)
  kind: action
  command: "VCP-02-1F"
  params:
    - name: level
      type: integer
      description: "0000-0064 (Pale)-(To Deep)"

- id: color_2
  label: Color (VCP-00-8A)
  kind: action
  command: "VCP-00-8A"
  params:
    - name: level
      type: integer
      description: "0000-0064 (Pale)-(To Deep)"

- id: color_temp_0c
  label: Color Temperature (VCP-00-0C)
  kind: action
  command: "VCP-00-0C"
  params:
    - name: multiplier
      type: integer
      description: "0=max 0001-FFFF; 0 on Get=2600K-3000K, Set=3000K; >0 used as multiplier of color temp increment (VCP-00-0B) added to base 3000K"

- id: color_temp_54
  label: Color Temperature (VCP-00-54)
  kind: action
  command: "VCP-00-54"
  params:
    - name: kelvin
      type: integer
      description: "0000-004A (2600K)-(10000K) step 100K"

- id: color_temp_14
  label: Color Temperature Preset (VCP-00-14)
  kind: action
  command: "VCP-00-14"
  params:
    - name: mode
      type: integer
      description: "0002=Display native (NATIVE), 0009=10000K, 000B=User1(CUSTOM)"

- id: r_gain
  label: R Gain
  kind: action
  command: "VCP-00-16"
  params:
    - name: level
      type: integer
      description: "0000-0064 (Dark)-(Bright)"

- id: g_gain
  label: G Gain
  kind: action
  command: "VCP-00-18"
  params:
    - name: level
      type: integer
      description: "0000-0064 (Dark)-(Bright)"

- id: b_gain
  label: B Gain
  kind: action
  command: "VCP-00-1A"
  params:
    - name: level
      type: integer
      description: "0000-0064 (Dark)-(Bright)"

- id: contrast
  label: Contrast
  kind: action
  command: "VCP-00-12"
  params:
    - name: level
      type: integer
      description: "0000-0064 (Low)-(High)"

# --- AUDIO ---

- id: audio_mode
  label: Audio Mode
  kind: action
  command: "VCP-11-D8"
  params:
    - name: mode
      type: integer
      description: "0001=RETAIL,0002=CONFERENCING,0003=HIGHBRIGHT,0004=TRANSPORTATION,0005=CUSTOM,0007=NATIVE"

- id: volume
  label: Volume
  kind: action
  command: "VCP-00-62"
  params:
    - name: level
      type: integer
      description: "0000-0064 (Whisper)-(Loud)"

- id: stereo_mono
  label: Stereo/Mono
  kind: action
  command: "VCP-00-94"
  params:
    - name: mode
      type: integer
      description: "0001=Monaural, 0002=Stereo"

- id: balance
  label: Balance
  kind: action
  command: "VCP-00-93"
  params:
    - name: level
      type: integer
      description: "0000-0032 (To Left)-(To Right)"

- id: surround
  label: Surround
  kind: action
  command: "VCP-02-34"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: treble
  label: Treble
  kind: action
  command: "VCP-00-8F"
  params:
    - name: level
      type: integer
      description: "0000-0064 (De-emphasized)-(Emphasized)"

- id: bass
  label: Bass
  kind: action
  command: "VCP-00-91"
  params:
    - name: level
      type: integer
      description: "0000-0064 (De-emphasized)-(Emphasized)"

- id: line_out
  label: Line Out
  kind: action
  command: "VCP-10-81"
  params:
    - name: mode
      type: integer
      description: "0001=FIXED, 0002=VARIABLE"

- id: audio_input
  label: Audio Input
  kind: action
  command: "VCP-02-2E"
  params:
    - name: input
      type: integer
      description: "0004=HDMI1, 0006=Option, 0007=DisplayPort, 000A=HDMI2, 000E=COMPUTE MODULE, 000F=USB-C"

- id: internal_speaker
  label: Internal Speaker
  kind: action
  command: "VCP-11-BB"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: audio_reset
  label: Reset (Audio)
  kind: action
  command: "VCP-02-CB"
  params:
    - name: target
      type: integer
      description: "0004=Audio"

# --- POWER SETTING / ADVANCED ---

- id: auto_shutdown
  label: Auto Shutdown
  kind: action
  command: "VCP-11-B7"
  params:
    - name: state
      type: integer
      description: "0001=DISABLE, 0002=ENABLE"

- id: shutdown_signal
  label: Shutdown Signal
  kind: action
  command: "VCP-11-81"
  params:
    - name: state
      type: integer
      description: "0001=DISABLE, 0002=ENABLE"

- id: ir_signal
  label: IR Signal
  kind: action
  command: "VCP-11-7F"
  params:
    - name: state
      type: integer
      description: "0001=DISABLE, 0002=ENABLE"

- id: monitor_control
  label: Monitor Control
  kind: action
  command: "VCP-11-80"
  params:
    - name: state
      type: integer
      description: "0001=DISABLE, 0002=ENABLE"

- id: wdt_enable
  label: WDT Enable/Disable (VCP-11-9B)
  kind: action
  command: "VCP-11-9B"
  params:
    - name: state
      type: integer
      description: "0001=DISABLE, 0002=ENABLE"

- id: wdt_control
  label: WDT Control (VCP-11-9E)
  kind: action
  command: "VCP-11-9E"
  params:
    - name: action
      type: integer
      description: "Set: 0000=No mean, 0001=Reset WDT, 0002=Stop. Get: 0000=disabled, 0001=running, 0002=stopped"

- id: wdt_start_up_time
  label: WDT Start Up Time
  kind: action
  command: "VCP-11-9C"
  params:
    - name: value
      type: integer
      description: "0001-001E (10)-(300)"

- id: wdt_period_time
  label: WDT Period Time
  kind: action
  command: "VCP-11-9D"
  params:
    - name: value
      type: integer
      description: "0001-001E (10)-(300)"

- id: slot_power
  label: Slot Power
  kind: action
  command: "VCP-10-41"
  params:
    - name: mode
      type: integer
      description: "0001=OFF, 0002=ON, 0003=AUTO"

- id: slot_reset
  label: Reset (Slot)
  kind: action
  command: "VCP-02-CB"
  params:
    - name: target
      type: integer
      description: "000F=Slot"

- id: mac_address
  label: MAC Address
  kind: query
  command: "CTL-C220"
  params: []  # UNRESOLVED: payload "Refer to section 7" not in source

# --- NETWORK ---

- id: network_interface_display
  label: Network Interface Display
  kind: action
  command: "VCP-11-CF"
  params:
    - name: state
      type: integer
      description: "0001=Disable, 0002=Enable"

- id: network_interface_compute_module
  label: Network Interface Compute Module
  kind: action
  command: "VCP-11-D1"
  params:
    - name: state
      type: integer
      description: "0001=Disable, 0002=Enable"

- id: http_server
  label: HTTP Server
  kind: action
  command: "VCP-11-F0"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: https_server
  label: HTTPS Server
  kind: action
  command: "VCP-13-22"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: pc_control
  label: PC Control
  kind: action
  command: "VCP-11-F4"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: pc_control_secure
  label: PC Control Secure
  kind: action
  command: "VCP-13-23"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: search
  label: Search
  kind: action
  command: "VCP-13-24"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: lan_daisy_chain
  label: LAN Daisy Chain
  kind: action
  command: "VCP-13-25"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: amx_beacon
  label: AMX Beacon
  kind: action
  command: "VCP-11-F2"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: crestron
  label: Crestron
  kind: action
  command: "VCP-11-F3"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: snmp
  label: SNMP
  kind: action
  command: "VCP-13-26"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: icmp
  label: ICMP
  kind: action
  command: "VCP-13-27"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: ip_mac_filter
  label: IP/MAC Filter
  kind: action
  command: "VCP-13-28"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: naviset_secure
  label: NAVISET Secure
  kind: action
  command: "VCP-13-3A"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: ieee802_1x
  label: IEEE802.1X
  kind: action
  command: "VCP-13-29"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: network_reset
  label: Reset (Network)
  kind: action
  command: "VCP-02-CB"
  params:
    - name: target
      type: integer
      description: "0010=Network"

# --- PROTECT / POWER SAVE ---

- id: power_save_00
  label: Power Save (CTL-CA0B-00)
  kind: action
  command: "CTL-CA0B-00"
  params: []  # UNRESOLVED: payload "Refer to section 7" not in source

- id: power_save_01
  label: Power Save (CTL-CA0B-01)
  kind: action
  command: "CTL-CA0B-01"
  params: []  # UNRESOLVED: payload "Refer to section 7" not in source

- id: power_save_time_setting_02
  label: Power Save Time Setting (CTL-CA0B-02)
  kind: action
  command: "CTL-CA0B-02"
  params: []  # UNRESOLVED: payload "Refer to section 7" not in source

- id: power_save_time_setting_03
  label: Power Save Time Setting (CTL-CA0B-03)
  kind: action
  command: "CTL-CA0B-03"
  params: []  # UNRESOLVED: payload "Refer to section 7" not in source

- id: power_save_message
  label: Power Save Message
  kind: action
  command: "VCP-11-7B"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: quick_start
  label: Quick Start
  kind: action
  command: "VCP-11-EA"
  params:
    - name: state
      type: integer
      description: "0001=DISABLE, 0002=ENABLE"

# --- THERMAL MANAGEMENT ---

- id: fan_control
  label: Fan Control
  kind: action
  command: "VCP-02-7D"
  params:
    - name: mode
      type: integer
      description: "0001=AUTO(no offset), 0002=Forced ON"

- id: fan_speed
  label: Fan Speed
  kind: action
  command: "VCP-10-3F"
  params:
    - name: speed
      type: integer
      description: "0001=HIGH, 0002=LOW"

- id: fan_status_select
  label: Fan Status Select (VCP-02-7A)
  kind: query
  command: "VCP-02-7A"
  params:
    - name: fan
      type: integer
      description: "0001=Fan#1, 0002=Fan#2, 0003=Fan#3, 0004=Fan#1+Fan#2, 0005=Fan#1+Fan#2+Fan#3"

- id: fan_state
  label: Fan State (VCP-02-7B)
  kind: query
  command: "VCP-02-7B"
  params: []

- id: temp_sensor_select
  label: Temperature Sensor Select (VCP-02-78)
  kind: query
  command: "VCP-02-78"
  params:
    - name: sensor
      type: integer
      description: "0001=Sensor#1, 0002=Sensor#2, 0003=Sensor#3"

- id: temperature_value
  label: Temperature Value (VCP-02-79)
  kind: query
  command: "VCP-02-79"
  params: []

# --- POWER ON DELAY / SECURITY / LOCK ---

- id: power_on_delay
  label: Power On Delay
  kind: action
  command: "VCP-02-D8"
  params:
    - name: seconds
      type: integer
      description: "0000=OFF, 0001-0032 (1sec)-(50sec)"

- id: link_to_id
  label: Link To ID
  kind: action
  command: "VCP-10-BC"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: password_secure_mode
  label: Password / Secure Mode
  kind: action
  command: "CTL-C21D"
  params: []  # UNRESOLVED: payload "Refer to section 7" not in source

- id: lock_settings_select_ca32
  label: Lock Settings Select (CTL-CA32)
  kind: action
  command: "CTL-CA32"
  params: []  # UNRESOLVED: payload "Refer to section 7" not in source

- id: lock_settings_select_ca33
  label: Lock Settings Select (CTL-CA33)
  kind: action
  command: "CTL-CA33"
  params: []  # UNRESOLVED: payload "Refer to section 7" not in source

# --- SYSTEM / MONITOR INFORMATION ---

- id: monitor_model
  label: Monitor Model
  kind: query
  command: "CTL-C217"
  params: []  # UNRESOLVED: payload "Refer to section 7" not in source

- id: monitor_serial
  label: Monitor Serial
  kind: query
  command: "CTL-C216"
  params: []  # UNRESOLVED: payload "Refer to section 7" not in source

- id: firmware_revision
  label: Firmware Revision
  kind: query
  command: "CTL-C03F"
  params: []  # UNRESOLVED: payload "Refer to section 7" not in source

# --- EXTERNAL CONTROL / ID ---

- id: rs232c_port_enable
  label: RS-232C Port Enable
  kind: action
  command: "VCP-13-2A"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: usb_port_enable
  label: USB Port Enable
  kind: action
  command: "VCP-13-2B"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

- id: monitor_id
  label: Monitor ID
  kind: action
  command: "VCP-02-3E"
  params:
    - name: id
      type: integer
      description: "0001-0064"

- id: group_id
  label: Group ID
  kind: action
  command: "VCP-10-7F"
  params:
    - name: bitmap
      type: integer
      description: "0000-03FF bitmask; bit0=A,bit1=B,bit2=C,bit3=D,bit4=E,bit5=F,bit6=G,bit7=H,bit8=I,bit9=J"

- id: command_transfer
  label: Command Transfer
  kind: action
  command: "VCP-11-4F"
  params:
    - name: state
      type: integer
      description: "0001=OFF, 0002=ON"

# --- FACTORY RESET ---

- id: factory_reset
  label: Factory Reset (All)
  kind: action
  command: "VCP-02-CB"
  params:
    - name: target
      type: integer
      description: "0001=All (=Factory Reset)"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby, off]
  description: "From CTL-01D6 power status read: 0001=ON, 0002=Stand-by(power save), 0004=OFF (0003=Reserved)"

- id: command_reply_result
  type: enum
  values: [no_error, unsupported]
  description: "Result code in replies: 00=No Error, 01=Unsupported operation/condition"

- id: timing_report
  type: object
  description: "CTL-07 reply: SS status byte (bit7 sync out of range, bit6 unstable, bit1 H-sync polarity, bit0 V-sync polarity), H Freq (0.01kHz), V Freq (0.01Hz)"

- id: null_message
  type: signal
  description: "Monitor returns NULL message (code 'BE') on: timeout error (default 10s), unsupported message type, BCC error, not ready/not expected, or during execution of Power ON/OFF, Auto Setup, Input, PIP Input, Factory reset"
```

## Variables
```yaml
# VCP settable parameters are modelled as Actions above (each carries its value
# range/enum in params). No additional non-action variables documented.
```

## Events
```yaml
# No unsolicited notifications documented beyond the NULL message (see Feedbacks).
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
power_on_off_wait_seconds: 15    # controller must wait 15s after reply before next command
input_reset_wait_seconds: 10     # Input, PIP Input, Auto Setup, Factory Reset: 10s wait
lan_idle_disconnect_minutes: 15  # monitor disconnects TCP if no packet for 15 min; reconnect required
# No explicit safety warnings / interlock procedures in source. Wait timings are
# command-sequencing constraints, not safety interlocks.
```

## Notes
**Packet framing (applies to every command):** `SOH | Reserved('0') | Destination | Source('0') | Message Type | Message Length | STX | Message | ETX | BCC | CR(0Dh)`.

- **SOH** = 01h. **Reserved** = ASCII '0' (30h). **Source** (controller) = '0' (30h); monitor replies with its own MONITOR ID here. **Destination** = MONITOR ID / GROUP ID address (see source conversion table; '*'=2Ah for ALL). **CR** = 0Dh delimiter.
- **Message Type:** 'A'(41h)=Command, 'B'(42h)=Command reply, 'C'(43h)=Get current parameter, 'D'(44h)=Get reply, 'E'(45h)=Set parameter, 'F'(46h)=Set reply. Case sensitive.
- **Message Length** (6th-7th header bytes) = STX..ETX byte count, ASCII-encoded.
- **VCP Get:** `STX | OPcodePage(Hi,Lo) | OPcode(Hi,Lo) | ETX`. **VCP Set:** `STX | OPcodePage(Hi,Lo) | OPcode(Hi,Lo) | SetValue(16bit, 4 ASCII nibbles) | ETX`. All byte data ASCII-encoded (e.g. byte 3Ah sent as '3','A'; 0Bh as '0','B').
- **BCC (Block Check Code):** XOR of all bytes from Reserved(D1) through ETX, ASCII-encoded. Worked example in source: `30h xor 41h xor 30h xor 45h xor 30h xor 41h xor 02h xor 30h xor 30h xor 31h xor 30h xor 30h xor 30h xor 36h xor 34h xor 03h = 77h`.
- **Get/Set reply** adds Result, Type (00=Set parameter, 01=Momentary), Max value, Current/Requested value.
- **Default timeout** for NULL message = 10s.

**Model family:** same protocol shared across PN-M432/M502/M552/M652, PN-P436/P506/P556/P656, PN-M752/M862/M982, PN-P756.

<!-- UNRESOLVED: flow control not stated for RS-232C -->
<!-- UNRESOLVED: payloads for CTL-CA04-00/01, CTL-CA04-02, CTL-CA0B-00/01/02/03, CTL-CA32, CTL-CA33, CTL-C03F, CTL-C216, CTL-C217, CTL-C21D, CTL-C220 referenced as "Refer to section 7" but section 7 body not present in supplied source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: PIP Input commands referenced in NULL-message execution list but no PIP command table present in source -->
```

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
retrieved_at: 2026-08-02T12:16:35.433Z
last_checked_at: 2026-08-05T08:41:41.158Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:41:41.158Z
matched_actions: 106
action_count: 106
confidence: medium
summary: "Every spec action's wire token (CTL or VCP code) and every transport value appears verbatim in the refined source; spec covers all 17 CTL + 76 VCP tokens. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-CTL-command payload bytes for CTL-CA04/CA0B/CA32/CA33/C03F/C216/C217/C21D/C220 are referenced as \"Refer to section 7\" but section 7 detail is not present in the supplied source text"
- "flow control not stated in source"
- "payload \"Refer to section 7\" not in source"
- "flow control not stated for RS-232C"
- "payloads for CTL-CA04-00/01, CTL-CA04-02, CTL-CA0B-00/01/02/03, CTL-CA32, CTL-CA33, CTL-C03F, CTL-C216, CTL-C217, CTL-C21D, CTL-C220 referenced as \"Refer to section 7\" but section 7 body not present in supplied source"
- "firmware version compatibility not stated in source"
- "PIP Input commands referenced in NULL-message execution list but no PIP command table present in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
